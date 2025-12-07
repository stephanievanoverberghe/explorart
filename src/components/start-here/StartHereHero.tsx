// src/components/start-here/StartHereHero.tsx

import Link from 'next/link';
import { ArrowUpRight, Compass, Heart, Sparkles } from 'lucide-react';

export function StartHereHero() {
    return (
        <header className="card relative overflow-hidden border-sage/40 bg-sage/5">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,109,77,0.08),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(74,109,77,0.05),transparent_38%)]" />
            <div className="relative grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:items-center">
                <div className="space-y-3 md:space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-[0.75rem] uppercase tracking-[0.18em] text-main/70">
                        <span className="inline-flex items-center gap-2 rounded-full bg-sage/10 px-3 py-1 text-sage">
                            <Compass className="h-3.5 w-3.5" />
                            Mini-formation — Commencer ici
                        </span>
                        <span className="hidden h-px w-10 bg-main/20 sm:block" />
                        <span className="text-main/60">5 modules · geste · regard · couleurs</span>
                    </div>

                    <div className="space-y-2">
                        <h1 className="font-serif-title text-2xl sm:text-3xl md:text-4xl leading-tight text-main">
                            Prendre confiance avec l&apos;art, comme une petite formation à ton rythme.
                        </h1>
                        <p className="text-main/75 text-sm md:text-base max-w-2xl">
                            Tu suis un parcours court mais structuré : introduction, trois étapes guidées, puis une conclusion pour savoir comment continuer. Les modules se
                            débloquent progressivement pour t&apos;accompagner pas à pas.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[0.85rem] text-main/75">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/10 px-3 py-1">
                            <Sparkles className="h-4 w-4 text-sage" />
                            Recommandé avant un cours payant
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/10 px-3 py-1">Accès libre</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/10 px-3 py-1">Formats audio & écrit</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Link
                            href="#parcours-commencer"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-main px-4 py-2 text-sm font-medium text-ivory shadow-sm transition-colors hover:bg-main/90"
                        >
                            Lancer le parcours
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/cours"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-main/30 px-4 py-2 text-sm font-medium text-main transition-colors hover:bg-main/5"
                        >
                            Voir les cours après
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-sage/40 bg-white/90 px-4 py-5 shadow-inner shadow-sage/10">
                    <div className="flex items-center gap-2 text-sage">
                        <Heart className="h-4 w-4" />
                        <p className="text-[0.82rem] font-semibold uppercase tracking-[0.16em]">Ce que tu vas sécuriser</p>
                    </div>
                    <ul className="space-y-2 text-sm text-main/75">
                        <li className="flex gap-2">
                            <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-sage" />
                            <span>Des gestes simples pour apprivoiser ton carnet sans pression.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-sage" />
                            <span>Un regard plus confiant sur tes images de référence.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-sage" />
                            <span>Une palette de couleurs simple à réutiliser dans tes futurs cours.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
