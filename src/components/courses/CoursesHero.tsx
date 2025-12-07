// src/components/courses/CoursesHero.tsx
'use client';

import Link from 'next/link';

export function CoursesHero() {
    return (
        <header className="relative overflow-hidden rounded-3xl px-6 py-7 md:px-9 md:py-9 shadow-lg border border-perl/60 bg-linear-to-r from-sage via-vert/90 to-sage text-ivory">
            {/* halos */}
            <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light bg-[radial-gradient(circle_at_10%_18%,rgba(255,255,255,0.35),transparent_55%),radial-gradient(circle_at_85%_82%,rgba(30,61,114,0.55),transparent_60%)]" />
            {/* inner border */}
            <div className="pointer-events-none absolute inset-4 rounded-[1.75rem] border border-ivory/20" />

            <div className="relative grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] items-center">
                <div className="space-y-4 max-w-xl">
                    <div className="inline-flex items-center gap-2 rounded-full bg-ivory/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-ivory/90">
                        <span className="h-1.5 w-1.5 rounded-full bg-ivory" />
                        <span>Cours & mini-formations</span>
                    </div>

                    <div className="space-y-2.5">
                        <h1 className="font-serif-title text-2xl sm:text-3xl md:text-4xl leading-tight">
                            Apprendre l’art en douceur,
                            <br />
                            <span className="text-ivory/90">un cours à la fois.</span>
                        </h1>
                        <p className="text-sm md:text-base text-ivory/90">
                            Ici, tu trouves des cours construits comme de vraies mini-formations : introduction, 3 modules guidés, conclusion. Tu avances à ton rythme, sans
                            pression de « bien faire ».
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[0.75rem]">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/10 px-3 py-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-vert" />
                            Cours dessin & geste
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/10 px-3 py-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-bleu" />
                            Regarder & comprendre une œuvre
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/10 px-3 py-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose" />
                            Couleurs & émotions
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-1">
                        <Link
                            href="/commencer-ici"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-ivory text-main px-5 py-2.5 text-sm font-medium shadow-md shadow-main/20 hover:-translate-y-0.5 hover:bg-ivory/95 transition-all"
                        >
                            Commencer gratuitement
                            <span>↗</span>
                        </Link>
                        <a
                            href="#liste-cours"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/80 bg-transparent px-4 py-2.5 text-sm font-medium text-ivory hover:bg-ivory hover:text-main hover:-translate-y-0.5 transition-all"
                        >
                            Voir tous les cours
                            <span>↓</span>
                        </a>
                    </div>
                </div>

                {/* bloc info à droite */}
                <aside className="relative rounded-3xl border border-ivory/25 bg-black/15 p-4 md:p-5 space-y-4 shadow-md backdrop-blur-sm">
                    <div className="flex items-center justify-between gap-3">
                        <div className="space-y-1">
                            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory/75">Pensé pour les autodidactes</p>
                            <p className="text-sm text-ivory/92">
                                Chaque cours suit la même structure : une introduction, 3 modules guidés, une conclusion pour savoir comment continuer.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-2 text-[0.8rem] text-ivory/90">
                        <div className="flex items-center justify-between rounded-2xl bg-black/20 px-3 py-2 border border-ivory/20">
                            <span>Modules courts (10–20 min)</span>
                            <span className="text-ivory/80">⏱</span>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl bg-black/20 px-3 py-2 border border-ivory/20">
                            <span>Niveaux débutant & intermédiaire</span>
                            <span className="text-ivory/80">★</span>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl bg-black/20 px-3 py-2 border border-ivory/20">
                            <span>Accès à vie aux mises à jour</span>
                            <span className="text-ivory/80">∞</span>
                        </div>
                    </div>
                </aside>
            </div>
        </header>
    );
}
