import React, { useEffect } from "react";
import HeaderContainer from "../container/HeaderContainer";
import PageTitle from "../components/PageTitle";
import Footer2 from "../components/Footer2";
import ContactContent from "../components/ContactContent";

const Contact = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <HeaderContainer />
            <PageTitle name={"Contact Us"} />
            <ContactContent />
            <Footer2 />
        </>
    );
}

export default Contact;