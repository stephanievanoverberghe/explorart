// src/components/courses/CoursesListSection.tsx

import { COURSES, type Course } from '@/lib/content/courses';
import { CourseCard } from './CourseCard';

type CoursesListSectionProps = {
    courses?: Course[];
};

export function CoursesListSection({ courses = COURSES }: CoursesListSectionProps) {
    const visibleCourses = courses;

    return (
        <section id="liste-cours" className="space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="space-y-1">
                    <p className="text-[0.72rem] uppercase tracking-[0.18em] text-main/70">Catalogue</p>
                    <h2 className="font-serif-title text-2xl">Cours disponibles</h2>
                    <p className="text-[0.9rem] text-main/65">Chaque carte suit la même structure : intro, 3 modules, conclusion. Tu sais exactement ce que tu achètes.</p>
                </div>
                <div className="rounded-full border border-perl/70 bg-white px-3 py-1.5 text-[0.82rem] text-main/70">
                    {visibleCourses.length} cours affiché{visibleCourses.length > 1 ? 's' : ''}
                </div>
            </div>

            {visibleCourses.length === 0 ? (
                <div className="flex flex-col gap-2 rounded-2xl border border-dashed border-perl/70 bg-white/80 px-4 py-6 text-sm text-main/75">
                    <p className="font-medium">Aucun cours ne correspond à ces filtres.</p>
                    <p>Essaie un autre univers ou réinitialise pour retrouver tous les parcours.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {visibleCourses.map((course) => (
                        <CourseCard key={course.slug} course={course} />
                    ))}
                </div>
            )}
        </section>
    );
}
