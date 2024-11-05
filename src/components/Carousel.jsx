import React, { useState, useEffect } from 'react'
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Vimeo from '@u-wave/react-vimeo';
import image1 from '../assets/images/banners/banner-1.jpg'
import image2 from '../assets/images/banners/banner-2.jpg'

export default function Carousel() {

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
        }, 1000)
    }, [isloading])

    return (

        isloading === true ?
            <SkeletonTheme baseColor="#b1b2b4" highlightColor="silver">
                <Skeleton height={"100vh"} />
            </SkeletonTheme>
            :
            <div>
                <div className="ratio ratio-16x9">
                    <Vimeo video={"1024998407"} autoplay={true} height={"350"} loop={true} controls={false} volume={0} start={7} end={29}/>
                    <div className="video-overlay"></div>
                </div>
                {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/VJ4iwZW2_08?si=gZZMmCJvA3TsDWGz&amp;controls=0&amp;start=7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
                
                {/* <iframe src="https://www.youtube.com/embed/WhY7uyc56ms?autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&playlist=WhY7uyc56ms" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
            </div>

        // <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        //     <div className="carousel-indicators">
        //         <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        //         <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        //         <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        //     </div>
        //     <div className="carousel-inner">
        //         {Banners ? Banners.map((item, i) => {
        //             return (
        //                 <div className={`carousel-item ${i === 0 ? "active" : ""}`} style={{ background: "#000" }}>
        //                     {/* <img src={'https://beta.myrung.co.uk/b/public/' + item.photo} className="d-block w-100" alt="Second slide" /> */}

        //                     <div className="carousel-caption d-none d-md-block">
        //                         <h5 className='slider-title'>Vibrant & Welcoming</h5>
        //                         <p className='slider-description'>Discover Your Unique Style! Shop the Latest Trends in Fashion and Accessories at RUNG.!</p>
        //                     </div>
        //                 </div>
        //             );

        //         }) : ""
        //         }
        //     </div>
        //     <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        //         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        //         <span className="visually-hidden">Previous</span>
        //     </button>
        //     <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        //         <span className="carousel-control-next-icon" aria-hidden="true"></span>
        //         <span className="visually-hidden">Next</span>
        //     </button>
        // </div>
    )
}
