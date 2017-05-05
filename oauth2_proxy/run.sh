#!/bin/sh
if [ $authenticatedemailsfile ]; then
	echo $authenticatedemailsfile | base64 -d > /authenticatedemailsfile
	/usr/share/oauth2_proxy/oauth2_proxy "$@" -authenticated-emails-file=/authenticatedemailsfile
else
	/usr/share/oauth2_proxy/oauth2_proxy "$@"
fi
