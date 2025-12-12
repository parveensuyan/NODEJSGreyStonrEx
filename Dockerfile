FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install && npm install -g nodemon && npm install express 

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
