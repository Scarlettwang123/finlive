from flask import Blueprint, request, jsonify
from models.user import User
from models import db
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
from config import Config

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'error': '邮箱或密码错误'}), 401
    
    token = jwt.encode({
        'user_id': user.id,
        'role': user.role,
        'exp': datetime.utcnow() + timedelta(hours=24)
    }, Config.JWT_SECRET_KEY, algorithm='HS256')
    
    return jsonify({
        'token': token,
        'user': user.to_dict()
    })

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': '邮箱已被注册'}), 400
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': '用户名已被使用'}), 400
    
    new_user = User(
        username=data['username'],
        password=generate_password_hash(data['password']),
        email=data['email'],
        role=data.get('role', 'company'),
        company=data.get('company'),
        position=data.get('position'),
        phone=data.get('phone'),
        expert_fields=data.get('expert_fields')
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': '注册成功', 'user': new_user.to_dict()}), 201

@auth_bp.route('/verify-token', methods=['POST'])
def verify_token():
    data = request.json
    try:
        decoded = jwt.decode(data['token'], Config.JWT_SECRET_KEY, algorithms=['HS256'])
        user = User.query.get(decoded['user_id'])
        if user:
            return jsonify({'valid': True, 'user': user.to_dict()})
        return jsonify({'valid': False}), 401
    except jwt.ExpiredSignatureError:
        return jsonify({'valid': False, 'error': 'Token已过期'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'valid': False, 'error': '无效的Token'}), 401
