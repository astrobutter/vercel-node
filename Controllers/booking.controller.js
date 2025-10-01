import Stripe from 'stripe';
import { env } from '../Config/env.js';
const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export const getCheckoutSession = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { priceId, successUrl, cancelUrl, customerEmail } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      metadata: { doctorId },
    });

    res.status(200).json({ id: session.id, url: session.url });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
