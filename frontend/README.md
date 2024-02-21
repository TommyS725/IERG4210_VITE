# Frontend

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
or
```sh
npm run build
npm run preview
```
3. The fronted client will be availabe at <localhost:3000>
### Production
1. Create production build
```sh
npm run build
npm run preview
```
2.  Serve the static contents at `./dist/` using applications like `nginx`.

### Features
To perform the tableless layout n home page, 5 dummy products are repeatedly displayed in the home page.

Shopping cart can be displayed by hovering the cart icon. Input boxes are avaiable to edit the quantity of cart items when the input value is within the product quantity.

To perform different layout for both sufficient and insufficient inventory, the products are grouped as follows:

- Enough inventory (x>3)
  1. Shirt (30)
  2. Vitamin (20)
- Insufficient inventory (x<=3)
  1. Macbook (1)
  2. Snack Box (2)
  3. Luggage (3)

The product pages cam be navigated by clicking the thumbnail or product name, the layouts are different for the two groups.

A hierarchical navigation menu is avaiable at the top of home page, category pages and product pages, the links can be used to navigate between routes.


