import React, { useEffect } from "react";
import HeaderContainer from "../container/HeaderContainer";
import LoginForm from "../components/Loginform";
import Footer2 from "../components/Footer2";
const Login = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <HeaderContainer />
            <LoginForm />
            <Footer2 />
        </>
    );
}
export default Login;