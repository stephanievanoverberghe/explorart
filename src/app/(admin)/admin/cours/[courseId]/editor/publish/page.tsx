import { notFound } from 'next/navigation';
import EditorPublishClient from './EditorPublishClient';
import { getCourseAdmin } from '@/lib/actions/courseAdmin';
import { buildPublishChecklist } from '@/lib/utils/coursePublishValidation';

interface EditorPublishPageProps {
    params: { courseId: string };
}

export default async function EditorPublishPage({ params }: EditorPublishPageProps) {
    const { courseId } = params;
    const adminCourse = await getCourseAdmin(courseId);

    if (!adminCourse) {
        notFound();
    }

    const checklist = buildPublishChecklist(courseId, adminCourse.setup, adminCourse.content, adminCourse.commerce);

    return <EditorPublishClient courseId={courseId} checklist={checklist} slug={adminCourse.slug} status={adminCourse.status} listed={adminCourse.listed} />;
}
