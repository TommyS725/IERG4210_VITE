import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono()
const port = 8888

app.use(logger())

//serve images
app.use('/images/*', serveStatic({ root: './../server/' }))

console.log(`Images server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
