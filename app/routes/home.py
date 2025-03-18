from flask import Blueprint, render_template
import json, datetime, random

home_bp = Blueprint("home", __name__)

def get_daily_quirk():
    with open('data/quirks.json', encoding='utf-8') as file:
        quirks = json.load(file)
    today = datetime.date.today()
    random.seed(today.toordinal())
    return random.choice(quirks)

@home_bp.route('/')
def home():
    daily_quirk = get_daily_quirk()
    return render_template('index.html', daily_quirk=daily_quirk)