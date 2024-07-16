import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'production',
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/main.[hash].js',
				assetFileNames(chunkInfo) {
          if (chunkInfo.name === 'index.css') { 
            return 'assets/main.[hash].css';
          }
          return 'assets/[name].[ext]'
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@modules': path.resolve(__dirname, './src/modules'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/_typo.scss";',
      },
    },
  },
});
