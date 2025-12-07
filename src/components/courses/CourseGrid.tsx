// src/components/courses/CourseGrid.tsx
import type { Course } from '@/lib/content/courses';
import { CourseCard } from './CourseCard';

interface CourseGridProps {
    courses: Course[];
}

export function CourseGrid({ courses }: CourseGridProps) {
    if (courses.length === 0) {
        return (
            <div className="card bg-ivory/95 border-perl/60">
                <p className="text-sm text-main/75">Les cours arrivent bientôt. Tu peux déjà commencer avec la mini-formation gratuite.</p>
            </div>
        );
    }

    return (
        <section className="space-y-3" id="cours">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-serif-title text-lg md:text-xl">Tous les cours disponibles</h2>
                <p className="text-[0.8rem] text-main/65">{courses.length} cours payants pour approfondir ta pratique.</p>
            </div>

            <div className="grid gap-5 md:gap-6 md:grid-cols-2 xl:grid-cols-3">
                {courses.map((course) => (
                    <CourseCard key={course.slug} course={course} />
                ))}
            </div>
        </section>
    );
}
