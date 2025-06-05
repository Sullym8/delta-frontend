import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({devOptions: { enabled: true }, registerType: 'autoUpdate', 
    manifest: {
        name: 'Delta Fantasy F1',
        short_name: 'Delta F1',
        description: 'Delta Fantasy F1 is a fantasy Formula 1 game where you can create your own team, select drivers, and compete against others.',
        theme_color: '#09090B',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }})],
})