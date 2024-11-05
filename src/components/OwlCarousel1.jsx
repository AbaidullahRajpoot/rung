import React, { useState, useEffect } from "react";

import '../assets/css/style.css';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import axios from "axios";
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const OwlCarousel1 = () => {
    const [isloading, setLoading] = useState(true);
    const [Banners, SetBanners] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            axios.get(`${process.env.REACT_APP_BASE_URL}/sliders`)
                .then(res => {
                    var insidData = res.data.data;
                    SetBanners(insidData);
                    setLoading(false)
                })
            // sliderApi();
        }, 1000)
    }, [isloading])

    return (
        <>
            <SkeletonTheme baseColor="#b1b2b4" highlightColor="silver">
                {isloading ?
                    <OwlCarousel dots={false} items={1} loop autoPlay={true} autoplaySpeed="200" nav={false} >
                        <h1><Skeleton height={"100vh"} /></h1>
                    </OwlCarousel> :
                    <OwlCarousel className='owl-theme' dots={false} items={1} loop autoPlay={true} autoplaySpeed="200" nav={false} >
                        {Banners ? Banners.map((item, i) => {
                            return (

                                <div key={i} className="intro-slide" style={{ backgroundImage: `url(${'https://beta.myrung.co.uk/b/public/' + item.photo})` }} >
                                    {/* <div className="slider-text-body">
                                        <h2>Vibrant & Welcoming</h2>
                                        <p> Discover Your Unique Style! Shop the Latest Trends in Fashion and Accessories at RUNG.!</p>
                                        <button type="submit" className="btn btn-outline-primary-2 mt-1 shopbtn">
                                            <span>Shop Now</span>
                                        </button>
                                    </div> */}
                                </div>
                            );

                        }) : ""
                        }
                    </OwlCarousel>
                }
            </SkeletonTheme>


        </>
    );
    // }, 5000)
}
export default OwlCarousel1;