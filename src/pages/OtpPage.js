import React, { useEffect } from "react";
import HeaderContainer from "../container/HeaderContainer";
import OtpForm from "../components/OtpForm";
import Footer2 from "../components/Footer2";

const OtpCode = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <>
            <HeaderContainer />
            <OtpForm />
            <Footer2 />
        </>
    );
}
export default OtpCode;