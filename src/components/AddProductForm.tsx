import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProductContext, Product, QuantityOption, CustomizationOption } from '../context/ProductContext';
import { v4 as uuidv4 } from 'uuid';

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

const defaultProduct: Partial<Product> = {
  title: '',
  description: '',
  price: 0,
  originalPrice: undefined,
  deliveryTime: '',
  category: '',
  bestSeller: false,
  image: '',
  quantityOptions: [],
  customizationOptions: [],
  whatsappNumber: '',
  designLink: '',
};

const AddProductForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { products, addProduct, updateProduct, getProductBySlug } = useProductContext();

  // Detect edit mode
  const params = new URLSearchParams(location.search);
  const editSlug = params.get('edit');
  const editingProduct = editSlug ? getProductBySlug(editSlug) : undefined;

  // Form state
  const [form, setForm] = useState<Partial<Product>>(defaultProduct);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');

  // Pre-fill in edit mode
  useEffect(() => {
    if (editingProduct) {
      setForm({ ...editingProduct });
      setImagePreview(editingProduct.image || '');
    }
  }, [editingProduct]);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result as string }));
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Quantity Options
  const [qty, setQty] = useState('');
  const [qtyPrice, setQtyPrice] = useState('');
  const addQtyOption = () => {
    if (!qty || !qtyPrice) return;
    setForm((prev) => ({
      ...prev,
      quantityOptions: [
        ...(prev.quantityOptions || []),
        { qty: Number(qty), price: Number(qtyPrice) },
      ],
    }));
    setQty('');
    setQtyPrice('');
  };
  const removeQtyOption = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      quantityOptions: (prev.quantityOptions || []).filter((_, i) => i !== idx),
    }));
  };

  // Customization Options
  const [customLabel, setCustomLabel] = useState('');
  const [customType, setCustomType] = useState('text');
  const [customOpts, setCustomOpts] = useState('');
  const addCustomOption = () => {
    if (!customLabel || !customType) return;
    setForm((prev) => ({
      ...prev,
      customizationOptions: [
        ...(prev.customizationOptions || []),
        {
          label: customLabel,
          type: customType,
          options: customOpts ? customOpts.split(',').map((o) => o.trim()) : undefined,
        },
      ],
    }));
    setCustomLabel('');
    setCustomType('text');
    setCustomOpts('');
  };
  const removeCustomOption = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      customizationOptions: (prev.customizationOptions || []).filter((_, i) => i !== idx),
    }));
  };

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    if (!form.title || !form.price || !form.image) {
      setError('Title, price, and image are required.');
      return;
    }
    // Generate unique slug
    let slug = generateSlug(form.title);
    if (!editingProduct || (editingProduct && editingProduct.title !== form.title)) {
      let uniqueSlug = slug;
      let i = 1;
      while (products.some((p) => p.slug === uniqueSlug && (!editingProduct || p.slug !== editingProduct.slug))) {
        uniqueSlug = `${slug}-${i++}`;
      }
      slug = uniqueSlug;
    } else {
      slug = editingProduct.slug;
    }
    const product: Product = {
      id: editingProduct ? editingProduct.id : uuidv4(),
      slug,
      title: form.title!,
      description: form.description || '',
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      deliveryTime: form.deliveryTime || '',
      category: form.category || '',
      bestSeller: !!form.bestSeller,
      image: form.image!,
      quantityOptions: form.quantityOptions || [],
      customizationOptions: form.customizationOptions || [],
      whatsappNumber: form.whatsappNumber || '',
      designLink: form.designLink || '',
    };
    if (editingProduct) {
      updateProduct(product);
    } else {
      addProduct(product);
    }
    navigate('/admin/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Title *</label>
          <input name="title" className="w-full border rounded px-3 py-2" value={form.title || ''} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input name="category" className="w-full border rounded px-3 py-2" value={form.category || ''} onChange={handleChange} />
        </div>
        <div>
          <label className="block mb-1 font-medium">Price *</label>
          <input name="price" type="number" className="w-full border rounded px-3 py-2" value={form.price || ''} onChange={handleChange} required min="0" step="0.01" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Original Price</label>
          <input name="originalPrice" type="number" className="w-full border rounded px-3 py-2" value={form.originalPrice || ''} onChange={handleChange} min="0" step="0.01" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Delivery Time</label>
          <input name="deliveryTime" className="w-full border rounded px-3 py-2" value={form.deliveryTime || ''} onChange={handleChange} />
        </div>
        <div className="flex items-center mt-6">
          <input name="bestSeller" type="checkbox" checked={!!form.bestSeller} onChange={handleChange} className="mr-2" />
          <label className="font-medium">Best Seller</label>
        </div>
      </div>
      <div className="mt-4">
        <label className="block mb-1 font-medium">Description</label>
        <textarea name="description" className="w-full border rounded px-3 py-2" value={form.description || ''} onChange={handleChange} />
      </div>
      <div className="mt-4">
        <label className="block mb-1 font-medium">Image *</label>
        <input name="image" type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview || form.image ? (
          <img src={imagePreview || (form.image as string)} alt="Preview" className="mt-2 h-24 object-contain rounded" />
        ) : null}
      </div>
      {/* Quantity Options */}
      <div className="mt-4">
        <label className="block mb-1 font-medium">Quantity Options</label>
        <div className="flex gap-2 mb-2">
          <input type="number" className="border rounded px-2 py-1 w-24" placeholder="Qty" value={qty} onChange={e => setQty(e.target.value)} />
          <input type="number" className="border rounded px-2 py-1 w-32" placeholder="Price" value={qtyPrice} onChange={e => setQtyPrice(e.target.value)} />
          <button type="button" onClick={addQtyOption} className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
        </div>
        <ul className="list-disc ml-5 text-sm text-gray-700">
          {(form.quantityOptions || []).map((q, i) => (
            <li key={i} className="flex items-center gap-2">{q.qty} pcs - ₹{q.price}
              <button type="button" onClick={() => removeQtyOption(i)} className="text-red-500 ml-2">Remove</button>
            </li>
          ))}
        </ul>
      </div>
      {/* Customization Options */}
      <div className="mt-4">
        <label className="block mb-1 font-medium">Customization Options</label>
        <div className="flex gap-2 mb-2 flex-wrap">
          <input className="border rounded px-2 py-1 w-40" placeholder="Label" value={customLabel} onChange={e => setCustomLabel(e.target.value)} />
          <select className="border rounded px-2 py-1 w-32" value={customType} onChange={e => setCustomType(e.target.value)}>
            <option value="text">Text</option>
            <option value="select">Select</option>
            <option value="color">Color</option>
            <option value="file">File Upload</option>
          </select>
          <input className="border rounded px-2 py-1 w-48" placeholder="Options (comma separated)" value={customOpts} onChange={e => setCustomOpts(e.target.value)} />
          <button type="button" onClick={addCustomOption} className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
        </div>
        <ul className="list-disc ml-5 text-sm text-gray-700">
          {(form.customizationOptions || []).map((c, i) => (
            <li key={i} className="flex items-center gap-2">{c.label} ({c.type}{c.options ? ': ' + c.options.join(', ') : ''})
              <button type="button" onClick={() => removeCustomOption(i)} className="text-red-500 ml-2">Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">WhatsApp Number</label>
          <input name="whatsappNumber" className="w-full border rounded px-3 py-2" value={form.whatsappNumber || ''} onChange={handleChange} />
        </div>
        <div>
          <label className="block mb-1 font-medium">Upload Design Link</label>
          <input name="designLink" className="w-full border rounded px-3 py-2" value={form.designLink || ''} onChange={handleChange} />
        </div>
      </div>
      <div className="flex gap-2 mt-6">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{editingProduct ? 'Update Product' : 'Save Product'}</button>
        <button type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400" onClick={() => navigate('/admin/dashboard')}>Cancel</button>
      </div>
    </form>
  );
};

export default AddProductForm; 