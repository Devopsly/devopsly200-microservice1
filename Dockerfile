FROM google/nodejs

WORKDIR /api
ADD package.json /api/
RUN npm install
ADD . /api

CMD []
ENTRYPOINT ["/nodejs/bin/npm", "start"]
