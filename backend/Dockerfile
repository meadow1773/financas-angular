FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${SERVER_PORT}

CMD ["npm", "run", "dev"]
