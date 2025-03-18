from flask import Flask, render_template, jsonify, request
import json
import datetime
import random

app = Flask(__name__)

def get_daily_quirk():
    with open('data/quirks.json', encoding='utf-8') as file:
        quirks = json.load(file)
    # Use the date as a deterministic seed of randomness
    today = datetime.date.today()
    random.seed(today.toordinal())
    return random.choice(quirks)

# ROUTES
@app.route('/')
def home():
    daily_quirk = get_daily_quirk()
    return render_template('index.html', daily_quirk=daily_quirk)

@app.route('/learn')
def learn():
    return render_template('learn.html')

@app.route('/quirks')
def quirks():
    category = request.args.get('category')
    with open('data/quirks.json', encoding='utf-8') as file:
        quirks = json.load(file)
    
    if category and category != "All":
        filtered_quirks = [q for q in quirks if q['category'].lower() == category.lower()]
    else:
        filtered_quirks = quirks
    
    # Randomise order just for extra chaos
    random.shuffle(filtered_quirks)

    # Get list of all categories for the filter menu
    categories = sorted(list(set(q['category'] for q in quirks)))

    return render_template('quirks.html', quirks=filtered_quirks, categories=categories, selected_category=category)

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