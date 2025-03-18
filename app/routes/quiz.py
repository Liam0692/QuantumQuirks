from flask import Blueprint, render_template

quiz_bp = Blueprint("quiz", __name__)

@quiz_bp.route('/quiz')
def quiz():
    return render_template('quiz.html')