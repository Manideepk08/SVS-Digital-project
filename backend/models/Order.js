const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: String,
  customerId: String,
  customerName: String,
  date: String,
  total: Number,
  status: String,
  items: [
    {
      id: String,
      name: String,
      quantity: Number,
      price: Number
    }
  ]
});

module.exports = mongoose.model('Order', orderSchema); 