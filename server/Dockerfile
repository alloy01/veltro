FROM node

WORKDIR /usr/local/veltro-server

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run compile

EXPOSE 4000

CMD [ "npm", "run", "start"]