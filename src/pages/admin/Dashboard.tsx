import React, { useState, useMemo } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import ProductGrid from '../../components/ProductGrid';
import { useToast } from '../../context/ToastContext';
import { useProductContext } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { products } = useProductContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const { showToast } = useToast();
  const navigate = useNavigate();

  const categories = useMemo(() => {
    const allCategories = products.map((p) => p.category);
    return ['All', ...Array.from(new Set(allCategories))];
  }, [products]);

  const sortedAndFilteredProducts = useMemo(() => {
    let filteredProducts = products
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) =>
        filterCategory === 'All' ? true : product.category === filterCategory
      );
    return filteredProducts;
  }, [products, searchTerm, filterCategory]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/admin/dashboard/new-product')}
            className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition flex items-center"
          >
            <FiPlus className="mr-2" />
            Add New Product
          </button>
          <button
            onClick={() => { setSearchTerm(''); setFilterCategory('All'); }}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition"
          >
            Clear Filters
          </button>
        </div>
      </div>
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <h2 className="text-xl font-semibold text-gray-700">All Products ({products.length})</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 pl-8 border rounded-md w-full md:w-64"
              />
              <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-2 border rounded-md"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Product Grid */}
      <ProductGrid
        products={sortedAndFilteredProducts}
        adminView
      />
      {sortedAndFilteredProducts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg shadow-md border-2 border-red-400">
          <h2 className="text-2xl text-red-600 font-bold mb-2">No products found.</h2>
          <p className="text-gray-700 mb-4">Try clearing your search or filter using the button above.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 