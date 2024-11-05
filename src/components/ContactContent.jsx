import React, { useState } from "react";
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner'


const ContactContent = () => {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');

	const [formsent, setFormSent] = useState(false);

	const [nameerror, setNameError] = useState('');
	const [emailerror, setEmailError] = useState('');
	const [phoneerror, setPhoneError] = useState('');
	const [subjecterror, setSubjectError] = useState('');
	const [messageerror, setMessageError] = useState('');

	//=============================================Sent Contact Form========================================


	const addUserHandler = async (event) => {
		event.preventDefault();
		// Reset errors
		setNameError('');
		setEmailError('');
		setPhoneError('');
		setSubjectError('');
		setMessageError('');

		// Validate input
		let isValid = true;
		if (name.trim() === '') {
			setNameError('Name field is required.');
			isValid = false;
		}
		if (email.trim() === '') {
			setEmailError('Email field is required.');
			isValid = false;
		} else {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				setEmailError('Enter a valid email address.');
				isValid = false;
			}
		}
		if (phone.trim() === '') {
			setPhoneError('Phone number field is required.');
			isValid = false;
		}
		if (subject.trim() === '') {
			setSubjectError('Subject field is required.');
			isValid = false;
		}
		if (message.trim() === '') {
			setMessageError('Message field is required.');
			isValid = false;
		}

		if (isValid) {
			let data = { name, email, phone, subject, message };
			try {
				setFormSent(true)
				let response = await fetch(`${process.env.REACT_APP_BASE_URL}/contact-form`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					body: JSON.stringify(data)
				});
				let result = await response.json();
				if (result.message === 'Your Message has been submitted successfully') {
					setName('');
					setEmail('');
					setPhone('');
					setSubject('');
					setMessage('');
					setFormSent(false)
					toast.success(result.message)
				} else {
					setFormSent(false)
					toast.error(result.error)
				}
			} catch (error) {
				setFormSent(false)
				toast.error(error.message)

			}
		}

	}

	return (
		<>
			<div className="page-content pt-0">
					<div className="row">
						<div className="mb-2 col-12">
							<iframe width="100%" height="200" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
								<a href="https://www.gps.ie/">gps trackers</a>
							</iframe>
						</div>
					</div>
				<div className="container">
					{/* <div className="row">
						<div className="col-12 col-md-4">
							<div className="contact-box text-center">
								<h3>Office</h3>
								<address>1 New York Plaza, New York, <br />NY 10004, USA</address>
							</div>
						</div>
						<div className="col-12 col-md-4">
							<div className="contact-box text-center">
								<h3>Start a Conversation</h3>
								<div><a href="mailto:contact@myrung.ae">contact@myrung.ae</a></div>
								<div><a href="tel:00971 56 583 9938 ">00971 56 583 9938 </a></div>
							</div>
						</div>
						<div className="col-12 col-md-4">
							<div className="contact-box text-center">
								<h3>Social</h3>
								<div className="social-icons social-icons-color justify-content-center">
									<a href="#" className="social-icon social-facebook" title="Facebook" target="_blank"><i className="icon-facebook-f"></i></a>
									<a href="#" className="social-icon social-twitter" title="Twitter" target="_blank"><i className="icon-twitter"></i></a>
									<a href="#" className="social-icon social-instagram" title="Instagram" target="_blank"><i className="icon-instagram"></i></a>
									<a href="#" className="social-icon social-youtube" title="Youtube" target="_blank"><i className="icon-youtube"></i></a>
									<a href="#" className="social-icon social-pinterest" title="Pinterest" target="_blank"><i className="icon-pinterest"></i></a>
								</div>
							</div>
						</div>
					</div> */}
					<div className="touch-container row justify-content-center mt-2">
						<div className="col-md-9 col-lg-7">
							<div className="text-center">
								<h2 className="title mb-1">Get In Touch</h2>
								<p className="lead text-primary">
									At Rung, we’re always excited to connect with our community! Whether you have questions, feedback, or partnership ideas, we’re here to listen.
								</p>
								<p className="mb-3">Feel free to reach out to us anytime. Your thoughts and insights are invaluable as we strive to enhance your shopping experience.

									We look forward to hearing from you!.</p>
							</div>
							<form action="#" onSubmit={addUserHandler} className="contact-form mb-2">
								<div className="row">
									<div className="col-sm-12">
										<label>Full Name *</label>
										<input type="text" className="form-control" name="name" maxLength={250} onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))} value={name} placeholder="Full Name" />
										{nameerror && <span className="text-danger">{nameerror}</span>}
									</div>
									<div className="col-sm-12">
										<label>Email *</label>
										<input type="text" className="form-control" name="email" maxLength={250} value={email} onChange={(e) => setEmail(e.target.value)} id="cemail" placeholder="Email " />
										{emailerror && <span className="text-danger">{emailerror}</span>}
									</div>
									<div className="col-sm-12">
										<label>Phone *</label>
										<input type="tel" className="form-control" onChange={(e) => setPhone(e.target.value.replace(/[^0-9+\-\(\)\s]/g, '').slice(0, 15))} value={phone} name="phone" id="cphone" placeholder="Phone " />
										{phoneerror && <span className="text-danger">{phoneerror}</span>}
									</div>
									<div className="col-sm-12">
										<label>Subject *</label>
										<input type="text" className="form-control" name="subject" maxLength={250} value={subject} onChange={(e) => setSubject(e.target.value)} id="csubject" placeholder="Subject " />
										{subjecterror && <span className="text-danger">{subjecterror}</span>}
									</div>
									<div className="col-sm-12">
										<label>Message</label>
										<textarea
											className="form-control"
											onChange={(e) => setMessage(e.target.value)}
											cols="30"
											rows="4"
											name="message"
											id="cmessage"
											placeholder="Message"
											maxLength="300"
											value={message}
										/>
										{messageerror && <span className="text-danger">{messageerror}</span>}
									</div>
								</div>
								<div className="text-center">
									<button type="submit" className="btn btn-outline-primary-2 btn-minwidth-sm mt-3">
										<span>SUBMIT</span>
										<i className="icon-long-arrow-right"></i>
									</button>
									{formsent === true && <LoadingSpinner />}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ContactContent