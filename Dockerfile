
FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN apk add yarn
RUN yarn install
RUN npm run build

EXPOSE 80

CMD ["npm" , "run", "start"]