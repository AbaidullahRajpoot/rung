import React, { useEffect } from "react";
import HeaderContainer from "../container/HeaderContainer";
import Cartcontainer from "../container/Cartcontainer";
import Footer2 from "../components/Footer2";

const Cart = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <HeaderContainer />
            <Cartcontainer />
            <Footer2 />
        </>
    );
}
export default Cart;