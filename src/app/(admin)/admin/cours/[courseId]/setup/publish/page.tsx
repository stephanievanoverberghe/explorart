import { notFound } from 'next/navigation';
import SetupPublishClient from './SetupPublishClient';
import { getCourseAdmin } from '@/lib/actions/courseAdmin';
import { buildPublishChecklist } from '@/lib/utils/coursePublishValidation';

type PageProps = {
    params: Promise<{ courseId: string }>;
};

export default async function SetupPublishPage({ params }: PageProps) {
    const { courseId } = await params;
    const adminCourse = await getCourseAdmin(courseId);

    if (!adminCourse) {
        notFound();
    }

    const checklist = buildPublishChecklist(courseId, adminCourse.setup, adminCourse.content, adminCourse.commerce);

    return (
        <SetupPublishClient
            courseId={courseId}
            initialPublish={adminCourse.setup.publish}
            checklist={checklist}
            slug={adminCourse.slug}
            isPublished={adminCourse.status === 'published'}
        />
    );
}
