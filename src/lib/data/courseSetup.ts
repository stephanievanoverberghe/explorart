import { connectToDatabase } from '@/lib/db/connect';
import { CourseSetup } from '@/lib/models/CourseSetup';
import type {
    CourseAccessData,
    CourseIdentityData,
    CourseIntentData,
    CoursePricingData,
    CoursePublishData,
    CourseResourcesData,
    CourseStructureData,
    CourseSetupData,
} from '@/types/courseSetup';

const defaultIdentity: CourseIdentityData = {
    title: '',
    slug: '',
    coverImage: '',
    pillar: 'dessin-peinture',
    level: 'Débutant',
    access: 'free',
    pinned: false,
};

const defaultIntent: CourseIntentData = {
    promise: '',
    outcomes: ['', '', ''],
    audience: '',
    notFor: '',
    prerequisites: '',
    teachingStyle: 'guided',
    tone: 'soft',
};

const defaultStructure: CourseStructureData = {
    introMinutes: 5,
    conclusionMinutes: 5,
    modules: [
        { id: crypto.randomUUID(), title: 'Module 1 — Bases', goal: 'Poser les repères essentiels.', minutes: 12 },
        { id: crypto.randomUUID(), title: 'Module 2 — Application', goal: 'Mettre en pratique sur un exercice guidé.', minutes: 15 },
        { id: crypto.randomUUID(), title: 'Module 3 — Mini défi', goal: 'Consolider avec un défi court.', minutes: 10 },
    ],
};

const defaultAccess: CourseAccessData = {
    access: 'free',
    hasFreePreview: true,
    requiresAccount: false,
};

const defaultPricing: CoursePricingData = {
    pricingModel: 'one_off',
    price: 29,
    promoPrice: '',
    taxIncluded: true,
};

const defaultResources: CourseResourcesData = {
    videoIntro: true,
    videoModules: true,
    videoConclusion: true,
    resources: [
        { id: crypto.randomUUID(), title: 'Fiche mémo harmonies', format: 'PDF' },
        { id: crypto.randomUUID(), title: 'Palette d’exercices', format: 'ASE/PNG' },
    ],
};

const defaultPublish: CoursePublishData = {
    status: 'draft',
    listed: true,
};

export async function getCourseSetup(courseId: string): Promise<CourseSetupData> {
    await connectToDatabase();
    const setup = await CourseSetup.findOne({ courseId }).lean();

    return {
        courseId,
        identity: setup?.identity ? { ...defaultIdentity, ...setup.identity } : defaultIdentity,
        intent: setup?.intent
            ? {
                  ...defaultIntent,
                  ...setup.intent,
                  outcomes: setup.intent.outcomes?.length ? setup.intent.outcomes : defaultIntent.outcomes,
              }
            : defaultIntent,
        structure: setup?.structure
            ? {
                  ...defaultStructure,
                  ...setup.structure,
                  modules: setup.structure.modules?.length ? setup.structure.modules : defaultStructure.modules,
              }
            : defaultStructure,
        access: setup?.access ? { ...defaultAccess, ...setup.access } : defaultAccess,
        pricing: setup?.pricing ? { ...defaultPricing, ...setup.pricing } : defaultPricing,
        resources: setup?.resources
            ? {
                  ...defaultResources,
                  ...setup.resources,
                  resources: setup.resources.resources?.length ? setup.resources.resources : defaultResources.resources,
              }
            : defaultResources,
        publish: setup?.publish ? { ...defaultPublish, ...setup.publish } : defaultPublish,
    };
}
