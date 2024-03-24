# Use Node.js as the base image
FROM node:20 as build

# Set the working directory
WORKDIR /app

# Set the environment variables
ARG DB_URL=mysql://root:admin@localhost:3306/store
ENV DB_URL=$DB_URL

ARG REDIS_HOST=localhost
ENV REDIS_HOST=$REDIS_HOST


# Install app dependencies
COPY package*.json ./
RUN npm install --production

# Bundle app source
COPY . .

# Generate the build of the application
RUN npm run build



FROM node:latest as production

WORKDIR /app

# Copy the build from the previous stage
COPY --from=build /app /app


# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8080

CMD [ "npm", "run","setup:start" ]
