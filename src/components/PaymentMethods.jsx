import { useState,useEffect } from "react";
import axios from "axios";
import {
	PayPalScriptProvider,
	PayPalButtons,
	PayPalMarks,
} from "@paypal/react-paypal-js";


const  PaymentMethods = (props) => {

	useEffect(() => {
			axios.get(`${process.env.REACT_APP_BASE_URL}/payment-types-active`)
				.then(res => {
					var insidData = res;
				})
	}, [])

	var Total=props.total;
	const amount = Total;
	const currency = "USD";
	const style = {"color":"white"};
	var a=1
	const fundingSources = [a===0?"paylater":"paypal",];
	const [selectedFundingSource, setSelectedFundingSource] = useState(
		fundingSources[0]
	);

	function onChange(event) {
		setSelectedFundingSource(event.target.value);
	}

	return (
		<PayPalScriptProvider
			options={{
				"client-id": "AacSC55rZReivUoHpvstAVKwm-cc_97OEC3b0LRns3XDhtASngHHHjRbyNDWiE0ij-LOCKNMuUvGya43",
				components: "buttons,marks,funding-eligibility"
			}}
		>
			<form style={{ minHeight: "200px" }}>
				{fundingSources.map((fundingSource) => (
					<label className="mark" key={fundingSource}>
						<input
							defaultChecked={
								fundingSource === selectedFundingSource
							}
							onChange={onChange}
							type="radio"
							name="fundingSource"
							value={fundingSource}
						/>
						<PayPalMarks fundingSource={fundingSource} />
					</label>
				))}
			</form>
			<br />
			<PayPalButtons
				fundingSource={selectedFundingSource}
				style={style}
				forceReRender={[selectedFundingSource, style, amount, currency]}
				createOrder={(data, actions) => {
					return actions.order
						.create({
							purchase_units: [
								{
									amount: {
										currency_code: currency, 
										value: amount, 
									},
								},
							],
						})
						.then((orderId) => {
							// Your code here after create the order
							return (orderId);
							
						});
				}}
				onApprove={(data, actions) => {
					return actions.order.capture().then(function (details) {
						// Your code here after approve the transaction
					});
				}}
			/>
		</PayPalScriptProvider>
	);
}
export default PaymentMethods;