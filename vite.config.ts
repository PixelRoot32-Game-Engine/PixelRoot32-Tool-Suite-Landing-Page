import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      'pixelroot32-components-landing-page/src': path.resolve(__dirname, 'node_modules/pixelroot32-components-landing-page/src'),
      'pixelroot32-components-landing-page': path.resolve(__dirname, 'node_modules/pixelroot32-components-landing-page/src/index.ts')
    }
  },
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
