// src/components/formations/FormationsCatalogue.tsx
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import type { PillarSlug } from '@/components/categories/category-data';
import { pillarConfig } from '@/components/categories/category-data';
import { FORMATIONS, type Formation } from '@/lib/content/formations';

type LevelFilter = 'all' | 'beginner' | 'intermediate';

export function FormationsCatalogue() {
    const [level, setLevel] = useState<LevelFilter>('all');
    const [pillar, setPillar] = useState<'all' | PillarSlug>('all');

    const filtered = useMemo(
        () =>
            FORMATIONS.filter((f) => {
                if (level !== 'all' && f.level !== level) return false;
                if (pillar !== 'all' && f.pillarSlug !== pillar) return false;
                return true;
            }),
        [level, pillar]
    );

    return (
        <section className="relative overflow-hidden bg-ivory">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(90,60,116,0.13),transparent_50%),radial-gradient(circle_at_92%_82%,rgba(60,110,90,0.14),transparent_45%)]" />

            <div className="container-page relative space-y-10 pb-24 pt-8 md:space-y-12 md:pb-32 md:pt-24 animate-fade-up">
                <FormationsHero />

                <FormationsFilterBar level={level} setLevel={setLevel} pillar={pillar} setPillar={setPillar} />

                <FormationsList formations={filtered} />
            </div>
        </section>
    );
}

/* ---------- HERO ---------- */

function FormationsHero() {
    return (
        <header className="relative overflow-hidden rounded-4xl border border-perl/70 bg-linear-to-r from-[color-mix(in_oklab,var(--color-prune)_78%,#0d0714_22%)] via-[color-mix(in_oklab,var(--color-vert)_72%,#06150f_28%)] to-[color-mix(in_oklab,var(--color-bleu)_78%,#050914_22%)] px-6 py-8 text-ivory shadow-lg shadow-main/10 md:px-10 md:py-12">
            <div className="pointer-events-none absolute inset-0 opacity-55 mix-blend-soft-light bg-[radial-gradient(circle_at_14%_18%,rgba(255,255,255,0.26),transparent_55%),radial-gradient(circle_at_86%_80%,rgba(30,61,114,0.35),transparent_52%)]" />
            <div className="pointer-events-none absolute inset-3 rounded-[2.3rem] border border-ivory/18" />

            <div className="relative grid items-start gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
                <div className="space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-ivory/15 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-ivory/90">
                        <span className="h-1.5 w-1.5 rounded-full bg-ivory" />
                        <span>Formations Explor&apos;Art</span>
                    </div>

                    <div className="space-y-3">
                        <h1 className="font-serif-title text-3xl leading-tight sm:text-4xl md:text-5xl">
                            Les grandes formations qui changent
                            <br />
                            <span className="text-ivory/85">ta manière de voir, de sentir et de créer.</span>
                        </h1>
                        <p className="max-w-2xl text-sm text-ivory/90 sm:text-base">
                            Ici, on est au-dessus d’un simple cours. Chaque formation est un voyage complet avec 6 à 10 modules, des sous-modules, une introduction et une
                            conclusion qui t’accompagnent en profondeur, à ton rythme.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[0.82rem] text-ivory/90">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">Corps, regard, lumière & émotion réunis</span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">Format premium · accès long terme</span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">Pédagogie douce, sensible, structurée</span>
                    </div>
                </div>

                <aside className="relative grid gap-3 rounded-3xl border border-ivory/25 bg-black/18 p-5 text-[0.85rem] text-ivory/92 shadow-inner shadow-black/20 backdrop-blur-sm md:p-6">
                    <p className="text-[0.78rem] uppercase tracking-[0.16em] text-ivory/70">Comment lire cette page</p>
                    <p>
                        Les formations sont pensées comme des <strong>grands parcours</strong> : plusieurs modules, des sous-parties, des bonus et une vraie promesse de
                        transformation.
                    </p>
                    <p>
                        Commence par explorer les <strong>titres</strong> et la <strong>promesse</strong>, puis plonge dans le programme détaillé pour sentir si c’est le bon moment
                        pour toi.
                    </p>
                    <p className="text-ivory/80">
                        Si tu débutes complètement, la formation “Apprendre à dessiner – Méthode Somato-Graphique” sera souvent ton meilleur point d’entrée.
                    </p>
                </aside>
            </div>
        </header>
    );
}

/* ---------- FILTRES ---------- */

interface FilterBarProps {
    level: LevelFilter;
    setLevel: (v: LevelFilter) => void;
    pillar: 'all' | PillarSlug;
    setPillar: (v: 'all' | PillarSlug) => void;
}

function FormationsFilterBar({ level, setLevel, pillar, setPillar }: FilterBarProps) {
    return (
        <section className="rounded-3xl border border-perl/70 bg-ivory/96 px-4 py-4 shadow-sm shadow-main/5 md:px-6 md:py-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/70">Filtrer les formations</p>
                    <p className="text-[0.82rem] text-main/65">Choisis ton niveau actuel et l’univers qui t’appelle le plus. Tu peux ajuster plus tard.</p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setLevel('all');
                        setPillar('all');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-perl/70 bg-white px-3 py-1.5 text-[0.78rem] font-medium text-main/70 transition-colors hover:bg-background"
                >
                    Réinitialiser
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <p className="text-[0.7rem] uppercase tracking-[0.16em] text-main/60">Niveau</p>
                    <div className="flex flex-wrap gap-1.5">
                        {[
                            { value: 'all', label: 'Tous les niveaux' },
                            { value: 'beginner', label: 'Débutant' },
                            { value: 'intermediate', label: 'Intermédiaire' },
                        ].map((opt) => {
                            const active = level === opt.value;
                            return (
                                <button
                                    key={opt.value}
                                    onClick={() => setLevel(opt.value as LevelFilter)}
                                    className={[
                                        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.8rem] transition-all',
                                        active ? 'border-sage bg-sage text-ivory shadow-sm shadow-sage/25' : 'border-perl/70 bg-white text-main/75 hover:bg-background',
                                    ].join(' ')}
                                >
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-[0.7rem] uppercase tracking-[0.16em] text-main/60">Univers principal</p>
                    <div className="flex flex-wrap gap-1.5">
                        <button
                            onClick={() => setPillar('all')}
                            className={[
                                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.8rem] transition-all',
                                pillar === 'all' ? 'border-main bg-main text-ivory shadow-sm shadow-main/20' : 'border-perl/70 bg-white text-main/75 hover:bg-background',
                            ].join(' ')}
                        >
                            Tous les univers
                        </button>

                        {(Object.keys(pillarConfig) as PillarSlug[]).map((slug) => {
                            const cfg = pillarConfig[slug];
                            const active = pillar === slug;
                            return (
                                <button
                                    key={slug}
                                    onClick={() => setPillar(slug)}
                                    className={[
                                        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.8rem] transition-all whitespace-nowrap',
                                        active ? 'border-main bg-main text-ivory shadow-sm shadow-main/20' : 'border-perl/70 bg-white text-main/75 hover:bg-background',
                                    ].join(' ')}
                                >
                                    <span className={`h-2 w-2 rounded-full ${cfg.dotClass}`} />
                                    {cfg.title}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ---------- LISTE & CARDS ---------- */

interface ListProps {
    formations: Formation[];
}

function FormationsList({ formations }: ListProps) {
    return (
        <section className="space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="space-y-1">
                    <p className="text-[0.72rem] uppercase tracking-[0.18em] text-main/70">Catalogue</p>
                    <h2 className="font-serif-title text-2xl">Formations premium</h2>
                    <p className="text-[0.9rem] text-main/65">De grands parcours structurés en modules et sous-modules, pensés pour une vraie transformation créative.</p>
                </div>
                <div className="rounded-full border border-perl/70 bg-white px-3 py-1.5 text-[0.82rem] text-main/70">
                    {formations.length} formation{formations.length > 1 ? 's' : ''} affichée
                    {formations.length > 1 ? 's' : ''}
                </div>
            </div>

            {formations.length === 0 ? (
                <div className="flex flex-col gap-2 rounded-2xl border border-dashed border-perl/70 bg-white/80 px-4 py-6 text-sm text-main/75">
                    <p className="font-medium">Aucune formation ne correspond à ces filtres.</p>
                    <p>Essaye un autre univers ou réinitialise pour retrouver toutes les formations.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {formations.map((formation) => (
                        <FormationCard key={formation.slug} formation={formation} />
                    ))}
                </div>
            )}
        </section>
    );
}

function FormationCard({ formation }: { formation: Formation }) {
    const theme = pillarConfig[formation.pillarSlug];
    const isComingSoon = formation.status === 'coming-soon';

    const priceLabel = `${formation.priceEUR.toString().replace('.', ',')} €`;

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-perl/70 bg-white/85 shadow-sm shadow-main/5 transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-video w-full overflow-hidden">
                <Image
                    src={formation.coverImage}
                    alt={formation.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/15 to-transparent" />

                <div className="absolute left-3 right-3 top-3 flex items-center justify-between gap-2 text-[0.78rem] text-ivory">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 backdrop-blur">
                        <span className="h-2 w-2 rounded-full bg-ivory" />
                        {formation.highlightLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 backdrop-blur">
                        {formation.modulesCount} modules · ≈ {formation.approximateHours} h
                    </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-[0.8rem] text-ivory">
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 backdrop-blur">
                        <span className={`h-2 w-2 rounded-full ${theme.dotClass}`} />
                        {formation.pillarLabel}
                    </span>
                    <span className="rounded-full border border-white/30 bg-black/25 px-3 py-1 backdrop-blur">{formation.level === 'beginner' ? 'Débutant' : 'Intermédiaire'}</span>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 px-4 py-4">
                <div className="space-y-1">
                    <h3 className="font-serif-title text-base leading-snug text-main md:text-lg">{formation.title}</h3>
                    <p className="line-clamp-2 text-[0.9rem] text-main/75">{formation.tagline}</p>
                </div>

                <div className="space-y-0.5 text-[0.82rem] text-main/65">
                    <p>Intro · {formation.modulesCount} modules (avec sous-modules) · conclusion · bonus premium</p>
                    <p>≈ {formation.approximateHours} h de contenu guidé · accès long terme</p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                    <div className="space-y-0.5">
                        <p className="text-[0.78rem] text-main/55">{isComingSoon ? 'Ouverture prochaine' : 'Accès complet à la formation'}</p>
                        <p className="text-[1rem] font-semibold text-main">{priceLabel}</p>
                    </div>

                    <Link
                        href={`/formations/${formation.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-main px-3.5 py-1.75 text-[0.85rem] font-medium text-ivory shadow-main/25 transition-all hover:bg-main/90"
                    >
                        Voir la formation
                        <span>↗</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
