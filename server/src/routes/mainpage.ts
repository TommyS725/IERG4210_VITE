import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import { setCsrfCookie } from "../lib/middleware.js";

const indexHTML = fs.readFileSync("./client/index.html", "utf-8");

const mainpage = new Hono()
  .use(
    "/assets/*",
    serveStatic({
      root: "./client",
    })
  )
  .use(
    "/favicon.ico",
    serveStatic({
      root: "./client",
    })
  )
    .get("/*", setCsrfCookie,(c) => c.html(indexHTML));
export default mainpage;
