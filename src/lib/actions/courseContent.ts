'use server';

import { isValidObjectId } from 'mongoose';
import { connectToDatabase } from '@/lib/db/connect';
import { Course, type CourseDocument } from '@/lib/models/Course';
import { CourseSetup } from '@/lib/models/CourseSetup';
import type { CourseReviewContent } from '@/lib/models/Course';

function buildCourseQuery(courseId: string) {
    if (isValidObjectId(courseId)) {
        return { $or: [{ _id: courseId }, { slug: courseId }] };
    }
    return { slug: courseId };
}

export async function getCourseContent(courseId: string): Promise<CourseReviewContent | null> {
    await connectToDatabase();

    const [course, setup] = await Promise.all([Course.findOne(buildCourseQuery(courseId)).select('slug').lean<CourseDocument>(), CourseSetup.findOne({ courseId }).lean()]);

    if (!course && !setup) {
        return null;
    }

    const modules =
        setup?.structure?.modules?.map((module, index) => ({
            order: index + 1,
            title: module.title,
            content: module.goal,
        })) ?? [];

    const introText = setup?.intent?.promise ?? '';
    const conclusionText = setup?.intent?.outcomes?.filter(Boolean).join('\n') ?? '';

    return {
        slug: course?.slug ?? courseId,
        intro: { text: introText },
        modules,
        conclusion: { text: conclusionText },
    };
}
