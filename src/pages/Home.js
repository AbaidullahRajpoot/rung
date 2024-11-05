import React,{useEffect} from "react";
import OwlCarousel1 from "../components/OwlCarousel1";
import WhatsAppWidget from '../components/WhatsAppWidget'
import OwlCarousel2 from "../components/OwlCarousel2";
import BannerGroup from '../components/BannerGroup';
import VideoBanner from "../components/VideoBanner";
import Testimonial from "../components/Testimonial";
import InstaFeed from "../components/InstaFeedContainer";
import Footer from "../components/Footer";
import Slider from "../container/SliderContainer";
import HeaderContainer from "../container/HeaderContainer";
import Newproductcontainer from "../container/Newproductcontainer";
import FeatcuredproductContainer from "../container/FeatcuredproductContainer";
import Carousel from '../components/Carousel.jsx'
import '../assets/css/style.css'
import '../assets/css/style.css';
import '../assets/css/mystyle.css';
import '../assets/css/bootstrap.css';

 const Home=()=>{

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

     return(
         <>
          <HeaderContainer />
          {/* <Slider/> */}
          {/* <OwlCarousel1/> */}
          {/* <OwlCarousel2/> */}
          {/* <BannerGroup/> */}
          <Carousel/>
          <FeatcuredproductContainer/>
          {/* <VideoBanner/> */}
          <Newproductcontainer/>
          <Testimonial/>
          {/* <WhatsAppWidget/> */}
          {/* <InstaFeed/> */}
          <Footer/>
          </>
     );
 }

 export default Home;