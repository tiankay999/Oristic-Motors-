'use client';

import Image from 'next/image';
import { use, useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/ProductCard';
import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { addToCart } = useCart();
    const { products } = useProducts();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [rotationAngle, setRotationAngle] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [lastX, setLastX] = useState(0);
    const [autoRotate, setAutoRotate] = useState(true);

    const product = products.find((p) => p.slug === slug);

    // Auto-rotate effect for 3D viewer simulation
    useEffect(() => {
        if (!autoRotate || isDragging) return;
        const interval = setInterval(() => {
            setRotationAngle(prev => (prev + 0.5) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, [autoRotate, isDragging]);

    if (!product) {
        notFound();
    }

    // Get images array - handle both new images array and legacy image field
    const productImages = product.images && product.images.length > 0
        ? product.images.filter(img => img && img.trim())
        : (product.image ? [product.image] : []);

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setLastX(e.clientX);
        setAutoRotate(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const delta = e.clientX - lastX;
        setRotationAngle(prev => (prev + delta * 0.5) % 360);
        setLastX(e.clientX);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setLastX(e.touches[0].clientX);
        setAutoRotate(false);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const delta = e.touches[0].clientX - lastX;
        setRotationAngle(prev => (prev + delta * 0.5) % 360);
        setLastX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <div className="min-h-screen bg-oristic-black py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
                    {/* Image Gallery / 3D Viewer */}
                    <div className="flex flex-col">
                        {/* 3D Interactive Viewer */}
                        <div
                            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-oristic-dark border border-oristic-gray/30 shadow-lg cursor-grab active:cursor-grabbing"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div
                                className="h-full w-full transition-transform duration-100"
                                style={{
                                    transform: `perspective(1000px) rotateY(${rotationAngle}deg)`,
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                                <Image
                                    src={productImages[selectedImageIndex] || '/placeholder.jpg'}
                                    alt={product.name}
                                    width={800}
                                    height={600}
                                    className="h-full w-full object-cover object-center"
                                    priority
                                />
                            </div>

                            {/* 3D Viewer Controls */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-oristic-black/80 backdrop-blur-sm rounded-full px-4 py-2 border border-oristic-gold/30">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setAutoRotate(!autoRotate);
                                    }}
                                    className={`text-xs font-medium transition-colors ${autoRotate ? 'text-oristic-gold' : 'text-white/60 hover:text-white'}`}
                                >
                                    {autoRotate ? '⏸ Auto-Rotate' : '▶ Auto-Rotate'}
                                </button>
                                <div className="w-px h-4 bg-oristic-gray/50"></div>
                                <span className="text-xs text-white/40">
                                    Drag to rotate 360°
                                </span>
                            </div>
                        </div>

                        {/* Thumbnail Navigation - only show if more than 1 image */}
                        {productImages.length > 1 && (
                            <div className="mt-4 flex gap-3 justify-center">
                                {productImages.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImageIndex === index
                                            ? 'border-oristic-gold shadow-md shadow-oristic-gold/20'
                                            : 'border-oristic-gray/30 opacity-70 hover:opacity-100'
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} - Image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <span className="text-sm uppercase tracking-wider text-oristic-gold font-medium">
                            {product.category.replace('-', ' ')}
                        </span>
                        <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-white">
                            {product.name}
                        </h1>
                        <div className="mt-4">
                            <h2 className="sr-only">Product information</h2>
                            <p className="font-serif text-3xl text-oristic-gold">
                                ₵{product.price.toLocaleString()}
                            </p>
                        </div>

                        <div className="mt-8">
                            <h3 className="sr-only">Description</h3>
                            <div className="space-y-6 text-base text-white/70 leading-relaxed">
                                <p>{product.description}</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flex items-center">
                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${product.stock > 0 ? 'bg-green-900/30 text-green-400 ring-green-500/30' : 'bg-red-900/30 text-red-400 ring-red-500/30'}`}>
                                    {product.stock > 0 ? `${product.stock} Available` : 'Sold Out'}
                                </span>
                            </div>
                        </div>

                        <div className="mt-10 flex">
                            <button
                                onClick={() => addToCart(product)}
                                disabled={product.stock === 0}
                                className="flex max-w-xs flex-1 items-center justify-center rounded-full bg-oristic-gold px-8 py-4 text-base font-semibold text-oristic-black hover:bg-oristic-gold-light hover:shadow-lg hover:shadow-oristic-gold/20 focus:outline-none focus:ring-2 focus:ring-oristic-gold focus:ring-offset-2 focus:ring-offset-oristic-black disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-all active:scale-95"
                            >
                                {product.stock === 0 ? 'Sold Out' : 'Reserve This Vehicle'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-24 border-t border-oristic-gold/20 pt-16">
                        <h2 className="font-serif text-3xl font-bold tracking-tight text-white mb-10">
                            Similar <span className="text-oristic-gold">Vehicles</span>
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
