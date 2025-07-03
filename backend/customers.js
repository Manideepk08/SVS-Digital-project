const express = require('express');
const router = express.Router();
const Customer = require('./models/Customer');

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// Add a new customer or update existing
router.post('/', async (req, res) => {
  try {
    const { id, phone, totalSpent, totalOrders, ...rest } = req.body;
    let customer = await Customer.findOne({ id });
    if (customer) {
      // Update totals if customer exists
      customer.totalSpent += totalSpent;
      customer.totalOrders += totalOrders;
      await customer.save();
      res.status(200).json(customer);
    } else {
      // Create new customer
      customer = new Customer({ id, phone, totalSpent, totalOrders, ...rest });
      await customer.save();
      res.status(201).json(customer);
    }
  } catch (err) {
    res.status(400).json({ error: 'Failed to add/update customer' });
  }
});

// DELETE a customer by id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Customer.deleteOne({ id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete customer' });
  }
});

module.exports = router; 