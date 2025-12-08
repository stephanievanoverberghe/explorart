// src/app/api/users/me/formations/route.ts
import { NextResponse } from 'next/server';

import { FORMATIONS } from '@/lib/content/formations';
import { connectToDatabase } from '@/lib/db/connect';
import { getAuthUser } from '@/lib/auth/session';
import { FormationPurchase } from '@/lib/models/FormationPurchase';
import { saveFormationPurchase } from '@/lib/purchases/saveFormationPurchase';

export async function GET() {
    const authUser = await getAuthUser();

    if (!authUser) {
        return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
    }

    await connectToDatabase();

    const purchases = await FormationPurchase.find({ userId: authUser.userId }).sort({ createdAt: -1 }).lean();

    const formations = purchases
        .map((purchase) => {
            const formation = FORMATIONS.find((f) => f.slug === purchase.formationSlug);
            return {
                slug: purchase.formationSlug,
                title: formation?.title ?? purchase.formationTitle,
                tagline: formation?.tagline ?? '',
                priceEUR: formation?.priceEUR ?? Math.round((purchase.amountTotal ?? 0) / 100),
                pillarLabel: formation?.pillarLabel ?? 'Formation Explor’Art',
                pillarSlug: formation?.pillarSlug ?? 'dessin-peinture',
                modulesCount: formation?.modulesCount ?? 0,
                approximateHours: formation?.approximateHours ?? 0,
                purchasedAt: purchase.createdAt,
            };
        })
        .filter(Boolean);

    return NextResponse.json({ formations });
}

export async function POST(request: Request) {
    const authUser = await getAuthUser();

    if (!authUser) {
        return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const slug = body?.slug as string | undefined;

    const result = await saveFormationPurchase({ userId: authUser.userId, formationSlug: slug });

    if (result.status === 'invalid-formation') {
        return NextResponse.json({ error: 'Formation introuvable.' }, { status: 404 });
    }

    if (result.status === 'error') {
        return NextResponse.json({ error: result.message }, { status: 500 });
    }

    if (result.status === 'saved') {
        return NextResponse.json({ message: 'Achat enregistré.', purchase: result.purchase });
    }

    return NextResponse.json({ message: 'Formation déjà associée à ton compte.' });
}
