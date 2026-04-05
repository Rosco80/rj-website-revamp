import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 6000,
    rollupOptions: {
      output: {
        manualChunks: {
          'sanity-vendor': ['sanity', '@sanity/client', '@sanity/icons'],
          'lucide-vendor': ['lucide-react'],
        }
      }
    }
  }
})
