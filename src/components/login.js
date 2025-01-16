import React, { useState } from 'react';
import { loginWithEmail, signInWithGoogle, loginAnonymously } from '../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      // Redirect or handle successful login
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Password"
        />
        <button type="submit" className="w-full bg-pink-500 text-white p-2 rounded">
          Login
        </button>
      </form>
      
      <button 
        onClick={signInWithGoogle}
        className="w-full bg-blue-500 text-white p-2 rounded mt-4"
      >
        Continue with Google
      </button>
      
      <button 
        onClick={loginAnonymously}
        className="w-full bg-gray-500 text-white p-2 rounded mt-4"
      >
        Continue as Guest
      </button>
    </div>
  );
}

export default Login;
