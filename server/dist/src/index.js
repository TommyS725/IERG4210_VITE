import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import fs from 'fs';
import categories from './routes/categories.js';
import products from './routes/products.js';
const port = 8080;
const app = new Hono();
// categories
app.route('/categories', categories);
//products
app.route('/products', products);
//serve images
app.use('/images/*', serveStatic({ root: './' }));
//serve thumbnails
app.get('/thumbnails/:filename', (c) => {
    const filename = c.req.param('filename');
    const filepath = `./images/${filename}`;
    const buffer = fs.readFileSync(filepath);
    c.status(200);
    c.header('Content-Type', 'image/png'); // means binary data
    return c.body(buffer);
});
console.log(`Server is running on port ${port}`);
serve({
    fetch: app.fetch,
    port
});
