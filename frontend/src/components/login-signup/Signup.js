import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './loginSignup.css';
import Footer from '../footer/Footer';

const Signup = () => {
    const navigate = useNavigate();

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prevState => ({
            ...prevState,
            [name]: value // Update the corresponding field
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = signupInfo;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const signupApi = "http://localhost:8888/register";
        const data = { name, email, password };
        console.log(data);

        fetch(signupApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === true) {
                alert('Signup successful!');
                navigate('/login');
            } else {
                alert(data.message || 'Signup failed');
            }
        })
        .catch(error => {
            console.error('Error during signup:', error);
            alert('Failed to connect to the server. Please try again later.');
        });
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
                                name="name"
                                type="text"
                                className="form-control login-input"
                                id="name"
                                placeholder="Alice Smith"
                                value={signupInfo.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                name="email"
                                type="email"
                                className="form-control login-input"
                                id="email"
                                placeholder="you@example.com"
                                value={signupInfo.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                name="password"
                                type="password"
                                className="form-control login-input"
                                id="password"
                                placeholder="••••••••"
                                value={signupInfo.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                className="form-control login-input"
                                id="confirm-password"
                                placeholder="••••••••"
                                value={signupInfo.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <button type="submit" className="btn btn-cyan w-100">
                            Sign Up
                        </button>
                        
                        <div className="text-center mt-4">
                            <p className="signup-text">
                                Already have an account?
                                <Link to="/login" className="signup-link"> Login</Link>
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