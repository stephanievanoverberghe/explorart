import SetupPublishClient from './SetupPublishClient';
import { getCourseSetup } from '@/lib/data/courseSetup';

export default async function SetupPublishPage({ params }: { params: { courseId: string } }) {
    const setup = await getCourseSetup(params.courseId);

    return <SetupPublishClient courseId={params.courseId} initialPublish={setup.publish} />;
}
