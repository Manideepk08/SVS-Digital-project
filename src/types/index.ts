export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  features: string[];
  customizable?: boolean;
  bestSeller?: boolean;
  deliveryTime: string;
  minQuantity: number;
  unit: string;
  priceRange?: string;
  priceText?: string;
  customQuote?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customization?: {
    size?: string;
    paper?: string;
    finishing?: string;
    quantity?: number;
    customText?: string;
    designFile?: string;
  };
}

export interface CartContextType {
  items: CartItem[];
  total: number;
  itemCount: number;
  addItem: (product: Product, quantity?: number, customization?: CartItem['customization']) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}