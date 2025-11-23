export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen bg-page text-main">
            <div className="max-w-5xl mx-auto px-6 py-10">
                <header className="mb-8">
                    <h1 className="font-serif-title text-2xl md:text-3xl text-main">Mon espace</h1>
                    <p className="text-main/60 text-sm md:text-base">Tableau de bord en construction — bientôt ton studio ✨</p>
                </header>

                <section className="rounded-3xl border border-perl/60 bg-white/80 px-6 py-8 shadow-sm">{children}</section>
            </div>
        </main>
    );
}
