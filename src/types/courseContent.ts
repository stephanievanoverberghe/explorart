export type CourseIntroDownload = {
    label: string;
    description: string;
    href: string;
};

export type CourseIntroSectionList = {
    title: string;
    items: string[];
};

export type CourseIntroVideo = {
    title: string;
    description?: string;
    note?: string;
    youtubeId?: string;
    cover?: string;
};

export type CourseIntroData = {
    badgeLabel?: string; // ex: "Parcours débutant · Commencer ici"
    title: string; // ex: "Avant de commencer..."
    description?: string; // paragraphe
    video?: CourseIntroVideo;

    whatYouWillExperience?: CourseIntroSectionList;
    whoItsFor?: CourseIntroSectionList;

    downloads?: CourseIntroDownload[];

    howToFollow?: CourseIntroSectionList;
    material?: {
        title: string;
        items: string[];
        note?: string;
        highlighted?: boolean; // pour ton style "bg-sage/6"
    };

    notes?: string; // champ libre
};

export type CourseModuleVideo = {
    title: string;
    youtubeId?: string;
    description?: string;
    note?: string;
    cover?: string;
};

export type CourseModuleListSection = {
    title: string;
    items: string[];
};

export type CourseModuleData = {
    badgeLabel?: string;
    title: string;
    description?: string;
    video?: CourseModuleVideo;
    material?: {
        title: string;
        items: string[];
        note?: string;
        highlighted?: boolean;
    };
    intention?: CourseModuleListSection;
    exercise?: {
        title: string;
        description?: string;
        steps: string[];
    };
    extraSections?: Array<{
        title: string;
        description?: string;
        items?: string[];
    }>;
};

export type CourseConclusionData = {
    badgeLabel?: string;
    title: string;
    description?: string;
    video?: CourseModuleVideo;
    quickReview?: CourseModuleListSection;
    personalPrompt?: {
        title: string;
        description?: string;
    };
    softReminder?: {
        title: string;
        description?: string;
    };
    continueAfter?: CourseModuleListSection;
    links?: Array<{
        label: string;
        description?: string;
        href: string;
    }>;
};

export type CourseContentStatus = 'draft' | 'published';

export type CourseContentData = {
    intro?: CourseIntroData;
    modules?: Record<string, CourseModuleData>;
    conclusion?: CourseConclusionData;
    contentStatus?: CourseContentStatus;
    contentPublishedAt?: string;
};
