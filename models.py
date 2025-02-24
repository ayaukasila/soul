from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user1'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    moods = db.relationship('Mood', backref='user', lazy=True)

class Mood(db.Model):
    __tablename__ = 'mood_user'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user1.id'), nullable=False)
    mood = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
class Article(db.Model):
    __tablename__ = 'articles'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256))
    description = db.Column(db.Text)
    url = db.Column(db.String(512))