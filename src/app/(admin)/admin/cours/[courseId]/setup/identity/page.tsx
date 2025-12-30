import SetupIdentityClient from './SetupIdentityClient';
import { getCourseSetup } from '@/lib/data/courseSetup';

export default async function SetupIdentityPage({ params }: { params: { courseId: string } }) {
    const setup = await getCourseSetup(params.courseId);

    return <SetupIdentityClient courseId={params.courseId} initialIdentity={setup.identity} />;
}
