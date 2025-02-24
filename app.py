import os
import re
import requests
from datetime import datetime, timedelta
from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Mood, Article
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        return render_template('index.html', user=user)
    else:
        return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            flash("Logged in successfully!", "success")
            return redirect(url_for('home'))
        else:
            flash("Invalid credentials", "error")
            return redirect(url_for('login'))
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            flash("Invalid email format", "error")
            return redirect(url_for('register'))

        if User.query.filter_by(username=username).first():
            flash("Username already exists", "error")
            return redirect(url_for('register'))
        
        if User.query.filter_by(email=email).first():
            flash("Email already exists!", "error")
            return redirect(url_for('register'))

        if len(password) < 6:
            flash("Password must be at least 6 characters long", "error")
            return redirect(url_for('register'))

        hashed_password = generate_password_hash(password)
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        flash("User registered successfully!", "success")
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    flash("Logged out successfully!", "success")
    return redirect(url_for('login'))

AI21_API_KEY = "bw91BQqfsfwvSBlAPqp2IR2QNbdkljbw"

@app.route('/api/chat', methods=['POST'])
def chat_ai():
    data = request.get_json()
    user_message = data.get('message', '')
    
    try:
        url = "https://api.ai21.com/studio/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {AI21_API_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "jamba-1.5-large",
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message}
            ],
            "max_tokens": 128,
            "temperature": 0.7,
            "top_p": 1.0
        }
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        result = response.json()
        print("AI21 Chat response:", result)
        choices = result.get("choices", [])
        if choices:
            ai_response = choices[0]["message"]["content"]
        else:
            ai_response = "No completion returned."
    except Exception as e:
        ai_response = f"Error: {str(e)}"
    
    return jsonify({"response": ai_response})

@app.route('/api/explore')
def explore():
    query = request.args.get('q', '')
    if not query:
        return jsonify({"articles": []})
    
    local_articles = Article.query.filter(Article.title.ilike(f'%{query}%')).all()
    articles = [{
        "title": a.title,
        "description": a.description,
        "url": a.url
    } for a in local_articles]
    return jsonify({"articles": articles})

@app.route('/api/add_mood', methods=['POST'])
def add_mood():
    if 'user_id' not in session:
        return jsonify({"error": "Not logged in"}), 401

    data = request.get_json()
    mood_str = data.get('mood')
    if not mood_str:
        return jsonify({"error": "Mood not provided"}), 400

    new_mood = Mood(
        user_id=session['user_id'],
        mood=mood_str
    )
    db.session.add(new_mood)
    db.session.commit()

    return jsonify({"message": "Mood entry added!"}), 201

@app.route('/api/get_mood_stats', methods=['GET'])
def get_mood_stats():
    if 'user_id' not in session:
        return jsonify({"error": "Not logged in"}), 401

    time_range = request.args.get('range', '1W')  
    now = datetime.utcnow()

    if time_range == '1W':
        date_from = now - timedelta(weeks=1)
    elif time_range == '1M':
        date_from = now - timedelta(days=30)
    elif time_range == '3M':
        date_from = now - timedelta(days=90)
    elif time_range == '6M':
        date_from = now - timedelta(days=180)
    elif time_range == '1Y':
        date_from = now - timedelta(days=365)
    else:
        date_from = None  

    query = Mood.query.filter_by(user_id=session['user_id'])
    if date_from:
        query = query.filter(Mood.timestamp >= date_from)

    mood_counts = db.session.query(Mood.mood, db.func.count(Mood.mood))\
        .filter(Mood.user_id == session['user_id'])\
        .group_by(Mood.mood)\
        .all()

    mood_stats = {mood: count for mood, count in mood_counts}
    
    return jsonify(mood_stats)

@app.route('/api/profile')
def get_profile():
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    user = User.query.get(session['user_id'])
    if not user:
        return jsonify({'error': 'User not found'}), 404

    total_entries = len(user.moods) if hasattr(user, 'moods') else 0

    return jsonify({
        'username': user.username,
        'email': user.email,
        'total_entries': total_entries
    })

# Эндпоинт для получения всех записей настроения пользователя 
@app.route('/api/user_moods')
def get_user_moods():
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    user_id = session['user_id']
    moods = Mood.query.filter_by(user_id=user_id).order_by(Mood.timestamp.desc()).all()

    results = []
    for m in moods:
        results.append({
            "mood": m.mood,
            "timestamp": m.timestamp.isoformat()  
        })

    return jsonify({"moods": results})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
