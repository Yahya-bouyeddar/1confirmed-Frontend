import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx' // <-- importe AuthProvider
import React from 'react';

import ReactDOM from 'react-dom/client';



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

  <AuthProvider>    
    <App />
  </AuthProvider>

  </React.StrictMode>
)
