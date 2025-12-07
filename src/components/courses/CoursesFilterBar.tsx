// src/components/courses/CoursesFilterBar.tsx
'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

import { levelOptions, pillarFilters } from './course-filters-data';
import type { PillarSlug } from '@/components/categories/category-data';

interface Props {
    level: 'all' | 'beginner' | 'intermediate';
    setLevel: (v: 'all' | 'beginner' | 'intermediate') => void;

    pillar: 'all' | PillarSlug;
    setPillar: (v: 'all' | PillarSlug) => void;
}

export function CoursesFilterBar({ level, setLevel, pillar, setPillar }: Props) {
    const [query, setQuery] = useState('');

    const handleReset = () => {
        setLevel('all');
        setPillar('all');
        setQuery('');
    };

    const filtersAreDefault = level === 'all' && pillar === 'all' && query.trim() === '';
    const activeCount = (query.trim() ? 1 : 0) + (level !== 'all' ? 1 : 0) + (pillar !== 'all' ? 1 : 0);

    return (
        <section className="rounded-3xl border border-perl/70 bg-ivory/96 px-4 py-4 shadow-sm shadow-main/5 md:px-6 md:py-5 space-y-4">
            {/* HEADER + RESET */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/70 flex items-center gap-1.5">
                        <SlidersHorizontal className="h-3.5 w-3.5 text-main/70" />
                        <span>Trouver le cours qui te correspond</span>
                    </p>
                    <p className="text-[0.82rem] text-main/65">Recherche une envie, un blocage ou un univers. On t’affiche ce qui résonne avec toi.</p>
                </div>

                <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 rounded-full border border-perl/70 bg-white px-3 py-1.5 text-[0.78rem] font-medium text-main/70 transition-colors hover:bg-background"
                >
                    Réinitialiser
                    {!filtersAreDefault && (
                        <span className="text-xs text-sage">
                            · {activeCount} actif{activeCount > 1 ? 's' : ''}
                        </span>
                    )}
                </button>
            </div>

            {/* BARRE DE RECHERCHE */}
            <div className="rounded-2xl border border-perl/60 bg-white/85 px-3.5 py-3.5 space-y-2.5">
                <label className="text-[0.72rem] uppercase tracking-[0.16em] text-main/60">Rechercher un cours</label>

                <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-main/45" />

                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ex : « feuille blanche », « couleurs », « lire une image »…"
                        className="w-full rounded-xl border border-perl/70 bg-white pl-9 pr-3 py-2.5 text-[0.9rem] text-main/85 shadow-xs placeholder:text-main/35 
                        focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage/70"
                    />
                </div>

                <p className="text-[0.75rem] text-main/55">Tu peux entrer une idée, une émotion, une difficulté… même floue.</p>
            </div>

            {/* FILTRES */}
            <div className="rounded-2xl border border-perl/60 bg-white/80 px-3.5 py-3.5 space-y-5">
                {/* NIVEAU */}
                <div className="space-y-2">
                    <p className="text-[0.7rem] uppercase tracking-[0.16em] text-main/60">Niveau</p>

                    <div className="flex flex-wrap gap-1.5">
                        {levelOptions.map((opt) => {
                            const active = opt.value === level;
                            return (
                                <button
                                    key={opt.value}
                                    onClick={() => setLevel(opt.value)}
                                    className={[
                                        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.8rem] transition-all',
                                        active ? 'border-sage bg-sage text-ivory shadow-sm shadow-sage/25' : 'border-perl/70 bg-white text-main/75 hover:bg-background',
                                    ].join(' ')}
                                >
                                    {opt.value === 'beginner' && <span className="text-xs">●</span>}
                                    {opt.value === 'intermediate' && <span className="text-xs">◆</span>}
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* UNIVERS */}
                <div className="space-y-2">
                    <p className="text-[0.7rem] uppercase tracking-[0.16em] text-main/60">Univers</p>

                    <div className="flex flex-wrap gap-1.5">
                        {pillarFilters.map((opt) => {
                            const active = opt.value === pillar;
                            return (
                                <button
                                    key={opt.value}
                                    onClick={() => setPillar(opt.value as PillarSlug | 'all')}
                                    className={[
                                        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.8rem] transition-all whitespace-nowrap',
                                        active ? 'border-main bg-main text-ivory shadow-sm shadow-main/20' : 'border-perl/70 bg-white text-main/75 hover:bg-background',
                                    ].join(' ')}
                                >
                                    {opt.dotClass && <span className={`h-2 w-2 rounded-full ${opt.dotClass}`} />}
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
