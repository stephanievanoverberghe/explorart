'use server';

import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '@/lib/db/connect';
import { CourseContent } from '@/lib/models/CourseContent';
import { CourseSetup } from '@/lib/models/CourseSetup';
import type { CourseConclusionData, CourseContentData, CourseIntroData, CourseModuleData, CourseContentStatus } from '@/types/courseContent';
import { normalizeConclusion, normalizeIntro, normalizeModule } from '@/lib/utils/courseFactories';
import { updateCourseContentSlice } from '@/lib/actions/courseAdmin';

export async function getIntro(courseId: string): Promise<CourseIntroData | null> {
    await connectToDatabase();
    const doc = await CourseContent.findOne({ courseId }).lean();
    return (doc?.intro as CourseIntroData | undefined) ?? null;
}

export async function saveIntro(courseId: string, payload: CourseIntroData): Promise<void> {
    const result = await updateCourseContentSlice(courseId, 'intro', { intro: payload });
    if (!result.ok) {
        throw new Error(result.error);
    }
}

export async function getModule(courseId: string, moduleId: string): Promise<CourseModuleData | null> {
    await connectToDatabase();
    const doc = await CourseContent.findOne({ courseId }).lean();
    const modules = (doc?.modules as Record<string, CourseModuleData> | undefined) ?? {};
    return modules[moduleId] ?? null;
}

export async function saveModule(courseId: string, moduleId: string, payload: CourseModuleData): Promise<void> {
    const result = await updateCourseContentSlice(courseId, 'module', { moduleId, module: payload });
    if (!result.ok) {
        throw new Error(result.error);
    }
}

export async function getConclusion(courseId: string): Promise<CourseConclusionData | null> {
    await connectToDatabase();
    const doc = await CourseContent.findOne({ courseId }).lean();
    return (doc?.conclusion as CourseConclusionData | undefined) ?? null;
}

export async function saveConclusion(courseId: string, payload: CourseConclusionData): Promise<void> {
    const result = await updateCourseContentSlice(courseId, 'conclusion', { conclusion: payload });
    if (!result.ok) {
        throw new Error(result.error);
    }
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

export async function saveCourseIntro(courseId: string, payload: CourseIntroData): Promise<void> {
    await connectToDatabase();
    const normalized = normalizeIntro(payload);
    await CourseContent.findOneAndUpdate({ courseId }, { $set: { intro: normalized } }, { upsert: true, new: true });
}

export async function saveCourseModule(courseId: string, moduleId: string, payload: CourseModuleData): Promise<{ ok: boolean; reason?: 'missing-module' }> {
    await connectToDatabase();
    const setup = await CourseSetup.findOne({ courseId }).lean();
    const modules = (setup?.structure?.modules as Array<{ id: string; title?: string }> | undefined) ?? [];
    const exists = modules.some((module) => module.id === moduleId);

    if (!exists) {
        return { ok: false, reason: 'missing-module' };
    }

    const fallbackTitle = modules.find((module) => module.id === moduleId)?.title ?? '';
    const normalized = normalizeModule(payload, fallbackTitle);
    await CourseContent.findOneAndUpdate({ courseId }, { $set: { [`modules.${moduleId}`]: normalized } }, { upsert: true, new: true });
    return { ok: true };
}

export async function saveCourseConclusion(courseId: string, payload: CourseConclusionData): Promise<void> {
    await connectToDatabase();
    const normalized = normalizeConclusion(payload);
    await CourseContent.findOneAndUpdate({ courseId }, { $set: { conclusion: normalized } }, { upsert: true, new: true });
}
