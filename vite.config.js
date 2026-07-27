import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const privacyContactEmail = process.env.VITE_PRIVACY_CONTACT_EMAIL || env.VITE_PRIVACY_CONTACT_EMAIL

  if (mode === 'production' && !privacyContactEmail?.trim()) {
    throw new Error('VITE_PRIVACY_CONTACT_EMAIL is required for production builds')
  }

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
        },
        '/media': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
        },
      },
    },
  }
})