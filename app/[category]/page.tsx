'use client';

import { useState, use } from 'react';
import { products, categories } from '../lib/data';
import ProductCard from '../components/ProductCard';
import { notFound } from 'next/navigation';

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = use(params);
    const [sortBy, setSortBy] = useState('newest');

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
    // 'newest' is default (assuming array order is newest for now, or we could add date field)

    return (
        <div className="bg-white dark:bg-black min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-baseline justify-between border-b border-gray-200 pb-6 pt-24 dark:border-zinc-800">
                    <h1 className="text-4xl font-bold tracking-tight text-luxury-black dark:text-white">
                        {categoryName}
                    </h1>

                    <div className="mt-4 flex items-center">
                        <label htmlFor="sort" className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                            Sort by:
                        </label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-md border-gray-300 py-1 pl-3 pr-8 text-base focus:border-luxury-black focus:outline-none focus:ring-luxury-black dark:bg-zinc-900 dark:text-white sm:text-sm"
                        >
                            <option value="newest">Newest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="mt-10">
                    {categoryProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                            {categoryProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <p className="text-lg text-gray-500 dark:text-gray-400">
                                No products found in this category yet.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
