import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),],
  //base: './',	//不加打包后白屏
  server: {             
    host: '0.0.0.0',	
    port: 8899,      
    proxy: {
      '/viewTaiwan': {
          target: 'http://localhost:8008/',
          changeOrigin: true,
          ws: true,
          rewrite: path =>path.replace(/^\/viewTaiwan/,'')
          
      },
  }
  },
  resolve:{   
    alias:[   
      {
        find:'@',
        replacement:resolve(__dirname,'src') 
      }
    ]
  }
})



