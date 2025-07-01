import React, { useState, useMemo } from 'react';
import { products } from '../../data/products';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

interface Category {
  id: string;
  name: string;
}

const CategoryModal = ({ isOpen, onClose, onSave, category }: { isOpen: boolean; onClose: () => void; onSave: (name: string) => void; category: Category | null }) => {
  const [name, setName] = useState(category ? category.name : '');

  React.useEffect(() => {
    setName(category ? category.name : '');
  }, [category]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">{category ? 'Edit Category' : 'Add New Category'}</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          placeholder="Category Name"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">
            Cancel
          </button>
          <button onClick={() => onSave(name)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const CategoriesPage: React.FC = () => {
  const initialCategories = useMemo(() => {
    const categoryNames = Array.from(new Set(products.map(p => p.category)));
    return categoryNames.map((name, index) => ({ id: `cat-${index}`, name }));
  }, []);

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const categoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    products.forEach(product => {
      if (counts[product.category]) {
        counts[product.category]++;
      } else {
        counts[product.category] = 1;
      }
    });
    return counts;
  }, []);
  
  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };
  
  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      setCategories(categories.filter(c => c.id !== categoryId));
      // Note: This won't affect products in the data source for this example.
    }
  };
  
  const handleSaveCategory = (name: string) => {
    if (editingCategory) {
      // Edit existing category
      setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, name } : c));
    } else {
      // Add new category
      const newCategory: Category = { id: `cat-${Date.now()}`, name };
      setCategories([...categories, newCategory]);
    }
    setIsModalOpen(false);
    setEditingCategory(null);
  };


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Category Management</h1>
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center"
        >
          <FiPlus className="mr-2" /> Add New Category
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Product Count
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {categories.map(category => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <span className="text-sm text-gray-900">{category.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <span className="text-sm text-gray-900">{categoryCounts[category.name] || 0}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border-b border-gray-200">
                  <button onClick={() => handleEditCategory(category)} className="text-blue-600 hover:text-blue-900 mr-4">
                    <FiEdit />
                  </button>
                  <button onClick={() => handleDeleteCategory(category.id)} className="text-red-600 hover:text-red-900">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        category={editingCategory}
      />
    </div>
  );
};

export default CategoriesPage; 