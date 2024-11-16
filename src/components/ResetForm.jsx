import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import 'react-toastify/dist/ReactToastify.css';

const ResetForm = () => {

    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [btnClick, setBtnClick] = useState(false);
    const [passworderror, setPassworderror] = useState('');
    const [confirmpassworderror, setConfirmPassworderror] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const { otpcode } = location.state || { otpcode: 'No otp provided' };

    //==============================Call Whenever Page Rendered===============================

    useEffect(() => {
        if (localStorage.getItem('use-info')) {
            navigate('/')
        }
    }, [])

    //===============================================Handle Register User==========================================

    const ResetPassHandler = async (event) => {
        event.preventDefault();
        setConfirmPassworderror('')
        setPassworderror('')
        let data = { password, verify_code: otpcode }
        if (password !== "" && confirmpassword !== "") {
            setConfirmPassworderror('')
            setPassworderror('')
            if (password === confirmpassword) {
                setBtnClick(true)
                let Result = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/password/confirm_reset`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                Result = await Result.json()
                setBtnClick(false)
                if(Result?.result===true){
                    toast.success(Result?.message)
                    navigate('/login');
                }
                else if(Result?.result===false){
                    toast.error(Result?.message)
                }
            }
            else {
                setConfirmPassworderror('Passwords do not match.')
            }
        }
        else {
            if (password === "") {
                setPassworderror('Password feild is required.')
            }
            if (confirmpassword === "") {
                setConfirmPassworderror('Confirm password feild is required.')
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
                                    <a className="nav-link active" id="register-tab-2" data-toggle="tab" href="#register-2" role="tab" aria-controls="register-2" aria-selected="true">Reset Password</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="register-2" role="tabpanel" aria-labelledby="register-tab-2">
                                    <form action="#" onSubmit={ResetPassHandler}>
                                        <div className="form-group">
                                            <label htmlFor="register-password-2">Password *</label>
                                            <input type="password" maxLength={250} value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="register-password-2" name="password" />
                                            <p className="text-danger">{passworderror && passworderror}</p>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register-password-2">Confirm Password *</label>
                                            <input type="password" maxLength={250} value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" id="register-password-2" name="password" />
                                            <p className="text-danger">{confirmpassworderror && confirmpassworderror}</p>

                                        </div>
                                        <div className="form-footer">
                                            <button type="submit" className="btn btn-outline-primary-2">
                                                <span>Save</span>
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
export default ResetForm;