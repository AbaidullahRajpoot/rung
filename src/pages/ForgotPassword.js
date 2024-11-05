import React, { useEffect } from "react";
import HeaderContainer from "../container/HeaderContainer";
import ForgotForm from "../components/ForgotForm";
import Footer2 from "../components/Footer2";
const ForgotPassword = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <HeaderContainer />
            <ForgotForm />
            <Footer2 />
        </>
    );
}
export default ForgotPassword;