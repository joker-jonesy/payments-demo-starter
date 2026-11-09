import { Link, Route, Routes } from 'react-router-dom';
import { useCart } from './CartContext.jsx';
import Products from './pages/Products.jsx';
import Cart from './pages/Cart.jsx';
import Success from './pages/Success.jsx';
import Orders from './pages/Orders.jsx';

export default function App() {
  const { count } = useCart();
  return (
    <>
      <header className="nav">
        <Link to="/" className="brand">Dev Desk Shop</Link>
        <nav>
          <Link to="/orders">Orders</Link>
          <Link to="/cart">Cart ({count})</Link>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
    </>
  );
}
