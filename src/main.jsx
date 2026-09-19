import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { registerServiceWorker } from './pwa/registerServiceWorker';

const container = document.getElementById('root');
if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Initialize Progressive Web App Service Worker
registerServiceWorker();
