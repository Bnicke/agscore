#!/bin/bash
while true; do
	curl -s eshost:9200/bin/admin/users |  python -c "import sys, json; print('niklas.bergstrom.se@gmail.com'); a = json.load(sys.stdin); print(a['_source']['users'])" | sort -u > /authenticatedemailsfile
	sleep 60
done
