import React from 'react';
import demo_5 from "../assets/images/demos/demo-5/bg-2.jpg";
import product_13 from "../assets/images/demos/demo-5/products/product-13.jpg";
import product_14 from "../assets/images/demos/demo-5/products/product-14.jpg";
import banner_4 from "../assets/images/demos/demo-5/banners/banner-4.jpg";
import '../assets/css/style.css';
import '../assets/css/mystyle.css';
import '../assets/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
const VideoBanner=()=>{
    return(
        <>
        <div className="video-banner video-banner-bg bg-image text-center"
                style={{backgroundImage: ` url(${demo_5})`}}>
                <div className="container">
                    <h3 className="video-banner-title h1 text-white"><span>New Collection</span><strong>Winter’19 <i>/</i>
                            Spring’20</strong></h3>
                            {/* <!-- End .video-banner-title --> */}
                    <a href="https://www.youtube.com/watch?v=vBPgmASQ1A0" className="btn-video btn-iframe"><i
                            className="icon-play"></i></a>
                </div>
                {/* <!-- End .container --> */}
            </div>
          {/* <!-- End .video-banner bg-image --> */}
          <div className="pt-6 pb-6" style={{backgroundColor:" var(--white-color)"}}>
                <div className="container">
                    <div className="banner-set">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="banner-set-content text-center">
                                    <div className="set-content-wrapper">
                                        <h4>Special</h4>
                                        <h2>Refine Your Style.</h2>

                                        <p>Get on our exclusive email list and be the first to hear about sales,
                                            coupons, new arrivals and more! </p>

                                        <div className="banner-set-products">
                                            <div className="row">
                                                <div className="products">
                                                    <div className="col-6">
                                                        <div className="product product-2 text-center">
                                                            <figure className="product-media small-product">
                                                                <NavLink to=''>
                                                                    <img src={product_13}
                                                                        alt="Product image" className="product-image"/>
                                                                </NavLink>
                                                            </figure>
                                                            {/* <!-- End .product-media --> */}

                                                            <div className="product-body">
                                                                <h3 className="product-title"><a
                                                                        >Rib-knit cardigan</a></h3>
                                                                {/* <!-- End .product-title --> */}
                                                                <div className="product-price">
                                                                    $24.99
                                                                </div>
                                                                {/* <!-- End .product-price --> */}
                                                            </div>
                                                            {/* <!-- End .product-body --> */}
                                                        </div>
                                                        {/* <!-- End .product --> */}
                                                    </div>
                                                    {/* <!-- End .col-sm-6 --> */}

                                                    <div className="col-6">
                                                        <div className="product product-2 text-center">
                                                            <figure className="product-media small-product">
                                                                <NavLink to='' >
                                                                    <img src={product_14} alt="Product image"
                                                                     className="product-image"/>
                                                                </NavLink>
                                                            </figure>
                                                            {/* <!-- End .product-media --> */}

                                                            <div className="product-body">
                                                                <h3 className="product-title"><a
                                                                        >Linen-blend trousers</a>
                                                                </h3>
                                                                {/* <!-- End .product-title --> */}
                                                                <div className="product-price">
                                                                    $19.99
                                                                </div>
                                                                {/* <!-- End .product-price --> */}
                                                            </div>
                                                            {/* <!-- End .product-body --> */}
                                                        </div>
                                                        {/* <!-- End .product --> */}
                                                    </div>
                                                    {/* <!-- End .col-sm-6 --> */}
                                                </div>
                                            </div>
                                            {/* <!-- End .row --> */}
                                        </div>
                                        {/* <!-- End .banner-set-products --> */}
                                    </div>
                                    {/* <!-- End .set-content-wrapper --> */}
                                </div>
                                {/* <!-- End .banner-set-content --> */}
                            </div>
                            {/* <!-- End .col-lg-6 --> */}
                            <div className="col-lg-6">
                                <div className="banner-set-image banner-border-hover">
                                    <NavLink to=''>
                                        <img src={banner_4} alt="banner"/>
                                    </NavLink>
                                    <div className="banner-content">
                                        <h3 className="banner-title"><a href="#"><span>Casual basics and<br/>trendy key
                                                    pieces.</span></a></h3>
                                                    {/* <!-- End .banner-title --> */}
                                        <h4 className="banner-subtitle">in this look</h4>
                                        {/* <!-- End .banner-subtitle --> */}
                                        <h4 className="banner-detail">• Rib-knit cardigan <br/>• Linen-blend paper bag
                                            trousers</h4>
                                        <h4 className="banner-price">$19.99 - $48.00</h4>
                                        <NavLink to='/shop/categories' className="btn btn-outline-primary-2 banner-link">buy all</NavLink>
                                    </div>
                                    {/* <!-- End .banner-content --> */}
                                </div>
                                {/* <!-- End .banner-set-image --> */}
                            </div>
                            {/* <!-- End .col-lg-6 --> */}
                        </div>
                        {/* <!-- End .row --> */}
                    </div>
                    {/* <!-- End .banner-set --> */}
                </div>
                {/* <!-- End .container --> */}
            </div>
            {/* <!-- End .bg-lighter pt6 pb-6 --> */}
            
            </>
    );
}
export default VideoBanner;