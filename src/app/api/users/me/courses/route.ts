// src/app/api/users/me/courses/route.ts
import { NextResponse } from 'next/server';

import { COURSES } from '@/lib/content/courses';
import { connectToDatabase } from '@/lib/db/connect';
import { getAuthUser } from '@/lib/auth/session';
import { CoursePurchase } from '@/lib/models/CoursePurchase';
import { saveCoursePurchase } from '@/lib/purchases/saveCoursePurchase';

export async function GET() {
    const authUser = await getAuthUser();

    if (!authUser) {
        return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
    }

    await connectToDatabase();

    const purchases = await CoursePurchase.find({ userId: authUser.userId }).sort({ createdAt: -1 }).lean();

    const courses = purchases
        .map((purchase) => {
            const course = COURSES.find((c) => c.slug === purchase.courseSlug);
            return {
                slug: purchase.courseSlug,
                title: course?.title ?? purchase.courseTitle,
                tagline: course?.tagline ?? '',
                priceEUR: course?.priceEUR ?? Math.round((purchase.amountTotal ?? 0) / 100),
                pillarLabel: course?.pillarLabel ?? 'Cours Explor’Art',
                pillarSlug: course?.pillarSlug ?? 'dessin-peinture',
                durationMinutes: course?.durationMinutes ?? 0,
                modulesCount: course?.modulesCount ?? 3,
                purchasedAt: purchase.createdAt,
            };
        })
        .filter(Boolean);

    return NextResponse.json({ courses });
}

export async function POST(request: Request) {
    const authUser = await getAuthUser();

    if (!authUser) {
        return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const slug = body?.slug as string | undefined;

    const result = await saveCoursePurchase({ userId: authUser.userId, courseSlug: slug });

    if (result.status === 'invalid-course') {
        return NextResponse.json({ error: 'Cours introuvable.' }, { status: 404 });
    }

    if (result.status === 'error') {
        return NextResponse.json({ error: result.message }, { status: 500 });
    }

    if (result.status === 'saved') {
        return NextResponse.json({ message: 'Achat enregistré.', purchase: result.purchase });
    }

    return NextResponse.json({ message: 'Cours déjà associé à ton compte.' });
}
