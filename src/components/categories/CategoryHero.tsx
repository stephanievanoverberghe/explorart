// src/components/categories/CategoryHero.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { PillarConfig, PillarSlug } from './category-data';
import { pillarHeroThemes } from './category-data';

interface CategoryHeroProps {
    pillar: PillarConfig;
    pillarSlug: PillarSlug;
}

export function CategoryHero({ pillar, pillarSlug }: CategoryHeroProps) {
    const heroTheme = pillarHeroThemes[pillarSlug];

    return (
        <header className="relative overflow-hidden rounded-3xl px-5 py-7 md:px-8 md:py-8 shadow-lg text-ivory">
            {/* Fond dégradé couleur pilier */}
            <div className={`absolute inset-0 ${heroTheme.bgClass}`} />

            {/* Overlay sombre léger pour le contraste global */}
            <div className="absolute inset-0 bg-black/25 mix-blend-multiply" aria-hidden="true" />

            {/* Halos façon AtelierShell */}
            <div
                className={`
                    pointer-events-none absolute inset-0 opacity-35 mix-blend-soft-light
                    ${heroTheme.haloClass}
                `}
                aria-hidden="true"
            />

            {/* Bande très légère en diagonale pour le mouvement */}
            <div className="pointer-events-none absolute -left-40 top-0 h-[180%] w-80 rotate-[-18deg] bg-white/10" aria-hidden="true" />

            {/* Petit halo rond en bas à gauche */}
            <div className="pointer-events-none absolute -bottom-10 -left-6 h-40 w-40 rounded-full bg-ivory/15 blur-3xl" aria-hidden="true" />

            {/* inner border */}
            <div className="pointer-events-none absolute inset-5 rounded-[1.75rem] border border-ivory/20" aria-hidden="true" />

            <div className="relative max-w-6xl mx-auto space-y-6">
                {/* Ligne top : fil d’Ariane + chip pilier */}
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    {/* 🔹 Fil d’Ariane (navigation principale = on garde les liens) */}
                    <nav className="text-[0.8rem] md:text-[0.85rem] text-ivory/90" aria-label="Fil d’Ariane">
                        <ol className="flex flex-wrap items-center gap-1.5">
                            <li>
                                <Link
                                    href="/"
                                    className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory/80 rounded-sm"
                                >
                                    Accueil
                                </Link>
                            </li>
                            <li aria-hidden="true">·</li>
                            <li>
                                <Link
                                    href="/categories"
                                    className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory/80 rounded-sm"
                                >
                                    Catégories
                                </Link>
                            </li>
                            <li aria-hidden="true">·</li>
                            <li className="inline-flex items-center gap-1 text-ivory font-medium">
                                <span className={`h-1.5 w-1.5 rounded-full ${pillar.dotClass}`} aria-hidden="true" />
                                <span aria-current="page">{pillar.title}</span>
                            </li>
                        </ol>
                    </nav>

                    {/* Chip type “Tableau de bord” mais version pilier */}
                    <div className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-ivory/95 backdrop-blur-sm">
                        <span className={`h-1.5 w-1.5 rounded-full ${pillar.dotClass}`} aria-hidden="true" />
                        <span>{heroTheme.chipLabel}</span>
                    </div>
                </div>

                {/* Grid principale : texte + bloc visuel */}
                <div className="grid gap-7 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.5fr)] items-stretch">
                    {/* Colonne gauche : éditorial */}
                    <div className="space-y-5 max-w-xl">
                        {/* Panneau légèrement plus sombre pour le contraste + lisibilité */}
                        <div className="rounded-3xl bg-black/30 border border-white/15 px-4 py-4 sm:px-5 sm:py-5 backdrop-blur-sm space-y-4">
                            {/* Kicker + meta row */}
                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-ivory/90">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/35 px-3 py-1">
                                        <span className={`h-1.5 w-1.5 rounded-full ${pillar.dotClass}`} aria-hidden="true" />
                                        {pillar.kicker}
                                    </span>
                                    <span className="mx-1 h-px w-6 bg-ivory/70" aria-hidden="true" />
                                    <span className="text-ivory/85">Univers Explor’Art</span>
                                </div>

                                {/* Titre + tagline */}
                                <div className="space-y-2.5">
                                    <h1 className="font-serif-title text-3xl md:text-4xl leading-tight text-ivory">{pillar.title}</h1>
                                    <p className="text-sm md:text-base text-ivory/92">{pillar.tagline}</p>
                                </div>
                            </div>

                            {/* Intro */}
                            <p className="text-sm md:text-[0.98rem] leading-relaxed text-ivory/92">{pillar.intro}</p>

                            {/* Meta chips (niveau + formats) */}
                            <div className="flex flex-wrap gap-2 pt-1">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/12 px-3 py-1 text-[0.78rem] text-ivory">
                                    <span className="h-1.5 w-1.5 rounded-full bg-ivory/90" aria-hidden="true" />
                                    Articles débutant & intermédiaire
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/12 px-3 py-1 text-[0.78rem] text-ivory">Sous-univers dédiés</span>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/12 px-3 py-1 text-[0.78rem] text-ivory">Explorations guidées</span>
                            </div>
                        </div>

                        {/* Bloc “Ce pilier est fait pour toi si…” */}
                        <section
                            className="mt-1 rounded-2xl border border-ivory/35 bg-black/40 px-4 py-3 space-y-2 backdrop-blur-sm shadow-xxs"
                            aria-label={`Ce pilier est fait pour toi si tu explores ${pillar.title}`}
                        >
                            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-ivory/90">Ce pilier est fait pour toi si…</p>
                            <ul className="text-sm text-ivory/92 space-y-1.5">
                                {pillar.helperBullets.map((item) => (
                                    <li key={item}>• {item}</li>
                                ))}
                            </ul>
                            <p className="text-[0.72rem] text-ivory/88 pt-1">
                                Articles disponibles en <strong>Débutant</strong> et <strong>Intermédiaire</strong>.
                            </p>
                        </section>
                    </div>

                    {/* Colonne droite : univers visuel premium */}
                    <aside className="relative" aria-label={`Univers visuel de ${pillar.title}`}>
                        {/* Halo rond derrière la carte visuelle */}
                        <div className="pointer-events-none absolute -top-10 -right-6 h-40 w-40 rounded-full bg-ivory/18 blur-3xl" aria-hidden="true" />

                        <div className="relative h-full rounded-3xl border border-ivory/25 bg-black/35 shadow-md backdrop-blur-sm overflow-hidden">
                            <div className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] p-4 sm:p-5 gap-3">
                                {/* Badge Univers visuel */}
                                <div className="flex items-center justify-between gap-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-ivory">
                                        <span className={`h-1.5 w-1.5 rounded-full ${pillar.dotClass}`} aria-hidden="true" />
                                        Univers visuel
                                    </span>
                                </div>

                                {/* Image + overlay */}
                                <div className="relative rounded-2xl border border-ivory/25 overflow-hidden bg-black/40">
                                    <div className="relative aspect-4/3">
                                        <Image src={pillar.heroImage} alt={pillar.title} fill className="object-cover scale-[1.03] transition-transform duration-700" />
                                        <div className="pointer-events-none absolute inset-0 bg-black/35 mix-blend-multiply" aria-hidden="true" />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/35 to-transparent" aria-hidden="true" />
                                    </div>
                                </div>

                                {/* Quote + tags */}
                                <div className="space-y-2">
                                    <p className="text-sm text-ivory/92 max-w-xs italic">{pillar.quote}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {pillar.moodKeywords.map((word) => (
                                            <span
                                                key={word}
                                                className="rounded-full border border-white/35 bg-black/35 px-2 py-0.5 text-[0.7rem] uppercase tracking-[0.18em] text-ivory/92"
                                            >
                                                {word}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </header>
    );
}
