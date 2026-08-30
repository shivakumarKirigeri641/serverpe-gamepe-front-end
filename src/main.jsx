import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { I18nProvider } from './i18n/index.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* Outside Helmet's consumer so the chosen language is available to the
          <title> and og: tags as well as to the page itself. */}
      <I18nProvider>
        <App />
      </I18nProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
