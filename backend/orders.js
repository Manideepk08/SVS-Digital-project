const express = require('express');
const router = express.Router();
const Order = require('./models/Order');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Add a new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add order' });
  }
});

// Delete an order by id or _id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Attempting to delete order with id:', id);
    // Try by custom id field first
    let deleted = await Order.findOneAndDelete({ id });
    if (!deleted) {
      // Try by MongoDB _id
      deleted = await Order.findByIdAndDelete(id);
      if (deleted) {
        console.log('Deleted by _id:', id);
      }
    } else {
      console.log('Deleted by id field:', id);
    }
    if (deleted) {
      res.status(200).json({ message: 'Order deleted' });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

module.exports = router; 