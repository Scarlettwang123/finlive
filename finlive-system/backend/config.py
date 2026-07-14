import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'finlive_secret_key_2024')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI', 'sqlite:///finlive.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'jwt_secret_key_2024')
    DEBUG = True
