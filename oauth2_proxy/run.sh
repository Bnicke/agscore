#!/bin/sh
/update_users.sh &
if [ -z ${authenticatedemailsfile+x} ]; then 
	echo "authenticatedemailsfile is unset" 
	/usr/share/oauth2_proxy/oauth2_proxy "$@"
else 
	echo "authenticatedemailsfile is set to '$authenticatedemailsfile'"
	echo $authenticatedemailsfile | base64 -d > /authenticatedemailsfile
	/usr/share/oauth2_proxy/oauth2_proxy -authenticated-emails-file=/authenticatedemailsfile "$@"
fi
