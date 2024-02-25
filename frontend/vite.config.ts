import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

import react from '@vitejs/plugin-react-swc'

const apiServer = "http://localhost:8080"
const imageServer = "http://localhost:8888"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
  ],
  server: {
    port: 3000,
    host:true,
    proxy: {
      "/images": {
        target: imageServer,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/images/, '')
      },
      "/api": apiServer,
    },
  },
  preview: {
    port: 3000
  },
  
})
