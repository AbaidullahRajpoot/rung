import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import { toast } from 'react-toastify';
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from 'react-router-dom';

import PaymentCardElement from './PaymentCardElement'
import {
	useStripe,
	useElements,
	CardElement,
} from '@stripe/react-stripe-js';

const Checkout_content = (props) => {

	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [country, setCountry] = useState('');
	const [city, setCity] = useState('');
	const [street_address, setStreet_address] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [notes, setNotes] = useState('');

	const [shippingType, setShippingType] = useState('manual');
	const [shippingInfo, setshippingInfo] = useState(null);

	const [shippingCountry, setShippingCountry] = useState([]);
	const [shippingState, setShippingState] = useState([]);
	const [shippingCity, setShippingCity] = useState([]);

	const [selectedshippingCountry, setSelectedShippingCountry] = useState("");
	const [selectedshippingState, setSelectedShippingState] = useState("");
	const [selectedshippingCity, setSelectedShippingCity] = useState("");

	var [coupon_code, setCoupon_code] = useState(null);
	var [discountValueResult, setDiscountValueResult] = useState(0);
	var [coupon_result, setCoupon_result] = useState(null);

	const [selectedOption, setSelectedOption] = useState('paypal');

	const [shippingOption, setShippingOption] = useState(null);
	const [shippingData, setShippingData] = useState(null);
	const [selectedShippingType, setSelectedShippingType] = useState('');

	const [user_id, setUser_id] = useState(null);
	const stripe = useStripe();
	const elements = useElements();

	const [loading, setLoading] = useState(true);

	const [errors, setErrors] = useState({
		name: '',
		country: '',
		city: '',
		street_address: '',
		state: '',
		shippingData: null,
		zip: '',
		phone: '',
		email: '',
		notes: ''
	});

	var products = []
	var total;
	var currency;
	var data = props.data.cardData
	if (props.data.discount) {
		var discounted_price = props.data.discount[0].DiscountetdPrice
	}

	//==============================Handle Stripe Radio BTn===============================

	const handleRadioChange = (event) => {
		setSelectedOption(event.target.value);
	}
	//=====================Get Shipping Info===========================

	const getShippingInfo = async () => {
		setLoading(true)
		const user = await JSON.parse((localStorage.getItem('user-info')))
		if (user) {
			let data = {
				user_id: user,
			}
			let Result = await fetch(`${process.env.REACT_APP_BASE_URL}/user/shipping/address`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			});
			Result = await Result.json()
			if (Result?.data) {
				setshippingInfo(Result?.data[0])
				SetValue(Result?.data[0])
				let data = {
					country_id: Result?.data[0].country_id
				}
				let ShippingResult = await fetch(`${process.env.REACT_APP_BASE_URL}/shipping_cost`, {
					method: 'POST',
					body: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				});
				ShippingResult = await ShippingResult.json()
				if (ShippingResult?.data) {
					setShippingOption(ShippingResult?.data)
					setShippingType("saved")
				}
			}
			else {
				navigate('/dashboard')
				toast.error("First save your shipping address.")
				setShippingType("manual")
			}
		}
		else {
			navigate('/login')
			setShippingType("manual")
		}

		setLoading(false)
	}

	//=====================================================Get All Country==============================

	const getCountry = () => {
		fetch(`${process.env.REACT_APP_BASE_URL}/countries`)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok ' + response.statusText);
				}
				return response.json();
			})
			.then(data => {
				const insidData = data?.data;
				if (insidData) {
					setShippingCountry(insidData)
				}
			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error);
			});
	}

	//========================================Handle Shipping Country==============================

	const handleShippingCountryChange = async (e) => {
		const country_id = e.target.value;
		const shippingId = parseInt(e.target.value, 10);
		const ShippingCountry = shippingCountry.find(item => item.id === shippingId);
		setSelectedShippingCountry(country_id)
		setCountry(ShippingCountry.name)
		setShippingState([])
		setShippingCity([])
		setCity('')
		setState('')
		await fetch(`${process.env.REACT_APP_BASE_URL}/states-by-country/${country_id}`)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok ' + response.statusText);
				}
				return response.json();
			})
			.then(data => {
				const insidData = data?.data;
				if (insidData) {
					setShippingState(insidData)
				}
			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error);
			});

		let data = {
			country_id: country_id
		}
		let ShippingResult = await fetch(`${process.env.REACT_APP_BASE_URL}/shipping_cost`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		});
		ShippingResult = await ShippingResult.json()
		if (ShippingResult?.data) {
			setShippingOption(ShippingResult?.data)
		}
	};

	//========================================Handle Shipping State==============================

	const handleShippingStateChange = (e) => {
		setLoading(true)
		const state_id = e.target.value;
		const shippingId = parseInt(e.target.value, 10);
		const ShippingState = shippingState.find(item => item.id === shippingId);
		setState(ShippingState.name)
		setSelectedShippingState(state_id)
		setShippingCity([])
		setCity('')
		fetch(`${process.env.REACT_APP_BASE_URL}/cities-by-state/${state_id}}`)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok ' + response.statusText);
				}
				return response.json();
			})
			.then(data => {
				const insidData = data?.data;
				if (insidData) {
					setShippingCity(insidData)
				}
			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error);
			});
		setLoading(false)
	};
	//========================================Handle Shipping City==============================

	const handleShippingCityChange = (e) => {
		const state_id = e.target.value;
		const shippingId = parseInt(e.target.value, 10);
		const ShippingCity = shippingCity.find(item => item.id === shippingId);
		setCity(ShippingCity.name)
		setSelectedShippingState(state_id)
	};

	//============================================Handle State Value=====================================

	const ResetValue = () => {

		setName('')
		setCountry('')
		setCity('')
		setStreet_address('')
		setState('')
		setShippingData('')
		setZip('')
		setPhone('')
		setEmail('')
		setNotes('')
		setErrors({ name: '', country: '', city: '', street_address: '', state: '', zip: '', phone: '', email: '', notes: '' });

	}

	const SetValue = (value) => {
		setCountry(value?.country_name)
		setCity(value?.city_name)
		setStreet_address(value?.address)
		setState(value?.state_name)
		setZip(value?.postal_code)
		setPhone(value?.phone)
		setNotes('')
		setErrors({ name: '', country: '', city: '', street_address: '', state: '', zip: '', phone: '', shippingData: '', email: '', notes: '' });

	}

	//==========================================Handle Shipping Radio Btn==========================

	const handleShippingTypeChange = async (e) => {
		if (e.target.value === "manual") {
			ResetValue()
			setShippingType(e.target.value);
		}
		else if (e.target.value === "saved") {
			await getShippingInfo()
		}
	}

	//======================================Handle Shipping Type================================

	const ShippingTypeChange = (e) => {
		setErrors({ name: '', country: '', city: '', street_address: '', state: '', zip: '', phone: '', shippingData: null, email: '', notes: '' });
		const shippingId = parseInt(e.target.value, 10);
		setSelectedShippingType(shippingId);
		const selectedShippingData = shippingOption.find(item => item.id === shippingId);
		setShippingData(selectedShippingData);
	};

	//======================================Get Client Secret======================================

	const getClientSecret = async () => {
		try {
			const totalPrice = discounted_price
				? (parseInt(discounted_price) + (shippingData?.cost ? parseInt(shippingData.cost) : 0)) - discountValueResult
				: (parseInt(total) + (shippingData?.cost ? parseInt(shippingData.cost) : 0)) - discountValueResult
			const data = {
				amount: totalPrice,
				currency: "usd"
			};
			const response = await fetch(`${process.env.REACT_APP_BASE_URL}/stripe-keys`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			if (result) {
				return result
			}
		} catch (error) {
			console.log('Error fetching client secret:', error);
		}
	}

	//=============================================Handle Form Submit=============================================================

	const CheckoutHandler = async (e) => {
		e.preventDefault();
		if (name !== '' && email !== '' && country !== '' && city !== '' && street_address !== '' && state !== '' && phone !== '' && shippingData) {
			setErrors({ name: '', country: '', city: '', street_address: '', state: '', zip: '', phone: '', shippingData: null, email: '', notes: '' });
			const customer_id = await JSON.parse((localStorage.getItem('user-info')))

			let data = {
				name, country, city, street_address, state,
				zip, phone, email, notes, products, user_id: customer_id,
				paymentstatus: false,
				shipping_day: shippingData?.working_days,
				shipping_name: shippingData?.name,
				shipping_cost: shippingData?.cost,
				coupon_discount: discountValueResult,
				payment_type: selectedOption,
				grand_total: total
			}
			console.log(data)
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

					if (selectedOption === "paypal") {
						PayWithPaypal(data, Result?.order_id)
					}
					else if (selectedOption === "stripe") {
						PayWithStripe(data, Result?.order_id)
					}
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
			setErrors({ name: '', country: '', shippingData: null, city: '', street_address: '', state: '', zip: '', phone: '', email: '', notes: '' });
			let hasErrors = false;
			const newErrors = {};

			if (name.trim() === '') {
				newErrors.name = 'Name  is required.';
				hasErrors = true;
			}
			if (country.trim() === '') {
				newErrors.country = 'Country  is required.';
				hasErrors = true;
			}
			if (city.trim() === '') {
				newErrors.city = 'City  is required.';
				hasErrors = true;
			}
			if (street_address.trim() === '') {
				newErrors.street_address = 'Street address  is required.';
				hasErrors = true;
			}
			if (state.trim() === '') {
				newErrors.state = 'State  is required.';
				hasErrors = true;
			}
			if (zip.trim() === '') {
				newErrors.zip = 'ZIP code  is required.';
				hasErrors = true;
			}
			if (phone.trim() === '') {
				newErrors.phone = 'Phone number  is required.';
				hasErrors = true;
			}
			if (shippingData == null) {
				newErrors.shippingData = 'Shipping type is required.';
				hasErrors = true;
			}
			if (email.trim() === '') {
				newErrors.email = 'Email  is required.';
				hasErrors = true;
			}
			if (notes.trim() === '') {
				newErrors.notes = 'Notes  is required.';
				hasErrors = true;
			}
			if (hasErrors) {
				setErrors(newErrors);
			}

		}
	}

	//=============================================Pay With Paypal======================================================

	const PayWithPaypal = async (data, orderid) => {

		const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
		const clientSecret = process.env.REACT_APP_PAYPAL_CLIENT_SECRET;

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

		const totalPrice = discounted_price
			? (parseInt(discounted_price) + (shippingData?.cost ? parseInt(shippingData.cost) : 0)) - discountValueResult
			: (parseInt(total) + (shippingData?.cost ? parseInt(shippingData.cost) : 0)) - discountValueResult

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
							value: totalPrice
						},

					},
				],
				application_context: {
					return_url: process.env.REACT_APP_PAYPAL_Return_Url,
					cancel_url: process.env.REACT_APP_PAYPAL_Cancel_Url,
					// return_url: 'https://myrung.ae/success',
					// cancel_url: 'https://myrung.ae/checkout',
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
			orderid: orderid,
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

	//=============================================Pay With Stripe======================================================

	const PayWithStripe = async (data, orderid) => {
		const IntentResult = await getClientSecret()
		if (!stripe || !elements || !IntentResult.client_secret) {
			setLoading(false)
			toast.error("Stripe.js has not yet loaded.")
			return;
		}
		const cardElement = elements.getElement(CardElement);
		if (!cardElement) {
			setLoading(false)
			console.error('CardElement not found.');
			toast.error('CardElement not found.')

			return;
		}
		const result = await stripe.confirmCardPayment(IntentResult.client_secret, {
			payment_method: {
				card: cardElement,
			},
		});
		if (result.error) {
			setLoading(false)
			console.error(result.error.message);
			toast.error(result.error.message)
		} else {
			if (result.paymentIntent.status === 'succeeded') {
				const orderPaymentData = {
					orderid: orderid,
					cardInfo: {
						type: "stripe",
						paymentId: IntentResult.payment_intent_id
					},
				};
				const OrderData = JSON.stringify(orderPaymentData);
				localStorage.setItem('orderInfo', OrderData);
				// window.location.href = 'https://myrung.ae/success';
				window.location.href = process.env.REACT_APP_STRIPE_URL;
			}
		}
	};

	//==============================================Get Shipping Info==========================================

	const getShippingInfoUser = async (user) => {
		let data = {
			user_id: user,
		}
		let Result = await fetch(`${process.env.REACT_APP_BASE_URL}/user/shipping/address`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		});
		Result = await Result.json()
		console.log(Result)
		if (Result?.data) {
			setshippingInfo(Result?.data[0])
			SetValue(Result?.data[0])

			//====================================Get State ID Base Data=====================

			fetch(`${process.env.REACT_APP_BASE_URL}/states-by-country/${Result?.data[0].country_id}}`)
				.then(response => {
					if (!response.ok) {
						throw new Error('Network response was not ok ' + response.statusText);
					}
					return response.json();
				})
				.then(data => {
					const insidData = data?.data;
					console.log(insidData)
					if (insidData) {
						setShippingState(insidData)
					}
				})
				.catch(error => {
					console.error('There was a problem with the fetch operation:', error);
				});

			//====================================Get CITY ID Bases Data===============================

			fetch(`${process.env.REACT_APP_BASE_URL}/cities-by-state/${Result?.data[0].state_id}}`)
				.then(response => {
					if (!response.ok) {
						throw new Error('Network response was not ok ' + response.statusText);
					}
					return response.json();
				})
				.then(data => {
					const insidData = data?.data;
					if (insidData) {
						setShippingCity(insidData)
					}
				})
				.catch(error => {
					console.error('There was a problem with the fetch operation:', error);
				});

			let data = {
				country_id: Result?.data[0].country_id
			}
			let ShippingResult = await fetch(`${process.env.REACT_APP_BASE_URL}/shipping_cost`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			});
			ShippingResult = await ShippingResult.json()
			if (ShippingResult?.data) {
				setShippingOption(ShippingResult?.data)
				// setShippingType("saved")
			}
		}
		setLoading(false)
	}
	//==============================================Get User Info==========================================

	const getData = async () => {
		const userToken = sessionStorage.getItem('user-info_token');
		if (userToken) {
			const userData = await JSON.parse((localStorage.getItem('user')))
			console.log(userData)
			const data = await JSON.parse((localStorage.getItem('user-info')))
			if (userData) {
				setName(userData.name)
				setEmail(userData.email)
				setUser_id(data)
				getShippingInfoUser(data)
			}
		}
		else {
			localStorage.removeItem('user-info')
			localStorage.removeItem('user')
			localStorage.removeItem('user-name')
			setLoading(false)
		}
	}

	//===========================================Calculate Coupon Code Function============================

	const calculateCoupon = (CouponResultValue) => {
		var discountValue = 0
		if (CouponResultValue?.discount_type === 'percentage') {
			discountValue = (total * parseFloat(CouponResultValue?.discount)) / 100;
		}
		else if (CouponResultValue?.discount_type === 'amount') {
			discountValue = parseFloat(CouponResultValue?.discount);
		}
		setDiscountValueResult(discountValue)
	}

	//===========================================Apply Coupon Code Function===================================

	const CoupenHandler = async (e) => {
		setLoading(true)
		e.preventDefault();
		let data = { coupon_code, user_id: user_id };
		var Result = await fetch(`${process.env.REACT_APP_BASE_URL}/check-coupon`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(data),
		});
		Result = await Result.json();
		setLoading(false)
		if (Result.result === true) {
			if (total >= parseInt(Result?.min_buy)) {
				setCoupon_result(Result)
				calculateCoupon(Result)
				toast.success(Result?.message)
			}
			else {
				toast.error(`The total amount must be at least ${Result?.min_buy} to apply the coupon code.`)
			}
		}
		else if (Result.result === false) {
			toast.error(Result?.message)
		}
	};

	//===========================================Call Whenever Page Rendered===================================

	useEffect(() => {
		setLoading(true)
		getData()
		getCountry()
	}, [])

	products = data.map((item, index) => {
		return {
			cat_name: item.cat_name, name: item.name, product_id: item.product_id, product_image: item.product_image
			, quantity: item.quantity, totalprice: item.totalPrice, price: item.Price, tax: 0, discount: 0, user_id: user_id
		};
	})

	return (
		<>
			<div className="page-content">
				{loading === true && <LoadingSpinner />}
				<div className="checkout">
					<div className="container">
						<form onSubmit={CheckoutHandler} action="#">
							<div className="row">
								<div className="col-lg-7">
									<h2 className="checkout-title">Checkout Billing Details</h2>
									{
										user_id == null &&
										<div className="row">
											<div className="col-sm-12">
												<div className="mt-1">
													<div className="form-check customer-radio">
														<h6 className="m-0">Existing Customer?</h6>
														<input
															type="radio"
															id="savedAddress"
															name="shippingType"
															value="saved"
															checked={shippingType === 'saved'}
															onChange={handleShippingTypeChange}
															className="mr-2"
														/>
														{
															user_id ?
																<label htmlFor="savedAddress" className="form-check-label">
																	Use your save details
																</label>
																:
																<label htmlFor="savedAddress" className="form-check-label">
																	Sign in to use your save details
																</label>
														}

													</div>
													<div className="form-check use-location-radio">
														<input
															type="radio"
															id="manualShipping"
															name="shippingType"
															value="manual"
															checked={shippingType === 'manual'}
															onChange={handleShippingTypeChange}
															className="mr-2"
														/>
														<label htmlFor="manualShipping" className="form-check-label">
															Checkout as guest
														</label>

													</div>
												</div>
											</div>
										</div>
									}

									{
										shippingType === "manual" ?
											<>
												<div className="row">
													<div className="col-sm-12">
														<label> Name *</label>
														<input type="text" maxLength={250} onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z]/g, ''))} value={name} name="name" className="form-control" />
														{errors.name && <span className="text-danger">{errors.name}</span>}
													</div>
												</div>
												<label>Email Address *</label>
												<input type="text" disabled={user_id ? true : false} maxLength={250} onChange={(e) => setEmail(e.target.value)} value={email} name="email" className="form-control" />
												{errors.email && <span className="text-danger">{errors.email}<br></br></span>}
												<label>Street Address *</label>
												<input type="text" maxLength={250} onChange={(e) => setStreet_address(e.target.value)} name="street_address" value={street_address} className="form-control" />
												{errors.street_address && <span className="text-danger">{errors.street_address}</span>}
												<div className="">
													<label htmlFor="recipient-name" className="col-form-label">Country:</label>
													<select
														className="form-control form-select"
														id="shipping-country"
														onChange={handleShippingCountryChange}
														aria-label="Shipping country select"
													>
														<option value="">Select a country</option>
														{shippingCountry.map(country => (
															<option
																key={country.id}
																value={country.id}
																selected={shippingInfo?.country_id === country?.id}
															>
																{country.name}
															</option>
														))}
													</select>
												</div>
												{errors.country && <span className="text-danger">{errors.country}<br></br></span>}
												<div className="row">
													<div className="col-sm-6">
														<label htmlFor="recipient-name" className="col-form-label">State:</label>
														<select
															className="form-control form-select"
															id="shipping-country"
															onChange={handleShippingStateChange}
															aria-label="Shipping country select"
														>
															<option value="">Select a state</option>
															{shippingState.map(State => (
																<option
																	key={State.id}
																	value={State.id}
																	selected={shippingInfo?.state_id === State?.id}
																>
																	{State.name}
																</option>
															))}
														</select>
														{errors.state && <span className="text-danger">{errors.state}</span>}
													</div>
													<div className="col-sm-6">
														<label htmlFor="recipient-name" className="col-form-label">City:</label>
														<select
															className="form-control form-select"
															id="shipping-country"
															onChange={handleShippingCityChange}
															aria-label="Shipping country select"
														>
															<option value="">Select a city</option>
															{shippingCity.map(city => (
																<option
																	key={city.id}
																	value={city.id}
																	selected={shippingInfo?.city_id === city?.id}
																>
																	{city.name}
																</option>
															))}
														</select>
														{errors.city && <span className="text-danger">{errors.city}</span>}
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
												{/* <div className="form-group">
													<label htmlFor="recipient-name" className="col-form-label">Shipping Type:</label>
													<select
														className="form-control form-select"
														id="shipping-country"
														onChange={ShippingTypeChange}
														aria-label="Shipping country select"
													>
														<option value="">Shipping Type</option>
														{shippingOption?.map(shipping => (
															<option key={shipping.id} value={shipping.id}>
																{shipping.name}
															</option>
														))}
													</select>
													{errors.shippingData && <span className="text-danger">{errors.shippingData}<br></br></span>}
												</div> */}
												<label>Order Notes (optional)</label>
												<textarea className="form-control" onChange={(e) => setNotes(e.target.value)} name="textarea" cols="30" rows="4" maxLength="150" />
											</>
											:
											<>
												<div className="row">
													<div className="col-sm-12">
														<label>Full Name *</label>
														<input type="text" maxLength={250} onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z]/g, ''))} value={name} name="name" className="form-control" />
														{errors.name && <span className="text-danger">{errors.name}</span>}
													</div>
												</div>
												<label>Street Address *</label>
												<input type="text" maxLength={250} onChange={(e) => setStreet_address(e.target.value)} name="street_address" value={street_address} className="form-control" disabled />
												{errors.street_address && <span className="text-danger">{errors.street_address}</span>}
												<label>Country *</label>
												<input type="text" maxLength={250} onChange={(e) => setCountry(e.target.value.replace(/[^a-zA-Z\s]/g, ''))} value={country} name="country" className="form-control" disabled />
												{errors.country && <span className="text-danger">{errors.country}<br></br></span>}
												<div className="row">
													<div className="col-sm-6">
														<label>State  *</label>
														<input type="text" maxLength={250} onChange={(e) => setState(e.target.value)} value={state} name="state" className="form-control" disabled />
														{errors.state && <span className="text-danger">{errors.state}</span>}
													</div>
													<div className="col-sm-6">
														<label>City *</label>
														<input type="text" maxLength={250} onChange={(e) => setCity(e.target.value)} value={city} name="city" className="form-control" disabled />
														{errors.city && <span className="text-danger">{errors.city}</span>}
													</div>
												</div>
												<div className="row">
													<div className="col-sm-6">
														<label>Postcode / ZIP *</label>
														<input type="text" maxLength={250} onChange={(e) => setZip(e.target.value.replace(/[^0-9]/g, ''))} value={zip} name="zip" className="form-control" disabled />
														{errors.zip && <span className="text-danger">{errors.zip}</span>}
													</div>
													<div className="col-sm-6">
														<label>Phone *</label>
														<input type="tel" onChange={(e) => setPhone(e.target.value.replace(/[^0-9+\-\(\)\s]/g, '').slice(0, 15))} value={phone} name="phone" className="form-control" disabled />
														{errors.phone && <span className="text-danger">{errors.phone}</span>}
													</div>
												</div>
												{/* <div className="form-group">
													<label htmlFor="recipient-name" className="col-form-label">Shipping Type:</label>
													<select
														className="form-control form-select"
														id="shipping-country"
														onChange={ShippingTypeChange}
														aria-label="Shipping country select"
													>
														<option value="">Shipping Type</option>
														{shippingOption?.map(shipping => (
															<option key={shipping.id} value={shipping.id}>
																{shipping.name}
															</option>
														))}
													</select>
													{errors.shippingData && <span className="text-danger">{errors.shippingData}<br></br></span>}
												</div> */}
												<label>Email Address *</label>
												<input type="text" maxLength={250} onChange={(e) => setEmail(e.target.value)} value={email} name="email" className="form-control" />
												{errors.email && <span className="text-danger">{errors.email}<br></br></span>}
												<label>Order Notes (optional)</label>
												<textarea className="form-control" onChange={(e) => setNotes(e.target.value)} name="textarea" cols="30" rows="4" maxLength="150" />
											</>}
								</div>
								<aside className="col-lg-5">
									{
										user_id &&
										<div className="cart-bottom">
											<div className="cart-discount">
												<form action="#">
													<div className="input-group">
														<input
															type="text"
															onChange={(e) => setCoupon_code(e.target.value)}
															name="Coupon_code"
															className="form-control"
															required
															placeholder="Coupon Code"
														/>
														<div className="input-group-append">
															<button
																onClick={CoupenHandler}
																className="btn btn-outline-primary-2 px-4"
																type="submit"
															>
																Apply
															</button>
														</div>
													</div>
												</form>
											</div>
										</div>
									}
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
														<tr key={index}>
															<td>
																{item.name}
																<a>
																	<i
																		onClick={() => {
																			props.removeToCartHandler({ item });
																			setDiscountValueResult(0)
																			setCoupon_result(null)
																			toast.success("Successfully Deleted from cart");
																			if (data.length > 1) {
																				console.log("enter")
																			}
																			else {
																				navigate('/');
																			}
																		}}
																		className="icon-close ml-2"
																	></i>
																</a>
															</td>
															<td>
																{item.symbol} {item.Price}
															</td>
														</tr>

													);
												})}
												<tr className="summary-subtotal">
													<td>Discount:</td>
													<td>{currency} {discountValueResult ? discountValueResult : 0}</td>
												</tr>
												<tr className="summary-subtotal">
													<td>Subtotal:</td>
													<td>{currency} {total.toFixed(2)}</td>
												</tr>
												<tr className="summary-subtotal">
													<td>Shipping Type:</td>
													<td className="py-4">
														{
															shippingOption ?
																<p className="text-black">Select Shipping Type</p>
																:
																<p className="text-black">Pleace select country</p>

														}
														{errors.shippingData && <p className="text-danger">{errors.shippingData}<br></br></p>}
													</td>
												</tr>
												{shippingOption?.map(shipping => (
													<tr key={shipping.id}>
														<td className="">
															<div className="form-check shipping-radio">
																<input
																	type="radio"
																	id={`shipping-${shipping.id}`}
																	checked={selectedShippingType === shipping.id}
																	name="shippingTypeMethod"
																	value={shipping.id}
																	onChange={ShippingTypeChange}
																	aria-label={`Shipping type ${shipping.name}`}
																/>
																<label
																	className="form-check-label m-0 pl-2"
																	htmlFor={`shipping-${shipping.id}`}
																>
																	{shipping.name}
																	<p className="text-right ">{shipping.working_days}</p>
																</label>
															</div>
														</td>
														<td className="text-end ">{shipping.base_cost}</td>
													</tr>)
												)}

												{/* {shippingData &&
													<tr>
														<td>Shipping Cost:</td>
														<td></td>
														<td>{shippingData && shippingData.cost}</td>
													</tr>
												}
												{shippingData &&
													<tr>
														<td>Shipping Days:</td>
														<td></td>
														<td>{shippingData && shippingData.working_days}</td>
													</tr>
												} */}
												<tr className="summary-total">
													<td>Total:</td>
													<td>
														{currency + " "}
														{shippingData?.cost
															? (parseInt(total) + parseInt(shippingData.cost)) - discountValueResult
															: parseInt(total) - discountValueResult
														}
													</td>
												</tr>
											</tbody>
										</table>
										<p className="payment-heading">Select Payment Method</p>
										<div className="d-flex ">
											<div className="d-flex align-content-center mr-3">
												<input
													type="radio"
													id="paypal"
													name="options"
													value="paypal"
													checked={selectedOption === 'paypal'}
													onChange={handleRadioChange}
												/>
												<label className="m-0 pl-2" htmlFor="paypal">Paypal</label>
											</div>
											<div className="d-flex align-content-center">
												<input
													type="radio"
													id="stripe"
													name="options"
													value="stripe"
													checked={selectedOption === 'stripe'}
													onChange={handleRadioChange}
												/>
												<label className="m-0 pl-2" htmlFor="stripe">Credit Card</label>
											</div>
										</div>
										{selectedOption === 'paypal' && (
											<button type="submit" className="btn btn-outline-primary-2 btn-order mt-2 btn-block">
												<span className="btn-text">Pay with Paypal</span>
												<span className="btn-hover-text" >Pay with Paypal</span>
											</button>)}
										{selectedOption === 'stripe' && (
											<div className="mt-2">
												<PaymentCardElement
													stripe={stripe}
													cart_products={data}
													isCheckoutSubmit={CheckoutHandler}
												/>
											</div>
										)}
									</div>
								</aside>
							</div>
						</form>
					</div>
				</div>
			</div >
		</>
	)
}
export default Checkout_content;