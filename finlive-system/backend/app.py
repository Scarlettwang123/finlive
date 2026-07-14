from flask import Flask, send_from_directory
from flask_cors import CORS
from config import Config
from models import db
from api.auth import auth_bp
from api.question import question_bp
from api.user import user_bp
from werkzeug.security import generate_password_hash
import os

def create_app():
    app = Flask(__name__, static_folder='../frontend/dist', static_url_path='')
    app.config.from_object(Config)
    
    CORS(app, resources={r'/*': {'origins': '*'}})
    
    db.init_app(app)
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(question_bp, url_prefix='/api/questions')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    
    @app.route('/')
    def index():
        return send_from_directory('../frontend/dist', 'index.html')
    
    @app.errorhandler(404)
    def not_found(e):
        return send_from_directory('../frontend/dist', 'index.html')
    
    return app

if __name__ == '__main__':
    app = create_app()
    
    with app.app_context():
        from models.user import User
        from models.question import Question, Answer
        from models.company import Company
        
        db.create_all()
        if not User.query.filter_by(email='admin@finlive.ai').first():
            admin = User(
                username='admin',
                password=generate_password_hash('123456'),
                email='admin@finlive.ai',
                role='engineer',
                company='FinLive',
                position='技术负责人'
            )
            db.session.add(admin)
        
        if not User.query.filter_by(email='company@test.com').first():
            company = User(
                username='company_user',
                password=generate_password_hash('123456'),
                email='company@test.com',
                role='company',
                company='测试金融机构',
                position='风控经理'
            )
            db.session.add(company)
        
        if not User.query.filter_by(email='expert@test.com').first():
            expert = User(
                username='expert_user',
                password=generate_password_hash('123456'),
                email='expert@test.com',
                role='expert',
                company='智库机构',
                position='高级研究员',
                expert_fields='宏观策略,行业研究,固收衍生品'
            )
            db.session.add(expert)
        
        db.session.commit()
    
    app.run(host='0.0.0.0', port=5000, debug=True)
