import React, { useState, useMemo, useEffect } from 'react';
// import { customers as initialCustomers, Customer } from '../../data/customers';
import { Customer } from '../../data/customers';
// import { orders as allOrders, Order } from '../../data/orders';
import { products } from '../../data/products';

export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: string;
  items: { id: string; name: string; quantity: number; price: number }[];
}

const OrderDetailsModal = ({ order, onClose }: { order: Order; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-stretch justify-stretch">
    <div className="bg-white w-full h-full flex flex-col justify-center items-center p-0 m-0 rounded-none shadow-none">
      <div className="w-full max-w-3xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Details - {order.id}</h2>
        <div className="mb-4"><span className="font-semibold">Customer Name:</span> {order.customerName}</div>
        <div className="mb-4"><span className="font-semibold">Order Date:</span> {order.date}</div>
        <div className="mb-4"><span className="font-semibold">Total:</span> ₹{order.total.toFixed(2)}</div>
        <div className="mb-4"><span className="font-semibold">Status:</span> {order.status}</div>
        <div className="mb-4">
          <span className="font-semibold">Items Ordered:</span>
          <ul className="list-disc list-inside ml-4 mt-1">
            {order.items.map(item => {
              const product = products.find(p => p.id === item.id);
              return (
                <li key={item.id} className="flex items-center gap-4 mb-2">
                  {product && (
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded border" />
                  )}
                  <div>
                    <div className="font-semibold">{product ? product.name : item.name}</div>
                    <div className="text-sm text-gray-600">{item.quantity} x ₹{item.price.toFixed(2)}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <button onClick={onClose} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">Close</button>
      </div>
    </div>
  </div>
);

const EditCustomerModal = ({ customer, onClose, onSave, orders }: { customer: Customer | null; onClose: () => void; onSave: (customer: Customer) => void; orders: Order[] }) => {
  const [formData, setFormData] = useState<Customer | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const customerOrders = useMemo(() => {
    if (!customer) return [];
    return orders.filter(order => order.customerName === customer.name);
  }, [customer, orders]);

  useEffect(() => {
    setFormData(customer);
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
       if (name.startsWith('address.')) {
        const field = name.split('.')[1] as keyof Customer['address'];
        setFormData({
          ...formData,
          address: { ...formData.address, [field]: value },
        });
      } else {
        setFormData({ ...formData, [name as keyof Customer]: value });
      }
    }
  };

  if (!customer || !formData) return null;
  return (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-stretch justify-stretch">
    <div className="bg-white w-full h-full flex flex-col justify-center items-center p-0 m-0 rounded-none shadow-none">
      <div className="w-full max-w-4xl p-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Customer Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 items-start">
          {/* Left: Customer Details */}
          <div className="space-y-4">
            <div><label className="font-semibold text-sm">Name:</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-1 rounded w-full text-sm" readOnly={!isEditing}/></div>
            <div><label className="font-semibold text-sm">Email:</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-1 rounded w-full text-sm" readOnly={!isEditing}/></div>
            <div><label className="font-semibold text-sm">Phone:</label><input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border p-1 rounded w-full text-sm" readOnly={!isEditing}/></div>
            <div><label className="font-semibold text-sm">Street:</label><input type="text" name="address.street" value={formData.address.street} onChange={handleChange} className="border p-1 rounded w-full text-sm" readOnly={!isEditing}/></div>
            <div className="grid grid-cols-3 gap-2">
              <div><label className="font-semibold text-sm">City:</label><input type="text" name="address.city" value={formData.address.city} onChange={handleChange} className="border p-1 rounded w-full text-sm" readOnly={!isEditing}/></div>
              <div><label className="font-semibold text-sm">State:</label><input type="text" name="address.state" value={formData.address.state} onChange={handleChange} className="border p-1 rounded w-full text-sm" readOnly={!isEditing}/></div>
              <div><label className="font-semibold text-sm">Zip Code:</label><input type="text" name="address.zipCode" value={formData.address.zipCode} onChange={handleChange} className="border p-1 rounded w-full text-sm" readOnly={!isEditing}/></div>
            </div>
          </div>
          {/* Right: Order History */}
          <div className="mt-0">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Order History</h3>
            {customerOrders.length > 0 ? (
              <div className="max-h-96 overflow-y-auto border rounded-lg mt-2 bg-white">
                <table className="min-w-full text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 py-1 text-left font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                      <th className="px-2 py-1 text-left font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="px-2 py-1 text-left font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                      <th className="px-2 py-1 text-left font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {customerOrders.map(order => (
                      <React.Fragment key={order.id}>
                        <tr>
                          <td className="px-2 py-1 border-b">
                            <button
                              className="text-blue-700 underline hover:text-blue-900 cursor-pointer"
                              onClick={() => { setSelectedOrder(order); setShowOrderModal(true); }}
                            >
                              {order.id}
                            </button>
                          </td>
                          <td className="px-2 py-1 border-b">{order.date}</td>
                          <td className="px-2 py-1 border-b">₹{order.total.toFixed(2)}</td>
                          <td className="px-2 py-1 border-b">{order.status}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
                {showOrderModal && selectedOrder && (
                  <OrderDetailsModal order={selectedOrder} onClose={() => setShowOrderModal(false)} />
                )}
              </div>
            ) : (
              <p className="text-xs">No orders found for this customer.</p>
            )}
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded text-lg">
            Cancel
          </button>
          {isEditing ? (
            <button onClick={() => { onSave(formData); setIsEditing(false); }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-lg">
              Save
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-lg">
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
  )
};

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Customer; direction: string } | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [segment, setSegment] = useState<'All' | 'HighSpenders' | 'FrequentBuyers' | 'Inactive'>('All');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/customers')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(() => setCustomers([]));
    fetch('http://localhost:4000/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(() => setOrders([]));
  }, []);

  // Helper: get last order date for a customer
  const getLastOrderDate = (customer: Customer) => {
    const customerOrders = orders.filter(order => order.customerName === customer.name);
    if (customerOrders.length === 0) return null;
    return customerOrders.map(o => o.date).sort().reverse()[0];
  };

  // Segmentation logic
  const segmentedCustomers = useMemo(() => {
    const now = new Date();
    return customers.filter(customer => {
      if (segment === 'HighSpenders') return customer.totalSpent > 2000;
      if (segment === 'FrequentBuyers') return customer.totalOrders > 5;
      if (segment === 'Inactive') {
        const lastOrder = getLastOrderDate(customer);
        if (!lastOrder) return true;
        const diff = (now.getTime() - new Date(lastOrder).getTime()) / (1000 * 60 * 60 * 24);
        return diff > 90;
      }
      return true;
    });
  }, [customers, segment, orders]);

  const sortedAndFilteredCustomers = useMemo(() => {
    let filteredCustomers = segmentedCustomers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortConfig) {
      filteredCustomers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredCustomers;
  }, [segmentedCustomers, searchTerm, sortConfig]);

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const handleSaveCustomer = (updatedCustomer: Customer) => {
    setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    handleCloseModal();
  };

  const handleDeleteCustomer = async (id: string) => {
    if(window.confirm('Are you sure you want to delete this customer?')) {
      try {
        const res = await fetch(`http://localhost:4000/customers/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setCustomers(customers.filter(customer => customer.id !== id));
        } else {
          alert('Failed to delete customer from server.');
        }
      } catch (err) {
        alert('Error deleting customer.');
      }
    }
  };
  
  const requestSort = (key: keyof Customer) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIndicator = (key: keyof Customer) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Customers Management</h1>

      {/* Segmentation Bar */}
      <div className="flex space-x-2 mb-4">
        <button onClick={() => setSegment('All')} className={`px-4 py-2 rounded ${segment==='All' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>All</button>
        <button onClick={() => setSegment('HighSpenders')} className={`px-4 py-2 rounded ${segment==='HighSpenders' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>High Spenders</button>
        <button onClick={() => setSegment('FrequentBuyers')} className={`px-4 py-2 rounded ${segment==='FrequentBuyers' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Frequent Buyers</button>
        <button onClick={() => setSegment('Inactive')} className={`px-4 py-2 rounded ${segment==='Inactive' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Inactive</button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <button onClick={() => requestSort('id')} className="font-semibold">Customer ID{getSortIndicator('id')}</button>
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                 <button onClick={() => requestSort('name')} className="font-semibold">Name{getSortIndicator('name')}</button>
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                 <button onClick={() => requestSort('email')} className="font-semibold">Email{getSortIndicator('email')}</button>
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                 <button onClick={() => requestSort('totalSpent')} className="font-semibold">Total Spent{getSortIndicator('totalSpent')}</button>
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <button
                    onClick={() => handleEditCustomer(customer)}
                    className="text-blue-700 underline hover:text-blue-900 cursor-pointer"
                    title="View/Edit Customer"
                  >
                    {customer.id}
                  </button>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{customer.name}</p>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{customer.email}</p>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">₹{customer.totalSpent.toFixed(2)}</p>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <button 
                    onClick={() => handleDeleteCustomer(customer.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <EditCustomerModal customer={editingCustomer} onClose={handleCloseModal} onSave={handleSaveCustomer} orders={orders} />
      )}
    </div>
  );
};

export default CustomersPage; 