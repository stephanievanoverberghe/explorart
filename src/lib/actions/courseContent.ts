'use server';

import { isValidObjectId } from 'mongoose';
import { connectToDatabase } from '@/lib/db/connect';
import { Course, type CourseDocument } from '@/lib/models/Course';
import { CourseSetup } from '@/lib/models/CourseSetup';
import type { CourseReviewContent, CourseReviewModule } from '@/lib/models/Course';

function buildCourseQuery(courseId: string) {
    if (isValidObjectId(courseId)) {
        return { $or: [{ _id: courseId }, { slug: courseId }] };
    }
    return { slug: courseId };
}

export async function getCourseContent(courseId: string): Promise<CourseReviewContent | null> {
    await connectToDatabase();

    const [course, setup] = await Promise.all([Course.findOne(buildCourseQuery(courseId)).select('slug content').lean<CourseDocument>(), CourseSetup.findOne({ courseId }).lean()]);

    if (!course && !setup) {
        return null;
    }

    const fallbackModules =
        setup?.structure?.modules?.map((module, index) => ({
            order: index + 1,
            title: module.title,
            content: module.goal,
        })) ?? [];
    const fallbackIntro = setup?.intent?.promise ?? '';
    const fallbackConclusion = setup?.intent?.outcomes?.filter(Boolean).join('\n') ?? '';
    const content = course?.content ?? null;

    return {
        slug: course?.slug ?? courseId,
        intro: { text: content?.intro?.text ?? fallbackIntro },
        modules: content?.modules?.length ? content.modules : fallbackModules,
        conclusion: { text: content?.conclusion?.text ?? fallbackConclusion },
    };
}

export async function saveIntro(courseId: string, payload: { text: string }) {
    await connectToDatabase();

    await Course.findOneAndUpdate(buildCourseQuery(courseId), { $set: { 'content.intro.text': payload.text } }, { new: true, upsert: false });
}

export async function saveModules(courseId: string, modules: CourseReviewModule[]) {
    await connectToDatabase();

    await Course.findOneAndUpdate(buildCourseQuery(courseId), { $set: { 'content.modules': modules } }, { new: true, upsert: false });
}

export async function saveConclusion(courseId: string, payload: { text: string }) {
    await connectToDatabase();

    await Course.findOneAndUpdate(buildCourseQuery(courseId), { $set: { 'content.conclusion.text': payload.text } }, { new: true, upsert: false });
}
