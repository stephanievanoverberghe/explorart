// src/lib/actions/courseAdmin.ts
'use server';

import { revalidatePath } from 'next/cache';
import { Types } from 'mongoose';
import { connectToDatabase } from '@/lib/db/connect';
import { Course } from '@/lib/models/Course';
import { CourseCommerce } from '@/lib/models/CourseCommerce';
import { CourseContent } from '@/lib/models/CourseContent';
import { CourseSetup } from '@/lib/models/CourseSetup';
import type { AdminCourseDTO, PublicCourseDTO } from '@/types/courseDto';
import type { CourseAccessData, CourseIdentityData, CourseIntentData, CoursePricingData, CourseResourcesData, CourseSetupData, CourseStructureData } from '@/types/courseSetup';
import type { CourseCommerceData, CourseCouponData, CoursePromotionData } from '@/types/courseCommerce';
import type { CourseConclusionData, CourseContentData, CourseIntroData, CourseModuleData } from '@/types/courseContent';
import { buildDefaultCourseSetup } from '@/lib/utils//courseSetupDefaults';
import { computeCommerce } from '@/lib/utils/courseCommerce';
import { buildPublishChecklist } from '@/lib/utils/coursePublishValidation';
import { slugify } from '@/lib/utils//slugify';
import { normalizeConclusion, normalizeIntro, normalizeModule } from '@/lib/utils/courseFactories';

const pillarLabels: Record<string, string> = {
    'dessin-peinture': 'Dessin & Peinture',
    'comprendre-une-oeuvre': 'Comprendre une œuvre',
    'histoire-de-l-art': "Histoire de l'art",
    'histoires-d-artistes': "Histoires d'artistes",
    'couleurs-harmonie': 'Couleurs & harmonie',
    inspirations: 'Inspirations',
    'psychologie-de-l-art': "Psychologie de l'art",
};

function mapLevel(value: string) {
    switch (value) {
        case 'Débutant':
            return 'beginner';
        case 'Intermédiaire':
            return 'intermediate';
        case 'Avancé':
            return 'advanced';
        case 'Tous niveaux':
            return 'all';
        default:
            return 'beginner';
    }
}

function normalizeIdentity(data: CourseIdentityData): CourseIdentityData {
    const title = data.title.trim();
    const slugCandidate = data.slug.trim() || slugify(title);
    return {
        ...data,
        title,
        slug: slugCandidate,
        coverImage: data.coverImage.trim(),
    };
}

function normalizeIntent(data: CourseIntentData): CourseIntentData {
    return {
        ...data,
        promise: data.promise.trim(),
        outcomes: data.outcomes.map((item) => item.trim()).filter(Boolean),
        audience: data.audience.trim(),
        notFor: data.notFor.trim(),
        prerequisites: data.prerequisites.trim(),
    };
}

function normalizeStructure(data: CourseStructureData): CourseStructureData {
    return {
        introMinutes: Number(data.introMinutes) || 0,
        conclusionMinutes: Number(data.conclusionMinutes) || 0,
        modules: data.modules.map((module) => ({
            id: module.id || crypto.randomUUID(),
            title: module.title.trim(),
            goal: module.goal.trim(),
            minutes: Number(module.minutes) || 0,
        })),
    };
}

function normalizeAccess(data: CourseAccessData): CourseAccessData {
    return {
        ...data,
        access: data.access === 'premium' ? 'premium' : 'free',
    };
}

function normalizePricing(data: CoursePricingData): CoursePricingData {
    return {
        ...data,
        pricingModel: data.pricingModel,
        price: Number(data.price) || 0,
        promoPrice: data.promoPrice.trim(),
    };
}

function normalizeResources(data: CourseResourcesData): CourseResourcesData {
    return {
        ...data,
        resources: data.resources.map((resource) => ({
            id: resource.id || crypto.randomUUID(),
            title: resource.title.trim(),
            format: resource.format.trim(),
        })),
    };
}

function computeDuration(structure: CourseStructureData) {
    return structure.modules.reduce((total, module) => total + (Number(module.minutes) || 0), 0) + structure.introMinutes + structure.conclusionMinutes;
}

function getDurationLabel(minutes: number) {
    if (minutes <= 45) return 'short';
    if (minutes <= 70) return 'medium';
    return 'long';
}

function parsePrice(value: string) {
    const normalized = value.replace(',', '.').trim();
    const parsed = Number.parseFloat(normalized);
    return Number.isFinite(parsed) ? parsed : null;
}

type CommerceDocLike = Omit<Partial<CourseCommerceData>, 'updatedAt' | 'promotions' | 'coupons'> & {
    updatedAt?: string | Date;
    promotions?: Array<Omit<CoursePromotionData, 'startsAt' | 'endsAt'> & { startsAt?: string | Date; endsAt?: string | Date }>;
    coupons?: Array<Omit<CourseCouponData, 'startsAt' | 'endsAt'> & { startsAt?: string | Date; endsAt?: string | Date }>;
};

type CourseSetupPayload = Partial<{
    identity: CourseIdentityData;
    intent: CourseIntentData;
    structure: CourseStructureData;
    access: CourseAccessData;
    pricing: CoursePricingData;
    resources: CourseResourcesData;
}>;

type CourseSetupSlice = keyof CourseSetupPayload;

type CourseContentSlice = 'intro' | 'module' | 'conclusion';

type UpdateResult<T> = { ok: true; data: T } | { ok: false; error: string };

function assertValidCourseId(courseId: string) {
    if (!Types.ObjectId.isValid(courseId)) {
        throw new Error('Identifiant de cours invalide.');
    }
}

function ensureCourseSlug(courseId: string, setup: CourseSetupData) {
    const slugCandidate = setup.identity.slug || slugify(setup.identity.title);
    return slugCandidate || `draft-${courseId.slice(-6)}`;
}

function normalizeCommerceDoc(courseId: string, doc: CommerceDocLike | null | undefined): CourseCommerceData {
    const promotions = (doc?.promotions ?? []).map((promo) => ({
        ...promo,
        startsAt: promo.startsAt ? new Date(promo.startsAt).toISOString() : undefined,
        endsAt: promo.endsAt ? new Date(promo.endsAt).toISOString() : undefined,
    }));
    const coupons = (doc?.coupons ?? []).map((coupon) => ({
        ...coupon,
        startsAt: coupon.startsAt ? new Date(coupon.startsAt).toISOString() : undefined,
        endsAt: coupon.endsAt ? new Date(coupon.endsAt).toISOString() : undefined,
    }));

    const commerce: CourseCommerceData = {
        courseId,
        pricing: {
            currency: doc?.pricing?.currency ?? 'EUR',
            basePrice: doc?.pricing?.basePrice ?? 0,
            isFree: doc?.pricing?.isFree ?? true,
            compareAtPrice: doc?.pricing?.compareAtPrice,
        },
        promotions,
        coupons,
        stock: doc?.stock ?? { isUnlimited: true },
        computed: doc?.computed ?? { effectivePrice: 0, promoLabel: undefined },
        updatedAt: doc?.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
    };

    return computeCommerce(commerce);
}

function buildNextSetup(courseId: string, current: CourseSetupData | null, payload: CourseSetupPayload): CourseSetupData {
    const defaults = buildDefaultCourseSetup(courseId);

    return {
        courseId,
        identity: normalizeIdentity(payload.identity ?? current?.identity ?? defaults.identity),
        intent: normalizeIntent(payload.intent ?? current?.intent ?? defaults.intent),
        structure: normalizeStructure(payload.structure ?? current?.structure ?? defaults.structure),
        access: normalizeAccess(payload.access ?? current?.access ?? defaults.access),
        pricing: normalizePricing(payload.pricing ?? current?.pricing ?? defaults.pricing),
        resources: normalizeResources(payload.resources ?? current?.resources ?? defaults.resources),
    };
}

async function buildCourseCommerce(courseId: string, setup: CourseSetupData): Promise<CourseCommerceData> {
    const isFree = setup.access.access === 'free' || setup.pricing.price <= 0;
    const basePrice = isFree ? 0 : setup.pricing.price;

    const existing = await CourseCommerce.findOne({ courseId }).lean();
    const promoPrice = parsePrice(setup.pricing.promoPrice);
    const shouldCreatePromo = promoPrice !== null && promoPrice > 0 && promoPrice < basePrice;
    const promoPromotion = shouldCreatePromo
        ? [
              {
                  type: 'fixed' as const,
                  value: Math.max(0, basePrice - promoPrice),
                  startsAt: undefined,
                  endsAt: undefined,
                  isActive: true,
              },
          ]
        : [];
    const existingPromotions = (existing?.promotions as CourseCommerceData['promotions']) ?? [];
    const promotions = existingPromotions.length ? existingPromotions : promoPromotion;

    return computeCommerce({
        courseId,
        pricing: {
            currency: existing?.pricing?.currency ?? 'EUR',
            basePrice,
            isFree,
            compareAtPrice: shouldCreatePromo ? basePrice : existing?.pricing?.compareAtPrice,
        },
        promotions,
        coupons: (existing?.coupons as CourseCommerceData['coupons']) ?? [],
        stock: existing?.stock ?? { isUnlimited: true },
        computed: { effectivePrice: 0 },
        updatedAt: existing?.updatedAt?.toISOString(),
    });
}

function buildAggregateUpdate(setup: CourseSetupData, content?: CourseContentData | null) {
    const durationMinutes = computeDuration(setup.structure);

    return {
        slug: ensureCourseSlug(setup.courseId, setup),
        title: setup.identity.title || 'Cours sans titre',
        tagline: setup.intent.promise,
        level: mapLevel(setup.identity.level),
        pillarSlug: setup.identity.pillar,
        pillarLabel: pillarLabels[setup.identity.pillar] ?? 'Dessin & Peinture',
        coverImage: setup.identity.coverImage,
        durationLabel: getDurationLabel(durationMinutes),
        durationMinutes,
        modulesCount: setup.structure.modules.length,
        hasIntro: Boolean(content?.intro) || setup.structure.introMinutes > 0,
        hasConclusion: Boolean(content?.conclusion) || setup.structure.conclusionMinutes > 0,
        pinned: setup.identity.pinned,
    };
}

function revalidateCourseAdmin(courseId: string) {
    revalidatePath('/admin/cours');
    revalidatePath(`/admin/cours/${courseId}`);
}

function revalidateCoursePublic(slug: string) {
    revalidatePath('/cours');
    revalidatePath(`/cours/${slug}`);
}

export async function updateCourseAggregateFromSetup(courseId: string, setup: CourseSetupData, content?: CourseContentData | null) {
    const aggregate = buildAggregateUpdate(setup, content);

    const course = await Course.findOneAndUpdate(
        { _id: courseId },
        {
            $set: aggregate,
            $setOnInsert: {
                status: 'draft',
                listed: false,
            },
        },
        { upsert: true, new: true }
    ).lean();

    return { course, aggregate };
}

export async function createCourseDraft(): Promise<{ courseId: string; slug: string }> {
    await connectToDatabase();

    let draftSlug = `draft-${crypto.randomUUID().slice(0, 8)}`;
    while (await Course.exists({ slug: draftSlug })) {
        draftSlug = `draft-${crypto.randomUUID().slice(0, 8)}`;
    }

    const course = await Course.create({
        slug: draftSlug,
        title: 'Nouveau cours',
        tagline: 'À compléter',
        level: 'beginner',
        pillarSlug: 'dessin-peinture',
        pillarLabel: pillarLabels['dessin-peinture'],
        coverImage: '/images/cours/commencer-ici-cover.png',
        durationLabel: 'short',
        durationMinutes: 0,
        modulesCount: 0,
        hasIntro: true,
        hasConclusion: true,
        status: 'draft',
        listed: false,
    });

    const courseId = String(course._id);
    const setup = buildDefaultCourseSetup(courseId);
    setup.identity.slug = draftSlug;
    setup.identity.title = course.title;
    await CourseSetup.create(setup);
    await CourseContent.create({ courseId });

    const commerce = computeCommerce({
        courseId,
        pricing: { currency: 'EUR', basePrice: 0, isFree: true },
        promotions: [],
        coupons: [],
        stock: { isUnlimited: true },
        computed: { effectivePrice: 0 },
    });
    await CourseCommerce.create(commerce);

    return { courseId, slug: draftSlug };
}

export async function saveCourseSetup(courseId: string, payload: CourseSetupPayload): Promise<CourseSetupData> {
    assertValidCourseId(courseId);
    await connectToDatabase();

    const current = (await CourseSetup.findOne({ courseId }).lean()) as CourseSetupData | null;
    const next = buildNextSetup(courseId, current, payload);

    await CourseSetup.findOneAndUpdate(
        { courseId },
        {
            $set: {
                identity: next.identity,
                intent: next.intent,
                structure: next.structure,
                access: next.access,
                pricing: next.pricing,
                resources: next.resources,
            },
        },
        { upsert: true, new: true }
    );

    const { course } = await updateCourseAggregateFromSetup(courseId, next);

    const commerce = await buildCourseCommerce(courseId, next);
    await CourseCommerce.findOneAndUpdate({ courseId }, { $set: commerce }, { upsert: true, new: true });

    revalidateCourseAdmin(courseId);
    if (course?.status === 'published') {
        revalidateCoursePublic(course.slug);
    }
    return next;
}

export async function updateCourseSetupSlice(
    courseId: string,
    sliceName: CourseSetupSlice,
    sliceData: CourseSetupPayload[CourseSetupSlice]
): Promise<UpdateResult<CourseSetupData>> {
    try {
        assertValidCourseId(courseId);
        await connectToDatabase();

        const current = (await CourseSetup.findOne({ courseId }).lean()) as CourseSetupData | null;
        const next = buildNextSetup(courseId, current, { [sliceName]: sliceData } as CourseSetupPayload);

        await CourseSetup.findOneAndUpdate(
            { courseId },
            {
                $set: {
                    identity: next.identity,
                    intent: next.intent,
                    structure: next.structure,
                    access: next.access,
                    pricing: next.pricing,
                    resources: next.resources,
                },
            },
            { upsert: true, new: true }
        );

        const contentDoc = await CourseContent.findOne({ courseId }).lean();
        const content: CourseContentData | null = contentDoc
            ? {
                  intro: contentDoc.intro ?? undefined,
                  modules: (contentDoc.modules as CourseContentData['modules']) ?? {},
                  conclusion: contentDoc.conclusion ?? undefined,
                  contentStatus: contentDoc.contentStatus ?? undefined,
                  contentPublishedAt: contentDoc.contentPublishedAt?.toISOString(),
              }
            : null;

        const { course } = await updateCourseAggregateFromSetup(courseId, next, content);

        const commerce = await buildCourseCommerce(courseId, next);
        await CourseCommerce.findOneAndUpdate({ courseId }, { $set: commerce }, { upsert: true, new: true });

        revalidateCourseAdmin(courseId);
        if (course?.status === 'published') {
            revalidateCoursePublic(course.slug);
        }

        return { ok: true, data: next };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Erreur inconnue.';
        return { ok: false, error: message };
    }
}

export async function updateCourseContentSlice(
    courseId: string,
    sliceName: CourseContentSlice,
    payload: { intro: CourseIntroData } | { moduleId: string; module: CourseModuleData } | { conclusion: CourseConclusionData }
): Promise<UpdateResult<null>> {
    try {
        assertValidCourseId(courseId);
        await connectToDatabase();

        if (sliceName === 'intro' && 'intro' in payload) {
            const normalized = normalizeIntro(payload.intro);
            await CourseContent.findOneAndUpdate({ courseId }, { $set: { intro: normalized } }, { upsert: true, new: true });
        }

        if (sliceName === 'conclusion' && 'conclusion' in payload) {
            const normalized = normalizeConclusion(payload.conclusion);
            await CourseContent.findOneAndUpdate({ courseId }, { $set: { conclusion: normalized } }, { upsert: true, new: true });
        }

        if (sliceName === 'module' && 'moduleId' in payload) {
            const setup = await CourseSetup.findOne({ courseId }).lean();
            const modules = (setup?.structure?.modules as Array<{ id: string; title?: string }> | undefined) ?? [];
            const exists = modules.some((module) => module.id === payload.moduleId);

            if (!exists) {
                return { ok: false, error: 'Module introuvable pour ce cours.' };
            }

            const fallbackTitle = modules.find((module) => module.id === payload.moduleId)?.title ?? '';
            const normalized = normalizeModule(payload.module, fallbackTitle);
            await CourseContent.findOneAndUpdate({ courseId }, { $set: { [`modules.${payload.moduleId}`]: normalized } }, { upsert: true, new: true });
        }

        const setupDoc = await CourseSetup.findOne({ courseId }).lean();
        const setup = setupDoc ? (setupDoc as CourseSetupData) : buildDefaultCourseSetup(courseId);

        const contentDoc = await CourseContent.findOne({ courseId }).lean();
        const content: CourseContentData | null = contentDoc
            ? {
                  intro: contentDoc.intro ?? undefined,
                  modules: (contentDoc.modules as CourseContentData['modules']) ?? {},
                  conclusion: contentDoc.conclusion ?? undefined,
                  contentStatus: contentDoc.contentStatus ?? undefined,
                  contentPublishedAt: contentDoc.contentPublishedAt?.toISOString(),
              }
            : null;

        const { course } = await updateCourseAggregateFromSetup(courseId, setup, content);

        revalidateCourseAdmin(courseId);
        if (course?.status === 'published') {
            revalidateCoursePublic(course.slug);
        }

        return { ok: true, data: null };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Erreur inconnue.';
        return { ok: false, error: message };
    }
}

export async function updateCourseCommerce(courseId: string, patch: Partial<CourseCommerceData>): Promise<UpdateResult<CourseCommerceData>> {
    try {
        assertValidCourseId(courseId);
        await connectToDatabase();

        const existing = await CourseCommerce.findOne({ courseId }).lean();
        const merged = normalizeCommerceDoc(courseId, { ...existing, ...patch });
        const next = computeCommerce(merged);

        const updated = await CourseCommerce.findOneAndUpdate({ courseId }, { $set: next }, { upsert: true, new: true }).lean();

        const course = await Course.findById(courseId).lean();
        revalidateCourseAdmin(courseId);
        if (course?.status === 'published') {
            revalidateCoursePublic(course.slug);
        }

        return { ok: true, data: normalizeCommerceDoc(courseId, updated) };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Erreur inconnue.';
        return { ok: false, error: message };
    }
}

export async function getCourseAdmin(courseId: string): Promise<AdminCourseDTO | null> {
    if (!Types.ObjectId.isValid(courseId)) {
        return null;
    }

    await connectToDatabase();
    const [course, setupDoc, contentDoc, commerceDoc] = await Promise.all([
        Course.findById(courseId).lean(),
        CourseSetup.findOne({ courseId }).lean(),
        CourseContent.findOne({ courseId }).lean(),
        CourseCommerce.findOne({ courseId }).lean(),
    ]);

    let courseDoc = course;
    if (!courseDoc && setupDoc) {
        const setup = setupDoc as CourseSetupData;
        const created = await Course.create({
            slug: setup.identity.slug || slugify(setup.identity.title) || `draft-${courseId.slice(-6)}`,
            title: setup.identity.title || 'Cours sans titre',
            tagline: setup.intent.promise,
            level: mapLevel(setup.identity.level),
            pillarSlug: setup.identity.pillar,
            pillarLabel: pillarLabels[setup.identity.pillar] ?? 'Dessin & Peinture',
            coverImage: setup.identity.coverImage,
            durationLabel: getDurationLabel(computeDuration(setup.structure)),
            durationMinutes: computeDuration(setup.structure),
            modulesCount: setup.structure.modules.length,
            hasIntro: setup.structure.introMinutes > 0,
            hasConclusion: setup.structure.conclusionMinutes > 0,
            pinned: setup.identity.pinned,
            status: 'draft',
            listed: false,
        });
        courseDoc = created.toObject();
    }

    if (!courseDoc) return null;

    const setup = setupDoc ? (setupDoc as CourseSetupData) : buildDefaultCourseSetup(courseId);
    const content: CourseContentData | null = contentDoc
        ? {
              intro: contentDoc.intro ?? undefined,
              modules: (contentDoc.modules as CourseContentData['modules']) ?? {},
              conclusion: contentDoc.conclusion ?? undefined,
              contentStatus: contentDoc.contentStatus ?? undefined,
              contentPublishedAt: contentDoc.contentPublishedAt?.toISOString(),
          }
        : null;

    const commerce = commerceDoc ? normalizeCommerceDoc(courseId, commerceDoc) : await buildCourseCommerce(courseId, setup);

    const checklist = buildPublishChecklist(courseId, setup, content, commerce);

    return {
        id: String(courseDoc._id),
        slug: courseDoc.slug,
        title: courseDoc.title,
        status: courseDoc.status,
        listed: courseDoc.listed,
        coverImage: courseDoc.coverImage,
        level: courseDoc.level,
        pillarSlug: courseDoc.pillarSlug as AdminCourseDTO['pillarSlug'],
        pillarLabel: courseDoc.pillarLabel,
        durationMinutes: courseDoc.durationMinutes,
        modulesCount: courseDoc.modulesCount,
        updatedAt: courseDoc.updatedAt?.toISOString(),
        setup,
        content,
        commerce,
        progress: {
            setupComplete: Boolean(setup.identity.title.trim()) && setup.structure.modules.length > 0,
            contentComplete: checklist.items.filter((item) => item.key !== 'pricing').every((item) => item.status === 'ok'),
            publishReady: checklist.canPublish,
        },
    };
}

export async function getCoursePublic(slug: string): Promise<PublicCourseDTO | null> {
    await connectToDatabase();

    const normalizedSlug = slug.trim().toLowerCase();
    const course = await Course.findOne({ slug: normalizedSlug, status: 'published', listed: true }).lean();
    if (!course) return null;

    const setupDoc = await CourseSetup.findOne({ courseId: String(course._id) }).lean();
    const commerceDoc = await CourseCommerce.findOne({ courseId: String(course._id) }).lean();
    const contentDoc = await CourseContent.findOne({ courseId: String(course._id) }).lean();

    if (!contentDoc || contentDoc.contentStatus !== 'published') return null;

    const setup = setupDoc ? (setupDoc as CourseSetupData) : buildDefaultCourseSetup(String(course._id));
    const commerce = commerceDoc ? normalizeCommerceDoc(String(course._id), commerceDoc) : await buildCourseCommerce(String(course._id), setup);

    return {
        id: String(course._id),
        slug: course.slug,
        title: course.title,
        tagline: course.tagline,
        summary: course.summary,
        level: course.level,
        pillarSlug: course.pillarSlug as PublicCourseDTO['pillarSlug'],
        pillarLabel: course.pillarLabel,
        coverImage: course.coverImage || '/images/cours/commencer-ici-cover.png',
        durationMinutes: course.durationMinutes,
        modulesCount: course.modulesCount,
        status: course.status,
        setup,
        commerce,
    };
}

export async function publishCourse(courseId: string): Promise<{ ok: boolean; checklist: ReturnType<typeof buildPublishChecklist> }> {
    assertValidCourseId(courseId);
    await connectToDatabase();
    const [setupDoc, contentDoc, commerceDoc] = await Promise.all([
        CourseSetup.findOne({ courseId }).lean(),
        CourseContent.findOne({ courseId }).lean(),
        CourseCommerce.findOne({ courseId }).lean(),
    ]);

    const setup = setupDoc ? (setupDoc as CourseSetupData) : buildDefaultCourseSetup(courseId);
    const content: CourseContentData | null = contentDoc
        ? {
              intro: contentDoc.intro ?? undefined,
              modules: (contentDoc.modules as CourseContentData['modules']) ?? {},
              conclusion: contentDoc.conclusion ?? undefined,
              contentStatus: contentDoc.contentStatus ?? undefined,
              contentPublishedAt: contentDoc.contentPublishedAt?.toISOString(),
          }
        : null;

    const commerce = commerceDoc ? normalizeCommerceDoc(courseId, commerceDoc) : await buildCourseCommerce(courseId, setup);

    const checklist = buildPublishChecklist(courseId, setup, content, commerce);

    if (!checklist.canPublish) {
        return { ok: false, checklist };
    }

    const slug = ensureCourseSlug(courseId, setup);

    await CourseContent.findOneAndUpdate({ courseId }, { $set: { contentStatus: 'published', contentPublishedAt: new Date() } }, { upsert: true, new: true });

    await CourseCommerce.findOneAndUpdate({ courseId }, { $set: commerce }, { upsert: true, new: true });

    await Course.findOneAndUpdate(
        { _id: courseId },
        {
            $set: {
                status: 'published',
                publishedAt: new Date(),
            },
        },
        { new: true }
    );

    revalidateCourseAdmin(courseId);
    revalidateCoursePublic(slug);

    return { ok: true, checklist };
}

export async function updateCourseListing(courseId: string, listed: boolean): Promise<void> {
    assertValidCourseId(courseId);
    await connectToDatabase();
    const course = await Course.findOneAndUpdate({ _id: courseId }, { $set: { listed: Boolean(listed) } }, { new: true }).lean();
    revalidateCourseAdmin(courseId);
    if (course?.status === 'published') {
        revalidateCoursePublic(course.slug);
    }
}

export async function unpublishCourse(courseId: string): Promise<void> {
    assertValidCourseId(courseId);
    await connectToDatabase();
    const course = await Course.findById(courseId).lean();
    if (!course) return;

    await Course.findOneAndUpdate(
        { _id: courseId },
        {
            $set: {
                status: 'draft',
                listed: false,
                publishedAt: null,
            },
        },
        { new: true }
    );

    await CourseContent.findOneAndUpdate(
        { courseId },
        {
            $set: {
                contentStatus: 'draft',
                contentPublishedAt: null,
            },
        },
        { upsert: true, new: true }
    );

    revalidateCourseAdmin(courseId);
    revalidateCoursePublic(course.slug);
}
