import Stripe from "stripe";
import User from "../models/auth.js";

export const createCheckout = async (req, res) => {
    const stripe = Stripe(process.env.STRIPE_SECRET);
    const subscription = req.body.subscription;
    let priceId;
  
    switch (subscription.type) {
      case 'basic':
        priceId = process.env.STRIPE_BASIC_PROCUCT;
        break;
      case 'medium':
        priceId = process.env.STRIPE_MEDIUM_PROCUCT;
        break;
      default:
        res.status(400).send('Invalid subscription plan');
        return;
    }
  
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      success_url: 'https://stack-overflow-clone-p30p.onrender.com/subscribe/success',
      cancel_url: 'https://stack-overflow-clone-p30p.onrender.com/plans'
    });
    
    if (session.payment_status === 'paid') {
        // updateUser(session);
        // console.log(session);
        console.log("payment sucess");
    }
    // console.log(session.id);
    res.json({ sessionId: session.id });
}

const updateUser = async(session) => {
    const MONTH_IN_MILLISECONDS = 30 * 24 * 60 * 60 * 1000; // assuming 30 days in a month

    const user = await User.findOne({ email: customer.email });
    user.subscribed = true;
    user.nextBillingDate = new Date(Date.now() + MONTH_IN_MILLISECONDS);
    await user.save();
}