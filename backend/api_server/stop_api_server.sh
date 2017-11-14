#!/usr/bin/env bash

kill -9 $(cat /tmp/api_server.pid)
rm /tmp/api_server.pid