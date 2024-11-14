import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        isChecked: false
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const notifyError = () => toast.error("User already exists");
    const notifySuccess = () => toast.success("Confirmation email sent! Please verify your account.");

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validateForm = () => {
        const { name, email, password, isChecked } = formData;
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name) newErrors.name = "Name field is required.";
        if (!email) newErrors.email = "Email field is required.";
        else if (!emailRegex.test(email)) newErrors.email = "Enter a valid email address.";
        if (!password) newErrors.password = "Password field is required.";
        if (!isChecked) newErrors.isChecked = "Checkbox must be checked.";

        return newErrors;
    };

    const addUserHandler = async (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsSubmitting(true);
        setErrors({});
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/signup`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();

            if (result?.result === true) {
                setFormData({ name: '', email: '', password: '', isChecked: false });
                notifySuccess();
                navigate('/');
            } else {
                notifyError();
            }
        } catch (error) {
            console.error("Error:", error);
            notifyError();
        } finally {
            setIsSubmitting(false);
        }
    };

    const { name, email, password, isChecked } = formData;
    const { name: nameError, email: emailError, password: passwordError, isChecked: isCheckedError } = errors;

    return (
        <div className="login-page bg-image py-5">
            <div className="container">
                <div className="form-box" style={{ paddingTop: "2.7rem", paddingBottom: "4.4rem" }}>
                    <div className="form-tab">
                        <ul className="nav nav-pills nav-fill" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="register-tab-2" data-toggle="tab" href="#register-2" role="tab" aria-controls="register-2" aria-selected="true">Sign Up</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="register-2" role="tabpanel" aria-labelledby="register-tab-2">
                                <form onSubmit={addUserHandler}>
                                    <div className="form-group">
                                        <label htmlFor="register-name-2">Enter Name *</label>
                                        <input
                                            type="text"
                                            value={name}
                                            maxLength={250}
                                            onChange={handleChange}
                                            className="form-control"
                                            id="register-name-2"
                                            name="name"
                                        />
                                        {nameError && <p className="text-danger">{nameError}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="register-email-2">Enter Email Address *</label>
                                        <input
                                            type="text"
                                            value={email}
                                            maxLength={250}
                                            onChange={handleChange}
                                            className="form-control"
                                            id="register-email-2"
                                            name="email"
                                        />
                                        {emailError && <p className="text-danger">{emailError}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="register-password-2">Password *</label>
                                        <input
                                            type="password"
                                            maxLength={250}
                                            value={password}
                                            onChange={handleChange}
                                            className="form-control"
                                            id="register-password-2"
                                            name="password"
                                        />
                                        {passwordError && <p className="text-danger">{passwordError}</p>}
                                    </div>
                                    <div className="form-group custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="register-policy-2"
                                            checked={isChecked}
                                            onChange={handleChange}
                                            name="isChecked"
                                        />
                                        <label className="custom-control-label" htmlFor="register-policy-2">
                                            I agree to the <NavLink target="_blank" exact to="/privacypolicy">privacy policy</NavLink> *
                                        </label>
                                        {isCheckedError && <p className="text-danger">{isCheckedError}</p>}
                                    </div>
                                    <div className="form-footer">
                                        <button type="submit" className="btn btn-outline-primary-2">
                                            <span>SIGN UP</span>
                                            <i className="icon-long-arrow-right"></i>
                                        </button>
                                        {isSubmitting && <LoadingSpinner />}
                                    </div>
                                    <p className="text-right">Already have an account? <NavLink to="/login">Log in</NavLink></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
