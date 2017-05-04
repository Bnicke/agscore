#!/bin/sh
if [ $googleserviceaccountjson ]; then
	echo $googleserviceaccountjson | base64 -d > /googleserviceaccountjson
	/usr/share/oauth2_proxy/oauth2_proxy "$@" -google-service-account-json=/googleserviceaccountjson
else
	/usr/share/oauth2_proxy/oauth2_proxy "$@"
fi
