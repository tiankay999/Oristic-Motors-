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
        <div className="group relative flex flex-col overflow-hidden rounded-xl bg-champagne shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
            <Link href={`/product/${product.slug}`} className="relative aspect-[3/4] w-full overflow-hidden bg-champagne-dark/20">
                <Image
                    src={(product.images && product.images[0]) || product.image || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${product.stock <= 0 ? 'opacity-50 grayscale' : ''}`}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                {product.stock <= 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                            Out of Stock
                        </span>
                    </div>
                )}
                {product.stock > 0 && product.discountPercent && (
                    <span className="absolute top-2 left-2 rounded-full bg-luxury-black px-2.5 py-0.5 text-[10px] font-bold text-white tracking-wide">
                        {product.discountPercent}% OFF
                    </span>
                )}
            </Link>

            <div className="flex flex-1 flex-col p-3 sm:p-4">
                <Link href={`/product/${product.slug}`}>
                    <h3 className="font-serif text-sm sm:text-base font-medium text-luxury-black line-clamp-1 group-hover:text-luxury-black/80 transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <p className="mt-1 text-xs sm:text-sm text-luxury-black/60 line-clamp-1 sm:line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-3 gap-2">
                    <span className="font-serif text-base sm:text-lg font-bold text-luxury-black">
                        ₵{product.price.toLocaleString()}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock <= 0}
                        className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white transition-all whitespace-nowrap ${product.stock <= 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-luxury-black hover:bg-luxury-black/80 hover:shadow-lg active:scale-95'
                            }`}
                    >
                        {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}
