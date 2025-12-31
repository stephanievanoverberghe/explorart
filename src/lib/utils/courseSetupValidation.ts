import type { CourseCommerceData } from '@/types/courseCommerce';
import type { CourseSetupData } from '@/types/courseSetup';

export type SetupChecklistItem = {
    key: string;
    label: string;
    status: 'ok' | 'missing';
    href?: string;
};

export type SetupChecklistResult = {
    items: SetupChecklistItem[];
    canEnterEditor: boolean;
};

function isValidSlug(value: string) {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function hasOutcomes(outcomes?: string[]) {
    return (outcomes ?? []).map((item) => item.trim()).filter(Boolean).length > 0;
}

export function buildSetupChecklist(courseId: string, setup: CourseSetupData, commerce?: CourseCommerceData | null): SetupChecklistResult {
    const items: SetupChecklistItem[] = [];

    const titleOk = Boolean(setup.identity.title?.trim());
    items.push({
        key: 'title',
        label: 'Titre du cours',
        status: titleOk ? 'ok' : 'missing',
        href: `/admin/cours/${courseId}/setup/identity`,
    });

    const slug = setup.identity.slug?.trim();
    const slugOk = Boolean(slug && isValidSlug(slug));
    items.push({
        key: 'slug',
        label: 'Slug valide',
        status: slugOk ? 'ok' : 'missing',
        href: `/admin/cours/${courseId}/setup/identity`,
    });

    const promiseOk = Boolean(setup.intent.promise?.trim());
    items.push({
        key: 'promise',
        label: 'Promesse pédagogique',
        status: promiseOk ? 'ok' : 'missing',
        href: `/admin/cours/${courseId}/setup/intent`,
    });

    const outcomesOk = hasOutcomes(setup.intent.outcomes);
    items.push({
        key: 'outcomes',
        label: 'Résultats attendus',
        status: outcomesOk ? 'ok' : 'missing',
        href: `/admin/cours/${courseId}/setup/intent`,
    });

    const modulesCount = setup.structure.modules?.length ?? 0;
    items.push({
        key: 'modules',
        label: 'Structure avec modules',
        status: modulesCount > 0 ? 'ok' : 'missing',
        href: `/admin/cours/${courseId}/setup/structure`,
    });

    const accessOk = setup.access.access === 'free' || setup.access.access === 'premium';
    items.push({
        key: 'access',
        label: 'Accès défini',
        status: accessOk ? 'ok' : 'missing',
        href: `/admin/cours/${courseId}/setup/access`,
    });

    const commerceIsFree = commerce?.pricing?.isFree;
    const isFree = commerceIsFree ?? (setup.access.access === 'free' || setup.pricing.price <= 0);
    const pricingOk = isFree || setup.pricing.price >= 1;
    items.push({
        key: 'pricing',
        label: 'Prix cohérent',
        status: pricingOk ? 'ok' : 'missing',
        href: `/admin/cours/${courseId}/setup/pricing`,
    });

    const resourcesCount = setup.resources.resources?.length ?? 0;
    items.push({
        key: 'resources',
        label: 'Ressources configurées',
        status: resourcesCount > 0 ? 'ok' : 'missing',
        href: `/admin/cours/${courseId}/setup/resources`,
    });

    return {
        items,
        canEnterEditor: items.every((item) => item.status === 'ok'),
    };
}
