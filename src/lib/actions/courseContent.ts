'use server';

import { connectToDatabase } from '@/lib/db/connect';
import { CourseContent } from '@/lib/models/CourseContent';
import type { CourseIntroData } from '@/types/courseContent';

export async function getIntro(courseId: string): Promise<CourseIntroData | null> {
    await connectToDatabase();
    const doc = await CourseContent.findOne({ courseId }).lean();
    return (doc?.intro as CourseIntroData | undefined) ?? null;
}

export async function saveIntro(courseId: string, payload: CourseIntroData): Promise<void> {
    await connectToDatabase();
    await CourseContent.findOneAndUpdate({ courseId }, { $set: { intro: payload } }, { upsert: true, new: true });
}
