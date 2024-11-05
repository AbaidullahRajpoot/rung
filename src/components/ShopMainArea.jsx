import React from "react";
import product_4 from "../assets/images/products/product-4.jpg" ;
import product_5 from "../assets/images/products/product-5.jpg" ;
import product_6 from "../assets/images/products/product-6.jpg" ;
import product_7 from "../assets/images/products/product-7.jpg" ;
import product_8 from "../assets/images/products/product-8.jpg" ;
import product_9 from "../assets/images/products/product-9.jpg" ;
import product_thumb_4 from "../assets/images/products/product-4-thumb.jpg";
import product_thumb_4_2 from "../assets/images/products/product-4-2-thumb.jpg";
import product_thumb_4_3 from "../assets/images/products/product-4-3-thumb.jpg";
import product_thumb_5 from "../assets/images/products/product-5-thumb.jpg";
import product_thumb_5_2 from "../assets/images/products/product-5-2-thumb.jpg";
import product_thumb_8 from "../assets/images/products/product-8-thumb.jpg";
import product_thumb_8_2 from "../assets/images/products/product-8-2-thumb.jpg";
import product_thumb_9 from "../assets/images/products/product-9-thumb.jpg";
import product_thumb_9_2 from "../assets/images/products/product-9-2-thumb.jpg";
import product_thumb_9_3 from "../assets/images/products/product-9-3-thumb.jpg";
// import page_header from '../assets/images/page-header-bg.jpg'

const ShopMainArea=()=>{
    return(
        <>
             <main className="main">
        
            {/* <!-- End .breadcrumb-nav --> */}

            <div className="page-content">
                <div className="container">
                	<div className="row">
                		<div className="col-lg-9">
                			<div className="toolbox">
                				<div className="toolbox-left">
                					<div className="toolbox-info">
                						Showing <span>9 of 56</span> Products
                					</div>
                                    {/* <!-- End .toolbox-info --> */}
                				</div>
                                {/* <!-- End .toolbox-left --> */}

                				<div className="toolbox-right">
                					<div className="toolbox-sort">
                						<label htmlFor="sortby">Sort by:</label>
                						<div className="select-custom">
											<select name="sortby" defaultValue="rating" id="sortby" className="form-control">
												<option value="popularity" >Most Popular</option>
												<option value="rating">Most Rated</option>
												<option value="date">Date</option>
											</select>
										</div>
                					</div>
                                    {/* <!-- End .toolbox-sort --> */}
                					<div className="toolbox-layout">
                						<a href="category-list.html" className="btn-layout">
                							<svg width="16" height="10">
                								<rect x="0" y="0" width="4" height="4" />
                								<rect x="6" y="0" width="10" height="4" />
                								<rect x="0" y="6" width="4" height="4" />
                								<rect x="6" y="6" width="10" height="4" />
                							</svg>
                						</a>

                						<a href="category-2cols.html" className="btn-layout active">
                							<svg width="10" height="10">
                								<rect x="0" y="0" width="4" height="4" />
                								<rect x="6" y="0" width="4" height="4" />
                								<rect x="0" y="6" width="4" height="4" />
                								<rect x="6" y="6" width="4" height="4" />
                							</svg>
                						</a>

                						<a href="category.html" className="btn-layout">
                							<svg width="16" height="10">
                								<rect x="0" y="0" width="4" height="4" />
                								<rect x="6" y="0" width="4" height="4" />
                								<rect x="12" y="0" width="4" height="4" />
                								<rect x="0" y="6" width="4" height="4" />
                								<rect x="6" y="6" width="4" height="4" />
                								<rect x="12" y="6" width="4" height="4" />
                							</svg>
                						</a>

                						<a href="category-4cols.html" className="btn-layout">
                							<svg width="22" height="10">
                								<rect x="0" y="0" width="4" height="4" />
                								<rect x="6" y="0" width="4" height="4" />
                								<rect x="12" y="0" width="4" height="4" />
                								<rect x="18" y="0" width="4" height="4" />
                								<rect x="0" y="6" width="4" height="4" />
                								<rect x="6" y="6" width="4" height="4" />
                								<rect x="12" y="6" width="4" height="4" />
                								<rect x="18" y="6" width="4" height="4" />
                							</svg>
                						</a>
                					</div>
                                    {/* <!-- End .toolbox-layout --> */}
                				</div>
                                {/* <!-- End .toolbox-right --> */}
                			</div>
                            {/* <!-- End .toolbox --> */}
							<div className="products mb-3">
                                <div className="row justify-content-center">
                                    <div className="col-6">
                                        <div className="product product-7 text-center">
                                            <figure className="product-media">
                                                <span className="product-label label-new">New</span>
                                                <a href="product.php">
                                                    <img src={product_4} alt="Product image" className="product-image"/>
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                                    <a href="popup/quickView.php" className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                                                    <a href="#" className="btn-product-icon btn-compare" title="Compare"><span>Compare</span></a>
                                                </div>
												{/* <!-- End .product-action-vertical --> */}

                                                <div className="product-action">
                                                    <a href="#" className="btn-product btn-cart"><span>add to cart</span></a>
                                                </div>
												{/* <!-- End .product-action --> */}
                                            </figure>
											{/* <!-- End .product-media --> */}

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="#">Women</a>
                                                </div>
												{/* <!-- End .product-cat --> */}
                                                <h3 className="product-title"><a href="product.php">Brown paperbag waist pencil skirt</a></h3>
												{/* <!-- End .product-title --> */}
                                                <div className="product-price">
                                                    $60.00
                                                </div>
												{/* <!-- End .product-price --> */}
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{width: "20%"}}></div>
														{/* <!-- End .ratings-val --> */}
                                                    </div>
													{/* <!-- End .ratings --> */}
                                                    <span className="ratings-text">( 2 Reviews )</span>
                                                </div>
												{/* <!-- End .rating-container --> */}

                                                <div className="product-nav product-nav-thumbs">
                                                    <a href="#" className="active">
                                                        <img src={product_thumb_4}  alt="product desc"/>
                                                    </a>
                                                    <a href="#">
                                                        <img src={product_thumb_4_2} alt="product desc"/>
                                                    </a>

                                                    <a href="#">
                                                        <img src={product_thumb_4_3} alt="product desc"/>
                                                    </a>
                                                </div>
												{/* <!-- End .product-nav --> */}
                                            </div>
											{/* <!-- End .product-body --> */}
                                        </div>
										{/* <!-- End .product --> */}
                                    </div>
									{/* <!-- End .col-sm-6 --> */}

                                    <div className="col-6">
                                        <div className="product product-7 text-center">
                                            <figure className="product-media">
                                                <a href="product.php">
                                                    <img src={product_5} alt="Product image" className="product-image"/>
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                                    <a href="popup/quickView.php" className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                                                    <a href="#" className="btn-product-icon btn-compare" title="Compare"><span>Compare</span></a>
                                                </div>
												{/* <!-- End .product-action-vertical --> */}

                                                <div className="product-action">
                                                    <a href="#" className="btn-product btn-cart"><span>add to cart</span></a>
                                                </div>
												{/* <!-- End .product-action --> */}
                                            </figure>
											{/* <!-- End .product-media --> */}

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="#">Dresses</a>
                                                </div>
												{/* <!-- End .product-cat --> */}
                                                <h3 className="product-title"><a href="product.php">Dark yellow lace cut out swing dress</a></h3>
												{/* <!-- End .product-title --> */}
                                                <div className="product-price">
                                                    $84.00
                                                </div>
												{/* <!-- End .product-price --> */}
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{width: "0%"}}></div>
														{/* <!-- End .ratings-val --> */}
                                                    </div>
													{/* <!-- End .ratings --> */}
                                                    <span className="ratings-text">( 0 Reviews )</span>
                                                </div>
												{/* <!-- End .rating-container --> */}

                                                <div className="product-nav product-nav-thumbs">
                                                    <a href="#" className="active">
                                                        <img src={product_thumb_5} alt="product desc"/>
                                                    </a>
                                                    <a href="#">
                                                        <img src={product_thumb_5_2} alt="product desc"/>
                                                    </a>
                                                </div>
												{/* <!-- End .product-nav --> */}
                                            </div>
											{/* <!-- End .product-body --> */}
                                        </div>
										{/* <!-- End .product --> */}
                                    </div>
									{/* <!-- End .col-sm-6 --> */}

                                    <div className="col-6">
                                        <div className="product product-7 text-center">
                                            <figure className="product-media">
                                                <span className="product-label label-out">Out of Stock</span>
                                                <a href="product.php">
                                                    <img src={product_6} alt="Product image" className="product-image"/>
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                                    <a href="popup/quickView.php" className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                                                    <a href="#" className="btn-product-icon btn-compare" title="Compare"><span>Compare</span></a>
                                                </div>
												{/* <!-- End .product-action-vertical --> */}

                                                <div className="product-action">
                                                    <a href="#" className="btn-product btn-cart"><span>add to cart</span></a>
                                                </div>
												{/* <!-- End .product-action --> */}
                                            </figure>
											{/* <!-- End .product-media --> */}

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="#">Jackets</a>
                                                </div>
												{/* <!-- End .product-cat --> */}
                                                <h3 className="product-title"><a href="product.php">Khaki utility boiler jumpsuit</a></h3>
												{/* <!-- End .product-title --> */}
                                                <div className="product-price">
                                                    <span className="out-price">$120.00</span>
                                                </div>
												{/* <!-- End .product-price --> */}
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{width: "80%"}}></div>
														{/* <!-- End .ratings-val --> */}
                                                    </div>
													{/* <!-- End .ratings --> */}
                                                    <span className="ratings-text">( 6 Reviews )</span>
                                                </div>
												{/* <!-- End .rating-container --> */}
                                            </div>
											{/* <!-- End .product-body --> */}
                                        </div>
										{/* <!-- End .product --> */}
                                    </div>
									{/* <!-- End .col-sm-6 --> */}

                                    <div className="col-6">
                                        <div className="product product-7 text-center">
                                            <figure className="product-media">
                                                <a href="product.php">
                                                    <img src={product_7} alt="Product image" className="product-image"/>
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                                    <a href="popup/quickView.php" className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                                                    <a href="#" className="btn-product-icon btn-compare" title="Compare"><span>Compare</span></a>
                                                </div>
												{/* <!-- End .product-action-vertical --> */}

                                                <div className="product-action">
                                                    <a href="#" className="btn-product btn-cart"><span>add to cart</span></a>
                                                </div>
												{/* <!-- End .product-action --> */}
                                            </figure>
											{/* <!-- End .product-media --> */}

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="#">Jeans</a>
                                                </div>
												{/* <!-- End .product-cat --> */}
                                                <h3 className="product-title"><a href="product.php">Blue utility pinafore denim dress</a></h3>
												{/* <!-- End .product-title --> */}
                                                <div className="product-price">
                                                    $76.00
                                                </div>
												{/* <!-- End .product-price --> */}
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{width: "20%"}}></div>
														{/* <!-- End .ratings-val --> */}
                                                    </div>
													{/* <!-- End .ratings --> */}
                                                    <span className="ratings-text">( 2 Reviews )</span>
                                                </div>
												{/* <!-- End .rating-container --> */}
                                            </div>
											{/* <!-- End .product-body --> */}
                                        </div>
										{/* <!-- End .product --> */}
                                    </div>
									{/* <!-- End .col-sm-6 --> */}

                                    <div className="col-6">
                                        <div className="product product-7 text-center">
                                            <figure className="product-media">
                                                <span className="product-label label-new">New</span>
                                                <a href="product.php">
                                                    <img src={product_8} alt="Product image" className="product-image"/>
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                                    <a href="popup/quickView.php" className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                                                    <a href="#" className="btn-product-icon btn-compare" title="Compare"><span>Compare</span></a>
                                                </div>
												{/* <!-- End .product-action-vertical --> */}

                                                <div className="product-action">
                                                    <a href="#" className="btn-product btn-cart"><span>add to cart</span></a>
                                                </div>
												{/* <!-- End .product-action --> */}
                                            </figure>
											{/* <!-- End .product-media --> */}

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="#">Shoes</a>
                                                </div>
												{/* <!-- End .product-cat --> */}
                                                <h3 className="product-title"><a href="product.php">Beige knitted elastic runner shoes</a></h3>
												{/* <!-- End .product-title --> */}
                                                <div className="product-price">
                                                    $84.00
                                                </div>
												{/* <!-- End .product-price --> */}
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{width: "0%"}}></div>
														{/* <!-- End .ratings-val --> */}
                                                    </div>
													{/* <!-- End .ratings --> */}
                                                    <span className="ratings-text">( 0 Reviews )</span>
                                                </div>
												{/* <!-- End .rating-container --> */}

                                                <div className="product-nav product-nav-thumbs">
                                                    <a href="#" className="active">
                                                        <img src={product_thumb_8} alt="product desc"/>
                                                    </a>
                                                    <a href="#">
                                                        <img src={product_thumb_8_2} alt="product desc"/>
                                                    </a>
                                                </div>
												{/* <!-- End .product-nav --> */}
                                            </div>
											{/* <!-- End .product-body --> */}
                                        </div>
										{/* <!-- End .product --> */}
                                    </div>
									{/* <!-- End .col-sm-6 --> */}

                                    <div className="col-6">
                                        <div className="product product-7 text-center">
                                            <figure className="product-media">
                                                <a href="product.php">
                                                    <img src={product_9} alt="Product image" className="product-image"/>
                                                </a>

                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                                    <a href="popup/quickView.php" className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                                                    <a href="#" className="btn-product-icon btn-compare" title="Compare"><span>Compare</span></a>
                                                </div>
												{/* <!-- End .product-action-vertical --> */}

                                                <div className="product-action">
                                                    <a href="#" className="btn-product btn-cart"><span>add to cart</span></a>
                                                </div>
												{/* <!-- End .product-action --> */}
                                            </figure>
											{/* <!-- End .product-media --> */}

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="#">Bags</a>
                                                </div>
												{/* <!-- End .product-cat --> */}
                                                <h3 className="product-title"><a href="product.php">Orange saddle lock front chain cross body bag</a></h3>
												{/* <!-- End .product-title --> */}
                                                <div className="product-price">
                                                    $84.00
                                                </div>
												{/* <!-- End .product-price --> */}
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{width: "60%"}}></div>
														{/* <!-- End .ratings-val --> */}
                                                    </div>
													{/* <!-- End .ratings --> */}
                                                    <span className="ratings-text">( 1 Reviews )</span>
                                                </div>
												{/* <!-- End .rating-container --> */}

                                                <div className="product-nav product-nav-thumbs">
                                                    <a href="#" className="active">
                                                        <img src={product_thumb_9} alt="product desc"/>
                                                    </a>
                                                    <a href="#">
                                                        <img src={product_thumb_9_2} alt="product desc"/>
                                                    </a>
                                                    <a href="#">
                                                        <img src={product_thumb_9_3} alt="product desc"/>
                                                    </a>
                                                </div>
												{/* <!-- End .product-nav --> */}
                                            </div>
											{/* <!-- End .product-body --> */}
                                        </div>
										{/* <!-- End .product --> */}
                                    </div>
									{/* <!-- End .col-sm-6 --> */}
                                </div>
								{/* <!-- End .row --> */}
                            </div>
                            
                            {/* <!-- End .products --> */}


                			<nav aria-label="Page navigation">
							    <ul className="pagination justify-content-center">
							        <li className="page-item disabled">
							            <a className="page-link page-link-prev" href="#" aria-label="Previous" tabIndex="-1" aria-disabled="true">
							                <span aria-hidden="true"><i className="icon-long-arrow-left"></i></span>Prev
							            </a>
							        </li>
							        <li className="page-item active" aria-current="page"><a className="page-link" href="#">1</a></li>
							        <li className="page-item"><a className="page-link" href="#">2</a></li>
							        <li className="page-item"><a className="page-link" href="#">3</a></li>
							        <li className="page-item-total">of 6</li>
							        <li className="page-item">
							            <a className="page-link page-link-next" href="#" aria-label="Next">
							                Next <span aria-hidden="true"><i className="icon-long-arrow-right"></i></span>
							            </a>
							        </li>
							    </ul>
							</nav>
                		</div>
                        {/* <!-- End .col-lg-9 --> */}
						<aside className="col-lg-3 order-lg-first">
                			<div className="sidebar sidebar-shop">
                				<div className="widget widget-clean">
                					<label>Filters:</label>
                					<a href="#" className="sidebar-filter-clear">Clean All</a>
                				</div>
								{/* <!-- End .widget widget-clean --> */}

                				<div className="widget widget-collapsible">
    								<h3 className="widget-title">
									    <a data-toggle="collapse" href="#widget-1" role="button" aria-expanded="true" aria-controls="widget-1">
									        Category
									    </a>
									</h3>
									{/* <!-- End .widget-title --> */}

									<div className="collapse show" id="widget-1">
										<div className="widget-body">
											<div className="filter-items filter-items-count">
												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="cat-1"/>
														<label className="custom-control-label" htmlFor="cat-1">Dresses</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
													<span className="item-count">3</span>
												</div>
												{/* <!-- End .filter-item --> */}

												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="cat-2"/>
														<label className="custom-control-label" htmlFor="cat-2">T-shirts</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
													<span className="item-count">0</span>
												</div>
												{/* <!-- End .filter-item --> */}

												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="cat-3"/>
														<label className="custom-control-label" htmlFor="cat-3">Bags</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
													<span className="item-count">4</span>
												</div>
												{/* <!-- End .filter-item --> */}

												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="cat-4"/>
														<label className="custom-control-label" htmlFor="cat-4">Jackets</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
													<span className="item-count">2</span>
												</div>
												{/* <!-- End .filter-item --> */}

												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="cat-5"/>
														<label className="custom-control-label" htmlFor="cat-5">Shoes</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
													<span className="item-count">2</span>
												</div>
												{/* <!-- End .filter-item --> */}

												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="cat-6"/>
														<label className="custom-control-label" htmlFor="cat-6">Jumpers</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
													<span className="item-count">1</span>
												</div>
												{/* <!-- End .filter-item --> */}

												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="cat-7"/>
														<label className="custom-control-label" htmlFor="cat-7">Jeans</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
													<span className="item-count">1</span>
												</div>
												{/* <!-- End .filter-item --> */}

												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="cat-8"/>
														<label className="custom-control-label" htmlFor="cat-8">Sportwear</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
													<span className="item-count">0</span>
												</div>
												{/* <!-- End .filter-item --> */}
											</div>
											{/* <!-- End .filter-items --> */}
										</div>
										{/* <!-- End .widget-body --> */}
									</div>
									{/* <!-- End .collapse --> */}
        						</div>
								{/* <!-- End .widget --> */}

        						<div className="widget widget-collapsible">
    								<h3 className="widget-title">
									    <a data-toggle="collapse" href="#widget-2" role="button" aria-expanded="true" aria-controls="widget-2">
									        Size
									    </a>
									</h3>
									{/* <!-- End .widget-title --> */}

									<div className="collapse show" id="widget-2">
										<div className="widget-body">
											<div className="filter-items">
												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="size-1"/>
														<label className="custom-control-label" htmlFor="size-1">XS</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
												</div>
												{/* <!-- End .filter-item --> */}

												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="size-2"/>
														<label className="custom-control-label" htmlFor="size-2">S</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
												</div>
												{/* <!-- End .filter-item --> */}

												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" checked id="size-3"/>
														<label className="custom-control-label" htmlFor="size-3">M</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
												</div>
												{/* <!-- End .filter-item --> */}

												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" checked id="size-4"/>
														<label className="custom-control-label" htmlFor="size-4">L</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
												</div>
												{/* <!-- End .filter-item --> */}

												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="size-5"/>
														<label className="custom-control-label" htmlFor="size-5">XL</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
												</div>
												{/* <!-- End .filter-item --> */}

												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="size-6"/>
														<label className="custom-control-label" htmlFor="size-6">XXL</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
												</div>
												{/* <!-- End .filter-item --> */}
											</div>
											{/* <!-- End .filter-items --> */}
										</div>
										{/* <!-- End .widget-body --> */}
									</div>
									{/* <!-- End .collapse --> */}
        						</div>
								{/* <!-- End .widget --> */}

        						

        						<div className="widget widget-collapsible">
    								<h3 className="widget-title">
									    <a data-toggle="collapse" href="#widget-4" role="button" aria-expanded="true" aria-controls="widget-4">
									        Brand
									    </a>
									</h3>
									{/* <!-- End .widget-title --> */}

									<div className="collapse show" id="widget-4">
										<div className="widget-body">
											<div className="filter-items">
												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="brand-1"/>
														<label className="custom-control-label" htmlFor="brand-1">Next</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
												</div>
												{/* <!-- End .filter-item --> */}

												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="brand-2"/>
														<label className="custom-control-label" htmlFor="brand-2">River Island</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
												</div>
												{/* <!-- End .filter-item --> */}

												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="brand-3"/>
														<label className="custom-control-label" htmlFor="brand-3">Geox</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
												</div>
												{/* <!-- End .filter-item --> */}

												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="brand-4"/>
														<label className="custom-control-label" htmlFor="brand-4">New Balance</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
												</div>
												{/* <!-- End .filter-item --> */}

												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="brand-5"/>
														<label className="custom-control-label" htmlFor="brand-5">UGG</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
												</div>
												{/* <!-- End .filter-item --> */}

												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="brand-6"/>
														<label className="custom-control-label" htmlFor="brand-6">F&F</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
												</div>
												{/* <!-- End .filter-item --> */}

												<div className="filter-item">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="brand-7"/>
														<label className="custom-control-label" htmlFor="brand-7">Nike</label>
													</div>
													{/* <!-- End .custom-checkbox --> */}
												</div>
												{/* <!-- End .filter-item --> */}

											</div>
											{/* <!-- End .filter-items --> */}
										</div>
										{/* <!-- End .widget-body --> */}
									</div>
									{/* <!-- End .collapse --> */}
        						</div>
								{/* <!-- End .widget --> */}

        						<div className="widget widget-collapsible">
    								<h3 className="widget-title">
									    <a data-toggle="collapse" href="#widget-5" role="button" aria-expanded="true" aria-controls="widget-5">
									        Price
									    </a>
									</h3>
									{/* <!-- End .widget-title --> */}

									<div className="collapse show" id="widget-5">
										<div className="widget-body">
                                            <div className="filter-price">
                                                <div className="filter-price-text">
                                                    Price Range:
                                                    <span id="filter-price-range"></span>
                                                </div>
												{/* <!-- End .filter-price-text --> */}

                                                <div id="price-slider"></div>
												{/* <!-- End #price-slider --> */}
                                            </div>
											{/* <!-- End .filter-price --> */}
										</div>
										{/* <!-- End .widget-body --> */}
									</div>
									{/* <!-- End .collapse --> */}
        						</div>
								{/* <!-- End .widget --> */}
                			</div>
							{/* <!-- End .sidebar sidebar-shop --> */}
                		</aside>
						{/* <!-- End .col-lg-3 --> */}
                		
                        {/* <!-- End .col-lg-3 --> */}
                	</div>
                    {/* <!-- End .row --> */}
                </div>
                {/* <!-- End .container --> */}
            </div>
            {/* <!-- End .page-content --> */}
        </main>
        {/* <!-- End .main --> */}
        </>
    );
}
export default ShopMainArea;