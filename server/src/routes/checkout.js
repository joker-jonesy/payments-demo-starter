import { Router } from 'express';
import { prisma } from '../db.js';
import { stripe } from '../stripe.js';

const router = Router();

// POST /api/checkout  body: { items: [{ productId, quantity }] }
router.post('/', async (req, res) => {
  // TODO 1: validate req.body.items (non-empty array, integer quantity >= 1)
  // TODO 2: look the products up in the DB. NEVER trust prices sent from the browser.
  //         Check that stock >= quantity. Compute totalCents.
  // TODO 3: create a PENDING Order (+ OrderItems) with prisma BEFORE going to Stripe.
  // TODO 4: create a Stripe Checkout Session:
  //         stripe.checkout.sessions.create({ mode: 'payment', line_items, metadata: { orderId },
  //                                            success_url, cancel_url })
  //         Docs: https://docs.stripe.com/api/checkout/sessions/create
  // TODO 5: save session.id on the Order (stripeSessionId), then respond with { url: session.url }
  res.status(501).json({ error: 'Not implemented yet' });
});

export default router;
