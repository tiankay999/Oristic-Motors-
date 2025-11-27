'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        // Get existing users
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if email already exists
        if (users.some((u: any) => u.email === formData.email)) {
            setError('Email already registered');
            return;
        }

        // Add new user
        const newUser = {
            id: Date.now().toString(),
            name: formData.name,
            email: formData.email,
            password: formData.password, // In production, hash this!
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        // Redirect to home
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-champagne-light flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                <div className="bg-champagne rounded-2xl shadow-lg p-8">
                    <h1 className="font-serif text-3xl font-bold text-luxury-black text-center mb-2">
                        Create Account
                    </h1>
                    <p className="text-center text-luxury-black/60 mb-8">
                        Join Minaglitzy today
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-luxury-black mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="w-full px-4 py-3 border text-black border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black bg-white"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-luxury-black mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="w-full px-4 py-3 border border-champagne-dark text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black bg-white"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-luxury-black mb-2">
                                Phone number
                            </label>
                            <input
                                type="text"
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                                className="w-full px-4 py-3 border border-champagne-dark text-luxury-black rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black bg-white text-black"
                                placeholder="+233 505 504 505"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-luxury-black mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                className="w-full px-4 py-3 border border-champagne-dark  text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black bg-white"
                                placeholder="Min. 6 characters"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-luxury-black mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                required
                                className="w-full px-4 py-3 border border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black bg-white text-black"
                                placeholder="Re-enter password"
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
                            Create Account
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-luxury-black/60">
                        Already have an account?{' '}
                        <Link href="/login" className="text-luxury-black font-semibold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
