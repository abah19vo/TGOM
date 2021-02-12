FROM node:15.6

WORKDIR /the-website

COPY package*.json ./

RUN npm install

COPY src src

CMD ["npm","run" ,"start"]