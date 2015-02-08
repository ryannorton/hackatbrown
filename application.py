from flask import Flask, jsonify, make_response, render_template
from urllib2 import urlopen
import json
import os
from attractions import CITIES_ATTRACTIONS


app = Flask(__name__)
app.debug = True

# APP
@app.route("/")
def hello():
    return make_response(open('templates/index.html').read())

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
    CITIES = {
        'providence' : ('41.8236', '-71.4222'),
        'boston' : ('42.3581', '-71.0636'),
        'philadelphia' : ('39.9495', '-75.1503'),
        'sanfrancisco' : ('37.7833', '-122.4167'),
        'newyorkcity' : ('40.7127', '-74.0059'),
    }

    latitude, longitude = CITIES[city]
    tripadvisor_api_key = os.environ['TRIPADVISOR_API_KEY']
    tripadvisor_url = 'http://api.tripadvisor.com/api/partner/1.0/map/' + latitude + ',' + longitude + '/attractions?key=' + tripadvisor_api_key

    data = json.loads(urlopen(tripadvisor_url).read())['data']
    data = [landmark for landmark in data if 'tour' not in landmark['attraction_types'].lower()]

    resp = {
        'city' : data[0]['address_obj']['city'],
        'state' : data[0]['address_obj']['state'],
        'num_landmarks' : len(data),
        'landmarks' : [
            {
                'id' : landmark['location_id'],
                'name' : landmark['name'],
                'description' : landmark['description'],
                'latitude' : landmark['latitude'],
                'longitude' : landmark['longitude'],
                # 'rating' : landmark['rating'],
                # 'rank' : landmark['ranking_data']['ranking'],
                'photo' : landmark['photo'],
                # 'reviews' : landmark['reviews'],
            } for landmark in data ]
    }

    # resp = sorted(resp, key=lambda landmark: landmark['rank'])
    return jsonify(**CITIES_ATTRACTIONS['providence'])
    return jsonify(**resp)


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
