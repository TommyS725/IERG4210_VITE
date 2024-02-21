import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
  ],
  server: {
    port: 3000,
    proxy: {
      "/images": "http://localhost:8080/",
      "/api":"http://localhost:8080/",
    },
  },
  preview: {
    port: 3000
  },
  
})
