import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "172.17.0.1",
      "172.17.0.2",
      "172.17.0.3",
      "172.17.0.4",
      "172.17.0.5",
      "workspace.julius-busch.com"
    ],
  },
})
