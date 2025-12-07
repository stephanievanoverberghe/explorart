// src/components/courses/CoursesListSection.tsx

import { COURSES, type Course } from '@/lib/content/courses';
import { CourseCard } from './CourseCard';

type CoursesListSectionProps = {
    courses?: Course[];
};

export function CoursesListSection({ courses = COURSES }: CoursesListSectionProps) {
    const visibleCourses = courses;

    return (
        <section id="liste-cours" className="space-y-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="space-y-1">
                    <p className="text-[0.72rem] uppercase tracking-[0.18em] text-main/70">Catalogue</p>
                    <h2 className="font-serif-title text-2xl">Cours disponibles</h2>
                </div>
                <p className="text-[0.8rem] text-main/65">
                    {visibleCourses.length} cours affiché{visibleCourses.length > 1 ? 's' : ''}
                </p>
            </div>

            {visibleCourses.length === 0 ? (
                <div className="card border-dashed border-perl/70 bg-ivory/80 text-sm text-main/75">
                    <p>Aucun cours ne correspond à ces filtres pour le moment. Essaie d&apos;élargir la recherche.</p>
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
