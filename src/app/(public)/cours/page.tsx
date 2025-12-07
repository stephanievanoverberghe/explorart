// src/app/(public)/cours/page.tsx
'use client';

import { useMemo, useState } from 'react';

import { COURSES } from '@/lib/content/courses';
import type { PillarSlug } from '@/components/categories/category-data';

import { CoursesHero } from '@/components/courses/CoursesHero';
import { CoursesFilterBar } from '@/components/courses/CoursesFilterBar';
import { CoursesListSection } from '@/components/courses/CoursesListSection';
import { CoursesValueProps } from '@/components/courses/CoursesValueProps';

export default function CoursesPage() {
    const [level, setLevel] = useState<'all' | 'beginner' | 'intermediate'>('all');
    const [pillar, setPillar] = useState<'all' | PillarSlug>('all');

    const filtered = useMemo(
        () =>
            COURSES.filter((c) => {
                if (level !== 'all' && c.level !== level) return false;
                if (pillar !== 'all' && c.pillarSlug !== pillar) return false;
                return true;
            }),
        [level, pillar]
    );

    return (
        <section className="relative overflow-hidden bg-ivory">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(123,164,143,0.12),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(59,91,141,0.09),transparent_38%)]" />

            <div className="container-page relative space-y-12 pb-24 pt-6 md:pb-28 md:pt-24 animate-fade-up">
                {/* Hero de la page Cours */}
                <CoursesHero />

                {/* Blocs "pourquoi acheter un cours" */}
                <CoursesValueProps />

                {/* Barre de recherche + filtres (niveau / univers) */}
                <CoursesFilterBar level={level} setLevel={setLevel} pillar={pillar} setPillar={setPillar} />

                {/* Liste des cours filtrés */}
                <CoursesListSection courses={filtered} />
            </div>
        </section>
    );
}
