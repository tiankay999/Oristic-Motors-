'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

    if (items.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white dark:bg-black px-4">
                <h2 className="text-2xl font-bold text-luxury-black dark:text-white">Your cart is empty</h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Looks like you haven't added anything yet.</p>
                <Link
                    href="/"
                    className="mt-8 rounded-full bg-luxury-black px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/80 dark:bg-white dark:text-black"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-black min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
                <h1 className="text-3xl font-bold tracking-tight text-luxury-black dark:text-white">Shopping Cart</h1>

                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section className="lg:col-span-7">
                        <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200 dark:divide-zinc-800 dark:border-zinc-800">
                            {items.map((item) => (
                                <li key={item.id} className="flex py-6 sm:py-10">
                                    <div className="shrink-0">
                                        <div className="relative h-24 w-24 rounded-md object-cover sm:h-48 sm:w-48 bg-gray-100">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm">
                                                        <Link href={`/product/${item.slug}`} className="font-medium text-luxury-black dark:text-white hover:text-gray-800">
                                                            {item.name}
                                                        </Link>
                                                    </h3>
                                                </div>
                                                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-300">₵{item.price.toLocaleString()}</p>
                                            </div>

                                            <div className="mt-4 sm:mt-0 sm:pr-9">
                                                <label htmlFor={`quantity-${item.id}`} className="sr-only">
                                                    Quantity, {item.name}
                                                </label>
                                                <select
                                                    id={`quantity-${item.id}`}
                                                    name={`quantity-${item.id}`}
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                                    className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-luxury-black focus:outline-none focus:ring-1 focus:ring-luxury-black dark:bg-zinc-900 dark:text-white sm:text-sm"
                                                >
                                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                                        <option key={num} value={num}>
                                                            {num}
                                                        </option>
                                                    ))}
                                                </select>

                                                <div className="absolute right-0 top-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                                                    >
                                                        <span className="sr-only">Remove</span>
                                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Order Summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 rounded-lg bg-gray-50 px-4 py-6 dark:bg-zinc-900 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                    >
                        <h2 id="summary-heading" className="text-lg font-medium text-luxury-black dark:text-white">
                            Order summary
                        </h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-zinc-800">
                                <dt className="text-base font-medium text-luxury-black dark:text-white">Order total</dt>
                                <dd className="text-base font-medium text-luxury-black dark:text-white">₵{totalPrice.toLocaleString()}</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <Link
                                href="/checkout"
                                className="w-full rounded-full border border-transparent bg-luxury-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-luxury-black focus:ring-offset-2 focus:ring-offset-gray-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
