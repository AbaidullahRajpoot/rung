import React, { useEffect } from "react";
import HeaderContainer from "../container/HeaderContainer";
import PageTitle from "../components/PageTitle";
import CheckoutContainer from "../container/CheckoutContainer";
import Footer2 from '../components/Footer2';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, } from '@stripe/react-stripe-js';


const Checkout = () => {
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Elements stripe={stripePromise} options={{
                mode: "payment",
                amount: 2000,
                currency: 'aed',
                
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