#!/usr/bin/env bash

touch /tmp/open_weather_server.pid

export PROD="true"

uwsgi --chmod-socket=666 --uwsgi-socket /home/deploy/open_weather_server/open_weather_server.sock --wsgi-file /home/deploy/OpenWeatherApp/backend/api_server/api_server.py --callable __hug_wsgi__ &

echo $! > /tmp/open_weather_server.pid
