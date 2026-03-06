'use client';

import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-oristic-black">
            {/* Hero Section */}
            <section className="relative h-[50vh] overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920"
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
                            their ambition — one that combines world-class engineering with breathtaking design.
                        </p>
                        <p className="mt-6 text-lg leading-relaxed text-white/60">
                            From the moment you walk into our showroom, you&apos;ll feel the difference. Our curated collection
                            spans the finest brands in the world, handpicked for performance enthusiasts and luxury seekers alike.
                            At Oristic Motors, we don&apos;t just sell cars — we help you find your perfect driving companion.
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
                            <div className="mx-auto w-20 h-20 rounded-full bg-oristic-gold/10 flex items-center justify-center mb-6 group-hover:bg-oristic-gold/20 transition-colors">
                                <svg className="w-10 h-10 text-oristic-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                </svg>
                            </div>
                            <h3 className="font-serif text-xl font-bold text-oristic-gold">Performance</h3>
                            <p className="mt-4 text-sm text-white/50 leading-relaxed">
                                Every vehicle in our collection is chosen for its exceptional performance, engineering excellence, and driving dynamics.
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="mx-auto w-20 h-20 rounded-full bg-oristic-gold/10 flex items-center justify-center mb-6 group-hover:bg-oristic-gold/20 transition-colors">
                                <svg className="w-10 h-10 text-oristic-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </div>
                            <h3 className="font-serif text-xl font-bold text-oristic-gold">Craftsmanship</h3>
                            <p className="mt-4 text-sm text-white/50 leading-relaxed">
                                We celebrate the art of automotive design — every curve, every stitch, every detail crafted to perfection.
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="mx-auto w-20 h-20 rounded-full bg-oristic-gold/10 flex items-center justify-center mb-6 group-hover:bg-oristic-gold/20 transition-colors">
                                <svg className="w-10 h-10 text-oristic-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                </svg>
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
