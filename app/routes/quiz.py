from flask import Blueprint, render_template

quiz_bp = Blueprint("quiz", __name__)

@quiz_bp.route('/quiz')
def quiz():
    return render_template('quizzes/quiz.html')

@quiz_bp.route('/quiz/quantum-basics')
def quiz_basics():
    return render_template('quizzes/quantum_basics.html')

@quiz_bp.route('/quiz/what-particle-are-you')
def quiz_particle_personality():
    return render_template('quizzes/what_particle_are_you.html')