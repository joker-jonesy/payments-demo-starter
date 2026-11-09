const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const getProducts = () => request('/products');
export const getOrders = () => request('/orders');
export const getOrderBySession = (sessionId) => request(`/orders/by-session/${sessionId}`);
export const refundOrder = (id) => request(`/orders/${id}/refund`, { method: 'POST' });
export const createCheckout = (items) =>
  request('/checkout', { method: 'POST', body: JSON.stringify({ items }) });
