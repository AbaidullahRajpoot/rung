import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import LoadingSpinner from './LoadingSpinner'
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from '../services/actions/action';
import 'react-toastify/dist/ReactToastify.css';

const AdminWhishlistComponent = (props) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [Product, setProduct] = useState([]);
    const [user_id, setUser_id] = useState(null);

    var Value = 1

    //=========================================Get Wishlist Data========================================

    const ShowWhishlist = async () => {
        const user_id = await JSON.parse((localStorage.getItem('user-info')))
        if (user_id) {
            const data = { user_id }
            setUser_id(user_id)
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
            setLoading(false)
            setProduct(Data)
        }
    }

    //=======================================================Call Whenever Page Rendered======================================

    useEffect(() => {
        ShowWhishlist();
    }, []);

    //========================================================Notify Message Func=============================================

    const notify = () => {
        toast.success("Item added")
    };
    const notifyremove = () => {
        toast.success("Successfully Remove from Whishlist")
    };

    //=======================================================Remove Wishlist Data=========================================

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
        if (Result.message === "Product is removed from wishlist") {
            ShowWhishlist()
            var Data = Result.is_in_wishlist;
            setLoading(false)
            if (Data === false) {
                notifyremove()
            }
        }
    }

    //=================================================Handler Add To Cart===============================================
    const handleAddToCart = (addToProduct) => {
        dispatch(addToCart(addToProduct));
    };

    return (
        <>
            <div className="page-content">
                <div className="">
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
                                loading === true ?
                                    <>
                                        <LoadingSpinner />
                                    </>
                                    :
                                    Product && Product?.length > 0 ? Product.map((item, index) => {
                                        var cat_name = item.product.category_name
                                        var name = item.product.name
                                        var calculable_price = item.product.calculable_price
                                        var currency_symbol = item.product.currency_symbol
                                        var image = item.product.thumbnail_image
                                        var productStock = item.product.current_stock
                                        var product_id = item.product.id_image
                                        var product_id = item.product.id
                                        return (
                                            <tr key={item.id} id={"row" + product_id} >
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
                                                <td className="stock-col">{productStock <= 0 ? <span className="in-stock text-danger">Out of stock</span> : <span className="in-stock ">Instock</span>}</td>
                                                <td className="action-col">
                                                    <a>
                                                        <button onClick={() => {
                                                            if (productStock <= 0) {
                                                                toast.error("Out of stock")
                                                            }
                                                            else if ((productStock > 0)) {

                                                                handleAddToCart({
                                                                    cat_name: cat_name, name: name, quantity: Value,
                                                                    Price: calculable_price, symbol: currency_symbol, product_image: image, product_id: product_id,
                                                                    totalprice: (Value * calculable_price)
                                                                })
                                                                notify()
                                                            }
                                                        }}
                                                            className="btn btn-block btn-outline-primary-2"><i className="icon-cart-plus"></i>Add to Cart</button>
                                                    </a>
                                                </td>
                                                <td className="remove-col"><button onClick={RemoveWhislist} data-id={product_id} className="btn-remove"><i data-id={product_id} className="icon-close"></i></button></td>
                                            </tr>
                                        );
                                    })
                                        :
                                        <div>
                                            <h3 className="text-center mt-5">No Record Found.</h3>
                                        </div>
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </>);

}
export default AdminWhishlistComponent;
