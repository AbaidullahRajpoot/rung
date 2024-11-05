import React, { useState, useEffect } from "react";
import OwlCarousel from 'react-owl-carousel';
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductSkeltonCard from "./Productskeltoncard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";

const Fullwitdh = (props) => {

    const [Product, SetProduct] = useState([]);
    const [relatedProduct, SetRelatedProduct] = useState([]);
    const [reletedReview, setReletedReview] = useState([]);
    const [totalReview, setTotalReview] = useState(null);
    const [isloading, setLoading] = useState(true);
    const [actionloading, setActionloading] = useState(false);
    const [productloading, setproductloading] = useState(true);
    var [Value, setValue] = useState(1);
    const [reload, setReload] = useState(1)
    const [GalaryImag, setGalaryImag] = useState(null)

    var path = window.location.pathname;
    var splitCurUrl = path.split('/');
    const nthElementcurnt = (splitCurUrl, n = 0) => (n > 0 ? splitCurUrl.slice(n, n + 1) : splitCurUrl.slice(n))[0];
    var Page_Title_id = nthElementcurnt(splitCurUrl, -1);


    //===============================================Other Function===============================================

    const changeThumbnail = (path) => {
        setGalaryImag(path)
    }

    //===============================================Other Function===============================================

    function reloadComp() {
        setReload(reload + 1)
    }

    const inputDecrement = () => {
        if (Value > 1) {
            setValue(Value - 1);
        }
        else {
            setValue(1)
        }
    }

    const inputIncrement = (maxValie) => {
        if (Value < maxValie)
            setValue(Value + 1)
    }

    //==============================================Get Single Product Api============================

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/products/` + Page_Title_id)
            .then(res => {
                var insidData = res.data.data;
                SetProduct(insidData);
                setproductloading(false)
            })
    }, [productloading, reload])

    //==========================================Get Related Review====================================

    const getReleatedReview = async () => {

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/related/` + Page_Title_id);
        const data = await response.json();
        var insidData = data.data;
        SetRelatedProduct(insidData);
        setLoading(false)
    }
    //==========================================Get Related Product====================================

    const relatedProductApi = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/reviews/product/` + Page_Title_id);
        const data = await response.json();
        setTotalReview(data?.totalReview)
        setReletedReview(data);
        setLoading(false)
    }

    //===========================================Call Whenever Page Rendered=======================

    useEffect(() => {
        getReleatedReview()
        relatedProductApi();
    }, [])

    //=======================================Notify Function=====================================

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
    }

    const notify_add_whishlist = () => {
        toast.success("Item added into Whishlist")
    }


    //=========================================Add Wishlist Code Function=====================================

    const addWhishlistHandler = async (e) => {
        e.preventDefault()
        const user_id = await JSON.parse((localStorage.getItem('user-info')))
        const token = sessionStorage.getItem('user-info_token')
        if (user_id) {
            setActionloading(true)
            let data = { product_id: Page_Title_id, user_id }
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
            setActionloading(false)
            var Data = Result.is_in_wishlist;
            if (Data === true) {
                notify_add_whishlist()
            }
            else {
                toast.error("Something Went Wrong")
            }
        }
        else {
            notifywhish();
        }
    }

    return (
        <>
            <div className="page-content">
                {actionloading === true && <LoadingSpinner />}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-10 ">
                            <div className="product-details-top">
                                <div className="row">
                                    {<SkeletonTheme baseColor="rgb(244 244 244)" highlightColor="#fff">
                                        {productloading ?
                                            <>
                                                <div className="col-md-6">
                                                    <div className="product-gallery">
                                                        <figure className="product-main-image">
                                                            <ProductSkeltonCard />
                                                        </figure>
                                                        <div id="product-zoom-gallery" className="product-image-gallery max-col-6">
                                                            <h1><Skeleton /></h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="product-details">
                                                        <h1><Skeleton /></h1>
                                                        <div className="product-price">
                                                            <h3><Skeleton width={130} /></h3>
                                                        </div>
                                                        <div className="product-content">
                                                            <p><Skeleton /></p>
                                                        </div>
                                                        <div className="details-filter-row details-row-size">
                                                            <div className="select-custom">
                                                                <h1><Skeleton /></h1>
                                                            </div>
                                                        </div>
                                                        <div className="details-filter-row details-row-size">
                                                            <h1><Skeleton width={130} /></h1>
                                                        </div>
                                                        <div className="product-details-action">
                                                            <h1><Skeleton width={170} /></h1>
                                                            <div className="details-action-wrapper">
                                                                <h1><Skeleton width={170} /></h1>
                                                            </div>
                                                        </div>
                                                        <div className="product-details-footer">
                                                            <div className="product-cat">
                                                                <h2><Skeleton width={200} /></h2>
                                                            </div>
                                                            <div className="social-icons social-icons-sm">
                                                                <h2><Skeleton width={200} /></h2>
                                                            </div>
                                                        </div>
                                                        <div className="accordion accordion-plus d-none d-md-block product-details-accordion" id="product-accordion">
                                                            <div className="card card-box card-sm">
                                                                <div className="card-header" id="product-desc-heading">
                                                                    <h2 className="card-title">
                                                                        <h1><Skeleton width={100} /></h1>
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            Product.map((item, index) => {
                                                var galary = item.photos
                                                var name = item.name
                                                var calculable_price = item.calculable_price
                                                var currency_symbol = item.currency_symbol
                                                var image = item.thumbnail_image
                                                var product_id = item.id

                                                return (
                                                    <>
                                                        <div className="col-md-6" key={index}>
                                                            <div className="product-gallery"><figure className="product-main-image">
                                                                <span className="product-label label-sale">Sale</span>
                                                                {
                                                                    GalaryImag ?
                                                                        <img src={"https://beta.myrung.co.uk/b/public/" + GalaryImag} alt="product side" />
                                                                        :
                                                                        <img id="product-zoom" src={"https://beta.myrung.co.uk/b/public/" + item.thumbnail_image} data-zoom-image={"https://beta.myrung.co.uk/b/public/" + item.thumbnail_image} alt="product image" />
                                                                }
                                                                <a id="btn-product-gallery" className="btn-product-gallery">
                                                                    <i className="icon-arrows"></i>
                                                                </a>
                                                            </figure>
                                                                <div id="product-zoom-gallery" className="product-image-gallery max-col-6">
                                                                    {galary.map((phots, index) => {
                                                                        return (
                                                                            <>
                                                                                <a onClick={() => changeThumbnail(phots.path)} className="product-gallery-item active" data-image={"https://beta.myrung.co.uk/b/public/" + phots.path} data-zoom-image={"https://beta.myrung.co.uk/b/public/" + phots.path}>
                                                                                    <img src={"https://beta.myrung.co.uk/b/public/" + phots.path} alt="product side" />
                                                                                </a>
                                                                            </>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="product-details">
                                                                <h1 className="product-title">{item.name}</h1>
                                                                <div className="ratings-container">
                                                                    <div className="ratings">
                                                                        <div className="ratings-val" style={{ width: item.rating }}></div>
                                                                    </div>
                                                                    <a className="ratings-text" href="#product-accordion" id="review-link">( {item.rating} Reviews )</a>
                                                                </div>
                                                                <div className="product-price">
                                                                    <span className="new-price">{item.main_price}</span>
                                                                </div>
                                                                <div className="product-desc-content">
                                                                    <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                                                </div>
                                                                <div className="details-filter-row details-row-size">
                                                                    <label className="mt-0" htmlFor="size">Shop Name:</label>
                                                                    <div className="">
                                                                        {item.shop_name}
                                                                    </div>
                                                                </div>
                                                                <div className="details-filter-row details-row-size">
                                                                    <label className="mt-0" htmlFor="size">Shipping Type:</label>
                                                                    <div className="">
                                                                        {item.shipping_type}
                                                                    </div>
                                                                </div>
                                                                <div className="details-filter-row details-row-size">
                                                                    <label className="mt-0" htmlFor="size">Shipping Cost:</label>
                                                                    <div className="">
                                                                        {currency_symbol +" "+ item.shipping_cost}
                                                                    </div>
                                                                </div>
                                                                {
                                                                    item?.est_shipping_days &&
                                                                    <div className="details-filter-row details-row-size">
                                                                        <label className="mt-0" htmlFor="size">Shipping Days:</label>
                                                                        <div className="">
                                                                            {item.est_shipping_days} Days
                                                                        </div>
                                                                    </div>
                                                                }
                                                                {/* <div className="details-filter-row details-row-size">
                                                                    <label htmlFor="size">Size:</label>
                                                                    <div className="select-custom">
                                                                        <select name="size" defaultValue="#" id="size" className="form-control">
                                                                            <option value="#">Select a size</option>
                                                                            <option value="s">Small</option>
                                                                            <option value="m">Medium</option>
                                                                            <option value="l">Large</option>
                                                                            <option value="xl">Extra Large</option>
                                                                        </select>
                                                                    </div>
                                                                </div> */}
                                                                <div className="details-filter-row details-row-size mb-2">
                                                                    <label htmlFor="qty mt-0">Qty:</label>
                                                                    <div className="product-details-quantity" >
                                                                        <div className="input-group-prepend"><button onClick={inputDecrement} className="btn btn-qantity-mines btn-decrement btn-spinner" type="button">
                                                                            <i className="icon-minus"></i></button>
                                                                        </div>
                                                                        <input type="number" disabled id="quantity" value={Value} className="form-control" step="1" data-decimals="0" required />
                                                                        <div className="input-group-append">
                                                                            <button onClick={() => { inputIncrement(item.current_stock) }} className="btn btn-qantity-plus btn-increment btn-spinner" type="button">
                                                                                <i className="icon-plus"></i></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="details-filter-row details-row-size">
                                                                    <label htmlFor="color">Color:</label>
                                                                    <div className="colors-varient">
                                                                        <label className="red" >
                                                                            <input type="radio" name="color" hidden value='red' className="form-control" />
                                                                            <div></div>
                                                                        </label>
                                                                        <label className="yellow" >
                                                                            <input type="radio" name="color" hidden value='red' className="form-control" />
                                                                            <div></div>
                                                                        </label>
                                                                        <label className="green" >
                                                                            <input type="radio" name="color" hidden value='red' className="form-control" />
                                                                            <div></div>
                                                                        </label>
                                                                        <label className="blue" >
                                                                            <input type="radio" name="color" hidden value='red' className="form-control" />
                                                                            <div></div>
                                                                        </label>
                                                                    </div>
                                                                </div> */}
                                                                <div className="product-details-action">
                                                                    <a onClick={() => {
                                                                        notify()
                                                                        props.addToCartHandler({
                                                                            name: name, Price: calculable_price, symbol: currency_symbol, quantity: Value,
                                                                            product_image: image, product_id: product_id, totalprice: (Value * calculable_price)
                                                                        })
                                                                    }}
                                                                        className="btn-product btn-cart add_to_cat "><span >add to cart</span></a>
                                                                    <div className="details-action-wrapper">
                                                                        <a onClick={addWhishlistHandler} data-id={product_id} className="btn-product btn-wishlist" title="Wishlist"><span>Add to Wishlist</span></a>
                                                                    </div>
                                                                </div>
                                                                <div className="product-details-footer">
                                                                    <div className="product-cat">
                                                                        <span>Tag:</span>
                                                                        {
                                                                            item?.tags.map((tag, index) => {
                                                                                return (
                                                                                    <a href="#" key={index}>
                                                                                        {tag && `${tag},`}
                                                                                    </a>
                                                                                );
                                                                            })
                                                                        }
                                                                    </div>
                                                                    <div className="social-icons social-icons-sm">
                                                                        <span className="social-label">Share:</span>
                                                                        <a href="#" className="social-icon" title="Facebook" target="_blank"><i className="icon-facebook-f"></i></a>
                                                                        <a href="#" className="social-icon" title="Twitter" target="_blank"><i className="icon-twitter"></i></a>
                                                                        <a href="#" className="social-icon" title="Instagram" target="_blank"><i className="icon-instagram"></i></a>
                                                                        <a href="#" className="social-icon" title="Pinterest" target="_blank"><i className="icon-pinterest"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div className="accordion accordion d-none d-md-block product-details-accordion" id="product-accordion">
                                                                    <div className="card card-box card-sm">
                                                                        <div className="card-header" id="product-desc-heading">
                                                                            <h2 className="card-title">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#product-accordion-desc" aria-expanded="false" aria-controls="product-accordion-desc">
                                                                                    Description
                                                                                </a>
                                                                            </h2>
                                                                        </div>
                                                                        <div id="product-accordion-desc" className="collapse" aria-labelledby="product-desc-heading" data-parent="#product-accordion">
                                                                            <div className="card-body">
                                                                                <div className="product-desc-content">
                                                                                    <div dangerouslySetInnerHTML={{ __html: item.long_description }} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card card-box card-sm">
                                                                        <div className="card-header" id="product-info-heading">
                                                                            <h2 className="card-title">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#product-accordion-info" aria-expanded="false" aria-controls="product-accordion-info">
                                                                                    Additional Information
                                                                                </a>
                                                                            </h2>
                                                                        </div>
                                                                        <div id="product-accordion-info" className="collapse" aria-labelledby="product-info-heading" data-parent="#product-accordion">
                                                                            <div className="card-body">
                                                                                <div className="product-desc-content">
                                                                                    <div dangerouslySetInnerHTML={{ __html: item.additional_information }} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card card-box card-sm">
                                                                        <div className="card-header" id="product-shipping-heading">
                                                                            <h2 className="card-title">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#product-accordion-shipping" aria-expanded="false" aria-controls="product-accordion-shipping">
                                                                                    Shipping & Returns
                                                                                </a>
                                                                            </h2>
                                                                        </div>
                                                                        <div id="product-accordion-shipping" className="collapse" aria-labelledby="product-shipping-heading" data-parent="#product-accordion">
                                                                            <div className="card-body">
                                                                                <div className="product-desc-content">
                                                                                    <div dangerouslySetInnerHTML={{ __html: item.shipping_returns }} />

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {reletedReview?.reviews?.data && (
                                                                        <div className="card card-box card-sm">
                                                                            <div className="card-header" id="product-review-heading">
                                                                                <h2 className="card-title">
                                                                                    <a className="collapsed" role="button" data-toggle="collapse" href="#product-accordion-review" aria-expanded="false" aria-controls="product-accordion-review">
                                                                                        Reviews ({totalReview})
                                                                                    </a>
                                                                                </h2>
                                                                            </div>
                                                                            <div id="product-accordion-review" className="collapse" aria-labelledby="product-review-heading" data-parent="#product-accordion">
                                                                                <div className="card-body">
                                                                                    <div className="reviews">
                                                                                    <div className="product-desc-content">
                                                                                        {reletedReview.reviews.data.map((item, index) => (
                                                                                            <div className="review" key={index}>
                                                                                                <div className="row no-gutters">
                                                                                                    <div className="col-auto">
                                                                                                        <h4><a>{item.user_name}</a></h4>
                                                                                                        <div className="ratings-container">
                                                                                                            <div className="ratings">
                                                                                                                <div className="ratings-val" style={{ width: `${item.rating}%` }}></div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <span className="review-date">{item.time}</span>
                                                                                                    </div>
                                                                                                    <div className="col">
                                                                                                        <div className="review-content">
                                                                                                            <p>{item.comment}</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}


                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>);
                                            })}
                                    </SkeletonTheme>}
                                </div>
                            </div>
                        </div>
                        {/* <aside className="col-xl-2 col-md-6">
                            <div className="sidebar sidebar-product d-none d-md-block">
                                <div className="widget widget-products">
                                    {<SkeletonTheme baseColor="rgb(244 244 244)" highlightColor="#fff">
                                        {isloading ? <h4 className="widget-title"><Skeleton /></h4>
                                            :
                                            <h4 className="widget-title">Related Product</h4>
                                        }
                                    </SkeletonTheme>}
                                    <div className="products">
                                        {<SkeletonTheme baseColor="rgb(244 244 244)" highlightColor="#fff">
                                            {isloading ?
                                                <div className="product product-sm">
                                                    <figure >
                                                        <Skeleton width={80} height={82.25} className="product-image" />
                                                    </figure>

                                                    <div className="product-body">
                                                        <h5 className="product-title"><Skeleton /></h5>
                                                        <div className="product-price">
                                                            <span className="new-price"><Skeleton width={100} /></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                relatedProduct.map((item, index) => {
                                                    if (index <= 3) {
                                                        return (
                                                            <div className="product product-sm">
                                                                <figure className="product-media">
                                                                    <NavLink onClick={reloadComp} to={`/shop/product/catogeroy/fullwidth/${item.id}`}>
                                                                        <img src={'https://beta.myrung.co.uk/b/public/' + item.thumbnail_image} alt="Product image" className="product-image single-product-image" />
                                                                    </NavLink>
                                                                </figure>
                                                                <div className="product-body">
                                                                    <h5 className="product-title"><NavLink onClick={reloadComp} to={`/shop/product/catogeroy/fullwidth/${item.id}`}>{item.name} <br />Wide fit wedges</NavLink></h5>
                                                                    <div className="product-price">
                                                                        <span className="new-price">{item.main_price}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                })}
                                        </SkeletonTheme>
                                        }
                                    </div>
                                    {<SkeletonTheme baseColor="rgb(244 244 244)" highlightColor="#fff">
                                        {isloading ? <Skeleton width={198.16} height={61} /> :
                                            <NavLink to="/shop/categories" className="btn btn-outline-dark-3">
                                                <span>View More Products</span><i className="icon-long-arrow-right"></i></NavLink>
                                        }
                                    </SkeletonTheme>
                                    }
                                </div>
                            </div>
                            <OwlCarousel className="owl-carousel d-md-none d-block owl-theme" dots={false} items={2} loop autoPlay={true} autoplaySpeed="200" nav={false}>
                                {relatedProduct ? relatedProduct.map((item, index) => {
                                    return (
                                        <>
                                            <div>
                                                <div className="product product-sm">
                                                    <figure className="product-media">
                                                        <NavLink to=''>
                                                            <img src={'https://beta.myrung.co.uk/b/public/' + item.thumbnail_image} alt="Product image  " className="product-image mobile-product " />
                                                        </NavLink>
                                                    </figure>
                                                    <div className="product-body">
                                                        <h5 className="product-title"><NavLink to=''>{item.name}</NavLink></h5>
                                                        <div className="product-price">
                                                            <span className="new-price">{item.main_price}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })
                                    : ''}


                            </OwlCarousel>
                        </aside> */}
                        <div className="col-12 d-md-none">
                            <div className="accordion accordion-plus  product-details-accordion" id="product-accordion">
                                <div className="card card-box card-sm">
                                    <div className="card-header" id="product-desc-heading">
                                        <h2 className="card-title">
                                            <a className="collapsed" role="button" data-toggle="collapse" href="#product-accordion-desc" aria-expanded="false" aria-controls="product-accordion-desc">
                                                Description
                                            </a>
                                        </h2>
                                    </div>
                                    <div id="product-accordion-desc" className="collapse" aria-labelledby="product-desc-heading" data-parent="#product-accordion">
                                        <div className="card-body">
                                            <div className="product-desc-content">
                                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.</p>
                                                <ul>
                                                    <li>Nunc nec porttitor turpis. In eu risus enim. In vitae mollis elit. </li>
                                                    <li>Vivamus finibus vel mauris ut vehicula.</li>
                                                    <li>Nullam a magna porttitor, dictum risus nec, faucibus sapien.</li>
                                                </ul>
                                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card card-box card-sm">
                                    <div className="card-header" id="product-info-heading">
                                        <h2 className="card-title">
                                            <a className="collapsed" role="button" data-toggle="collapse" href="#product-accordion-info" aria-expanded="false" aria-controls="product-accordion-info">
                                                Additional Information
                                            </a>
                                        </h2>
                                    </div>
                                    <div id="product-accordion-info" className="collapse" aria-labelledby="product-info-heading" data-parent="#product-accordion">
                                        <div className="card-body">
                                            <div className="product-desc-content">
                                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. </p>
                                                <h3>Fabric & care</h3>
                                                <ul>
                                                    <li>100% Polyester</li>
                                                    <li>Do not iron</li>
                                                    <li>Do not wash</li>
                                                    <li>Do not bleach</li>
                                                    <li>Do not tumble dry</li>
                                                    <li>Professional dry clean only</li>
                                                </ul>

                                                <h3>Size</h3>
                                                <p>S, M, L, XL</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card card-box card-sm">
                                    <div className="card-header" id="product-shipping-heading">
                                        <h2 className="card-title">
                                            <a className="collapsed" role="button" data-toggle="collapse" href="#product-accordion-shipping" aria-expanded="false" aria-controls="product-accordion-shipping">
                                                Shipping & Returns
                                            </a>
                                        </h2>
                                    </div>
                                    <div id="product-accordion-shipping" className="collapse" aria-labelledby="product-shipping-heading" data-parent="#product-accordion">
                                        <div className="card-body">
                                            <div className="product-desc-content">
                                                <p>We deliver to over 100 countries around the world. For full details of the delivery options we offer, please view our <a href="#">Delivery information</a><br />
                                                    We hope you’ll love every purchase, but if you ever need to return an item you can do so within a month of receipt. For full details of how to make a return, please view our <a href="#">Returns information</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card card-box card-sm">
                                    <div className="card-header" id="product-review-heading">
                                        <h2 className="card-title">
                                            <a role="button" data-toggle="collapse" href="#product-accordion-review" aria-expanded="true" aria-controls="product-accordion-review">
                                                Reviews (2)
                                            </a>
                                        </h2>
                                    </div>
                                    <div id="product-accordion-review" className="collapse show" aria-labelledby="product-review-heading" data-parent="#product-accordion">
                                        <div className="card-body">
                                            <div className="reviews">
                                                <div className="review">
                                                    <div className="row no-gutters">
                                                        <div className="col-auto">
                                                            <h4><a href="#">Samanta J.</a></h4>
                                                            <div className="ratings-container">
                                                                <div className="ratings">
                                                                    <div className="ratings-val" style={{ width: "80%" }}></div>
                                                                </div>
                                                            </div>
                                                            <span className="review-date">6 days ago</span>
                                                        </div>
                                                        <div className="col">
                                                            <h4>Good, perfect size</h4>
                                                            <div className="review-content">
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus cum dolores assumenda asperiores facilis porro reprehenderit animi culpa atque blanditiis commodi perspiciatis doloremque, possimus, explicabo, autem fugit beatae quae voluptas!</p>
                                                            </div>
                                                            <div className="review-action">
                                                                <a href="#"><i className="icon-thumbs-up"></i>Helpful (2)</a>
                                                                <a href="#"><i className="icon-thumbs-down"></i>Unhelpful (0)</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="review">
                                                    <div className="row no-gutters">
                                                        <div className="col-auto">
                                                            <h4><a href="#">John Doe</a></h4>
                                                            <div className="ratings-container">
                                                                <div className="ratings">
                                                                    <div className="ratings-val" style={{ width: "100%" }}></div>
                                                                </div>
                                                            </div>
                                                            <span className="review-date">5 days ago</span>
                                                        </div>
                                                        <div className="col">
                                                            <h4>Very good</h4>
                                                            <div className="review-content">
                                                                <p>Sed, molestias, tempore? Ex dolor esse iure hic veniam laborum blanditiis laudantium iste amet. Cum non voluptate eos enim, ab cumque nam, modi, quas iure illum repellendus, blanditiis perspiciatis beatae!</p>
                                                            </div>
                                                            <div className="review-action">
                                                                <a href="#"><i className="icon-thumbs-up"></i>Helpful (0)</a>
                                                                <a href="#"><i className="icon-thumbs-down"></i>Unhelpful (0)</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Fullwitdh;