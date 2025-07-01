import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiBox, FiUsers, FiShoppingBag, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { logout, currentUser } = useAuth();

  const linkClasses = "flex items-center px-4 py-2 mt-5 text-gray-100 rounded-lg hover:bg-blue-700";
  const activeLinkClasses = "bg-blue-700";

  return (
    <div className="w-64 bg-blue-600 text-white h-screen p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">SVS Digitals</h2>
        <div className="mb-10">
            <p className="text-sm text-gray-300">Welcome, {currentUser?.name}</p>
            <p className="text-xs text-gray-400">Role: {currentUser?.role}</p>
        </div>
      <nav>
        <NavLink to="/admin/dashboard" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <FiBox className="mr-3" /> Products
        </NavLink>
        <NavLink to="/admin/orders" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <FiShoppingBag className="mr-3" /> Orders
        </NavLink>
        <NavLink to="/admin/customers" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <FiUsers className="mr-3" /> Customers
        </NavLink>
        <NavLink to="/admin/categories" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <FiGrid className="mr-3" /> Categories
        </NavLink>
        <NavLink to="/admin/settings" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <FiSettings className="mr-3" /> Settings
        </NavLink>
      </nav>
      <div className="mt-auto">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          <FiLogOut className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 