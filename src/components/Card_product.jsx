import React, { useEffect, useState, useContext } from "react";

const Related_product = () => {
    const [Product, SetProduct] = useState([]);
    const [Catagaries, SetCatagories] = useState([]);
    const getApi = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/categories`);
        const data = await response.json();
        var insidData = data.data;
        SetCatagories(insidData);
    }
    useEffect(() => {
        getApi();
    }, []);

    var linksApi;
    const getProductApi = async () => {
        const response = await fetch(linksApi);
        const data = await response.json();
        var productData = data.data;
        SetProduct(productData);
    }
    useEffect(() => {
        getProductApi();
    }, []);
    return (
        <>
            <div className="products mb-3">
                <div className="row justify-content-center">
                    {
                        Catagaries.map((item, i) => {
                            linksApi = item.links.products;
                            //apiurl
                            
                            var splitApiUrl = linksApi.split('/');
                            const nthElement = (splitApiUrl, n = 0) => (n > 0 ? splitApiUrl.slice(n, n + 1) : splitApiUrl.slice(n))[0];
                            var category_id = nthElement(splitApiUrl, -1);
                            //curnt url
                            var path = window.location.pathname;
                            var splitCurUrl = path.split('/');
                            const nthElementcurnt = (splitCurUrl, n = 0) => (n > 0 ? splitCurUrl.slice(n, n + 1) : splitCurUrl.slice(n))[0];
                            var Page_Title_id = nthElementcurnt(splitCurUrl, -1);
                            return (
                                <>
                                
                                    {Page_Title_id === category_id ? 
                                       Product.map((prod, index) => {
                                            return (
                                                <>
                                                    <div className="col-6">
                                                        <div className="product product-7 text-center">
                                                            <figure className="product-media">
                                                                <span className="product-label label-new">New</span>
                                                                <a href="product.php">
                                                                    <img src={"https://beta.myrung.co.uk/b/public/" +prod.thumbnail_image} alt="Product image" className="product-image" />
                                                                </a>
                                                                <div className="product-action-vertical">
                                                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                                                    <a href="popup/quickView.php" className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                                                                    <a href="#" className="btn-product-icon btn-compare" title="Compare"><span>Compare</span></a>
                                                                </div>
                                                                <div className="product-action">
                                                                    <a href="#" className="btn-product btn-cart"><span>add to cart</span></a>
                                                                </div>
                                                            </figure>
                                                            <div className="product-body">
                                                                <div className="product-cat">
                                                                    <a href="#">Women</a>
                                                                </div>
                                                                <h3 className="product-title"><a href="product.php">Brown paperbag waist pencil skirt</a></h3>
                                                                <div className="product-price">
                                                                    $60.00
                                                                </div>
                                                                <div className="ratings-container">
                                                                    <div className="ratings">
                                                                        <div className="ratings-val" style={{ width: "20%" }}></div>
                                                                    </div>
                                                                    <span className="ratings-text">( 2 Reviews )</span>
                                                                </div>
                                                                <div className="product-nav product-nav-thumbs">
                                                                    <a href="#" className="active">
                                                                        {/* <img src={product_thumb_4}  alt="product desc"/> */}
                                                                    </a>
                                                                    <a href="#">
                                                                        {/* <img src={product_thumb_4_2} alt="product desc"/> */}
                                                                    </a>

                                                                    <a href="#">
                                                                        {/* <img src={product_thumb_4_3} alt="product desc"/> */}
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                        
                                                </>
                                            );
                                        })
                                       : ""  }
                                       
                                </>
                            );
                        })
                    }
                    {/* <!-- End .col-sm-6 --> */}
                </div>
                {/* <!-- End .row --> */}
            </div>
        </>
    );
}
export default Related_product;
