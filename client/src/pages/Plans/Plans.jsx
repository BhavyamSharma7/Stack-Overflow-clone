import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PricingCard from "./PricingCard";

import "./Plans.css";

const Plans = () => {
    const cardsData = [
        {
          id: 1,
          type: 'basic',
          title: 'Silver Plan',
          description: 'Subscribe here to activate the silver plan',
          price: 100.00,
          mostPopular: false,
          data: ['Having more than 1 doubt per day?', 'Ask 5 questions per day!']
        },
        {
          id: 2,
          type: 'medium',
          title: 'Gold Plan',
          description: 'Subscribe here to activate the gold plan.',
          price: 1000.00,
          mostPopular: true,
          data: [`Still don't feel satisfied?`, 'Ask 10 questions per day!']
        }
    ];

    const user = useSelector((state) => state.currentUserReducer);
    const navigate = useNavigate();
    return (
            user === null ? navigate("/Auth") :
            <div className="app-wrapper">
                <h2 style={{marginBottom: "20px"}}>Subscribe to a plan based on your needs and ask more doubts.</h2>
                {
                    cardsData.map(props => {                              
                        return (
                            <PricingCard
                                {...props}
                                key={props.id}
                            />
                        );
                    })
                }
            </div>
    );
}

export default Plans;