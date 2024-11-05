import React from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import img1 from '../assets/images/brands/1.png';
import img2 from '../assets/images/brands/2.png';
import img3 from '../assets/images/brands/3.png';
import img4 from '../assets/images/brands/4.png';
import img5 from '../assets/images/brands/5.png';
import img6 from '../assets/images/brands/6.png';
import img7 from '../assets/images/brands/7.png';
 const OwlCarouse2=()=>{
    const options = {
        responsive: {
            0: {
                items: 1,
            },
            420: {
                items: 1,
            },
            600: {
                items: 2,
            },
            900: {
                items: 3,
            },
            1024: {
                items: 5,
            },
            1360: {
                items:7,
            }
        },
    };
     return(
         
        <OwlCarousel className="brands-border owl-carousel owl-simple"  nav dots={false} margin={0} autoPlay={true} loop={false} {...options} >
        
          <a href="#1" className="brand">
                    <img src={img1} alt="Brand Name"/>
                </a>

                <a href="#2" className="brand">
                    <img src={img2} alt="Brand Name"/>
                </a>

                <a href="#3" className="brand">
                    <img src={img3} alt="Brand Name"/>
                </a>

                <a href="#4" className="brand">
                    <img src={img4}alt="Brand Name"/>
                </a>

                <a href="#5" className="brand">
                    <img src={img5} alt="Brand Name"/>
                </a>

                <a href="#6" className="brand">
                    <img src={img6} alt="Brand Name"/>
                </a>

                <a href="#7" className="brand">
                    <img src={img7} alt="Brand Name"/>
                </a>

        </OwlCarousel>
        
     );
 }
 export default OwlCarouse2;