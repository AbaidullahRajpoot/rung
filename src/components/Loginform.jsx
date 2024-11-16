import React, { useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import LoadingSpinner from "./LoadingSpinner";
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [btnClick, setBtnClick] = useState(false);
    const [credentialError, setCredentialError] = useState('');

    const navigate = useNavigate();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const loginHandler = useCallback(async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');

        if (!email || !password) {
            if (!email) setEmailError('Email field is required.');
            if (!password) setPasswordError('Password field is required.');
            return;
        }

        if (!emailRegex.test(email)) {
            setEmailError('Enter a valid email address.');
            return;
        }

        setBtnClick(true);

        const data = { user_type: "customer", email, password };

        try {
            let response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            let result = await response.json();

            if (result?.access_token) {
                sessionStorage.setItem('user-info_token', JSON.stringify(result.access_token));
                localStorage.setItem('user-info', JSON.stringify(result.user.id));
                localStorage.setItem('user-name', JSON.stringify(result.user.name));
                localStorage.setItem('user', JSON.stringify(result.user));
                setCredentialError('');
                navigate('/dashboard');
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("An error occurred during login. Please try again.");
        } finally {
            setBtnClick(false);
        }
    }, [email, password, navigate]);

    return (
        <div className="login-page bg-image py-5">
            <div className="container my-5 py-5">
                <div className="form-box" style={{ paddingTop: "2.7rem", paddingBottom: "4.4rem" }}>
                    <div className="form-tab">
                        <ul className="nav nav-pills nav-fill" role="tablist">
                            <li className="nav-item">
                                <span className="nav-link active" id="register-tab-2" aria-selected="true">Sign In</span>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="register-2" role="tabpanel" aria-labelledby="register-tab-2">
                                <form onSubmit={loginHandler}>
                                    <div className="form-group">
                                        <label htmlFor="register-email-2">Email *</label>
                                        <input type="text" maxLength={250} onChange={(e) => setEmail(e.target.value)} className="form-control" id="register-email-2" name="email" placeholder="Enter Email Adddress" />
                                        {emailError && <p className="text-danger">{emailError}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="register-password-2">Password *</label>
                                        <input type="password" maxLength={250} onChange={(e) => setPassword(e.target.value)} className="form-control" id="register-password-2" name="password" placeholder="Enter Password" />
                                        {passwordError && <p className="text-danger">{passwordError}</p>}
                                        {credentialError && <p className="text-danger">{credentialError}</p>}
                                    </div>
                                    <div className="text-center my-4">
                                        <button type="submit" className="btn btn-outline-primary-2">
                                            <span>Submit</span>
                                            <i className="icon-long-arrow-right"></i>
                                        </button>
                                        {btnClick && <LoadingSpinner />}
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="text-right">Don't have an account? <NavLink to="/signup">Sign up</NavLink></p>
                                        <NavLink to="/forgot-password">Forgot Password?</NavLink>
                                    </div>
                                    
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;