from models import db
from datetime import datetime

class Question(db.Model):
    __tablename__ = 'questions'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'))
    confidence_score = db.Column(db.Float)
    risk_level = db.Column(db.String(20))
    status = db.Column(db.String(20), default='pending')
    routing_decision = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'company_id': self.company_id,
            'confidence_score': self.confidence_score,
            'risk_level': self.risk_level,
            'status': self.status,
            'routing_decision': self.routing_decision,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class Answer(db.Model):
    __tablename__ = 'answers'
    
    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
    content = db.Column(db.Text, nullable=False)
    source_type = db.Column(db.String(20))
    expert_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    ai_confidence = db.Column(db.Float)
    compliance_status = db.Column(db.String(20), default='pending')
    is_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'question_id': self.question_id,
            'content': self.content,
            'source_type': self.source_type,
            'expert_id': self.expert_id,
            'ai_confidence': self.ai_confidence,
            'compliance_status': self.compliance_status,
            'is_verified': self.is_verified,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
