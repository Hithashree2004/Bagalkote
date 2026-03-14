import os
import json
from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)

# Load materials
MATERIALS_DIR = os.path.join(os.path.dirname(__file__), 'materials')

def get_material(subject):
    path = os.path.join(MATERIALS_DIR, f'{subject.lower()}.json')
    if os.path.exists(path):
        with open(path, 'r') as f:
            return json.load(f)
    return {}

@app.route('/')
def index():
    exams = ["KCET", "NEET", "JEE Main", "JEE Advanced"]
    return render_template('index.html', exams=exams)

@app.route('/exam/<level>')
def subjects(level):
    subjects_list = ["Physics", "Chemistry", "Mathematics", "Biology"]
    return render_template('subjects.html', level=level, subjects=subjects_list)

@app.route('/subject/<level>/<subject>')
def modes(level, subject):
    modes_list = ["Basic", "Intermediate", "Pro", "Revision"]
    material = get_material(subject)
    chapters = list(material.keys())
    return render_template('modes.html', level=level, subject=subject, modes=modes_list, chapters=chapters)

@app.route('/content/<level>/<subject>/<mode>/<chapter>')
def content(level, subject, mode, chapter):
    material = get_material(subject)
    content_data = material.get(chapter, {}).get(mode.lower(), {})
    return render_template('content.html', 
                           level=level, 
                           subject=subject, 
                           mode=mode, 
                           chapter=chapter, 
                           data=content_data)

@app.route('/evaluate', methods=['POST'])
def evaluate():
    data = request.json
    answers = data.get('answers', [])
    correct_count = 0
    results = []
    
    # Simple evaluation logic (usually you'd store correct answers in session or temp)
    # For this mock, we assume the frontend handles comparison or we send correct ones back
    return jsonify({"status": "received"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
