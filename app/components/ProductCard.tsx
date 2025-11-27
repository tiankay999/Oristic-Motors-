'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../lib/data';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-md dark:bg-zinc-900">
            <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {product.discountPercent && (
                    <span className="absolute top-3 left-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                        {product.discountPercent}% OFF
                    </span>
                )}
            </Link>

            <div className="flex flex-1 flex-col p-4">
                <Link href={`/product/${product.slug}`}>
                    <h3 className="text-lg font-medium text-luxury-black dark:text-white line-clamp-1">
                        {product.name}
                    </h3>
                </Link>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-xl font-bold text-luxury-black dark:text-white">
                        ₵{product.price.toLocaleString()}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="rounded-full bg-luxury-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
