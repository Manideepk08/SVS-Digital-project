import React, { useState } from 'react';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    general: {
      siteName: 'SVS Digitals',
      supportEmail: 'support@svsdigitals.com',
    },
    payment: {
      currency: 'USD',
      gateways: {
        stripe: true,
        paypal: false,
      },
    },
    shipping: {
      defaultRate: 5.00,
      freeShippingThreshold: 50.00,
    },
    contact: {
      phone: '97000 00451',
      email: 'venkatesh451@gmail.com',
      address: 'Colony Lanco Hills Road\nShaikpet, Hyderabad',
      businessHours: 'Monday - Saturday: 9:00 AM - 8:00 PM\nSunday: 10:00 AM - 6:00 PM',
      shop: 'SVS Digitals\nShaikpet, Hyderabad',
    },
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const [section, key] = name.split('.');
    if (section === 'payment' && key === 'gateways') {
      const gatewayName = (e.target as HTMLInputElement).dataset.gateway as string;
      setSettings(prev => ({
        ...prev,
        payment: {
          ...prev.payment,
          gateways: {
            ...prev.payment.gateways,
            [gatewayName]: checked,
          },
        },
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [key]: type === 'checkbox' ? checked : value,
        },
      }));
    }
  };
  
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const [section, key] = name.split('.');
     setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [key]: value,
        },
      }));
  };


  const handleSave = () => {
    // Here you would typically send the settings to your backend
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <div className="mt-4 md:mt-0">
          {isEditing ? (
            <button 
              onClick={() => { handleSave(); setIsEditing(false); }}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-md shadow-sm hover:opacity-90"
            >
              Save Settings
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-md shadow-sm hover:opacity-90"
            >
              Edit
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* General Settings */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">General</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">Site Name</label>
              <input 
                type="text" 
                id="siteName"
                name="general.siteName"
                value={settings.general.siteName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700">Support Email</label>
              <input 
                type="email" 
                id="supportEmail"
                name="general.supportEmail"
                value={settings.general.supportEmail}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                readOnly={!isEditing}
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Payment</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
              <select 
                id="currency"
                name="payment.currency"
                value={settings.payment.currency}
                onChange={handleSelectChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                disabled={!isEditing}
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>INR</option>
              </select>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-700">Payment Gateways</span>
              <div className="mt-2 space-y-2">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="payment.gateways"
                    data-gateway="stripe"
                    checked={settings.payment.gateways.stripe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    disabled={!isEditing}
                  />
                  <span className="ml-2 text-sm text-gray-600">Stripe</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="payment.gateways"
                    data-gateway="paypal"
                    checked={settings.payment.gateways.paypal}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    disabled={!isEditing}
                  />
                  <span className="ml-2 text-sm text-gray-600">PayPal</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Settings */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Shipping</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="defaultRate" className="block text-sm font-medium text-gray-700">Default Shipping Rate ($)</label>
               <input 
                type="number" 
                id="defaultRate"
                name="shipping.defaultRate"
                value={settings.shipping.defaultRate}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="freeShippingThreshold" className="block text-sm font-medium text-gray-700">Free Shipping Threshold ($)</label>
              <input 
                type="number" 
                id="freeShippingThreshold"
                name="shipping.freeShippingThreshold"
                value={settings.shipping.freeShippingThreshold}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                readOnly={!isEditing}
              />
            </div>
          </div>
        </div>

        {/* Contact and Address Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact and Address</h2>
          <div className="space-y-4 text-gray-800 text-base">
            <div>
              <span className="font-semibold">Phone</span><br />
              <input
                type="text"
                name="contact.phone"
                value={settings.contact.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                readOnly={!isEditing}
              />
              <div className="text-sm text-gray-500">Call us for immediate assistance</div>
            </div>
            <div>
              <span className="font-semibold">Email</span><br />
              <input
                type="email"
                name="contact.email"
                value={settings.contact.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                readOnly={!isEditing}
              />
              <div className="text-sm text-gray-500">We'll respond within 24 hours</div>
            </div>
            <div>
              <span className="font-semibold">Address</span><br />
              <textarea
                name="contact.address"
                value={settings.contact.address}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={2}
                readOnly={!isEditing}
              />
              <div className="text-sm text-gray-500">Visit our shop for personalized service</div>
            </div>
            <div>
              <span className="font-semibold">Business Hours</span><br />
              <textarea
                name="contact.businessHours"
                value={settings.contact.businessHours}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={2}
                readOnly={!isEditing}
              />
            </div>
            <div>
              <span className="font-semibold">SVS Digitals</span><br />
              <textarea
                name="contact.shop"
                value={settings.contact.shop}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={2}
                readOnly={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 