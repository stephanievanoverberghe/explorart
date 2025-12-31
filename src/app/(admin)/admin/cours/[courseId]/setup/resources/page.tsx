import SetupResourcesClient from './SetupResourcesClient';
import { getCourseSetup } from '@/lib/data/courseSetup';

type PageProps = {
    params: Promise<{ courseId: string }>;
};

export default async function SetupResourcesPage({ params }: PageProps) {
    const { courseId } = await params;

    const setup = await getCourseSetup(courseId);

    return <SetupResourcesClient courseId={courseId} initialResources={setup.resources} />;
}
