import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Local development path
const localLibPath = path.resolve(__dirname, '../PixelRoot32 Components Landing Page')
const isLocalDev = fs.existsSync(localLibPath)

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      'pixelroot32-components-landing-page/src': isLocalDev 
        ? path.resolve(localLibPath, 'src')
        : path.resolve(__dirname, 'node_modules/pixelroot32-components-landing-page/src'),
      'pixelroot32-components-landing-page': isLocalDev
        ? path.resolve(localLibPath, 'src/index.ts')
        : path.resolve(__dirname, 'node_modules/pixelroot32-components-landing-page/src/index.ts')
    }
  },
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
