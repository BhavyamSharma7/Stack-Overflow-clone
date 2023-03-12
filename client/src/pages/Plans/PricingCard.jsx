import React from "react";

import "./Plans.css";

function CardDescription({ title, description }) {	
	return (
		<div className="card-description">
			<h2>{ title }</h2>
			<p>{ description }</p>
		</div>
	);
};

function CardBilling({ price }) {
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
	
	const KEY = (process.env.REACT_APP_STRIPE_PUBLISH_KEY).toString().substring(0, 107);

	return (
		props.type === "basic" ? 
		<stripe-buy-button
			buy-button-id={(process.env.REACT_APP_STRIPE_BASIC_KEY).toString().substring(0, 32)}
			publishable-key={KEY}
		>
		</stripe-buy-button> :
		<stripe-buy-button
			buy-button-id={(process.env.REACT_APP_STRIPE_MED_KEY).toString().substring(0, 32)}
			publishable-key={KEY}
		>
		</stripe-buy-button>	
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