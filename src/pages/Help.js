import React,{useEffect} from "react";
import HeaderContainer from "../container/HeaderContainer";
import PageTitle from "../components/PageTitle";
import HelpContent from "../components/HelpContent";
import Footer2 from "../components/Footer2";

const Help = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      
    return (
        <>
            <HeaderContainer/>
            <PageTitle/>
            <HelpContent/>
            <Footer2/>
        </>
    );
}
export default  Help;