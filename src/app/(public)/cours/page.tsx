// src/app/(public)/cours/page.tsx
'use client';

import { useMemo, useState } from 'react';

import { COURSES } from '@/lib/content/courses';
import type { DurationLabel } from '@/lib/content/courses';
import type { PillarSlug } from '@/components/categories/category-data';

import { CoursesHero } from '@/components/courses/CoursesHero';
import { CoursesFilterBar } from '@/components/courses/CoursesFilterBar';
import { CoursesListSection } from '@/components/courses/CoursesListSection';
import { CoursesIntroBanner } from '@/components/courses/CoursesIntroBanner';
import { CoursesValueProps } from '@/components/courses/CoursesValueProps';

export default function CoursesPage() {
    const [level, setLevel] = useState<'all' | 'beginner' | 'intermediate'>('all');
    const [duration, setDuration] = useState<'all' | DurationLabel>('all');
    const [pillar, setPillar] = useState<'all' | PillarSlug>('all');

    const filtered = useMemo(
        () =>
            COURSES.filter((c) => {
                if (level !== 'all' && c.level !== level) return false;
                if (duration !== 'all' && c.durationLabel !== duration) return false;
                if (pillar !== 'all' && c.pillarSlug !== pillar) return false;
                return true;
            }),
        [duration, level, pillar]
    );

    return (
        <section className="relative overflow-hidden bg-ivory pt-4 pb-24 md:pt-24 md:pb-28">
            <div className="container-page space-y-10 animate-fade-up">
                <CoursesHero />

                <CoursesIntroBanner />

                <CoursesValueProps />

                <CoursesFilterBar level={level} setLevel={setLevel} duration={duration} setDuration={setDuration} pillar={pillar} setPillar={setPillar} />
                <CoursesListSection courses={filtered} />
            </div>
        </section>
    );
}
