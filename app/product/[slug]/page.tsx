'use client';

import Image from 'next/image';
import { use } from 'react';
import { products } from '../../lib/data';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/ProductCard';
import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { addToCart } = useCart();

    const product = products.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    return (
        <div className="bg-white dark:bg-black min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    {/* Image Gallery */}
                    <div className="flex flex-col-reverse">
                        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={800}
                                height={800}
                                className="h-full w-full object-cover object-center"
                                priority
                            />
                        </div>
                        {/* Thumbnails could go here */}
                    </div>

                    {/* Product Info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <h1 className="text-3xl font-bold tracking-tight text-luxury-black dark:text-white">
                            {product.name}
                        </h1>
                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-luxury-black dark:text-white">
                                ₵{product.price.toLocaleString()}
                            </p>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <div className="space-y-6 text-base text-gray-700 dark:text-gray-300">
                                <p>{product.description}</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center">
                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${product.stock > 0 ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-red-50 text-red-700 ring-red-600/20'}`}>
                                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                        </div>

                        <div className="mt-10 flex">
                            <button
                                onClick={() => addToCart(product)}
                                disabled={product.stock === 0}
                                className="flex max-w-xs flex-1 items-center justify-center rounded-full bg-luxury-black px-8 py-3 text-base font-medium text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-luxury-black focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed dark:bg-white dark:text-black dark:hover:bg-gray-200"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-24 border-t border-gray-200 pt-16 dark:border-zinc-800">
                        <h2 className="text-2xl font-bold tracking-tight text-luxury-black dark:text-white">
                            You may also like
                        </h2>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                            {relatedProducts.map((related) => (
                                <ProductCard key={related.id} product={related} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
