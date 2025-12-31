// src/lib/actions/courseSetup.ts
'use server';

import { Types } from 'mongoose';
import { connectToDatabase } from '@/lib/db/connect';
import { CourseSetup } from '@/lib/models/CourseSetup';
import { Course } from '@/lib/models/Course';
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

/* ---------------------------------------------
   Generic update helper
---------------------------------------------- */
async function updateCourseSetupSection<T>(courseId: string, section: string, payload: T) {
    await connectToDatabase();
    await CourseSetup.findOneAndUpdate({ courseId }, { $set: { [section]: payload } }, { upsert: true, new: true });
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
    pricing?: Partial<CoursePricingData>;
};

export async function finalizeCourseSetup(courseId: string, payload: FinalizePayload): Promise<FinalizeOk | FinalizeKo> {
    await connectToDatabase();

    const setup = (await CourseSetup.findOne({ courseId }).lean()) as LeanCourseSetup | null;

    const identity: Partial<CourseIdentityData> = setup?.identity ?? {};
    const pricing: Partial<CoursePricingData> = setup?.pricing ?? {};

    const title = String(identity.title ?? '').trim();
    const slug = String(identity.slug ?? '').trim();
    const coverImage = String(identity.coverImage ?? '').trim();

    const pillar = identity.pillar ?? 'dessin-peinture';
    const level = identity.level ?? 'Tous niveaux';
    const access = identity.access ?? 'free';
    const pinned = Boolean(identity.pinned);

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

    // ✅ 1) Save publish dans CourseSetup
    await CourseSetup.findOneAndUpdate({ courseId }, { $set: { publish: payload } }, { upsert: true, new: true });

    // ✅ 2) Sync dans Course (catalogue)
    const priceEUR = access === 'free' ? 0 : Number(pricing.price ?? 29);

    const coursePatch = {
        slug,
        title,
        pillarSlug: pillar,
        level,
        coverImage: coverImage || undefined,
        pinned,
        priceEUR,
        status: payload.status === 'published' ? 'published' : 'draft',
        listed: payload.listed,
    };

    // courseId peut être un ObjectId (si tu utilises l'id Mongo) ou un slug (si tu fais slug = id route)
    if (Types.ObjectId.isValid(courseId)) {
        await Course.findOneAndUpdate({ _id: courseId }, { $set: coursePatch }, { upsert: false, new: true });
    } else {
        // upsert true pour créer la fiche catalogue si elle n'existe pas encore
        await Course.findOneAndUpdate({ slug: courseId }, { $set: coursePatch }, { upsert: true, new: true });
    }

    return { ok: true, nextHref: `/admin/cours/${courseId}/editor/intro` };
}
