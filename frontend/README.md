# Frontend

## Overview
This is the frontend client for shopping website built by React.

## Installation
Require NodeJS
### Development
1. Install dependences
```sh
npm i
```
2. Start the server
```sh
npm run dev
```

3. The fronted client will be availabe at <localhost:3000>
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
The admin panel will be availabe at <localhost:3001>
##### Serve static contents
Serve the static contents at `./_dist/` using applications like `nginx`.

#### Using Docker container
Build and run a Docker container in this directory by running
```sh
docker build -t {image-name}.
docker run --name {container-name} -p {port}:80 {imaage-name}
```
Replace {image-name}, {port} and {container-name} with the actual value.
The admin panel will be availabe at <localhost:{port}>

### Features

Shopping cart can be displayed by hovering the cart icon. Input boxes are avaiable to edit the quantity of cart items when the input value is within the product quantity.


The product pages cam be navigated by clicking the thumbnail or product name.

A hierarchical navigation menu is avaiable at the top of home page, category pages and product pages, the links can be used to navigate between routes.


### Dependences
- API Server
- Images Server


