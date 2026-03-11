'use client';

import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-oristic-black">
            {/* Hero Section */}
            <section className="relative h-[50vh] overflow-hidden">
                <Image
                    src="/icon.png"
                    alt="Luxury Car Showroom"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-oristic-black via-oristic-black/50 to-transparent" />
                <div className="relative z-10 flex h-full items-center justify-center">
                    <div className="text-center">
                        <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">
                            Our <span className="text-oristic-gold">Story</span>
                        </h1>
                        <div className="mt-4 mx-auto h-1 w-24 bg-oristic-gold rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="font-serif text-3xl font-bold text-white">
                            Where <span className="text-oristic-gold">Luxury</span> Meets the Road
                        </h2>
                        <p className="mt-8 text-lg leading-relaxed text-white/60">
                            Founded with a passion for exceptional automobiles, Oristic Motors has grown into one of the most
                            trusted names in luxury car dealership. We believe that every driver deserves a vehicle that matches
                            their ambition, one that combines world-class engineering with breathtaking design and STEEZE.
                        </p>
                        <p className="mt-6 text-lg leading-relaxed text-white/60">
                            From the moment you walk into our showroom, you&apos;ll feel the difference. Our curated collection
                            spans the finest brands in the world, handpicked for performance enthusiasts and luxury seekers alike.
                            At Oristic Motors, we don&apos;t just sell cars, we help you find your perfect driving companion.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-oristic-dark">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center font-serif text-3xl font-bold text-white mb-16">
                        What <span className="text-oristic-gold">Drives</span> Us
                    </h2>
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                        <div className="text-center group">
                            <div className="mx-auto w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 group-hover:bg-oristic-gold/20 transition-colors">
                                <Image src="/ford.png" alt="Performance" width={100} height={100} />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-oristic-gold">Performance</h3>
                            <p className="mt-4 text-sm text-white/50 leading-relaxed">
                                Every vehicle in our collection is chosen for its exceptional performance, engineering excellence, and driving dynamics.
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="mx-auto w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 group-hover:bg-oristic-gold/20 transition-colors">
                                <Image src="/benz.png" alt="Performance" width={100} height={100} />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-oristic-gold">Craftsmanship</h3>
                            <p className="mt-4 text-sm text-white/50 leading-relaxed">
                                We celebrate the art of automotive design — every curve, every stitch, every detail crafted to perfection.
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="mx-auto w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 group-hover:bg-oristic-gold/20 transition-colors">
                                <Image src="/lambo.png" alt="Performance" width={100} height={100} />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-oristic-gold">Service</h3>
                            <p className="mt-4 text-sm text-white/50 leading-relaxed">
                                From your first visit to long after the keys are in your hand, our dedicated team ensures a world-class ownership experience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
