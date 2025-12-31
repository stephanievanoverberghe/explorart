import SetupPublishClient from './SetupPublishClient';
import { getCourseSetup } from '@/lib/data/courseSetup';

type PageProps = {
    params: Promise<{ courseId: string }>;
};

export default async function SetupPublishPage({ params }: PageProps) {
    const { courseId } = await params;
    const setup = await getCourseSetup(courseId);

    return <SetupPublishClient courseId={courseId} initialPublish={setup.publish} />;
}
