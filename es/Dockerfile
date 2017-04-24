FROM elasticsearch:2.4.4

/usr/share/elasticsearch/bin/plugin install license
/usr/share/elasticsearch/bin/plugin install shield
/usr/share/elasticsearch/bin/shield/esusers useradd admin -r admin

RUN echo 'shield.authc:
  anonymous:
    username: anonymous_user
    roles: user
    authz_exception: true' >> /usr/share/elasticsearch/config/elasticsearch.yml

