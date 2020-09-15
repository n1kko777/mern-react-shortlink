FROM node:alpine as build

RUN npm install -g cross-env

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run client:install
RUN npm run client:build

CMD [ "npm", "start" ]
