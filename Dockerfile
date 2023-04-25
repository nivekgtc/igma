FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN yarn migration:deploy

CMD [ "npm", "run", "start:dev" ]
