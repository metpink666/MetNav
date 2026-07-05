FROM node:20-alpine

RUN npm install -g wrangler

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000