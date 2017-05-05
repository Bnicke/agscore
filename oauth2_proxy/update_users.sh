#!/bin/bash
while true; do
	curl -s eshost:9200/bin/admin/users |  python -c "import sys, json; a = json.load(sys.stdin); print(a['_source']['users'])" > /authenticatedemailsfile
	echo niklas.bergstrom.se@gmail.com >> /authenticatedemailsfile
	sleep 60
done
