import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
import Quickviewcontainer from "../container/Quickviewcontainer";

const ProductCard = (props) => {

    const [popId, setPopId] = useState()
    const [showpopup, setShowPopup] = useState()
    const [token, setToken] = useState(null)
    const [user_id, setUser_id] = useState(null)

    var product = props.array;
    var Value = 1;

    //==========================================Get User Info Code===================================================

    const getData = async () => {
        const userToken = sessionStorage.getItem('user-info_token')
        const userID = await JSON.parse((localStorage.getItem('user-info')))
        setToken(userToken)
        setUser_id(userID)
    }

    useEffect(() => {
        getData()
    }, [])

    //==========================================Add to wishlist Code===================================================

    const addWhishlistActiveHandler = async (e) => {
        toast.error("Already added in to wishlist")
    }
    const addWhishlistHandler = async (e) => {
        if (token != null) {
            let product_id = e.target.getAttribute("data-id")
            let data = { product_id, user_id }
            var Result = await fetch(`${process.env.REACT_APP_BASE_URL}/wishlists-add-product`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "Authorization": "Bearer " + token
                }
            });
            Result = await Result.json()
            var Data = Result.is_in_wishlist;
            if (Data === true) {
                notify_add_whishlist();
            }
            else if (Data === false) {
            }
        }
        else {
            notifywhish()
        }
    }

    //========================================Notify Function======================================

    const notify = () => {
        toast.success("Item added")
        let cartDrp = document.querySelector(".dropdown-menu")
        cartDrp.style.visibility = "visible"
        cartDrp.style.opacity = "1"
        setTimeout(() => {
            cartDrp.style.visibility = "hidden"
            cartDrp.style.opacity = "0"
        }, 3000);
    };
    const notifywhish = () => {
        toast.error("Please Login first")
    };
    const notify_add_whishlist = () => {
        toast.success("Item added into Whishlist")
    };

    const quickView = (e) => {
        setPopId(e)
        setShowPopup("d-block")

    }
    const hidePopup = () => {
        setShowPopup("d-none")
    }

    return (
        <>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                <div className="product product-7">
                    <figure className="product-media">
                        {
                            product.current_stock <= 0 && <span className="product-label label-sale">Out of stock</span>

                        }
                        <NavLink to={`/shop/product/catogeroy/fullwidth/${product.id}`}>
                            <img src={"https://beta.myrung.co.uk/b/public/" + product.thumbnail_image} alt="Product image" className="product-image" />
                        </NavLink>
                        <div className="product-action-vertical">
                            {
                                product?.wishlist_status === 1 ?
                                    <a onClick={addWhishlistActiveHandler} data-id={product?.id} className="btn-product-icon btn-product-icon-active btn-wishlist" title="Add to wishlist"><span>add to wishlist</span></a>
                                    :
                                    <a onClick={addWhishlistHandler} data-id={product?.id} className="btn-product-icon  btn-wishlist" title="Add to wishlist"><span>add to wishlist</span></a>

                            }
                            <div onClick={() => { quickView(product.id) }} className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></div>
                        </div>
                        <div className="product-action">
                        <div className="product-action product-action-transparent">
                            <a onClick={() => {
                                if (product.current_stock <= 0) {
                                    toast.error("Out of stock")
                                }
                                else if (product.current_stock > 0) {
                                    props.addToCartHandler({
                                        cat_name: product.category_name, name: product.name, quantity: Value,
                                        Price: product.calculable_price, symbol: product.currency_symbol,
                                        product_image: product.thumbnail_image, product_id: product.id, totalprice: (Value * product.calculable_price)
                                    })
                                    notify()
                                }

                            }}
                                className="btn-product btn-cart"><span>add to cart</span></a>
                            </div>
                        </div>
                    </figure>
                    <div className="product-body">
                        <div className="product-cat">
                            <NavLink to={`/shop/product/catogeroy/fullwidth/${product.id}`}>{product.category_name}</NavLink>
                        </div>
                        <h3 className="product-title"><NavLink to={`/shop/product/catogeroy/fullwidth/${product.id}`}>{product.name}</NavLink></h3>
                        <div className="product-price">
                            {product.currency_symbol} {product.calculable_price}
                        </div>
                    </div>
                </div>
                <div onClick={hidePopup} className={"popup-overlay " + showpopup}></div>
                {showpopup === "d-block" ?
                    <div id="quick_view_popup" className={showpopup}>
                        <div onClick={hidePopup} className="close-btn"><i className="icon-close"></i></div>
                        <Quickviewcontainer itemId={popId} />
                    </div> : ''}
            </div>

        </>
    )
}
export default ProductCard;