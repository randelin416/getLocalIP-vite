import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import os from 'os'

// 定義獲取本地 IP 的函數
function getNetworkIp() {
  let needHost = '';
  try {
    const network = os.networkInterfaces();
    for (const dev in network) {
      const iface = network[dev];
      if (iface) { // 添加這個條件檢查，確保 iface 有被定義
        for (let i = 0; i < iface.length; i++) {
          const alias = iface[i];
          if (
            alias.family === 'IPv4' &&
            alias.address !== '127.0.0.1' &&
            !alias.internal
          ) {
            needHost = alias.address;
          }
        }
      }
    }
  } catch (e) {
    needHost = 'localhost';
  }
  return needHost;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'import.meta.env.BASE_IP': JSON.stringify(`http://${getNetworkIp()}:${process.env.PORT || 3000}`)
  },
  server: {
    port: process.env.PORT || 3000
  }
})
