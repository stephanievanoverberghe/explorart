'use server';

import { connectToDatabase } from '@/lib/db/connect';
import { Course, type CourseContent, type CourseContentConclusion, type CourseContentIntro, type CourseContentModule } from '@/lib/models/Course';

export async function getCourseContent(courseId: string): Promise<CourseContent | null> {
    if (!courseId) return null;
    await connectToDatabase();
    const course = await Course.findById(courseId).select({ content: 1 }).lean();
    if (!course) return null;
    return (course.content ?? {}) as CourseContent;
}

export async function saveIntro(courseId: string, intro: CourseContentIntro): Promise<void> {
    if (!courseId) return;
    await connectToDatabase();
    await Course.findByIdAndUpdate(courseId, { $set: { 'content.intro': { text: intro.text } } });
}

export async function saveModules(courseId: string, modules: CourseContentModule[]): Promise<void> {
    if (!courseId) return;
    await connectToDatabase();
    await Course.findByIdAndUpdate(courseId, { $set: { 'content.modules': modules } });
}

export async function saveConclusion(courseId: string, conclusion: CourseContentConclusion): Promise<void> {
    if (!courseId) return;
    await connectToDatabase();
    await Course.findByIdAndUpdate(courseId, { $set: { 'content.conclusion': { text: conclusion.text } } });
}
