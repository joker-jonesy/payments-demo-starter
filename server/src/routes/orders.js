import { Router } from 'express';
import { prisma } from '../db.js';
import { stripe } from '../stripe.js';

const router = Router();
const include = { items: { include: { product: true } } };

router.get('/', async (_req, res) => {
  res.json(await prisma.order.findMany({ include, orderBy: { id: 'desc' } }));
});

// TODO 9: GET /by-session/:sessionId -> the Order with that stripeSessionId (404 if none)
//         The React success page uses this to confirm the payment.

// TODO 10 (stretch): POST /:id/refund
//         Only PAID orders. Call stripe.refunds.create({ payment_intent }) then set status REFUNDED.

export default router;
