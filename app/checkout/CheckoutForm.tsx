'use client';

import { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FormSpinner from '../components/formspinner';

type DeliveryMode = 'pickup' | 'delivery';
type DeliveryLocation = 'accra' | 'outside-accra';

export default function CheckoutForm() {
    const { items, totalPrice, clearCart } = useCart();
    const { token } = useAuth();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [totalprice, setTotalPrice] = useState(totalPrice);

    // Delivery state
    const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('pickup');
    const [deliveryLocation, setDeliveryLocation] = useState<DeliveryLocation>('accra');

    const config = {
        reference: (new Date()).getTime().toString(),
        email: email,
        amount: Math.ceil(totalprice * 100),
        currency: 'GHS',
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSuccess = (reference: any) => {
        console.log(reference);
        clearCart();
        alert('Order placed successfully! Reference: ' + reference.reference);
        router.push('/');
    };

    const onClose = () => {
        console.log('closed');
        setIsProcessing(false);
    };

    const initializePayment = usePaystackPayment(config);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006'}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    email,
                    firstName,
                    lastName,
                    address,
                    phone,
                    totalAmount: totalprice,
                    deliveryMode,
                    deliveryLocation: deliveryMode === 'delivery' ? deliveryLocation : null,
                    items: items.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: (item.images && item.images[0]) || item.image || '',
                    }))
                }),
            });

            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
            alert('Something went wrong. Please try again.');
            setIsProcessing(false);
        }

        if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
            alert("Paystack public key is missing!");
            setIsProcessing(false);
            return;
        }

        initializePayment({ onSuccess, onClose });
    };

    if (items.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-oristic-black">
                <p className="text-white/60">Your garage is empty. Redirecting...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-oristic-black py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    <div>
                        <h2 className="font-serif text-2xl font-medium text-white">
                            Contact <span className="text-oristic-gold">Information</span>
                        </h2>

                        <form onSubmit={handleSubmit} className="mt-6">
                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-white/80">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            autoComplete="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full rounded-md border-oristic-gray bg-oristic-dark text-white shadow-sm focus:border-oristic-gold focus:ring-oristic-gold sm:text-sm py-3 px-4"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-white/80">
                                        First name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            type="text"
                                            id="first-name"
                                            name="first-name"
                                            autoComplete="given-name"
                                            required
                                            className="block w-full rounded-md border-oristic-gray bg-oristic-dark text-white shadow-sm focus:border-oristic-gold focus:ring-oristic-gold sm:text-sm py-3 px-4"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium text-white/80">
                                        Last name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            type="text"
                                            id="last-name"
                                            name="last-name"
                                            autoComplete="family-name"
                                            required
                                            className="block w-full rounded-md border-oristic-gray bg-oristic-dark text-white shadow-sm focus:border-oristic-gold focus:ring-oristic-gold sm:text-sm py-3 px-4"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-white/80">
                                        Phone
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            autoComplete="Phone"
                                            required
                                            className="block w-full rounded-md border-oristic-gray bg-oristic-dark text-white shadow-sm focus:border-oristic-gold focus:ring-oristic-gold sm:text-sm py-3 px-4"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-white/80">
                                        Address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            type="text"
                                            name="address"
                                            id="address"
                                            autoComplete="street-address"
                                            required
                                            className="block w-full rounded-md border-oristic-gray bg-oristic-dark text-white shadow-sm focus:border-oristic-gold focus:ring-oristic-gold sm:text-sm py-3 px-4"
                                        />
                                    </div>
                                </div>

                                {/* ── Delivery Mode Section ── */}
                                <div className="sm:col-span-2 mt-2">
                                    <p className="block text-sm font-medium text-white/80 mb-3">
                                        Mode of Delivery
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {/* Pickup Option */}
                                        <button
                                            type="button"
                                            onClick={() => setDeliveryMode('pickup')}
                                            className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all cursor-pointer ${
                                                deliveryMode === 'pickup'
                                                    ? 'border-oristic-gold bg-oristic-gold/10'
                                                    : 'border-oristic-gray/40 bg-oristic-dark hover:border-oristic-gray/60'
                                            }`}
                                        >
                                            <svg className={`w-7 h-7 ${deliveryMode === 'pickup' ? 'text-oristic-gold' : 'text-white/40'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                            </svg>
                                            <span className={`text-sm font-semibold ${deliveryMode === 'pickup' ? 'text-oristic-gold' : 'text-white/70'}`}>
                                                Pickup
                                            </span>
                                            <span className="text-xs text-white/40">Collect from showroom</span>
                                            {deliveryMode === 'pickup' && (
                                                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-oristic-gold" />
                                            )}
                                        </button>

                                        {/* Home Delivery Option */}
                                        <button
                                            type="button"
                                            onClick={() => setDeliveryMode('delivery')}
                                            className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all cursor-pointer ${
                                                deliveryMode === 'delivery'
                                                    ? 'border-oristic-gold bg-oristic-gold/10'
                                                    : 'border-oristic-gray/40 bg-oristic-dark hover:border-oristic-gray/60'
                                            }`}
                                        >
                                            <svg className={`w-7 h-7 ${deliveryMode === 'delivery' ? 'text-oristic-gold' : 'text-white/40'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                            </svg>
                                            <span className={`text-sm font-semibold ${deliveryMode === 'delivery' ? 'text-oristic-gold' : 'text-white/70'}`}>
                                                Home Delivery
                                            </span>
                                            <span className="text-xs text-white/40">Delivered to your door</span>
                                            {deliveryMode === 'delivery' && (
                                                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-oristic-gold" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Delivery Location Sub-options */}
                                    {deliveryMode === 'delivery' && (
                                        <div className="mt-4 rounded-xl border border-oristic-gray/30 bg-oristic-black/50 p-4 space-y-3">
                                            <p className="text-xs font-medium uppercase tracking-widest text-white/40 mb-3">
                                                Delivery Location
                                            </p>
                                            {/* Within Accra */}
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${deliveryLocation === 'accra' ? 'border-oristic-gold' : 'border-oristic-gray/50 group-hover:border-oristic-gray'}`}>
                                                    {deliveryLocation === 'accra' && (
                                                        <div className="w-2.5 h-2.5 rounded-full bg-oristic-gold" />
                                                    )}
                                                </div>
                                                <input
                                                    type="radio"
                                                    className="sr-only"
                                                    name="deliveryLocation"
                                                    value="accra"
                                                    checked={deliveryLocation === 'accra'}
                                                    onChange={() => setDeliveryLocation('accra')}
                                                />
                                                <div>
                                                    <p className={`text-sm font-medium ${deliveryLocation === 'accra' ? 'text-white' : 'text-white/60'}`}>
                                                        Within Accra
                                                    </p>
                                                    <p className="text-xs text-white/30">Same-day or next-day delivery</p>
                                                </div>
                                            </label>

                                            {/* Outside Accra */}
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${deliveryLocation === 'outside-accra' ? 'border-oristic-gold' : 'border-oristic-gray/50 group-hover:border-oristic-gray'}`}>
                                                    {deliveryLocation === 'outside-accra' && (
                                                        <div className="w-2.5 h-2.5 rounded-full bg-oristic-gold" />
                                                    )}
                                                </div>
                                                <input
                                                    type="radio"
                                                    className="sr-only"
                                                    name="deliveryLocation"
                                                    value="outside-accra"
                                                    checked={deliveryLocation === 'outside-accra'}
                                                    onChange={() => setDeliveryLocation('outside-accra')}
                                                />
                                                <div>
                                                    <p className={`text-sm font-medium ${deliveryLocation === 'outside-accra' ? 'text-white' : 'text-white/60'}`}>
                                                        Outside Accra
                                                    </p>
                                                    <p className="text-xs text-white/30">Delivery across Ghana</p>
                                                </div>
                                            </label>

                                            {/* 3-day notice */}
                                            {deliveryLocation === 'outside-accra' && (
                                                <div className="mt-3 flex items-start gap-2.5 rounded-lg bg-oristic-gold/10 border border-oristic-gold/25 px-3.5 py-3">
                                                    <svg className="w-4 h-4 text-oristic-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-sm font-semibold text-oristic-gold">3 Business Days</p>
                                                        <p className="text-xs text-white/50 mt-0.5">
                                                            Deliveries outside Accra typically take <strong className="text-white/70">3 business days</strong>. You can track your delivery progress from your profile.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {/* ── End Delivery Mode ── */}

                                <div className="sm:col-span-2 mt-6">
                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full rounded-full border border-transparent bg-oristic-gold px-6 py-4 text-base font-semibold text-oristic-black shadow-sm hover:bg-oristic-gold-light focus:outline-none focus:ring-2 focus:ring-oristic-gold focus:ring-offset-2 focus:ring-offset-oristic-black disabled:bg-gray-700 disabled:text-gray-500 transition-all"
                                    >
                                        {isProcessing ? <FormSpinner /> : `Pay ₵${totalPrice.toLocaleString()}`}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary Side */}
                    <div className="mt-10 lg:mt-0">
                        <h2 className="font-serif text-2xl font-medium text-white">
                            Order <span className="text-oristic-gold">Summary</span>
                        </h2>

                        <div className="mt-6 rounded-2xl border border-oristic-gold/30 bg-oristic-dark shadow-sm">
                            <ul role="list" className="divide-y divide-oristic-gray/30">
                                {items.map((item) => (
                                    <li key={item.id} className="flex py-6 px-6">
                                        <div className="shrink-0">
                                            <div className="relative h-20 w-24 rounded-lg bg-oristic-gray/20 overflow-hidden">
                                                <Image
                                                    src={(item.images && item.images[0]) || item.image || '/placeholder.jpg'}
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
                                                        <a href={`/product/${item.slug}`} className="font-medium text-white hover:text-oristic-gold transition-colors">
                                                            {item.name}
                                                        </a>
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between pt-2">
                                                <p className="mt-1 text-sm font-medium text-oristic-gold">₵{item.price.toLocaleString()}</p>
                                                <div className="ml-4">
                                                    <p className="text-sm text-white/60">Qty {item.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* Delivery mode summary line */}
                            <div className="border-t border-oristic-gray/30 px-6 py-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-white/50">Delivery</span>
                                    <span className={`font-medium px-2.5 py-0.5 rounded-full text-xs ${
                                        deliveryMode === 'pickup'
                                            ? 'bg-blue-900/40 text-blue-300 border border-blue-700/30'
                                            : deliveryLocation === 'outside-accra'
                                                ? 'bg-amber-900/40 text-amber-300 border border-amber-700/30'
                                                : 'bg-green-900/40 text-green-300 border border-green-700/30'
                                    }`}>
                                        {deliveryMode === 'pickup'
                                            ? '🏛 Showroom Pickup'
                                            : deliveryLocation === 'outside-accra'
                                                ? '🗺 Outside Accra • 3 days'
                                                : '📍 Within Accra'}
                                    </span>
                                </div>
                            </div>

                            <dl className="border-t border-oristic-gray/30 py-6 px-6 space-y-6">
                                <div className="flex items-center justify-between pt-2">
                                    <dt className="text-lg font-bold text-white">Total</dt>
                                    <dd className="text-lg font-bold text-oristic-gold">₵{totalPrice.toLocaleString()}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
