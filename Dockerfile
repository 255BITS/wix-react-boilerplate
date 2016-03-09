FROM mhart/alpine-node:5.6

RUN mkdir /app
ADD ./package.json /app/package.json
WORKDIR /app

RUN npm i --loglevel error --production

ADD ./dist/assets /app/public/assets
ADD ./dist/* /app/public/

ADD . /app

EXPOSE 80
CMD PORT=80 npm run serve:production
