import React, { useEffect } from 'react';
import HeaderContainer from "../container/HeaderContainer";
import PageTitle from "../components/PageTitle";
import WhoWeAre from '../components/WhoWeAre';
import Footer2 from '../components/Footer2';

const AboutUs = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return ( 
        <>
            <HeaderContainer />
            <PageTitle name={"About Us"} />
            <WhoWeAre />
            <Footer2 />
        </>
    );
}
export default AboutUs;