import { Router, raw } from 'express';
import { prisma } from '../db.js';
import { stripe } from '../stripe.js';

const router = Router();

// Stripe calls this URL when something happens. It is the source of truth
// that a payment succeeded - NOT the success page the browser lands on.
// Note the `raw()` body parser: signature verification needs the untouched bytes.
router.post('/', raw({ type: 'application/json' }), async (req, res) => {
  // TODO 6: verify the signature with stripe.webhooks.constructEvent(req.body, signatureHeader, STRIPE_WEBHOOK_SECRET)
  //         On failure respond 400.
  // TODO 7: handle 'checkout.session.completed':
  //         - find the Order using session.metadata.orderId
  //         - if it's already PAID, do nothing (idempotency - Stripe can send an event twice)
  //         - in ONE prisma.$transaction: set status PAID, save customer email + payment intent id,
  //           and decrement each product's stock
  // TODO 8: handle 'checkout.session.expired': mark a PENDING order EXPIRED
  // Finally respond 200 { received: true }
  res.json({ received: true });
});

export default router;
