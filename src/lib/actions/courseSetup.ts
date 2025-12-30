'use server';

import { connectToDatabase } from '@/lib/db/connect';
import { CourseSetup } from '@/lib/models/CourseSetup';
import type { CourseAccessData, CourseIdentityData, CourseIntentData, CoursePricingData, CoursePublishData, CourseResourcesData, CourseStructureData } from '@/types/courseSetup';

async function updateCourseSetupSection<T>(courseId: string, section: string, payload: T) {
    await connectToDatabase();
    await CourseSetup.findOneAndUpdate({ courseId }, { $set: { [section]: payload } }, { upsert: true, new: true });
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

export async function savePublish(courseId: string, payload: CoursePublishData) {
    await updateCourseSetupSection(courseId, 'publish', payload);
}
