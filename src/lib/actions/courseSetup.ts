// src/lib/actions/courseSetup.ts
'use server';

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
    PublishStatus,
} from '@/types/courseSetup';
import { saveCourseSetup } from '@/lib/actions/courseAdmin';

/* ---------------------------------------------
   Generic update helper
---------------------------------------------- */
async function updateCourseSetupSection<T>(courseId: string, section: string, payload: T) {
    await saveCourseSetup(courseId, { [section]: payload } as Record<string, T>);
}

export async function updateCourseIdentity(courseId: string, payload: CourseIdentityData) {
    await updateCourseSetupSection(courseId, 'identity', payload);
}

export async function updateCourseIntent(courseId: string, payload: CourseIntentData) {
    await updateCourseSetupSection(courseId, 'intent', payload);
}

export async function updateCourseStructure(courseId: string, payload: CourseStructureData) {
    await updateCourseSetupSection(courseId, 'structure', payload);
}

export async function saveAccess(courseId: string, payload: CourseAccessData) {
    await updateCourseSetupSection(courseId, 'access', payload);
}

export async function savePricing(courseId: string, payload: CoursePricingData) {
    await updateCourseSetupSection(courseId, 'pricing', payload);
}

export async function saveResources(courseId: string, payload: CourseResourcesData) {
    await updateCourseSetupSection(courseId, 'resources', payload);
}

export async function savePublish(courseId: string, payload: CoursePublishData) {
    await updateCourseSetupSection(courseId, 'publish', payload);
}

export async function getCourseStructureModules(courseId: string): Promise<CourseStructureData['modules']> {
    await connectToDatabase();
    const setup = await CourseSetup.findOne({ courseId }).lean();
    return setup?.structure?.modules ?? [];
}

/* ---------------------------------------------
   Finalisation avant passage à l'éditeur
   - valide title + slug
   - save publish dans CourseSetup
   - sync CourseSetup -> Course (catalogue)
---------------------------------------------- */

export type SetupMissingItem = {
    key: 'title' | 'slug' | 'coverImage';
    label: string;
    href: string;
};

type FinalizePayload = { status: PublishStatus; listed: boolean };

type FinalizeOk = { ok: true; nextHref: string };
type FinalizeKo = { ok: false; message: string; missing: SetupMissingItem[] };

function isValidSlug(value: string) {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

/**
 * ⚠️ Typage minimal "lean" pour éviter any :
 * on ne type que ce qu'on lit réellement.
 */
type LeanCourseSetup = {
    identity?: Partial<CourseIdentityData>;
};

export async function finalizeCourseSetup(courseId: string, payload: FinalizePayload): Promise<FinalizeOk | FinalizeKo> {
    await connectToDatabase();

    const setup = (await CourseSetup.findOne({ courseId }).lean()) as LeanCourseSetup | null;

    const identity: Partial<CourseIdentityData> = setup?.identity ?? {};
    const title = String(identity.title ?? '').trim();
    const slug = String(identity.slug ?? '').trim();

    const missing: SetupMissingItem[] = [];

    if (title.length < 3) {
        missing.push({
            key: 'title',
            label: 'Titre (min. 3 caractères)',
            href: `/admin/cours/${courseId}/setup/identity`,
        });
    }

    if (slug.length < 3 || !isValidSlug(slug)) {
        missing.push({
            key: 'slug',
            label: 'Slug valide (URL, ex: couleurs-express)',
            href: `/admin/cours/${courseId}/setup/identity`,
        });
    }

    // Si tu veux rendre cover obligatoire, décommente :
    // if (!coverImage) {
    //     missing.push({
    //         key: 'coverImage',
    //         label: "Image de couverture (URL ou chemin /images/...)",
    //         href: `/admin/cours/${courseId}/setup/identity`,
    //     });
    // }

    if (missing.length) {
        return { ok: false, message: 'Il manque des infos essentielles avant de passer à l’éditeur.', missing };
    }

    await saveCourseSetup(courseId, { publish: payload });

    return { ok: true, nextHref: `/admin/cours/${courseId}/editor/intro` };
}
