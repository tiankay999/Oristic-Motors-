'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import FormSpinner from '../../components/formspinner';



export default function AdminLoginPage() {
    const { loginAdmin } = useAuth();
    const router = useRouter();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006'}/admin-login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Login failed');
                return;
            }

            loginAdmin(data.token, data.admin);
            router.push('/admin');
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
                        <span className="text-oristic-gold">Oristic</span> Admin
                    </h1>
                    <p className="mt-3 text-sm text-white/50">
                        Sign in to manage your dealership.
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
                            <label htmlFor="name" className="block text-sm font-medium text-white/80">
                                Username
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-2 block w-full rounded-md border-oristic-gray bg-oristic-black text-white px-4 py-3 text-sm shadow-sm focus:border-oristic-gold focus:ring-oristic-gold placeholder-white/30"
                                placeholder="admin"
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
                </div>
            </div>
        </div>
    );
}
