import { useState } from 'react';
import { useCart } from '../CartContext.jsx';
import { formatMoney } from '../money.js';
// TODO 11: import { createCheckout } from '../api.js';

export default function Cart() {
  const { cart, setQuantity, totalCents } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleCheckout() {
    setLoading(true);
    setError('');
    try {
      // TODO 11: call createCheckout(...) from api.js. Send ONLY { productId, quantity } per line -
      //          the server decides prices. Then redirect: window.location.href = url
      throw new Error('Checkout not implemented yet');
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  if (cart.length === 0) return <h1>Your cart is empty</h1>;

  return (
    <>
      <h1>Your cart</h1>
      {cart.map((l) => (
        <div className="row cart-line" key={l.product.id}>
          <span>{l.product.name}</span>
          <input
            type="number"
            min="0"
            value={l.quantity}
            onChange={(e) => setQuantity(l.product.id, Number(e.target.value))}
          />
          <span>{formatMoney(l.product.priceCents * l.quantity)}</span>
        </div>
      ))}
      <h2>Total: {formatMoney(totalCents)}</h2>
      {error && <p className="error">{error}</p>}
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Redirecting...' : 'Checkout with Stripe'}
      </button>
      <p><small>Test card: 4242 4242 4242 4242, any future date, any CVC.</small></p>
    </>
  );
}
