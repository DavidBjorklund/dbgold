import React from 'react';
import ReactDOM from 'react-dom';
import './fonts/fonts.css';
import './index.min.css';
import App from './app/index.js';

import AppContextProvider from './app/context';

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.querySelector('body')
);
