from flask import Flask, jsonify
import json


app = Flask(__name__)
app.debug = True

# APP
@app.route("/")
def hello():
    return "Hello World!"


# API
@app.route("/api/")
def api_view():
    data = {
        'error' : 'No endpoint specified.'
    }

    return jsonify(**data)


@app.route("/api/landmarks/")
def landmarks_view():
    data = {
        'error' : 'No city specified'
    }

    return jsonify(**data)


@app.route("/api/landmarks/<city>/")
def list_landmarks(city):
    data = {
        'city' : city,
        'landmarks' : [
            'Liberty Bell',
            'Statue of Liberty',
            'Brown University',
        ],
    }

    return jsonify(**data)


@app.route("/api/landmarks/<city>/<landmark>/")
def landmark(city, landmark):
    data = {
        'name' : 'Liberty Bell',
        'description' : 'A shiny bell.',
        'photos' : [
            'urltopicture.com/image.jpg',
            'urltopicture.com/image2.jpg',
            'urltopicture.com/image3.jpg',
        ]
    }

    return jsonify(**data)


if __name__ == '__main__':
    app.run()