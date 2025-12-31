import SetupAccessClient from './SetupAccessClient';
import { getCourseSetup } from '@/lib/data/courseSetup';

type PageProps = {
    params: Promise<{ courseId: string }>;
};

export default async function SetupAccessPage({ params }: PageProps) {
    const { courseId } = await params;

    const setup = await getCourseSetup(courseId);

    return <SetupAccessClient courseId={courseId} initialAccess={setup.access} />;
}
