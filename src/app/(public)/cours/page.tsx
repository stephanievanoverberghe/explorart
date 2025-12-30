// src/app/(public)/cours/page.tsx
import { getCourses } from '@/lib/data/courses';
import { CoursesPageClient } from './CoursesPageClient';

export default async function CoursesPage() {
    const courses = await getCourses();

    return <CoursesPageClient courses={courses} />;
}
