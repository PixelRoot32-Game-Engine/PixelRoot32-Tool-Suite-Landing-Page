import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import type { IncomingMessage } from 'node:http'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Local development path
const localLibPath = path.resolve(__dirname, '../PixelRoot32 Components Landing Page')
const isLocalDev = fs.existsSync(localLibPath)

function isVercelPreviewUrl(url: string): boolean {
  try {
    const u = new URL(url)
    return u.protocol === 'https:' && u.hostname.endsWith('.vercel.app')
  } catch {
    return false
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const previewTarget = env.PREVIEW_PROXY_TARGET?.replace(/\/$/, '')
  const bypassSecret = env.VERCEL_AUTOMATION_BYPASS_SECRET

  const usePreviewProxy =
    Boolean(previewTarget && bypassSecret) && isVercelPreviewUrl(previewTarget)

  const devApiDirect = env.VITE_DEV_API_DIRECT === 'true' && Boolean(env.VITE_API_BASE)
  if (mode === 'development' && !(previewTarget && bypassSecret) && !devApiDirect) {
    console.warn(
      '[vite] Local /api checkout: add PREVIEW_PROXY_TARGET + VERCEL_AUTOMATION_BYPASS_SECRET to .env.local ' +
        'to proxy protected previews, or set VITE_DEV_API_DIRECT=true with VITE_API_BASE in checkout.',
    )
  }

  return {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        'pixelroot32-components-landing-page/src': isLocalDev
          ? path.resolve(localLibPath, 'src')
          : path.resolve(__dirname, 'node_modules/pixelroot32-components-landing-page/src'),
        'pixelroot32-components-landing-page': isLocalDev
          ? path.resolve(localLibPath, 'src/index.ts')
          : path.resolve(__dirname, 'node_modules/pixelroot32-components-landing-page/src/index.ts'),
      },
    },
    base: './',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
    ...(usePreviewProxy
      ? {
          server: {
            proxy: {
              '/api': {
                target: previewTarget,
                changeOrigin: true,
                secure: true,
                // http-proxy attaches .on(); Vite typings omit it
                configure(proxy) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ;(proxy as any).on(
                    'proxyReq',
                    (proxyReq: { setHeader: (k: string, v: string) => void }, req: IncomingMessage) => {
                      proxyReq.setHeader('x-vercel-protection-bypass', bypassSecret!)
                      console.info(
                        `[vite proxy] ${req.method ?? '?'} ${req.url ?? ''} → ${previewTarget}`,
                      )
                    },
                  )
                },
              },
            },
          },
        }
      : {}),
  }
})
