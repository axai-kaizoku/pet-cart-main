import React from 'react';
import Layout from '../../components/Layout';
import './styles.css';
import toast from 'react-hot-toast';

const Contact = () => {
	const handleSubmit = async (e) => {
		e.preventDefault();
		toast.success('Thankyou for contacting us! ');
	};
	return (
		<Layout>
			<>
				<div className="contactContainer">
					<div className="contactBox">
						<div className="form-outer-divs">
							<div className="contact-container">
								<h1>Contact Us</h1>
								<form onSubmit={handleSubmit}>
									<div className="mb-3">
										<input
											type="text"
											className="form-control"
											id="exampleInputEmail1"
											placeholder="Enter Your Name"
											required
										/>
									</div>
									<div className="mb-3">
										<input
											type="email"
											className="form-control"
											id="exampleInputEmail1"
											placeholder="Enter Your Email Address"
											required
										/>
									</div>

									<div className="mb-3 text-center">
										<button
											type="submit"
											className="btn btn-primary ">
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="mapBox">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863106.9576578713!2d70.57511746250002!3d18.994792100000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2be45411aef65%3A0x9f5046323b7e05c8!2sKnowledgeHut%20UpGrad!5e0!3m2!1sen!2sin!4v1682065165589!5m2!1sen!2sin"
							title="Google Maps"
							height="100%"
							width="100%"
							allowFullScreen=""
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"></iframe>
					</div>
				</div>
			</>
		</Layout>
	);
};

export default Contact;
