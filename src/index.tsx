import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Theme } from '@radix-ui/themes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Theme>
    <App />
  </Theme>
);

reportWebVitals();
