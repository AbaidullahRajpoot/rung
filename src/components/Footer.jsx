import React, { useState, useEffect } from 'react';
import finel_logo from "../assets/images/runglogo.png";
import payamentsimg from "../assets/images/payment-methods.png";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {

    const [token, setToken] = useState(null)
    const navigate = useNavigate();

    //=======================================Get User Info==================================

    const getData = async () => {
        const data = await JSON.parse((sessionStorage.getItem('user-info_token')))
        setToken(data)
    }
    useEffect(() => {
        getData()
    }, [])

    //==========================================Wishlist Function=================================

    const notifywhish = () => {
        toast.error("Please Login first")
    }
    const WhishlistHandler = () => {
        if (token != null) {
            navigate('/whishlist')
        }
        else {
            notifywhish();
        }
    }

    //============================================Logout Handler======================================

    const loginHandler = () => {
        if (token) {
            sessionStorage.removeItem('user-info_token')
            localStorage.removeItem('user-info')
            localStorage.removeItem('user')
            localStorage.removeItem('user-name')
            navigate('/login')
        }
        else {
            navigate('/login')
        }

    }



    return (
        <>
            <footer className="footer footer-2">
                <div className="footer-middle border-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-lg-6">
                                <div className="widget widget-about">
                                    <img src={finel_logo} className="footer-logo" alt="Footer Logo"
                                        width="105" height="25" />
                                    <p>At Rung we believe that true luxury is defined not just by what you wear, but by how it makes you feel. Each piece we create is an embodiment of elegance, craftsmanship, and a commitment to the art of tailoring. From the finest fabrics to meticulous attention to detail, our collections are designed for those who understand that luxury is not just a choice—it's a way of life.
                                        Founded on the principles of timeless style and uncompromising quality, Rung merges classic sophistication with modern sensibilities. Whether for an unforgettable evening or everyday elegance, each garment is crafted to offer unparalleled comfort, exceptional fit, and enduring beauty.</p>
                                    <div className="widget-about-info">
                                        <div className="row">
                                            <div className="col-sm-6 col-md-8">
                                                <figure className="footer-payments">
                                                    <img src={payamentsimg} alt="Payment methods" width="272"
                                                        height="20" />
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-4 col-lg-2">
                                <div className="widget">
                                    <h4 className="widget-title">My Account</h4>
                                    <ul className="widget-list">
                                        {
                                            sessionStorage.getItem('user-info_token') ?
                                                <>
                                                    <li><NavLink to="/dashboard">Dashboard</NavLink> </li>
                                                    <li><a onClick={loginHandler} style={{ cursor: "pointer" }}>Logout</a> </li>
                                                </>
                                                :
                                                <>
                                                    <li><NavLink to="/login">Sign In</NavLink> </li>
                                                    <li><NavLink to="/signup">Sign Up</NavLink> </li>
                                                </>
                                        }
                                        <li><NavLink to="/cart">View Cart</NavLink> </li>
                                        <li><a style={{ cursor: "pointer" }} onClick={WhishlistHandler} >My Wishlist</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-4 col-lg-2">
                                <div className="widget">
                                    <h4 className="widget-title">Information</h4>
                                    <ul className="widget-list">
                                        <li><NavLink to="/about">About Us</NavLink></li>
                                        <li><NavLink to="/terms">Terms and Conditions</NavLink> </li>
                                        <li><NavLink to="/privacypolicy">Privacy Policy</NavLink></li>
                                        <li><NavLink to="/returns">Return Policy</NavLink></li>

                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-4 col-lg-2">
                                <div className="widget">
                                    <h4 className="widget-title">Customer Service</h4>
                                    <ul className="widget-list">
                                        <li><NavLink to="/contact">Contact Us</NavLink></li>
                                        <li><NavLink to="/faq">FAQ</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <p className="footer-copyright">Copyright © 2024 Rung Store. All Rights Reserved.</p>
                        <ul className="footer-menu">
                            <li><NavLink to="/terms">Terms Of Use</NavLink></li>
                            <li><NavLink to="/privacypolicy">Privacy Policy</NavLink></li>
                        </ul>
                        <div className="social-icons social-icons-color">
                            <span className="social-label">Social Media</span>
                            <a href='https://www.facebook.com' className="social-icon social-facebook" title="Facebook" target="_blank" rel="noopener noreferrer">
                                <i className="icon-facebook-f"></i>
                            </a>
                            <a href='https://www.twitter.com' className="social-icon social-twitter" title="Twitter" target="_blank" rel="noopener noreferrer">
                                <i className="icon-twitter"></i>
                            </a>
                            <a href='https://www.instagram.com' className="social-icon social-instagram" title="Instagram" target="_blank" rel="noopener noreferrer">
                                <i className="icon-instagram"></i>
                            </a>
                            <a href='https://www.youtube.com' className="social-icon social-youtube" title="Youtube" target="_blank" rel="noopener noreferrer">
                                <i className="icon-youtube"></i>
                            </a>

                        </div>
                    </div>
                </div>
            </footer>
            <button id="scroll-top" title="Back to Top"><i className="icon-arrow-up"></i></button>
        </>
    );
}
export default Footer;
