import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard' },
  { name: 'Orders', path: '/admin/orders' },
  { name: 'Customers', path: '/admin/customers' },
  { name: 'Categories', path: '/admin/categories' },
  { name: 'Settings', path: '/admin/settings' },
];

const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col gap-4 justify-between min-h-screen">
        <div>
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl font-extrabold text-blue-600 tracking-wide">SVS <span className="text-green-500">Digitals</span></span>
          </div>
          <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-green-400 text-white p-4 rounded-lg shadow">Admin Panel</h2>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive ? 'bg-gradient-to-r from-blue-500 to-green-400 text-white' : 'text-gray-700 hover:bg-blue-100'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors text-left"
            >
              Log out
            </button>
          </nav>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout; 