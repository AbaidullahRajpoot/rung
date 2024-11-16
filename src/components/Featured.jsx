import React, { useEffect, useState } from "react";
import OwlCarousel from 'react-owl-carousel';
import { toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import ProductSkeltonCard from "./Productskeltoncard";
import { SkeletonTheme } from "react-loading-skeleton";
import LoadingSpinner from "./LoadingSpinner";
import Quickviewcontainer from "../container/Quickviewcontainer";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Featured = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [wishlistLoading, setWishlistLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [popId, setPopId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [value, setValue] = useState(1);

    //=============================Get User Info===================================

    const initialize = async () => {
        const userToken = sessionStorage.getItem('user-info_token');
        if (userToken) {
            const userInfo = await JSON.parse(localStorage.getItem('user-info'));
            setUserId(userInfo);
            setToken(userToken);
            getFeaturedProduct(userInfo);
        }
        else {
            localStorage.removeItem('user-info')
            localStorage.removeItem('user')
            localStorage.removeItem('user-name')
            getFeaturedProduct(null);

        }
        setIsLoading(false);
    }

    useEffect(() => {
        initialize();
    }, [isLoading]);


    const getFeaturedProduct = async (user_id) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/products/featured`, {
                user_id
            });
            setProduct(response.data.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch featured products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const notify = (message, type = 'success') => {
        type === 'success' ? toast.success(message) : toast.error(message);
    };

    const handleAddWishlist = async (e) => {
        if (token) {
            setWishlistLoading(true);
            const productId = e.target.getAttribute("data-id");
            const data = { product_id: productId, user_id: userId };
            try {
                const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/wishlists-add-product`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (result.data.is_in_wishlist) {
                    notify("Item added into Wishlist");
                } else {
                    notify("Already added to wishlist", 'error');
                }
            } catch (error) {
                console.error('Failed to add to wishlist:', error);
            } finally {
                setWishlistLoading(false);
            }
        } else {
            notify("Please Login first", 'error');
        }
    };

    const handleQuickView = (id) => {
        setPopId(id);
        setShowPopup(true);
    };

    const hidePopup = () => {
        document.querySelector('body').classList.remove("modal-open")
        setShowPopup(false);
    };

    const options1 = {
        responsive: {
            0: { items: 1 },
            480: { items: 2 },
            768: { items: 2 },
            992: { items: 3 },
            1200: { items: 3, nav: false },
        },
    };

    return (
        <>
            <div className="container">
                <div className="heading heading-center my-5">
                    <h2 className="title">Premium Headwear</h2>
                </div>
                {wishlistLoading === true && <LoadingSpinner />}
                <OwlCarousel className=" owl-theme owl-carousel owl-simple carousel-equal-height carousel-with-shadow" dots={true}
                    nav={false} margin={20} autoPlay={true} loop={false} {...options1} >
                    {
                        <SkeletonTheme baseColor="rgb(244 244 244)" highlightColor="var(--white-color)">
                            {isLoading === true ?
                                <>
                                    <ProductSkeltonCard />
                                    <ProductSkeltonCard />
                                    <ProductSkeltonCard />

                                </>
                                :
                                product && product.map((item, index) => {
                                    return (
                                        <div className="product product-7" key={index}>
                                            <figure className="product-media">
                                                <NavLink to={`/shop/product/catogeroy/fullwidth/${item.id}`}>
                                                    {/* <img src={`https://beta.myrung.co.uk/b/public/${item.thumbnail_image}`} alt="Product image" className="product-image" /> */}
                                                    <LazyLoadImage
                                                        className="product-image"
                                                        effect="blur"
                                                        alt={"Product image"}
                                                        src={`https://beta.myrung.co.uk/b/public/${item.thumbnail_image}`}
                                                    />
                                                </NavLink>
                                                {item.current_stock <= 0 && <span className="product-label label-sale">Out of stock</span>}
                                                {item.current_stock > 0 && item.discount_in_percentage > 0 && <span className="product-label label-discount">{item.discount_in_percentage}% OFF</span>}
                                                <div className="product-action-vertical">
                                                    <a onClick={item.wishlist_status === 1 ? notify.bind(null, "Already added to wishlist", 'error') : handleAddWishlist} data-id={item.id} className={`btn-product-icon ${item.wishlist_status === 1 ? 'btn-product-icon-active' : ''} btn-wishlist`} title="Add to wishlist">
                                                        <span>add to wishlist</span>
                                                    </a>
                                                    <div onClick={() => {
                                                        document.querySelector('body').classList.add("modal-open")
                                                        handleQuickView(item.id)
                                                    }
                                                    } className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></div>
                                                </div>
                                                <div className="product-action product-action-transparent">
                                                    <a onClick={() => {
                                                        if (item.current_stock <= 0) {
                                                            notify("Out of stock", 'error');
                                                        } else {
                                                            props.addToCartHandler({
                                                                cat_name: item.category_name,
                                                                name: item.name,
                                                                Price: item.calculable_price,
                                                                symbol: item.currency_symbol,
                                                                product_image: item.thumbnail_image,
                                                                product_id: item.id,
                                                                quantity: value,
                                                                totalprice: value * item.calculable_price
                                                            });
                                                            notify("Item added");
                                                        }
                                                    }} className="btn-product btn-cart"><span>add to cart</span></a>
                                                </div>
                                            </figure>
                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <NavLink to={`/shop/product/catogeroy/${item.category_name}=${item.category_id}`}>{item.category_name}</NavLink>
                                                </div>
                                                <h3 className="product-title">
                                                    <NavLink to={`/shop/product/catogeroy/fullwidth/${item.id}`}>{item.name}</NavLink>
                                                </h3>
                                                <div className="stock-price">
                                                    {item.stroked_price}
                                                </div>
                                                <div className="product-price">
                                                    {item.main_price}
                                                </div>
                                            </div>
                                        </div>)
                                })
                            }
                        </SkeletonTheme>
                    }
                </OwlCarousel>
            </div>
            <div className="mb-5"></div>
            <div onClick={hidePopup} className={`popup-overlay ${showPopup ? 'd-block' : 'd-none'}`}></div>
            {showPopup && (
                <div id="quick_view_popup" className={showPopup ? 'd-block' : 'd-none'}>
                    <div onClick={hidePopup} className="close-btn"><i className="icon-close"></i></div>
                    <Quickviewcontainer itemId={popId} />
                </div>
            )}
        </>
    );
}
export default Featured;