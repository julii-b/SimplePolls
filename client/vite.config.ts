import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'favicon.svg',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'favicon-96x96.png',
        'apple-touch-icon.png',
        'mask-icon.svg',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'pwa-maskable-192x192.png',
        'pwa-maskable-512x512.png',
        'Logo.png',
        'LogoSad.png',
        'LogoCreate.png',
        'LogoParticipate.png',
        'offline.html'
      ],
      manifest: {
        name: 'SimplePolls',
        short_name: 'SimplePolls',
        description: 'Create and participate in real-time polls.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#C3A3CC',
        theme_color: '#6F2F5D',
        orientation: 'portrait',
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: '/pwa-maskable-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: '/pwa-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,webp}'],
        navigateFallback: '/index.html',
      }
    })
  ],
  server: {
    allowedHosts: [
      "172.17.0.1",
      "172.17.0.2",
      "172.17.0.3",
      "172.17.0.4",
      "172.17.0.5",
      "simplepolls.julius-busch.com"
    ],
  },
})
