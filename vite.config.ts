import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from GitHub Pages at https://ravvo-717.github.io/mystuff/
export default defineConfig({
  base: '/mystuff/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
        learn: resolve(import.meta.dirname, 'learn.html'),
      },
    },
  },
})
