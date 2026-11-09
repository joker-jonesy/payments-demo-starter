import { useEffect, useState } from 'react';
import { getProducts } from '../api.js';
import { useCart } from '../CartContext.jsx';
import { formatMoney } from '../money.js';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts().then(setProducts).catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="error">{error}</p>;

  return (
    <>
      <h1>Products</h1>
      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p.id}>
            <img src={p.imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <div className="row">
              <strong>{formatMoney(p.priceCents)}</strong>
              <button disabled={p.stock < 1} onClick={() => addToCart(p)}>
                {p.stock < 1 ? 'Sold out' : 'Add to cart'}
              </button>
            </div>
            <small>{p.stock} in stock</small>
          </div>
        ))}
      </div>
    </>
  );
}
