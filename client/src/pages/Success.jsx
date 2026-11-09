import { Link } from 'react-router-dom';

export default function Success() {
  // TODO 12: read `session_id` from the URL (useSearchParams)
  // TODO 13: clear the cart (useCart().clearCart) once on mount
  // TODO 14: call getOrderBySession(sessionId) from api.js. The webhook can arrive a moment AFTER
  //          the redirect, so poll every second (max ~10 tries) until status !== 'PENDING'.
  // TODO 15: show "Confirming your payment..." while waiting, then the order number, status, and total.
  return (
    <>
      <h1>Success page - not built yet</h1>
      <Link to="/">Back to shop</Link>
    </>
  );
}
