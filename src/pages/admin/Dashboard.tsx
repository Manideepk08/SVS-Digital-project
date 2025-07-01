import React, { useState, useMemo, useEffect } from 'react';
import { products as initialProducts } from '../../data/products';
import { FiPlus, FiSearch } from 'react-icons/fi';
import ProductGrid from '../../components/ProductGrid';
import AddProductForm from '../../components/AddProductForm';
import { useToast } from '../../context/ToastContext';
import { Product } from '../../types';
import { products as hardcodedProducts } from '../../data/products';

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const { showToast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem('products');
    let localProducts = stored ? JSON.parse(stored) : [];
    // Merge hardcoded and localStorage products, avoiding duplicates by id
    const merged = [
      ...hardcodedProducts.filter(hp => !localProducts.some(lp => lp.id === hp.id)),
      ...localProducts
    ];
    setProducts(merged);
  }, []);

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

  const handleAddProduct = (product: Product) => {
    let updated;
    if (editingProduct) {
      updated = products.map((p) => p.id === product.id ? { ...p, ...product } : p);
    } else {
      updated = [...products, product];
    }
    setProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
    showToast(editingProduct ? 'Product updated successfully!' : 'Product added successfully!', 'success');
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter((p) => p.id !== productId);
      setProducts(updated);
      localStorage.setItem('products', JSON.stringify(updated));
      showToast('Product deleted.', 'info');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  console.log('Loaded products:', products);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
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
        onEdit={handleEdit}
        onDelete={handleDelete}
        adminView
      />
      {sortedAndFilteredProducts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg shadow-md border-2 border-red-400">
          <h2 className="text-2xl text-red-600 font-bold mb-2">No products found.</h2>
          <p className="text-gray-700 mb-4">Try clearing your search or filter using the button above.</p>
        </div>
      )}
      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <AddProductForm
            onAdd={handleAddProduct}
            onClose={() => { setIsModalOpen(false); setEditingProduct(null); }}
            initialData={editingProduct || undefined}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard; 