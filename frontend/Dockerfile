FROM node:latest as build
WORKDIR /app
ARG PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID
ENV VITE_PAYPAL_CLIENT_ID=$PAYPAL_CLIENT_ID

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run","preview"]





