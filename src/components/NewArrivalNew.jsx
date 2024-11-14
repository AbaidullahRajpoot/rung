import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductSkeltonCard from "./Productskeltoncard";
import LoadingSpinner from './LoadingSpinner';
import { SkeletonTheme } from "react-loading-skeleton";
import Quickviewcontainer from "../container/Quickviewcontainer";
import axios from "axios";

const NewArrivel = (props) => {

    const [catData, setCatData] = useState([])
    const [Product, SetProduct] = useState([]);
    const [isloading, setLoading] = useState(false)
    const [isMainloading, setisMainloading] = useState(true)
    const [user_id, setuser_id] = useState(null)
    const [popId, setPopId] = useState()
    const [showpopup, setShowPopup] = useState()

    var Value = 1;

    //==============================================Get Product Categories========================================

    useEffect(() => {
        const fetchApi = async () => {
            const catagories = await fetch(`${process.env.REACT_APP_BASE_URL}/categories`)
            const catagoriesData = await catagories.json()
            setCatData(catagoriesData.data)
        }
        fetchApi()

    }, [])

    //=================================================Get Product Api===========================================

    const getNewProduct = async () => {
        const user_id = await JSON.parse((localStorage.getItem('user-info')))
        axios.get(`${process.env.REACT_APP_BASE_URL}/products?userId=${user_id}`)
            .then(res => {
                var insidData = res.data.data;
                SetProduct(insidData);
                setisMainloading(false)
            })
    }

    useEffect(() => {
        getNewProduct()
    }, [])

    //===========================================Wishlist======================================

    const addWhishlistActiveHandler = async (e) => {
        toast.error("Already added in to wishlist")
    }
    const addWhishlistHandler = async (e) => {

        if (user_id) {
            setLoading(true)
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
            Result = await Result.json()
            setLoading(false)
            var Data = Result.is_in_wishlist;
            if (Data === true) {
                notify_add_whishlist()
            }
        }
        else {
            notifylogin();
        }
    }

    //==============================Toast Code=======================================

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

    const notify_add_whishlist = () => {
        toast.success("Item added into Whishlist")
    }

    const notifylogin = () => {
        toast.error("Please Login first")
    }

    //===================================Get User Info From Local Storage===========================================

    const getData = async () => {

        const data = await JSON.parse((localStorage.getItem('user-info')))
        setuser_id(data)
    }

    //==================================================Qick View======================================

    const quickView = (e) => {
        setPopId(e)
        setShowPopup("d-block")

    }
    const hidePopup = () => {
        setShowPopup("d-none")
    }

    //=====================================Call Whenever Page Rendered===========================================

    useEffect(() => {
        getData()
    }, [getData])


    return (
        <>
            <div className="container pt-6 new-arrivals">
                {isloading === true && <LoadingSpinner />}
                <div className="heading heading-center mb-3">
                    <h2 className="title">New Arrivals</h2>
                    <ul className="nav nav-pills justify-content-center" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active text-capitalize" id="new-all-link" data-toggle="tab" href="#new-all-tab"
                                role="tab" aria-controls="new-all-tab" aria-selected="true">All</a>
                        </li>
                        {catData.map((tabItems, index) => {
                            return (
                                <li className="nav-item" key={index}>
                                    <a className="nav-link text-capitalize" id={`new-${tabItems.id}-link`} data-toggle="tab" href={`#new-${tabItems.id}-tab`} role="tab" aria-controls={`new-${tabItems.id}-tab`} aria-selected="true">{tabItems.name}</a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="tab-content">
                    <div className="tab-pane p-0 fade show active" id="new-all-tab" role="tabpanel"
                        aria-labelledby="new-all-link">
                        <div className="products">
                            <div className="row justify-content-center">
                                {isMainloading ?
                                    <>
                                        <SkeletonTheme baseColor="rgb(244 244 244)" highlightColor="#fff">
                                            <div className="col-6 col-md-4 col-lg-3">
                                                <ProductSkeltonCard />
                                            </div>
                                            <div className="col-6 col-md-4 col-lg-3">
                                                <ProductSkeltonCard />
                                            </div>
                                            <div className="col-6 col-md-4 col-lg-3">
                                                <ProductSkeltonCard />
                                            </div>
                                            <div className="col-6 col-md-4 col-lg-3">
                                                <ProductSkeltonCard />
                                            </div>
                                        </SkeletonTheme>
                                    </>
                                    :
                                    Product.slice(0, 8).map((item, index) => {
                                        var background1 = "https://beta.myrung.co.uk/b/public/" + item?.thumbnail_image;
                                        var cat_name = item.category_name
                                        var name = item.name
                                        var calculable_price = item.calculable_price
                                        var currency_symbol = item.currency_symbol
                                        var image = item?.thumbnail_image
                                        var wishlist_status = item.wishlist_status
                                        var productStock = item.current_stock
                                        var product_id = item.id
                                        return (
                                            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-4">
                                                <div className="product product-2">
                                                    <figure className="product-media">
                                                        <NavLink to={`/shop/product/catogeroy/fullwidth/${item.id}`} >
                                                            <img src={background1}
                                                                alt="Product image" className="product-image" />
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
                                                            }}
                                                                className="btn-product btn-cart"><span>add to cart</span></a>
                                                        </div>
                                                    </figure>
                                                    <div className="product-body">
                                                        <div className="product-cat">
                                                            <NavLink to={`/shop/product/catogeroy/${item.category_name}=${item.category_id}`}>{item.category_name}</NavLink>
                                                        </div>
                                                        <h3 className="product-title"> <NavLink to={`/shop/product/catogeroy/fullwidth/${item.id}`} >{item.name}</NavLink></h3>
                                                        <div className="product-price">
                                                            {item.currency_symbol} {item.calculable_price}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }

                            </div>
                        </div>
                    </div>
                    {catData.map((tabData, index) => {
                        let count = 0
                        return (
                            <div key={index} className="tab-pane p-0 fade" id={`new-${tabData.id}-tab`} role="tabpanel"
                                aria-labelledby={`new-${tabData.id}-link`}>
                                <div className="products">
                                    <div className="row justify-content-center">
                                        {Product.map((item, index) => {
                                            var background1 = "https://beta.myrung.co.uk/b/public/" + item?.thumbnail_image;
                                            var cat_name = item.category_name
                                            var name = item.name
                                            var calculable_price = item.calculable_price
                                            var currency_symbol = item.currency_symbol
                                            var image = item?.thumbnail_image
                                            var wishlist_status = item.wishlist_status
                                            var productStock = item.current_stock
                                            var product_id = item.id

                                            if (cat_name === tabData.name && count <= 7) {
                                                count = count + 1;
                                                return (
                                                    <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-4">
                                                        <div className="product product-2">
                                                            <figure className="product-media">
                                                                <NavLink to={`/shop/product/catogeroy/fullwidth/${item.id}`} >
                                                                    <img src={background1}
                                                                        alt="Product image" className="product-image" />
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
                                                                    }}
                                                                        className="btn-product btn-cart"><span>add to cart</span></a>
                                                                </div>
                                                            </figure>
                                                            <div className="product-body">
                                                                <div className="product-cat">
                                                                    <NavLink to={`/shop/product/catogeroy/${item.category_name}=${item.category_id}`}>{item.category_name}</NavLink>
                                                                </div>
                                                                <h3 className="product-title"><NavLink to={`/shop/product/catogeroy/fullwidth/${item.id}`}>{item.name}</NavLink></h3>
                                                                <div className="product-price">
                                                                    {item.currency_symbol}{item.calculable_price}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="more-container text-center mt-1 mb-3">
                    <NavLink to="/shop/categories" className="btn btn-outline-primary-2 btn-round btn-more">Load more</NavLink>
                </div>
            </div>
            <div onClick={hidePopup} className={"popup-overlay " + showpopup}></div>
            {showpopup === "d-block" ?
                <div id="quick_view_popup" className={showpopup}>
                    <div onClick={hidePopup} className="close-btn"><i className="icon-close"></i></div>
                    <Quickviewcontainer itemId={popId} />
                </div> : ''}
        </>
    );
}
export default NewArrivel;