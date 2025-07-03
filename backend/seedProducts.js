const mongoose = require('mongoose');
const Product = require('./models/Product');

// Replace <your_password> with your actual password
const MONGODB_URI = 'mongodb+srv://tejabonala1123:EFkDeXBq9ioo0IwC@cluster0.wbvwqky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const sampleProducts = [
  {
    id: '1',
    slug: 'business-cards',
    name: 'Business Cards',
    description: 'Professional business cards with premium finishes - Single side printing',
    price: 350,
    originalPrice: 450,
    category: 'Business Essentials',
    image: 'https://cms.cloudinary.vpsvc.com/image/upload/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/India%20LOB/visiting-cards/Standard%20Visiting%20Cards/IN_Standard-Visiting-Cards_Hero-image_01',
    features: ['High-quality 300 GSM cardstock', 'Full-color printing', 'Matte/Glossy finish options', 'Custom design included', 'Free sample preview'],
    customizable: true,
    bestSeller: true,
    deliveryTime: '24-48 hours',
    minQuantity: 100,
    unit: '100 cards'
  },
  {
    id: '2',
    slug: 'id-cards-pvc',
    name: 'ID Cards (PVC)',
    description: 'Durable PVC ID cards with photo printing and custom design',
    price: 75,
    category: 'Business Essentials',
    image: 'https://images.unsplash.com/photo-1593510987046-1f8fcfc512a0?auto=format&fit=crop&w=500&q=60',
    features: ['Waterproof PVC material', 'Photo quality printing', 'Rounded corners', 'Lanyard hole option', 'Scratch resistant'],
    customizable: true,
    deliveryTime: '2-3 days',
    minQuantity: 1,
    unit: 'per piece'
  },
  {
    id: '3',
    slug: 'letterheads',
    name: 'Letterheads',
    description: 'Professional letterheads for business correspondence',
    price: 600,
    category: 'Business Essentials',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=500&q=60',
    features: ['Premium 80 GSM paper', 'Professional design', 'Company logo & details', 'Watermark options', 'Bulk pricing available'],
    customizable: true,
    deliveryTime: '24-48 hours',
    minQuantity: 100,
    unit: '100 sheets'
  },
  // ... (copy the rest of your sample products here)
];

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Product.deleteMany({}); // Optional: clear existing products
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  }); 