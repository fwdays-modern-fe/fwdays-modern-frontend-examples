import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import TanStackRouterVite from "@tanstack/router-plugin/vite";

import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        TanStackRouterVite(),
        federation({
            name: 'wrapper-app',
            remotes: {
                movies: "http://localhost:5001/assets/moviesRemoteEntry.js",
                angularApp: {
                    external: 'http://localhost:4201/remoteEntry.js',
                    externalType: 'url',
                    format: 'var',
                }
            },
            shared: ['react', 'react-dom', 'zustand']
        }),
    ],
    build: {
        modulePreload: false,
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
        rollupOptions: {
            external: ['angularApp/Watchlist']
        }
    },
})
