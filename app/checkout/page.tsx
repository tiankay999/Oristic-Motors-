'use client';

import dynamic from 'next/dynamic';

const CheckoutForm = dynamic(() => import('./CheckoutForm'), {
    ssr: false,
    loading: () => (
        <div className="flex min-h-screen items-center justify-center bg-champagne-light">
            <p className="text-luxury-black/60">Loading checkout...</p>
        </div>
    ),
});

export default function CheckoutPage() {
    return <CheckoutForm />;
}

///this is just a commit 