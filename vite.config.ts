import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Music Theory',
        short_name: 'MusicTheory',
        description: 'Interactive music theory explorer',
        theme_color: '#09090b',
        background_color: '#09090b',
        display: 'standalone',
        icons: [
          {
            src: '/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        globIgnores: ['**/vexflow*'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /\/assets\/vexflow-.*\.js$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'vexflow-cache',
              expiration: { maxEntries: 2, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/vexflow')) return 'vexflow';
          if (id.includes('node_modules/framer-motion')) return 'framer-motion';
          if (id.includes('node_modules/zustand')) return 'zustand';
          if (id.includes('node_modules/react-i18next') || id.includes('node_modules/i18next')) return 'i18next';
          if (id.includes('node_modules/@supabase')) return 'supabase';
        },
      },
    },
  },
})
