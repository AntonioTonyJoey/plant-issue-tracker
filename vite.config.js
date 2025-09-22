import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Esto expone el servidor a todas las interfaces
    port: 5173         // Asegúrate de que este es el puerto correcto
  }
})
