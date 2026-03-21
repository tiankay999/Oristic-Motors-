'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface Order {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    totalAmount: number;
    items: OrderItem[];
    createdAt: string;
}

export default function ProfilePage() {
    const { user, token, isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [authLoading, isAuthenticated, router]);

    useEffect(() => {
        if (token) {
            // The original code used .then() chains.
            // The instruction provided an 'await' keyword with .then() chains, which is syntactically incorrect.
            // To maintain the original promise-chaining style while applying the URL change,
            // we will replace the URL string within the existing fetch call.
            fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006'}/api/my-orders`, {
                headers: { 'Authorization': `Bearer ${token}` },
            })
                .then(res => res.json())
                .then(data => {
                    setOrders(Array.isArray(data) ? data : []);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [token]);

    if (authLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-oristic-black">
                <p className="text-white/60 animate-pulse font-serif">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-oristic-black py-12">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
                {/* User Info Section */}
                <div className="rounded-2xl border border-oristic-gold/20 bg-oristic-dark p-8 shadow-lg">
                    <h1 className="font-serif text-3xl font-bold text-white">
                        My <span className="text-oristic-gold">Profile</span>
                    </h1>
                    <div className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                        <div>
                            <span className="text-white/50">Name</span>
                            <p className="mt-1 text-white font-medium">{user?.name || '--'}</p>
                        </div>
                        <div>
                            <span className="text-white/50">Email</span>
                            <p className="mt-1 text-white font-medium">{user?.email || '--'}</p>
                        </div>
                        <div>
                            <span className="text-white/50">Phone</span>
                            <p className="mt-1 text-white font-medium">{user?.phone || '--'}</p>
                        </div>
                    </div>
                </div>

                {/* Order History */}
                <div className="mt-12">
                    <h2 className="font-serif text-2xl font-bold text-white mb-6">
                        Order <span className="text-oristic-gold">History</span>
                    </h2>

                    {loading ? (
                        <p className="text-white/50 animate-pulse">Loading orders...</p>
                    ) : orders.length === 0 ? (
                        <div className="rounded-2xl border border-oristic-gray/30 bg-oristic-dark p-12 text-center">
                            <p className="text-white/40 font-serif italic text-lg">No orders yet</p>
                            <p className="text-white/30 text-sm mt-2">Your vehicle reservations will appear here.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order.id} className="rounded-xl border border-oristic-gray/30 bg-oristic-dark p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm text-white/50">Order #{order.id}</p>
                                            <p className="mt-1 font-serif text-lg font-bold text-oristic-gold">
                                                ₵{Number(order.totalAmount).toLocaleString()}
                                            </p>
                                        </div>
                                        <span className="text-xs text-white/40">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    {order.items && (
                                        <div className="mt-4 border-t border-oristic-gray/30 pt-3 space-y-2">
                                            {(Array.isArray(order.items) ? order.items : JSON.parse(order.items as any)).map((item: any, idx: number) => (
                                                <div key={idx} className="flex items-center gap-3">
                                                    {/* Car thumbnail */}
                                                    <div className="relative h-10 w-14 rounded-md overflow-hidden bg-oristic-gray/20 flex-shrink-0">
                                                        <Image
                                                            src={item.image || '/placeholder.jpg'}
                                                            alt={item.name || item.productname || 'Vehicle'}
                                                            fill
                                                            className="object-cover"
                                                            unoptimized={(item.image || '').startsWith('http')}
                                                        />
                                                    </div>
                                                    <p className="text-sm text-white/70">
                                                        {item.name || item.productname} <span className="text-white/40">&times; {item.quantity}</span>
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
