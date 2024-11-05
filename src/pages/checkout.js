import React,{useEffect} from "react";
import HeaderContainer from "../container/HeaderContainer";
import PageTitle from "../components/PageTitle";
import CheckoutContainer from "../container/CheckoutContainer";
import Footer2 from '../components/Footer2';

const Checkout=()=>{
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      
    return(
        <>
           <HeaderContainer/>
           <PageTitle name='Checkout'/>
           <CheckoutContainer/>
           <Footer2/> 
        </>
    );
}
export default Checkout;