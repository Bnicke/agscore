# agscore
#### agscore 2.0 alpha
## References:

####Mobility UI:
https://github.com/cblanquera/mobility

####Dynatable:
https://github.com/alfajango/jquery-dynatable
https://www.dynatable.com/

####Stacktable.js:
https://github.com/johnpolacek/stacktable.js/

#### editablegrid
https://github.com/webismymind/editablegrid

### Config
Note, you must have at least one index in ES, otherwise it responds with 404.

Tips for the dummy competition.:
```
curl -XPOST http://localhost:9200/comp1/competition/new -d '{"name":"none"}'
curl -XDELETE http://localhost:9200/comp1/competition/new 
```
#### Install 
## Docker
Install docker: https://docs.docker.com/engine/installation/linux/

Create a network so the containers can talk with each other:
```
docker network create -d bridge agscore
```
Run a elasticsearch container on that net, put datadir in home	
```
docker run --name eshost --net=agscore -d -v "$HOME/esdata":/usr/share/elasticsearch/data elasticsearch
```
Pull the agscore from github:
```
cd $HOME
git clone https://github.com/Bnicke/agscore
```
Use fex. a nginx to serve static files.
```
docker run --name nginx --net=agscore -v $HOME/agscore/docker/nginx.conf:/etc/nginx/nginx.conf:ro -v $HOME/agscore:/usr/share/nginx/html:ro -d nginx
```

## Local install
Download Elastic search from https://www.elastic.co/downloads/elasticsearch
```
  unzip  elasticsearch-<version>.zip 
  cd elasticsearch-<version>/bin
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
ProxyPass /es http://127.0.0.1:9200
ProxyPassReverse /es http://127.0.0.1:9200
```

### elastic
Indexes for elastic search scores are `/<competition>/<Apparatus>/<id>`. Ex: http://localhost:9200/KFUMKM15/pommelHorse/37 or http://hostname/es/KFUMKM15/allaround/37 

for start lists and competition settings `/<competition>/startList/<id>`, `/<competition>/class/<id>`, `/<competition>/rules/<id>`

for global settings `/global/startList/<id>` , `/global/competition/<id>` , `/global/team/<id>` , `/global/class/<id>`, `/global/rules/<id>`
for binaries (pictures)  `/bin/team/<id>` , `/bin/gymnast/<id>` 

####
curl -XPUT http://localhost:9200/<competition>/startList/new -d'{"number":"0"}'
curl -XPUT http://localhost:9200/global/competition/kFUMKM2015 -d'{"name":"KFUM KM 2015"}'
curl -XPUT http://localhost:9200/comp1/startList/albinBergstrmKFUM -d'{"number": 18, "gymnast": "Albin Bergström","born": 1999,"team": "KFUM Gymnastikavdelningar","class": "COP", "rules": "Öppet Pr.", "id": "albinBergstrmKFUM", "pool":"1"}'

#### Ex. storing a score:
curl -XPUT http://localhost:9200/comp1/allaround/18 -d'{"number": 18, "gymnast": "Albin Bergström","born": 1999,"team": "KFUM Gymnastikavdelningar","class": "COP", "rules": "Öppet Pr.","floor": 10.00,"pommelHorse": 9.20,"rings": 8.10,"vault": 13.25,"parallelBars": 8.00,"highBar": 8.50,"total": 57.05}'

or

curl -XPUT http://localhost:9200/comp1/pommelHorse/18 -d'{"number": 18, "gymnast": "Albin Bergström","born": 1999,"team": "KFUM Gymnastikavdelningar","class": "COP","rules": "Öppet Pr.", "pen": 0, "d": 2.7, "e1": 3.5, "e2": 3.5, "avgE": 3.5, "base": 10, "e": 6.5, "total" : 9.20 }'

####Delete a score:
curl -XDELETE http://localhost:9200/comp1/allaround/18

####View a score:
curl http://localhost:9200/comp1/allaround/18


#### Security
For security, use shield.

Install shield and add an admin user to the predefined admin role:
```
bin/plugin install license
bin/plugin install shield
bin/elasticsearch
bin/shield/esusers useradd admin -r admin
```

You probably want to allow anonymous read.. for the audience e.g.
If you add this to the end of elasticsearch.yml, unauthorized users will be in the default "user" role that has read access to everything
```
shield.authc:
  anonymous:
    username: anonymous_user
    roles: user
    authz_exception: true
```

Log in as admin.
