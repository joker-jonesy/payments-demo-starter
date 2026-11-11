import { Router, raw } from 'express';
import { stripe } from '../stripe.js';
import { markOrderPaid, markOrderExpired } from '../orderService.js';

const router = Router();

// Stripe calls this URL when something happens. It - NOT the success page -
// is the source of truth that a payment succeeded.
// `raw()` keeps the body as untouched bytes, which signature checking requires.
router.post('/', raw({ type: 'application/json' }), async (req, res) => {
  // TODO 2 (STRIPE 2): check this message really came from Stripe.
  //   Anyone could pretend to be Stripe, so Stripe "stamps" each message.
  //   Set `event` to:
  //     stripe.webhooks.constructEvent(
  //       req.body,                              <- the untouched message
  //       req.headers['stripe-signature'],       <- the stamp
  //       process.env.STRIPE_WEBHOOK_SECRET      <- our whsec_ code (not the API key)
  //     )
  //   Wrap it in try/catch. If it throws, reply 400 and stop:  return res.status(400).send('Bad signature')
  let event;

  try {
    switch (event?.type) {
      // TODO 3 (STRIPE 3): case 'checkout.session.completed'  <- "the customer paid!"
      //   const session = event.data.object;
      //   await markOrderPaid(Number(session.metadata.orderId), {   <- orderId is the sticky note from TODO 1
      //     email: session.customer_details?.email ?? null,
      //     paymentIntentId: session.payment_intent,                <- we need this later to refund
      //   });
      //   break;

      // TODO 4 (STRIPE 4): case 'checkout.session.expired'  <- "the customer gave up"
      //   await markOrderExpired(Number(event.data.object.metadata.orderId));
      //   break;

      default:
        console.log(`Unhandled event type ${event?.type}`);
    }
    res.json({ received: true }); // any 2xx tells Stripe "got it"; otherwise it retries
  } catch (err) {
    console.error(err);
    res.status(500).send('Webhook handler failed'); // Stripe will retry
  }
});

export default router;
