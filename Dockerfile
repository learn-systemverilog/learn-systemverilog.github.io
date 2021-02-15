FROM node:14.15.5-alpine

RUN apk add --no-cache git

EXPOSE 3000

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./

CMD ["npm", "start"]
