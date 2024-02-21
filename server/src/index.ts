import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { logger } from 'hono/logger';
import fs from 'fs';
import categories from './routes/categories.js';
import products from './routes/products.js';
import { adminAuth } from './auth.js';

const port  = 8080 as const 

const API_VERSION = 'v1'

const app= new Hono()

//logging
app.use(logger())

// categories
app.basePath(`/api/${API_VERSION}`)
.route('/categories', categories,)

//products
app.basePath(`/api/${API_VERSION}`)
.route('/products', products)


  
//serve thumbnails
app.get('/thumbnails/:filename',  (c) => {
  const filename = c.req.param('filename')
  const filepath = `./images/${filename}`
  const buffer = fs.readFileSync(filepath);
  c.status(200)
  c.header('Content-Type', 'image/png') // means binary data
  return c.body(buffer)
})


console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
