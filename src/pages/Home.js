import React, { useEffect } from "react";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";
import HeaderContainer from "../container/HeaderContainer";
import FeatcuredproductContainer from "../container/FeatcuredproductContainer";
import Newproductcontainer from "../container/Newproductcontainer";
import Carousel from '../components/Carousel.jsx'
import 'react-loading-skeleton/dist/skeleton.css'

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <HeaderContainer />
            <Carousel />
            <FeatcuredproductContainer />
            <Newproductcontainer />
            <Testimonial />
            <Footer />
        </>
    );
}

export default Home;