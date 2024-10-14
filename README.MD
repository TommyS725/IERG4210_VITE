# 2024 Sem2 IERG4210 Assignment Final Phase 
## Shum Ching Chit 1155159019


### Overview
This application is a shopping website built using React, Vue and Hono with TypeScript.

### Demo
This application can be accessed at <https://shop-demo.tommyshum.com/>

##### Demo User Account (for login):
- Email: demo@tommyshum.com
- Password: demo@Tommyshum

##### Demo Paypal Account (for purchase):
- Email: sb-lgoet30236865@personal.example.com
- Password: Y.1.sWw5


### Before you start
To use the PayPal function in frontend,you have to sign up for a PayPal developer account at <https://developer.paypal.com/dashboard/accounts> and set it as the enviornment of frontend as described [here](/frontend/README.md#enviornment-set-up).

### Developement
#### Database
Before running the application, a MySQL database and Redis sevrer is required. You can set it up locally or use Docker.

##### **Local Deployment**
###### MySQL
1. Install MySQL using a package manager or installer.
2. Create a database named `store`. Configure the user and password in the `./server/.env` file.
3. Populate the database with data by running the following command:
    ```sh
    mysql -u {user} -p{password} -h 127.0.0.1 -P 3306 store < ./server/db_backup.sql
    ```
    Replace `{user}` and `{password}` with your MySQL username and password.

###### Redis
1. Install Redis using a package manager or installer.
2. Start the Redis server. Usually, this can be done by running `redis-server`.
3. Configure the host of Redis connection in the `./server/.env` file. 

##### **Docker Deployment (Recommended)**
1. Start a Docker container with the following command:
    ```sh
    docker run --name 4210-dev-db -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=store -v $(pwd)/mysql:/var/lib/mysql mysql:latest
    ```
    This command starts a MySQL container with the database name `store` and root password `admin` at the default port (3306). It also mounts the `./mysql` directory from your host to the `/var/lib/mysql` directory in the container.
2. Start a Docker container with the following command:
    ```sh
    docker run --name 4210-dev-redis -d -p 6379:6379 redis:latest
    ```
    This command starts a Redis container with the default configuration. It exposes the Redis server at the default port (6379).
3. The MySQL and Redis database is now up and ready to use.


##### Using Docker Compose (Recommended)**
You can also use Docker Compose to create dev DB and images server by running
```sh
docker-compose -f dev.yml up
```
By default,
- MySQL Database will be served at `localhost:3306` 
- Redis server  will be served at `localhost:6379`


#### Start development server
In this step, Node.js is required.
##### Client
See [this section](/frontend/README.md#development) for details.
##### Admin
See [this section](/admin/README.md#development) for details.
##### Client
See [this section](/server/README.md#get-started) for details.


### Production
The production build can be served up locally or using Docker.
#### **Local Deployment**
1. Set up the databases and environment configuration following [this part](#database)
2. Set up the server environment as described [here](./server/README.md#environment-set-up)
3. Create production build
```sh
cd server
npm run build:all
```
4. Link frontend and admin build under sever
```sh
cd server 
ln -s ../frontend/dist client
ln -s ../admin/dist admin
```
5. Start server
```sh
cs server
npm run start
```
6. Install Nginx
7. Use the following nginx config in `./nginx/nginx.conf`
```conf
server {
    listen 80;
    client_max_body_size 6M; 

    location / {
        proxy_pass http://server:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /images/ {
        alias /usr/share/nginx/html/images/;
    }
}
```
8. Start nginx by running
```sh
sudo service nginx start
```

9. The application is now ready to use at `{port}`.

PS.  If you encounter permission issues in step 7, you may need to run the command with `sudo` or change the permission of the directories using `chmod` and `chown`.

#### **Docker Deployment**
1. Change the port exposed by Nginx in `docker-compose.yml` to the desired port (default is 3000)
```yml
...
nginx:
image: nginx:latest
ports:
    - {port}:80
volumes:
    - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf
    - ./nginx/frontend_build:/usr/share/nginx/html/frontend
    - ./server/images:/usr/share/nginx/html/images
depends_on:
    - frontend
    - server
restart: on-failure
...
```
2. If you are using HTTPS to serve, set `IS_DEV` in server section to `false`, if not set to `true`.
```yml
...
 server:
    build:
      context: ./server
      dockerfile: Dockerfile
      args:
        DB_URL: mysql://root:admin@db:3306/store
        REDIS_HOST: redis
    command: npm run setup:start
    environment:
      DB_URL: mysql://root:admin@db:3306/store
      REDIS_HOST: redis
      IS_DEV: 'false if using HTTPS else true'
...
```
3. Start the server by running
```sh
docker-compose up
```
Server is started at <http://localhost:{port}> (port is default to 3000)
4. If you want to expose the application to the internet, you may need to configure a reverse proxy with Nginx or another web server on your host. For example, using the following config:
```conf
server {
    listen 80;
    server_name {your_domain/public address};
    server_tokens off;
    proxy_hide_header X-Powered-By;
    client_max_body_size 6M; 

    location / {
        proxy_pass http://server:{port};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

}
```

### Auto Deploy
This repo uses Github actions to deploy updated builds by `scp` and `ssh`.

### User Creation
You can refer to this [section](./server/README.md#user-creation)
    

### Directory details
- `./frontend`
    React client of the shopping website

- `./server`
   Hono server for serving images and API for database query and mutation

- `./admin`
    Amdin panel for admin operations

- `./mysql`
    MySQL data for docker container

- `./nginx`
    Nginx config files
    - `app.conf`: Actual Nginx config at <https://secure.s12.ierg4210.ie.cuhk.edu.hk/>
    - `nginx.conf`: Nginx config for basic loacal deployment and Docker Compose

- `./data`
    Typescript database items records, images, user data and database dump.



