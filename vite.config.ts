import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path";

// https://vitejs.dev/config/
export default ({mode}) => {
    return defineConfig({

        plugins: [react()],
        base: "/",
        server: {
            host: '0.0.0.0',
            proxy: {
                '/api': {
                    target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                },
                '/blog/atom.xml': {
                    target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/blog/, 'post')
                }
            }
        },
        resolve: {
            alias: {
                "@/": `${resolve(__dirname, "src")}/`,
            },
        }
    })
}
