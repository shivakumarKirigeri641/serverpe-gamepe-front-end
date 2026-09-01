import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Policies from './pages/Policies.jsx';
import { I18nProvider } from './i18n/index.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* Outside Helmet's consumer so the chosen language is available to the
          <title> and og: tags as well as to the page itself. */}
      <I18nProvider>
        {/* The site is one marketing page plus the policies. The policies are
            real routes rather than anchors because that is what gets linked to:
            Meta, Razorpay and the app stores all ask for a direct URL to the
            privacy policy, and "scroll down on this page" is not a URL. */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/policies/:doc" element={<Policies />} />
            {/* Anything else is the marketing page: a mistyped URL should show
                the product, not an error. */}
            <Route path="*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </I18nProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
