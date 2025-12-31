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
