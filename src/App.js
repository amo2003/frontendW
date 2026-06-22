import React from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import './App.css';

function App() {
  const { state } = useAuthContext();

  if (state.isLoading) {
    return (
      <div className="app-loading">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar />
      {state.isAuthenticated ? <Dashboard /> : <Login />}
    </div>
  );
}

export default App;
