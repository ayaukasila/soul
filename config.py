import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'postgresql://postgres:0000@localhost:5432/mental_health_tracker')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
