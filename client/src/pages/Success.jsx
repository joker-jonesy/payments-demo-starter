import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getOrderBySession } from '../api.js';
import { useCart } from '../CartContext.jsx';
import { formatMoney } from '../money.js';

export default function Success() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const [order, setOrder] = useState(null);
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // The webhook may arrive a moment after the redirect, so poll briefly.
    let tries = 0;
    const timer = setInterval(async () => {
      tries++;
      try {
        const o = await getOrderBySession(sessionId);
        setOrder(o);
        if (o.status !== 'PENDING' || tries > 10) clearInterval(timer);
      } catch {
        if (tries > 10) clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [sessionId]);

  if (!order || order.status === 'PENDING') return <h1>Confirming your payment...</h1>;

  return (
    <>
      <h1>Thank you! 🎉</h1>
      <p>Order #{order.id} is <strong>{order.status}</strong>. Total {formatMoney(order.totalCents)}.</p>
      <Link to="/">Keep shopping</Link>
    </>
  );
}
