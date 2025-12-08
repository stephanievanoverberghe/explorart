'use client';

import { useMemo, useState } from 'react';

import type { PillarSlug } from '@/components/categories/category-data';
import { FORMATIONS } from '@/lib/content/formations';

import { FormationsHero } from './FormationsHero';
import { FormationsFilterBar } from './FormationsFilterBar';
import { FormationsListSection } from './FormationsListSection';

export type LevelFilter = 'all' | 'beginner' | 'intermediate';

export function FormationsCatalogue() {
    const [level, setLevel] = useState<LevelFilter>('all');
    const [pillar, setPillar] = useState<'all' | PillarSlug>('all');
    const [query, setQuery] = useState('');

    const filtered = useMemo(
        () =>
            FORMATIONS.filter((f) => {
                if (level !== 'all' && f.level !== level) return false;
                if (pillar !== 'all' && f.pillarSlug !== pillar) return false;

                const q = query.trim().toLowerCase();
                if (!q) return true;

                const haystack = `${f.title} ${f.tagline} ${f.pillarLabel} ${f.highlightLabel}`.toLowerCase();
                return haystack.includes(q);
            }),
        [level, pillar, query]
    );

    return (
        <section className="relative overflow-hidden bg-ivory">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(90,60,116,0.13),transparent_50%),radial-gradient(circle_at_92%_82%,rgba(60,110,90,0.14),transparent_45%)]" />

            <div className="container-page relative space-y-10 pb-24 pt-8 md:space-y-12 md:pb-32 md:pt-24 animate-fade-up">
                <FormationsHero />

                <FormationsFilterBar level={level} setLevel={setLevel} pillar={pillar} setPillar={setPillar} query={query} setQuery={setQuery} />

                <FormationsListSection formations={filtered} />
            </div>
        </section>
    );
}
