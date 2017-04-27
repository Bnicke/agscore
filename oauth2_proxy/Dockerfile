FROM centos:latest
# Install oauth2_proxy
  RUN ( curl -Lskj https://github.com/bitly/oauth2_proxy/releases/download/v2.2/oauth2_proxy-2.2.0.linux-amd64.go1.8.1.tar.gz | gunzip -c - | tar xf - ) && \
  mv /oauth2_proxy-2.2.0.linux-amd64.go1.8.1 /usr/share/oauth2_proxy 

COPY run.sh /
RUN chmod 755 /run.sh 
EXPOSE 4180 8080
ENTRYPOINT ["/bin/bash", "-c", "/run.sh ${*}", "--"]
