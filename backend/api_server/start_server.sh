#!/usr/bin/env bash

uwsgi --uwsgi-socket /home/michael/server/backend.sock --http 0.0.0.0:8000 --wsgi-file /home/michael/GitHub/OpenWeatherApp/backend/api_server/api_server.py --callable __hug_wsgi__