// SuccessPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner'
import { useDispatch } from 'react-redux';
import { clearCart } from '../services/actions/action'
import { toast } from 'react-toastify';


const PaymentSuccess = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handlePaymentWithStripe = async () => {
        try {
            const orderInfoString = await localStorage.getItem('orderInfo');
            const user = await localStorage.getItem('user-info');
            if (orderInfoString) {
                const orderInfo = JSON.parse(orderInfoString)
                orderInfo.paymentstatus = true
                let Result = await fetch(`${process.env.REACT_APP_BASE_URL}/order/update/status`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(orderInfo)
                });
                Result = await Result.json();

                if (Result.message === 'Order status has been successfully updated.') {
                    localStorage.removeItem('orderInfo');
                    handleClearCart()
                    toast.success('Your Order has been Placed Successfully!')
                    if(user){
                        navigate('/dashboard');
                    }
                    else{
                        navigate('/');   
                    }
                }
            }
            else {
                navigate('/')
            }

        } catch (err) {
            toast.error(err)
        }
    };

    useEffect(() => {
        handlePaymentWithStripe();
    }, []);

    return (
        <>
            <LoadingSpinner />
        </>
    );
};

export default PaymentSuccess;
