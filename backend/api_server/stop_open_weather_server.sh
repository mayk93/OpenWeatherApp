#!/usr/bin/env bash

kill -9 $(cat /tmp/open_weather_server.pid)
rm /tmp/open_weather_server.pid