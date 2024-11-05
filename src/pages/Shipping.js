import React,{useEffect} from "react";
import HeaderContainer from "../container/HeaderContainer";
import PageTitle from "../components/PageTitle";
import ShippingContent from "../components/ShippingContent";
import Footer2 from "../components/Footer2";
const Shipping = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return (
        <>
            <HeaderContainer/>
            <PageTitle name={"Shipping"}/>
            <ShippingContent/>
            <Footer2/>
        </>
    );
}
export default  Shipping;