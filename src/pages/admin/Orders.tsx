import React, { useState, useMemo } from 'react';
import { orders as initialOrders, Order } from '../../data/orders';
import { customers } from '../../data/customers';

const OrderDetailsModal = ({ order, onClose }: { order: Order; onClose: () => void; onStatusChange: (orderId: string, newStatus: Order['status']) => void; }) => {
  const customer = customers.find(c => c.name === order.customerName);
  const isDelivered = order.status === 'Completed';
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-stretch justify-stretch">
      <div className="bg-white w-full h-full flex flex-col justify-center items-center p-0 m-0 rounded-none shadow-none">
        <div className="w-full max-w-5xl p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Order Details - {order.id}</h2>
          <div className="grid grid-cols-2 gap-8">
            <div><p className="font-semibold">Customer Name:</p> {customer?.name || order.customerName}</div>
            <div><p className="font-semibold">Order Date:</p> {order.date}</div>
            <div><p className="font-semibold">Phone:</p> {customer?.phone || '-'}</div>
            <div><p className="font-semibold">Email:</p> {customer?.email || '-'}</div>
            <div><p className="font-semibold">Total:</p> ₹{order.total.toFixed(2)}</div>
            <div>
              <p className="font-semibold">Status:</p>
              {isDelivered ? (
                <span className="px-3 py-1 rounded bg-green-200 text-green-800 font-semibold">Delivered</span>
              ) : (
                <span className="px-2 py-1 rounded bg-gray-200 text-gray-800">{order.status}</span>
              )}
            </div>
            {isDelivered && (
              <div><p className="font-semibold">Delivered Date:</p> {order.date}</div>
            )}
          </div>
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Items Ordered</h3>
            <ul className="list-disc list-inside text-lg">
              {order.items.map(item => (
                <li key={item.id} className="mb-2">{item.name} - {item.quantity} x ₹{item.price.toFixed(2)}</li>
              ))}
            </ul>
          </div>
          <button 
            onClick={onClose} 
            className="mt-10 bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Order; direction: string } | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Advanced filters
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    alert(`Order ${orderId} status updated to ${newStatus}`);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const sortedAndFilteredOrders = useMemo(() => {
    let filteredOrders = orders.filter(order => {
      // Full-text search across all fields
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        order.customerName.toLowerCase().includes(search) ||
        order.id.toLowerCase().includes(search) ||
        order.status.toLowerCase().includes(search) ||
        order.total.toString().includes(search) ||
        order.date.toLowerCase().includes(search);
      if (!matchesSearch) return false;
      // Status filter
      if (statusFilter !== 'All' && order.status !== statusFilter) return false;
      // Price range filter
      if (minPrice && order.total < parseFloat(minPrice)) return false;
      if (maxPrice && order.total > parseFloat(maxPrice)) return false;
      // Date range filter
      if (startDate && order.date < startDate) return false;
      if (endDate && order.date > endDate) return false;
      return true;
    });
    if (sortConfig) {
      filteredOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredOrders;
  }, [orders, searchTerm, sortConfig, statusFilter, minPrice, maxPrice, startDate, endDate]);

  const requestSort = (key: keyof Order) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIndicator = (key: keyof Order) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders Management</h1>
      
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search by any field..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md w-full md:w-1/4"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="p-2 border rounded-md w-full md:w-1/6"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="p-2 border rounded-md w-full md:w-1/6"
            min="0"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="p-2 border rounded-md w-full md:w-1/6"
            min="0"
          />
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="p-2 border rounded-md w-full md:w-1/6"
          />
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="p-2 border rounded-md w-full md:w-1/6"
          />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                 <button onClick={() => requestSort('id')} className="font-semibold">Order ID{getSortIndicator('id')}</button>
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                 <button onClick={() => requestSort('customerName')} className="font-semibold">Customer{getSortIndicator('customerName')}</button>
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                 <button onClick={() => requestSort('date')} className="font-semibold">Date{getSortIndicator('date')}</button>
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                 <button onClick={() => requestSort('total')} className="font-semibold">Total{getSortIndicator('total')}</button>
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                 <button onClick={() => requestSort('status')} className="font-semibold">Status{getSortIndicator('status')}</button>
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{order.id}</p>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{order.customerName}</p>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{order.date}</p>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">₹{order.total.toFixed(2)}</p>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                    className="p-1 rounded text-xs bg-white text-gray-800 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <button 
                    onClick={() => handleViewDetails(order)}
                    className="text-gradient bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent hover:opacity-90"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={handleCloseModal} onStatusChange={handleStatusChange} />
      )}
    </div>
  );
};

export default OrdersPage; 