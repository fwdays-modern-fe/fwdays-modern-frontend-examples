import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa";

const manifest = {
    "name": "Expense App",
    "short_name": "ExpenseApp",
    "start_url": "/index.html",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#ffffff",
    "orientation": "portrait-primary"
};

export default defineConfig({
    plugins: [VitePWA({
        registerType: 'autoUpdate', // 'prompt'
        includeAssets: ['assets/logo.png'],
        manifest,
        workbox: {
            swDest: 'service-worker.js',
            runtimeCaching: [
                {
                    urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'bulma-cache',
                        expiration: {
                            maxEntries: 10,
                            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
                        },
                        cacheableResponse: {
                            statuses: [0, 200]
                        }
                    }
                },
                {
                    urlPattern: /^https:\/\/www\.gstatic\.com\/.*/i,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'firebase-cache',
                        expiration: {
                            maxEntries: 10,
                            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
                        },
                        cacheableResponse: {
                            statuses: [0, 200]
                        },
                    }
                }
            ]
        }
    })],
})
