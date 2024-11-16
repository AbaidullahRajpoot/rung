import React, { createContext, useEffect } from 'react';
import HeaderContainer from "../container/HeaderContainer";
import PageTitle from '../components/PageTitle';
import CategoriesSection from '../components/CatagoriesShowSection';
import Footer2 from '../components/Footer2';
const Pagename = createContext();
const Navbar = createContext();
const Title = createContext();


const Catagory = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return (
        <>
            <HeaderContainer />
            <Pagename.Provider value="Shop">
                <Navbar.Provider value="Product Catagory">
                    <Title.Provider value="Categories">
                        <PageTitle name="Categories"/>
                    </Title.Provider>
                </Navbar.Provider>
            </Pagename.Provider>
            <CategoriesSection />
            <Footer2 />
        </>
    );
}
export default Catagory;
export { Pagename, Navbar, Title };