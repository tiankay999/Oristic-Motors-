'use client';

import Image from "next/image";
import Link from "next/link";
import { products } from "./lib/data";
import ProductCard from "./components/ProductCard";

export default function Home() {
  // Get a mix of products for the "Explore Our Collection" section
  // We'll just take the first 6 products for now
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-champagne dark:bg-zinc-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Beauty"
            fill
            className="object-cover opacity-80 dark:opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-champagne/90 to-transparent dark:from-black/90" />
        </div>

        <div className="relative z-10 flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-luxury-black dark:text-white sm:text-7xl">
            Elevate Your <br />
            <span className="text-soft-gold">Elegance</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-gray-700 dark:text-gray-300">
            Discover our exclusive collection of luxury wigs, accessories, and beauty essentials designed to make you shine.
          </p>
          <div className="mt-10">
            <Link
              href="/wigs"
              className="inline-block rounded-full bg-luxury-black px-8 py-4 text-base font-semibold text-white transition-all hover:bg-black/80 hover:shadow-lg dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Explore Collection Section */}
      <section className="py-24 bg-champagne-light dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-luxury-black dark:text-white sm:text-4xl">
              Explore Our Collection
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Curated pieces for the modern, sophisticated you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/wigs"
              className="inline-flex items-center justify-center rounded-full border-2 border-luxury-black px-8 py-3 text-base font-semibold text-luxury-black transition-colors hover:bg-luxury-black hover:text-champagne dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid (Optional Visual) */}
      <section className="py-16 bg-champagne dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-2xl font-bold text-luxury-black dark:text-white">Shop by Category</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {['Wigs', 'Sunglasses', 'Bags', 'Skincare'].map((cat) => (
              <Link
                key={cat}
                href={`/${cat.toLowerCase()}`}
                className="group relative aspect-square overflow-hidden rounded-xl bg-gray-200"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/40">
                  <span className="text-xl font-bold text-white">{cat}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
