import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './loginSignup.css';
import Footer from '../footer/Footer';


const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        console.log('Signup submitted', { name, email, password });
        navigate('/login');
        // Add your signup logic here
    };

    return (
        <div>
        <div className="login-container">
            <div className="login-card">
                {/* Logo/Header */}
                <div className="text-center mb-4">
                    <h2 className="login-title">SmartKitchen</h2>
                    <p className="login-subtitle">Create your account</p>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control login-input"
                            id="name"
                            placeholder="Alice Smith"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <div className="mb-3">
                        <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control login-input"
                            id="confirm-password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-cyan w-100">
                        Sign Up
                    </button>
                    
                    <div className="text-center mt-4">
                        <p className="signup-text">
                            Already have an account?
                            <Link to='/login' className='signup-link'> Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default Signup;
