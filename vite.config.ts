import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { componentTagger } from 'lovable-tagger';
import path from 'path';
import { copyFileSync } from 'fs';

export default defineConfig({
  plugins: [
    react(), 
    componentTagger(),
    {
      name: 'copy-redirects',
      closeBundle() {
        copyFileSync('_redirects', 'dist/_redirects');
      }
    }
  ],
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
});
