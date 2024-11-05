import React from "react";
import { NavLink } from "react-router-dom";
import backgrounds_cta from '../assets/images/backgrounds/cta/bg-7.jpg';

const Faqmainara = () => {

	return (
		<>
			<main className="main">
				<div className="page-content">
					<div className="container">
						<h2 className="title text-center mb-3">FAQ Information</h2>
						<div className="accordion accordion-rounded" id="accordion-1">
							<div id="accordion-1">
								<div className="card card-box card-sm bg-light">
									<div className="card-header" id="heading-1">
										<h2 className="card-title">
											<a role="button" data-toggle="collapse" href="#collapse-1" aria-expanded="true" aria-controls="collapse-1">
												What payment methods do you accept?
											</a>
										</h2>
									</div>
									<div id="collapse-1" className="collapse show" aria-labelledby="heading-1" data-parent="#accordion-1">
										<div className="card-body">
											- We accept various payment methods, including credit/debit cards including Amex, PayPal. Please check our payment options at checkout for the most up-to-date information.
										</div>
									</div>
								</div>

								<div className="card card-box card-sm bg-light">
									<div className="card-header" id="heading-2">
										<h2 className="card-title">
											<a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
												How do I track my order?
											</a>
										</h2>
									</div>
									<div id="collapse-2" className="collapse" aria-labelledby="heading-2" data-parent="#accordion-1">
										<div className="card-body">
											- Once your order has been dispatched, you will receive a confirmation email with a tracking number.
										</div>
									</div>
								</div>

								<div className="card card-box card-sm bg-light">
									<div className="card-header" id="heading-3">
										<h2 className="card-title">
											<a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3" aria-expanded="false" aria-controls="collapse-3">
												What is your return policy?
											</a>
										</h2>
									</div>
									<div id="collapse-3" className="collapse" aria-labelledby="heading-3" data-parent="#accordion-1">
										<div className="card-body">
											- We offer a hassle-free return policy. You can return items within 14 days of receiving your order. Items must be unworn, unwashed, and in their original packaging. For more details, visit our Returns page.
										</div>
									</div>
								</div>

								<div className="card card-box card-sm bg-light">
									<div className="card-header" id="heading-4">
										<h2 className="card-title">
											<a className="collapsed" role="button" data-toggle="collapse" href="#collapse-4" aria-expanded="false" aria-controls="collapse-4">
												How do I initiate a return?
											</a>
										</h2>
									</div>
									<div id="collapse-4" className="collapse" aria-labelledby="heading-4" data-parent="#accordion-1">
										<div className="card-body">
											- To initiate a return, please contact our customer service team at contact@myrung.ae to obtain a return authorization. Make sure to include your order number and the reason for the return.
										</div>
									</div>
								</div>

								<div className="card card-box card-sm bg-light">
									<div className="card-header" id="heading2-1">
										<h2 className="card-title">
											<a className="collapsed" role="button" data-toggle="collapse" href="#collapse2-1" aria-expanded="false" aria-controls="collapse2-1">
												Can I exchange an item?
											</a>
										</h2>
									</div>
									<div id="collapse2-1" className="collapse" aria-labelledby="heading2-1" data-parent="#accordion-1">
										<div className="card-body">
											- Yes, exchanges are possible for different sizes or colors. Please follow the return process and place a new order for the desired item.
										</div>
									</div>
								</div>

								<div className="card card-box card-sm bg-light">
									<div className="card-header" id="heading2-2">
										<h2 className="card-title">
											<a className="collapsed" role="button" data-toggle="collapse" href="#collapse2-2" aria-expanded="false" aria-controls="collapse2-2">
												Do you offer international shipping?
											</a>
										</h2>
									</div>
									<div id="collapse2-2" className="collapse" aria-labelledby="heading2-2" data-parent="#accordion-1">
										<div className="card-body">
											- Yes, we offer international shipping to select countries. Shipping rates and delivery times may vary. Please check our Shipping Policy for more details.
										</div>
									</div>
								</div>

								<div className="card card-box card-sm bg-light">
									<div className="card-header" id="heading2-3">
										<h2 className="card-title">
											<a className="collapsed" role="button" data-toggle="collapse" href="#collapse2-3" aria-expanded="false" aria-controls="collapse2-3">
												How do I know what size to order?
											</a>
										</h2>
									</div>
									<div id="collapse2-3" className="collapse" aria-labelledby="heading2-3" data-parent="#accordion-1">
										<div className="card-body">
											- Where applicable we provide a detailed size guide on each product page. If you’re unsure, please refer to the sizing details or contact our customer service for assistance.
										</div>
									</div>
								</div>

								<div className="card card-box card-sm bg-light">
									<div className="card-header" id="heading3-1">
										<h2 className="card-title">
											<a className="collapsed" role="button" data-toggle="collapse" href="#collapse3-1" aria-expanded="false" aria-controls="collapse3-1">
												Are the colors in the photos accurate?
											</a>
										</h2>
									</div>
									<div id="collapse3-1" className="collapse" aria-labelledby="heading3-1" data-parent="#accordion-1">
										<div className="card-body">
											- We strive to display colors accurately; however, variations may occur due to lighting and screen settings. If you have specific color concerns, feel free to reach out to our support team.
										</div>
									</div>
								</div>

								<div className="card card-box card-sm bg-light">
									<div className="card-header" id="heading3-2">
										<h2 className="card-title">
											<a className="collapsed" role="button" data-toggle="collapse" href="#collapse3-2" aria-expanded="false" aria-controls="collapse3-2">
												How can I contact customer service?
											</a>
										</h2>
									</div>
									<div id="collapse3-2" className="collapse" aria-labelledby="heading3-2" data-parent="#accordion-1">
										<div className="card-body">
											- You can reach our customer service team via email at contact@myrung.ae or through our contact form on the website. Our team is available Monday to Saturday 8am to 11pm.
										</div>
									</div>
								</div>

								<div className="card card-box card-sm bg-light">
									<div className="card-header" id="heading3-3">
										<h2 className="card-title">
											<a className="collapsed" role="button" data-toggle="collapse" href="#collapse3-3" aria-expanded="false" aria-controls="collapse3-3">
												Do you have a loyalty program?
											</a>
										</h2>
									</div>
									<div id="collapse3-3" className="collapse" aria-labelledby="heading3-3" data-parent="#accordion-1">
										<div className="card-body">
											- Yes! We offer a loyalty program where you can earn points for every purchase. Points can be redeemed for discounts on future orders. Sign up for our newsletter to stay updated on our loyalty offerings.
										</div>
									</div>
								</div>

								<div className="card card-box card-sm bg-light">
									<div className="card-header" id="heading3-4">
										<h2 className="card-title">
											<a className="collapsed" role="button" data-toggle="collapse" href="#collapse3-4" aria-expanded="false" aria-controls="collapse3-4">
												How can I unsubscribe from your newsletter?
											</a>
										</h2>
									</div>
									<div id="collapse3-4" className="collapse" aria-labelledby="heading3-4" data-parent="#accordion-1">
										<div className="card-body">
											- If you wish to unsubscribe, you can do so by clicking the "unsubscribe" link at the bottom of any newsletter email, or you can contact our customer service team for assistance.
										</div>
									</div>
								</div>

								<div className="card card-box card-sm bg-light">
									<div className="card-header" id="heading3-5">
										<h2 className="card-title">
											<a className="collapsed" role="button" data-toggle="collapse" href="#collapse3-5" aria-expanded="false" aria-controls="collapse3-5">
												What should I do if I receive a damaged or incorrect item?
											</a>
										</h2>
									</div>
									<div id="collapse3-5" className="collapse" aria-labelledby="heading3-5" data-parent="#accordion-1">
										<div className="card-body">
											- If you receive a damaged or incorrect item, please contact our customer service immediately at contact@myrung.ae. We will resolve the issue promptly.
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
				<div className="cta cta-display bg-image pt-4 pb-4" style={{ backgroundImage: ` url(${backgrounds_cta})` }}>
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-md-10 col-lg-9 col-xl-7">
								<div className="row no-gutters flex-column flex-sm-row align-items-sm-center">
									<div className="col">
										<h3 className="cta-title text-white">If You Have More Questions										</h3>
										{/* <!-- End .cta-title --> */}
										<p className="cta-desc text-white mt-1">For any inquiries or assistance, our team is here to help—just reach out, and we’ll ensure your satisfaction!</p>
										{/* <!-- End .cta-desc --> */}
									</div>
									{/* <!-- End .col --> */}

									<div className="col-auto">
										<NavLink to='/contact' className="btn btn-outline-white"><span>CONTACT US</span><i className="icon-long-arrow-right"></i></NavLink>
									</div>
									{/* <!-- End .col-auto --> */}
								</div>
								{/* <!-- End .row no-gutters --> */}
							</div>
							{/* <!-- End .col-md-10 col-lg-9 --> */}
						</div>
						{/* <!-- End .row --> */}
					</div>
					{/* <!-- End .container --> */}
				</div>
			</main>
		</>
	);
}
export default Faqmainara;