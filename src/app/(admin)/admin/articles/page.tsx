export default function PageEnConstruction() {
    return (
        <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20">
            <div className="max-w-md space-y-4">
                <h1 className="font-serif-title text-2xl md:text-3xl text-main">Page en construction</h1>

                <p className="text-main/70 text-sm md:text-base">Cette section d’Explor’Art est en cours de création. Reviens un peu plus tard, de belles choses arrivent ✨</p>

                <div className="mt-6">
                    <span className="inline-block px-4 py-2 rounded-full bg-ivory border border-perl/60 text-main text-sm">🚧 Construction en cours</span>
                </div>
            </div>
        </main>
    );
}
