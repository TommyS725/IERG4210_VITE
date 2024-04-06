# Frontend

## Overview
This is the frontend client for shopping website built by React.

## Important
You have to disable uBlock origin to access PayPal function sucessfully. 

## PayPal sign up
You have to sign up for a PayPal developer account at <https://developer.paypal.com/dashboard/accounts>.

## Enviornment set up
Create a env file with thefollowings, you can also refer to `.env.example`.
1. A working API server (by default, this is set to <http://localhost:8080>. Note: This is not used or required when using Docker Compose).
2. Your PayPal client id (required)
```ini
API_SERVER='API server URL'
VITE_PAYPAL_CLIENT_ID='your PayPal client id'
```


## Installation
Require NodeJS

### Development

1. Install dependences
```sh
npm i
```
2. Start the dev server
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
The fronted client will be availabe at <localhost:3001>

#### Using Docker container
Build and run a Docker container in this directory by running
```sh
docker build -t {image-name} .
docker run --name {container-name} -p {port}:3000 {imaage-name}
```
Replace {image-name}, {port} and {container-name} with the actual value.
The fronted client will be availabe at <localhost:{port}>

### Features

Shopping cart can be displayed by hovering the cart icon. Input boxes are avaiable to edit the quantity of cart items when the input value is within the product quantity.


The product pages cam be navigated by clicking the thumbnail or product name.

A hierarchical navigation menu is avaiable at the top of home page, category pages and product pages, the links can be used to navigate between routes.

Checkout and user features are availabe at the top header bar.



### Dependences
- API Server


