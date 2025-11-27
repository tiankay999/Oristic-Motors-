'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Simple mock authentication
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            router.push('/');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen bg-champagne-light flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                <div className="bg-champagne rounded-2xl shadow-lg p-8">
                    <h1 className="font-serif text-3xl font-bold text-luxury-black text-center mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-center text-luxury-black/60 mb-8">
                        Sign in to your account
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-luxury-black mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black bg-white text-luxury-black"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-luxury-black mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-champagne-dark  text-luxury-black rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black bg-white"
                                placeholder="Enter your password"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-luxury-black text-white py-3 rounded-full font-semibold hover:bg-luxury-black/90 transition-all shadow-md"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-luxury-black/60">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-luxury-black font-semibold hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
