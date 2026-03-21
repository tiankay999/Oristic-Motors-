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
    deliveryMode?: 'pickup' | 'delivery';
    deliveryLocation?: 'accra' | 'outside-accra';
    deliveryStatus?: 'processing' | 'dispatched' | 'in-transit' | 'delivered';
}

// ── Delivery Tracker Component ──────────────────────────────────────────────
const DELIVERY_STEPS = [
    { key: 'processing', label: 'Order Placed', icon: '📋' },
    { key: 'dispatched', label: 'Dispatched', icon: '📦' },
    { key: 'in-transit', label: 'In Transit', icon: '🚛' },
    { key: 'delivered', label: 'Delivered', icon: '✅' },
] as const;

type DeliveryStatus = 'processing' | 'dispatched' | 'in-transit' | 'delivered';

function DeliveryTracker({ status }: { status: DeliveryStatus }) {
    const currentIndex = DELIVERY_STEPS.findIndex(s => s.key === status);

    return (
        <div className="mt-4 rounded-xl border border-oristic-gold/20 bg-gradient-to-br from-oristic-black to-oristic-dark p-5 overflow-hidden relative">
            {/* Map-like grid background */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#C8A84B 1px, transparent 1px), linear-gradient(90deg, #C8A84B 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />

            {/* Header */}
            <div className="relative flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-oristic-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span className="text-sm font-semibold text-oristic-gold">Delivery Tracking</span>
                </div>
                {status !== 'delivered' && (
                    <span className="text-xs text-amber-400/80 bg-amber-900/30 border border-amber-700/30 px-2.5 py-1 rounded-full">
                        ⏱ Est. 3 business days
                    </span>
                )}
            </div>

            {/* Step tracker */}
            <div className="relative flex items-start justify-between">
                {DELIVERY_STEPS.map((step, index) => {
                    const isDone = index <= currentIndex;
                    const isActive = index === currentIndex;
                    const isLast = index === DELIVERY_STEPS.length - 1;

                    return (
                        <div key={step.key} className="flex flex-col items-center flex-1">
                            {/* Connector bar above circles (minus first) */}
                            <div className="w-full flex items-center">
                                {/* Left bar */}
                                {index > 0 && (
                                    <div className={`flex-1 h-0.5 transition-colors duration-500 ${
                                        isDone ? 'bg-oristic-gold' : 'bg-oristic-gray/30'
                                    }`} />
                                )}

                                {/* Circle */}
                                <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 flex-shrink-0 transition-all duration-500 ${
                                    isActive
                                        ? 'border-oristic-gold bg-oristic-gold shadow-lg shadow-oristic-gold/30 scale-110'
                                        : isDone
                                            ? 'border-oristic-gold bg-oristic-gold/20'
                                            : 'border-oristic-gray/40 bg-oristic-dark'
                                }`}>
                                    <span className={`text-base leading-none ${isActive ? '' : ''}`}>
                                        {step.icon}
                                    </span>
                                    {isActive && (
                                        <span className="absolute w-full h-full rounded-full bg-oristic-gold/20 animate-ping" />
                                    )}
                                </div>

                                {/* Right bar */}
                                {!isLast && (
                                    <div className={`flex-1 h-0.5 transition-colors duration-500 ${
                                        index < currentIndex ? 'bg-oristic-gold' : 'bg-oristic-gray/30'
                                    }`} />
                                )}
                            </div>

                            {/* Label */}
                            <p className={`mt-2 text-center text-xs font-medium leading-tight px-1 ${
                                isActive ? 'text-oristic-gold' : isDone ? 'text-white/60' : 'text-white/25'
                            }`}>
                                {step.label}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Status message */}
            <p className="relative mt-5 text-center text-xs text-white/40 italic">
                {status === 'processing' && 'Your order is being prepared for dispatch.'}
                {status === 'dispatched' && 'Your vehicle has left our facility and is on the way.'}
                {status === 'in-transit' && 'Your vehicle is in transit. Arriving within 3 business days.'}
                {status === 'delivered' && '🎉 Your vehicle has been delivered. Enjoy the ride!'}
            </p>
        </div>
    );
}

// ── Delivery Badge ───────────────────────────────────────────────────────────
function DeliveryBadge({ order }: { order: Order }) {
    if (!order.deliveryMode || order.deliveryMode === 'pickup') {
        return (
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-900/30 text-blue-300 border border-blue-700/25">
                🏛 Showroom Pickup
            </span>
        );
    }
    if (order.deliveryLocation === 'accra') {
        return (
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-green-900/30 text-green-300 border border-green-700/25">
                📍 Accra Delivery
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-900/30 text-amber-300 border border-amber-700/25">
            🗺 Outside Accra · 3 days
        </span>
    );
}

// ── Main Profile Page ────────────────────────────────────────────────────────
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
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="rounded-xl border border-oristic-gray/30 bg-oristic-dark p-6">
                                    {/* Order header */}
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm text-white/50">Order #{order.id}</p>
                                            <DeliveryBadge order={order} />
                                        </div>
                                        <div className="text-right">
                                            <p className="font-serif text-lg font-bold text-oristic-gold">
                                                ₵{Number(order.totalAmount).toLocaleString()}
                                            </p>
                                            <span className="text-xs text-white/40">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Items list */}
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

                                    {/* Delivery tracker — only for outside Accra orders */}
                                    {order.deliveryMode === 'delivery' && order.deliveryLocation === 'outside-accra' && (
                                        <DeliveryTracker status={order.deliveryStatus || 'processing'} />
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
