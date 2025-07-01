import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check, Star, Clock, Award, MessageCircle, Phone, Mail } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [selectedPaper, setSelectedPaper] = useState('Premium');
  const [selectedFinishing, setSelectedFinishing] = useState('Matte');
  const [customText, setCustomText] = useState('');

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <Link to="/products" className="text-blue-600 hover:text-blue-800">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.customQuote) {
      // Redirect to contact for custom quote
      window.location.href = '/contact';
      return;
    }
    
    const finalQuantity = Math.max(quantity, product.minQuantity);
    addItem(product, finalQuantity, {
      size: selectedSize,
      paper: selectedPaper,
      finishing: selectedFinishing,
      quantity: finalQuantity,
      customText: customText
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const totalPrice = product.customQuote ? 0 : product.price * Math.max(quantity, product.minQuantity);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Products</span>
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="p-8 relative">
              {product.bestSeller && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10 flex items-center space-x-1">
                  <Award className="h-4 w-4" />
                  <span>Best Seller</span>
                </div>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              
              {/* Sample Preview */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Sample Preview Available</h4>
                <p className="text-blue-700 text-sm">
                  We can show you samples with Indian addresses, phone numbers (+91), and PIN codes before printing.
                </p>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">{product.deliveryTime}</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">(4.8 out of 5 - 150+ reviews)</span>
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Pricing */}
              <div className="mb-6">
                {product.customQuote ? (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {product.priceText || 'Custom Quote Required'}
                    </div>
                    <p className="text-blue-700 text-sm">
                      Price varies based on specifications. Contact us for detailed quote.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-3xl font-bold text-blue-600">
                        {product.priceRange || formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xl text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">
                      Per {product.unit} • Minimum order: {product.minQuantity} {product.unit}
                    </p>
                    {totalPrice > 0 && quantity >= product.minQuantity && (
                      <div className="mt-2 p-3 bg-green-50 rounded-lg">
                        <p className="text-green-800 font-semibold">
                          Total: {formatPrice(totalPrice)} for {Math.max(quantity, product.minQuantity)} {product.unit}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Features & Specifications:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Customization Options */}
              {product.customizable && !product.customQuote && (
                <div className="mb-6 space-y-4">
                  <h3 className="text-lg font-semibold">Customization Options:</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Size:</label>
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Standard">Standard</option>
                        <option value="Large">Large (+₹50)</option>
                        <option value="Extra Large">Extra Large (+₹100)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Paper Quality:</label>
                      <select
                        value={selectedPaper}
                        onChange={(e) => setSelectedPaper(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium (+₹25)</option>
                        <option value="Deluxe">Deluxe (+₹75)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Finishing:</label>
                      <select
                        value={selectedFinishing}
                        onChange={(e) => setSelectedFinishing(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Matte">Matte</option>
                        <option value="Glossy">Glossy</option>
                        <option value="Satin">Satin (+₹15)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quantity:</label>
                      <input
                        type="number"
                        min={product.minQuantity}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(parseInt(e.target.value) || product.minQuantity, product.minQuantity))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Minimum: {product.minQuantity}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Custom Text/Requirements:</label>
                    <textarea
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="Enter any custom text, special requirements, or design notes..."
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className={`w-full px-6 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors ${
                    product.customQuote
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {product.customQuote ? (
                    <>
                      <MessageCircle className="h-5 w-5" />
                      <span>Get Custom Quote</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                {/* Quick Contact */}
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="tel:9700000451"
                    className="flex items-center justify-center space-x-2 px-4 py-3 border border-green-500 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href="mailto:venkatesh451@gmail.com"
                    className="flex items-center justify-center space-x-2 px-4 py-3 border border-blue-500 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Important Notes:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Free design consultation included</li>
                  <li>• Sample preview available before final printing</li>
                  <li>• Bulk discounts available for large orders</li>
                  <li>• Free delivery within Hyderabad city limits</li>
                  <li>• GST invoice provided for all orders</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}