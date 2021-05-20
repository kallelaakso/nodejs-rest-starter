FROM node:alpine
LABEL app="em-rest-api"
ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY . /usr/src/app/

RUN npm install && npm run build
RUN rm -rf node_modules
RUN npm install --production

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start:in:docker"]
