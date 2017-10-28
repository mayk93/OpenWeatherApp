#!/usr/bin/env bash

uwsgi --chmod-socket=666 --uwsgi-socket /home/michael/server/backend.sock --wsgi-file /home/michael/GitHub/OpenWeatherApp/backend/api_server/api_server.py --callable __hug_wsgi__