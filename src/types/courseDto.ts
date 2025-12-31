import type { CourseLevel, CourseStatus } from '@/lib/models/Course';
import type { PillarSlug } from '@/components/categories/category-data';
import type { CourseCommerceData } from '@/types/courseCommerce';
import type { CourseContentData } from '@/types/courseContent';
import type { CourseSetupData } from '@/types/courseSetup';

export type CourseProgress = {
    setupComplete: boolean;
    contentComplete: boolean;
    publishReady: boolean;
};

export interface AdminCourseDTO {
    id: string;
    slug: string;
    title: string;
    status: CourseStatus;
    listed: boolean;
    coverImage: string;
    level: CourseLevel;
    pillarSlug: PillarSlug;
    pillarLabel: string;
    durationMinutes: number;
    modulesCount: number;
    updatedAt?: string;
    setup: CourseSetupData;
    content: CourseContentData | null;
    commerce: CourseCommerceData;
    progress: CourseProgress;
}

export interface PublicCourseDTO {
    id: string;
    slug: string;
    title: string;
    tagline: string;
    summary?: string;
    level: CourseLevel;
    pillarSlug: PillarSlug;
    pillarLabel: string;
    coverImage: string;
    durationMinutes: number;
    modulesCount: number;
    status: CourseStatus;
    setup: CourseSetupData;
    commerce: CourseCommerceData;
}
