'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../lib/data';
import { useProducts } from './ProductContext';

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const { products } = useProducts();

    // Load cart from local storage on mount
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                setItems(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            // Optionally clear corrupted cart
            // localStorage.removeItem('cart');
        }
    }, []);

    // Save cart to local storage whenever it changes (with sanitization)
    useEffect(() => {
        try {
            // Sanitize items: remove large base64 images to prevent QuotaExceededError
            const itemsToSave = items.map(item => {
                if (item.image && item.image.length > 1000 && item.image.startsWith('data:')) {
                    // Create a copy without the image or with a placeholder
                    return { ...item, image: '' };
                }
                return item;
            });
            localStorage.setItem('cart', JSON.stringify(itemsToSave));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [items]);

    // Hydrate images from ProductContext if missing (e.g. after reload)
    useEffect(() => {
        if (products.length > 0) {
            setItems(currentItems => {
                let hasChanges = false;
                const hydratedItems = currentItems.map(item => {
                    // If image is missing, try to find it in products
                    if (!item.image || item.image === '') {
                        const product = products.find(p => p.id === item.id);
                        if (product && product.image) {
                            hasChanges = true;
                            return { ...item, image: product.image };
                        }
                    }
                    return item;
                });
                return hasChanges ? hydratedItems : currentItems;
            });
        }
    }, [products]);

    const addToCart = (product: Product) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
