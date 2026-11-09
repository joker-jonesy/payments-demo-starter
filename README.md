# Payment Processing Starter - "Dev Desk Shop"

Express + Prisma (SQLite) + React (Vite) store. Product list, cart, database, order tracking and all React pages
are **already built**. Your job: write the **5 pieces of code that talk to [Stripe](https://stripe.com)** (test mode).

## Before class (please do this!)
1. Install **Node 18+** and **git**.
2. Create a free Stripe account: https://dashboard.stripe.com/register (no business details needed for test mode).
3. Install the **Stripe CLI** and run `stripe login`:
   - Mac: `brew install stripe/stripe-cli/stripe` (if Homebrew complains, download the binary from https://github.com/stripe/stripe-cli/releases/latest)
   - Windows: `scoop install stripe` or download the `.zip` from the same releases page
   - Docs: https://docs.stripe.com/stripe-cli
4. Clone and install (steps below) so class time isn't spent on downloads.

## Setup
```bash
git clone https://github.com/joker-jonesy/payments-demo-starter.git
cd payments-demo-starter

# Backend
cd server
npm install
cp .env.example .env          # then add your Stripe keys (below)
npx prisma db push            # creates the SQLite database
npm run seed                  # adds sample products
npm run dev                   # http://localhost:4000

# Frontend (new terminal)
cd client
npm install
npm run dev                   # http://localhost:5173
```

## Stripe keys
1. Stripe Dashboard -> make sure **Test mode / Sandbox** is on.
2. Developers -> API keys -> copy the **Secret key** (`sk_test_...`) into `server/.env` as `STRIPE_SECRET_KEY`.
   (If you create a *restricted* key `rk_test_...`, give it Write access to Checkout Sessions and Refunds.)
3. In a third terminal run:
   ```bash
   stripe listen --events checkout.session.completed,checkout.session.expired --forward-to localhost:4000/api/webhook
   ```
   It prints a `whsec_...` signing secret -> put it in `STRIPE_WEBHOOK_SECRET`, then restart the server.
   Leave this terminal running whenever you test.

Never commit `.env`. Never use live keys (`sk_live_`) in this class.

## Your TODOs (search the project for `TODO`)
| # | File | What |
|---|------|------|
| 1 | `server/src/routes/checkout.js` | Create a Stripe Checkout Session |
| 2 | `server/src/routes/webhook.js` | Verify the webhook signature |
| 3 | `server/src/routes/webhook.js` | Handle `checkout.session.completed` |
| 4 | `server/src/routes/webhook.js` | Handle `checkout.session.expired` |
| 5 | `server/src/routes/orders.js` | Refund an order |

Everything else (`orderService.js`, the React app, Prisma schema) is done - read it, but you don't need to change it.

## Test cards
| Card | Result |
|------|--------|
| 4242 4242 4242 4242 | Succeeds |
| 4000 0000 0000 0002 | Declined |
| 4000 0025 0000 3155 | Requires 3D Secure authentication |

Any future expiry, any 3-digit CVC, any ZIP.
