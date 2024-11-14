import React, { useEffect, useState } from "react";
import OwlCarousel from 'react-owl-carousel';
import { toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import ProductSkeltonCard from "./Productskeltoncard";
import { SkeletonTheme } from "react-loading-skeleton";
import LoadingSpinner from "./LoadingSpinner";
import Quickviewcontainer from "../container/Quickviewcontainer";
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Featured = (props) => {

    const [isloading, setLoading] = useState(true);
    const [wishlistLoading, setWishlistLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [token, setToken] = useState(null)
    const [user_id, setUser_id] = useState(null)
    const [popId, setPopId] = useState()
    const [showpopup, setShowPopup] = useState()

    var Value = 1;

    //================================================Get Featured Product========================================

    const getFeaturedPrduct = async () => {
        const user_id_product = await JSON.parse((localStorage.getItem('user-info')))
        axios.post(`${process.env.REACT_APP_BASE_URL}/products/featured`, {
            user_id: user_id_product
        })
            .then(res => {
                var insidData = res.data.data;
                setProduct(insidData);
                setLoading(false)
            })
    }

    useEffect(() => {
        getFeaturedPrduct()
    }, [isloading])

    //==========================================================Token Fun=========================================

    const Token = async () => {
        const mytoken = sessionStorage.getItem('user-info_token')
        const data = await JSON.parse((localStorage.getItem('user-info')))
        setUser_id(data)
        setToken(mytoken)
    }

    //=======================Call Whenever Page Rendered===================================

    useEffect(() => {
        Token()
    }, [Token])


    //=================================================Notify Code=========================

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

    //============================================== Wishlist Code====================================

    const addWhishlistActiveHandler = async (e) => {
        toast.error("Already added in to wishlist")
    }

    const addWhishlistHandler = async (e) => {
        if (token != null) {
            setWishlistLoading(true)
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
            setWishlistLoading(false)
            Result = await Result.json()
            var Data = Result.is_in_wishlist;
            if (Data === true) {
                notify_add_whishlist();
            }
        }
        else {
            notifywhish()
        }
    }

    const options1 = {
        responsive: {
            0: {
                items: 1,

            },
            480: {
                items: 2,

            },
            768: {
                items: 2,

            },
            992: {
                items: 3,

            },
            1200: {
                items: 3,
                nav: false,

            },
        },
    };

    //==================================================Qick View======================================

    const quickView = (e) => {
        setPopId(e)
        setShowPopup("d-block")

    }
    const hidePopup = () => {
        setShowPopup("d-none")
    }

    return (
        <>
            <div className="container">
                <div className="heading heading-center mb-3 mt-4">
                    <h2 className="title">Premium Headwear</h2>
                </div>
                {wishlistLoading === true && <LoadingSpinner />}
                <OwlCarousel className=" owl-theme owl-carousel owl-simple carousel-equal-height carousel-with-shadow" dots={true}
                    nav={false} margin={20} autoPlay={true} loop={false} {...options1} >
                    {
                        <SkeletonTheme baseColor="rgb(244 244 244)" highlightColor="#fff">
                            {isloading === true ?
                                <>
                                    <ProductSkeltonCard />
                                    <ProductSkeltonCard />
                                    <ProductSkeltonCard />

                                </>
                                :
                                product ? product.map((item, index) => {
                                    var cat_name = item.category_name
                                    var name = item.name
                                    var calculable_price = item.calculable_price
                                    var currency_symbol = item.currency_symbol
                                    var image = item.thumbnail_image
                                    var wishlist_status = item.wishlist_status
                                    var productStock = item.current_stock
                                    var product_id = item.id
                                    return (

                                        <div className="product product-2" key={index}>
                                            <figure className="product-media">
                                                <NavLink to={`/shop/product/catogeroy/fullwidth/${item.id}`} >
                                                    <img src={'https://beta.myrung.co.uk/b/public/' + item.thumbnail_image} alt="Product image" className="product-image" />
                                                </NavLink>
                                                {
                                                    productStock <= 0 && <span className="product-label label-sale">Out of stock</span>

                                                }
                                                <div className="product-action-vertical">
                                                    {
                                                        wishlist_status === 1 ?
                                                            <a onClick={addWhishlistActiveHandler} data-id={product_id} className="btn-product-icon btn-product-icon-active btn-wishlist" title="Add to wishlist"><span>add to wishlist</span></a>
                                                            :
                                                            <a onClick={addWhishlistHandler} data-id={product_id} className="btn-product-icon  btn-wishlist" title="Add to wishlist"><span>add to wishlist</span></a>

                                                    }
                                                    <div onClick={() => { quickView(product_id) }} className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></div>
                                                </div>
                                                <div className="product-action product-action-transparent">
                                                    <a onClick={() => {
                                                        if (productStock <= 0) {
                                                            toast.error("Out of stock")
                                                        }
                                                        else if((productStock > 0)) {

                                                            props.addToCartHandler({
                                                                cat_name: cat_name, name: name,
                                                                Price: calculable_price, symbol: currency_symbol, product_image: image, product_id: product_id, quantity: Value,
                                                                totalprice: (Value * calculable_price)
                                                            })
                                                            notify()
                                                        }

                                                    }} className="btn-product btn-cart"><span>add to cart</span></a>
                                                </div>
                                            </figure>
                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <NavLink to={`/shop/product/catogeroy/${item.category_name}=${item.category_id}`}>{item.category_name}</NavLink>
                                                </div>
                                                <h3 className="product-title">
                                                    <NavLink to={`/shop/product/catogeroy/fullwidth/${item.id}`}>{name}</NavLink></h3>
                                                <div className="product-price">
                                                    {currency_symbol + " " + calculable_price}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }) : ""
                            }
                        </SkeletonTheme>
                    }
                </OwlCarousel>
            </div>
            <div className="mb-5"></div>
            <div onClick={hidePopup} className={"popup-overlay " + showpopup}></div>
            {showpopup === "d-block" ?
                <div id="quick_view_popup" className={showpopup}>
                    <div onClick={hidePopup} className="close-btn"><i className="icon-close"></i></div>
                    <Quickviewcontainer itemId={popId} />
                </div> : ''}
        </>
    );
}
export default Featured;