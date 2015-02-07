from flask import Flask, jsonify, render_template
import json


app = Flask(__name__)
app.debug = True

# APP
@app.route("/")
def hello():
    return render_template('index.html')


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
            {
                'title' : 'Liberty Bell',
                'description' : 'A very shiny bell.',
                'latitude' : 39.9495,
                'longitude' : 75.1503,
                'rating' : 4.6,
                'photos' : [
                    'urltopicture.com/image.jpg',
                    'urltopicture.com/image2.jpg',
                    'urltopicture.com/image3.jpg',
                ]
            },
            {
                'title' : 'Statue of Liberty',
                'description' : 'A very tall statue.',
                'latitude' : 40.6892,
                'longitude' : 74.0444,
                'rating' : 4.2,
                'photos' : [
                    'urltopicture.com/image.jpg',
                    'urltopicture.com/image2.jpg',
                    'urltopicture.com/image3.jpg',
                ]
            },
            {
                'title' : 'Brown University',
                'description' : 'Home of Hack@Brown.',
                'latitude' : 41.8262,
                'longitude' : 71.4032,
                'rating' : 5.0,
                'photos' : [
                    'urltopicture.com/image.jpg',
                    'urltopicture.com/image2.jpg',
                    'urltopicture.com/image3.jpg',
                ]
            },
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
