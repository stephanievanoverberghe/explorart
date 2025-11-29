import Link from 'next/link';
import { Download } from 'lucide-react';

export function DownloadsPanel() {
    return (
        <section className="space-y-6">
            <div className="space-y-1">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Téléchargements</p>
                <h2 className="font-serif-title text-xl md:text-2xl text-main">Tes fiches & ressources à télécharger</h2>
                <p className="text-sm text-main/70 max-w-2xl">
                    Ici, tu retrouveras tous les PDF, fiches pratiques et bonus que tu auras débloqués dans les articles ou les parcours.
                </p>
            </div>

            <div className="rounded-3xl border border-perl/60 bg-white/95 p-6 shadow-sm space-y-3 flex flex-col items-center text-center">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage/10">
                    <Download className="h-5 w-5 text-sage" />
                </div>
                <h3 className="font-serif-title text-lg text-main">Rien à télécharger pour le moment</h3>
                <p className="text-sm text-main/70 max-w-md">
                    Dès que des fiches pratiques ou des ressources PDF seront disponibles, tu pourras les récupérer ici, sans les chercher dans tout le site.
                </p>
                <Link
                    href="/articles"
                    className="inline-flex items-center justify-center rounded-full border border-perl/70 bg-ivory px-4 py-2.5 text-sm font-medium text-main/80 hover:border-sage/70 hover:bg-sage/5 transition"
                >
                    Découvrir les articles
                </Link>
            </div>
        </section>
    );
}
