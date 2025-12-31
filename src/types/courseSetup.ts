export type CoursePillar =
    | 'dessin-peinture'
    | 'comprendre-une-oeuvre'
    | 'histoire-de-l-art'
    | 'histoires-d-artistes'
    | 'couleurs-harmonie'
    | 'inspirations'
    | 'psychologie-de-l-art';

export type CourseLevel = 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Tous niveaux';

export type CourseAccess = 'free' | 'premium';

export type TeachingStyle = 'guided' | 'practice' | 'analysis';

export type Tone = 'soft' | 'direct' | 'playful';

export type PricingModel = 'one_off' | 'included' | 'bundle';

export type PublishStatus = 'draft' | 'published';

export interface CourseIdentityData {
    title: string;
    slug: string;
    coverImage: string;
    pillar: CoursePillar;
    level: CourseLevel;
    access: CourseAccess;
    pinned: boolean;
}

export interface CourseIntentData {
    promise: string;
    outcomes: string[];
    audience: string;
    notFor: string;
    prerequisites: string;
    teachingStyle: TeachingStyle;
    tone: Tone;
}

export interface CourseModuleData {
    id: string;
    title: string;
    goal: string;
    minutes: number;
}

export interface CourseStructureData {
    introMinutes: number;
    conclusionMinutes: number;
    modules: CourseModuleData[];
}

export interface CourseAccessData {
    access: CourseAccess;
    hasFreePreview: boolean;
    requiresAccount: boolean;
}

export interface CoursePricingData {
    pricingModel: PricingModel;
    price: number;
    promoPrice: string;
    taxIncluded: boolean;
}

export interface CourseResourceData {
    id: string;
    title: string;
    format: string;
}

export interface CourseResourcesData {
    videoIntro: boolean;
    videoModules: boolean;
    videoConclusion: boolean;
    resources: CourseResourceData[];
}

export interface CoursePublishData {
    status: PublishStatus;
    listed: boolean;
}

export interface CourseSetupData {
    courseId: string;
    identity: CourseIdentityData;
    intent: CourseIntentData;
    structure: CourseStructureData;
    access: CourseAccessData;
    pricing: CoursePricingData;
    resources: CourseResourcesData;
    publish: CoursePublishData;
}
