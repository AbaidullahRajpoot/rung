import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import OwlCarousel from 'react-owl-carousel';
import LoadingSpinner from './LoadingSpinner';

import '../assets/css/style.css';
import '../assets/css/mystyle.css';
import '../assets/css/bootstrap.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import user_1 from "../assets/images/testimonials/user-1.jpg";
import user_2 from "../assets/images/testimonials/user-2.jpg";

const Testimonial = () => {

    const [email, setEmail] = useState('');
    const [emailerror, setEmailError] = useState('');
    const [btnClick, setBtnClick] = useState(false);
    const [SocialLinks, SetSocialLinks] = useState([]);

    const getApi = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/business-settings`);
        const data = await response.json();
        var insidData = data.data;
        SetSocialLinks(insidData);
    }
    useEffect(() => {
        getApi();
    }, []);

    //=========================================Sent Email From News Letter=====================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() !== "") {
            if (emailRegex.test(email)) {
                setBtnClick(true)
                const data = {
                    email
                }
                let Result = await fetch(`${process.env.REACT_APP_BASE_URL}/news-letter-form`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                Result = await Result.json();
                setBtnClick(false)
                if (Result?.message === "Your email has been submitted successfully") {
                    toast.success(Result?.message)
                }
            }
            else {
                setEmailError('Enter a valid email address.');
            }
        }
        else {
            setEmailError('Email feild is required.');
        }

    }

    //=================================End Sent Email From News Letter=====================================

    var facbook_link;
    var twiter_link;
    var instagram_link;
    var youtube_link;
    var linkedin_link;

    {
        SocialLinks.map((item, index) => {
            {
                if (item.type === "facebook_link") {
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
            <div className="about-testimonials bg-light-2 pt-6 pb-6">
                <div className="container">
                    <h2 className="title text-center mb-3">What Customer Say About Us</h2>
                    <OwlCarousel className=" owl-carousel owl-theme owl-simple owl-testimonials-photo" dots={true} items={1} nav={false} loop={false} margin={20}>
                        <blockquote className="testimonial text-center">
                            <img src={user_1} alt="user" />
                            <p>“I had an amazing experience shopping on this site! The selection of products is fantastic, and I found exactly what I was looking for. My order arrived quickly, and everything was well-packaged. I will definitely be back for more!”</p>
                            <cite>
                                Jenson Gregory
                                <span>Customer</span>
                            </cite>
                        </blockquote>
                        <blockquote className="testimonial text-center">
                            <img src={user_2} alt="user" />
                            <p>“I love this online store! The prices are unbeatable, and the customer service is top-notch. I had a small issue with my order, but their support team was incredibly helpful and resolved it right away. Highly recommend!”</p>

                            <cite>
                                Victoria Ventura
                                <span>Customer</span>
                            </cite>
                        </blockquote>
                    </OwlCarousel>
                </div>
            </div>
            <div className="mb-2"></div>
            <div className="container ">
                <div className="cta cta-separator mb-5">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="cta-wrapper cta-text text-center">
                                <h3 className="cta-title">Shop Social
                                </h3>
                                <p className="cta-desc">Join the Rung community! Connect with us on social media for the latest trends, exclusive promotions, and style inspiration. Share your favorite finds and tag us to be featured—let’s shop together! </p>
                                <div className="social-icons social-icons-colored justify-content-center">
                                    <a href={facbook_link} className="social-icon social-facebook" title="Facebook" target="_blank"><i
                                        className="icon-facebook-f"></i></a>
                                    <a href={twiter_link} className="social-icon social-twitter" title="Twitter" target="_blank"><i
                                        className="icon-twitter"></i></a>
                                    <a href={instagram_link} className="social-icon social-instagram" title="Instagram"
                                        target="_blank"><i className="icon-instagram"></i></a>
                                    <a href={youtube_link} className="social-icon social-youtube" title="Youtube" target="_blank"><i
                                        className="icon-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="cta-wrapper text-center">
                                <h3 className="cta-title">Get the Latest Deals!</h3>
                                <p className="cta-desc">Stay ahead of the trends and never miss out on exclusive offers from Rung. Subscribe now to get better deals</p>
                                <form action="#" onSubmit={handleSubmit}>
                                    {
                                        btnClick === true && <LoadingSpinner />
                                    }
                                    <div className="input-group">
                                        <input type="text" name='email' maxLength={250} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter your Email Address"
                                            aria-label="Email Adress" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary btn-rounded" type="submit"><i
                                                className="icon-long-arrow-right"></i></button>
                                        </div>
                                    </div>
                                    {emailerror && <div className='d-flex p-3'><span className="text-danger">{emailerror}</span></div>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default Testimonial;