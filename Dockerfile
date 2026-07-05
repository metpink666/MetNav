FROM node:20-bookworm

RUN npm install -g wrangler

RUN apt-get update && apt-get install -y \
    libc6 \
    libstdc++6 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000