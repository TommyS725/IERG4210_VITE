import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import fs from 'fs';

import categories from './routes/categories.js';
import products from './routes/products.js';
import shoppingCart from './routes/shopping-cart.js';

const port  = 8080 as const 

const API_VERSION = 'v1'

const app= new Hono()

//logging
app.use(logger())

// cors
app.use(cors())

const api = app.basePath(`/api/${API_VERSION}`)
.route('/categories', categories,) 
.route('/products', products)
.route('/shopping-cart', shoppingCart )

//serve static files
// app.get('/images/*', serveStatic({root:"./"}))
  
// serve thumbnails
app.get('/thumbnails/:filename',  (c) => {
  const filename = c.req.param('filename')
  const extension = filename.split('.').pop()
  console.log(`filename: ${filename}, extension: ${extension}`)
  const filepath = `./images/${filename}`
  const buffer = fs.readFileSync(filepath).buffer  as ArrayBuffer
  c.status(200)
  c.header('Content-Type', `image/${extension}`) // means binary data
  return c.body(buffer)
})


console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})



