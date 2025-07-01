import React, { useState } from 'react';
import { Product } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

interface AddProductFormProps {
  onAdd: (product: any) => void;
  onClose: () => void;
  initialData?: Omit<Product, 'id'>;
}

const generateSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const AddProductForm: React.FC<AddProductFormProps> = ({ onAdd, onClose, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [features, setFeatures] = useState<string[]>(initialData?.features || []);
  const [featureInput, setFeatureInput] = useState('');
  const [customizationOptions, setCustomizationOptions] = useState<string[]>(initialData?.customizationOptions || []);
  const [customInput, setCustomInput] = useState('');
  const [uploadDesignLink, setUploadDesignLink] = useState(initialData?.uploadDesignLink || '');
  const [whatsappNumber, setWhatsappNumber] = useState(initialData?.whatsappNumber || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };
  const handleAddCustomization = () => {
    if (customInput.trim()) {
      setCustomizationOptions([...customizationOptions, customInput.trim()]);
      setCustomInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) {
      setError('Title and price are required.');
      return;
    }
    const slug = generateSlug(name);
    const product = {
      id: uuidv4(),
      slug,
      name,
      description,
      price: parseFloat(price),
      features,
      customizationOptions,
      uploadDesignLink,
      whatsappNumber,
      image,
    };
    // Save to localStorage
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    navigate('/admin/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto relative">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
        aria-label="Close"
      >
        &times;
      </button>
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="mb-3">
        <label className="block mb-1 font-medium">Title</label>
        <input className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Description</label>
        <textarea className="w-full border rounded px-3 py-2" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Price</label>
        <input type="number" className="w-full border rounded px-3 py-2" value={price} onChange={e => setPrice(e.target.value)} required min="0" step="0.01" />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-24 object-contain rounded" />}
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Features</label>
        <div className="flex gap-2 mb-2">
          <input className="flex-1 border rounded px-3 py-2" value={featureInput} onChange={e => setFeatureInput(e.target.value)} />
          <button type="button" onClick={handleAddFeature} className="bg-blue-600 text-white px-3 py-2 rounded">Add</button>
        </div>
        <ul className="list-disc ml-5 text-sm text-gray-700">
          {features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Customization Options</label>
        <div className="flex gap-2 mb-2">
          <input className="flex-1 border rounded px-3 py-2" value={customInput} onChange={e => setCustomInput(e.target.value)} />
          <button type="button" onClick={handleAddCustomization} className="bg-blue-600 text-white px-3 py-2 rounded">Add</button>
        </div>
        <ul className="list-disc ml-5 text-sm text-gray-700">
          {customizationOptions.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Upload Design Link</label>
        <input className="w-full border rounded px-3 py-2" value={uploadDesignLink} onChange={e => setUploadDesignLink(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">WhatsApp Number</label>
        <input className="w-full border rounded px-3 py-2" value={whatsappNumber} onChange={e => setWhatsappNumber(e.target.value)} />
      </div>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Product</button>
        <button type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default AddProductForm; 