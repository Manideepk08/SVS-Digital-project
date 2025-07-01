import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Clock, Award, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.customQuote) {
      // Redirect to contact for custom quote
      window.location.href = '/contact';
      return;
    }
    addItem(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
      {/* Best Seller Badge */}
      {product.bestSeller && (
        <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-10 flex items-center space-x-1">
          <Award className="h-3 w-3" />
          <span>Best Seller</span>
        </div>
      )}

      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-white rounded-full p-1">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">4.8</span>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Delivery Time */}
        <div className="flex items-center space-x-1 mb-3">
          <Clock className="h-4 w-4 text-green-500" />
          <span className="text-xs text-green-600 font-medium">{product.deliveryTime}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            {product.customQuote ? (
              <span className="text-lg font-bold text-blue-600">
                {product.priceText || 'Custom Quote'}
              </span>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-blue-600">
                    {product.priceRange || formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {product.unit} (Min: {product.minQuantity})
                </span>
              </>
            )}
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          className={`w-full px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors font-medium ${
            product.customQuote
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {product.customQuote ? (
            <>
              <MessageCircle className="h-4 w-4" />
              <span>Get Quote</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
        
        <div className="mt-3">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
}