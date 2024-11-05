import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import LoadingSpinner from "./LoadingSpinner";
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [emailerror, setEmailerror] = useState('');
	const [passworderror, setPassworderror] = useState('');

	const [btnClick, setBtnClick] = useState(false);

	const [credentialError, setCredentialError] = useState('');

	const navigate = useNavigate();

	//============================================Handle Login Function=========================================

	const loginHandler = async (e) => {

		e.preventDefault();

		let user_type = "customer"
		let data = { user_type, email, password }
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (email !== "" && password !== "") {

			setEmailerror('')
			setPassworderror('')

			if (emailRegex.test(email)) {
				setBtnClick(true)
				let Result = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					body: JSON.stringify(data)
				});

				Result = await Result.json();
				if (Result?.access_token) {
					setBtnClick(false)
					sessionStorage.setItem('user-info_token', JSON.stringify(Result.access_token))
					localStorage.setItem('user-info', JSON.stringify(Result.user.id))
					localStorage.setItem('user-name', JSON.stringify(Result.user.name))
					localStorage.setItem('user', JSON.stringify(Result.user))
					setCredentialError('')
					navigate('/dashboard');

				} else {
					setBtnClick(false)
					toast.error(Result.message)
				};
			}
			else {

				setEmailerror('Enter valid email address.')

			}
		}
		else {

			setEmailerror('')
			setPassworderror('')

			if (email === "") {

				setEmailerror('Email feild is required.')

			}
			if (password === "") {

				setPassworderror('Password feild is required.')

			}
		}


	}

	//============================================End Handle Login Function=========================================


	return (
		<>
			<div className="login-page bg-image  py-5" >
				<div className="container">
					<div className="form-box" style={{ paddingTop: "2.7rem", paddingBottom: "4.4rem" }}>
						<div className="form-tab">
							<ul className="nav nav-pills nav-fill" role="tablist">
								<li className="nav-item">
									<a className="nav-link active" id="register-tab-2" data-toggle="tab" href="#register-2" role="tab" aria-controls="register-2" aria-selected="true">Sign In</a>
								</li>
							</ul>
							<div className="tab-content">
								<div className="tab-pane fade show active" id="register-2" role="tabpanel" aria-labelledby="register-tab-2">
									<form action="#" onSubmit={loginHandler}>
										<div className="form-group">
											<label htmlFor="register-email-2">Your Email address *</label>
											<input type="text" maxLength={250} onChange={(e) => setEmail(e.target.value)} className="form-control" id="register-email-2" name="email" />
											<p className="text-danger">{emailerror && emailerror}</p>
										</div>
										<div className="form-group">
											<label htmlFor="register-password-2">Password *</label>
											<input type="password" maxLength={250} onChange={(e) => setPassword(e.target.value)} className="form-control" id="register-password-2" name="password" />
											<p className="text-danger">{passworderror && passworderror}</p>
											<p className="text-danger">{credentialError && credentialError}</p>
										</div>
										<div className="d-flex justify-content-end">
											<NavLink to="/forgot-password">Forgot Password ?</NavLink>
										</div>
										<div>
											<button type="submit" className="btn btn-outline-primary-2">
												<span>SIGN IN</span>
												<i className="icon-long-arrow-right"></i>
											</button>
											{btnClick === true && <LoadingSpinner />}
										</div>
										<p className="text-right">Don't have an account? <NavLink to="/signup">Sign up</NavLink></p>
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
export default LoginForm;