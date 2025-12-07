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

    return (
        <section className="rounded-2xl border border-perl/60 bg-ivory/95 px-4 py-3 md:px-5 md:py-3.5 shadow-sm space-y-3">
            {/* Ligne titre + reset */}
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-0.5">
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/75">Filtrer les cours</p>
                    <p className="text-[0.78rem] text-main/65">Ajuste le niveau, la durée et l’univers sans te perdre dans les options.</p>
                </div>

                <button
                    type="button"
                    onClick={handleReset}
                    className="text-[0.75rem] rounded-full border border-perl/60 bg-ivory px-3 py-1 text-main/70 hover:bg-background cursor-pointer"
                >
                    Réinitialiser les filtres
                </button>
            </div>

            {/* Ligne 1 : niveau + durée (pills compacts) */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                {/* Niveau + durée regroupés */}
                <div className="flex flex-wrap gap-1.5">
                    {levelOptions.map((opt) => {
                        const active = opt.value === level;
                        return (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => setLevel(opt.value)}
                                className={[
                                    'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.75rem] transition-colors',
                                    active ? 'bg-sage text-ivory border-sage shadow-sm cursor-pointer' : 'bg-ivory text-main/75 border-perl/60 hover:bg-background cursor-pointer',
                                ].join(' ')}
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
                                className={[
                                    'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.75rem] transition-colors',
                                    active
                                        ? 'bg-terre text-ivory border-terre shadow-sm cursor-pointer'
                                        : 'bg-ivory text-main/75 border-perl/60 hover:bg-background cursor-pointer',
                                ].join(' ')}
                            >
                                <span>{opt.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Ligne 2 : univers avec scroll horizontal si besoin */}
            <div className="space-y-1">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Univers</p>
                <div className="flex gap-1.5 overflow-x-auto scrollbar-none [-webkit-overflow-scrolling:touch]">
                    {pillarFilters.map((opt) => {
                        const active = opt.value === pillar;
                        return (
                            <button
                                key={opt.label}
                                type="button"
                                onClick={() => setPillar(opt.value as 'all' | PillarSlug)}
                                className={[
                                    'shrink-0 inline-flex items-center gap-1.5 rounded-full border px-2.75 py-1.1 text-[0.75rem] transition-colors',
                                    active ? 'bg-main text-ivory border-main shadow-sm cursor-pointer' : 'bg-ivory text-main/80 border-perl/60 hover:bg-background cursor-pointer',
                                ].join(' ')}
                            >
                                {opt.dotClass && <span className={`h-2 w-2 rounded-full ${opt.dotClass}`} />}
                                <span>{opt.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
