'use server';

import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '@/lib/db/connect';
import { CourseContent } from '@/lib/models/CourseContent';
import type { CourseConclusionData, CourseContentData, CourseIntroData, CourseModuleData, CourseContentStatus } from '@/types/courseContent';

export async function getIntro(courseId: string): Promise<CourseIntroData | null> {
    await connectToDatabase();
    const doc = await CourseContent.findOne({ courseId }).lean();
    return (doc?.intro as CourseIntroData | undefined) ?? null;
}

export async function saveIntro(courseId: string, payload: CourseIntroData): Promise<void> {
    await connectToDatabase();
    await CourseContent.findOneAndUpdate({ courseId }, { $set: { intro: payload } }, { upsert: true, new: true });
    revalidatePath(`/admin/cours/${courseId}/editor/intro`);
}

export async function getModule(courseId: string, moduleId: string): Promise<CourseModuleData | null> {
    await connectToDatabase();
    const doc = await CourseContent.findOne({ courseId }).lean();
    const modules = (doc?.modules as Record<string, CourseModuleData> | undefined) ?? {};
    return modules[moduleId] ?? null;
}

export async function saveModule(courseId: string, moduleId: string, payload: CourseModuleData): Promise<void> {
    await connectToDatabase();
    await CourseContent.findOneAndUpdate({ courseId }, { $set: { [`modules.${moduleId}`]: payload } }, { upsert: true, new: true });
    revalidatePath(`/admin/cours/${courseId}/editor/modules/${moduleId}`);
}

export async function getConclusion(courseId: string): Promise<CourseConclusionData | null> {
    await connectToDatabase();
    const doc = await CourseContent.findOne({ courseId }).lean();
    return (doc?.conclusion as CourseConclusionData | undefined) ?? null;
}

export async function saveConclusion(courseId: string, payload: CourseConclusionData): Promise<void> {
    await connectToDatabase();
    await CourseContent.findOneAndUpdate({ courseId }, { $set: { conclusion: payload } }, { upsert: true, new: true });
    revalidatePath(`/admin/cours/${courseId}/editor/conclusion`);
}

export async function getCourseContent(courseId: string): Promise<CourseContentData | null> {
    await connectToDatabase();
    const doc = await CourseContent.findOne({ courseId }).lean();

    if (!doc) {
        return null;
    }

    return {
        intro: doc.intro as CourseIntroData | undefined,
        modules: (doc.modules as Record<string, CourseModuleData> | undefined) ?? {},
        conclusion: doc.conclusion as CourseConclusionData | undefined,
        contentStatus: doc.contentStatus as CourseContentStatus | undefined,
        contentPublishedAt: doc.contentPublishedAt ? doc.contentPublishedAt.toISOString() : undefined,
    };
}

export async function publishCourseContent(courseId: string): Promise<void> {
    await connectToDatabase();
    await CourseContent.findOneAndUpdate({ courseId }, { $set: { contentStatus: 'published', contentPublishedAt: new Date() } }, { upsert: true, new: true });
    revalidatePath(`/admin/cours/${courseId}/editor/publish`);
}
