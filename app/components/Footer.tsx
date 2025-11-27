export default function Footer() {
    return (
        <footer className="border-t border-champagne-light/20 bg-champagne py-12 dark:border-zinc-800 dark:bg-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold text-luxury-black dark:text-white">Minaglitzy</h3>
                        <p className="mt-4 max-w-xs text-sm text-gray-500 dark:text-gray-400">
                            Your premium destination for luxury wigs, fashion accessories, and beauty products.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-luxury-black dark:text-white">Shop</h4>
                        <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                            <li><a href="/wigs" className="hover:text-luxury-black dark:hover:text-white">Wigs</a></li>
                            <li><a href="/sunglasses" className="hover:text-luxury-black dark:hover:text-white">Sunglasses</a></li>
                            <li><a href="/turbans" className="hover:text-luxury-black dark:hover:text-white">Turbans</a></li>
                            <li><a href="/skincare" className="hover:text-luxury-black dark:hover:text-white">Skincare</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-luxury-black dark:text-white">Support</h4>
                        <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                            <li><a href="#" className="hover:text-luxury-black dark:hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="hover:text-luxury-black dark:hover:text-white">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-luxury-black dark:hover:text-white">FAQ</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-100 pt-8 dark:border-zinc-800">
                    <p className="text-center text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} Minaglitzy. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
