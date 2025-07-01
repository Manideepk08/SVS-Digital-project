import React from 'react';
import { Link } from 'react-router-dom';
import { Printer, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-green-500 p-2 rounded-lg">
                <Printer className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">SVS</span>
                <span className="text-2xl font-bold text-green-400">digitals</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-4">
              Professional printing and digital services for all your business and personal needs.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Business Cards</span></li>
              <li><span className="text-gray-400">Wedding Cards</span></li>
              <li><span className="text-gray-400">Photo Prints</span></li>
              <li><span className="text-gray-400">T-Shirt Printing</span></li>
              <li><span className="text-gray-400">Custom Mugs & Bottles</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-gray-400">97000 00451</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-gray-400">venkatesh451@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-gray-400">Colony Lanco Hills Road, Shaikpet, Hyderabad</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 SVS Digitals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}