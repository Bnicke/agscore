# agscore
# Dummy files to start up.
# agscore 0.1
httpd.conf:
ProxyRequests Off
ProxyPass /ES http://127.0.0.1:9200
ProxyPassReverse /ES http://127.0.0.1:9200

# put example data in elastic
curl -XPUT 'http://localhost:9200/comp1/allaround/3' -d'{
"number": 3,
"gymnast": "Albin Bergstr&ouml;m",
"born": 2008,
"club": "KFUM Gymnastikavdelningar",
"rules": "RM0 bas",
"floor": "11,40",
"pommelHorse": "12,05",
"rings": "12,25",
"vault": "12,40 (12,40+12,40)/2",
"parallellBars": "12,10",
"highBar": "11,30",
"total": 71.50
}'
