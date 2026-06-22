import React from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import './Login.css';

export default function Login() {
  const { signIn } = useAuthContext();

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">🇱🇰</div>
        <h1>Lanka Weather</h1>
        <p>Live weather forecasts for Sri Lanka, powered by real-time data.</p>
        <button className="btn btn-primary btn-large" onClick={() => signIn()}>
          Sign in with Asgardeo
        </button>
        <p className="login-note">Secure login via WSO2 Asgardeo</p>
      </div>
    </div>
  );
}
