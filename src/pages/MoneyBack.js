import React,{useEffect} from "react";
import HeaderContainer from "../container/HeaderContainer";
import PageTitle from "../components/PageTitle";
import MoneyBackContent from "../components/Money_Back_Content";
import Footer2 from "../components/Footer2";
const Money_Back = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return (
        <>
            <HeaderContainer/>
            <PageTitle name={"Money Back Guarantee"}/>
            <MoneyBackContent/>
            <Footer2/>
        </>
    );
}
export default  Money_Back;