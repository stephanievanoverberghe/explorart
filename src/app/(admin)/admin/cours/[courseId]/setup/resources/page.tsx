import SetupResourcesClient from './SetupResourcesClient';
import { getCourseSetup } from '@/lib/data/courseSetup';

export default async function SetupResourcesPage({ params }: { params: { courseId: string } }) {
    const setup = await getCourseSetup(params.courseId);

    return <SetupResourcesClient courseId={params.courseId} initialResources={setup.resources} />;
}
