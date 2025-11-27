export default function Footer() {
    return (
        <footer className="border-t border-champagne-dark/30 bg-champagne py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="font-serif text-2xl font-bold text-luxury-black">Minaglitzy</h3>
                        <p className="mt-6 max-w-sm text-sm leading-relaxed text-luxury-black/70">
                            Your premium destination for luxury wigs, fashion accessories, and beauty products.
                            Elevate your elegance with our curated collection.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-serif font-semibold text-luxury-black">Shop</h4>
                        <ul className="mt-6 space-y-3 text-sm text-luxury-black/70">
                            <li><a href="/wigs" className="hover:text-luxury-black transition-colors">Wigs</a></li>
                            <li><a href="/sunglasses" className="hover:text-luxury-black transition-colors">Sunglasses</a></li>
                            <li><a href="/turbans" className="hover:text-luxury-black transition-colors">Turbans</a></li>
                            <li><a href="/skincare" className="hover:text-luxury-black transition-colors">Skincare</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-serif font-semibold text-luxury-black">Support</h4>
                        <ul className="mt-6 space-y-3 text-sm text-luxury-black/70">
                            <li><a href="#" className="hover:text-luxury-black transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-luxury-black transition-colors">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-luxury-black transition-colors">FAQ</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 border-t border-champagne-dark/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-luxury-black/50">
                        &copy; {new Date().getFullYear()} Minaglitzy. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {/* Social icons could go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
