import type { CourseSetupData } from '@/types/courseSetup';
import type { CourseContentData, CourseModuleData } from '@/types/courseContent';

export type ContentCheckStatus = 'ok' | 'warning' | 'error';

export type ContentCheckItem = {
    key: string;
    label: string;
    description: string;
    status: ContentCheckStatus;
    href?: string;
};

export type ContentCheckSummary = {
    items: ContentCheckItem[];
    blockingErrors: number;
    canPublish: boolean;
};

function normalizeItems(items?: string[]) {
    return (items ?? []).map((item) => item.trim()).filter(Boolean);
}

function getModuleReadiness(module?: CourseModuleData | null) {
    const titleOk = Boolean(module?.title?.trim());
    const hasExercise = normalizeItems(module?.exercise?.steps).length > 0;
    const hasVideo = Boolean(module?.video?.title?.trim() || module?.video?.youtubeId?.trim());

    return {
        titleOk,
        hasExercise,
        hasVideo,
        isReady: titleOk && (hasExercise || hasVideo),
    };
}

export function buildEditorChecklist(courseId: string, setup: CourseSetupData, content: CourseContentData | null): ContentCheckSummary {
    const items: ContentCheckItem[] = [];

    const introTitleOk = Boolean(content?.intro?.title?.trim());
    const introExperienceCount = normalizeItems(content?.intro?.whatYouWillExperience?.items).length;

    items.push({
        key: 'intro-title',
        label: 'Introduction · Titre principal',
        description: introTitleOk ? 'Le titre principal est défini.' : 'Ajoute un titre clair pour l’introduction.',
        status: introTitleOk ? 'ok' : 'error',
        href: `/admin/cours/${courseId}/editor/intro`,
    });

    items.push({
        key: 'intro-experience',
        label: 'Introduction · Expérience à vivre',
        description: introExperienceCount > 0 ? 'Au moins une expérience est listée.' : 'Ajoute au moins une expérience à vivre.',
        status: introExperienceCount > 0 ? 'ok' : 'warning',
        href: `/admin/cours/${courseId}/editor/intro`,
    });

    const modules = setup.structure.modules ?? [];
    const moduleContent = content?.modules ?? {};

    modules.forEach((module, index) => {
        const readiness = getModuleReadiness(moduleContent[module.id]);

        items.push({
            key: `module-${module.id}`,
            label: `Module ${index + 1} · ${module.title || 'Sans titre'}`,
            description: readiness.isReady ? 'Le module a un titre et au moins un exercice ou une vidéo.' : 'Ajoute un titre + au moins une vidéo ou un exercice guidé.',
            status: readiness.isReady ? 'ok' : readiness.titleOk ? 'warning' : 'error',
            href: `/admin/cours/${courseId}/editor/modules/${module.id}`,
        });
    });

    const conclusionTitleOk = Boolean(content?.conclusion?.title?.trim());
    const continueCount = normalizeItems(content?.conclusion?.continueAfter?.items).length;

    items.push({
        key: 'conclusion-title',
        label: 'Conclusion · Titre principal',
        description: conclusionTitleOk ? 'Le titre de conclusion est défini.' : 'Ajoute un titre clair pour la conclusion.',
        status: conclusionTitleOk ? 'ok' : 'error',
        href: `/admin/cours/${courseId}/editor/conclusion`,
    });

    items.push({
        key: 'conclusion-continue',
        label: 'Conclusion · Continuer après le cours',
        description: continueCount > 0 ? 'Au moins une piste est ajoutée.' : 'Ajoute au moins une piste de continuation.',
        status: continueCount > 0 ? 'ok' : 'warning',
        href: `/admin/cours/${courseId}/editor/conclusion`,
    });

    const blockingErrors = items.filter((item) => item.status === 'error').length;

    return {
        items,
        blockingErrors,
        canPublish: blockingErrors === 0,
    };
}
