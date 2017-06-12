#!/bin/bash
while true; do
	sleep 60
	curl -s eshost:9200/bin/admin/users |  python -c "import sys, json; print('niklas.bergstrom.se@gmail.com'); a = json.load(sys.stdin); print(a['_source']['users'])" | sort -u > /tmp/authenticatedemailsfile
        diff /tmp/authenticatedemailsfile /authenticatedemailsfile
        if [ $? -ne 0 ]; then 
		\cp /tmp/authenticatedemailsfile /authenticatedemailsfile
	fi
done
