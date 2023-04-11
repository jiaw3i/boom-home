import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({mode}) =>
{
    return defineConfig({

        plugins: [react()],
        base: "/",
        server: {
            proxy: {
                '/api': {
                    target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        }
    })
}
