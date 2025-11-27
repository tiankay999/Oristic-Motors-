'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Create order logic would go here
        // For now, just clear cart and redirect
        clearCart();
        alert('Order placed successfully!');
        router.push('/');
    };

    if (items.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
                <p className="text-gray-500">Your cart is empty. Redirecting...</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-black min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    <div>
                        <h2 className="text-lg font-medium text-luxury-black dark:text-white">Contact information</h2>

                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-luxury-black focus:ring-luxury-black dark:bg-zinc-900 dark:border-zinc-700 dark:text-white sm:text-sm py-2 px-3"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        First name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="first-name"
                                            name="first-name"
                                            autoComplete="given-name"
                                            required
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-luxury-black focus:ring-luxury-black dark:bg-zinc-900 dark:border-zinc-700 dark:text-white sm:text-sm py-2 px-3"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Last name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="last-name"
                                            name="last-name"
                                            autoComplete="family-name"
                                            required
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-luxury-black focus:ring-luxury-black dark:bg-zinc-900 dark:border-zinc-700 dark:text-white sm:text-sm py-2 px-3"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            autoComplete="street-address"
                                            required
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-luxury-black focus:ring-luxury-black dark:bg-zinc-900 dark:border-zinc-700 dark:text-white sm:text-sm py-2 px-3"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full rounded-full border border-transparent bg-luxury-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-luxury-black focus:ring-offset-2 focus:ring-offset-gray-50 disabled:bg-gray-400 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                    >
                                        {isProcessing ? 'Processing...' : `Pay ₵${totalPrice.toLocaleString()}`}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary Side */}
                    <div className="mt-10 lg:mt-0">
                        <h2 className="text-lg font-medium text-luxury-black dark:text-white">Order summary</h2>

                        <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-zinc-800">
                                {items.map((item) => (
                                    <li key={item.id} className="flex py-6 px-4 sm:px-6">
                                        <div className="shrink-0">
                                            <div className="relative h-20 w-20 rounded-md bg-gray-100">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover rounded-md"
                                                />
                                            </div>
                                        </div>
                                        <div className="ml-6 flex flex-1 flex-col">
                                            <div className="flex">
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="text-sm">
                                                        <a href={`/product/${item.slug}`} className="font-medium text-gray-700 hover:text-gray-800 dark:text-gray-300">
                                                            {item.name}
                                                        </a>
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between pt-2">
                                                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">₵{item.price.toLocaleString()}</p>
                                                <div className="ml-4">
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Qty {item.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6 dark:border-zinc-800">
                                <div className="flex items-center justify-between border-t border-gray-200 pt-6 dark:border-zinc-800">
                                    <dt className="text-base font-medium text-luxury-black dark:text-white">Total</dt>
                                    <dd className="text-base font-medium text-luxury-black dark:text-white">₵{totalPrice.toLocaleString()}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
