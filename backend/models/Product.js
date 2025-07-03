const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: String,
  slug: String,
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: String,
  image: String,
  images: [String],
  features: [String],
  customizable: Boolean,
  bestSeller: Boolean,
  deliveryTime: String,
  minQuantity: Number,
  unit: String,
  customQuote: Boolean,
  priceRange: String,
  priceText: String,
  quantityOptions: [
    {
      qty: Number,
      price: Number
    }
  ],
  customizationOptions: [
    {
      label: String,
      type: String,
      options: [String]
    }
  ],
  whatsappNumber: String,
  designLink: String
});

module.exports = mongoose.model('Product', productSchema); 