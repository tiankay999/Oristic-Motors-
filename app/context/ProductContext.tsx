'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts, Product } from '../lib/data';

interface ProductContextType {
    products: Product[];
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>(initialProducts);

    // Load products from local storage on mount
    useEffect(() => {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        }
    }, []);

    // Save products to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const addProduct = (product: Omit<Product, 'id'>) => {
        const newProduct: Product = {
            ...product,
            id: Date.now().toString(),
        };
        setProducts((prev) => [...prev, newProduct]);
    };

    const updateProduct = (id: string, updates: Partial<Product>) => {
        setProducts((prev) =>
            prev.map((product) =>
                product.id === id ? { ...product, ...updates } : product
            )
        );
    };

    const deleteProduct = (id: string) => {
        setProducts((prev) => prev.filter((product) => product.id !== id));
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                addProduct,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}
