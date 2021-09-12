import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { resolve } from 'path'
const {resolve} = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 使用相对路径
  build: {
    chunkSizeWarningLimit: 1000, // 数值vite打包的块的大小的限制，默认是500kb
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'data': resolve(__dirname, 'data'),
    },
  },
  plugins: [vue()]
})
