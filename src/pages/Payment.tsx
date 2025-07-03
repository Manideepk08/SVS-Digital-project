import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// @ts-ignore: No types for react-qr-code
import QRCode from 'react-qr-code';
// @ts-ignore: No types for react-qr-reader
import { QrReader } from 'react-qr-reader';
import { useCart } from '../context/CartContext';

const MERCHANT_UPI_ID = 'merchant@upi'; // Replace with your UPI ID
const MERCHANT_NAME = 'SVS Digitals'; // Replace with your business name

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const initialMethod = location.state?.method === 'upi' ? 'upi' : (location.state?.method === 'card' ? 'card' : 'upi');
  const customerForm = location.state?.customer;
  const [method, setMethod] = useState<'upi' | 'card'>(initialMethod);
  const [upiId, setUpiId] = useState('');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const navigate = useNavigate();
  const { items: cartItems, clearCart } = useCart();

  // Get order amount from state
  const orderAmount = location.state?.amount ? Number(location.state.amount) : 0;

  // Generate UPI QR string
  const upiString = `upi://pay?pa=${MERCHANT_UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${orderAmount}&cu=INR`;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    // Use customer data from checkout
    const customerId = customerForm?.phone ? `CUST-${customerForm.phone}` : `CUST-${Date.now()}`;
    const orderId = `ORD-${Date.now()}`;
    const customer = {
      id: customerId,
      name: customerForm ? `${customerForm.firstName} ${customerForm.lastName}` : 'Guest User',
      email: customerForm?.email || '',
      phone: customerForm?.phone || '',
      address: {
        street: customerForm?.address || '',
        city: customerForm?.city || '',
        state: customerForm?.state || '',
        zipCode: customerForm?.pinCode || ''
      },
      totalSpent: orderAmount,
      totalOrders: 1
    };
    const order = {
      id: orderId,
      customerId: customerId,
      customerName: customer.name,
      date: new Date().toISOString().slice(0, 10),
      total: orderAmount,
      status: 'Pending',
      items: cartItems.map(item => ({
        id: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      }))
    };
    try {
      await fetch('http://localhost:4000/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
      });
      await fetch('http://localhost:4000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      clearCart();
    } catch (err) {
      // Optionally handle error
    }
    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Payment</h2>
        {/* Only show method switcher if method is not pre-selected */}
        {location.state?.method === undefined && (
          <div className="mb-6 flex justify-center gap-4">
            <button
              className={`px-4 py-2 rounded-lg font-semibold border ${method === 'upi' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setMethod('upi')}
            >
              UPI
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold border ${method === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setMethod('card')}
            >
              Credit/Debit Card
            </button>
          </div>
        )}
        <form onSubmit={handlePayment}>
          {method === 'upi' && (
            <div className="mb-4">
              <label className="block font-semibold mb-1">UPI ID</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="example@upi"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-gray-200 px-3 py-2 rounded text-sm font-semibold"
                  onClick={() => setShowScanner(s => !s)}
                >
                  {showScanner ? 'Hide Scanner' : 'Scan QR'}
                </button>
              </div>
              {showScanner && (
                <div className="mb-2" style={{ width: '100%' }}>
                  <QrReader
                    constraints={{ facingMode: 'environment' }}
                    onResult={(result: any, error: any) => {
                      if (!!result) {
                        setUpiId(result.getText());
                        setShowScanner(false);
                      }
                    }}
                  />
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Enter your valid UPI ID (e.g., yourname@upi) or scan a UPI QR code.</p>
              <div className="mt-4 flex flex-col items-center">
                <span className="font-semibold mb-2">Or scan to pay:</span>
                <QRCode value={upiString} size={160} />
                <p className="text-xs text-gray-500 mt-2">Scan this QR with your UPI app to pay ₹{orderAmount.toFixed(2)}</p>
              </div>
            </div>
          )}
          {method === 'card' && (
            <div className="space-y-4 mb-4">
              <div>
                <label className="block font-semibold mb-1">Card Number</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="1234 5678 9012 3456"
                  value={card.number}
                  onChange={e => setCard({ ...card, number: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Cardholder Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Name on Card"
                  value={card.name}
                  onChange={e => setCard({ ...card, name: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block font-semibold mb-1">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    placeholder="MM/YY"
                    value={card.expiry}
                    onChange={e => setCard({ ...card, expiry: e.target.value })}
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold mb-1">CVV</label>
                  <input
                    type="password"
                    className="w-full border rounded px-3 py-2"
                    placeholder="123"
                    value={card.cvv}
                    onChange={e => setCard({ ...card, cvv: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Amount to Pay:</span>
              <span className="text-xl font-bold text-blue-700">₹{orderAmount.toFixed(2)}</span>
            </div>
          </div>
          {error && <div className="text-red-600 mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg mt-2 transition-colors"
            disabled={processing}
          >
            {processing ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4 text-center">
          Payments are processed securely as per Indian banking standards. No card or UPI details are stored.
        </p>
      </div>
      {showThankYou && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Thank you for your purchase!</h2>
            <p className="text-lg text-gray-700">You will be redirected to the home page.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage; 