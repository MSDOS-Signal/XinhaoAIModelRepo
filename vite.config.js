import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    proxy: {
      // 开发环境代理,避免浏览器跨域;生产环境直连 integrate.api.nvidia.com(支持 CORS)
      '/nvapi': {
        target: 'https://integrate.api.nvidia.com',
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/nvapi/, '/v1')
      }
    }
  }
})
