import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 配置代理
  server: {
    proxy: {
      // 获取路径中包含/api的请求
      '/api': {
        // 后台服务所在的源
        target: 'http://localhost:81',
        // 修改源
        changeOrigin: true,
        // api替换为''
        rewrite: (path) => path.replace(/^\/api/,'')
      }
    }
  }
})

