// src/components/courses/CoursesHero.tsx
'use client';

import Link from 'next/link';
import { CheckCircle2, Clock3, ShieldCheck, Sparkles } from 'lucide-react';

const highlights = [
    {
        label: 'Structure guidée',
        text: 'Intro · 3 modules · conclusion',
        icon: CheckCircle2,
    },
    {
        label: 'Rythme réaliste',
        text: '45 à 90 minutes au total',
        icon: Clock3,
    },
    {
        label: 'Accès serein',
        text: 'Rejouable, sans date limite',
        icon: ShieldCheck,
    },
];

export function CoursesHero() {
    return (
        <header className="relative overflow-hidden rounded-4xl border border-perl/70 bg-linear-to-r from-[color-mix(in_oklab,var(--color-sage)_78%,#0b1d16_22%)] via-[color-mix(in_oklab,var(--color-vert)_80%,#0d2c21_20%)] to-[color-mix(in_oklab,var(--color-bleu)_78%,#0f2134_22%)] px-6 py-8 text-ivory shadow-lg shadow-main/10 md:px-10 md:py-12">
            <div className="pointer-events-none absolute inset-0 opacity-50 mix-blend-soft-light bg-[radial-gradient(circle_at_14%_20%,rgba(255,255,255,0.32),transparent_48%),radial-gradient(circle_at_86%_78%,rgba(27,52,101,0.35),transparent_48%)]" />
            <div className="pointer-events-none absolute inset-3 rounded-[2.3rem] border border-ivory/15" />

            <div className="relative grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <div className="space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-ivory/12 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-ivory/90">
                        <span className="h-1.5 w-1.5 rounded-full bg-ivory" />
                        <span>Parcours Explor&apos;Art</span>
                    </div>

                    <div className="space-y-3">
                        <h1 className="font-serif-title text-3xl leading-tight sm:text-4xl md:text-5xl">
                            Des cours qui respectent ton rythme
                            <br />
                            <span className="text-ivory/85">et donnent de la cohérence à ta pratique.</span>
                        </h1>
                        <p className="max-w-2xl text-sm text-ivory/90 sm:text-base">
                            Chaque cours est construit comme une mini-formation complète, sans catalogue fouillis : une porte d&apos;entrée claire, trois modules progressifs, une
                            conclusion qui t&apos;aide à prolonger l&apos;élan chez toi.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[0.82rem] text-ivory/90">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                            <Sparkles className="h-4 w-4" />
                            Dessin & gestes rassurants
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">Regarder une œuvre sans se sentir perdu·e</span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">Couleurs, émotions, psychologie de l’art</span>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-1">
                        <Link
                            href="/commencer-ici"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-ivory px-5 py-2.5 text-sm font-medium text-main shadow-lg shadow-main/25 transition-all hover:-translate-y-0.5 hover:bg-ivory/95"
                        >
                            Commencer gratuitement
                            <span>↗</span>
                        </Link>
                        <a
                            href="#liste-cours"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/75 bg-transparent px-4 py-2.5 text-sm font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-ivory hover:text-main"
                        >
                            Parcourir les cours
                            <span>↓</span>
                        </a>
                    </div>
                </div>

                <aside className="relative grid gap-4 rounded-3xl border border-ivory/25 bg-black/15 p-5 shadow-inner shadow-black/10 backdrop-blur-sm lg:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="space-y-1">
                            <p className="text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ivory/70">Une méthode simple</p>
                            <p className="max-w-sm text-sm text-ivory/88">
                                Les cours sont pensés pour que tu puisses vraiment les terminer : étapes courtes, consignes claires, exemples rassurants.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 text-[0.85rem] text-ivory/90 ">
                        {highlights.map(({ label, text, icon: Icon }) => (
                            <div key={label} className="flex items-start gap-2.5 rounded-2xl border border-ivory/18 bg-white/5 px-3 py-2.5">
                                <Icon className="mt-0.5 h-4 w-4 text-ivory/85" />
                                <div>
                                    <p className="text-[0.8rem] uppercase tracking-[0.14em] text-ivory/70">{label}</p>
                                    <p className="text-sm text-ivory/92">{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </header>
    );
}
