import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <App />
=======
    <BrowserRouter>
      <App />
    </BrowserRouter>
>>>>>>> 2b09af75da2417e774c31ac4ae64e243ed682c2b
  </React.StrictMode>,
);
