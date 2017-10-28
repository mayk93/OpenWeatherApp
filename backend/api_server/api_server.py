# Server
import hug
from hug_middleware_cors import CORSMiddleware

# Python
import os
import sys
import json

# Logging
import logging
logging.basicConfig(level=logging.INFO)

# Third party modules
import requests

# My modules
from data_formatters import format_autocomplete, format_weather_data

found = False
last_exception = None
for key_path in ["keys.json", "/home/michael/server/keys.json"]:
    try:
        with open(key_path) as source:
            api_keys = json.loads(source.read())

        google_places_api_key = api_keys["google_places_api"]
        open_weather_api_key = api_keys["open_weather_api"]

        found = True
        break
    except Exception as e:
        last_exception = e

if not found:
    logging.exception(last_exception)
    logging.info("[Pre Server] Could not load API keys file or some keys are missing. Ensure keys.json exists in %s" %
                 os.path.dirname(os.path.realpath(__file__)))
    sys.exit()

ALLOWED_ORIGINS = ["https://myapps.gallery"]

api = hug.API(__name__)
api.http.add_middleware(CORSMiddleware(api, allow_origins=ALLOWED_ORIGINS))


@hug.post('/autocomplete')
def autocomplete(*args, **kwargs):
    current_input = kwargs.get("current_input")

    domain = 'maps.googleapis.com'
    path = 'maps/api/place/autocomplete/json'
    query = "input=%s&types=(cities)" % current_input
    url = "https://%s/%s?%s&key=%s" % (domain, path, query, google_places_api_key)

    result = requests.get(url)
    try:
        return format_autocomplete(json.loads(result.text)["predictions"])
    except Exception as e:
        logging.exception(e)
        logging.info("[Server] [Autocomplete] Something went wrong with loading the body or accessing a field.")
        return []


@hug.post('/weather_data')
def weather_data(*args, **kwargs):
    search_city = kwargs.get("search_city")
    search_country = kwargs.get("search_country")

    domain = 'api.openweathermap.org'
    url = 'http://%s/data/2.5/forecast?appid=%s&q=%s,%s' % (domain, open_weather_api_key, search_city, search_country)

    result = requests.get(url)
    try:
        return format_weather_data(json.loads(result.text))
    except Exception as e:
        logging.exception(e)
        logging.info("[Server] [Weather Data] Something went wrong with loading the body or accessing a field.")
        return []