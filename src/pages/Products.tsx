import React, { useState, useMemo } from 'react';
import { Search, Filter, Award, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProductContext } from '../context/ProductContext';
import { Product } from '../types';

export default function Products() {
  const { products } = useProductContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  // Derive categories from products
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    return ['All', ...cats.filter(Boolean)];
  }, [products]);

  // Derive best sellers from products
  const bestSellerProducts = useMemo(() => products.filter(p => p.bestSeller), [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (product.category || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price ?? 999999) - (b.price ?? 999999);
        case 'price-high':
          return (b.price ?? 999999) - (a.price ?? 999999);
        case 'popular':
          return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Services & Products</h1>
          <p className="text-gray-600">
            Comprehensive printing and digital services with authentic Indian market pricing and quality.
          </p>
        </div>

        {/* Best Sellers Section */}
        {bestSellerProducts.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="h-6 w-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">Best Sellers</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {bestSellerProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products, services, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-green-500" />
              <span>Fast delivery across Hyderabad</span>
            </div>
            <div className="flex items-center space-x-1">
              <Award className="h-4 w-4 text-blue-500" />
              <span>Premium quality guaranteed</span>
            </div>
            <div>
              <span className="font-medium">Free design consultation</span>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categories.slice(1).map((category) => {
            const categoryCount = products.filter(p => p.category === category).length;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as string)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedCategory === category
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold text-sm">{category}</div>
                  <div className="text-xs text-gray-500 mt-1">{categoryCount} items</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            // @ts-ignore
            <ProductCard
              key={product.id}
              product={
                ({
                  id: typeof product.id === 'string' ? product.id : '',
                  name: typeof product.name === 'string' ? product.name : '',
                  description: typeof product.description === 'string' ? product.description : '',
                  price: typeof product.price === 'number' ? product.price : 0,
                  image: typeof product.image === 'string' ? product.image : '',
                  features: Array.isArray(product.features) ? product.features : [],
                  minQuantity: typeof product.minQuantity === 'number' ? product.minQuantity : 1,
                  unit: typeof product.unit === 'string' ? product.unit : '',
                  category: typeof product.category === 'string' ? product.category : '',
                  deliveryTime: typeof product.deliveryTime === 'string' ? product.deliveryTime : '',
                  originalPrice: typeof product.originalPrice === 'number' ? product.originalPrice : undefined,
                  customizable: typeof product.customizable === 'boolean' ? product.customizable : undefined,
                  bestSeller: typeof product.bestSeller === 'boolean' ? product.bestSeller : undefined,
                  priceRange: typeof product.priceRange === 'string' ? product.priceRange : undefined,
                  priceText: typeof product.priceText === 'string' ? product.priceText : undefined,
                  customQuote: typeof product.customQuote === 'boolean' ? product.customQuote : undefined
                } as unknown) as Product
              }
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search terms or browse our categories above.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-blue-100 mb-6">
            Can't find exactly what you're looking for? We specialize in custom printing solutions 
            tailored to your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Custom Quote
            </a>
            <a
              href="tel:9700000451"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Call: 97000 00451
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}