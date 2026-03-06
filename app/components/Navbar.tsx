'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { categories } from '../lib/data';

export default function Navbar() {
    const { totalItems } = useCart();
    const { isAuthenticated, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-oristic-gold/20 bg-oristic-black/95 backdrop-blur-md shadow-lg">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="font-serif text-2xl font-bold tracking-tight text-oristic-gold">
                        Oristic
                    </span>
                    <span className="font-serif text-2xl font-bold tracking-tight text-white">
                        Motors
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:gap-8">
                    {categories.slice(0, 5).map((category) => (
                        <Link
                            key={category.slug}
                            href={`/${category.slug}`}
                            className="text-sm font-medium text-white/70 hover:text-oristic-gold transition-colors uppercase tracking-wide"
                        >
                            {category.name}
                        </Link>
                    ))}
                    <Link href="/about" className="text-sm font-medium text-white/70 hover:text-oristic-gold transition-colors uppercase tracking-wide">
                        About
                    </Link>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-4">
                    {/* Auth Links - Desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        {isAuthenticated ? (
                            <>
                                <button
                                    onClick={logout}
                                    className="text-sm font-medium text-white/70 hover:text-oristic-gold transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-white/70 hover:text-oristic-gold transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-oristic-gold text-oristic-black px-4 py-2 rounded-full text-sm font-medium hover:bg-oristic-gold-light transition-all"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Profile Icon (Visible when authenticated) */}
                    {isAuthenticated && (
                        <Link href="/profile" className="p-2 text-white/70 hover:text-oristic-gold transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                />
                            </svg>
                        </Link>
                    )}

                    <Link href="/cart" className="relative p-2 text-white/70 hover:text-oristic-gold transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                        </svg>
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-oristic-gold text-[10px] font-bold text-oristic-black">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 md:hidden text-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="border-t border-oristic-gold/20 bg-oristic-black md:hidden">
                    <div className="space-y-1 px-4 py-4">
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/${category.slug}`}
                                className="block py-3 text-base font-medium text-white hover:text-oristic-gold hover:bg-oristic-gray/30 rounded-md px-2 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {category.name}
                            </Link>
                        ))}
                        <Link
                            href="/about"
                            className="block py-3 text-base font-medium text-white hover:text-oristic-gold hover:bg-oristic-gray/30 rounded-md px-2 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>

                        {/* Mobile Auth Links */}
                        <div className="border-t border-oristic-gold/20 mt-4 pt-4 space-y-2">
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        href="/profile"
                                        className="block py-3 text-base font-medium text-white hover:text-oristic-gold hover:bg-oristic-gray/30 rounded-md px-2 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="block w-full text-left py-3 text-base font-medium text-white hover:text-oristic-gold hover:bg-oristic-gray/30 rounded-md px-2 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="block py-3 text-base font-medium text-white hover:text-oristic-gold hover:bg-oristic-gray/30 rounded-md px-2 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="block py-3 text-center text-base font-medium bg-oristic-gold text-oristic-black rounded-full"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
