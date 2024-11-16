import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductSkeltonCard from "./Productskeltoncard";
import LoadingSpinner from './LoadingSpinner';
import { SkeletonTheme } from "react-loading-skeleton";
import Quickviewcontainer from "../container/Quickviewcontainer";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from "axios";

const NewArrivals = (props) => {

    const [catData, setCatData] = useState([]);
    const [product, setProduct] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isMainLoading, setIsMainLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [popId, setPopId] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const value = 1;

    // Fetch Product Categories
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/categories`);
            const data = await response.json();
            setCatData(data.data);
        }
        fetchCategories();
    }, []);

    // Fetch Products
    const getNewProduct = async () => {
        const userToken = sessionStorage.getItem('user-info_token');
        if (userToken) {

            const user = await JSON.parse(localStorage.getItem('user-info'));
            setUserId(user);
            axios.get(`${process.env.REACT_APP_BASE_URL}/products?userId=${user}`)
                .then(res => {
                    setProduct(res.data.data);
                    setIsMainLoading(false);
                });
        }
        else {
            localStorage.removeItem('user-info')
            localStorage.removeItem('user')
            localStorage.removeItem('user-name')
            axios.get(`${process.env.REACT_APP_BASE_URL}/products?userId=${null}`)
                .then(res => {
                    setProduct(res.data.data);
                    setIsMainLoading(false);
                });
        }


    }

    useEffect(() => {
        getNewProduct();
    }, []);

    // Add to Wishlist
    const addWishlistHandler = async (e) => {

        if (userId) {
            setLoading(true);
            const productId = e.target.getAttribute("data-id");
            const data = { product_id: productId, user_id: userId };
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/wishlists-add-product`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const result = await response.json();
            setLoading(false);
            if (result.is_in_wishlist) {
                toast.success("Item added to wishlist");
            }
        } else {
            toast.error("Please login first");
        }
    }

    const quickView = (id) => {
        setPopId(id);
        setShowPopup(true);
    }

    const hidePopup = () => {
        document.querySelector('body').classList.remove("modal-open")
        setShowPopup(false);
    }

    return (
        <>
            <div className="container pt-3 new-arrivals">
                {isLoading && <LoadingSpinner />}
                <div className="heading heading-center mb-3">
                    <h2 className="title">New Arrivals</h2>
                    <ul className="nav nav-pills justify-content-center" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active text-capitalize" id="new-all-link" data-toggle="tab" href="#new-all-tab" role="tab" aria-controls="new-all-tab" aria-selected="true">All</a>
                        </li>
                        {catData.map((tabItem, index) => (
                            <li className="nav-item" key={index}>
                                <a className="nav-link text-capitalize" id={`new-${tabItem.id}-link`} data-toggle="tab" href={`#new-${tabItem.id}-tab`} role="tab" aria-controls={`new-${tabItem.id}-tab`} aria-selected="true">{tabItem.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="tab-content">
                    <div className="tab-pane p-0 fade show active" id="new-all-tab" role="tabpanel" aria-labelledby="new-all-link">
                        <div className="products">
                            <div className="row justify-content-center">
                                {isMainLoading ? (
                                    <SkeletonTheme baseColor="rgb(244 244 244)" highlightColor="var(--white-color)">
                                        {[...Array(4)].map((_, index) => (
                                            <div className="col-6 col-md-4 col-lg-3" key={index}>
                                                <ProductSkeltonCard />
                                            </div>
                                        ))}
                                    </SkeletonTheme>
                                ) : (
                                    product.slice(0, 8).map((item, index) => {
                                        const productDetails = {
                                            cat_name: item.category_name,
                                            name: item.name,
                                            Price: item.calculable_price,
                                            symbol: item.currency_symbol,
                                            product_image: item.thumbnail_image,
                                            product_id: item.id,
                                            quantity: value,
                                            totalprice: (value * item.calculable_price)
                                        };
                                        return (
                                            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-4">
                                                <div className="product product-7">
                                                    <figure className="product-media">
                                                        <NavLink to={`/shop/product/catogeroy/fullwidth/${item.id}`}>
                                                            {/* <img src={`https://beta.myrung.co.uk/b/public/${item.thumbnail_image}`} alt="Product" className="product-image" /> */}
                                                            <LazyLoadImage
                                                                className="product-image"
                                                                effect="blur"
                                                                alt={"Product image"}
                                                                src={`https://beta.myrung.co.uk/b/public/${item.thumbnail_image}`}
                                                            />
                                                        </NavLink>
                                                        {item.current_stock <= 0 && <span className="product-label label-sale">Out of stock</span>}
                                                        <div className="product-action-vertical">
                                                            {item.wishlist_status === 1 ? (
                                                                <a onClick={() => toast.error("Already added to wishlist")} data-id={item.id} className="btn-product-icon btn-product-icon-active btn-wishlist" title="Add to wishlist"><span>add to wishlist</span></a>
                                                            ) : (
                                                                <a onClick={addWishlistHandler} data-id={item.id} className="btn-product-icon btn-wishlist" title="Add to wishlist"><span>add to wishlist</span></a>
                                                            )}
                                                            <div onClick={() => {
                                                                document.querySelector('body').classList.add("modal-open")
                                                                quickView(item.id)
                                                            }} className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></div>
                                                        </div>
                                                        <div className="product-action product-action-transparent">
                                                            <a onClick={() => {
                                                                if (item.current_stock <= 0) {
                                                                    toast.error("Out of stock");
                                                                } else {
                                                                    props.addToCartHandler(productDetails);
                                                                    toast.success("Item added to cart");
                                                                }
                                                            }} className="btn-product btn-cart"><span>add to cart</span></a>
                                                        </div>
                                                    </figure>
                                                    <div className="product-body">
                                                        <div className="product-cat">
                                                            <NavLink to={`/shop/product/category/${item.category_name}=${item.category_id}`}>{item.category_name}</NavLink>
                                                        </div>
                                                        <h3 className="product-title">
                                                            <NavLink to={`/shop/product/catogeroy/fullwidth/${item.id}`}>{item.name}</NavLink>
                                                        </h3>
                                                        <div className="product-price">
                                                            {item.currency_symbol} {item.calculable_price}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                    {catData.map((tabData, index) => {
                        let count = 0;
                        return (
                            <div key={index} className="tab-pane p-0 fade" id={`new-${tabData.id}-tab`} role="tabpanel" aria-labelledby={`new-${tabData.id}-link`}>
                                <div className="products">
                                    <div className="row justify-content-center">
                                        {product.map((item, index) => {
                                            if (item.category_name === tabData.name && count < 8) {
                                                count++;
                                                const productDetails = {
                                                    cat_name: item.category_name,
                                                    name: item.name,
                                                    Price: item.calculable_price,
                                                    symbol: item.currency_symbol,
                                                    product_image: item.thumbnail_image,
                                                    product_id: item.id,
                                                    quantity: value,
                                                    totalprice: (value * item.calculable_price)
                                                };
                                                return (
                                                    <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-4">
                                                        <div className="product product-7">
                                                            <figure className="product-media">
                                                                <NavLink to={`/shop/product/catogeroy/fullwidth/${item.id}`}>
                                                                    {/* <img src={`https://beta.myrung.co.uk/b/public/${item.thumbnail_image}`} alt="Product" className="product-image" /> */}
                                                                    <LazyLoadImage
                                                                        className="product-image"
                                                                        effect="blur"
                                                                        alt={"Product image"}
                                                                        src={`https://beta.myrung.co.uk/b/public/${item.thumbnail_image}`}
                                                                    />
                                                                </NavLink>
                                                                {item.current_stock <= 0 && <span className="product-label label-sale">Out of stock</span>}
                                                                <div className="product-action-vertical">
                                                                    {item.wishlist_status === 1 ? (
                                                                        <a onClick={() => toast.error("Already added to wishlist")} data-id={item.id} className="btn-product-icon btn-product-icon-active btn-wishlist" title="Add to wishlist"><span>add to wishlist</span></a>
                                                                    ) : (
                                                                        <a onClick={addWishlistHandler} data-id={item.id} className="btn-product-icon btn-wishlist" title="Add to wishlist"><span>add to wishlist</span></a>
                                                                    )}
                                                                    <div onClick={() => {
                                                                        document.querySelector('body').classList.add("modal-open")
                                                                        quickView(item.id)
                                                                    }
                                                                    } className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></div>
                                                                </div>
                                                                <div className="product-action product-action-transparent">
                                                                    <a onClick={() => {
                                                                        if (item.current_stock <= 0) {
                                                                            toast.error("Out of stock");
                                                                        } else {
                                                                            props.addToCartHandler(productDetails);
                                                                            toast.success("Item added to cart");
                                                                        }
                                                                    }} className="btn-product btn-cart"><span>add to cart</span></a>
                                                                </div>
                                                            </figure>
                                                            <div className="product-body">
                                                                <div className="product-cat">
                                                                    <NavLink to={`/shop/product/category/${item.category_name}=${item.category_id}`}>{item.category_name}</NavLink>
                                                                </div>
                                                                <h3 className="product-title">
                                                                    <NavLink to={`/shop/product/catogeroy/fullwidth/${item.id}`}>{item.name}</NavLink>
                                                                </h3>
                                                                <div className="product-price">
                                                                    {item.currency_symbol} {item.calculable_price}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {showPopup && (
                <div id="quick_view_popup" className={showPopup ? 'd-block' : 'd-none'}>
                    <div onClick={hidePopup} className="close-btn"><i className="icon-close"></i></div>
                    <Quickviewcontainer itemId={popId} />
                </div>
            )}
        </>
    );
}

export default NewArrivals;