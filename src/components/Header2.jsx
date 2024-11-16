import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import finel_logo from '../assets/images/runglogo.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const Header2 = (props) => {

    const [scroll, setScroll] = useState("")
    const [isloading, setLoading] = useState(true);
    const [Catagaries, SetCatagories] = useState([]);
    const [wishlistcount, setWishlistcount] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [show, setShow] = useState(false);

    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const [searchValue, setsearchValue] = useState()

    const [hiddenmenu, setHiddenmenu] = useState(false)
    const navigate = useNavigate();
    const notify = () => toast.success("Succesfully Deleted from cart");
    var token;
    var data = props.data.cardData;

    //=============================================Sticky Header Code=========================================

    useEffect(() => {
        document.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                setScroll("fixed")
            }
            else {
                setScroll("")
            }
        })
    }, [scroll])

    //==============================================Get All Categories============================================

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/categories`)
            .then(res => {
                var insidData = res.data.data;
                SetCatagories(insidData);
                setLoading(false)
            })
    }, [])

    //========================================Get Wishish Data==============================

    useEffect(() => {
        const ShowWhishlist = async () => {
            const user_id = await JSON.parse((localStorage.getItem('user-info')))
            const data = await JSON.parse((sessionStorage.getItem('user-info_token')))
            if (data) {
                const data = { user_id }
                let Result = await fetch(`${process.env.REACT_APP_BASE_URL}/wishlists-list`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                Result = await Result.json()
                var Data = Result;
                if (Data) {
                    setWishlistcount(Data?.total_count)
                }
            }
        }
        ShowWhishlist();
    }, []);

    //===================================Toast Function==========================================

    const notifynotLogin = () => {

        toast.error("Please Login first")
    }

    //=====================================================Get User Personal Info=======================

    const getData = async () => {
        const data = await JSON.parse((sessionStorage.getItem('user-info_token')))
        token = data
    }
    useEffect(() => {
        getData()
    }, [getData])

    //=========================================Navigate to wishlistScreen if login=================================

    const WhishlistHandler = () => {
        if (token) {
            navigate('/whishlist')
        }
        else {
            notifynotLogin();
        }
    }


    //=======================================Other Function=========================================

    const toggleSearch = (e) => {
        e.preventDefault()
        if (searchValue.length > 0) {
            navigate(
                "/search",
                { state: { searchValue } })
        }
    }
    const searchHandle = (e) => {
        let key = e.target.value
        setsearchValue(key)
    }

    return (
        <>
            <header className="header">
                <div className={"header-middle sticky-header " + scroll}>
                    <div className="container-fluid">
                        <div className="header-first-left">
                            <button onClick={() => setHiddenmenu(!hiddenmenu)} className="mobile-menu-toggler">
                                <span className="sr-only">Toggle mobile menu</span>
                                <i className="icon-bars"></i>
                            </button>
                            <div onClick={() => { show === true ? setShow(false) : setShow(true) }}>
                                <a className="search-toggle search-toggle-mobile"><i className="icon-search"></i></a>
                            </div>
                        </div>
                        <div className="header-left">
                            <NavLink to='/' className="logo">
                                {/* <img src={finel_logo} alt="Rung Logo" width="150" height="auto" /> */}
                                <LazyLoadImage
                                    alt={"Rung Logo"}
                                    effect="blur"
                                    src={finel_logo}
                                    height={"auto"}
                                    width={150} />
                            </NavLink>
                            <nav className="main-nav">
                                <ul className="menu sf-arrows">
                                    <li className={splitLocation[1] === "" ? "active" : ""}>
                                        <NavLink to="/">Home</NavLink>
                                    </li>
                                    <li>
                                        <a className="sf-with-ul">Our Collection</a>
                                        <ul>
                                            <li><NavLink to={`/shop/categories`}>All</NavLink></li>
                                            {Catagaries?.map((category, index) => (
                                                <li key={index}> <NavLink to={`/shop/product/catogeroy/${category.name}=${category.id}`}>
                                                    {category.name}
                                                </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    {/* <li >
                                        <div className="menudropdown">
                                            <a className={splitLocation[1] === "shop" ? "primary" : ""}> Our Collection</a>
                                            <div className="menudropdown-menu">
                                                <NavLink to={`/shop/categories`}>
                                                    All
                                                </NavLink>
                                                {Catagaries?.map((category, index) => (
                                                    <NavLink key={index} to={`/shop/product/catogeroy/${category.name}=${category.id}`}>
                                                        {category.name}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
                                    </li> */}
                                    <li className={splitLocation[1] === "about" ? "active" : ""}>
                                        <NavLink to="/about">About Us</NavLink>
                                    </li>
                                    <li className={splitLocation[1] === "contact" ? "active" : ""}>
                                        <NavLink to="/contact">Contact Us</NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="header-right">
                            <div className="header-search">
                                <span onClick={toggleSearch}>
                                    <a className="search-toggle active" role="button" title="Search"><i className="icon-search"></i></a>
                                </span>
                                <form action="#" method="get" onSubmit={toggleSearch}>
                                    <div className="header-search-wrapper show" >
                                        <label htmlFor="q" className="sr-only">Search</label>
                                        <input type="search" className="form-control" name="q" id="searchBar" placeholder="Search in..." maxLength={250} onChange={searchHandle} value={searchValue} required />
                                    </div>
                                </form>
                            </div>
                            <div className="wishlist-div">
                                <a style={{ cursor: "pointer" }} onClick={WhishlistHandler} className="wishlist-link">
                                    <i className="icon-heart-o"></i>
                                </a>
                                {wishlistcount > 0 && <span className="wishlist-count">{wishlistcount}</span>}
                            </div>
                            <div className="dropdown cart-dropdown">
                                <a href="#" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                    <i className="icon-shopping-cart"></i>
                                    <span className="cart-count">{data.length}</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <div className="dropdown-cart-products">
                                        {data.map((item, index) => {
                                            return (
                                                <div key={index} className="product">
                                                    <div className="product-cart">
                                                        <h4 className="product-title">
                                                            <NavLink to={`/shop/product/catogeroy/fullwidth/${item.product_id}`} >
                                                                {item.name}</NavLink>
                                                        </h4>

                                                        <span className="cart-product-info">
                                                            <span className="cart-product-qty">{item.quantity}</span>
                                                            x {item.symbol} {item.Price}
                                                        </span>
                                                    </div>
                                                    <figure className="product-image-container">
                                                        <NavLink to={`/shop/product/catogeroy/fullwidth/${item.product_id}`} >
                                                            <img src={'https://beta.myrung.co.uk/b/public/' + item.product_image} alt="product" />
                                                        </NavLink>
                                                    </figure>
                                                    <a onClick={() => props.removeToCartHandler({ item })} className="btn-remove" title="Remove Product"><i onClick={notify} className="icon-close"></i></a>
                                                </div>

                                            );
                                        })}
                                    </div>
                                    <div className="dropdown-cart-total">
                                        <span>Total</span>
                                        {/* <span className="cart-total-price">{data && data.length > 0 && data[0].symbol + " " + data.reduce((total, item) => (total + (item.totalprice ? item.totalprice : item.Price), 0)).toFixed(2)}</span> */}
                                        <span className="cart-total-price">
                                            {data && data.length > 0 && `${data[0].symbol} ${data.reduce((total, item) => total + (item.totalprice ? item.totalprice : item.Price), 0).toFixed(2)}`}
                                        </span>

                                    </div>
                                    <div className="dropdown-cart-action">
                                        <NavLink to="/cart" className="btn btn-primary">View Cart</NavLink>
                                        <NavLink to='/checkout' className="btn btn-outline-primary-2"><span>Checkout</span><i className="icon-long-arrow-right"></i></NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="desktop-btn">
                                {
                                    sessionStorage.getItem('user-info_token') ?
                                        <NavLink className="headerbtn" to="/dashboard">Dashboard</NavLink>
                                        :
                                        <NavLink className="headerbtn" to="/login">Login</NavLink>
                                }
                            </div>
                            <div className="mobile-btn">
                                {
                                    sessionStorage.getItem('user-info_token') ?
                                        <NavLink to="/login"><i className="icon-user"></i></NavLink>
                                        :
                                        <NavLink to="/login"><i className="icon-user"></i></NavLink>
                                }
                            </div>
                        </div>
                    </div>
                    {
                        show &&
                        <form action="#" method="get" onSubmit={toggleSearch} className="mobile-search">
                            <label htmlFor="mobile-search" className="sr-only">Search</label>
                            <input onChange={searchHandle} value={searchValue} type="search" className="form-control" name="mobile-search" id="mobile-search"
                                placeholder="Search in..." required />
                            <button className="btn btn-primary"> <i className="icon-search"></i>
                            </button>
                        </form>
                    }
                </div>
            </header>
            <div className="mobile-menu-overlay"></div>
            <div className={(hiddenmenu ? "hidden" : "") + " mobile-menu-container mobile-menu-light"}>
                <div className=" mobile-menu-wrapper">
                    <span onClick={() => setHiddenmenu(!hiddenmenu)} className="mobile-menu-close"> <i className="icon-close"></i></span>
                    <NavLink to='/' className="logo mt-0 ml-4 mb-2">
                        {/* <img src={finel_logo} alt="Rung Logo" width="100" height="auto" /> */}
                        <LazyLoadImage
                            alt={"Rung Logo"}
                            effect="blur"
                            src={finel_logo}
                            height={"auto"}
                            width={100} />
                    </NavLink>
                    <nav className="mobile-nav">
                        <ul className="mobile-menu">
                            <li className={splitLocation[1] === "" ? "active" : ""}>
                                <NavLink to='/'>Home</NavLink>
                            </li>
                            <li className={splitLocation[1] === "shop" ? "active" : ""}>
                                <a style={{ cursor: "pointer" }} onClick={() => isDropdownOpen == true ? setIsDropdownOpen(false) : setIsDropdownOpen(true)}> Our Collection <i className={isDropdownOpen === false ? "icon-angle-right" : "icon-angle-down"}></i></a>
                            </li>
                            {
                                isDropdownOpen &&
                                <li>
                                    <NavLink
                                        to={`/shop/categories`}
                                    >
                                        All
                                    </NavLink>
                                </li>
                            }
                            {isDropdownOpen && (
                                Catagaries.map((category, index) => (
                                    <li key={index}>
                                        <NavLink
                                            to={`/shop/product/catogeroy/${category.name}=${category.id}`}
                                        >
                                            {category.name}
                                        </NavLink>
                                    </li>
                                ))

                            )}
                            {sessionStorage.getItem('user-info_token') &&
                                <li className={splitLocation[1] === "whishlist" ? "active" : ""}>
                                    <NavLink to='/whishlist'>Whishlist</NavLink>
                                </li>}
                            <li className={splitLocation[1] === "contact" ? "active" : ""}>
                                <NavLink to='/contact'>Contact Us</NavLink>
                            </li>
                            <li className={splitLocation[1] === "about" ? "active" : ""}>
                                <NavLink to='/about'>About Us</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}
export default Header2;