export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center p-12">
            <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full border-4 border-oristic-gray/30"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-oristic-gold animate-spin"></div>
            </div>
            <p className="mt-4 font-serif text-lg text-white/50 animate-pulse">
                Finding your dream ride...
            </p>
        </div>
    );
}
