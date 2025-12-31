// src/lib/actions/courseSetup.ts
'use server';

import { connectToDatabase } from '@/lib/db/connect';
import { CourseSetup } from '@/lib/models/CourseSetup';
import type { CourseAccessData, CourseIdentityData, CourseIntentData, CoursePricingData, CourseResourcesData, CourseStructureData } from '@/types/courseSetup';
import { updateCourseSetupSlice } from '@/lib/actions/courseAdmin';

/* ---------------------------------------------
   Generic update helper
---------------------------------------------- */
type CourseSetupSlice = Parameters<typeof updateCourseSetupSlice>[1];

async function updateCourseSetupSection<T>(courseId: string, section: CourseSetupSlice, payload: T) {
    const result = await updateCourseSetupSlice(courseId, section, payload as never);
    if (!result.ok) {
        throw new Error(result.error);
    }
}

export async function updateCourseIdentity(courseId: string, payload: CourseIdentityData) {
    await updateCourseSetupSection(courseId, 'identity', payload);
}

export async function updateCourseIntent(courseId: string, payload: CourseIntentData) {
    await updateCourseSetupSection(courseId, 'intent', payload);
}

export async function updateCourseStructure(courseId: string, payload: CourseStructureData) {
    await updateCourseSetupSection(courseId, 'structure', payload);
}

export async function saveAccess(courseId: string, payload: CourseAccessData) {
    await updateCourseSetupSection(courseId, 'access', payload);
}

export async function savePricing(courseId: string, payload: CoursePricingData) {
    await updateCourseSetupSection(courseId, 'pricing', payload);
}

export async function saveResources(courseId: string, payload: CourseResourcesData) {
    await updateCourseSetupSection(courseId, 'resources', payload);
}

export async function getCourseStructureModules(courseId: string): Promise<CourseStructureData['modules']> {
    await connectToDatabase();
    const setup = await CourseSetup.findOne({ courseId }).lean();
    return setup?.structure?.modules ?? [];
}
