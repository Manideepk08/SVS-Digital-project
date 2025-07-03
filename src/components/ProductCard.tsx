import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Clock, Award, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useProductContext } from '../context/ProductContext';
import { useToast } from '../context/ToastContext';

interface ProductCardProps {
  product: Product;
  adminView?: boolean;
}

export default function ProductCard({ product, adminView = false }: ProductCardProps) {
  const { addItem, clearCart } = useCart();
  const { deleteProduct } = useProductContext();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.customQuote) {
      // Redirect to contact for custom quote
      window.location.href = '/contact';
      return;
    }
    addItem(product);
    showToast('Added to cart!', 'success');
  };

  const handleEdit = () => {
    navigate(`/admin/dashboard/new-product?edit=${product.slug}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(product.slug);
      window.location.reload(); // quick refresh to update dashboard
    }
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group relative flex flex-col h-full">
      {/* Best Seller Badge */}
      {product.bestSeller && (
        <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-10 flex items-center space-x-1">
          <Award className="h-3 w-3" />
          <span>Best Seller</span>
        </div>
      )}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">4.8</span>
          </div>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {product.name || product.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
          <span className="flex items-center space-x-1">
            <Clock className="h-4 w-4 text-green-500" />
            <span className="text-xs text-green-600 font-medium">{product.deliveryTime}</span>
          </span>
        </div>
        <div className="flex items-center mb-2">
          {product.customQuote ? (
            <span className="text-lg font-bold text-blue-600">
              {product.priceText || 'Custom Quote'}
            </span>
          ) : (
            <>
              <span className="text-xl font-bold text-blue-600">
                {product.priceRange || formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </>
          )}
        </div>
        <span className="text-xs text-gray-500 mb-2">
          {product.unit} {product.minQuantity ? `(Min: ${product.minQuantity})` : ''}
        </span>
        {/* Hide Add to Cart/Get Quote in admin view */}
        {!adminView && (
          product.customQuote ? (
            <button
              onClick={handleAddToCart}
              className="w-full mt-3 px-3 py-1 rounded-md flex items-center justify-center space-x-2 transition-colors text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Get Quote</span>
            </button>
          ) : (
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleAddToCart}
                className="w-1/2 px-3 py-1 rounded-md flex items-center justify-center space-x-2 transition-colors text-sm font-medium bg-green-500 hover:bg-green-600 text-white"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => {
                  window.location.href = `/checkout?buyNow=${product.id}`;
                }}
                className="w-1/2 px-3 py-1 rounded-md flex items-center justify-center space-x-2 transition-colors text-sm font-medium bg-pink-500 hover:bg-pink-600 text-white"
              >
                <span>Buy Now</span>
              </button>
            </div>
          )
        )}
        {/* Admin Edit/Delete Buttons at the bottom right */}
        {adminView && (
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={handleEdit}
              className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}