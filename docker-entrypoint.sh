#!/usr/bin/env sh
set -eu

envsubst '${ES_HOST} ${ES_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/nginx.conf

exec "$@"