'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts, Product } from '../lib/data';

interface ProductContextType {
    products: Product[];
    addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
    updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    isLoading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch products from API on mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (response.ok) {
                const data = await response.json();
                // Validate that data is an array before setting
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error('API returned non-array data:', data);
                    setProducts(initialProducts);
                }
            } else {
                // Fallback to initial products if API fails
                console.error('API response not OK:', response.status);
                setProducts(initialProducts);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts(initialProducts);
        } finally {
            setIsLoading(false);
        }
    };

    const addProduct = async (product: Omit<Product, 'id'>) => {
        const newProduct: Product = {
            ...product,
            id: Date.now().toString(),
        };

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                // Refresh products from server
                await fetchProducts();
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const updateProduct = async (id: string, updates: Partial<Product>) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });

            if (response.ok) {
                // Refresh products from server
                await fetchProducts();
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Refresh products from server
                await fetchProducts();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                addProduct,
                updateProduct,
                deleteProduct,
                isLoading,
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
