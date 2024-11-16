import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import OwlCarousel from 'react-owl-carousel';
import LoadingSpinner from './LoadingSpinner';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import '../assets/css/style.css';
import '../assets/css/mystyle.css';
import '../assets/css/bootstrap.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import user_1 from "../assets/images/testimonials/user-1.jpg";

const Testimonial = () => {

    const [email, setEmail] = useState('');
    const [emailerror, setEmailError] = useState('');
    const [btnClick, setBtnClick] = useState(false);

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
                setEmail('')
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




    return (
        <>
            <div className="about-testimonials bg-light-2 pt-6 pb-6">
                <div className="container">
                    <h2 className="title text-center mb-3">What Customer Say About Us</h2>
                    <OwlCarousel className=" owl-carousel owl-theme owl-simple owl-testimonials-photo" dots={true} items={1} nav={false} loop={false} margin={20}>
                        <blockquote className="testimonial text-center">
                            <LazyLoadImage
                                alt={"user"}
                                effect="blur"
                                src={user_1}
                            />
                            <p>I absolutely loved my headwear as soon as I opened it. The fabric, colours and style were exactly as described and shown in the pictures. It is also nice to be able to change style of the scarf to create new looks. I recommend Masumi to anyone who is looking for beautiful headwear!</p>
                            <cite>
                                Karen Sweeting
                                <span>Customer</span>
                            </cite>
                        </blockquote>
                        <blockquote className="testimonial text-center">
                            {/* <img src={user_1} alt="user" /> */}
                            <LazyLoadImage
                                alt={"user"}
                                effect="blur"
                                src={user_1}
                            />
                            <p>Masumi Headwear has provided my mother with so much comfort and confidence at a really hard time in her life. I have purchased several items from this website. There are so many beautiful styles and patterns to choose from, suitable for any occasion and perfectly matches any outfit! The quality is fantastic. They’re extremely soft and durable. Can’t wait to see what new stock becomes available! HIGHLY recommend.</p>
                            <cite>
                                Mariana Carvalho
                                <span>Customer</span>
                            </cite>
                        </blockquote>
                        <blockquote className="testimonial text-center">
                            <LazyLoadImage
                                alt={"user"}
                                effect="blur"
                                src={user_1}
                            />
                            <p>Very pleased with service even phoned to let me know an item was out of stock and offered replacement. Very prompt and good value.</p>
                            <cite>
                                Adele
                                <span>Customer</span>
                            </cite>
                        </blockquote>
                        <blockquote className="testimonial text-center">
                            <LazyLoadImage
                                alt={"user"}
                                effect="blur"
                                src={user_1}
                            />
                            <p>Lovely fabric and stylish look. I’ve bought some cheaper ones and can definitely tell the difference in quality; it’s worth paying the extra for Masumi brand.</p>
                            <cite>
                                Tracey Harper
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
                                <h3 className="title">Shop Social
                                </h3>
                                <p className="cta-desc mt-2">Join the Rung community! Connect with us on social media for the latest trends, exclusive promotions, and style inspiration. Share your favorite finds and tag us to be featured—let’s shop together! </p>
                                <div className="social-icons social-icons-colored justify-content-center mb-3">
                                    <a href="https://www.facebook.com" className="social-icon social-facebook" title="Facebook" target="_blank" rel="noopener noreferrer">
                                        <i className="icon-facebook-f"></i>
                                    </a>
                                    <a href="https://www.twitter.com" className="social-icon social-twitter" title="Twitter" target="_blank" rel="noopener noreferrer">
                                        <i className="icon-twitter"></i>
                                    </a>
                                    <a href="https://www.instagram.com" className="social-icon social-instagram" title="Instagram" target="_blank" rel="noopener noreferrer">
                                        <i className="icon-instagram"></i>
                                    </a>
                                    <a href="https://www.youtube.com" className="social-icon social-youtube" title="Youtube" target="_blank" rel="noopener noreferrer">
                                        <i className="icon-youtube"></i>
                                    </a>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="cta-wrapper text-center">
                                <h3 className="title ">Get The Latest Deals!</h3>
                                <p className="cta-desc mt-2">Stay ahead of the trends and never miss out on exclusive offers from Rung. Subscribe now to get better deals</p>
                                <form action="#" onSubmit={handleSubmit}>
                                    {
                                        btnClick === true && <LoadingSpinner />
                                    }
                                    <div className="input-group">
                                        <input type="text" name='email' value={email} maxLength={250} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter your Email Address"
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