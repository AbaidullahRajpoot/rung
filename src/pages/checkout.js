import React, { useEffect } from "react";
import HeaderContainer from "../container/HeaderContainer";
import PageTitle from "../components/PageTitle";
import CheckoutContainer from "../container/CheckoutContainer";
import Footer2 from '../components/Footer2';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51MRvgrI8Q2cWx8u9dN5751EZoLBySTxhWSBhPr7ZrhOevgMRvI8XIEpeNyX7U3hKws4sj5r4aiS9Zvj89LGyTza200sLDLJ37m');
const Checkout = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Elements stripe={stripePromise} options={{
                mode: "payment",
                amount: 2000,
                currency: 'usd',
                
            }}>
                <HeaderContainer />
                <PageTitle name='Checkout' />
                <CheckoutContainer />
                <Footer2 />
            </Elements>
        </>
    );
}
export default Checkout;