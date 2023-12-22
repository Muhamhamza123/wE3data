import React, { useState } from 'react';

import { Navigate } from 'react-router-dom';
import '../styles/Welcom.css'; // Make sure the path to your CSS file is correct

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8', // Include charset
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      if (response.ok) {
        const token = response.headers.get('Authorization');
        if (token) {
          // Log the token to the console (for development/debugging purposes only)
          console.log('Token:', token);
  
          // Store the token in local storage
          localStorage.setItem('access_token', token);
        }
  
        setSuccess(true);
      } else {
        // Handle login failure
        console.error('Login failed:', response.statusText);
        setSuccess(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setSuccess(false);
    }
  };
  
  

  if (success) {
    return <Navigate to={`/home/${username}`} />;
  }

  return (
    <div className="welcome-container">
      <div className="login_form">
      <h1>Login</h1>
      <input 
        type="text"
        placeholder="Username"
        id="username" // Add an id attribute
        name="username" // Add a name attribute
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username" // Add autocomplete attribute
      />
      <input
        type="password"
        placeholder="Password"
        id="password" // Add an id attribute
        name="password" // Add a name attribute
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password" // Add autocomplete attribute
      />
      <button onClick={handleLogin}>Login</button>
      {success !== null && (
        <p>{success ? 'Login successful' : 'Login failed'}</p>
      )}
    </div>
    </div>
  );
};

export default Login;
