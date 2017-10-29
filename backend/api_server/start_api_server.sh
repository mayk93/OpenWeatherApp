#!/usr/bin/env bash

touch /tmp/api_server.pid

export PROD="true"

uwsgi --chmod-socket=666 --uwsgi-socket /home/deploy/server/backend.sock --wsgi-file /home/deploy/OpenWeatherApp/backend/api_server/api_server.py --callable __hug_wsgi__

echo $! > /tmp/api_server.pid