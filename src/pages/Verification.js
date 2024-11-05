import React from 'react';
import HeaderContainer from "../container/HeaderContainer";
import { NavLink } from 'react-router-dom';
import Footer from "../components/Footer";
import '../assets/css/Verification.css';

const Verification = () => {

    return (
        <>
            <HeaderContainer />
                <div className="container m-auto verrificationcard">
                    <div className="row justify-content-center">
                        <div className="col-10 col-md-10 col-lg-8">
                            <div id="card" className="animated fadeIn card shadow">
                                <div id="upper-side">
                                    <h3 id="status">Confirmation Successful</h3>
                                </div>
                                <div id="lower-side">
                                    <p id="message">
                                        Congratulations! Your email has been successfully confirmed. You can now access all the features of your account. Thank you for verifying your email!
                                    </p>
                                    {/* <a href="#" id="contBtn">Continue</a> */}
                                    <NavLink id="contBtn" exact to="/login">Continue</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </>

    );
};

export default Verification;
