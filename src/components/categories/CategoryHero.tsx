// src/components/categories/CategoryHero.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { PillarConfig } from './category-data';

interface CategoryHeroProps {
    pillar: PillarConfig;
}

export function CategoryHero({ pillar }: CategoryHeroProps) {
    return (
        <header
            className="
                rounded-3xl border border-perl/60 bg-background/95
                px-4 py-5 md:px-6 md:py-6
                shadow-sm relative overflow-hidden
                space-y-5
            "
        >
            <div className="relative space-y-8">
                {/* 🔹 Fil d’Ariane intégré */}
                <nav className="text-[0.75rem] md:text-sm text-main/60" aria-label="Fil d’Ariane">
                    <ol className="flex flex-wrap items-center gap-1.5">
                        <li>
                            <Link href="/" className="hover:text-main">
                                Accueil
                            </Link>
                        </li>
                        <li>·</li>
                        <li>
                            <Link href="/categories" className="hover:text-main">
                                Catégories
                            </Link>
                        </li>
                        <li>·</li>
                        <li className="inline-flex items-center gap-1 text-main">
                            <span className={`h-1.5 w-1.5 rounded-full ${pillar.dotClass}`} />
                            <span>{pillar.title}</span>
                        </li>
                    </ol>
                </nav>

                {/* Grid principale */}
                <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.6fr)] items-start">
                    {/* Texte éditorial */}
                    <div className="space-y-5">
                        {/* Kicker */}
                        <div className="flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-main/65">
                            <span className="section-label section-label-sage">Univers Explor’Art</span>
                            <span className="mx-1 h-px w-6 bg-main/40" />
                            <span className="inline-flex items-center gap-1">
                                <span className={`h-1.5 w-1.5 rounded-full ${pillar.dotClass}`} />
                                {pillar.kicker}
                            </span>
                        </div>

                        {/* Titre + tagline */}
                        <div className="space-y-3">
                            <h1 className="font-serif-title text-3xl md:text-4xl leading-tight">{pillar.title}</h1>
                            <p className="text-main/80 text-sm md:text-base max-w-xl">{pillar.tagline}</p>
                        </div>

                        {/* Intro */}
                        <p className="text-main/75 text-sm md:text-base max-w-xl">{pillar.intro}</p>

                        {/* Bloc “Ce pilier est fait pour toi si…” */}
                        <div className="rounded-2xl border border-perl/60 bg-ivory/85 px-4 py-3 space-y-2">
                            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Ce pilier est fait pour toi si…</p>
                            <ul className="text-sm text-main/80 space-y-1.5">
                                {pillar.helperBullets.map((item) => (
                                    <li key={item}>• {item}</li>
                                ))}
                            </ul>
                            <p className="text-[0.7rem] text-main/60 pt-1">
                                Articles disponibles en <strong>Débutant</strong> et <strong>Intermédiaire</strong>.
                            </p>
                        </div>
                    </div>

                    {/* Univers visuel */}
                    <aside className="relative rounded-3xl border border-perl/50 bg-black/5 overflow-hidden shadow-sm">
                        <div className="relative aspect-4/3">
                            <Image src={pillar.heroImage} alt={pillar.title} fill className="object-cover scale-[1.03] transition-transform duration-700" />
                            <div className={`pointer-events-none absolute inset-0 ${pillar.dotClass}/25 mix-blend-multiply`} />
                            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/35 to-transparent" />

                            <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-ivory backdrop-blur-sm">
                                        <span className={`h-1.5 w-1.5 rounded-full ${pillar.dotClass}`} />
                                        Univers
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-sm text-ivory/88 max-w-xs italic">{pillar.quote}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {pillar.moodKeywords.map((word) => (
                                            <span
                                                key={word}
                                                className="rounded-full border border-white/35 bg-black/35 px-2 py-0.5 text-[0.7rem] uppercase tracking-[0.18em] text-ivory/90"
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
