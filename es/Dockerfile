FROM elasticsearch:2.4.4

RUN /usr/share/elasticsearch/bin/plugin install license && \
/usr/share/elasticsearch/bin/plugin install shield 

RUN echo 'shield.authc:' >> /usr/share/elasticsearch/config/elasticsearch.yml && \
echo '  anonymous:' >> /usr/share/elasticsearch/config/elasticsearch.yml && \
echo '    username: anonymous_user' >> /usr/share/elasticsearch/config/elasticsearch.yml && \
echo '    roles: user' >> /usr/share/elasticsearch/config/elasticsearch.yml && \
echo '    authz_exception: true' >> /usr/share/elasticsearch/config/elasticsearch.yml && \
chmod 777 /usr/share/elasticsearch/bin/shield/esusers && \
mkdir -p /usr/share/elasticsearch/config/shield 


COPY config/shield/* /usr/share/elasticsearch/config/shield
COPY es-entrypoint.sh /
RUN chmod 777 /es-entrypoint.sh
ENTRYPOINT ["/es-entrypoint.sh"]
CMD ["elasticsearch"]
