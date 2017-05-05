FROM centos:latest
RUN INSTALL_PKGS="python curl"
	yum -y update && \
    	yum -y install --setopt=tsflags=nodocs ${INSTALL_PKGS} && \
    	yum clean all
# Install oauth2_proxy
  RUN ( curl -Lskj https://github.com/bitly/oauth2_proxy/releases/download/v2.2/oauth2_proxy-2.2.0.linux-amd64.go1.8.1.tar.gz | gunzip -c - | tar xf - ) && \
  mv /oauth2_proxy-2.2.0.linux-amd64.go1.8.1 /usr/share/oauth2_proxy && \
  echo > /authenticatedemailsfile && \
  chmod 777 /authenticatedemailsfile

COPY run.sh /
RUN chmod 755 /run.sh 
COPY update_users.sh /
RUN chmod 755 /update_users.sh
EXPOSE 4180 8080
ENTRYPOINT ["/bin/bash", "-c", "/run.sh ${*}", "--"]
