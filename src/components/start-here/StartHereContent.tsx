// src.components/start-here/StartHereContent.tsx
'use client';

import { SectionId } from './sections';

import IntroContent from './content/IntroContent';
import StepOneContent from './content/StepOneContent';
import StepTwoContent from './content/StepTwoContent';
import StepThreeContent from './content/StepThreeContent';
import ConclusionContent from './content/ConclusionContent';

export default function StartHereContent({ sectionId }: { sectionId: SectionId }) {
    if (sectionId === 'intro') return <IntroContent />;
    if (sectionId === 'etape-1') return <StepOneContent />;
    if (sectionId === 'etape-2') return <StepTwoContent />;
    if (sectionId === 'etape-3') return <StepThreeContent />;
    if (sectionId === 'conclusion') return <ConclusionContent />;
    return null;
}
