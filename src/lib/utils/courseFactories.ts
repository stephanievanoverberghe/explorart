import type {
    CourseConclusionData,
    CourseIntroData,
    CourseIntroDownload,
    CourseIntroSectionList,
    CourseIntroVideo,
    CourseModuleData,
    CourseModuleListSection,
    CourseModuleVideo,
} from '@/types/courseContent';

function normalizeString(value: string | undefined | null) {
    return String(value ?? '').trim();
}

function normalizeStringArray(items: Array<string | undefined | null> | undefined) {
    return (items ?? []).map((item) => normalizeString(item)).filter(Boolean);
}

export function makeVideo(partial?: Partial<CourseIntroVideo>): CourseIntroVideo {
    return {
        title: normalizeString(partial?.title),
        description: normalizeString(partial?.description),
        note: normalizeString(partial?.note),
        youtubeId: normalizeString(partial?.youtubeId),
        cover: normalizeString(partial?.cover),
    };
}

export function makeModuleVideo(partial?: Partial<CourseModuleVideo>): CourseModuleVideo {
    return {
        title: normalizeString(partial?.title),
        youtubeId: normalizeString(partial?.youtubeId),
        description: normalizeString(partial?.description),
        note: normalizeString(partial?.note),
        cover: normalizeString(partial?.cover),
    };
}

export function makeSectionList(fallbackTitle: string, partial?: Partial<CourseIntroSectionList>): CourseIntroSectionList {
    return {
        title: normalizeString(partial?.title) || fallbackTitle,
        items: normalizeStringArray(partial?.items),
    };
}

export function makeModuleListSection(fallbackTitle: string, partial?: Partial<CourseModuleListSection>): CourseModuleListSection {
    return {
        title: normalizeString(partial?.title) || fallbackTitle,
        items: normalizeStringArray(partial?.items),
    };
}

export function normalizeDownloads(downloads?: CourseIntroDownload[]) {
    return (downloads ?? [])
        .map((download) => ({
            label: normalizeString(download.label),
            description: normalizeString(download.description),
            href: normalizeString(download.href),
        }))
        .filter((download) => download.label || download.href || download.description);
}

export function normalizeIntro(input?: CourseIntroData | null): CourseIntroData {
    return {
        badgeLabel: normalizeString(input?.badgeLabel),
        title: normalizeString(input?.title),
        description: normalizeString(input?.description),
        video: makeVideo(input?.video),
        whatYouWillExperience: makeSectionList('Ce que tu vas vivre', input?.whatYouWillExperience),
        whoItsFor: makeSectionList('Ce cours est pour toi si…', input?.whoItsFor),
        downloads: normalizeDownloads(input?.downloads),
        howToFollow: makeSectionList('Comment suivre ce cours', input?.howToFollow),
        material: {
            title: normalizeString(input?.material?.title) || 'Matériel recommandé',
            items: normalizeStringArray(input?.material?.items),
            note: normalizeString(input?.material?.note),
            highlighted: input?.material?.highlighted ?? true,
        },
        notes: normalizeString(input?.notes),
    };
}

export function normalizeModule(input?: CourseModuleData | null, fallbackTitle?: string): CourseModuleData {
    return {
        badgeLabel: normalizeString(input?.badgeLabel),
        title: normalizeString(input?.title) || normalizeString(fallbackTitle),
        description: normalizeString(input?.description),
        video: makeModuleVideo(input?.video),
        material: {
            title: normalizeString(input?.material?.title) || 'Matériel',
            items: normalizeStringArray(input?.material?.items),
            note: normalizeString(input?.material?.note),
            highlighted: input?.material?.highlighted ?? true,
        },
        intention: makeModuleListSection('Intention', input?.intention),
        exercise: {
            title: normalizeString(input?.exercise?.title) || 'Exercice guidé',
            description: normalizeString(input?.exercise?.description),
            steps: normalizeStringArray(input?.exercise?.steps),
        },
        extraSections:
            input?.extraSections
                ?.map((section) => ({
                    title: normalizeString(section.title),
                    description: normalizeString(section.description),
                    items: normalizeStringArray(section.items),
                }))
                .filter((section) => section.title || section.description || section.items.length > 0) ?? [],
    };
}

export function normalizeConclusion(input?: CourseConclusionData | null): CourseConclusionData {
    return {
        badgeLabel: normalizeString(input?.badgeLabel),
        title: normalizeString(input?.title),
        description: normalizeString(input?.description),
        video: makeModuleVideo(input?.video),
        quickReview: makeModuleListSection('À retenir', input?.quickReview),
        personalPrompt: {
            title: normalizeString(input?.personalPrompt?.title),
            description: normalizeString(input?.personalPrompt?.description),
        },
        softReminder: {
            title: normalizeString(input?.softReminder?.title),
            description: normalizeString(input?.softReminder?.description),
        },
        continueAfter: makeModuleListSection('Pour continuer', input?.continueAfter),
        links:
            input?.links
                ?.map((link) => ({
                    label: normalizeString(link.label),
                    description: normalizeString(link.description),
                    href: normalizeString(link.href),
                }))
                .filter((link) => link.label || link.href || link.description) ?? [],
    };
}

export function hasModuleContent(module: CourseModuleData) {
    const videoOk = Boolean(module.video?.youtubeId);
    const exerciseOk = (module.exercise?.steps?.length ?? 0) > 0;
    const intentionOk = (module.intention?.items?.length ?? 0) > 0;
    return videoOk || exerciseOk || intentionOk;
}
