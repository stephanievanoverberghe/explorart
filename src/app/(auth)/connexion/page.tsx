import { Suspense } from 'react';
import { ConnexionPageClient } from './ConnexionPageClient';

export default function ConnexionPage() {
    return (
        <Suspense
            fallback={
                <main className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 py-6 md:px-6">
                    <section className="rounded-3xl bg-ivory px-6 py-4 shadow-md border border-perl/60 text-sm text-main">Chargement de la page de connexion…</section>
                </main>
            }
        >
            <ConnexionPageClient />
        </Suspense>
    );
}
