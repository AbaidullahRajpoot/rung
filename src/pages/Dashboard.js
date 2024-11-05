import React,{useEffect} from "react";
import HeaderContainer from "../container/HeaderContainer";
import Footer from "../components/Footer";
import Dashboardcontent from "../components/Dashboardcontent";

const Dashboard = () =>{

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      
    return(
        <>
            <HeaderContainer/>
            <Dashboardcontent/>
            <Footer/>
        </>
    );
}
export default Dashboard;