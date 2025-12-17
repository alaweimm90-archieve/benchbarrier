import { createPlatformViteConfig } from '@monorepo/config/vite/platform-factory';
import react from '@vitejs/plugin-react-swc';
import { componentTagger } from 'lovable-tagger';

export default createPlatformViteConfig({
  platform: 'benchbarrier',
  port: 8080,
  plugins: [react(), componentTagger()],
});
