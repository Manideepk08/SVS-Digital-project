import React, { createContext, useContext, useEffect, useState } from "react";
// import { products as rawHardcodedProducts } from '../data/products';

export interface QuantityOption {
  qty: number;
  price: number;
}
export interface CustomizationOption {
  label: string;
  type: string;
  options?: string[];
}
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  deliveryTime?: string;
  category?: string;
  bestSeller?: boolean;
  image: string; // base64 (legacy)
  images?: string[]; // new, for multiple images
  quantityOptions?: QuantityOption[];
  customizationOptions?: CustomizationOption[];
  whatsappNumber?: string;
  designLink?: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => Promise<void>;
  getProductBySlug: (slug: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProductContext must be used within ProductProvider");
  return ctx;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from backend on mount
  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  const addProduct = async (product: Product) => {
    const res = await fetch('http://localhost:4000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (res.ok) {
      const newProduct = await res.json();
      setProducts(prev => [...prev, newProduct]);
    }
  };

  // updateProduct remains local for now
  const updateProduct = (product: Product) =>
    setProducts((prev) => prev.map((p) => (p.slug === product.slug ? product : p)));

  const deleteProduct = async (id: string) => {
    const res = await fetch(`http://localhost:4000/products/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, getProductBySlug }}
    >
      {children}
    </ProductContext.Provider>
  );
}; 