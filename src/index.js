import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from '@asgardeo/auth-react';
import App from './App';
import './index.css';

const authConfig = {
  signInRedirectURL: 'http://localhost:3000',
  signOutRedirectURL: 'http://localhost:3000',
  clientID: process.env.REACT_APP_ASGARDEO_CLIENT_ID,
  baseUrl: process.env.REACT_APP_ASGARDEO_BASE_URL,
  scope: ['openid', 'profile', 'email'],
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
