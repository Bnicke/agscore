#!/bin/sh
/usr/share/oauth2_proxy/oauth2_proxy --email-domain=${email-domain} --upstream=http://127.0.0.1:8080/ --cookie-secret=${cookie-secret} --provider=${provider}  --client-id=${client-id}  --client-secret=${client-secret}
