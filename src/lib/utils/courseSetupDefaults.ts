import type { CourseAccessData, CourseIdentityData, CourseIntentData, CoursePricingData, CourseResourcesData, CourseSetupData, CourseStructureData } from '@/types/courseSetup';

function makeId() {
    return crypto.randomUUID();
}

export const defaultIdentity: CourseIdentityData = {
    title: '',
    slug: '',
    coverImage: '',
    pillar: 'dessin-peinture',
    level: 'Débutant',
    access: 'free',
    pinned: false,
};

export const defaultIntent: CourseIntentData = {
    promise: '',
    outcomes: ['', '', ''],
    audience: '',
    notFor: '',
    prerequisites: '',
    teachingStyle: 'guided',
    tone: 'soft',
};

export function buildDefaultStructure(): CourseStructureData {
    return {
        introMinutes: 5,
        conclusionMinutes: 5,
        modules: [
            { id: makeId(), title: 'Module 1 — Bases', goal: 'Poser les repères essentiels.', minutes: 12 },
            { id: makeId(), title: 'Module 2 — Application', goal: 'Mettre en pratique sur un exercice guidé.', minutes: 15 },
            { id: makeId(), title: 'Module 3 — Mini défi', goal: 'Consolider avec un défi court.', minutes: 10 },
        ],
    };
}

export const defaultAccess: CourseAccessData = {
    access: 'free',
    hasFreePreview: true,
    requiresAccount: false,
};

export const defaultPricing: CoursePricingData = {
    pricingModel: 'one_off',
    price: 29,
    promoPrice: '',
    taxIncluded: true,
};

export function buildDefaultResources(): CourseResourcesData {
    return {
        videoIntro: true,
        videoModules: true,
        videoConclusion: true,
        resources: [
            { id: makeId(), title: 'Fiche mémo harmonies', format: 'PDF' },
            { id: makeId(), title: 'Palette d’exercices', format: 'ASE/PNG' },
        ],
    };
}

export function buildDefaultCourseSetup(courseId: string): CourseSetupData {
    return {
        courseId,
        identity: { ...defaultIdentity },
        intent: { ...defaultIntent },
        structure: buildDefaultStructure(),
        access: { ...defaultAccess },
        pricing: { ...defaultPricing },
        resources: buildDefaultResources(),
    };
}
