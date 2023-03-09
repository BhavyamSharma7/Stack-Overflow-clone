import React from "react";
import axios from "axios";

import "./Plans.css";

function CardDescription({ title, description }) {	
	return (
		<div className="card-description">
			<h2>{ title }</h2>
			<p>{ description }</p>
		</div>
	);
};

function CardBilling({ price, recurrency }) {
	return (
		<div className="card-billing">
			<p>
				<strong className="price">₹ { price }</strong>
        <strong> / mo.</strong>
			</p>
			<p>
				<span className="recurrency">
					Billed ₹{price}/monthly
				</span>
			</p>
		</div>
	);
};

function CardFeatures({ data }) {	
	return (
		<div className="card-features">
			<ul>
				{ 
					data.map((item, index) => {
						return (
							<li key={index}>{item}</li>
						)
					})
				}
			</ul>
		</div>
	);
};

function CardAction(props) {
	const handleSubscribe = async (e) => {
		e.preventDefault();
	
		const response = await axios.post('https://stackoverflow-api-ubav.onrender.com/subscription/create-checkout-session', {
		  subscription: props
		});
	
		const sessionId = response.data.sessionId;
		const KEY = (process.env.REACT_APP_STRIPE_PUBLISH_KEY).toString().substring(0, 107);
		const stripe = window.Stripe(KEY);
		stripe.redirectToCheckout({
		  sessionId: sessionId
		});
	};
	return (
		<div className="card-action">
			<button onClick={handleSubscribe}>SUBSCRIBE</button>
		</div>
	);
};

function PricingCard(props) {	
    const { 
      type,
      title,
      description,
      price,
      mostPopular,
      data,
    } = props;
    
    return (
      <div className={`card pricing-card ${type}`}>
        { (mostPopular) ? <span className="most-popular">Most Popular</span> : null }
			<CardDescription title={title} description={description} />
			<CardBilling price={price} />
			<CardFeatures data={data} />
			<CardAction type={type} description={description} price={price} />
      </div>
    );
};

export default PricingCard;