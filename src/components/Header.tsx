import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Printer, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mobileOrEmail, setMobileOrEmail] = useState("");

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogin = () => {
    setLoginModalOpen(true);
    setShowPassword(false);
  };

  const handleCloseModal = () => {
    setLoginModalOpen(false);
    setShowPassword(false);
  };

  return (
    <header className="bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-green-500 p-2 rounded-lg">
              <Printer className="h-8 w-8 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900">SVS</span>
              <span className="text-2xl font-bold text-green-600">digitals</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-semibold transition-colors ${
                  isActive(item.href) ? 'text-blue-600 bg-blue-50' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 transition-colors focus:outline-none"
              onClick={handleLogin}
            >
              <User className="h-6 w-6" />
              <span className="font-semibold">Login / Signup</span>
            </button>
            {/* Login/Signup Modal */}
            {loginModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative animate-fade-in">
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                    onClick={handleCloseModal}
                  >
                    &times;
                  </button>
                  <div className="p-6 pt-8">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Login / Sign up</h2>
                    <div className="text-center font-semibold text-lg text-gray-700 mb-2">Login or Sign up via OTP</div>
                    <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email / Mobile number</label>
                        <input
                          type="text"
                          placeholder="Enter your email or mobile"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={mobileOrEmail}
                          onChange={e => setMobileOrEmail(e.target.value)}
                        />
                      </div>
                      {showPassword && (
                        <div className="transition-all duration-300">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                          <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}
                      {!showPassword && (
                        <div className="transition-all duration-300">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                          <input
                            type="text"
                            placeholder="Enter OTP (123456)"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength={6}
                          />
                        </div>
                      )}
                      <button
                        type="submit"
                        className="w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold rounded-md py-2 text-lg transition"
                      >
                        Continue
                      </button>
                    </form>
                    <div className="text-center mt-4">
                      <button
                        className="text-purple-800 hover:underline text-sm font-medium"
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                      >
                        {showPassword ? 'Login with OTP' : 'Login with password'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href) ? 'text-blue-600 bg-blue-50' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}