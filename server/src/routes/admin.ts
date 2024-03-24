import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import { requireAdmin, setCsrfCookie } from "../lib/middleware.js";

//base path = /admin
const admin = new Hono();
const adminHTML = fs.readFileSync("./admin/index.html", "utf-8");


admin.use(requireAdmin);


admin.use(
  "/assets/*",
  requireAdmin,
  serveStatic({
    root: "./admin",
    rewriteRequestPath: (path) => path.replace(/^\/admin/, ""),
  })
);

admin.use(
    "/favicon.ico",
    serveStatic({
      root: "./admin",
      rewriteRequestPath: (path) => path.replace(/^\/admin/, ""),
    })
  )

admin.get("*" ,requireAdmin,setCsrfCookie, (c) => c.html(adminHTML));

export default admin;
