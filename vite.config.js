import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { crx } from '@crxjs/vite-plugin';
import manifest from './public/manifest.json';

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  define: {
    'process.env': {},
    __DEV__: false,
    chrome: 'chrome'
  }
});
