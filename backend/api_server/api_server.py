import hug
from hug_middleware_cors import CORSMiddleware

import os
import sys
import json

import requests

import logging
logging.basicConfig(level=logging.INFO)

try:
    with open("keys.json") as source:
        api_keys = json.loads(source.read())

    google_places_api_key = api_keys["google_places_api"]
except Exception as e:
    logging.exception(e)
    logging.info("[Pre Server] Could not load API keys file or some keys are missing. Ensure keys.json exists in %s" %
                 os.path.dirname(os.path.realpath(__file__)))
    sys.exit()

# ToDo: Temporarily removed "*.github.com" because:
'''
The 'Access-Control-Allow-Origin' header contains multiple values ... but only one is allowed
'''
ALLOWED_ORIGINS = ["http://localhost:3000"]

api = hug.API(__name__)
api.http.add_middleware(CORSMiddleware(api, allow_origins=ALLOWED_ORIGINS))


@hug.post('/autocomplete')
def get_visualisation(*args, **kwargs):
    current_input = kwargs.get("current_input")

    domain = 'maps.googleapis.com'
    path = 'maps/api/place/autocomplete/json'
    query = "input=%s&types=(cities)" % current_input
    url = "https://%s/%s?%s&key=%s" % (domain, path, query, google_places_api_key)

    result = requests.get(url)
    try:
        return json.loads(result.text)["predictions"]
    except Exception as e:
        logging.exception(e)
        logging.info("[Server] [Autocomplete] Something went wrong with loading the body or accessing a field.")
        return []
