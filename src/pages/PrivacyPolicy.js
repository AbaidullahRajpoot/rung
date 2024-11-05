import React,{useEffect} from "react";
import HeaderContainer from "../container/HeaderContainer";
import PageTitle from "../components/PageTitle";
import PrivacyContent from "../components/Privacy_Content";
import Footer2 from "../components/Footer2";
const Privacy_Policy = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return (
        <>
            <HeaderContainer/>
            <PageTitle name={'Privacy Policy'}/>
            <PrivacyContent/>
            <Footer2/>
        </>
    );
}
export default  Privacy_Policy;