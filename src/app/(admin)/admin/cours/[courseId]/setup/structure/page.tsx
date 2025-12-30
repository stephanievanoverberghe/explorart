import SetupStructureClient from './SetupStructureClient';
import { getCourseSetup } from '@/lib/data/courseSetup';

export default async function SetupStructurePage({ params }: { params: { courseId: string } }) {
    const setup = await getCourseSetup(params.courseId);

    return <SetupStructureClient courseId={params.courseId} initialStructure={setup.structure} />;
}
