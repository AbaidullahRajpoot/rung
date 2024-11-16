import React,{useEffect} from "react";
import HeaderContainer from "../container/HeaderContainer";
import PageTitle from "../components/PageTitle";
import Footer2 from "../components/Footer2";
import Faqmainara from "../components/Faqmainarea";
const Faq = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return(
        <>
            <HeaderContainer/>
            <PageTitle name={"FAQ"}/>
            <Faqmainara/>
            <Footer2/>
        </>
    );
}
export default Faq;