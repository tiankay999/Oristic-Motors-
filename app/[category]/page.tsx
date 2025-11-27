'use client';

import { useState, use } from 'react';
import { categories } from '../lib/data';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { notFound } from 'next/navigation';

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = use(params);
    const [sortBy, setSortBy] = useState('newest');
    const { products } = useProducts();

    // Verify category exists
    const categoryExists = categories.some((c) => c.slug === category);
    if (!categoryExists) {
        notFound();
    }

    const categoryName = categories.find((c) => c.slug === category)?.name;

    // Filter products by category
    let categoryProducts = products.filter((p) => p.category === category);

    // Sort products
    if (sortBy === 'price-low') {
        categoryProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        categoryProducts.sort((a, b) => b.price - a.price);
    }

    return (
        <div className="min-h-screen bg-champagne-light py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-baseline justify-between border-b border-champagne-dark/30 pb-6 pt-12">
                    <h1 className="font-serif text-4xl font-bold tracking-tight text-luxury-black">
                        {categoryName}
                    </h1>

                    <div className="mt-4 flex items-center">
                        <label htmlFor="sort" className="mr-3 text-sm font-medium text-luxury-black/70">
                            Sort by:
                        </label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-md border-champagne-dark bg-white py-1.5 pl-3 pr-8 text-base text-luxury-black focus:border-luxury-black focus:outline-none focus:ring-1 focus:ring-luxury-black sm:text-sm shadow-sm"
                        >
                            <option value="newest">Newest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="mt-10">
                    {categoryProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
                            {categoryProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-32 text-center">
                            <p className="text-xl text-luxury-black/50 font-serif italic">
                                No products found in this category yet.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
