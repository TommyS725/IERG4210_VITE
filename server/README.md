# Backend Server

## Overview
This is the backend server  serving api for database query and mutation.

## Get started
NodeJs ,mysql server and Redis server are required

#### Build and link the frontend static content 
1. To enable readng the static content in frontend, build the production build in `frontend` and `../admin` following their own instruction.
2. Create symbotic links to link the build under the server directory.
``` sh
ln -s ../frontend/dist client
ln -s ../admin/dist admin
```

#### Create  `.env ` file
```ini
DB_URL = 'mysql2://{user}:{password}@{host}:{port}/{database}'
REDIS_HOAT ='eg. localhost'
```



### Prerequisite 
MYSQL and Redis shold be running and a clean databse with the name specified in `.env` is available.

### Migration
```sh
npm run db:migrate
```

### Retieve databse backup data
```sh
mysql -u {user} -p{password} -h 127.0.0.1 -P 3306 {database} < .//db_backup.sql
```
Replace `{user}`, `{password}` and `{databse}` with your MySQL username, password and databse name.

#### Development
```sh
npm i
npm run dev
```

#### Production
##### Using NodeJs
```sh
npm i
npm run build
npm run start
```
Server will be serve at `localhost:8080`
##### Using Docker container
Build and run a Docker container in this directory by running
```sh
docker build -t {image-name}.
docker run --name {container-name} -p {port}:8080 {imaage-name}
```
Replace {image-name}, {port} and {container-name} with the actual value.
    The admin panel will be availabe at <localhost:{port}>




### Dependences
- Database
