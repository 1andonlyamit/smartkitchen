import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './loginSignup.css';
import Footer from '../footer/Footer';

const Login = () => {
    const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted', { email, password, rememberMe });
    navigate('/dashboard');
    // Add your authentication logic here
  };

  return (
    <div>
    <div className="login-container">
      <div className="login-card">
        {/* Logo/Header */}
        <div className="text-center mb-4">
          <h2 className="login-title">SmartKitchen</h2>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control login-input"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control login-input"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="remember-me">
                Remember me
              </label>
            </div>
            <a href="#" className="forgot-password">Forgot your password?</a>
          </div>
          
          <button type="submit" className="btn btn-cyan w-100">
            Login
          </button>
          
          <div className="text-center mt-4">
            <p className="signup-text">
              {/* Don't have an account? <a href="#" className="signup-link">Sign up</a> */}
              Don't have an account? 
              <Link to='/signup' className='signup-link'> Signup</Link>
            </p>
          </div>
          
        </form>
      </div>
    </div>
      <Footer />
      </div>
  );
};

export default Login;