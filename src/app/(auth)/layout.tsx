export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen flex items-center justify-center bg-page px-6 py-20">
            <div className="w-full max-w-md rounded-3xl border border-perl/50 bg-white/85 px-6 py-8 shadow-sm text-center">
                <h1 className="font-serif-title text-xl md:text-2xl text-main mb-2">Espace membre</h1>
                <p className="text-main/60 text-sm mb-6">Connexion & inscription — interface en cours de création.</p>

                {children}
            </div>
        </main>
    );
}
