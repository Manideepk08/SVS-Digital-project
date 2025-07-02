import { Product } from '../types';

export const products: Product[] = [
  // Business Essentials
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
  {
    id: '4',
    slug: 'bill-books',
    name: 'Bill Books',
    description: 'Custom bill books with company details and numbering',
    price: 0,
    category: 'Business Essentials',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=500&q=60',
    features: ['Carbonless copies', 'Custom numbering', 'Company branding', 'Professional binding', 'GST compliant format'],
    customizable: true,
    customQuote: true,
    deliveryTime: '3-5 days',
    minQuantity: 1,
    unit: 'per book'
  },
  {
    id: '5',
    slug: 'corporate-brochures',
    name: 'Corporate Brochures',
    description: 'High-quality brochures for marketing and business promotion',
    price: 1500,
    category: 'Business Essentials',
    image: 'https://5.imimg.com/data5/WZ/XC/YB/SELLER-10839501/brochure-printing-services.jpg',
    features: ['Premium 170 GSM paper', 'Full-color printing', 'Tri-fold/Bi-fold options', 'Professional design', 'Bulk discounts'],
    customizable: true,
    deliveryTime: '2-3 days',
    minQuantity: 100,
    unit: '100 pieces'
  },

  // Promotional Items
  {
    id: '6',
    slug: 'custom-t-shirts',
    name: 'Custom T-Shirts',
    description: 'Premium quality t-shirts with custom printing and designs',
    price: 499,
    category: 'Promotional Items',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60',
    features: ['100% cotton fabric', 'Vibrant screen printing', 'Multiple sizes available', 'Custom designs', 'Bulk order discounts'],
    customizable: true,
    bestSeller: true,
    deliveryTime: '3-5 days',
    minQuantity: 10,
    unit: 'per piece',
    priceRange: 'From ₹499'
  },
  {
    id: '7',
    slug: 'photo-mugs',
    name: 'Photo Mugs',
    description: 'Personalized ceramic mugs with photo printing',
    price: 299,
    category: 'Promotional Items',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=500&q=60',
    features: ['Ceramic material', 'Photo quality printing', 'Dishwasher safe', 'Gift box packaging', 'Custom text options'],
    customizable: true,
    deliveryTime: '24-48 hours',
    minQuantity: 1,
    unit: 'per piece',
    priceRange: 'From ₹299'
  },
  {
    id: '8',
    slug: 'branded-pens',
    name: 'Branded Pens',
    description: 'Custom branded pens for corporate gifting and promotions',
    price: 15,
    category: 'Promotional Items',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=500&q=60',
    features: ['Smooth writing', 'Company logo printing', 'Multiple colors', 'Bulk quantities', 'Cost-effective branding'],
    customizable: true,
    deliveryTime: '2-3 days',
    minQuantity: 100,
    unit: 'per piece',
    priceRange: 'From ₹15'
  },
  {
    id: '9',
    slug: 'lanyards-with-tags',
    name: 'Lanyards with Tags',
    description: 'Custom lanyards with ID card holders for events and offices',
    price: 40,
    category: 'Promotional Items',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=500&q=60',
    features: ['Durable polyester material', 'Custom printing', 'Metal/plastic clips', 'ID card holder included', 'Event branding'],
    customizable: true,
    deliveryTime: '3-4 days',
    minQuantity: 50,
    unit: 'per piece',
    priceRange: 'From ₹40'
  },
  {
    id: '10',
    slug: 'custom-keychains',
    name: 'Custom Keychains',
    description: 'Personalized keychains in various materials and designs',
    price: 75,
    category: 'Promotional Items',
    image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=500&q=60',
    features: ['Multiple material options', 'Custom shapes available', 'Photo/logo printing', 'Durable construction', 'Gift packaging'],
    customizable: true,
    deliveryTime: '2-3 days',
    minQuantity: 25,
    unit: 'per piece',
    priceRange: 'From ₹75'
  },

  // Academic Solutions
  {
    id: '11',
    slug: 'school-diaries',
    name: 'School Diaries',
    description: 'Custom school diaries with academic calendar and school branding',
    price: 0,
    category: 'Academic Solutions',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=60',
    features: ['Academic year calendar', 'School logo & details', 'Quality binding', 'Student information pages', 'Durable cover'],
    customizable: true,
    customQuote: true,
    deliveryTime: '5-7 days',
    minQuantity: 100,
    unit: 'per diary',
    priceText: 'Price on request'
  },
  {
    id: '12',
    slug: 'report-cards',
    name: 'Report Cards',
    description: 'Professional report cards with school branding and security features',
    price: 25,
    category: 'Academic Solutions',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=60',
    features: ['Security paper', 'School logo printing', 'Grade templates', 'Professional design', 'Bulk pricing'],
    customizable: true,
    deliveryTime: '2-3 days',
    minQuantity: 100,
    unit: 'per piece',
    priceRange: 'From ₹25'
  },
  {
    id: '13',
    slug: 'certificates',
    name: 'Certificates',
    description: 'Award certificates for academic and professional recognition',
    price: 40,
    category: 'Academic Solutions',
    image: 'https://www.eprinton.in/wp-content/uploads/2022/08/Certificate-Printing_coimbatore.jpg',
    features: ['Premium certificate paper', 'Gold foil options', 'Custom designs', 'Professional templates', 'Bulk discounts'],
    customizable: true,
    deliveryTime: '24-48 hours',
    minQuantity: 10,
    unit: 'per piece',
    priceRange: 'From ₹40'
  },
  {
    id: '14',
    slug: 'academic-calendars',
    name: 'Academic Calendars',
    description: 'Custom academic calendars for schools and educational institutions',
    price: 150,
    category: 'Academic Solutions',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=500&q=60',
    features: ['Academic year layout', 'Holiday markings', 'School events', 'Quality printing', 'Wall/desk options'],
    customizable: true,
    deliveryTime: '3-5 days',
    minQuantity: 50,
    unit: 'per calendar',
    priceRange: 'From ₹150'
  },

  // Special Events
  {
    id: '15',
    name: 'Wedding Cards',
    description: 'Elegant wedding invitation cards with traditional and modern designs',
    price: 40,
    originalPrice: 60,
    category: 'Special Events',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=500&q=60',
    features: ['Premium cardstock', 'Traditional Indian designs', 'Gold foil options', 'Custom text in multiple languages', 'Matching envelopes'],
    customizable: true,
    bestSeller: true,
    deliveryTime: '3-5 days',
    minQuantity: 100,
    unit: 'per piece',
    priceRange: 'From ₹40'
  },
  {
    id: '16',
    name: 'Event Invitations',
    description: 'Custom invitations for all special occasions and corporate events',
    price: 0,
    category: 'Special Events',
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=500&q=60',
    features: ['Custom designs', 'Multiple formats', 'Premium paper options', 'RSVP cards', 'Envelope printing'],
    customizable: true,
    customQuote: true,
    deliveryTime: '2-4 days',
    minQuantity: 50,
    unit: 'per piece',
    priceText: 'Custom quote'
  },
  {
    id: '17',
    name: 'Photo Prints',
    description: 'High-quality photo prints in various sizes with professional finishing',
    price: 15,
    category: 'Special Events',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=60',
    features: ['Professional photo paper', 'Multiple sizes (4x6 to A3)', 'Matte/Glossy finish', 'Color correction', 'Same day printing'],
    customizable: true,
    deliveryTime: '2-4 hours',
    minQuantity: 1,
    unit: 'per print',
    priceRange: 'From ₹15'
  },
  {
    id: '18',
    name: 'Event Badges',
    description: 'Custom badges for conferences, events, and identification',
    price: 30,
    category: 'Special Events',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=500&q=60',
    features: ['Durable materials', 'Custom designs', 'Photo printing', 'Pin/clip attachments', 'Event branding'],
    customizable: true,
    deliveryTime: '24-48 hours',
    minQuantity: 25,
    unit: 'per piece',
    priceRange: 'From ₹30'
  },

  // Marketing Materials
  {
    id: '19',
    name: 'Custom Stickers',
    description: 'Vinyl stickers for branding, promotions, and decorative purposes',
    price: 200,
    category: 'Marketing Materials',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=500&q=60',
    features: ['Waterproof vinyl', 'Custom shapes & sizes', 'Vibrant colors', 'Bulk quantities', 'Indoor/outdoor use'],
    customizable: true,
    deliveryTime: '2-3 days',
    minQuantity: 1,
    unit: 'per sheet',
    priceRange: '₹200/sheet'
  },
  {
    id: '20',
    name: 'Pamphlets',
    description: 'Marketing pamphlets and flyers for business promotion',
    price: 2,
    category: 'Marketing Materials',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=500&q=60',
    features: ['A4/A5 sizes', 'Full-color printing', 'Quality paper', 'Bulk pricing', 'Fast turnaround'],
    customizable: true,
    deliveryTime: '24-48 hours',
    minQuantity: 500,
    unit: 'per piece',
    priceRange: 'From ₹2'
  },
  {
    id: '21',
    name: 'Booklets',
    description: 'Multi-page booklets for catalogs, manuals, and presentations',
    price: 0,
    category: 'Marketing Materials',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=500&q=60',
    features: ['Professional binding', 'Multiple page counts', 'Full-color printing', 'Custom sizes', 'Bulk discounts'],
    customizable: true,
    customQuote: true,
    deliveryTime: '3-5 days',
    minQuantity: 25,
    unit: 'per booklet',
    priceText: 'Custom quote'
  },
  {
    id: '22',
    name: 'Product Photography',
    description: 'Professional product photography services for e-commerce and marketing',
    price: 1000,
    category: 'Marketing Materials',
    image: 'https://images.unsplash.com/photo-1606107557309-065aa4d4ac96?auto=format&fit=crop&w=500&q=60',
    features: ['Professional lighting setup', 'High-resolution images', 'Multiple angles', 'Background options', 'Quick delivery'],
    customizable: true,
    deliveryTime: '24-48 hours',
    minQuantity: 1,
    unit: 'per hour',
    priceRange: '₹1,000/hour'
  }
];

// Helper function to format Indian currency
export const formatIndianPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Categories for filtering
export const categories = [
  'All',
  'Business Essentials',
  'Promotional Items', 
  'Academic Solutions',
  'Special Events',
  'Marketing Materials'
];

// Best seller products
export const bestSellerProducts = products.filter(product => product.bestSeller);

// Custom quote products
export const customQuoteProducts = products.filter(product => product.customQuote);