# 2024 Sem2 IERG4210 Assignment Phase 2B
## Shum Ching Chit 1155159019


### Overview
This application is a shopping website built using React and Hono with TypeScript.

### Demo
This application can be accessed at <http://13.251.226.176>.
### Developement
#### Database
Before running the application, a MySQL database is required. You can set it up locally or use Docker:

- **Local Deployment**
    1. Install MySQL using a package manager or installer.
    2. Create a database named `store`. Configure the user and password in the `./server/.env` file.
    3. Populate the database with data by running the following command:
        ```sh
        mysql -u {user} -p{password} -h 127.0.0.1 -P 3306 store < ./server/db_backup.sql
        ```
        Replace `{user}` and `{password}` with your MySQL username and password.

- **Docker Deployment (Recommended)**
    1. Start a Docker container with the following command:
         ```sh
        docker run --name 4210-dev-db -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=store -v $(pwd)/mysql:/var/lib/mysql mysql:latest
        ```
        This command starts a MySQL container with the database name `store` and root password `admin`. It also mounts the `./mysql` directory from your host to the `/var/lib/mysql` directory in the container.
    2. The database is now up and ready to use.

#### Start development server
In this step, Node.js is required.
1. Frontend
    In `./frontend` directory, run
    ```sh
    npm i
    npm run dev
    ```
    The frotend client will be served at <http://localhost:3000>

2. Server
    In `./server` directory, run
    ```sh
    npm i
    npm run dev:server
    ```
    The API server will be served at <http://localhost:8080>
    The image server will be served at <http://localhost:8888>

##### Using Docker Compose
You can also use Docker Compose to create dev DB and images server by running
```sh
docker-compose -f dev.yml up
```
By default,
- MySQL Database will be served at `localhost:3306` 
- Images server  will be served at `localhost:8888`

To start API server without serving static images, run
```sh
    npm i
    npm run dev
```
in `./server` directory instead

### Production
The production build can be served up locally or using Docker.
- **Local Deployment**
    1. Set up the database and environment configuration following [this part](#database)
    2. Build the frontend. In the `./frontend` directory, run
    ```sh
    npm i
    npm run build
    ```

    3. Build the server. In the `./server` directory, run
    ```sh
    npm i
    npm run build
    ```
    4. Install Nginx
    5. Use the following nginx config
    ```conf
    server {
        listen {port};
        server_name {your_domain/public address};
        server_tokens off;
        proxy_hide_header X-Powered-By;

        location / {
                root  {absolute path to ./frontend/dist};
                try_files $uri $uri/  /index.html =404;
        }

        location /api {
            proxy_pass http://localhost:8080;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location /images {
            root {absolute path to ./server};
            try_files $uri  =404;
        }

    }
    ```
    6. Start nginx by running
    ```sh
    sudo service nginx start
    ```

    7. The application is now ready to use at `{port}`.

    PS.  If you encounter permission issues in step 6, you may need to run the command with `sudo` or change the permission of the directories using `chmod` and `chown`.

- **Docker Deployment**
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
    2. Start the server by running
    ```sh
    docker-compose up
    ```
    Server is started at <http://localhost:{port}>
    3. If you want to expose the application to the internet, you may need to configure a reverse proxy with Nginx or another web server on your host. For example, using the following config:
    ```conf
    server {
        listen 80;
        server_name {your_domain/public address};
        server_tokens off;
        proxy_hide_header X-Powered-By;

        location / {
            proxy_pass http://server:{port};
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

    }
    ```
    
### Admin Panel
An admin panel is provided to use the backend api with a graphical UI.
The installation and user instruction can refer to [README](./admin/README.md)

### Directory details
- `./frontend`
    React client of the shopping website

- `./server`
   Hono server for serving images and API for database query and mutation

- `./mysql`
    MySQL data for docker container

- `./nginx`
    Nginx config for docker volume


