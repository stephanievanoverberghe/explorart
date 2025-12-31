// src/lib/data/courses.ts
import type { QueryFilter, SortOrder } from 'mongoose';
import type { Level, PillarSlug } from '@/components/categories/category-data';
import { connectToDatabase } from '@/lib/db/connect';
import { Course, type CourseDocument, type CourseStatus } from '@/lib/models/Course';
import { CourseCommerce } from '@/lib/models/CourseCommerce';
import type { CourseCommerceData } from '@/types/courseCommerce';
import { computeCommerce } from '@/lib/utils/courseCommerce';

export type { CourseStatus };

export interface CourseData {
    slug: string;
    title: string;
    tagline: string;
    level: Level;
    pillarSlug: PillarSlug;
    pillarLabel: string;
    coverImage: string;
    durationMinutes: number;
    modulesCount: number;
    hasIntro: boolean;
    hasConclusion: boolean;
    pricing: CourseCommerceData['pricing'] & CourseCommerceData['computed'];
    status: CourseStatus;
    summary?: string;
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
    price: { durationMinutes: 1 },
    createdAt: { createdAt: -1 },
};

function mapCourse(course: CourseDocument, commerce: CourseCommerceData): CourseData {
    return {
        slug: course.slug,
        title: course.title,
        tagline: course.tagline,
        level: course.level,
        pillarSlug: course.pillarSlug as PillarSlug,
        pillarLabel: course.pillarLabel,
        coverImage: course.coverImage,
        durationMinutes: course.durationMinutes,
        modulesCount: course.modulesCount ?? 0,
        hasIntro: course.hasIntro,
        hasConclusion: course.hasConclusion,
        pricing: {
            currency: commerce.pricing.currency,
            basePrice: commerce.pricing.basePrice,
            isFree: commerce.pricing.isFree,
            compareAtPrice: commerce.pricing.compareAtPrice,
            effectivePrice: commerce.computed.effectivePrice,
            promoLabel: commerce.computed.promoLabel,
        },
        status: course.status,
        summary: course.summary,
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

    const shouldSortInMemory = sort === 'price';
    const courses = await Course.find({ ...query, listed: true })
        .sort(sortMap[shouldSortInMemory ? 'createdAt' : sort])
        .lean();
    const commerceDocs = await CourseCommerce.find({ courseId: { $in: courses.map((course) => String(course._id)) } }).lean();
    const commerceMap = new Map(commerceDocs.map((doc) => [doc.courseId, doc]));

    const mapped = courses.map((course) => {
        const commerceDoc = commerceMap.get(String(course._id));
        const commerce = computeCommerce({
            courseId: String(course._id),
            pricing: commerceDoc?.pricing ?? { currency: 'EUR', basePrice: 0, isFree: true },
            promotions: commerceDoc?.promotions ?? [],
            coupons: commerceDoc?.coupons ?? [],
            stock: commerceDoc?.stock ?? { isUnlimited: true },
            computed: commerceDoc?.computed ?? { effectivePrice: 0 },
        });
        return mapCourse(course, commerce);
    });

    if (shouldSortInMemory) {
        return mapped.sort((a, b) => a.pricing.effectivePrice - b.pricing.effectivePrice);
    }

    return mapped;
}

export async function getCourseBySlug(slug: string | string[], status: CourseStatus = 'published'): Promise<CourseData | null> {
    const normalizedSlug = normalizeCourseSlug(slug);

    await connectToDatabase();

    const course = await Course.findOne({ slug: normalizedSlug, status, listed: true }).lean();

    if (!course) {
        return null;
    }

    const commerceDoc = await CourseCommerce.findOne({ courseId: String(course._id) }).lean();
    const commerce = computeCommerce({
        courseId: String(course._id),
        pricing: commerceDoc?.pricing ?? { currency: 'EUR', basePrice: 0, isFree: true },
        promotions: commerceDoc?.promotions ?? [],
        coupons: commerceDoc?.coupons ?? [],
        stock: commerceDoc?.stock ?? { isUnlimited: true },
        computed: commerceDoc?.computed ?? { effectivePrice: 0 },
    });

    return mapCourse(course, commerce);
}
