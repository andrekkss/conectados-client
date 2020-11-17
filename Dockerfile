FROM node:lts-alpine

WORKDIR /usr/post

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run-script build

EXPOSE 3002
CMD ['npm', 'run-script', 'start:prod']