const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  totalSpent: { type: Number, default: 0 },
  totalOrders: { type: Number, default: 0 }
});

module.exports = mongoose.model('Customer', customerSchema); 