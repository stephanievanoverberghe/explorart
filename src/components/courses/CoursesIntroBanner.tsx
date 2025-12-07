// src/components/courses/CoursesIntroBanner.tsx

import Link from 'next/link';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';

export function CoursesIntroBanner() {
    return (
        <section className="card relative overflow-hidden border-main/10 bg-main text-ivory shadow-lg shadow-main/10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_40%,rgba(255,255,255,0.06),transparent_32%)]" />
            <div className="relative grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:items-center">
                <div className="space-y-3 md:space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-ivory/25 bg-white/10 px-3 py-1 text-[0.75rem] uppercase tracking-[0.16em]">
                        <Compass className="h-3.5 w-3.5" />
                        <span>Parcours Explor&apos;Art</span>
                    </div>
                    <div className="space-y-2">
                        <h1 className="font-serif-title text-2xl sm:text-3xl md:text-4xl leading-tight">Tes cours pour pratiquer l&apos;art avec confiance</h1>
                        <p className="text-sm md:text-base text-ivory/90 max-w-2xl">
                            Des cours concis mais structurés : une introduction, trois modules guidés, une conclusion pour ancrer ce que tu as découvert. Chaque parcours respecte
                            ton temps, ton énergie et ta sensibilité.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[0.8rem] text-ivory/90">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                            <Sparkles className="h-4 w-4" />
                            Accès illimité après achat
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">Sans date limite · Rejouable</span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">Guides écrits & audios</span>
                    </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-ivory/25 bg-white/10 px-4 py-5 shadow-inner shadow-black/10">
                    <p className="text-sm text-ivory/90">Nouveau ? Commence par le mini-parcours offert pour poser des bases solides avant de choisir un cours payant.</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                        <Link
                            href="/commencer-ici"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-ivory px-4 py-2 text-sm font-medium text-main shadow-sm transition-colors hover:bg-ivory/90"
                        >
                            Commencer gratuitement
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/formations"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/60 px-4 py-2 text-sm font-medium text-ivory/90 transition-colors hover:bg-white/5"
                        >
                            Voir les parcours avancés
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
