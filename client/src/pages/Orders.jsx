import { useEffect, useState } from 'react';
import { getOrders, refundOrder } from '../api.js';
import { formatMoney } from '../money.js';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const load = () => getOrders().then(setOrders).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);

  async function handleRefund(id) {
    try {
      await refundOrder(id);
      load();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      <h1>Orders (admin view)</h1>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr><th>#</th><th>Status</th><th>Items</th><th>Total</th><th></th></tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td><span className={`badge ${o.status}`}>{o.status}</span></td>
              <td>{o.items.map((i) => `${i.quantity}× ${i.product.name}`).join(', ')}</td>
              <td>{formatMoney(o.totalCents)}</td>
              <td>{o.status === 'PAID' && <button onClick={() => handleRefund(o.id)}>Refund</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
