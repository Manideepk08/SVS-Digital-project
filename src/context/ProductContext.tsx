import React, { createContext, useContext, useEffect, useState } from "react";
import { products as rawHardcodedProducts } from '../data/products';

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
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (slug: string) => void;
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

  // Load from localStorage and merge with hardcoded products on mount
  useEffect(() => {
    const stored = localStorage.getItem('products');
    let localProducts: Product[] = stored ? JSON.parse(stored) : [];
    // Merge hardcoded and localStorage products, avoiding duplicates by id
    const merged = [
      ...rawHardcodedProducts.filter(hp => !localProducts.some(lp => lp.id === hp.id)),
      ...localProducts
    ];
    // Ensure all hardcoded products conform to the local Product type (add slug if missing)
    const hardcodedProducts: Product[] = merged.map((p: any) => ({
      ...p,
      slug: p.slug || (p.name ? p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : ''),
      images: p.images || (p.image ? [p.image] : []),
    }));
    setProducts(hardcodedProducts);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => setProducts((prev) => [...prev, product]);
  const updateProduct = (product: Product) =>
    setProducts((prev) => prev.map((p) => (p.slug === product.slug ? product : p)));
  const deleteProduct = (slug: string) =>
    setProducts((prev) => prev.filter((p) => p.slug !== slug));
  const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, getProductBySlug }}
    >
      {children}
    </ProductContext.Provider>
  );
}; 