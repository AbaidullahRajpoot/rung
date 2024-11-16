import React,{useEffect} from 'react';
import HeaderContainer from "../container/HeaderContainer";
import Footer2 from '../components/Footer2';
import Gateways from '../components/gatways';
const PamentGatways=(props)=>{
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return(
        <>
            <HeaderContainer/>
            <Gateways/>
            <Footer2/>
        </>
    );
}
export default PamentGatways;