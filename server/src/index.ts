import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import fs from 'fs';
import categories from './routes/categories.js';
import products from './routes/products.js';

const port  = 8080 as const 

const API_VERSION = 'v1'

const app= new Hono()

//logging
app.use(logger())

// cors
app.use(cors())

// categories
app.basePath(`/api/${API_VERSION}`)
.route('/categories', categories,)

//products
app.basePath(`/api/${API_VERSION}`)
.route('/products', products)

//serve static files
// app.get('/images/*', serveStatic({root:"./"}))
  
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
