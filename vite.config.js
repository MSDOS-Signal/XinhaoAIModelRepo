import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  // 读取 .env 中的密钥(不暴露给前端,因为变量名不以 VITE_ 开头)
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.NVIDIA_API_KEY || ''

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 5173,
      proxy: {
        // 开发环境:Vite 代理注入 API Key,前端零接触密钥
        '/nvapi': {
          target: 'https://integrate.api.nvidia.com',
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/nvapi/, '/v1'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (apiKey) {
                proxyReq.setHeader('Authorization', `Bearer ${apiKey}`)
              }
            })
          }
        }
      }
    }
  }
})
