import SetupIntentClient from './SetupIntentClient';
import { getCourseSetup } from '@/lib/data/courseSetup';

type PageProps = {
    params: Promise<{ courseId: string }>;
};

export default async function SetupIntentPage({ params }: PageProps) {
    const { courseId } = await params;

    const setup = await getCourseSetup(courseId);

    return <SetupIntentClient courseId={courseId} initialIntent={setup.intent} />;
}
