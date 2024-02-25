# Admin Panel

## Overview
This is the admin panel to provide the graphical  interface for API server, bult by vanllia typesciprt and bundle by Vite.

## Installation
Require NodeJS for development
### Development
1. Install dependences
```sh
npm i
```
2. Start the server
```sh
npm run dev
```

3. The admin panel will be availabe at <localhost:3001>
### Production
- Create production build
```sh
npm run build
npm run preview
```
The admin panel will be availabe at <localhost:3001>
-  Serve the static contents at `./_dist/` using applications like `nginx`.

### Features

This admin panel provide create/update/delete operation to call the management API.
Th server should be first running, and then the correct host in the header bar, e.g. `http://localhost:3000`.
Calling API require basic auth, which can also be set in the header bar.
Default auth set in server:
- username: `admin`
- pw: `admin`


