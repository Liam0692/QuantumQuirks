from flask import Flask

def create_app():
    app = Flask(__name__)

    # Import and register blueprints
    from app.routes.home import home_bp
    from app.routes.quirks import quirks_bp
    from app.routes.quiz import quiz_bp
    from app.routes.particle_lab import particle_bp
    from app.routes.about import about_bp
    from app.routes.learn import learn_bp

    app.register_blueprint(home_bp)
    app.register_blueprint(quirks_bp)
    app.register_blueprint(quiz_bp)
    app.register_blueprint(particle_bp)
    app.register_blueprint(about_bp)
    app.register_blueprint(learn_bp)

    # Error handler
    from flask import render_template
    @app.errorhandler(404)
    def page_not_found(e):
        return render_template("404.html"), 404

    return app