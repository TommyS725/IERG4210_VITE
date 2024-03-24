# Admin Panel

## Overview
This is the admin panel to provide the graphical  interface for API server, bult by vue with typesciprt and bundle by Vite.

## Installation
Require NodeJS for development
### Development
1. Create a env file with working api server (default to be <http://localhost:8080>)
```ini
API_SERVER='API server URL'
```
2. Install dependences
```sh
npm i
```
3. Start the dev server
```sh
npm run dev
```

4. The admin panel will be availabe at <localhost:5001>
### Production
#### Using NodeJS
Create production build
```sh
npm i
npm run build
```
##### Using preview server
```sh
npm run preview
```
The admin panel will be availabe at <localhost:5001>
##### Serve static contents
Serve the static contents at `./dist/` using applications like `nginx`.

#### Using Docker container
Build and run a Docker container in this directory by running
```sh
docker build -t {image-name}.
docker run --name {container-name} -p {port}:5001 {imaage-name}
```
Replace {image-name}, {port} and {container-name} with the actual value.
The admin panel will be availabe at <localhost:{port}>

### Features

This admin panel provide create/update/delete operation to call the management API.
Th server should be first running, and then login at frontend client to gain credidential.

### Possible Issues
Since the category list automatically populate from DB,  
please check the server connection when encountering error from loading or any other requests.

### Dependences
- API Server
- Frontend client

