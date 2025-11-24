// src/components/categories/CategoryHero.tsx
import Image from 'next/image';
import type { PillarConfig } from './category-data';

interface CategoryHeroProps {
    pillar: PillarConfig;
}

export function CategoryHero({ pillar }: CategoryHeroProps) {
    return (
        <header className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.6fr)] items-start">
            {/* Texte éditorial */}
            <div className="space-y-5">
                <p className="section-label section-label-sage">{pillar.kicker}</p>

                <div className="space-y-3">
                    <h1 className="font-serif-title text-3xl md:text-4xl leading-tight">{pillar.title}</h1>
                    <p className="text-main/80 text-sm md:text-base">{pillar.tagline}</p>
                </div>

                <p className="text-main/75 text-sm md:text-base">{pillar.intro}</p>

                <div className="card bg-background/80 space-y-2">
                    <p className="text-xs uppercase tracking-[0.18em] text-main/60">Ce pilier est fait pour toi si…</p>
                    <ul className="text-sm text-main/80 space-y-1.5">
                        {pillar.helperBullets.map((item) => (
                            <li key={item}>• {item}</li>
                        ))}
                    </ul>
                    <p className="text-xs text-main/60 pt-1">
                        Les articles existent en niveaux <strong>Débutant</strong> et <strong>Intermédiaire</strong>, à ton rythme.
                    </p>
                </div>
            </div>

            {/* Carte univers visuelle */}
            <aside className="relative rounded-3xl border border-perl/50 bg-black/5 overflow-hidden shadow-sm">
                <div className="relative aspect-4/3">
                    <Image src={pillar.heroImage} alt={pillar.title} fill className="object-cover scale-[1.03] transition-transform duration-700" />
                    {/* Halo teinte pilier */}
                    <div className={`pointer-events-none absolute inset-0 ${pillar.dotClass}/25 mix-blend-multiply`} />
                    {/* Gradient sombre pour le texte */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
                        <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-ivory backdrop-blur-sm">
                                <span className={`h-1.5 w-1.5 rounded-full ${pillar.dotClass}`} />
                                Univers
                            </span>
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm text-ivory/85 max-w-xs italic">{pillar.quote}</p>
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
        </header>
    );
}
