import React,{useEffect} from "react";
import HeaderContainer from "../container/HeaderContainer";
import PageTitle from "../components/PageTitle";
import Returns_content from "../components/Returns";
import Footer2 from "../components/Footer2";
const Return = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return (
        <>
            <HeaderContainer/>
            <PageTitle name={"Return Policy"}/>
            <Returns_content/>
            <Footer2/>
        </>
    );
}
export default  Return;