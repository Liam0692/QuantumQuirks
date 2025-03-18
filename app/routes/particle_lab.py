from flask import Blueprint, render_template

particle_bp = Blueprint("particle_lab", __name__)

@particle_bp.route('/particle-lab')
def particle_lab():
    return render_template('particle-lab.html')