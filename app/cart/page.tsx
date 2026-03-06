'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
    const { token } = useAuth();
    const router = useRouter();

    const handleCheckout = async () => {
        try {
            // Sync cart with backend if user is logged in
            if (token) {
                for (const item of items) {
                    await fetch('http://localhost:5006/api/cart', {
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
            }
            router.push('/checkout');
        } catch (error) {
            console.error('Error syncing cart:', error);
            router.push('/checkout');
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-oristic-black flex flex-col items-center justify-center py-24">
                <div className="text-center">
                    <h1 className="font-serif text-4xl font-bold text-white">Your <span className="text-oristic-gold">Garage</span> is Empty</h1>
                    <p className="mt-4 text-lg text-white/50">
                        Start building your dream collection.
                    </p>
                    <Link
                        href="/"
                        className="mt-8 inline-block rounded-full bg-oristic-gold px-8 py-3 text-base font-semibold text-oristic-black hover:bg-oristic-gold-light transition-all"
                    >
                        Browse Vehicles
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-oristic-black py-12">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
                <h1 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Your <span className="text-oristic-gold">Garage</span>
                </h1>
                <p className="mt-2 text-sm text-white/50">{totalItems} vehicle(s) reserved</p>

                <div className="mt-8 divide-y divide-oristic-gray/30">
                    {items.map((item) => (
                        <div key={item.id} className="flex py-6">
                            <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-oristic-dark border border-oristic-gray/30">
                                <Image
                                    src={(item.images && item.images[0]) || item.image || '/placeholder.jpg'}
                                    alt={item.name}
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="text-base font-medium text-white">{item.name}</h3>
                                        <p className="mt-1 text-sm text-white/50 capitalize">
                                            {item.category?.replace('-', ' ')}
                                        </p>
                                    </div>
                                    <p className="text-base font-semibold text-oristic-gold">
                                        ₵{(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>

                                <div className="mt-auto flex items-end justify-between">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-7 h-7 rounded-full border border-oristic-gold/50 text-oristic-gold hover:bg-oristic-gold hover:text-oristic-black transition-all flex items-center justify-center text-sm"
                                        >
                                            −
                                        </button>
                                        <span className="text-sm font-medium text-white w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-7 h-7 rounded-full border border-oristic-gold/50 text-oristic-gold hover:bg-oristic-gold hover:text-oristic-black transition-all flex items-center justify-center text-sm"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-sm font-medium text-white/40 hover:text-red-400 transition-colors"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="mt-8 rounded-2xl border border-oristic-gold/30 bg-oristic-dark p-6 shadow-md">
                    <div className="flex items-center justify-between">
                        <span className="font-serif text-xl font-bold text-white">Total</span>
                        <span className="font-serif text-2xl font-bold text-oristic-gold">₵{totalPrice.toLocaleString()}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="mt-6 w-full rounded-full bg-oristic-gold px-6 py-4 text-base font-semibold text-oristic-black shadow-sm hover:bg-oristic-gold-light hover:shadow-lg transition-all active:scale-[0.98]"
                    >
                        Proceed to Checkout
                    </button>
                    <button
                        onClick={clearCart}
                        className="mt-3 w-full rounded-full border border-oristic-gray/40 px-6 py-3 text-sm font-medium text-white/60 hover:border-red-500/50 hover:text-red-400 transition-all"
                    >
                        Clear Garage
                    </button>
                </div>
            </div>
        </div>
    );
}
