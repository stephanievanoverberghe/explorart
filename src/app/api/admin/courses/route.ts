// src/app/api/admin/courses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import type { QueryFilter, SortOrder } from 'mongoose';
import { connectToDatabase } from '@/lib/db/connect';
import { Course, type CourseDocument, type CourseStatus } from '@/lib/models/Course';
import { CoursePurchase } from '@/lib/models/CoursePurchase';
import { CourseSetup } from '@/lib/models/CourseSetup';

type CourseSort = 'createdAt' | 'title' | 'duration' | 'price';

const sortMap: Record<CourseSort, Record<string, SortOrder>> = {
    createdAt: { createdAt: -1 },
    title: { title: 1 },
    duration: { durationMinutes: 1 },
    price: { priceEUR: 1 },
};

const statusLabelMap: Record<CourseStatus, 'Publié' | 'Brouillon' | 'En préparation'> = {
    published: 'Publié',
    draft: 'Brouillon',
    archived: 'En préparation',
};

const setupStatusLabelMap: Record<string, 'Publié' | 'Brouillon' | 'En préparation'> = {
    published: 'Publié',
    draft: 'Brouillon',
    archived: 'En préparation',
};

const levelLabelMap: Record<string, 'Débutant' | 'Intermédiaire' | 'Tous niveaux'> = {
    beginner: 'Débutant',
    intermediate: 'Intermédiaire',
};

type UiCourseStatus = 'Publié' | 'Brouillon' | 'En préparation';
type UiLevel = 'Débutant' | 'Intermédiaire' | 'Tous niveaux';
type UiPillar = 'dessin-peinture' | 'comprendre-une-oeuvre' | 'histoire-de-l-art' | 'histoires-d-artistes' | 'couleurs-harmonie' | 'inspirations' | 'psychologie-de-l-art';

type UiCourseRow = {
    id: string;
    slug: string;
    title: string;
    level: UiLevel;
    duration: string;
    status: UiCourseStatus;
    students: string;
    modulesCount: number;
    hasIntro: boolean;
    access: 'free' | 'premium';
    isFree?: boolean;
    pinned?: boolean;
    pillar: UiPillar;
    heroImage: { src: string; alt: string };
    hrefEdit: string;
    hrefPreview: string;
    summary?: string;
    priceLabel: string;
    videoCount: number;
    resourceCount: number;
    resourcesLabel: string;
};

type CourseSetupIdentityLite = {
    title?: string;
    slug?: string;
    pillar?: UiPillar;
    level?: UiLevel;
    access?: 'free' | 'premium';
    pinned?: boolean;
    coverImage?: string;
    summary?: string; // si tu l’ajoutes plus tard, on la prendra
};

type CourseSetupPricingLite = {
    price?: number;
};

type CourseSetupStructureLite = {
    modules?: Array<unknown>;
};

type CourseSetupResourcesLite = {
    resources?: Array<unknown>;
};

type CourseSetupPublishLite = {
    status?: 'draft' | 'published' | 'archived';
    listed?: boolean;
};

type CourseSetupLeanLite = {
    courseId: string;
    identity?: CourseSetupIdentityLite;
    pricing?: CourseSetupPricingLite;
    structure?: CourseSetupStructureLite;
    resources?: CourseSetupResourcesLite;
    publish?: CourseSetupPublishLite;
    updatedAt?: Date;
};

function escapeRegex(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function formatDuration(minutes: number) {
    if (!minutes || minutes <= 0) return '0 min';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return rest > 0 ? `${hours}h ${rest}` : `${hours}h`;
}

function formatPrice(priceEUR: number) {
    if (!priceEUR || priceEUR <= 0) return 'Gratuit';
    return `${priceEUR} €`;
}

function normalizeModulesCount(course: CourseDocument) {
    if (Array.isArray(course.modules) && course.modules.length > 0) return course.modules.length;
    return course.modulesCount ?? 0;
}

function getVideoCount(course: CourseDocument) {
    const moduleVideos = (course.modules ?? []).reduce((total, module) => total + (module.videos?.length ?? 0), 0);
    return (course.videos?.length ?? 0) + moduleVideos;
}

function getResourceCount(course: CourseDocument) {
    const moduleResources = (course.modules ?? []).reduce((total, module) => total + (module.resources?.length ?? 0), 0);
    return (course.resources?.length ?? 0) + moduleResources;
}

function getResourcesLabel(resourceCount: number) {
    if (resourceCount <= 0) return 'Aucune ressource';
    return `${resourceCount} ressource${resourceCount > 1 ? 's' : ''}`;
}

function isValidSlug(value: string) {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function normalizeUiLevel(value: unknown): UiLevel {
    if (value === 'Débutant' || value === 'Intermédiaire' || value === 'Tous niveaux') return value;
    // compat si ton setup stocke beginner/intermediate
    if (value === 'beginner') return 'Débutant';
    if (value === 'intermediate') return 'Intermédiaire';
    return 'Tous niveaux';
}

function normalizeUiPillar(value: unknown): UiPillar {
    const v = String(value ?? '').trim() as UiPillar;
    const allowed: UiPillar[] = [
        'dessin-peinture',
        'comprendre-une-oeuvre',
        'histoire-de-l-art',
        'histoires-d-artistes',
        'couleurs-harmonie',
        'inspirations',
        'psychologie-de-l-art',
    ];
    return allowed.includes(v) ? v : 'dessin-peinture';
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const page = Math.max(1, Number(searchParams.get('page') ?? 1));
        const pageSize = Math.min(100, Math.max(1, Number(searchParams.get('pageSize') ?? 50)));

        const status = searchParams.get('status') ?? 'all';
        const pillar = searchParams.get('pillar') ?? 'all';
        const level = searchParams.get('level') ?? 'all';

        const freeOnly = searchParams.get('free');
        const pinnedOnly = searchParams.get('pinned');

        const sortParam = (searchParams.get('sort') ?? 'createdAt') as CourseSort;
        const queryText = String(searchParams.get('q') ?? '').trim();

        const includeSetup = searchParams.get('includeSetup') !== 'false'; // default true

        await connectToDatabase();

        // 1) Courses (catalogue)
        const courseQuery: QueryFilter<CourseDocument> & { pinned?: boolean } = {};

        if (status !== 'all') courseQuery.status = status as CourseStatus;
        if (pillar !== 'all') courseQuery.pillarSlug = pillar;
        if (level !== 'all') courseQuery.level = level;

        if (freeOnly === 'true') courseQuery.priceEUR = { $lte: 0 };
        if (pinnedOnly === 'true') courseQuery.pinned = true;

        if (queryText) {
            const regex = new RegExp(escapeRegex(queryText), 'i');
            courseQuery.$or = [{ title: regex }, { tagline: regex }, { summary: regex }, { pillarLabel: regex }];
        }

        const sortKey = sortMap[sortParam] ? sortParam : 'createdAt';

        const [courses, purchases, statusCounts, averages] = await Promise.all([
            Course.find(courseQuery)
                .sort(sortMap[sortKey])
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .lean(),
            CoursePurchase.aggregate<{ _id: string; count: number }>([{ $group: { _id: '$courseSlug', count: { $sum: 1 } } }]),
            Course.aggregate<{ _id: CourseStatus; count: number }>([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
            Course.aggregate<{ _id: null; avgDuration: number; avgPrice: number }>([
                { $group: { _id: null, avgDuration: { $avg: '$durationMinutes' }, avgPrice: { $avg: '$priceEUR' } } },
            ]),
        ]);

        const purchaseMap = new Map(purchases.map((purchase) => [purchase._id, purchase.count]));

        const totals = statusCounts.reduce(
            (acc, entry) => {
                acc[entry._id] = entry.count;
                return acc;
            },
            { published: 0, draft: 0, archived: 0 } as Record<CourseStatus, number>
        );

        const avgDuration = Math.round(averages[0]?.avgDuration ?? 0);
        const avgPrice = Math.round(averages[0]?.avgPrice ?? 0);

        const normalizedCourses: UiCourseRow[] = courses.map((course) => {
            const modulesCount = normalizeModulesCount(course);
            const resourceCount = getResourceCount(course);
            const videoCount = getVideoCount(course);
            const studentsCount = purchaseMap.get(course.slug) ?? 0;

            const isFree = (course.priceEUR ?? 0) <= 0;
            const pinned = Boolean((course as { pinned?: boolean }).pinned);

            return {
                id: String(course._id),
                slug: course.slug,
                title: course.title,
                level: levelLabelMap[course.level] ?? 'Tous niveaux',
                duration: formatDuration(course.durationMinutes),
                status: statusLabelMap[course.status],
                students: studentsCount > 0 ? `${studentsCount} apprenant${studentsCount > 1 ? 's' : ''}` : 'Aucun apprenant',
                modulesCount,
                hasIntro: course.hasIntro,
                access: isFree ? 'free' : 'premium',
                isFree,
                pinned,
                pillar: normalizeUiPillar(course.pillarSlug),
                heroImage: {
                    src: course.coverImage || '/images/cours/commencer-ici-cover.png',
                    alt: `Couverture du cours ${course.title}`,
                },
                hrefEdit: `/admin/cours/${String(course._id)}`,
                hrefPreview: `/cours/${course.slug}`,
                summary: course.summary || course.tagline,
                priceLabel: formatPrice(course.priceEUR ?? 0),
                videoCount,
                resourceCount,
                resourcesLabel: getResourcesLabel(resourceCount),
            };
        });

        // 2) CourseSetup (drafts non sync)
        let setupRows: UiCourseRow[] = [];

        if (includeSetup) {
            const setups = (await CourseSetup.find({}).sort({ updatedAt: -1 }).limit(500).lean()) as unknown as CourseSetupLeanLite[];

            const existingIds = new Set(normalizedCourses.map((c) => c.id));

            setupRows = setups
                .filter((s) => !existingIds.has(String(s.courseId)))
                .map((s): UiCourseRow | null => {
                    const identity = s.identity ?? {};
                    const publish = s.publish ?? { status: 'draft', listed: true };
                    const pricing = s.pricing ?? {};
                    const structure = s.structure ?? {};
                    const resources = s.resources ?? {};

                    const title = String(identity.title ?? '').trim() || 'Cours (setup)';
                    const rawSlug = String(identity.slug ?? '').trim();
                    const pillarSlug = normalizeUiPillar(identity.pillar);
                    const levelValue = normalizeUiLevel(identity.level);
                    const access = identity.access === 'premium' ? 'premium' : 'free';
                    const pinned = Boolean(identity.pinned);
                    const coverImage = String(identity.coverImage ?? '').trim();

                    const priceEUR = access === 'free' ? 0 : Number(pricing.price ?? 29);
                    const listed = Boolean(publish.listed);

                    const statusLabel: UiCourseStatus = setupStatusLabelMap[String(publish.status)] ?? 'Brouillon';

                    // Filtres
                    if (status !== 'all') {
                        const wanted: UiCourseStatus = status === 'published' ? 'Publié' : status === 'draft' ? 'Brouillon' : 'En préparation';
                        if (statusLabel !== wanted) return null;
                    }
                    if (pillar !== 'all' && pillarSlug !== pillar) return null;
                    if (freeOnly === 'true' && priceEUR > 0) return null;
                    if (pinnedOnly === 'true' && !pinned) return null;
                    if (level !== 'all' && levelValue !== normalizeUiLevel(level)) return null;

                    if (queryText) {
                        const q = queryText.toLowerCase();
                        const hay = `${title} ${pillarSlug} ${levelValue} ${rawSlug}`.toLowerCase();
                        if (!hay.includes(q)) return null;
                    }

                    const modulesCount = Array.isArray(structure.modules) ? structure.modules.length : 0;
                    const resourceCount = Array.isArray(resources.resources) ? resources.resources.length : 0;

                    const safeSlug = isValidSlug(rawSlug) ? rawSlug : `draft-${String(s.courseId).slice(-6)}`;

                    return {
                        id: String(s.courseId),
                        slug: safeSlug,
                        title,
                        level: levelValue,
                        duration: '0 min',
                        status: statusLabel,
                        students: 'Aucun apprenant',
                        modulesCount,
                        hasIntro: true,
                        access: priceEUR <= 0 ? 'free' : 'premium',
                        isFree: priceEUR <= 0,
                        pinned,
                        pillar: pillarSlug,
                        heroImage: {
                            src: coverImage || '/images/cours/commencer-ici-cover.png',
                            alt: `Couverture du cours ${title}`,
                        },
                        hrefEdit: `/admin/cours/${String(s.courseId)}/setup/identity`,
                        hrefPreview: isValidSlug(rawSlug) && publish.status === 'published' && listed ? `/cours/${rawSlug}` : `/admin/cours/${String(s.courseId)}`,
                        summary: identity.summary || 'Setup en cours…',
                        priceLabel: formatPrice(priceEUR),
                        videoCount: 0,
                        resourceCount,
                        resourcesLabel: getResourcesLabel(resourceCount),
                    };
                })
                .filter((row): row is UiCourseRow => Boolean(row));
        }

        // 3) Merge + pagination simple
        const merged: UiCourseRow[] = [...normalizedCourses, ...setupRows];

        const total = merged.length;
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        const safePage = Math.min(page, totalPages);
        const sliceStart = (safePage - 1) * pageSize;
        const sliceEnd = sliceStart + pageSize;

        const data = merged.slice(sliceStart, sliceEnd);

        const metrics = [
            {
                label: 'Cours actifs',
                value: `${totals.published + totals.draft + totals.archived + (includeSetup ? setupRows.length : 0)}`,
                detail: `${totals.published} en ligne • ${totals.draft} en préparation`,
            },
            {
                label: 'Durée moyenne',
                value: formatDuration(avgDuration),
                detail: total > 0 ? `Calculée sur ${totals.published + totals.draft + totals.archived} cours sync` : 'Aucun cours disponible',
            },
            {
                label: 'Prix moyen',
                value: formatPrice(avgPrice),
                detail: total > 0 ? `Basé sur ${totals.published + totals.draft + totals.archived} cours sync` : 'Aucun cours disponible',
            },
        ];

        return NextResponse.json({ data, meta: { total, page: safePage, pageSize, totalPages }, metrics });
    } catch (error) {
        console.error('GET /api/admin/courses', error);
        return NextResponse.json({ error: 'Impossible de récupérer les cours.' }, { status: 500 });
    }
}
