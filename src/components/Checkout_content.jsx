import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from 'buffer';
import { toast } from 'react-toastify';
import LoadingSpinner from "./LoadingSpinner";
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const Checkout_content = (props) => {
	
	const [name, setName] = useState('');
	const [country, setCountry] = useState('');
	const [city, setCity] = useState('');
	const [street_address, setStreet_address] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [notes, setNotes] = useState('');
	

	const [loading, setLoading] = useState(false);

	const [errors, setErrors] = useState({
		name: '',
		country: '',
		city: '',
		street_address: '',
		state: '',
		zip: '',
		phone: '',
		email: '',
		notes: ''
	});

	const navigate = useNavigate();

	var products = []
	var total;
	var currency;
	var data = props.data.cardData

	if (props.data.discount) {
		var discounted_price = props.data.discount[0].DiscountetdPrice
	}

	//=============================================Handle Form Submit=============================================================

	const CheckoutHandler = async (e) => {
		e.preventDefault();
		if (name !== '' && email !== '' && country !== '' && city !== '' && street_address !== '' && state !== '' && phone !== '') {

			setErrors({ name: '', country: '', city: '', street_address: '', state: '', zip: '', phone: '', email: '', notes: '' });

			let data = {
				name, country, city, street_address, state, 
				zip, phone, email, notes, products, user_id,
				paymentstatus: false,
				grand_total:discounted_price ? discounted_price : total
			}

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

			if (emailRegex.test(email)) {
				setLoading(true)
				let Result = await fetch(`${process.env.REACT_APP_BASE_URL}/order/store`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					body: JSON.stringify(data)
				});

				Result = await Result.json();
				if (Result?.message === "Your order has been placed successfully") {

					//=====================Call Paypal Function================

					paywithpaypa(data,Result?.order_id)
				}
				else {
					toast.error(Result?.message)
					setLoading(false)
				}

			}
			else {
				setErrors((prevErrors) => ({
					...prevErrors,
					email: 'Enter valid email address.'
				}));
			}

		}
		else {
			setErrors({ name: '', country: '', city: '', street_address: '', state: '', zip: '', phone: '', email: '', notes: '' });
			let hasErrors = false;
			const newErrors = {};

			if (name.trim() === '') {
				newErrors.name = 'Name field is required.';
				hasErrors = true;
			}
			if (country.trim() === '') {
				newErrors.country = 'Country field is required.';
				hasErrors = true;
			}
			if (city.trim() === '') {
				newErrors.city = 'City field is required.';
				hasErrors = true;
			}
			if (street_address.trim() === '') {
				newErrors.street_address = 'Street address field is required.';
				hasErrors = true;
			}
			if (state.trim() === '') {
				newErrors.state = 'State field is required.';
				hasErrors = true;
			}
			if (zip.trim() === '') {
				newErrors.zip = 'ZIP code field is required.';
				hasErrors = true;
			}
			if (phone.trim() === '') {
				newErrors.phone = 'Phone number field is required.';
				hasErrors = true;
			}
			if (email.trim() === '') {
				newErrors.email = 'Email field is required.';
				hasErrors = true;
			}
			if (notes.trim() === '') {
				newErrors.notes = 'Notes field is required.';
				hasErrors = true;
			}
			if (hasErrors) {
				setErrors(newErrors);
			}
		}
	}

	//=============================================Pay With Paypal======================================================

	const paywithpaypa = async (data,orderid) => {

		const clientId = 'AZJb8CElfp8wxq1RN_UAkg8TVLUv_8KtFQlqM_oCzjJiV4xNdVCaO95iYoASF1NNRrvk3i-S8DEk1wY0';
		const clientSecret = 'EKLNcEXyjcPVm5mypFyRxingdeB8nxu2jNH8cy-RbCuTJs8Iuc1HkjPdKwjfIjRyCB0bV2sQhrcBRnCP';

		//====================================Get Auth Token===================================

		const authResponse = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
			method: 'POST',
			headers: {
				'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				grant_type: 'client_credentials',
			}),
		});
		if (!authResponse.ok) {
			const errorData = await authResponse.json();
			console.error('Error fetching OAuth token:', errorData);
			return;
		}

		const authData = await authResponse.json();
		const accessToken = authData.access_token;

		//======================================Do Payment===================================

		const response = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`,
			},
			body: JSON.stringify({
				intent: 'CAPTURE',
				purchase_units: [
					{
						amount: {
							currency_code: 'USD',
							value: data.grand_total.toString(),
						},

					},
				],
				application_context: {
					return_url: 'https://beta.myrung.co.uk/success',
					cancel_url: 'https://beta.myrung.co.uk/checkout',
				},
			}),
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Error creating order:', errorData);
			return;
		}

		const rs = await response.json();
		const orderPaymentData = {
			orderid:orderid,
			cardInfo: {
				type: "paypal",
				paymentId: rs.id
			},
		};
		if (rs && rs.links) {
			setLoading(false)
			const OrderData = JSON.stringify(orderPaymentData);
			localStorage.setItem('orderInfo', OrderData);
			const redirectUrl = rs.links[1].href
			window.location.href = redirectUrl;
		}

	}


	var user_id;

	const getData = async () => {
		const data = await JSON.parse((localStorage.getItem('user-info')))
		user_id = data
	}

	useEffect(() => {
		getData()
	}, [getData])

	products = data.map((item, index) => {
		return {
			cat_name: item.cat_name, name: item.name, product_id: item.product_id, product_image: item.product_image
			, quantity: item.quantity, totalprice: item.totalPrice, price: item.Price, tax: 0, discount: 0, user_id: user_id
		};
	})

	const Payments = () => {
		navigate('/checkout/payments')
	}

	return (
		<>
			<div className="page-content">
				{loading ===true && <LoadingSpinner/>}
				<div className="checkout">
					<div className="container">
						<form onSubmit={CheckoutHandler} action="#">
							<div className="row">
								<div className="col-lg-9">
									<h2 className="checkout-title">Billing Details</h2>
									<div className="row">
										<div className="col-sm-12">
											<label>Full Name *</label>
											<input type="text" maxLength={250} onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z]/g, ''))} value={name} name="name" className="form-control" />
											{errors.name && <span className="text-danger">{errors.name}</span>}
										</div>
									</div>
									<label>Country *</label>
									<input type="text" maxLength={250} onChange={(e) => setCountry(e.target.value.replace(/[^a-zA-Z\s]/g, ''))} value={country} name="country" className="form-control" />
									{errors.country && <span className="text-danger">{errors.country}<br></br></span>}
									<label>Street address *</label>
									<input type="text" maxLength={250} onChange={(e) => setStreet_address(e.target.value)} name="street_address" className="form-control" />
									{errors.street_address && <span className="text-danger">{errors.street_address}</span>}
									<div className="row">
										<div className="col-sm-6">
											<label>Town / City *</label>
											<input type="text" maxLength={250} onChange={(e) => setCity(e.target.value)} value={city} name="city" className="form-control" />
											{errors.city && <span className="text-danger">{errors.city}</span>}
										</div>
										<div className="col-sm-6">
											<label>State / County *</label>
											<input type="text" maxLength={250} onChange={(e) => setState(e.target.value)} value={state} name="state" className="form-control" />
											{errors.state && <span className="text-danger">{errors.state}</span>}
										</div>
									</div>
									<div className="row">
										<div className="col-sm-6">
											<label>Postcode / ZIP *</label>
											<input type="text" maxLength={250} onChange={(e) => setZip(e.target.value.replace(/[^0-9]/g, ''))} value={zip} name="zip" className="form-control" />
											{errors.zip && <span className="text-danger">{errors.zip}</span>}
										</div>
										<div className="col-sm-6">
											<label>Phone *</label>
											<input type="tel" onChange={(e) => setPhone(e.target.value.replace(/[^0-9+\-\(\)\s]/g, '').slice(0, 15))} value={phone} name="phone" className="form-control" />
											{errors.phone && <span className="text-danger">{errors.phone}</span>}
										</div>
									</div>
									<label>Email address *</label>
									<input type="text" maxLength={250} onChange={(e) => setEmail(e.target.value)} value={email} name="email" className="form-control" />
									{errors.email && <span className="text-danger">{errors.email}<br></br></span>}
									<label>Order notes (optional)</label>
									<textarea className="form-control" onChange={(e) => setNotes(e.target.value)} name="textarea" cols="30" rows="4" maxLength="150" />
								</div>
								<aside className="col-lg-3">
									<div className="summary">
										<h3 className="summary-title">Your Order</h3>
										<table className="table table-summary">
											<thead>
												<tr>
													<th>Product</th>
													<th>Total</th>
												</tr>
											</thead>
											<tbody>
												{data.map((item, index) => {
													currency = item.symbol
													total = data.reduce((total, item) => total + (item.totalprice ? item.totalprice : item.Price), 0)
													return (
														<>
															<tr>
																<td><a>{item.name}</a></td>
																<td>{item.symbol} {item.Price}</td>
															</tr>
														</>);
												})}
												<tr className="summary-subtotal">
													<td>Subtotal:</td>
													<td>{currency} {discounted_price ? discounted_price : total}</td>
												</tr>

												<tr>
													<td>Shipping:</td>
													<td>Free shipping</td>
												</tr>
												<tr className="summary-total">
													<td>Total:</td>
													<td>{currency} {discounted_price ? discounted_price : total}</td>
												</tr>
											</tbody>
										</table>
										{/* <div className="accordion-summary" id="accordion-payment">
											<PaymentMethods total={discounted_price ? discounted_price : total} onCheckout={CheckoutHandler} />
										</div> */}
										<button type="submit" className="btn btn-outline-primary-2 btn-order btn-block">
											<span className="btn-text">Pay with Paypal</span>
											<span className="btn-hover-text" >Pay with Paypal</span>
										</button>
										<button type="submit" className="btn btn-outline-primary-2 btn-order btn-block">
											<span className="btn-text">Pay with Paypal</span>
											<span className="btn-hover-text" >Pay with Paypal</span>
										</button>
									</div>
								</aside>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
export default Checkout_content;