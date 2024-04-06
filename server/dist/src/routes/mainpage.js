import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import { setCsrfCookie } from "../lib/middleware.js";
const htmlPath = "./client/index.html";
const mainpage = new Hono()
    .use("/assets/*", serveStatic({
    root: "./client",
}))
    .use("/favicon.ico", serveStatic({
    root: "./client",
}))
    .get("/*", setCsrfCookie, (c) => c.html(fs.readFileSync(htmlPath, "utf-8")));
export default mainpage;
