// src/components/home/HomePillars.tsx

import Link from 'next/link';
import Image from 'next/image';
import { pillarConfig, type PillarSlug } from '@/components/categories/category-data';

// Ordre officiel d’affichage (même que page /categories)
const PILLAR_ORDER: PillarSlug[] = [
    'dessin-peinture',
    'comprendre-une-oeuvre',
    'histoires-d-artistes',
    'histoire-de-l-art',
    'couleurs-harmonie',
    'inspirations',
    'psychologie-de-l-art',
];

export default function HomePillars() {
    const pillars = PILLAR_ORDER.map((slug) => {
        const p = pillarConfig[slug];

        return {
            slug,
            label: p.title,
            description: p.tagline,
            image: p.heroImage,
            color: p.color,
            dotClass: p.dotClass,
        };
    });

    return (
        <section className="bg-background py-16 md:py-20">
            <div className="container-page space-y-12">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 animate-fade-up">
                    <div>
                        <p className="section-label section-label-ocre mb-3">Explorer</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Explorer par thèmes</h2>
                        <p className="text-main/75 mt-3 max-w-2xl">
                            Tes 7 piliers officiels : techniques, analyses, histoires, couleurs, psychologie de l’art, inspirations… Entre par la porte qui te parle le plus.
                        </p>
                    </div>
                </div>

                {/* GRID */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                    {pillars.map((pillar, index) => (
                        <Link
                            key={pillar.slug}
                            href={`/categories/${pillar.slug}`}
                            className="
                                relative group rounded-3xl overflow-hidden shadow-sm border border-perl/50
                                hover:shadow-xl hover:-translate-y-1 transition-all duration-500 animate-fade-up
                            "
                            style={{ animationDelay: `${0.05 + index * 0.05}s` }}
                        >
                            {/* Bandeau vertical coloré */}
                            <div className="absolute left-0 top-0 h-full w-1.5 sm:w-2 z-20" style={{ backgroundColor: pillar.color }} />

                            {/* IMAGE */}
                            <div className="relative w-full aspect-4/3 overflow-hidden">
                                <Image src={pillar.image} alt={pillar.label} fill className="object-cover transition-transform duration-900 group-hover:scale-[1.07]" />

                                {/* Halo dynamique */}
                                <div
                                    className={`
                                        pointer-events-none absolute inset-0 ${pillar.dotClass}/20 opacity-0 blur-[60px]
                                        group-hover:opacity-100 transition-opacity duration-700
                                    `}
                                />

                                {/* Gradient sombre */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />

                                {/* BADGE */}
                                <span
                                    className="
                                        absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full
                                        bg-black/45 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.18em] 
                                        text-ivory backdrop-blur-sm z-30
                                    "
                                >
                                    <span className={`h-1.5 w-1.5 rounded-full ${pillar.dotClass}`} />
                                    Pilier
                                </span>

                                {/* OVERLAY TEXTE */}
                                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 z-20">
                                    <h3
                                        className="
                                            font-serif-title text-lg sm:text-xl text-ivory
                                            transition-all duration-500 transform
                                            group-hover:translate-y-0 group-hover:opacity-100
                                        "
                                    >
                                        {pillar.label}
                                    </h3>

                                    <p
                                        className="
                                            text-[0.8rem] text-ivory/90 mt-1 max-w-xs
                                            opacity-0 translate-y-2 transition-all duration-500
                                            group-hover:opacity-100 group-hover:translate-y-0
                                        "
                                    >
                                        {pillar.description}
                                    </p>

                                    <span
                                        className="
                                            mt-2 inline-flex items-center gap-1 text-[0.7rem] uppercase tracking-[0.18em]
                                            text-ivory/85 opacity-0 translate-y-2 transition-all duration-500
                                            group-hover:opacity-100 group-hover:translate-y-0
                                        "
                                    >
                                        Découvrir
                                        <span>↗</span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
