import type { CourseStatus } from '@/lib/models/Course';
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
    level: string;
    pillarSlug: string;
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
    level: string;
    pillarSlug: string;
    pillarLabel: string;
    coverImage: string;
    durationMinutes: number;
    modulesCount: number;
    status: CourseStatus;
    setup: CourseSetupData;
    commerce: CourseCommerceData;
}
