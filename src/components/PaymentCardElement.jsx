import React from "react";
import { CardElement,PaymentElement, } from "@stripe/react-stripe-js";

const PaymentComponent = ({ stripe, cardError, cart_products, isCheckoutSubmit }) => {

    return (
        <div className="my-2 stripe-border">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "18px",
                            fontFamily:"AlbertSans",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                        
                    },
                }}
            />
            {/* <PaymentElement
            options={{layout:"tabs"}}
            /> */}
            <button type="submit" className="btn btn-outline-primary-2 btn-order btn-block mt-2">
                <span className="btn-text">Pay with Card</span>
                <span className="btn-hover-text" >Pay with Card</span>
            </button>
            {cardError && (
                <p className="mt-15" style={{ color: "red" }}>
                    {cardError}
                </p>
            )}
        </div>
    );
};

export default PaymentComponent;
