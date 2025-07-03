import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

const GoToCartButton: React.FC = () => {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  if (itemCount === 0 || location.pathname === '/cart') return null;

  return (
    <button
      className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg font-semibold text-lg transition flex items-center gap-2"
      onClick={() => navigate('/cart')}
    >
      Go to Cart
      <span className="inline-block bg-white text-blue-600 rounded-full px-2 py-0.5 text-sm font-bold ml-2">
        {itemCount}
      </span>
    </button>
  );
};

export default GoToCartButton; 