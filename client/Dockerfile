FROM node

WORKDIR /usr/local/veltro-client

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0"]