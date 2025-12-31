import type { CourseCommerceData } from '@/types/courseCommerce';
import type { CourseContentData } from '@/types/courseContent';
import type { CourseSetupData } from '@/types/courseSetup';
import { hasModuleContent, normalizeModule } from '@/lib/utils/courseFactories';

export type PublishChecklistItem = {
    key: string;
    label: string;
    status: 'ok' | 'missing';
    href?: string;
};

export type PublishChecklistResult = {
    items: PublishChecklistItem[];
    canPublish: boolean;
};

export function buildPublishChecklist(courseId: string, setup: CourseSetupData, content: CourseContentData | null, commerce: CourseCommerceData) {
    const items: PublishChecklistItem[] = [];

    const titleOk = Boolean(setup.identity.title?.trim());
    items.push({
        key: 'title',
        label: 'Titre du cours renseigné',
        status: titleOk ? 'ok' : 'missing',
        href: `/admin/cours/${courseId}/setup/identity`,
    });

    const modules = setup.structure.modules ?? [];
    const modulesOk = modules.length > 0;
    items.push({
        key: 'modules',
        label: 'Au moins 1 module dans la structure',
        status: modulesOk ? 'ok' : 'missing',
        href: `/admin/cours/${courseId}/setup/structure`,
    });

    const introTitleOk = Boolean(content?.intro?.title?.trim());
    items.push({
        key: 'intro',
        label: 'Intro renseignée (titre)',
        status: introTitleOk ? 'ok' : 'missing',
        href: `/admin/cours/${courseId}/editor/intro`,
    });

    const moduleChecks = modules.map((module) => {
        const moduleContent = content?.modules?.[module.id] ?? null;
        const normalized = normalizeModule(moduleContent, module.title);
        const titleOk = Boolean(normalized.title?.trim());
        const contentOk = hasModuleContent(normalized);
        return {
            id: module.id,
            titleOk,
            contentOk,
        };
    });

    const modulesTitlesOk = moduleChecks.every((module) => module.titleOk);
    items.push({
        key: 'module-titles',
        label: 'Chaque module a un titre',
        status: modulesTitlesOk ? 'ok' : 'missing',
        href: `/admin/cours/${courseId}/editor/modules`,
    });

    const modulesContentOk = moduleChecks.every((module) => module.contentOk);
    items.push({
        key: 'module-content',
        label: 'Chaque module contient au moins une section (vidéo, exercice ou intention)',
        status: modulesContentOk ? 'ok' : 'missing',
        href: `/admin/cours/${courseId}/editor/modules`,
    });

    const conclusionOk = Boolean(content?.conclusion?.title?.trim());
    items.push({
        key: 'conclusion',
        label: 'Conclusion renseignée (titre)',
        status: conclusionOk ? 'ok' : 'missing',
        href: `/admin/cours/${courseId}/editor/conclusion`,
    });

    const pricingOk = commerce.pricing.isFree || commerce.pricing.basePrice >= 1;
    items.push({
        key: 'pricing',
        label: 'Prix valide (>= 1€ si payant)',
        status: pricingOk ? 'ok' : 'missing',
        href: `/admin/cours/${courseId}/setup/pricing`,
    });

    return {
        items,
        canPublish: items.every((item) => item.status === 'ok'),
    } satisfies PublishChecklistResult;
}
