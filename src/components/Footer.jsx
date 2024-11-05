import React, { useState, useEffect } from 'react';
import finel_logo from "../assets/images/runglogo.png";
import payamentsimg from "../assets/images/payments.png";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {

    var insidData;
    var token
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    //==========================Get Business Setting================================

    var socialapi = `${process.env.REACT_APP_BASE_URL}/business-settings`
    const newProductApi = async () => {
        const response = await fetch(socialapi);
        const data = await response.json();
        insidData = await data.data;
        setProduct(insidData)
    }

    //===============================Call Whenever Page Rendered============================

    useEffect(() => {
        newProductApi();
    }, []);

    //=======================================Get User Info==================================

    const getData = async () => {
        const data = await JSON.parse((sessionStorage.getItem('user-info_token')))
        token = data
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
    var contact_number;
    var facbook_link;
    var twiter_link;
    var instagram_link;
    var youtube_link;
    var linkedin_link;

    {
        product.map((item, index) => {
            {
                if (item.type === "contact_phone") {
                    contact_number = item.value
                }
                else if (item.type === "facebook_link") {
                    facbook_link = item.value
                }
                else if (item.type === "twitter_link") {
                    twiter_link = item.value
                }
                else if (item.type === "instagram_link") {
                    instagram_link = item.value
                }
                else if (item.type === "youtube_link") {
                    youtube_link = item.value
                }
                else if (item.type === "linkedin_link") {
                    linkedin_link = item.value
                }
            }

        })
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
                                    <p>Rung is your go-to online shopping destination, offering a wide range of high-quality products at unbeatable prices. From trendy fashion to essential home goods, we make shopping easy and enjoyable. Join us today and discover what makes Rung special! </p>
                                    <div className="widget-about-info">
                                        <div className="row">
                                            <div className="col-sm-6 col-md-4">
                                                <span className="widget-about-title footer-text">Got Question? Call us 24/7</span>
                                                <a href={"tel:" + contact_number}>{contact_number}</a>
                                            </div>
                                            <div className="col-sm-6 col-md-8">
                                                <span className="widget-about-title footer-text">Payment Method</span>
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
                                                    <li><NavLink  to="/dashboard">Dashboard</NavLink> </li>
                                                    <li><a onClick={loginHandler} style={{ cursor: "pointer" }}>Logout</a> </li>
                                                </>
                                                :
                                                <>
                                                    <li><NavLink  to="/login">Sign In</NavLink> </li>
                                                    <li><NavLink  to="/signup">Sign Up</NavLink> </li>
                                                </>
                                        }
                                        <li><NavLink  to="/cart">View Cart</NavLink> </li>
                                        <li><a style={{ cursor: "pointer" }} onClick={WhishlistHandler} >My Wishlist</a> </li>
                                        <li><NavLink  to="/help">Help</NavLink> </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-4 col-lg-2">
                                <div className="widget">
                                    <h4 className="widget-title">Customer Service</h4>
                                    <ul className="widget-list">
                                        <li><NavLink  to="/terms">Terms and Conditions</NavLink> </li>
                                        {/* <li><NavLink  to="/paymentsmethod">Payment Methods</NavLink></li> */}
                                        <li><NavLink  to="/privacypolicy">Privacy Policy</NavLink></li>
                                        <li><NavLink  to="/returns">Return Policy</NavLink></li>
                                        {/* <li><NavLink  to="/shipping">Shipping</NavLink></li> */}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-4 col-lg-2">
                                <div className="widget">
                                    <h4 className="widget-title">Information</h4>
                                    <ul className="widget-list">
                                        <li><NavLink  to="/about">About Rung</NavLink></li>
                                        <li><NavLink  to="/contact">Contact Us</NavLink></li>
                                        <li><NavLink  to="/faq">FAQ</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <p className="footer-copyright">Copyright © 2019 Rung Store. All Rights Reserved.</p>
                        <ul className="footer-menu">
                            <li><NavLink  to="/terms">Terms Of Use</NavLink></li>
                            <li><NavLink  to="/privacypolicy">Privacy Policy</NavLink></li>
                        </ul>
                        <div className="social-icons social-icons-color">
                            <span className="social-label">Social Media</span>
                            <a href={facbook_link} className="social-icon social-facebook" title="Facebook" target="_blank"><i
                                className="icon-facebook-f"></i></a>
                            <a href={twiter_link} className="social-icon social-twitter" title="Twitter" target="_blank"><i
                                className="icon-twitter"></i></a>
                            <a href={instagram_link} className="social-icon social-instagram" title="Instagram" target="_blank"><i
                                className="icon-instagram"></i></a>
                            <a href={youtube_link} className="social-icon social-youtube" title="Youtube" target="_blank"><i
                                className="icon-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
            <button id="scroll-top" title="Back to Top"><i className="icon-arrow-up"></i></button>
        </>
    );
}
export default Footer;
