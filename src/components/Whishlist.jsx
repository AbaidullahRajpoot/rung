import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import LoadingSpinner from './LoadingSpinner'
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const WhishlistComponent = (props) => {

    const [mainloading, setMainLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [Product, setProduct] = useState([]);
    const [user_id, setUser_id] = useState(null);
    var Value = 1

    //==================================================Call Whenever Page Rendered================================

    const ShowWhishlist = async () => {
        const user_id = await JSON.parse((localStorage.getItem('user-info')))
        if (user_id) {
            const data = { user_id }
            setUser_id(user_id)
            setMainLoading(true)
            let Result = await fetch(`${process.env.REACT_APP_BASE_URL}/wishlists-list`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            Result = await Result.json()
            var Data = Result.data.data;
            setMainLoading(false)
            setProduct(Data)
        }
    }

    //===================================================Call whenever Page Rendered=====================================

    useEffect(() => {
        ShowWhishlist();
    }, []);

    //====================================================Notify Message Fuc==============================================

    const notify = () => {
        toast.success("Item added")
    };
    const notifyremove = () => {
        toast.success("Successfully Remove from Whishlist")
    };

    //==========================================================Remove Data From Wishlist================================

    const RemoveWhislist = async (e) => {
        let product_id = e.target.getAttribute("data-id")
        const data = { product_id, user_id }
        setLoading(true)
        let Result = await fetch(`${process.env.REACT_APP_BASE_URL}/wishlists-remove-product`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        Result = await Result.json()
        var Data = Result.is_in_wishlist;
        setLoading(false)
        if (Data === false) {
            notifyremove()
        }
    }

    return (
        <>
            <div className="page-content">
                {loading === true && <LoadingSpinner />}
                <div className="container">
                    <table className="table table-wishlist table-mobile">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Stock Status</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                mainloading === true ?
                                    <>
                                        <tr className="w-100 text-center">
                                            <td colSpan={4}>
                                                <Skeleton height={120} width={"100%"} />
                                            </td>
                                        </tr>
                                        <tr className="w-100 text-center">
                                            <td colSpan={4}>
                                                <Skeleton height={120} width={"100%"} />
                                            </td>
                                        </tr>
                                    </>
                                    :
                                    Product && Product?.length > 0 ? Product.map((item, index) => {
                                        var cat_name = item.product.category_name
                                        var name = item.product.name
                                        var main_price = item.product.price
                                        var image = item.product.thumbnail_image
                                        var product_id = item.product.id
                                        return (
                                            <> 
                                                <tr key={index} id={"row" + product_id} >
                                                    <td className="product-col">
                                                        <div className="product">
                                                            <figure className="product-media">
                                                                <a href="#">
                                                                    <img src={'https://beta.myrung.co.uk/b/public/' + item.product.thumbnail_image} alt="Product image" />
                                                                </a>
                                                            </figure>

                                                            <h3 className="product-title">
                                                                <NavLink to={`/shop/product/catogeroy/fullwidth/${product_id}`} >{item.product.name}</NavLink>
                                                            </h3>
                                                        </div>
                                                    </td>
                                                    <td className="price-col">{item.product.base_price}</td>
                                                    <td className="stock-col"><span className="in-stock">{item.product.qty <= 0 ? "Out of stock" : "Instock"}</span></td>
                                                    <td className="action-col">
                                                        <a onClick={notify} >
                                                            <button onClick={() => {
                                                                props.addToCartHandler({
                                                                    cat_name: cat_name, name: name, quaintity: Value,
                                                                    product_image: image, product_id: product_id, totalprice: (Value * main_price)
                                                                })
                                                                // props.addToCartHandler({
                                                                //     cat_name: , name: , quantity: ,
                                                                //     Price:, symbol: ,
                                                                //     product_image: , product_id: , totalprice: 
                                                                // })
                                                            }}
                                                                className="btn btn-block btn-outline-primary-2"><i className="icon-cart-plus"></i>Add to Cart</button>
                                                        </a>
                                                    </td>
                                                    <td className="remove-col"><button onClick={RemoveWhislist} data-id={product_id} className="btn-remove"><i data-id={product_id} className="icon-close"></i></button></td>
                                                </tr>
                                            </>
                                        );
                                    })
                                        :
                                        <div>
                                            <h3 className="text-center mt-5">No Record Found.</h3>
                                        </div>
                            }

                        </tbody>
                    </table>
                    <div className="wishlist-share">
                        <div className="social-icons social-icons-sm mb-2">
                            <label className="social-label">Share on:</label>
                            <a href="#" className="social-icon" title="Facebook" target="_blank"><i className="icon-facebook-f"></i></a>
                            <a href="#" className="social-icon" title="Twitter" target="_blank"><i className="icon-twitter"></i></a>
                            <a href="#" className="social-icon" title="Instagram" target="_blank"><i className="icon-instagram"></i></a>
                            <a href="#" className="social-icon" title="Youtube" target="_blank"><i className="icon-youtube"></i></a>
                            <a href="#" className="social-icon" title="Pinterest" target="_blank"><i className="icon-pinterest"></i></a>
                        </div>
                    </div>
                </div>
            </div>

        </>);

}
export default WhishlistComponent;
