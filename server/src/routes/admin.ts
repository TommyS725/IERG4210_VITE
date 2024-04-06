import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import { requireAdmin, requireSecure, setCsrfCookie } from "../lib/middleware.js";

//base path = /admin
const adminPage = new Hono();
const htmlPath = "./admin/index.html";


adminPage.use(requireSecure)
adminPage.use(requireAdmin);


adminPage.use(
  "/assets/*",
  requireAdmin,
  serveStatic({
    root: "./admin",
    rewriteRequestPath: (path) => path.replace(/^\/admin/, ""),
  })
);

adminPage.use(
    "/favicon.ico",
    serveStatic({
      root: "./admin",
      rewriteRequestPath: (path) => path.replace(/^\/admin/, ""),
    })
  )

adminPage.get("*" ,requireAdmin,setCsrfCookie,  (c) => c.html(fs.readFileSync(htmlPath, "utf-8"))  );

export default adminPage;
