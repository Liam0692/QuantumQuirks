from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

# ROUTES
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/learn')
def learn():
    return render_template('learn.html')

@app.route('/quirks')
def quirks():
    with open('data/quirks.json') as file:
        quirks_data = json.load(file)
    return render_template('quirks.html', quirks=quirks_data)

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/lore')
def lore():
    return render_template('lore.html')

# CUSTOM ERROR PAGES
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == "__main__":
    app.run(debug=True)