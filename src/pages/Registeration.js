import React, { useEffect } from "react";
import HeaderContainer from "../container/HeaderContainer";
import Footer2 from "../components/Footer2";
import Signup from "../components/Registeration";

const Register = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (

        <>
            <HeaderContainer />
            <Signup />
            <Footer2 />
        </>
    );
}
export default Register;