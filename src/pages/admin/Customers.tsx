import React, { useState, useMemo, useEffect } from 'react';
import { customers as initialCustomers, Customer } from '../../data/customers';
import { orders as allOrders, Order } from '../../data/orders';

const EditCustomerModal = ({ customer, onClose, onSave, orders }: { customer: Customer | null; onClose: () => void; onSave: (customer: Customer) => void; orders: Order[] }) => {
  const [formData, setFormData] = useState<Customer | null>(null);
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
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
    <div className="bg-white p-4 rounded-lg shadow-2xl max-w-sm w-full">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Edit Customer</h2>
      <div className="space-y-2">
        <div><label className="font-semibold text-sm">Name:</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-1 rounded w-full text-sm"/></div>
        <div><label className="font-semibold text-sm">Email:</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-1 rounded w-full text-sm"/></div>
        <div><label className="font-semibold text-sm">Phone:</label><input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border p-1 rounded w-full text-sm"/></div>
        <div><label className="font-semibold text-sm">Street:</label><input type="text" name="address.street" value={formData.address.street} onChange={handleChange} className="border p-1 rounded w-full text-sm"/></div>
        <div><label className="font-semibold text-sm">City:</label><input type="text" name="address.city" value={formData.address.city} onChange={handleChange} className="border p-1 rounded w-full text-sm"/></div>
        <div><label className="font-semibold text-sm">State:</label><input type="text" name="address.state" value={formData.address.state} onChange={handleChange} className="border p-1 rounded w-full text-sm"/></div>
        <div><label className="font-semibold text-sm">Zip Code:</label><input type="text" name="address.zipCode" value={formData.address.zipCode} onChange={handleChange} className="border p-1 rounded w-full text-sm"/></div>
      </div>
      <div className="mt-4">
        <h3 className="text-base font-bold text-gray-700 mb-2">Order History</h3>
        {customerOrders.length > 0 ? (
          <div className="max-h-32 overflow-y-auto border rounded-lg mt-2">
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
                  <tr key={order.id}>
                    <td className="px-2 py-1 border-b">{order.id}</td>
                    <td className="px-2 py-1 border-b">{order.date}</td>
                    <td className="px-2 py-1 border-b">₹{order.total.toFixed(2)}</td>
                    <td className="px-2 py-1 border-b">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs">No orders found for this customer.</p>
        )}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded text-sm">
          Cancel
        </button>
        <button onClick={() => onSave(formData)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm">
          Save
        </button>
      </div>
    </div>
  </div>
  )
};

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Customer; direction: string } | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [segment, setSegment] = useState<'All' | 'HighSpenders' | 'FrequentBuyers' | 'Inactive'>('All');

  // Helper: get last order date for a customer
  const getLastOrderDate = (customer: Customer) => {
    const orders = allOrders.filter(order => order.customerName === customer.name);
    if (orders.length === 0) return null;
    return orders.map(o => o.date).sort().reverse()[0];
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
  }, [customers, segment, allOrders]);

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

  const handleDeleteCustomer = (id: string) => {
    // Add a confirmation dialog for better UX
    if(window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== id));
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
                  <p className="text-gray-900 whitespace-no-wrap">{customer.id}</p>
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
                    onClick={() => handleEditCustomer(customer)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
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
        <EditCustomerModal customer={editingCustomer} onClose={handleCloseModal} onSave={handleSaveCustomer} orders={allOrders} />
      )}
    </div>
  );
};

export default CustomersPage; 