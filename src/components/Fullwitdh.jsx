import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductSkeltonCard from "./Productskeltoncard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";

const Fullwitdh = (props) => {

    const [Product, SetProduct] = useState([]);
    const [relatedProduct, SetRelatedProduct] = useState([]);
    const [activeProduct, SetactiveProduct] = useState(0);
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
                console.log(insidData)
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

    //============================================================Swipe Prodct Code===========================================



    return (
        <>
            <div className="page-content">
                {actionloading === true && <LoadingSpinner />}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-10 ">
                            <div className="product-details-top">
                                <div className="row">
                                    <SkeletonTheme>
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

                                                            <h1><Skeleton /></h1>

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
                                                                    <div className="card-title">
                                                                        <h1><Skeleton width={100} /></h1>
                                                                    </div>
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
                                                var productStock = item.current_stock
                                                var product_id = item.id

                                                return (
                                                    <React.Fragment key={index}>
                                                        <div className="col-md-6" >
                                                            <div className="product-gallery">
                                                                <div id="productImagesSlider" className="carousel slide" data-ride="carousel">

                                                                    <div className="carousel-inner">
                                                                        {galary.map((phots, index) => {
                                                                            return (
                                                                                <div key={index} className={`carousel-item  ${index === 0 ? "active" : ""}`}>
                                                                                    {item.current_stock <= 0 && <span className="product-label label-sale">Out of stock</span>}
                                                                                    {item.current_stock > 0 && item.discount_in_percentage > 0 && <span className="product-label label-discount">{item.discount_in_percentage}% OFF</span>}
                                                                                    <img className="product-slider-img" src={"https://beta.myrung.co.uk/b/public/" + phots.path} alt="product side" />
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                    <button className="carousel-control-prev" type="button" data-target="#productImagesSlider" data-slide="prev">
                                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                                        <span className="sr-only">Previous</span>
                                                                    </button>
                                                                    <button className="carousel-control-next" type="button" data-target="#productImagesSlider" data-slide="next">
                                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                                        <span className="sr-only">Next</span>
                                                                    </button>
                                                                </div>

                                                                <ol className="carousel-indicators">
                                                                    {galary.map((phots, index) => {
                                                                        return (
                                                                            <li onClick={() => { SetactiveProduct(index) }} key={index} data-target="#productImagesSlider" data-slide-to={index} className={`${activeProduct === index ? "active" : ""}`}>
                                                                                <img className="product-slider-img" src={"https://beta.myrung.co.uk/b/public/" + phots.path} alt="product side" />
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ol>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="product-details">
                                                                <h1 className="product-title">{item.name}</h1>
                                                                <div className="ratings-container">
                                                                    <div className="ratings">
                                                                        <div className="ratings-val" style={{ width: parseInt(item.rating) * 20 + "%" }}></div>
                                                                    </div>
                                                                    <a className="ratings-text" href="#product-accordion" id="review-link">( {item.rating} Reviews )</a>
                                                                </div>
                                                                <div className="product-price">
                                                                    <span className="new-price">{item.main_price}</span>
                                                                </div>
                                                                <div className="product-desc-content">
                                                                    <div className="product-desc" dangerouslySetInnerHTML={{ __html: item.description }} />
                                                                </div>
                                                                <div className="details-filter-row details-row-size mb-2">
                                                                    <label htmlFor="qty mt-0">Quantity:</label>
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

                                                                <div className="product-details-action">
                                                                    <a onClick={() => {
                                                                        if (productStock <= 0) {
                                                                            toast.error("Out of stock")
                                                                        }
                                                                        else if ((productStock > 0)) {

                                                                            props.addToCartHandler({
                                                                                name: name, Price: calculable_price, symbol: currency_symbol, quantity: Value,
                                                                                product_image: image, product_id: product_id, totalprice: (Value * calculable_price)
                                                                            })
                                                                            notify()
                                                                        }

                                                                    }}
                                                                        className="btn-product btn-cart add_to_cat "><span >add to cart</span></a>
                                                                    <div className="details-action-wrapper">
                                                                        <a onClick={addWhishlistHandler} data-id={product_id} className="btn-product btn-wishlist margin-10 " title="Wishlist"><span>Add to Wishlist</span></a>
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
                                                                                    <div className="review">
                                                                                        {reletedReview.reviews.data.map((item, index) => {
                                                                                            return (
                                                                                                <div key={index} className="row no-gutters">
                                                                                                    <div className="col-auto">
                                                                                                        <h4><a href="#">{item.user_name}</a></h4>
                                                                                                        <div className="ratings-container">
                                                                                                            <div className="ratings">
                                                                                                                <div className="ratings-val" style={{ width: parseInt(item.rating) * 20 + "%" }}></div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <span className="review-date">{item.time}</span>
                                                                                                    </div>
                                                                                                    <div className="col">
                                                                                                        <h4>This product is good</h4>
                                                                                                        <div className="review-content">
                                                                                                            <p>{item.comment}</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            )
                                                                                        })}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>);
                                            })}
                                    </SkeletonTheme>
                                </div>
                            </div>
                        </div>
                        {Product.map((item, index) => {
                            return (
                                <div className="col-12 d-md-none" key={index}>
                                    <div className="accordion accordion-plus  product-details-accordion" id={`product-accordion-${index}`}>
                                        <div className="card card-box card-sm">
                                            <div className="card-header" id={`product-desc-heading-${index}`}>
                                                <h2 className="card-title">
                                                    <a className="collapsed collapsed-heading" role="button" data-toggle="collapse" href={`#product-accordion-desc-${index}`} aria-expanded="false" aria-controls={`product-accordion-desc-${index}`}>
                                                        Description
                                                    </a>
                                                </h2>
                                            </div>
                                            <div id={`product-accordion-desc-${index}`} className="collapse" aria-labelledby={`product-desc-heading-${index}`} data-parent={`#product-accordion-${index}`}>
                                                <div className="card-body">
                                                    <div className="product-desc-content">
                                                        <div className="product-desc" dangerouslySetInnerHTML={{ __html: item.long_description }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card card-box card-sm">
                                            <div className="card-header" id={`product-info-heading-${index}`}>
                                                <h2 className="card-title">
                                                    <a className="collapsed collapsed-heading" role="button" data-toggle="collapse" href={`#product-accordion-info-${index}`} aria-expanded="false" aria-controls={`product-accordion-info-${index}`}>
                                                        Additional Information
                                                    </a>
                                                </h2>
                                            </div>
                                            <div id={`product-accordion-info-${index}`} className="collapse" aria-labelledby={`product-info-heading-${index}`} data-parent={`#product-accordion-${index}`}>
                                                <div className="card-body">
                                                    <div className="product-desc-content">
                                                        <div className="product-desc" dangerouslySetInnerHTML={{ __html: item.additional_information }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card card-box card-sm">
                                            <div className="card-header" id={`product-shipping-heading-${index}`}>
                                                <h2 className="card-title">
                                                    <a className="collapsed collapsed-heading" role="button" data-toggle="collapse" href={`#product-accordion-shipping-${index}`} aria-expanded="false" aria-controls={`product-accordion-shipping-${index}`}>
                                                        Shipping & Returns
                                                    </a>
                                                </h2>
                                            </div>
                                            <div id={`product-accordion-shipping-${index}`} className="collapse" aria-labelledby={`product-shipping-heading-${index}`} data-parent={`#product-accordion-${index}`}>
                                                <div className="card-body">
                                                    <div className="product-desc-content">
                                                        <div className="product-desc" dangerouslySetInnerHTML={{ __html: item.shipping_returns }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {reletedReview?.reviews?.data && (
                                            <div className="card card-box card-sm">
                                                <div className="card-header" id="product-review-heading">
                                                    <h2 className="card-title">
                                                        <a className="collapsed collapsed-heading" role="button" data-toggle="collapse" href="#product-accordion-review" aria-expanded="false" aria-controls="product-accordion-review">
                                                            Reviews ({totalReview})
                                                        </a>
                                                    </h2>
                                                </div>
                                                <div id="product-accordion-review" className="collapse" aria-labelledby="product-review-heading" data-parent="#product-accordion">
                                                    <div className="card-body">
                                                        <div className="reviews">
                                                            <div className="product-desc-content">
                                                                {reletedReview.reviews.data.map((item, index) => {
                                                                    return (
                                                                        <div key={index} className="row no-gutters">
                                                                            <div className="col-12">
                                                                                <a>{item.user_name}</a>
                                                                                <div className="ratings-container">
                                                                                    <div className="ratings">
                                                                                        <div className="ratings-val" style={{ width: `${item.rating}%` }}></div>
                                                                                    </div>
                                                                                </div>
                                                                                <span className="review-date">{item.time}</span>
                                                                            </div>
                                                                            <div className="col-12 mt-1">
                                                                                <p className="review-heading">This product is good</p>
                                                                                <div className="review-content">
                                                                                    <p>{item.comment}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    );
}
export default Fullwitdh;