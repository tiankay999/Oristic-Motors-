'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import FormSpinner from '../../components/formspinner';


export default function AdminLoginPage() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { loginAdmin } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:5006/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to login');
            }

            if (data.token) {
                loginAdmin(data.token);
                router.push('/admin');
            } else {
                setError('Login failed: No token received');
            }
        } catch (err: any) {
            console.log(err);
            setError(err.message || 'An error occurred');
        }finally{
            setIsLoading(true);
        }
    };

    return (
        <div className="min-h-screen bg-champagne-light flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-champagne rounded-2xl shadow-lg p-8">
                    <h1 className="font-serif text-3xl font-bold text-luxury-black text-center mb-2">
                        Admin Login
                    </h1>
                    <p className="text-center text-luxury-black/60 mb-8">
                        Sign in to manage your store
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-luxury-black mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-3 border text-black border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black bg-white"
                                placeholder="Enter username"
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
                                className="w-full px-4 py-3 border text-black border-champagne-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-black bg-white"
                                placeholder="Enter password"
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
                        {isLoading  ? <FormSpinner /> : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
