import React, { useEffect } from "react";
import WhishlistComponent from "../container/Whishlist_to_cart_container";
import HeaderContainer from "../container/HeaderContainer";
import Footer2 from "../components/Footer2";

const Whishlist = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <HeaderContainer />
            <WhishlistComponent />
            <Footer2 />
        </>
    );
}
export default Whishlist;