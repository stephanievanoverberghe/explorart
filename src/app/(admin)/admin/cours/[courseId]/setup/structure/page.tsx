import SetupStructureClient from './SetupStructureClient';
import { getCourseSetup } from '@/lib/data/courseSetup';

type PageProps = {
    params: Promise<{ courseId: string }>;
};

export default async function SetupStructurePage({ params }: PageProps) {
    const { courseId } = await params;

    const setup = await getCourseSetup(courseId);

    return <SetupStructureClient courseId={courseId} initialStructure={setup.structure} />;
}
