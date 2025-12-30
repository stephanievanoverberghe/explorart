import SetupAccessClient from './SetupAccessClient';
import { getCourseSetup } from '@/lib/data/courseSetup';

export default async function SetupAccessPage({ params }: { params: { courseId: string } }) {
    const setup = await getCourseSetup(params.courseId);

    return <SetupAccessClient courseId={params.courseId} initialAccess={setup.access} />;
}
