import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';
import checkoutRouter from './routes/checkout.js';
import ordersRouter from './routes/orders.js';
import webhookRouter from './routes/webhook.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));

// IMPORTANT: the webhook needs the RAW body to verify Stripe's signature,
// so it must be mounted BEFORE express.json().
app.use('/api/webhook', webhookRouter);

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/orders', ordersRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));

export default app;
