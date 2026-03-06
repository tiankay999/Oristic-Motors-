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
        <div className="group relative flex flex-col overflow-hidden rounded-xl bg-oristic-dark border border-oristic-gray/30 shadow-sm transition-all hover:shadow-lg hover:shadow-oristic-gold/10 hover:-translate-y-1">
            <Link href={`/product/${product.slug}`} className="relative aspect-[4/3] w-full overflow-hidden bg-oristic-gray/20">
                <Image
                    src={(product.images && product.images[0]) || product.image || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${product.stock <= 0 ? 'opacity-50 grayscale' : ''}`}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                {product.stock <= 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                            Sold Out
                        </span>
                    </div>
                )}
                {product.stock > 0 && product.discountPercent && (
                    <span className="absolute top-2 left-2 rounded-full bg-oristic-gold px-2.5 py-0.5 text-[10px] font-bold text-oristic-black tracking-wide">
                        {product.discountPercent}% OFF
                    </span>
                )}
            </Link>

            <div className="flex flex-1 flex-col p-3 sm:p-4">
                <Link href={`/product/${product.slug}`}>
                    <h3 className="font-serif text-sm sm:text-base font-medium text-white line-clamp-1 group-hover:text-oristic-gold transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <p className="mt-1 text-xs sm:text-sm text-white/50 line-clamp-1 sm:line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-3 gap-2">
                    <span className="font-serif text-base sm:text-lg font-bold text-oristic-gold">
                        ₵{product.price.toLocaleString()}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock <= 0}
                        className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${product.stock <= 0
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-oristic-gold text-oristic-black hover:bg-oristic-gold-light hover:shadow-lg active:scale-95'
                            }`}
                    >
                        {product.stock <= 0 ? 'Sold Out' : 'Reserve'}
                    </button>
                </div>
            </div>
        </div>
    );
}
