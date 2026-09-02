import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * The public site reads facts from the back-end - company details, plans,
 * policies and approved testimonials - so a price or an address changes in one
 * place and appears here without a deploy.
 *
 * The target MUST come through loadEnv. Vite does not populate process.env
 * from .env files when evaluating this config; only `import.meta.env` inside
 * the app gets them. Reading process.env here silently falls through to the
 * default, which is exactly how this site ended up talking to an old back-end
 * on another port while .env clearly said otherwise.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const API = env.VITE_PROXY_TARGET || 'http://localhost:5006';

  // Printed on every start: a site quietly reading the wrong back-end looks
  // like stale content, not like a misconfiguration.
  console.log(`\n  marketing site → API proxy target: ${API}\n`);

  return {
    plugins: [react()],
    server: {
      port: 5175,
      // Fail loudly rather than hopping to another port - a moved port means
      // the URL in your browser silently stops working.
      strictPort: true,
      proxy: { '/serverpe': { target: API, changeOrigin: true } },
    },
  };
});
