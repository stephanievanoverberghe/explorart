// src/lib/data/courses.ts
import type { QueryFilter, SortOrder } from 'mongoose';
import type { Level, PillarSlug } from '@/components/categories/category-data';
import { connectToDatabase } from '@/lib/db/connect';
import { Course, type CourseDocument, type CourseModule, type CourseResource, type CourseStatus, type CourseVideo, type DurationLabel } from '@/lib/models/Course';

export type { CourseModule, CourseResource, CourseStatus, CourseVideo, DurationLabel };

export interface CourseData {
    slug: string;
    title: string;
    tagline: string;
    level: Level;
    pillarSlug: PillarSlug;
    pillarLabel: string;
    coverImage: string;
    durationMinutes: number;
    durationLabel: DurationLabel;
    modulesCount: number;
    hasIntro: boolean;
    hasConclusion: boolean;
    priceEUR: number;
    isMini: boolean;
    status: CourseStatus;
    summary?: string;
    videos?: CourseVideo[];
    resources?: CourseResource[];
    modules?: CourseModule[];
}

export type CourseSort = 'title' | 'duration' | 'price' | 'createdAt';

export interface CourseFilters {
    level?: Level;
    pillarSlug?: PillarSlug;
    status?: CourseStatus;
    sort?: CourseSort;
}

const sortMap: Record<CourseSort, Record<string, SortOrder>> = {
    title: { title: 1 },
    duration: { durationMinutes: 1 },
    price: { priceEUR: 1 },
    createdAt: { createdAt: -1 },
};

function normalizeModulesCount(course: CourseDocument) {
    if (Array.isArray(course.modules) && course.modules.length > 0) {
        return course.modules.length;
    }
    return course.modulesCount ?? 0;
}

function mapCourse(course: CourseDocument): CourseData {
    return {
        slug: course.slug,
        title: course.title,
        tagline: course.tagline,
        level: course.level,
        pillarSlug: course.pillarSlug as PillarSlug,
        pillarLabel: course.pillarLabel,
        coverImage: course.coverImage,
        durationMinutes: course.durationMinutes,
        durationLabel: course.durationLabel,
        modulesCount: normalizeModulesCount(course),
        hasIntro: course.hasIntro,
        hasConclusion: course.hasConclusion,
        priceEUR: course.priceEUR,
        isMini: course.isMini,
        status: course.status,
        summary: course.summary,
        videos: course.videos ?? [],
        resources: course.resources ?? [],
        modules: course.modules ?? [],
    };
}

export function normalizeCourseSlug(raw: string | string[]) {
    const slug = Array.isArray(raw) ? raw[0] : raw;
    return decodeURIComponent(slug).trim().toLowerCase();
}

export async function getCourses(filters: CourseFilters = {}): Promise<CourseData[]> {
    const { level, pillarSlug, status = 'published', sort = 'title' } = filters;

    const query: QueryFilter<CourseDocument> = {};

    if (level) {
        query.level = level;
    }

    if (pillarSlug) {
        query.pillarSlug = pillarSlug;
    }

    if (status) {
        query.status = status;
    }

    await connectToDatabase();

    const courses = await Course.find(query).sort(sortMap[sort]);

    return courses.map((course) => mapCourse(course));
}

export async function getCourseBySlug(slug: string | string[], status: CourseStatus = 'published'): Promise<CourseData | null> {
    const normalizedSlug = normalizeCourseSlug(slug);

    await connectToDatabase();

    const course = await Course.findOne({ slug: normalizedSlug, status });

    if (!course) {
        return null;
    }

    return mapCourse(course);
}
