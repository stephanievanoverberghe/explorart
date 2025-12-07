// src/components/courses/CoursesFilterBar.tsx
'use client';

import { levelOptions, durationOptions, pillarFilters } from './course-filters-data';
import type { PillarSlug } from '@/components/categories/category-data';
import type { DurationLabel } from '@/lib/content/courses';

interface Props {
    level: 'all' | 'beginner' | 'intermediate';
    setLevel: (v: 'all' | 'beginner' | 'intermediate') => void;
    duration: 'all' | DurationLabel;
    setDuration: (v: 'all' | DurationLabel) => void;
    pillar: 'all' | PillarSlug;
    setPillar: (v: 'all' | PillarSlug) => void;
}

export function CoursesFilterBar({ level, setLevel, duration, setDuration, pillar, setPillar }: Props) {
    const handleReset = () => {
        setLevel('all');
        setDuration('all');
        setPillar('all');
    };

    const filtersAreDefault = level === 'all' && duration === 'all' && pillar === 'all';

    return (
        <section className="rounded-3xl border border-perl/70 bg-ivory/96 px-4 py-4 shadow-sm shadow-main/5 md:px-6 md:py-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-0.5">
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/70">Filtrer sans se perdre</p>
                    <p className="text-[0.82rem] text-main/65">Choisis un niveau, un format de durée et un univers. On garde seulement ce qui te correspond.</p>
                </div>

                <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 rounded-full border border-perl/70 bg-white px-3 py-1.5 text-[0.78rem] font-medium text-main/70 transition-colors hover:bg-background"
                >
                    Réinitialiser
                    {!filtersAreDefault && <span className="text-xs text-sage">· filtres actifs</span>}
                </button>
            </div>

            <div className="mt-3 flex flex-col gap-3 md:mt-4">
                <div className="rounded-2xl border border-perl/60 bg-white/60 p-3">
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-[0.75rem] uppercase tracking-[0.16em] text-main/65">Niveau & durée</p>
                        <span className="text-[0.75rem] text-main/55">Choisis une seule option de chaque bloc</span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                        {levelOptions.map((opt) => {
                            const active = opt.value === level;
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setLevel(opt.value)}
                                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.8rem] transition-all ${
                                        active ? 'border-sage bg-sage text-ivory shadow-sm shadow-sage/25' : 'border-perl/70 bg-white text-main/75 hover:bg-background'
                                    }`}
                                >
                                    {opt.value === 'beginner' && <span className="text-xs">●</span>}
                                    {opt.value === 'intermediate' && <span className="text-xs">◆</span>}
                                    <span>{opt.label}</span>
                                </button>
                            );
                        })}

                        {durationOptions.map((opt) => {
                            const active = opt.value === duration;
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setDuration(opt.value)}
                                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.8rem] transition-all ${
                                        active ? 'border-main bg-main text-ivory shadow-sm shadow-main/20' : 'border-perl/70 bg-white text-main/75 hover:bg-background'
                                    }`}
                                >
                                    <span>{opt.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="rounded-2xl border border-perl/60 bg-white/60 p-3">
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-[0.75rem] uppercase tracking-[0.16em] text-main/65">Univers</p>
                        <span className="text-[0.75rem] text-main/55">Affiche un seul pilier à la fois</span>
                    </div>
                    <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none [-webkit-overflow-scrolling:touch]">
                        {pillarFilters.map((opt) => {
                            const active = opt.value === pillar;
                            return (
                                <button
                                    key={opt.label}
                                    type="button"
                                    onClick={() => setPillar(opt.value as 'all' | PillarSlug)}
                                    className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.8rem] transition-all ${
                                        active ? 'border-main bg-main text-ivory shadow-sm shadow-main/20' : 'border-perl/70 bg-white text-main/75 hover:bg-background'
                                    }`}
                                >
                                    {opt.dotClass && <span className={`h-2 w-2 rounded-full ${opt.dotClass}`} />}
                                    <span>{opt.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
