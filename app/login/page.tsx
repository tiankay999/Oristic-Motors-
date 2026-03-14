'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormSpinner from '../components/formspinner';

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006'}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Login failed');
                return;
            }

            login(data.token, data.user);
            router.push('/');
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-oristic-black px-4 py-12">
            <div className="w-full max-w-md space-y-10">
                <div className="text-center">
                    <h1 className="font-serif text-3xl font-bold text-white">
                        Welcome to{' '}
                        <span className="text-oristic-gold">Oristic Motors</span>
                    </h1>
                    <p className="mt-3 text-sm text-white/50">
                        Sign in to access your account and reservations.
                    </p>
                </div>

                <div className="rounded-2xl border border-oristic-gold/20 bg-oristic-dark p-8 shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="rounded-lg bg-red-900/30 border border-red-500/30 p-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white/80">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-2 block w-full rounded-md border-oristic-gray bg-oristic-black text-white px-4 py-3 text-sm shadow-sm focus:border-oristic-gold focus:ring-oristic-gold placeholder-white/30"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-white/80">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-2 block w-full rounded-md border-oristic-gray bg-oristic-black text-white px-4 py-3 text-sm shadow-sm focus:border-oristic-gold focus:ring-oristic-gold placeholder-white/30"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-full bg-oristic-gold py-3.5 text-sm font-semibold text-oristic-black transition-all hover:bg-oristic-gold-light disabled:bg-gray-700 disabled:text-gray-500"
                        >
                            {isLoading ? <FormSpinner /> : 'Sign In'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-white/50">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="font-medium text-oristic-gold hover:text-oristic-gold-light">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
