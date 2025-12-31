import SetupIdentityClient from './SetupIdentityClient';
import { getCourseSetup } from '@/lib/data/courseSetup';

type PageProps = {
    params: Promise<{ courseId: string }>;
};

export default async function SetupIdentityPage({ params }: PageProps) {
    const { courseId } = await params;

    const setup = await getCourseSetup(courseId);

    return <SetupIdentityClient courseId={courseId} initialIdentity={setup.identity} />;
}
