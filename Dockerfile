FROM node:14.14.0-alpine3.12

WORKDIR /app

COPY ./package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build

CMD ["npm", "run", "dev"]
