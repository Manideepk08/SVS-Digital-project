import React, { createContext, useContext, useEffect, useState } from "react";

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
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  deliveryTime?: string;
  category?: string;
  bestSeller?: boolean;
  image: string; // base64
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

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) setProducts(JSON.parse(stored));
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