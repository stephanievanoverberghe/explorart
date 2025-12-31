import SetupPricingClient from './SetupPricingClient';
import { getCourseSetup } from '@/lib/data/courseSetup';

type PageProps = {
    params: Promise<{ courseId: string }>;
};

export default async function SetupPricingPage({ params }: PageProps) {
    const { courseId } = await params;
    const setup = await getCourseSetup(courseId);

    return <SetupPricingClient courseId={courseId} initialPricing={setup.pricing} />;
}
