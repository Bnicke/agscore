#!/bin/sh
/usr/share/oauth2_proxy/oauth2_proxy --email-domain=${email-domain} --upstream=http://0.0.0.0:8080/ --cookie-secret=${cookie-secret} --provider=${provider}  --client-id=${client-id}  --client-secret=${client-secret}
