'use client';

import Image from "next/image";
import Link from "next/link";
import { useProducts } from "./context/ProductContext";
import { categories } from "./lib/data";
import ProductCard from "./components/ProductCard";
import LoadingSpinner from "./components/LoadingSpinner";

export default function Home() {
  const { products, isLoading } = useProducts();
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 24);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-oristic-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920"
            alt="Luxury Automobile"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-oristic-black/95 via-oristic-black/70 to-transparent" />
        </div>

        <div className="relative z-10 flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <span className="mb-4 font-serif text-xl italic text-oristic-gold">
            Luxury Redefined
          </span>
          <h1 className="max-w-2xl font-serif text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
            Drive Your <br />
            <span className="text-oristic-gold">Ambition</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
            Discover our exclusive collection of premium vehicles  from powerful SUVs to exhilarating sports cars. Every car tells a story of craftsmanship and performance.
          </p>
          <div className="mt-12 flex gap-4">
            <Link
              href="/suv"
              className="inline-block rounded-full bg-oristic-gold px-10 py-4 text-base font-semibold text-oristic-black transition-all hover:bg-oristic-gold-light hover:shadow-xl hover:-translate-y-1"
            >
              Browse Vehicles
            </Link>
            <Link
              href="/about"
              className="inline-block rounded-full border-2 border-oristic-gold/50 px-10 py-4 text-base font-semibold text-oristic-gold transition-all hover:border-oristic-gold hover:bg-oristic-gold/10"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section className="py-24 bg-oristic-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Featured <span className="text-oristic-gold">Collection</span>
            </h2>
            <div className="mt-4 mx-auto h-1 w-24 bg-oristic-gold rounded-full"></div>
            <p className="mt-6 text-lg text-white/50">
              Handpicked vehicles for the discerning driver.
            </p>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-20 text-center">
            <Link
              href="/sedan"
              className="inline-flex items-center justify-center rounded-full border-2 border-oristic-gold px-10 py-3.5 text-base font-semibold text-oristic-gold transition-all hover:bg-oristic-gold hover:text-oristic-black"
            >
              View All Vehicles
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Visual Grid */}
      <section className="py-20 bg-oristic-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 font-serif text-3xl font-bold text-white text-center">
            Browse by <span className="text-oristic-gold">Category</span>
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md hover:shadow-xl hover:shadow-oristic-gold/10 transition-all border border-oristic-gray/30"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-oristic-black/40 transition-colors group-hover:bg-oristic-black/60"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-2xl font-bold text-white drop-shadow-lg group-hover:text-oristic-gold transition-colors">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
