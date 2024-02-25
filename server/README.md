# Backend Server

## Overview
This is the backend server  serving api for database query and mutation.

## Get started
NodeJs and mysql server are required

#### Create  `.env ` file
```ini
DB_URL = 'mysql2://{user}:{password}@{host}:{port}/{database}'
```
#### Install dependences
```sh
npm install
```

#### Development
```sh
npm run dev
```

#### Production
```sh
npm run build
npm run start
```

Server will be serve at `localhost:8080`

#### Serve Images
To serve images for development, run
```sh
npm run dev:iamges
```
Images will be serve at `localhost:8888/images`



### Dependences
- Database
