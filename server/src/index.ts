import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "@hono/node-server/serve-static";
import { cors } from "hono/cors";

//routes
import categoriesHandler from "./routes/categories.js";
import productsHandler from "./routes/products.js";
import shoppingCartHandler from "./routes/shopping-cart.js";
import authHandler from "./routes/auth.js";
import adminPage from "./routes/admin.js";
import mainpage from "./routes/mainpage.js";
import ordersHandler from "./routes/orders.js";
import { checkDbConnection } from "./db/client.js";
import Redis from "./lib/redis.js";

const port = 8080 as const;

const API_VERSION = "v1";

const app = new Hono();

// const isDev = process.env.IS_DEV === "true";

// app.use(async(c,next)=>{
//   Cookies.setTestCookie(c);
//   await next()
// })

//images
app.use(
  "/images/*",
  serveStatic({
    root: "./images",
    rewriteRequestPath: (path) => path.replace(/^\/images/, ""),
  })
);

//logging
app.use(logger());

// cors

// if (isDev) {
app.use(cors());
// }

//haelth check
app.get("/healthz", async c => {
  return await Promise.all([checkDbConnection(), Redis.checkHealth()])
  .then(() => c.json({status: "ok"}))
  .catch((e) => c.body(null,500));
});

//api
app
  .basePath(`/api/${API_VERSION}`)
  .route("/categories", categoriesHandler)
  .route("/products", productsHandler)
  .route("/shopping-cart", shoppingCartHandler)
  .route("/orders", ordersHandler)
  .route("/auth", authHandler)
  .all("*", (c) => c.notFound());

//front end

//admin
app.route("/admin", adminPage);

//mainpage
app.route("/", mainpage);

console.log(`Server is running on port ${port}`);
console.log("Local:", "\x1b[36m", `http://localhost:${port}`, "\x1b[0m");

serve({
  fetch: app.fetch,
  port,
});
