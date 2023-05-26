from flask import Flask, jsonify
import lxml
import requests
from bs4 import BeautifulSoup
import re
import time


app = Flask(__name__)


@app.route('/')
def index():
    return "Hey there! Welcome to the Premier League API"


@app.route('/table')
def table():
    link = f"https://onefootball.com/en/competition/premier-league-9/table"
    source = requests.get(link).text
    page = BeautifulSoup(source, "lxml")
    table = []

    teams = page.find_all("a", class_="standings__row-grid")

    for team in teams:
        table.append({
            "position": int(team.css.select_one('.standings__row-grid > div:nth-child(1)').text.strip()),
            "club": team.css.select_one('.standings__row-grid > div:nth-child(3)').text.strip(),
            "played": int(team.css.select_one('.standings__row-grid > div:nth-child(4)').text.strip()),
            "won": int(team.css.select_one('.standings__row-grid > div:nth-child(5)').text.strip()),
            "drawn": int(team.css.select_one('.standings__row-grid > div:nth-child(6)').text.strip()),
            "lost": int(team.css.select_one('.standings__row-grid > div:nth-child(7)').text.strip()),
            "gd": int(team.css.select_one('.standings__row-grid > div:nth-child(8)').text.strip()),
            "points": int(team.css.select_one('.standings__row-grid > div:nth-child(9)').text.strip())
        })

    return table


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
