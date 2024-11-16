import React,{useEffect} from "react";
import HeaderContainer from "../container/HeaderContainer";
import PageTitle from "../components/PageTitle";
import PaymentContent from "../components/Payment_Content";
import Footer2 from "../components/Footer2";
const Payments_Method = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return (
        <>
            <HeaderContainer/>
            <PageTitle name={"Payments Method"}/>
            <PaymentContent/>
            <Footer2/>
        </>
    );
}
export default  Payments_Method;