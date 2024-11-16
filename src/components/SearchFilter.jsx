import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import ProductSkeltonCard from "./Productskeltoncard";
import 'react-toastify/dist/ReactToastify.css';

import Quickviewcontainer from "../container/Quickviewcontainer";

const SearchFilter = (props) => {

    const [popId, setPopId] = useState()
    const [showpopup, setShowPopup] = useState()
    const [Product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation()
    var user_id;
    const { searchValue } = location.state;
    let name = searchValue
    let searchName = { name }

    //============================================Get Product Data Api======================================

    const getSearchProduct = async () => {
        setIsLoading(true)
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(searchName)
        });
        response = await response.json();
        setIsLoading(false)
        var productData = response.data;
        setProduct(productData);
    }

    //====================================================Call Whenever Page Rendered==========================

    useEffect(() => {
        getSearchProduct();
    }, [name])

    //==============================================Notify Code============================================

    const notify = () => {
        toast.success("Item added")
        let cartDrp = document.querySelector(".dropdown-menu")
        cartDrp.style.visibility = "visible"
        cartDrp.style.opacity = "1"
        setTimeout(() => {
            cartDrp.style.visibility = "hidden"
            cartDrp.style.opacity = "0"
        }, 3000);
    }

    const notifywhish = () => {
        toast.error("Please Login first")
    }

    const notify_add_whishlist = () => {
        toast.success("Item added into Whishlist")
    }

    //=================================Add Wishlist Data Code====================================

    const addWhishlistHandler = async (e) => {
        if (user_id) {
            let product_id = e.target.getAttribute("data-id")
            let data = { product_id, user_id }
            var Result = await fetch(`${process.env.REACT_APP_BASE_URL}/wishlists-add-product`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        }
        else {
            notifywhish()
        }
        Result = await Result.json()
        var Data = Result.is_in_wishlist;
        if (Data === true) {
            notify_add_whishlist();
        }
    }


    //==========================================Quick View Code=====================================

    const quickView = (e) => {
        setPopId(e)
        setShowPopup("d-block")
    }
    const hidePopup = () => {
        setShowPopup("d-none")
    }

    return (
        <>
            <div className="products mb-3">
                <div className="row justify-content-center">
                    {
                        isLoading === true ?
                            <>
                                <div className="col-6">
                                    <ProductSkeltonCard />
                                </div>
                                <div className="col-6">
                                    <ProductSkeltonCard />
                                </div>
                            </>
                            :
                            Product ? Product.map((product, index) => {
                                var cat_name = product.category_name
                                var name = product.name
                                var calculable_price = product.calculable_price
                                var currency_symbol = product.currency_symbol
                                var image = product.thumbnail_image
                                var product_id = product.id
                                return (
                                    <>
                                        <div className="col-6">
                                            <div className="product product-7 text-center">
                                                <figure className="product-media">
                                                    <span className="product-label label-new">New</span>
                                                    <NavLink to={`/shop/product/catogeroy/fullwidth/${product.id}`}>
                                                        <img src={"https://beta.myrung.co.uk/b/public/" + product.thumbnail_image} alt="Product image" className="product-image" />
                                                    </NavLink>
                                                    <div className="product-action-vertical">
                                                        <NavLink to='' onClick={addWhishlistHandler} data-id={product_id} className="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></NavLink>
                                                        <div onClick={() => { quickView(product_id) }} className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></div>
                                                    </div>
                                                    <div onClick={notify} className="product-action">
                                                        <a onClick={() => {
                                                            props.addToCartHandler({
                                                                cat_name: cat_name, name: name, quantity: 1,
                                                                Price: calculable_price, symbol: currency_symbol,
                                                                product_image: image, product_id: product_id
                                                            })
                                                        }}
                                                            className="btn-product btn-cart"><span>add to cart</span></a>
                                                    </div>
                                                </figure>
                                                <div className="product-body">
                                                    <div className="product-cat">
                                                        <a href="#">{cat_name}</a>
                                                    </div>
                                                    <h3 className="product-title"><a href="product.php">{name}</a></h3>
                                                    <div className="product-price">
                                                        {currency_symbol}{calculable_price}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })
                                :
                                <h1>No Records Found</h1>

                    }

                </div>
            </div>
            <div onClick={hidePopup} className={"popup-overlay " + showpopup}></div>
            <div id="quick_view_popup" className={showpopup}>
                <div onClick={hidePopup} className="close-btn"><i className="icon-close"></i></div>
                <Quickviewcontainer itemId={popId} />
            </div>
        </>
    );
}
export default SearchFilter;
