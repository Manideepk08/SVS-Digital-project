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
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const [section, key] = name.split('.');

    if (section === 'payment' && key === 'gateways') {
      const gatewayName = e.target.dataset.gateway as string;
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
      <div className="space-y-8">
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
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-md shadow-sm hover:opacity-90"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 