import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "@hono/node-server/serve-static";
import { cors } from "hono/cors";



//routes
import categories from "./routes/categories.js";
import products from "./routes/products.js";
import shoppingCart from "./routes/shopping-cart.js";
import authHandler from "./routes/auth.js";
import admin from "./routes/admin.js";
import mainpage from "./routes/mainpage.js";
import Redis from "./lib/redis.js";

const port = 8080 as const;

const API_VERSION = "v1";

const app = new Hono();

//images
app.use("/images/*", serveStatic({ 
  root: "./images",
  rewriteRequestPath: (path) => path.replace(/^\/images/, ""), 

}));


//logging
app.use(logger());


// cors
// app.use(cors({
//   origin:["http://localhost:3000","http://localhost:8080","http://localhost:5001"],
// }));
app.use(cors());


//api
app
  .basePath(`/api/${API_VERSION}`)
  .route("/categories", categories)
  .route("/products", products)
  .route("/shopping-cart", shoppingCart)
  .route("/auth", authHandler)
  .all("*", (c) => c.notFound());



  
//front end

//admin
app.route("/admin", admin);

//mainpage
app.route("/", mainpage);




console.log(`Server is running on port ${port}`);
console.log('Local:','\x1b[36m', `http://localhost:${port}`,'\x1b[0m');




serve({
  fetch: app.fetch,
  port,
});
