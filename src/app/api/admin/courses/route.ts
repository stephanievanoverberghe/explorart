import { NextResponse } from 'next/server';
import type { QueryFilter, SortOrder } from 'mongoose';
import { connectToDatabase } from '@/lib/db/connect';
import { Course, type CourseDocument, type CourseStatus } from '@/lib/models/Course';
import { CoursePurchase } from '@/lib/models/CoursePurchase';

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

const levelLabelMap: Record<string, 'Débutant' | 'Intermédiaire' | 'Tous niveaux'> = {
    beginner: 'Débutant',
    intermediate: 'Intermédiaire',
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
    if (Array.isArray(course.modules) && course.modules.length > 0) {
        return course.modules.length;
    }
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

export async function GET(request: Request) {
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

        const query: QueryFilter<CourseDocument> & { pinned?: boolean } = {};

        if (status !== 'all') {
            query.status = status as CourseStatus;
        }

        if (pillar !== 'all') {
            query.pillarSlug = pillar;
        }

        if (level !== 'all') {
            query.level = level;
        }

        if (freeOnly === 'true') {
            query.priceEUR = { $lte: 0 };
        }

        if (pinnedOnly === 'true') {
            query.pinned = true;
        }

        if (queryText) {
            const regex = new RegExp(escapeRegex(queryText), 'i');
            query.$or = [{ title: regex }, { tagline: regex }, { summary: regex }, { pillarLabel: regex }];
        }

        await connectToDatabase();

        const sortKey = sortMap[sortParam] ? sortParam : 'createdAt';

        const [total, courses, purchases, statusCounts, averages] = await Promise.all([
            Course.countDocuments(query),
            Course.find(query)
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
        const totalPages = Math.max(1, Math.ceil(total / pageSize));

        const data = courses.map((course) => {
            const modulesCount = normalizeModulesCount(course);
            const resourceCount = getResourceCount(course);
            const videoCount = getVideoCount(course);
            const studentsCount = purchaseMap.get(course.slug) ?? 0;
            const isFree = course.priceEUR <= 0;
            const pinned = Boolean((course as { pinned?: boolean }).pinned);

            return {
                id: String(course._id),
                slug: course.slug,
                title: course.title,
                level: levelLabelMap[course.level] ?? 'Tous niveaux',
                duration: formatDuration(course.durationMinutes),
                durationMinutes: course.durationMinutes ?? 0,
                status: statusLabelMap[course.status],
                students: studentsCount > 0 ? `${studentsCount} apprenant${studentsCount > 1 ? 's' : ''}` : 'Aucun apprenant',
                modulesCount,
                hasIntro: course.hasIntro,
                access: isFree ? 'free' : 'premium',
                isFree,
                pinned,
                pillar: course.pillarSlug,
                heroImage: {
                    src: course.coverImage || '/images/cours/commencer-ici-cover.png',
                    alt: `Couverture du cours ${course.title}`,
                },
                hrefEdit: `/admin/cours/${course.slug}`,
                hrefPreview: `/cours/${course.slug}`,
                summary: course.summary || course.tagline,
                priceLabel: formatPrice(course.priceEUR),
                priceEUR: course.priceEUR ?? 0,
                videoCount,
                resourceCount,
                resourcesLabel: getResourcesLabel(resourceCount),
            };
        });

        const metrics = [
            {
                label: 'Cours actifs',
                value: `${totals.published + totals.draft + totals.archived}`,
                detail: `${totals.published} en ligne • ${totals.draft} en préparation`,
            },
            {
                label: 'Durée moyenne',
                value: formatDuration(avgDuration),
                detail: total > 0 ? `Calculée sur ${totals.published + totals.draft + totals.archived} cours` : 'Aucun cours disponible',
            },
            {
                label: 'Prix moyen',
                value: formatPrice(avgPrice),
                detail: total > 0 ? `Basé sur ${totals.published + totals.draft + totals.archived} cours` : 'Aucun cours disponible',
            },
        ];

        return NextResponse.json({ data, meta: { total, page, pageSize, totalPages }, metrics });
    } catch (error) {
        console.error('GET /api/admin/courses', error);
        return NextResponse.json({ error: 'Impossible de récupérer les cours.' }, { status: 500 });
    }
}
