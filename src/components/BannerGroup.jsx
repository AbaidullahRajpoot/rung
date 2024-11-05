import React from 'react';
import banneimg1 from '../assets/images/slider/1st.jpg';
import banneimg2 from '../assets/images/slider/3rd.jpg';
import { NavLink } from "react-router-dom";

const Banner = () => {
    return (
        <>
            <div className="container mt-5 mb-4">
                <div className="banner-group">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="banner banner-border">
                                <NavLink to="#">
                                    <img src={banneimg1} alt="Banner" />
                                </NavLink>
                                <div className="banner-content">
                                    <h2 className="banner-title">Trending Now</h2>
                                    <h3 className="banner-subtitle"><span>Golden Allure</span></h3>
                                    <p><span>A vibrant piece of attraction</span></p>
                                    <NavLink to="#" className="btn btn-outline-primary-2 banner-link mt-2">Discover Now<i className="icon-long-arrow-right"></i></NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="banner banner-border">
                                <NavLink to="#">
                                    <img src={banneimg2} alt="Banner" />
                                </NavLink>
                                <div className="banner-content">
                                    <h2 className="banner-title">Trending Now</h2>
                                    <h3 className="banner-subtitle"><span>Royal Marigold</span></h3>
                                    <p><span>Italian prints of riches</span></p>
                                    <NavLink to="#" className="btn btn-outline-primary-2 banner-link mt-2">Discover Now<i className="icon-long-arrow-right"></i></NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banner;