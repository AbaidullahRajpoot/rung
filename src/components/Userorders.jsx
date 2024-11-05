import React, { useEffect, useState } from "react";
import Rating from 'react-rating-stars-component';
import LoadingSpinner from "./LoadingSpinner";
import { toast } from 'react-toastify';

const User_orders = () => {
    const [orders, setOrders] = useState();
    const [token, setToken] = useState();

    const [Singleorders, setSingleOrders] = useState(null);
    const [SingleOrdersReview, setSingleOrdersReview] = useState(null);

    const [actionloading, setActionloading] = useState(false);

    const [isOpenAViewProduct, setIsOpenViewProduct] = useState(false);
    const [isOpenAReviewProduct, setIsOpenReviewProduct] = useState(false);

    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');

    //===========================================Call Whenever Page Rendered========================

    useEffect(() => {
        GetPurchaseHistory();
    }, []);

    //===============================Model Handler Function=========================================

    const IsOpenReviewProductHandler = (data) => {
        setSingleOrdersReview(data.product_id);
        setIsOpenReviewProduct(true);
    };
    const IsOpenViewProductHandler = (data) => {
        setSingleOrders(data);
        setIsOpenViewProduct(true);
    };

    //======================================Add Review Code==========================================

    const AddReview = async () => {
        setActionloading(true);
        const user_id = await JSON.parse(localStorage.getItem('user-info'));
        if (user_id) {
            const data = {
                user_id: user_id,
                product_id: SingleOrdersReview,
                rating: rating,
                comment: message
            };
            let response = await fetch(`${process.env.REACT_APP_BASE_URL}/reviews/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(data)
            });
            let result = await response.json();
            if (result.message === "Review  Submitted") {
                toast.success(result.message);
                setIsOpenReviewProduct(false)
            }
            setActionloading(false);
        }
    };

    //===============================================Get Product History=================================

    const GetPurchaseHistory = async () => {
        setActionloading(true);
        var usertoken = JSON.parse(sessionStorage.getItem('user-info_token'));
        setToken(usertoken)
        const Result = await fetch(`${process.env.REACT_APP_BASE_URL}/purchase-history`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": "Bearer " + usertoken
            }
        });
        const data = await Result.json();
        if (data.data) {
            setOrders(data.data);
        }
        setActionloading(false);
    };

    //===================================Print Function Code========================================

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        const content = `
            <html>
            <head>
                <title>Print Order</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                <style>
                    body { font-family: Arial, sans-serif; }
                    .rotate {
                        transform: rotate(-90deg);
                        transform-origin: left bottom;
                        white-space: nowrap;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h5>Product View Details</h5>
                    <table class="table">
                        <tbody>
                            <tr>
                                <td >Product Image</td>
                                <td>
                                    <img src="https://beta.myrung.co.uk/b/public/${Singleorders.thumbnail_img}" alt="Product image" style="max-width: 20%;">
                                </td>
                            </tr>
                            <tr>
                                <td >Buy Date</td>
                                <td>${Singleorders.date}</td>
                            </tr>
                            <tr>
                                <td >Product Name</td>
                                <td>${Singleorders.product_name}</td>
                            </tr>
                            <tr>
                                <td >Payment Status</td>
                                <td>${Singleorders.payment_status}</td>
                            </tr>
                            <tr>
                                <td >Delivery Status</td>
                                <td>${Singleorders.delivery_status_string}</td>
                            </tr>
                            <tr>
                                <td >Total Price</td>
                                <td>${Singleorders.grand_total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </body>
            </html>
        `;
        printWindow.document.write(content);
        printWindow.document.close();
        printWindow.onload = () => {
            printWindow.print();
            printWindow.close();
        };
    };

    return (
        <>
            {orders ? (
                <div style={{ overflowX: "auto" }}>
                    <table className="table product-invoice-table">
                        {actionloading && <LoadingSpinner />}
                        <thead>
                            <tr>
                                <th className="px-4" scope="col">#Order id</th>
                                <th className="px-4" scope="col">Product Image</th>
                                <th className="px-4" scope="col">Product Name</th>
                                <th className="px-4" scope="col">Buy Date</th>
                                <th className="px-4" scope="col">Payment status</th>
                                <th className="px-4" scope="col">Delivery status</th>
                                <th className="px-4" scope="col">Total Price</th>
                                <th className="px-4" scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item) => (
                                <tr key={item.id}>
                                    <td className="text-center">{item.id}</td>
                                    <td className="text-center">
                                        <img
                                            className="product-media-order-details"
                                            src={`https://beta.myrung.co.uk/b/public/${item.thumbnail_img}`}
                                            alt="Product image"
                                        />
                                    </td>
                                    <td>
                                        {item.product_name.length > 20
                                            ? item.product_name.substring(0, 20) + '...'
                                            : item.product_name}
                                    </td>
                                    <td className="text-center">{item.date}</td>
                                    <td className="text-center">{item.payment_status}</td>
                                    <td className="text-center">{item.delivery_status_string}</td>
                                    <td className="text-center">{item.grand_total}</td>
                                    <td className="text-center">
                                        <div className="product-details-action pb-0">
                                            <button className="reviewbtn" onClick={() => IsOpenReviewProductHandler(item)}>
                                                Review
                                            </button>
                                            <button onClick={() => IsOpenViewProductHandler(item)} className="viewbtn">
                                                View
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No order has been made yet.</p>
            )}

            {isOpenAViewProduct && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                        <div className="modal-content px-5 py-3">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Product View Details</h5>
                                <button type="button" className="close" onClick={() => setIsOpenViewProduct(false)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body px-5">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td className="rotate">Product Image</td>
                                            <td>
                                                <img
                                                    className="product-media-order-details"
                                                    src={`https://beta.myrung.co.uk/b/public/${Singleorders.thumbnail_img}`}
                                                    alt="Product image"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="rotate">Buy Date</td>
                                            <td>{Singleorders.date}</td>
                                        </tr>
                                        <tr>
                                            <td className="rotate">Product Name</td>
                                            <td>{Singleorders.product_name}</td>
                                        </tr>
                                        <tr>
                                            <td className="rotate">Payment Status</td>
                                            <td>{Singleorders.payment_status}</td>
                                        </tr>
                                        <tr>
                                            <td className="rotate">Delivery Status</td>
                                            <td>{Singleorders.delivery_status_string}</td>
                                        </tr>
                                        <tr>
                                            <td className="rotate">Total Price</td>
                                            <td>{Singleorders.grand_total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="modal-footer" style={{ borderTop: "none" }}>
                                    <button className="btn btn-primary" onClick={handlePrint}>Print Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isOpenAReviewProduct && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                        <div className="modal-content px-5 py-3">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Product Review</h5>
                                <button type="button" className="close" onClick={() => setIsOpenReviewProduct(false)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className='d-flex align-items-center'>
                                <h5 className='reviewheading'>Rating: </h5>
                                <Rating
                                    count={5}
                                    size={30}
                                    value={rating}
                                    onChange={(newRating) => setRating(newRating)}
                                    activeColor="#ffd700"
                                />
                            </div>

                            <textarea
                                className="form-control"
                                rows={3}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write your message here..."
                            />
                            <button  className="btn btn-primary mt-3" onClick={AddReview}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default User_orders;
