import React from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import './Navbar.css';

export default function Navbar() {
  const { state, signIn, signOut } = useAuthContext();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="flag">🇱🇰</span>
        <span className="brand-name">Lanka Weather</span>
      </div>

      <div className="navbar-right">
        {state.isAuthenticated ? (
          <>
            <span className="user-name">
              {state.displayName || state.username}
            </span>
            <button className="btn btn-outline" onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
