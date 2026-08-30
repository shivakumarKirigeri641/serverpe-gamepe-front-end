import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The public site reads facts from the back-end — company details, plans and
// policies — so a price or an address changes in one place and appears here
// without a deploy.
const API = process.env.VITE_PROXY_TARGET || 'http://localhost:5009';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    proxy: { '/serverpe': { target: API, changeOrigin: true } },
  },
});
