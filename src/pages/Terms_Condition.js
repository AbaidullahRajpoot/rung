import React,{useEffect} from "react";
import HeaderContainer from "../container/HeaderContainer";
import PageTitle from "../components/PageTitle";
import TermsContent from "../components/TermsContent";
import Footer2 from "../components/Footer2";
const Terms = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return (
        <>
            <HeaderContainer/>
            <PageTitle name={"Terms and Conditions"}/>
            <TermsContent/>
            <Footer2/>
        </>
    );
}
export default  Terms;