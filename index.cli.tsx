import React from 'react';
import { createRoot } from 'react-dom/client';
import { index as Deltametrician } from './client/FundratesArb';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <Deltametrician />
    </React.StrictMode>
  );
}
