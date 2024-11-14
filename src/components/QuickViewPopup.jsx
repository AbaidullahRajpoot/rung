import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from './LoadingSpinner';


const QuickViewPopup = (props) => {

    const [Product, SetProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null)
    const [user_id, setUser_id] = useState(null)
    const [Value, setValue] = useState(1);
    const [reload, setReload] = useState(1)

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
    const inputIncrement = () => {
        if (Value < 10)
            setValue(Value + 1)
    }

    const getProductApi = async () => {
        var fullwidthapilink = `${process.env.REACT_APP_BASE_URL}/products/` + props.itemId;
        const response = await fetch(fullwidthapilink);
        const data = await response.json();
        var productData = data.data;
        if (productData) {
            SetProduct(productData);
        }
        setLoading(false)
    }

    useEffect(() => {
        getProductApi();
    }, [props.itemId])

    const notifyitem = () => {
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

    const addWhishlistHandler = async (e) => {
        if (token != null) {
            setLoading(true)
            let data = { product_id: props.itemId, user_id }
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
            setLoading(false)
            if (Data === true) {
                notify_add_whishlist();
            }
        }
        else {
            notifywhish()
        }
    }

    return (
        <>
            {
                loading === true ?
                    <div className="quickViewBox">
                        <LoadingSpinner />
                    </div>
                    :
                    <div className="page-content pb-0" >
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xl-12 ">
                                    <div className="product-details-top">
                                        <div className="row">
                                            {Product.map((item, index) => {
                                                var name = item.name
                                                var calculable_price = item.calculable_price
                                                var currency_symbol = item.currency_symbol
                                                var image = item.thumbnail_image
                                                var product_id = item.id
                                                var product_price = item.main_price
                                                console.log(item)
                                                return (
                                                    <> 
                                                        <div className="col-md-6" key={index}>
                                                            <div className="product-gallery">

                                                                <figure className="product-main-image">
                                                                    {item.current_stock <= 0 && <span className="product-label label-sale">Out of stock</span>}
                                                                    <img id="product-zoom" src={"https://beta.myrung.co.uk/b/public/" + item.thumbnail_image} data-zoom-image={"https://beta.myrung.co.uk/b/public/" + item.thumbnail_image} alt="product image" />

                                                                    {/* <a href="#" id="btn-product-gallery" className="btn-product-gallery">
                                                                        <i className="icon-arrows"></i>
                                                                    </a> */}
                                                                </figure>
                                                                <div id="product-zoom-gallery" className="product-image-gallery max-col-6">
                                                                    <a className="product-gallery-item active" href="#" data-image={"https://beta.myrung.co.uk/b/public/" + item.thumbnail_image} data-zoom-image="assets/images/products/single/fullwidth/1-big.jpg">
                                                                        <img src={"https://beta.myrung.co.uk/b/public/" + item.thumbnail_image} alt="product side" />
                                                                    </a>
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
                                                                    <label htmlFor="qty">Quantity:</label>
                                                                    <div className="product-details-quantity" >
                                                                        <div className="input-group-prepend"><button onClick={inputDecrement} className="btn btn-qantity-mines btn-decrement btn-spinner" type="button">
                                                                            <i className="icon-minus"></i></button>
                                                                        </div>
                                                                        <input type="number" disabled id="quantity" value={Value} className="form-control" min="1" max="10" step="1" data-decimals="0" required />
                                                                        <div className="input-group-append">
                                                                            <button onClick={inputIncrement} className="btn btn-qantity-plus btn-increment btn-spinner" type="button">
                                                                                <i className="icon-plus"></i></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="product-details-action">
                                                                    <a onClick={() => {
                                                                         if (item.current_stock <= 0) {
                                                                            toast.error("Out of stock");
                                                                        } 
                                                                        else{
                                                                            props.addToCartHandler({
                                                                                name: name, Price: calculable_price, symbol: currency_symbol, quantity: Value,
                                                                                product_image: image, product_id: product_id, totalprice: (Value * calculable_price),
                                                                            }); notifyitem()
                                                                        }
                                                                      
                                                                    }}
                                                                        className="btn-product btn-cart add_to_cat "><span >add to cart</span></a>
                                                                    <div className="details-action-wrapper ">
                                                                        <a onClick={addWhishlistHandler} data-id={product_id} className="btn-product btn-wishlist margin-10" title="Wishlist"><span>Add to Wishlist</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }


        </>
    );
}
export default QuickViewPopup;