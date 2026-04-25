import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// If deploying to GitHub Pages at https://<user>.github.io/wedding/
// set base to '/wedding/'. For Netlify / Cloudflare Pages / a custom
// domain at the root, leave it as '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
});
