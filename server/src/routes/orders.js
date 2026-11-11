import { Router } from 'express';
import { stripe } from '../stripe.js';
import { listOrders, findOrderBySession, findOrder, markOrderRefunded } from '../orderService.js';

const router = Router();

router.get('/', async (_req, res) => res.json(await listOrders()));

// Used by the React success page to confirm the payment
router.get('/by-session/:sessionId', async (req, res) => {
  const order = await findOrderBySession(req.params.sessionId);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

router.post('/:id/refund', async (req, res) => {
  try {
    const order = await findOrder(Number(req.params.id));
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.status !== 'PAID') return res.status(400).json({ error: 'Only PAID orders can be refunded' });

    // TODO 5 (STRIPE 5): give the money back. Refunds point at the original payment:
    //   await stripe.refunds.create({ payment_intent: order.paymentIntentId });
    //   Docs: https://docs.stripe.com/api/refunds/create

    res.json(await markOrderRefunded(order.id));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Refund failed' });
  }
});

export default router;
