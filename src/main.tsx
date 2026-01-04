import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize monitoring and analytics
import { initMonitoring } from './lib/monitoring';

// Initialize monitoring services
initMonitoring();

createRoot(document.getElementById('root')!).render(<App />);
