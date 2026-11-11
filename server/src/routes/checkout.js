import { Router } from 'express';
import { stripe } from '../stripe.js';
import { validateCart, createPendingOrder, attachSession, HttpError } from '../orderService.js';

const router = Router();

// POST /api/checkout  body: { items: [{ productId, quantity }] }
router.post('/', async (req, res) => {
  try {
    // Not Stripe, already built for you: check the cart against our DB and save a PENDING order.
    const { lines, totalCents } = await validateCart(req.body.items);
    const order = await createPendingOrder(lines, totalCents);

    // TODO 1 (STRIPE 1): ask Stripe to make a payment page for this order.
    //   Replace the line below with:  await stripe.checkout.sessions.create({ ... })
    //   Fill in these pieces:
    //     mode: 'payment'                  <- one-time payment
    //     line_items: [ ... ]              <- one item per entry in `lines`. Each needs:
    //                                         quantity, and price_data { currency: 'usd',
    //                                         unit_amount (price in cents), product_data { name } }
    //     metadata: { orderId: String(order.id) }   <- a sticky note Stripe hands back later
    //     success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    //     cancel_url:  `${process.env.CLIENT_URL}/cart`
    //   Docs: https://docs.stripe.com/api/checkout/sessions/create
    const session = null; // <- STRIPE 1: replace this line

    await attachSession(order.id, session.id);
    res.json({ url: session.url }); // the React app redirects the browser here
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.status).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'Could not start checkout' });
  }
});

export default router;
