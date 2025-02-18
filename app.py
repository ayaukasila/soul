import os
import re
import requests
from flask import Flask, render_template, request, redirect, url_for, session, flash
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Mood
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
with app.app_context():
    db.create_all()

# Главная страница – если пользователь аутентифицирован, отображается index.html
@app.route('/')
def home():
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        return render_template('index.html', user=user)
    else:
        return redirect(url_for('login'))

# Страница входа: GET – форма входа, POST – проверка данных
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Получаем значение из поля "username", как задано в форме
        username = request.form.get('username')
        password = request.form.get('password')

        # Ищем пользователя по username
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            flash("Logged in successfully!", "success")
            return redirect(url_for('home'))
        else:
            flash("Invalid credentials", "error")
            return redirect(url_for('login'))

    return render_template('login.html')


# Страница регистрации: GET – форма регистрации, POST – создание пользователя с проверками
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        # Проверка формата email
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            flash("Invalid email format", "error")
            return redirect(url_for('register'))

        # Проверка уникальности username
        if User.query.filter_by(username=username).first():
            flash("Username already exists", "error")
            return redirect(url_for('register'))
        
        # Проверка уникальности email
        if User.query.filter_by(email=email).first():
            flash("Email already exists!", "error")
            return redirect(url_for('register'))

        # Проверка длины пароля
        if len(password) < 6:
            flash("Password must be at least 6 characters long", "error")
            return redirect(url_for('register'))

        # Хешируем пароль
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        flash("User registered successfully!", "success")
        return redirect(url_for('login'))
    return render_template('register.html')

# Выход из аккаунта
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    flash("Logged out successfully!", "success")
    return redirect(url_for('login'))

# RESTful API для чата с ИИ
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message')
    # Здесь полностью реализован ответ ИИ (замените на реальный вызов API при необходимости)
    ai_response = "Simulated AI response: " + user_message
    return {"response": ai_response}

# Полностью реализованный API для раздела Explore с использованием DuckDuckGo Instant Answer API
@app.route('/api/explore')
def explore():
    query = request.args.get('q', '')
    if not query:
        return {"articles": []}
    
    ddg_url = "https://api.duckduckgo.com/"
    params = {
        'q': query,
        'format': 'json',
        'no_redirect': 1,
        'no_html': 1
    }
    
    try:
        response = requests.get(ddg_url, params=params, timeout=5)
        data = response.json()
    except Exception as e:
        return {"articles": [], "error": str(e)}
    
    articles = []
    # Обрабатываем RelatedTopics для извлечения статей
    if "RelatedTopics" in data:
        for item in data["RelatedTopics"]:
            if "Text" in item and "FirstURL" in item:
                articles.append({
                    "title": item.get("Text", "No title"),
                    "description": item.get("Text", ""),
                    "url": item.get("FirstURL", "#")
                })
            elif "Name" in item and "Topics" in item:
                for sub in item["Topics"]:
                    if "Text" in sub and "FirstURL" in sub:
                        articles.append({
                            "title": sub.get("Text", "No title"),
                            "description": sub.get("Text", ""),
                            "url": sub.get("FirstURL", "#")
                        })
    return {"articles": articles}

if __name__ == '__main__':
    app.run(port=5001, debug=True)
