'use client';

import Image from 'next/image';
import { use } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/ProductCard';
import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { addToCart } = useCart();
    const { products } = useProducts();

    const product = products.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-champagne-light py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
                    {/* Image Gallery */}
                    <div className="flex flex-col-reverse">
                        <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-champagne shadow-lg">
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={800}
                                height={1000}
                                className="h-full w-full object-cover object-center"
                                priority
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <h1 className="font-serif text-4xl font-bold tracking-tight text-luxury-black">
                            {product.name}
                        </h1>
                        <div className="mt-4">
                            <h2 className="sr-only">Product information</h2>
                            <p className="font-serif text-3xl text-luxury-black">
                                ₵{product.price.toLocaleString()}
                            </p>
                        </div>

                        <div className="mt-8">
                            <h3 className="sr-only">Description</h3>
                            <div className="space-y-6 text-base text-luxury-black/80 leading-relaxed">
                                <p>{product.description}</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flex items-center">
                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${product.stock > 0 ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-red-50 text-red-700 ring-red-600/20'}`}>
                                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                        </div>

                        <div className="mt-10 flex">
                            <button
                                onClick={() => addToCart(product)}
                                disabled={product.stock === 0}
                                className="flex max-w-xs flex-1 items-center justify-center rounded-full bg-luxury-black px-8 py-4 text-base font-semibold text-white hover:bg-luxury-black/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-luxury-black focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all active:scale-95"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-24 border-t border-champagne-dark/30 pt-16">
                        <h2 className="font-serif text-3xl font-bold tracking-tight text-luxury-black mb-10">
                            You may also like
                        </h2>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
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
