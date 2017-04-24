#!/bin/bash

/usr/share/elasticsearch/bin/shield/esusers useradd admin -p agscore17 -r admin

exec /docker-entrypoint.sh "$@"
