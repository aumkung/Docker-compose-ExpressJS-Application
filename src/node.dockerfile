FROM node:16.13.0-alpine

RUN apk update && apk add bash
RUN apk --no-cache add --virtual native-deps make git

# Create app directory
WORKDIR /app

RUN mkdir -p ./public/uploads
COPY public ./public

RUN npm install -g nodemon


COPY package*.json ./

RUN npm install

RUN npm ci \
 && npm cache clean --force \
 && mv /app/node_modules /node_modules

COPY . .

ENV PORT 5001
ENV NODE_ENV development

EXPOSE 5001

CMD ["node", "./bin/www"]