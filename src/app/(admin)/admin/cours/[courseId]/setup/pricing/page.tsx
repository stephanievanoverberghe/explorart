import SetupPricingClient from './SetupPricingClient';
import { getCourseSetup } from '@/lib/data/courseSetup';

export default async function SetupPricingPage({ params }: { params: { courseId: string } }) {
    const setup = await getCourseSetup(params.courseId);

    return <SetupPricingClient courseId={params.courseId} initialPricing={setup.pricing} />;
}
