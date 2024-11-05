import React,{useEffect} from 'react';
import HeaderContainer from "../container/HeaderContainer";
import PageTitle from '../components/PageTitle';
import ShopMainArea from '../components/ShopMainArea'
import Footer2 from '../components/Footer2';
const Shop=(props)=>{
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return(
        <>
            <HeaderContainer/>
             <PageTitle page={props.page} navbar={props.navbar} title={props.title} />
             <ShopMainArea/>
            <Footer2/> 
        </>
    );
}
export default Shop;