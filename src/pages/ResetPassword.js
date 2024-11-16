import React, { useEffect } from "react";
import HeaderContainer from "../container/HeaderContainer";
import ResetForm from "../components/ResetForm";
import Footer2 from "../components/Footer2";

const ResetPassword = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <HeaderContainer />
            <ResetForm />
            <Footer2 />
        </>
    );
}
export default ResetPassword;