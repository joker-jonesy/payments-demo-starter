import { Router, raw } from 'express';
import { stripe } from '../stripe.js';
import { markOrderPaid, markOrderExpired } from '../orderService.js';

const router = Router();

// Stripe calls this URL when something happens. It - NOT the success page -
// is the source of truth that a payment succeeded.
// `raw()` keeps the body as untouched bytes, which signature checking requires.
router.post('/', raw({ type: 'application/json' }), async (req, res) => {
 let event;

 try {
   event = stripe.webhooks.constructEvent(
       req.body,
       req.headers['stripe-signature'],
       process.env.STRIPE_WEBHOOK_SECRET
   )
 }catch(err) {
   console.error(err);
   return res.status(400).send(`Webhook error: ${err.message}`);
 }

  try {
    switch (event?.type) {

      case 'checkout.session.completed':{
        const session = event.data.object;
        await markOrderPaid(Number(session.metadata.orderId),{
          email: session.customer_details?.email ??null,
          paymentIntentId: session.payment_intent
        })
        break;
      }

      case 'checkout.session.expired':{
        await markOrderExpired(Number(event.data.object.metadata.orderId))
        break;
      }

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
