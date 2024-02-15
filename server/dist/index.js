import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { readFile } from "node:fs/promises";
// add api routes
const pathToFrontend = "../frontend/dist/";
let html = await readFile(pathToFrontend + "index.html", "utf8");
const app = new Hono()
    .use("/*", serveStatic({ root: pathToFrontend })) // path must end with '/'
    .get("/*", c => c.html(html));
const port = 3000;
console.log(`Server is running on port ${port}`);
serve({
    fetch: app.fetch,
    port
});
