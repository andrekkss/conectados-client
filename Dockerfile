FROM node:lts-alpine

WORKDIR /usr/client

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3002
CMD ['npm', 'start']