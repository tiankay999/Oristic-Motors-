'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '../context/CartContext';


export default function CartPage() {
    const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

    const router = useRouter();

    const handleProceedToCheckout = async () => {
        const token = localStorage.getItem('token');

        if (token && items.length > 0) {
            try {
                // Clear existing cart in database
                await fetch('http://localhost:5006/cart', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                // Sync current items to database
                for (const item of items) {
                    await fetch('http://localhost:5006/cart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            productname: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            productId: item.id,
                        }),
                    });
                }
                console.log('Cart synced to database');
            } catch (error) {
                console.error('Error syncing cart to database:', error);
            }
        }

        router.push('/checkout');
    };

    if (items.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center bg-champagne-light px-4">
                <h2 className="font-serif text-3xl font-bold text-luxury-black">Your cart is empty</h2>
                <p className="mt-4 text-luxury-black/60">Looks like you haven't added anything yet.</p>
                <Link
                    href="/"
                    className="mt-8 rounded-full bg-luxury-black px-10 py-3.5 text-sm font-semibold text-white transition-all hover:bg-luxury-black/80 hover:shadow-lg"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-champagne-light py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
                <h1 className="font-serif text-4xl font-bold tracking-tight text-luxury-black">Shopping Cart</h1>

                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section className="lg:col-span-7">
                        <ul role="list" className="divide-y divide-champagne-dark/30 border-b border-t border-champagne-dark/30">
                            {items.map((item) => (
                                <li key={item.id} className="flex py-8">
                                    <div className="shrink-0">
                                        <div className="relative h-28 w-28 rounded-xl overflow-hidden bg-champagne shadow-sm">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div className="ml-6 flex flex-1 flex-col justify-between">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h3 className="text-base font-medium">
                                                        <Link href={`/product/${item.slug}`} className="font-serif text-lg text-luxury-black hover:text-luxury-black/80">
                                                            {item.name}
                                                        </Link>
                                                    </h3>
                                                </div>
                                                <p className="mt-1 text-sm font-medium text-luxury-black">₵{item.price.toLocaleString()}</p>
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
                                                    className="max-w-full rounded-md border border-champagne-dark bg-white py-1.5 text-left text-base font-medium leading-5 text-luxury-black shadow-sm focus:border-luxury-black focus:outline-none focus:ring-1 focus:ring-luxury-black sm:text-sm"
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
                                                        className="-m-2 inline-flex p-2 text-gray-400 hover:text-red-500 transition-colors"
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
                        className="mt-16 rounded-2xl bg-champagne px-6 py-8 shadow-sm lg:col-span-5 lg:mt-0 lg:p-10"
                    >
                        <h2 id="summary-heading" className="font-serif text-2xl font-medium text-luxury-black">
                            Order summary
                        </h2>

                        <dl className="mt-8 space-y-4">
                            <div className="flex items-center justify-between border-t border-champagne-dark/30 pt-4">
                                <dt className="text-lg font-bold text-luxury-black">Order total</dt>
                                <dd className="text-lg font-bold text-luxury-black">₵{totalPrice.toLocaleString()}</dd>
                            </div>
                        </dl>

                        <div className="mt-8">
                            <button
                                type="button"
                                onClick={handleProceedToCheckout}
                                className="w-full flex items-center justify-center rounded-full border border-transparent bg-luxury-black px-6 py-4 text-base font-semibold text-white shadow-sm hover:bg-luxury-black/90 focus:outline-none focus:ring-2 focus:ring-luxury-black focus:ring-offset-2 focus:ring-offset-champagne transition-all"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
