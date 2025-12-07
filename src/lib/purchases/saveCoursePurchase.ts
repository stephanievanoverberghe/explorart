// src/lib/purchases/saveCoursePurchase.ts
import { randomUUID } from 'crypto';
import { Types } from 'mongoose';

import { COURSES } from '@/lib/content/courses';
import { connectToDatabase } from '@/lib/db/connect';
import { Purchase, type PurchaseDocument } from '@/lib/models/Purchase';

export type SaveCoursePurchaseResult =
    | { status: 'invalid-course' }
    | { status: 'unauthenticated' }
    | { status: 'exists'; purchase: PurchaseDocument }
    | { status: 'saved'; purchase: PurchaseDocument }
    | { status: 'error'; message: string };

interface SaveCoursePurchaseOptions {
    userId?: string;
    courseSlug?: string;
}

export async function saveCoursePurchase(options: SaveCoursePurchaseOptions): Promise<SaveCoursePurchaseResult> {
    if (!options.userId) {
        return { status: 'unauthenticated' };
    }

    if (!options.courseSlug) {
        return { status: 'invalid-course' };
    }

    const course = COURSES.find((c) => c.slug === options.courseSlug);

    if (!course) {
        return { status: 'invalid-course' };
    }

    try {
        await connectToDatabase();

        const existingPurchase = await Purchase.findOne({ userId: options.userId, courseSlug: options.courseSlug });

        if (existingPurchase) {
            return { status: 'exists', purchase: existingPurchase };
        }

        const purchase = await Purchase.create({
            userId: new Types.ObjectId(options.userId),
            courseSlug: course.slug,
            courseTitle: course.title,
            amountTotal: Math.round(course.priceEUR * 100),
            currency: 'eur',
            stripeSessionId: `manual-${randomUUID()}`,
        });

        return { status: 'saved', purchase };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Erreur inconnue lors de la sauvegarde.';
        console.error('[SAVE_COURSE_PURCHASE_ERROR]', message, error);
        return { status: 'error', message };
    }
}
