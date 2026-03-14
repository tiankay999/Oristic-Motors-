'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormSpinner from '../components/formspinner';

export default function SignupPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006'}/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Signup failed');
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
                        Join{' '}
                        <span className="text-oristic-gold">Oristic Motors</span>
                    </h1>
                    <p className="mt-3 text-sm text-white/50">
                        Create your account and start your premium driving journey.
                    </p>
                </div>

                <div className="rounded-2xl border border-oristic-gold/20 bg-oristic-dark p-8 shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="rounded-lg bg-red-900/30 border border-red-500/30 p-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white/80">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-oristic-gray bg-oristic-black text-white px-4 py-3 text-sm shadow-sm focus:border-oristic-gold focus:ring-oristic-gold placeholder-white/30"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white/80">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-oristic-gray bg-oristic-black text-white px-4 py-3 text-sm shadow-sm focus:border-oristic-gold focus:ring-oristic-gold placeholder-white/30"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-white/80">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                type="text"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-oristic-gray bg-oristic-black text-white px-4 py-3 text-sm shadow-sm focus:border-oristic-gold focus:ring-oristic-gold placeholder-white/30"
                                placeholder="+233..."
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-white/80">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-oristic-gray bg-oristic-black text-white px-4 py-3 text-sm shadow-sm focus:border-oristic-gold focus:ring-oristic-gold placeholder-white/30"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-oristic-gray bg-oristic-black text-white px-4 py-3 text-sm shadow-sm focus:border-oristic-gold focus:ring-oristic-gold placeholder-white/30"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-full bg-oristic-gold py-3.5 text-sm font-semibold text-oristic-black transition-all hover:bg-oristic-gold-light disabled:bg-gray-700 disabled:text-gray-500"
                        >
                            {isLoading ? <FormSpinner /> : 'Create Account'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-white/50">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-oristic-gold hover:text-oristic-gold-light">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
