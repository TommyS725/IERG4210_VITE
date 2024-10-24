# build frontend
FROM node:20-alpine as build_frontend

WORKDIR /app

ARG PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID
ENV VITE_PAYPAL_CLIENT_ID=$PAYPAL_CLIENT_ID

COPY frontend/package*.json ./

RUN npm install 

COPY frontend/. .

RUN npm run build

# build admin
FROM node:20-alpine as build_admin

WORKDIR /app

COPY admin/package.json ./

RUN npm install 

COPY admin/. .

RUN npm run build

# build backend
FROM node:20 as build_backend

WORKDIR /app




COPY server/package.json ./

RUN npm install 

COPY server/. .

RUN npm run build

# Run
FROM node:20-alpine


WORKDIR /app

COPY --from=build_frontend /app/dist /app/client

COPY --from=build_admin /app/dist /app/admin

COPY --from=build_backend /app/node_modules /app/node_modules

COPY --from=build_backend /app/dist /app/dist

COPY --from=build_backend /app/package*.json /app/

EXPOSE 8080

CMD ["npm","start"]