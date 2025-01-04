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
            name: "wrapper-app",
            remotes: {
                movies: "http://localhost:5001/assets/moviesRemoteEntry.js",
            },
        }),
    ],
    build: {
        modulePreload: false,
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
    },
})
