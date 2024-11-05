import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isChecked, setIsChecked] = useState(false);

	const [btnClick, setBtnClick] = useState(false);

	const [nameerror, setNameerror] = useState('');
	const [emailerror, setEmailerror] = useState('');
	const [passworderror, setPassworderror] = useState('');
	const [isCheckederror, setIsCheckederror] = useState('');

	const navigate = useNavigate();
	const notify = () => toast.error("User Already exist");
	const notify1 = () => toast.success("Confirmation email sent! Please verify your account.");

	//==============================Call Whenever Page Rendered===============================

	useEffect(() => {
		if (localStorage.getItem('use-info')) {
			navigate('/')
		}
	}, [])

	//===============================================Handle Register User==========================================

	const addUserHandler = async (event) => {

		event.preventDefault();

		let data = { name, email, password }
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (name !== "" && email !== "" && password !== "" && isChecked === true) {

			setEmailerror('')
			setPassworderror('')
			setNameerror('')
			setIsCheckederror('')

			if (emailRegex.test(email)) {
				setBtnClick(true)
				let Result = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/signup`, {
					method: 'POST',
					body: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				});

				Result = await Result.json()

				if (Result?.result === true) {
					setBtnClick(false)
					setName('')
					setEmail('')
					setPassword('')
					setIsChecked(false)
					localStorage.setItem("user-info", JSON.stringify(Result));
					notify1()
				} else {
					setBtnClick(false)
					notify()
				}
			}
			else {
				setEmailerror('Enter valid email address.')
			}

		}
		else {

			setEmailerror('')
			setPassworderror('')
			setNameerror('')
			setIsCheckederror('')

			if (name === "") {

				setNameerror('Name feild is required.')

			}
			if (email === "") {

				setEmailerror('Email feild is required.')

			}
			if (password === "") {

				setPassworderror('Password feild is required.')

			}
			if (isChecked === false) {

				setIsCheckederror('Checkbox must be checked.')

			}
		}


	}

	return (
		<>
			<div className="login-page bg-image  py-5" >
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
									<form action="#" onSubmit={addUserHandler}>
										<div className="form-group">
											<label htmlFor="register-name-2">Enter Name *</label>
											<input type="text" value={name} maxLength={250} onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))} className="form-control" id="register-name-2" name="name" />
											<p className="text-danger">{nameerror && nameerror}</p>
										</div>
										<div className="form-group">
											<label htmlFor="register-email-2">Enter Email Address *</label>
											<input type="text" value={email} maxLength={250} onChange={(e) => setEmail(e.target.value)} className="form-control" id="register-email-2" name="email" />
											<p className="text-danger">{emailerror && emailerror}</p>
										</div>
										<div className="form-group">
											<label htmlFor="register-password-2">Password *</label>
											<input type="password" maxLength={250} value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="register-password-2" name="password" />
											<p className="text-danger">{passworderror && passworderror}</p>
										</div>
										<div className="form-group custom-control custom-checkbox">
											<input
												type="checkbox"
												className="custom-control-input"
												id="register-policy-2"
												checked={isChecked}
												onChange={(event) => setIsChecked(event.target.checked)}
											/>
											<label className="custom-control-label" htmlFor="register-policy-2">I agree to the <NavLink  target="_blank" exact to="/privacypolicy">privacy policy</NavLink> *</label>
											<p className="text-danger">{isCheckederror && isCheckederror}</p>
										</div>
										<div className="form-footer">
											<button type="submit" className="btn btn-outline-primary-2">
												<span>SIGN UP</span>
												<i className="icon-long-arrow-right"></i>
											</button>
											{btnClick === true && <LoadingSpinner />}
										</div>
										<p className="text-right">Already have an account? <NavLink to="/login">Log in</NavLink></p>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default Signup;