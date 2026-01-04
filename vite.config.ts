<<<<<<< HEAD
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { componentTagger } from 'lovable-tagger';
import path from 'path';

export default defineConfig({
  plugins: [react(), componentTagger()],
  server: {
    port: 8080,
    host: '::',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
  },
=======
import { createPlatformViteConfig } from '@monorepo/config/vite/platform-factory';
import react from '@vitejs/plugin-react-swc';
import { componentTagger } from 'lovable-tagger';

export default createPlatformViteConfig({
  platform: 'benchbarrier',
  port: 8080,
  plugins: [react(), componentTagger()],
>>>>>>> 623e480dcc1a2bebb533e82725535f85f9aba148
});
