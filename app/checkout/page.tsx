'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        clearCart();
        alert('Order placed successfully!');
        router.push('/');
    };

    if (items.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-champagne-light">
                <p className="text-luxury-black/60">Your cart is empty. Redirecting...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-champagne-light py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    <div>
                        <h2 className="font-serif text-2xl font-medium text-luxury-black">Contact information</h2>

                        <form onSubmit={handleSubmit} className="mt-6">
                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-luxury-black/80">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full rounded-md border-champagne-dark shadow-sm focus:border-luxury-black focus:ring-luxury-black sm:text-sm py-3 px-4 bg-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-luxury-black/80">
                                        First name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="first-name"
                                            name="first-name"
                                            autoComplete="given-name"
                                            required
                                            className="block w-full rounded-md border-champagne-dark shadow-sm focus:border-luxury-black focus:ring-luxury-black sm:text-sm py-3 px-4 bg-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium text-luxury-black/80">
                                        Last name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="last-name"
                                            name="last-name"
                                            autoComplete="family-name"
                                            required
                                            className="block w-full rounded-md border-champagne-dark shadow-sm focus:border-luxury-black focus:ring-luxury-black sm:text-sm py-3 px-4 bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-luxury-black/80">
                                        Address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            autoComplete="street-address"
                                            required
                                            className="block w-full rounded-md border-champagne-dark shadow-sm focus:border-luxury-black focus:ring-luxury-black sm:text-sm py-3 px-4 bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 mt-6">
                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full rounded-full border border-transparent bg-luxury-black px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-luxury-black/90 focus:outline-none focus:ring-2 focus:ring-luxury-black focus:ring-offset-2 focus:ring-offset-champagne disabled:bg-gray-400 transition-all"
                                    >
                                        {isProcessing ? 'Processing...' : `Pay ₵${totalPrice.toLocaleString()}`}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary Side */}
                    <div className="mt-10 lg:mt-0">
                        <h2 className="font-serif text-2xl font-medium text-luxury-black">Order summary</h2>

                        <div className="mt-6 rounded-2xl border border-champagne-dark/30 bg-champagne shadow-sm">
                            <ul role="list" className="divide-y divide-champagne-dark/30">
                                {items.map((item) => (
                                    <li key={item.id} className="flex py-6 px-6">
                                        <div className="shrink-0">
                                            <div className="relative h-20 w-20 rounded-lg bg-white overflow-hidden">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="ml-6 flex flex-1 flex-col">
                                            <div className="flex">
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="text-sm">
                                                        <a href={`/product/${item.slug}`} className="font-medium text-luxury-black hover:text-luxury-black/80">
                                                            {item.name}
                                                        </a>
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between pt-2">
                                                <p className="mt-1 text-sm font-medium text-luxury-black">₵{item.price.toLocaleString()}</p>
                                                <div className="ml-4">
                                                    <p className="text-sm text-luxury-black/60">Qty {item.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <dl className="border-t border-champagne-dark/30 py-6 px-6 space-y-6">
                                <div className="flex items-center justify-between pt-2">
                                    <dt className="text-lg font-bold text-luxury-black">Total</dt>
                                    <dd className="text-lg font-bold text-luxury-black">₵{totalPrice.toLocaleString()}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
