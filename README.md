# agscore
#### Dummy files to start up.
#### agscore 0.1
## References:

####Mobility UI:
https://github.com/cblanquera/mobility

####Dynatable:
https://github.com/alfajango/jquery-dynatable
https://www.dynatable.com/

####Stacktable.js:
https://github.com/johnpolacek/stacktable.js/

#### easyautocomplete
http://easyautocomplete.com/examples

### Config
#### Install 
Download Elastic search from https://www.elastic.co/downloads/elasticsearch
```
  unzip  elasticsearch-2.2.1.zip 
  cd elasticsearch-2.2.1/bin
  ./elasticsearch
```
Install apache:
```
 sudo aptitude install -y libapache2-mod-proxy-html libxml2-dev
 sudo apt-get install libapache2-mod-proxy-html libxml2-dev
 sudo a2enmod (use *proxy* as wildcard when prompted)
```
####httpd.conf:
```
ProxyRequests Off
ProxyPass /ES http://127.0.0.1:9200
ProxyPassReverse /ES http://127.0.0.1:9200
```

### elastic
Indexes for elastic search scores are `/<competition>/<Apparatus>/<startnumber>`. Ex: http://localhost:9200/KFUMKM15/pommelHorse/37 or http://hostname/ES/KFUMKM15/allaround/37 

for start lists and competition settings `/<competition>/startlist/<startnumber>`, `/<competition>/class/<id>`, `/<competition>/rules/<id>`

for global settings `/global/startlist/<id>` , `/global/competition/<id>` , `/global/team/<id>` , `/global/class/<id>`, `/global/rules/<id>`

####
curl -XPUT http://localhost:9200/<competition>/startList/new -d'{"number":"0"}'
curl -XPUT http://localhost:9200/global/competition/kFUMKM2015 -d'{"name":"KFUM KM 2015"}'

#### Ex. storing a score:
curl -XPUT http://localhost:9200/comp1/allaround/18 -d'{"number": 18, "gymnast": "Albin Bergström","born": 1999,"team": "KFUM Gymnastikavdelningar","class": "COP", "rules": "Öppet Pr.","floor": 10.00,"pommelHorse": 9.20,"rings": 8.10,"vault": 13.25,"parallelBars": 8.00,"highBar": 8.50,"total": 57.05}'

or

curl -XPUT http://localhost:9200/comp1/pommelHorse/18 -d'{"number": 18, "gymnast": "Albin Bergström","born": 1999,"team": "KFUM Gymnastikavdelningar","class": "COP","rules": "Öppet Pr.", "pen": 0, "d": 2.7, "e1": 3.5, "e2": 3.5, "avgE": 3.5, "base": 10, "e": 6.5, "total" : 9.20 }'

####Delete a score:
curl -XDELETE http://localhost:9200/comp1/allaround/18

####View a score:
curl http://localhost:9200/comp1/allaround/18



###Convert allaround from old agscore
```
for i in `cat file | awk '{print $2}'`; do
	row=`cat test2 |  sed 's/,/./g' | grep -P "^.*\t$i " | awk -F'\t' '{print $2"\",\"born\": " $3",\"team\": \"" $4"\",\"class\": \"" $5"\",\"rules\": \"" $5"\",\"floor\": " $6",\"pommelHorse\": " $7",\"rings\": " $8",\"vault\": " $9",\"parallelBars\": " $10",\"highBar\": " $11",\"total\": " $12"}"'} | cut -f 1 -d ' ' --complement` 
	echo "curl -XPUT http://localhost:9200/comp1/allaround/$i -d'{\"number\": "$i", \"gymnast\": \""$row\'
done
```
