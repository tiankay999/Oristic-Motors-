'use client';

import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="bg-champagne min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[40vh] w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?auto=format&fit=crop&q=80&w=1920"
                        alt="Luxury Background"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-champagne/50 to-champagne" />
                </div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="font-serif text-5xl md:text-6xl font-bold text-luxury-black mb-4">
                        The Story of <span className="text-gold-accent">Minaglitzy</span>
                    </h1>
                    <p className="text-lg md:text-xl text-luxury-black/70 max-w-2xl mx-auto">
                        Where elegance meets authenticity.
                    </p>
                </div>
            </section>

            {/* Owner Section */}
            <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Owner Image */}
                    <div className="relative aspect-[3/4] w-full max-w-md mx-auto md:max-w-none rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                        <Image
                            src="https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/471060448_18473176264039795_3582118303691142227_n.jpg?_nc_cat=111&_nc_cb=99be929b-f3b7c874&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGt9t57_Fs6Q0R6zU2ViSn6at_9e8AXhnJq3_17wBeGctsqS_v_3EinXjb5szJiXJgf3p1CFVYt0XctkcPYgBzQ&_nc_ohc=0RlSn426CEoQ7kNvwEKJ8Nw&_nc_oc=AdmoYQsjCBk67yDY7NV8lho6nIl64hleaFY6G3_F22H7HnVlCiY0IKvAUJ3j1f9dAdc&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=HgPp2jB_XzE2YL2OQjmHMg&oh=00_AfjAyv5n5G7wdBIxwntvQkaC0GqKTIfNtpk9moVMTsqNxg&oe=692FEF50"
                            alt="Founder of Minaglitzy"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 border-2 border-gold-accent/20 rounded-2xl m-4 pointer-events-none" />
                    </div>

                    {/* Owner Bio */}
                    <div className="space-y-6 text-center md:text-left">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-luxury-black">
                            Meet the <span className="text-gold-accent">Founder</span>
                        </h2>
                        <div className="w-24 h-1 bg-gold-accent mx-auto md:mx-0 rounded-full" />
                        <p className="text-lg text-luxury-black/80 leading-relaxed">
                            Welcome to Minaglitzy. I founded this brand with a singular vision: to empower individuals to express their unique beauty through high-quality, luxurious accessories.
                        </p>
                        <p className="text-lg text-luxury-black/80 leading-relaxed">
                            From our premium bone straight wigs to our handcrafted jewelry, every piece in our collection is curated with love and an eye for detail. I believe that true luxury isn't just about the price tag—it's about how it makes you feel.
                        </p>
                        <p className="text-lg text-luxury-black/80 leading-relaxed">
                            "Beauty is power, and a smile is its sword." Thank you for being part of our journey.
                        </p>
                        <div className="pt-4">
                            <p className="font-serif text-xl font-bold text-luxury-black">– Mina</p>
                            <p className="text-sm text-luxury-black/60 uppercase tracking-wider">Founder & CEO</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl font-bold text-luxury-black">Our Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Quality First',
                                description: 'We never compromise on the quality of our materials. Only the best for our customers.',
                                icon: (
                                    <svg className="w-8 h-8 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: 'Timeless Elegance',
                                description: 'Our designs are meant to transcend trends, offering you style that lasts a lifetime.',
                                icon: (
                                    <svg className="w-8 h-8 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: 'Customer Love',
                                description: 'Your satisfaction is our heartbeat. We are dedicated to providing an exceptional shopping experience.',
                                icon: (
                                    <svg className="w-8 h-8 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                )
                            }
                        ].map((value, index) => (
                            <div key={index} className="bg-champagne p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-6 shadow-sm">
                                    {value.icon}
                                </div>
                                <h3 className="font-serif text-xl font-bold text-luxury-black mb-4">{value.title}</h3>
                                <p className="text-luxury-black/70">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
