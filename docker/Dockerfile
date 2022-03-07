FROM node:14-alpine
COPY . /usr/src/app
WORKDIR /usr/src/app
COPY $PWD/entrypoint.sh /usr/local/bin
ENTRYPOINT ["/bin/sh", "/usr/local/bin/entrypoint.sh"]