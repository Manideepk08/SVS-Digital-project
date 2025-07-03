const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const productsRouter = require('./products');
const ordersRouter = require('./orders');
const customersRouter = require('./customers');

const app = express();
app.use(cors());
app.use(express.json({ limit: '40mb' }));

// Connect to MongoDB Atlas
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/customers', customersRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
}); 