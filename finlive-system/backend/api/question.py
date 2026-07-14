from flask import Blueprint, request, jsonify
from models.question import Question, Answer
from models.user import User
from models import db
from datetime import datetime
import random

question_bp = Blueprint('question', __name__)

@question_bp.route('/', methods=['GET'])
def get_questions():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    status = request.args.get('status')
    
    query = Question.query
    if status:
        query = query.filter_by(status=status)
    
    pagination = query.order_by(Question.created_at.desc()).paginate(page=page, per_page=per_page)
    
    return jsonify({
        'data': [q.to_dict() for q in pagination.items],
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': page
    })

@question_bp.route('/<int:id>', methods=['GET'])
def get_question(id):
    question = Question.query.get_or_404(id)
    answers = Answer.query.filter_by(question_id=id).all()
    
    return jsonify({
        'question': question.to_dict(),
        'answers': [a.to_dict() for a in answers]
    })

@question_bp.route('/', methods=['POST'])
def create_question():
    data = request.json
    
    confidence_score = round(random.uniform(50, 99), 2)
    if confidence_score >= 85:
        risk_level = 'low'
        routing_decision = 'ai_direct'
    elif confidence_score >= 60:
        risk_level = 'medium'
        routing_decision = 'single_expert'
    else:
        risk_level = 'high'
        routing_decision = 'double_expert'
    
    new_question = Question(
        content=data['content'],
        user_id=data.get('user_id'),
        company_id=data.get('company_id'),
        confidence_score=confidence_score,
        risk_level=risk_level,
        routing_decision=routing_decision,
        status='pending'
    )
    
    db.session.add(new_question)
    db.session.commit()
    
    ai_answer = Answer(
        question_id=new_question.id,
        content=f"根据AI分析，您的问题「{data['content']}」的回答如下：\n\n这是一个自动生成的AI回答，置信度为{confidence_score}%。\n\n请注意：AI生成的答案仅供参考，不构成投资建议。",
        source_type='ai',
        ai_confidence=confidence_score,
        compliance_status='pending'
    )
    
    db.session.add(ai_answer)
    db.session.commit()
    
    return jsonify({
        'message': '问题提交成功',
        'question': new_question.to_dict(),
        'ai_answer': ai_answer.to_dict()
    }), 201

@question_bp.route('/<int:id>/answer', methods=['POST'])
def submit_answer(id):
    data = request.json
    question = Question.query.get_or_404(id)
    
    new_answer = Answer(
        question_id=id,
        content=data['content'],
        source_type=data['source_type'],
        expert_id=data.get('expert_id'),
        ai_confidence=data.get('ai_confidence'),
        compliance_status='pending',
        is_verified=data.get('is_verified', False)
    )
    
    db.session.add(new_answer)
    question.status = 'answered'
    db.session.commit()
    
    return jsonify({
        'message': '回答提交成功',
        'answer': new_answer.to_dict()
    }), 201

@question_bp.route('/<int:id>/compliance', methods=['POST'])
def compliance_check(id):
    data = request.json
    answer = Answer.query.filter_by(question_id=id).order_by(Answer.created_at.desc()).first()
    
    if not answer:
        return jsonify({'error': '未找到回答'}), 404
    
    answer.compliance_status = data['status']
    db.session.commit()
    
    return jsonify({
        'message': '合规审核完成',
        'answer': answer.to_dict()
    })
