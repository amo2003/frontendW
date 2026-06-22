import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from '@asgardeo/auth-react';
import App from './App';
import './index.css';

const BASE_URL = process.env.REACT_APP_ASGARDEO_BASE_URL;

const authConfig = {
  signInRedirectURL: window.location.origin,
  signOutRedirectURL: window.location.origin,
  clientID: process.env.REACT_APP_ASGARDEO_CLIENT_ID,
  baseUrl: BASE_URL,
  scope: ['openid', 'profile', 'email'],
  endpoints: {
    authorizationEndpoint: `${BASE_URL}/oauth2/authorize`,
    tokenEndpoint: `${BASE_URL}/oauth2/token`,
    endSessionEndpoint: `${BASE_URL}/oidc/logout`,
    jwksUri: `${BASE_URL}/oauth2/jwks`,
    revocationEndpoint: `${BASE_URL}/oauth2/revoke`,
    checkSessionIframe: `${BASE_URL}/oidc/checksession`,
    wellKnownEndpoint: `${BASE_URL}/oauth2/token/.well-known/openid-configuration`,
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
