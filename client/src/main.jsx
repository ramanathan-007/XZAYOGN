import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

<GoogleOAuthProvider clientId="982628677943-m9cl6ldi8hfsfrkn59p5a2ohe39a0it5.apps.googleusercontent.com">
  <App />
</GoogleOAuthProvider>

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

