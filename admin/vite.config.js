// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: '_dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        category: resolve(__dirname, '/category/index.html'),
        category_insert: resolve(__dirname, '/category/insert/index.html'),
        category_update: resolve(__dirname, '/category/update/index.html'),
        category_delete: resolve(__dirname, '/category/delete/index.html'),
        product: resolve(__dirname, '/product/index.html'),
        product_insert: resolve(__dirname, '/product/insert/index.html'),
        product_update: resolve(__dirname, '/product/update/index.html'),
        product_delete: resolve(__dirname, '/product/delete/index.html'),
      },
    },
  },
  server:{
    port:3001
  },
  preview: {
    port: 3001,
  },
})