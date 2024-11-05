import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SkeltonCard from "./Skeltoncard";
import { SkeletonTheme } from "react-loading-skeleton";

import axios from "axios";

const CategoriesSection = () => {

	const [isloading, setLoading] = useState(true);
	const [Catagaries, SetCatagories] = useState([]);
	var itemName;

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_BASE_URL}/categories`)
			.then(res => {
				var insidData = res.data.data;
				SetCatagories(insidData);
				setLoading(false)
			})
	}, [isloading])

	return (
		<>
			<div className="categories-page">
				<div className="container">
					<div className="row">
						{
							<SkeletonTheme baseColor="rgb(244 244 244)" highlightColor="#fff">
								{isloading ?
									<>
										<SkeltonCard />
										<SkeltonCard />
										<SkeltonCard />
									</>
									:
									Catagaries.map((item, i) => {
										itemName = item.name.replace(' ', '');
										return (
											<>
												<div className="col-md-4" key={item.id}>
													<div className="banner banner-cat banner-badge">
														<NavLink to={`/shop/product/catogeroy/${itemName}=${item.id}`}  >
															<img src={"https://beta.myrung.co.uk/b/public/" + item.banner} alt="Banner" />
														</NavLink>
														<NavLink to={`/shop/product/catogeroy/${itemName}=${item.id}`} className="banner-link" >
															<h3 className="banner-title" style={{color:"#777"}}>{item.name}</h3>
															<h4 className="banner-subtitle" style={{color:"#000"}}>{item.product_cout} Products</h4>
															<span className="banner-link-text">Shop Now</span>
														</NavLink>
													</div>
												</div>
											</>
										);
									})
								}
							</SkeletonTheme>
						}
					</div>
				</div>
			</div>
		</>
	);
}
export default CategoriesSection;

