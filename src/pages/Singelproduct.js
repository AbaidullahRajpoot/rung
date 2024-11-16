import React,{useEffect} from "react";
import Footer2 from "../components/Footer2";
import HeaderContainer from "../container/HeaderContainer";
import Singleproduct from "../container/Singleproduct_add_to_cart_contanier";
const ProductFullWidth = () =>{
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return(
        <>
        <HeaderContainer/>
        <Singleproduct/>
        <Footer2/>
        </>
    );
}
export default ProductFullWidth;