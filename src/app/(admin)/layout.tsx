export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen bg-page text-main">
            <div className="max-w-6xl mx-auto px-6 py-10">
                <header className="mb-10">
                    <h1 className="font-serif-title text-2xl md:text-3xl text-main">Espace Admin</h1>
                    <p className="text-main/60 text-sm md:text-base">Interface en construction — bientôt plus d’outils ✨</p>
                </header>

                <section className="rounded-3xl border border-perl/60 bg-white/80 px-6 py-8 shadow-sm">{children}</section>
            </div>
        </main>
    );
}
