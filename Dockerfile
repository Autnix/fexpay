FROM node:14

WORKDIR /usr/src/app

COPY . ./
RUN yarn

EXPOSE 8080

RUN yarn build

CMD [ "yarn", "start" ]