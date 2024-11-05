import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import LoadingSpinner from "./LoadingSpinner";
import 'react-toastify/dist/ReactToastify.css';

const ForgotForm = () => {

	const [email, setEmail] = useState('');
	const [btnClick, setBtnClick] = useState(false);
	const [emailerror, setEmailerror] = useState('');
	const navigate = useNavigate();

	//============================================Handle Forgot Function=========================================

	const ForgotHandler = async (e) => {
		e.preventDefault();
		let data = { send_code_by:"email", email_or_phone:email }
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (email !== "") {
			setEmailerror('')
			if (emailRegex.test(email)) {
                setBtnClick(true)
				let Result = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/password/forget_request`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					body: JSON.stringify(data)
				});

				Result = await Result.json();
                setBtnClick(false)
                if(Result?.result===true){
                    toast.success(Result.message)
                    navigate('/otp-code', { state: { email } });
                }
				else if(Result?.result===false){
                    toast.error(Result.message)

				}
                else{
                    toast.error("Something went wrong.")
                }
			}
			else 
            {
				setEmailerror('Enter valid email address.')
			}
		}
		else {
			setEmailerror('')
			if (email === "") {
				setEmailerror('Email feild is required.')
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
									<a className="nav-link active" id="register-tab-2" data-toggle="tab" href="#register-2" role="tab" aria-controls="register-2" aria-selected="true">Forgot Password</a>
								</li>
							</ul>
							<div className="tab-content">
								<div className="tab-pane fade show active" id="register-2" role="tabpanel" aria-labelledby="register-tab-2">
									<form action="#" onSubmit={ForgotHandler}>
										<div className="form-group">
											<label htmlFor="register-email-2">Your Email address *</label>
											<input type="text" maxLength={250} onChange={(e) => setEmail(e.target.value)} className="form-control" id="register-email-2" name="email" />
											<p className="text-danger">{emailerror && emailerror}</p>
										</div>
										<div>
											<button type="submit" className="btn btn-outline-primary-2">
												<span>Sent</span>
												<i className="icon-long-arrow-right"></i>
											</button>
											{btnClick === true && <LoadingSpinner />}
										</div>
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
export default ForgotForm;