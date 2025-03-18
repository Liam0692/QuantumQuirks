from flask import Blueprint, render_template, request
import json, random

quirks_bp = Blueprint("quirks", __name__)

@quirks_bp.route('/quirks')
def quirks():
    category = request.args.get('category')
    with open('data/quirks.json', encoding='utf-8') as file:
        quirks = json.load(file)

    if category and category != "All":
        filtered_quirks = [q for q in quirks if q['category'].lower() == category.lower()]
    else:
        filtered_quirks = quirks

    random.shuffle(filtered_quirks)
    categories = sorted(list(set(q['category'] for q in quirks)))

    return render_template('quirks.html', quirks=filtered_quirks, categories=categories, selected_category=category)