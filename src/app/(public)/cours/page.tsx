// src/app/(public)/cours/page.tsx
'use client';

import { useState } from 'react';

import { COURSES } from '@/lib/content/courses';
import type { DurationLabel } from '@/lib/content/courses';
import type { PillarSlug } from '@/components/categories/category-data';

import { CoursesHero } from '@/components/courses/CoursesHero';
import { CoursesFilterBar } from '@/components/courses/CoursesFilterBar';
import { CourseCard } from '@/components/courses/CourseCard';

export default function CoursesPage() {
    const [level, setLevel] = useState<'all' | 'beginner' | 'intermediate'>('all');
    const [duration, setDuration] = useState<'all' | DurationLabel>('all');
    const [pillar, setPillar] = useState<'all' | PillarSlug>('all');

    const filtered = COURSES.filter((c) => {
        if (level !== 'all' && c.level !== level) return false;
        if (duration !== 'all' && c.durationLabel !== duration) return false;
        if (pillar !== 'all' && c.pillarSlug !== pillar) return false;
        return true;
    });

    return (
        <section className="relative overflow-hidden bg-ivory pt-4 pb-24 md:pt-24 md:pb-28">
            <div className="container-page space-y-10 animate-fade-up">
                <CoursesHero />

                {/* petit bloc pédagogique */}
                <section className="grid gap-5 md:grid-cols-3">
                    {[
                        {
                            title: 'Une marche après l’autre',
                            text: 'Chaque cours suit la même structure : introduction, 3 modules guidés, conclusion pour la suite.',
                            classes: 'border-sage/50 bg-sage/5',
                        },
                        {
                            title: 'Pensé pour les sensibles & autodidactes',
                            text: 'Tu peux suivre un cours même si tu te sens débutant.e, rouillé.e ou “pas légitime” avec l’art.',
                            classes: 'border-rose/50 bg-rose/5',
                        },
                        {
                            title: 'À ton rythme, sans date limite',
                            text: 'Tu avances quand tu peux, tu reviens sur les modules que tu aimes, et tu gardes l’accès dans le temps.',
                            classes: 'border-terre/50 bg-terre/5',
                        },
                    ].map((item) => (
                        <div key={item.title} className={`card space-y-2 border ${item.classes}`}>
                            <h2 className="font-serif-title text-lg">{item.title}</h2>
                            <p className="text-sm text-main/75">{item.text}</p>
                        </div>
                    ))}
                </section>

                <CoursesFilterBar level={level} setLevel={setLevel} duration={duration} setDuration={setDuration} pillar={pillar} setPillar={setPillar} />

                {/* Liste des cours */}
                <section id="liste-cours" className="space-y-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h2 className="font-serif-title text-2xl">Cours disponibles</h2>
                        <p className="text-[0.8rem] text-main/65">
                            {filtered.length} cours affiché{filtered.length > 1 ? 's' : ''}
                        </p>
                    </div>

                    {filtered.length === 0 ? (
                        <p className="text-sm text-main/70">Aucun cours ne correspond à ces filtres pour le moment.</p>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((course) => (
                                <CourseCard key={course.slug} course={course} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </section>
    );
}
