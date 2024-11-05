import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from "./LoadingSpinner";
import 'react-toastify/dist/ReactToastify.css';

const OtpForm = () => {

	const [otpcode, setOtpCode] = useState('');
	const [btnClick, setBtnClick] = useState(false);
	const [otperror, setOtperror] = useState('');
	const navigate = useNavigate();

    const location = useLocation();
    const { email } = location.state || { email: 'No email provided' };

	//============================================Handle Forgot Function=========================================

	const OtpHandler = async (e) => {
		e.preventDefault();
		let data = { verification_code:otpcode}
		if (otpcode !== "") {
			setOtperror('')
                setBtnClick(true)
				let Result = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/password/confirm_reset`, {
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
                    navigate('/reset-password', { state: { otpcode } });
                }
				else{
					toast.error(Result.message)
				}

		}
		else {
			setOtperror('')
			if (otpcode === "") {
				setOtperror('Otp feild is required.')
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
									<a className="nav-link active" id="register-tab-2" data-toggle="tab" href="#register-2" role="tab" aria-controls="register-2" aria-selected="true">Otp Code</a>
								</li>
							</ul>
							<div className="tab-content">
								<div className="tab-pane fade show active" id="register-2" role="tabpanel" aria-labelledby="register-tab-2">
									<form action="#" onSubmit={OtpHandler}>
										<div className="form-group">
											<label htmlFor="register-email-2">Your Otp Code*</label>
											<input type="text" maxLength={250} onChange={(e) => setOtpCode(e.target.value)} className="form-control" id="register-email-2" name="email" />
											<p className="text-danger">{otperror && otperror}</p>
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
export default OtpForm;