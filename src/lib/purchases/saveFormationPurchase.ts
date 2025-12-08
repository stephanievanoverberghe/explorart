// src/lib/purchases/saveFormationPurchase.ts
import { randomUUID } from 'crypto';
import { Types } from 'mongoose';

import { FORMATIONS } from '@/lib/content/formations';
import { connectToDatabase } from '@/lib/db/connect';
import { FormationPurchase, type FormationPurchaseDocument } from '@/lib/models/FormationPurchase';

export type SaveFormationPurchaseResult =
    | { status: 'invalid-formation' }
    | { status: 'unauthenticated' }
    | { status: 'exists'; purchase: FormationPurchaseDocument }
    | { status: 'saved'; purchase: FormationPurchaseDocument }
    | { status: 'error'; message: string };

interface SaveFormationPurchaseOptions {
    userId?: string;
    formationSlug?: string;
}

export async function saveFormationPurchase(options: SaveFormationPurchaseOptions): Promise<SaveFormationPurchaseResult> {
    if (!options.userId) {
        return { status: 'unauthenticated' };
    }

    if (!options.formationSlug) {
        return { status: 'invalid-formation' };
    }

    const formation = FORMATIONS.find((f) => f.slug === options.formationSlug);

    if (!formation) {
        return { status: 'invalid-formation' };
    }

    try {
        await connectToDatabase();

        const existingPurchase = await FormationPurchase.findOne({
            userId: options.userId,
            formationSlug: options.formationSlug,
        });

        if (existingPurchase) {
            return { status: 'exists', purchase: existingPurchase };
        }

        const purchase = await FormationPurchase.create({
            userId: new Types.ObjectId(options.userId),
            formationSlug: formation.slug,
            formationTitle: formation.title,
            amountTotal: Math.round(formation.priceEUR * 100),
            currency: 'eur',
            stripeSessionId: `manual-${randomUUID()}`,
        });

        return { status: 'saved', purchase };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Erreur inconnue lors de la sauvegarde.';
        console.error('[SAVE_FORMATION_PURCHASE_ERROR]', message, error);
        return { status: 'error', message };
    }
}
