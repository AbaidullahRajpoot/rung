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
                <div className="embed-responsive embed-responsive-16by9">
                    <Vimeo video={"1024998407"} autoplay={true} height={"350"} loop={true} controls={false} volume={0} start={7} end={29}/>
                    <div className="video-overlay"></div>
                </div>
            </div>

    )
}
