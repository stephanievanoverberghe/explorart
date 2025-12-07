// src/app/api/users/me/courses/route.ts
import { NextResponse } from 'next/server';

import { COURSES } from '@/lib/content/courses';
import { connectToDatabase } from '@/lib/db/connect';
import { getAuthUser } from '@/lib/auth/session';
import { Purchase } from '@/lib/models/Purchase';

export async function GET() {
    const authUser = await getAuthUser();

    if (!authUser) {
        return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
    }

    await connectToDatabase();

    const purchases = await Purchase.find({ userId: authUser.userId }).sort({ createdAt: -1 }).lean();

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
