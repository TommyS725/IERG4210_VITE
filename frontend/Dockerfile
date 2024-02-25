# Build stage
FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "build"]



