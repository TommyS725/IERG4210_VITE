import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

import react from '@vitejs/plugin-react-swc'

const server = process.env.API_SERVER || "http://localhost:8080";


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
      "/images": server,
      "/api": server,
    },
  },
  preview: {
    port: 3000
  },
  
})
