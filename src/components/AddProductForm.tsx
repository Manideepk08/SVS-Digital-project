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
  name: '',
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
  const { products, addProduct, updateProduct, getProductBySlug, deleteProduct } = useProductContext();

  // Detect edit mode
  const params = new URLSearchParams(location.search);
  const editSlug = params.get('edit');
  const editingProduct = editSlug ? getProductBySlug(editSlug) : undefined;

  // Form state
  const [form, setForm] = useState<Partial<Product>>(defaultProduct);
  const [images, setImages] = useState<string[]>(form.images || []);
  const [error, setError] = useState('');

  // Add editable state: editable by default for new, false for edit
  const [isEditable, setIsEditable] = useState(!editingProduct);
  useEffect(() => {
    setIsEditable(!editingProduct);
  }, [editingProduct]);

  // Pre-fill in edit mode
  useEffect(() => {
    if (editingProduct) {
      setForm({ ...editingProduct });
      setImages(editingProduct.images || (editingProduct.image ? [editingProduct.image] : []));
    }
  }, [editingProduct]);

  // Add state for main image index for gallery
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  useEffect(() => {
    setCurrentImageIdx(0);
  }, [images, isEditable]);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArr = Array.from(files);
      fileArr.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
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
    if (!form.name || !form.price || images.length === 0) {
      setError('Name, price, and images are required.');
      return;
    }
    // Generate unique slug
    let slug = generateSlug(form.name);
    if (!editingProduct || (editingProduct && editingProduct.name !== form.name)) {
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
      name: form.name!,
      description: form.description || '',
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      deliveryTime: form.deliveryTime || '',
      category: form.category || '',
      bestSeller: !!form.bestSeller,
      image: images[0] || '',
      images,
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

  // Delete handler
  const handleDelete = () => {
    if (editingProduct && window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(editingProduct.slug);
      navigate('/admin/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full h-full min-h-[calc(100vh-4rem)] overflow-auto relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
        {editingProduct && !isEditable && (
          <button type="button" className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => setIsEditable(true)}>
            Edit
          </button>
        )}
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Image Upload & Preview */}
        <div className="flex flex-col items-center justify-center h-full w-full">
          <label className="block mb-1 font-medium w-full text-center">Images *</label>
          <input name="images" type="file" accept="image/*" multiple onChange={handleImagesChange} className="w-full" disabled={!isEditable} />
          <div className="mt-4 w-full flex flex-col items-center justify-center">
            {isEditable ? (
              <div className="flex flex-row flex-wrap gap-4 w-full justify-center">
                {images.length > 0 ? images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img src={img} alt={`Preview ${idx + 1}`} className="h-96 w-96 object-contain rounded border" />
                    <button type="button" onClick={() => removeImage(idx)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100 group-hover:scale-110 transition-transform">&times;</button>
                  </div>
                )) : (
                  <div className="h-96 w-96 flex items-center justify-center bg-gray-100 rounded border text-gray-400">No Images</div>
                )}
              </div>
            ) : (
              <>
                <div className="relative flex items-center justify-center w-full">
                  {images.length > 0 ? (
                    <img src={images[currentImageIdx]} alt={`Preview ${currentImageIdx + 1}`} className="h-[420px] w-full max-w-2xl object-contain rounded-2xl shadow-lg mx-auto" />
                  ) : (
                    <div className="h-[420px] w-full max-w-2xl flex items-center justify-center bg-gray-100 rounded-2xl border text-gray-400">No Images</div>
                  )}
                </div>
                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex flex-row gap-2 mt-4">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentImageIdx(idx)}
                        className={`border-2 rounded-lg overflow-hidden focus:outline-none transition-all ${currentImageIdx === idx ? 'border-blue-500' : 'border-transparent'}`}
                        style={{ width: '60px', height: '60px' }}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="object-cover w-full h-full" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {/* Right: Product Details */}
        <div className="relative flex flex-col h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Name *</label>
              <input name="name" className="w-full border rounded px-3 py-2" value={form.name || ''} onChange={handleChange} required readOnly={!isEditable} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <input name="category" className="w-full border rounded px-3 py-2" value={form.category || ''} onChange={handleChange} readOnly={!isEditable} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Price *</label>
              <input name="price" type="number" className="w-full border rounded px-3 py-2" value={form.price || ''} onChange={handleChange} required min="0" step="0.01" readOnly={!isEditable} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Original Price</label>
              <input name="originalPrice" type="number" className="w-full border rounded px-3 py-2" value={form.originalPrice || ''} onChange={handleChange} min="0" step="0.01" readOnly={!isEditable} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Delivery Time</label>
              <input name="deliveryTime" className="w-full border rounded px-3 py-2" value={form.deliveryTime || ''} onChange={handleChange} readOnly={!isEditable} />
            </div>
            <div className="flex items-center mt-6">
              <input name="bestSeller" type="checkbox" checked={!!form.bestSeller} onChange={handleChange} className="mr-2" disabled={!isEditable} />
              <label className="font-medium">Best Seller</label>
            </div>
          </div>
          <div className="mt-4">
            <label className="block mb-1 font-medium">Description</label>
            <textarea name="description" className="w-full border rounded px-3 py-2" value={form.description || ''} onChange={handleChange} readOnly={!isEditable} />
          </div>
          {/* Quantity Options */}
          <div className="mt-4">
            <label className="block mb-1 font-medium">Quantity Options</label>
            <div className="flex gap-2 mb-2">
              <input type="number" className="border rounded px-2 py-1 w-24" placeholder="Qty" value={qty} onChange={e => setQty(e.target.value)} disabled={!isEditable} />
              <input type="number" className="border rounded px-2 py-1 w-32" placeholder="Price" value={qtyPrice} onChange={e => setQtyPrice(e.target.value)} disabled={!isEditable} />
              <button type="button" onClick={addQtyOption} className="bg-blue-600 text-white px-3 py-1 rounded" disabled={!isEditable}>Add</button>
            </div>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              {(form.quantityOptions || []).map((q, i) => (
                <li key={i} className="flex items-center gap-2">{q.qty} pcs - ₹{q.price}
                  {isEditable && (
                    <button type="button" onClick={() => removeQtyOption(i)} className="text-red-500 ml-2">Remove</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {/* Customization Options */}
          <div className="mt-4">
            <label className="block mb-1 font-medium">Customization Options</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              <input className="border rounded px-2 py-1 w-40" placeholder="Label" value={customLabel} onChange={e => setCustomLabel(e.target.value)} disabled={!isEditable} />
              <select className="border rounded px-2 py-1 w-32" value={customType} onChange={e => setCustomType(e.target.value)} disabled={!isEditable}>
                <option value="text">Text</option>
                <option value="select">Select</option>
                <option value="color">Color</option>
                <option value="file">File Upload</option>
              </select>
              <input className="border rounded px-2 py-1 w-48" placeholder="Options (comma separated)" value={customOpts} onChange={e => setCustomOpts(e.target.value)} disabled={!isEditable} />
              <button type="button" onClick={addCustomOption} className="bg-blue-600 text-white px-3 py-1 rounded" disabled={!isEditable}>Add</button>
            </div>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              {(form.customizationOptions || []).map((c, i) => (
                <li key={i} className="flex items-center gap-2">{c.label} ({c.type}{c.options ? ': ' + c.options.join(', ') : ''})
                  {isEditable && (
                    <button type="button" onClick={() => removeCustomOption(i)} className="text-red-500 ml-2">Remove</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">WhatsApp Number</label>
              <input name="whatsappNumber" className="w-full border rounded px-3 py-2" value={form.whatsappNumber || ''} onChange={handleChange} readOnly={!isEditable} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Upload Design Link</label>
              <input name="designLink" className="w-full border rounded px-3 py-2" value={form.designLink || ''} onChange={handleChange} readOnly={!isEditable} />
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={!isEditable}>{editingProduct ? 'Update Product' : 'Save Product'}</button>
            <button type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400" onClick={() => navigate('/admin/dashboard')}>Cancel</button>
          </div>
          {editingProduct && (
            <button
              type="button"
              onClick={handleDelete}
              className="absolute bottom-0 right-0 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-lg"
              style={{ minWidth: 180 }}
            >
              Delete Product
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default AddProductForm; 