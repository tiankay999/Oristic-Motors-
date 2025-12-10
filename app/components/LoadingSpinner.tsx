export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center p-12">
            <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full border-4 border-champagne-dark/30"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-luxury-black animate-spin"></div>
            </div>
            <p className="mt-4 font-serif text-lg text-luxury-black/60 animate-pulse">
                Curating elegance...
            </p>
        </div>
    );
}
