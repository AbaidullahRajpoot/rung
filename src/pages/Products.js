import React from "react";
import ProductPageTitle from "../components/ProductPageTitle";
import Footer2 from '../components/Footer2';
import AllProduct from "../components/Relatedproduct";
import HeaderContainer from "../container/HeaderContainer";

const Products = () => {
    
    return (
        <>
            <HeaderContainer />
            <ProductPageTitle />
            <AllProduct />
            <Footer2 />
        </>
    );
}

export default Products;