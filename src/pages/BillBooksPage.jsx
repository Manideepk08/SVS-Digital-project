import React, { useState } from 'react';
import { CheckCircle, Upload, Phone, Mail } from 'lucide-react';

const sizes = ['3.8" x 7.8"', '4" x 5.5"', '5.5" x 8.5"', '8.5" x 11"'];
const quantities = Array.from({ length: 200 }, (_, i) => i + 1);

export default function BillBooksPage() {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedQty, setSelectedQty] = useState(quantities[0]);
  const [file, setFile] = useState(null);

  return (
    <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-2 gap-8">
      {/* Left: Image & Title */}
      <div>
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=60"
          alt="Bill Books"
          className="rounded-xl shadow-md"
        />
        <h1 className="text-2xl font-bold mt-4">Bill Books</h1>
        <p className="text-gray-600 mt-2">
          Perfect for invoices or using as receipt books
        </p>
        <ul className="list-disc pl-5 mt-4 space-y-1 text-gray-700">
          <li>50 sheets per pad</li>
          <li>Available in 4 sizes</li>
          <li>90 gsm acid-free paper</li>
          <li>Magnetic option for fridges or desks</li>
          <li>Upload your own bill book design or customize with your logo and address</li>
          <li>Can also be used as – Notepads</li>
          <li className="font-semibold">We don't provide carbon copy OR pink / yellow copies OR serial numbers</li>
          <li><em>Cash on Delivery available</em></li>
          <li className="mt-2 font-semibold">Price below is MRP (inclusive of all taxes)</li>
        </ul>
      </div>

      {/* Right: Options & Actions */}
      <div className="space-y-6">
        {/* Size Dropdown */}
        <div>
          <label className="block font-medium">Size</label>
          <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="w-full p-2 border rounded">
            {sizes.map(size => <option key={size}>{size}</option>)}
          </select>
        </div>

        {/* Quantity Dropdown */}
        <div>
          <label className="block font-medium">Quantity</label>
          <select value={selectedQty} onChange={(e) => setSelectedQty(Number(e.target.value))} className="w-full p-2 border rounded">
            {quantities.map(qty => (
              <option key={qty}>{qty} (₹200.00 / unit)</option>
            ))}
          </select>
        </div>

        {/* Shipping */}
        <p className="text-green-600 text-sm">{selectedQty} starting at ₹{200 * selectedQty}.00</p>
        <p className="text-green-700 text-sm font-medium">Free shipping by 3 July to 110001</p>

        {/* Upload Section */}
        <label className="p-3 border rounded flex items-center gap-2 cursor-pointer">
          <Upload className="w-5 h-5" />
          <div>
            <strong>Upload design</strong>
            <p className="text-sm text-gray-500">Have a design? Upload and edit it</p>
          </div>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
        </label>
        {file && <p className="text-sm text-green-600 text-center">Uploaded: {file.name}</p>}

        <p className="text-sm text-gray-500 text-center">✓ 100% satisfaction guaranteed</p>

        {/* Feature Checklist */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Features & Specifications:</h2>
          <ul className="space-y-1 text-gray-700">
            {['Carbonless copies', 'Custom numbering', 'Company branding', 'Professional binding', 'GST compliant format'].map(item => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <button className="w-full bg-blue-600 text-white py-2 rounded shadow hover:bg-blue-700">Get Custom Quote</button>
        <div className="flex justify-between gap-4">
          <a href="tel:9700000451" className="flex-1 border border-green-600 text-green-700 py-2 rounded flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" /> Call Now
          </a>
          <a href="mailto:venkatesh451@gmail.com" className="flex-1 border border-blue-500 text-blue-600 py-2 rounded flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" /> Email
          </a>
        </div>
      </div>
    </div>
  );
} 