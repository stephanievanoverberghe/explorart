import SetupIntentClient from './SetupIntentClient';
import { getCourseSetup } from '@/lib/data/courseSetup';

export default async function SetupIntentPage({ params }: { params: { courseId: string } }) {
    const setup = await getCourseSetup(params.courseId);
    return <SetupIntentClient courseId={params.courseId} initialIntent={setup.intent} />;
}
