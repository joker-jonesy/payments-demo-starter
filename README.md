# Payment Processing Starter - "Dev Desk Shop"

Express + Prisma (SQLite) + React (Vite) store. Product list and cart already work.
**Your job in class:** add real payments with [Stripe](https://stripe.com) (test mode).

## Prerequisites
- Node 18+ and npm
- A free Stripe account (no business details needed for test mode) - https://dashboard.stripe.com/register
- Stripe CLI - https://docs.stripe.com/stripe-cli (`brew install stripe/stripe-cli/stripe` on Mac)

## Setup
```bash
# 1. Backend
cd server
npm install
cp .env.example .env          # then fill in your Stripe keys (see below)
npx prisma db push            # creates the SQLite database
npm run seed                  # adds sample products
npm run dev                   # http://localhost:4000

# 2. Frontend (new terminal)
cd client
npm install
npm run dev                   # http://localhost:5173
```

## Stripe keys
1. Stripe Dashboard -> make sure **Test mode / Sandbox** is on.
2. Developers -> API keys -> copy the **Secret key** (`sk_test_...`) into `server/.env`.
3. In a third terminal: `stripe login`, then
   `stripe listen --forward-to localhost:4000/api/webhook`
   It prints a `whsec_...` signing secret -> put it in `STRIPE_WEBHOOK_SECRET`. Restart the server.

Never commit `.env`. Never use live keys (`sk_live_`) in this class.

## Your TODOs
Search the project for `TODO` - they are numbered 1-16 in the order you should do them:

| # | File | What |
|---|------|------|
| 1-5 | `server/src/routes/checkout.js` | Create Order + Stripe Checkout Session |
| 6-8 | `server/src/routes/webhook.js` | Verify signature, mark order PAID |
| 9-10 | `server/src/routes/orders.js` | Lookup by session, refunds |
| 11 | `client/src/pages/Cart.jsx` | Call checkout, redirect to Stripe |
| 12-15 | `client/src/pages/Success.jsx` | Confirm payment, poll for webhook |
| 16 | `client/src/pages/Orders.jsx` | Refund button |

## Test cards
| Card | Result |
|------|--------|
| 4242 4242 4242 4242 | Succeeds |
| 4000 0000 0000 0002 | Declined |
| 4000 0025 0000 3155 | Requires 3D Secure authentication |

Any future expiry, any 3-digit CVC, any ZIP.
