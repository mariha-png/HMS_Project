import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// LuxuryStay HMS Functionality
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./store/auth"; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);