import React, { useState } from 'react';

const sizes = [
  'Small with Top Binding (30 cm x 20 cm)',
  'Classic with Middle Binding (43 cm x 28 cm)',
  'Classic with Top Binding (43 cm x 28 cm)',
  'Large with Middle Binding (57 cm x 37 cm)'
];
const quantities = Array.from({ length: 10 }, (_, i) => i + 1);

export default function AcademicCalendarsPage() {
  const [size, setSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const handleAddToCart = () => {
    console.log('Added to cart:', { size, quantity, notes });
    alert('Item added to cart!');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Image and Description */}
      <div>
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=700&q=60"
          alt="Academic Calendars"
          className="rounded-xl shadow-md"
        />

        <h2 className="text-xl font-semibold mt-6 mb-2">Academic Calendars</h2>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
          <li>Perfect for schools, colleges, and universities</li>
          <li>High-resolution printing for detailed academic schedules</li>
          <li>Durable paper with matte or glossy finish</li>
          <li>Various sizes and binding styles available</li>
          <li>Customizable with logos and term plans</li>
        </ul>
      </div>

      {/* Customization Options */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Customization Options:</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Size:</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {sizes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">Quantity:</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-2 border rounded"
            >
              {quantities.map((q) => (
                <option key={q}>{`${q} (₹390.00 / unit)`}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium">Custom Text/Requirements:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter any custom text, special requirements, or design notes..."
            className="w-full p-2 border rounded min-h-[80px]"
          ></textarea>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-green-600 text-white py-2 rounded shadow hover:bg-green-700 flex items-center justify-center gap-2"
        >
          🛒 Add to Cart
        </button>

        <p className="text-sm text-gray-500 text-center mt-2">Need help? Contact us directly:</p>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <a
            href="tel:"
            className="flex-1 border border-green-600 text-green-700 py-2 rounded flex items-center justify-center gap-2"
          >
            📞 Call Now
          </a>
          <a
            href="mailto:"
            className="flex-1 border border-blue-500 text-blue-600 py-2 rounded flex items-center justify-center gap-2"
          >
            📧 Email
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=9833226257&text=Hi&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border border-green-500 text-green-700 py-2 rounded flex items-center justify-center gap-2"
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'><path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.67-1.612-.916-2.209-.242-.579-.487-.5-.67-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.1 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.87.118.571-.085 1.758-.718 2.007-1.41.248-.694.248-1.288.173-1.41-.074-.123-.272-.198-.57-.347z'/></svg> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
} 