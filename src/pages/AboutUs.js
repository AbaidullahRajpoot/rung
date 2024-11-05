import React,{useEffect} from 'react';
import HeaderContainer from "../container/HeaderContainer";
import PageTitle from '../components/PageTitle';
import WhoWeAre from '../components/WhoWeAre';
import CounterArea from '../components/CounterArea';
import Team from '../components/OurTeam';
import Brands from '../components/Brands';
import Footer2 from '../components/Footer2';


const AboutUs=(props)=>{
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return(
        <>
            <HeaderContainer/>
            <WhoWeAre/>
            {/* <CounterArea/> */}
            {/* <Team/> */}
            {/* <Brands/> */}
            <Footer2/>
        </>
    );
}
export default AboutUs;