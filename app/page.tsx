'use client';

import Image from "next/image";
import Link from "next/link";
import { useProducts } from "./context/ProductContext";
import { categories } from "./lib/data";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const { products } = useProducts();
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 24);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-champagne">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://i.pinimg.com/736x/4d/5d/11/4d5d1137ce8e873454dc4938027f2c89.jpg"
            alt="Luxury Beauty"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-champagne/90 via-champagne/50 to-transparent" />
        </div>

        <div className="relative z-10 flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <span className="mb-4 font-serif text-xl italic text-luxury-black/80">
            Redefine your beauty
          </span>
          <h1 className="max-w-2xl font-serif text-6xl font-bold tracking-tight text-luxury-black sm:text-7xl lg:text-8xl">
            Elevate Your <br />
            <span className="text-gold-accent">Elegance</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-luxury-black/80">
            Discover our exclusive collection of luxury wigs, accessories, and beauty essentials designed to make you shine with confidence and grace.
          </p>
          <div className="mt-12">
            <Link
              href="/wigs"
              className="inline-block rounded-full bg-luxury-black px-10 py-4 text-base font-semibold text-white transition-all hover:bg-luxury-black/80 hover:shadow-xl hover:-translate-y-1"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Explore Collection Section */}
      <section className="py-24 bg-champagne-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-luxury-black sm:text-5xl">
              Explore Our Collection
            </h2>
            <div className="mt-4 mx-auto h-1 w-24 bg-gold-accent rounded-full"></div>
            <p className="mt-6 text-lg text-luxury-black/60">
              Curated pieces for the modern, sophisticated you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link
              href="/wigs"
              className="inline-flex items-center justify-center rounded-full border-2 border-luxury-black px-10 py-3.5 text-base font-semibold text-luxury-black transition-all hover:bg-luxury-black hover:text-white"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Visual Grid */}
      <section className="py-20 bg-champagne">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 font-serif text-3xl font-bold text-luxury-black text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-luxury-black/20 transition-colors group-hover:bg-luxury-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-2xl font-bold text-white drop-shadow-lg">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
