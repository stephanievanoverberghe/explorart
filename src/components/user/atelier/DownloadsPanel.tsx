// src/components/user/atelier/DownloadsPanel.tsx
import Link from 'next/link';
import { Download } from 'lucide-react';

export function DownloadsPanel() {
    return (
        <section className="space-y-6 md:space-y-7" aria-label="Téléchargements Explor'Art">
            {/* Header résumé */}
            <header className="rounded-3xl border border-perl/50 bg-white/95 px-5 py-4 shadow-sm flex flex-col gap-2">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Téléchargements</p>
                <h2 className="font-serif-title text-xl md:text-2xl text-main">Tes fiches & ressources à télécharger</h2>
                <p className="text-sm text-main/70 max-w-2xl">Ici, tu retrouveras tous les PDF, fiches pratiques et bonus débloqués dans les parcours et articles.</p>
            </header>

            {/* État vide — version sans gradient */}
            <section
                className="
                    relative overflow-hidden
                    rounded-3xl border border-dashed border-perl/60
                    bg-white/95 backdrop-blur-sm
                    px-6 py-8 md:px-8 md:py-10
                    shadow-sm
                    flex flex-col items-center text-center gap-5
                "
            >
                {/* halo ultra léger uniquement aux bords */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/60 shadow-[inset_0_0_15px_rgba(0,0,0,0.03)]" />

                <div className="relative flex flex-col items-center gap-5 max-w-xl">
                    {/* Icône */}
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sage/10 shadow-xxs ring-1 ring-sage/20">
                        <Download className="h-7 w-7 text-sage" />
                    </div>

                    {/* Texte principal */}
                    <div className="space-y-2">
                        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Ressources</p>
                        <h3 className="font-serif-title text-xl text-main">Aucune fiche débloquée pour le moment</h3>
                        <p className="text-sm md:text-base text-main/70">
                            Dès que tu débloques une fiche PDF ou une ressource pratique, elle apparaîtra ici, toujours à portée de main.
                        </p>
                    </div>

                    {/* Liste des contenus à venir */}
                    <ul className="grid gap-2 w-full text-left md:text-center md:grid-cols-3 text-[0.85rem] text-main/70 mt-2">
                        <li className="flex items-start gap-2 md:justify-center">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sage" />
                            <span>Fiches « exercices doux »</span>
                        </li>
                        <li className="flex items-start gap-2 md:justify-center">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-ocre" />
                            <span>Guides PDF récapitulatifs</span>
                        </li>
                        <li className="flex items-start gap-2 md:justify-center">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-prune" />
                            <span>Bonus de fin de parcours</span>
                        </li>
                    </ul>

                    {/* CTA alignés */}
                    <div className="flex flex-wrap justify-center gap-3 pt-3 text-sm font-medium">
                        <Link
                            href="/articles"
                            className="inline-flex items-center gap-2 rounded-full bg-sage px-4 py-2.5 text-ivory shadow-sm transition hover:-translate-y-0.5 hover:bg-sage/80"
                        >
                            <span>Découvrir les articles</span>
                            <span aria-hidden>↗</span>
                        </Link>

                        <Link
                            href="/commencer-ici"
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-ivory px-4 py-2.5 text-main/80 transition hover:border-sage/70 hover:bg-sage/5 hover:-translate-y-0.5"
                        >
                            <span>Commencer un parcours</span>
                        </Link>
                    </div>

                    <p className="text-[0.78rem] text-main/60 pt-1">Toutes tes ressources restent enregistrées ici, même si tu changes d’appareil.</p>
                </div>
            </section>
        </section>
    );
}
