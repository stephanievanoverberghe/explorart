// src/app/api/stripe/webhook/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import Stripe from 'stripe';
import { Types } from 'mongoose';

import { connectToDatabase } from '@/lib/db/connect';
import { Purchase } from '@/lib/models/Purchase';
import { COURSES } from '@/lib/content/courses';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = stripeSecret
    ? new Stripe(stripeSecret, {
          apiVersion: '2024-06-20',
      })
    : null;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    if (!stripe || !webhookSecret) {
        return NextResponse.json({ error: 'Stripe n’est pas configuré.' }, { status: 500 });
    }

    const signature = request.headers.get('stripe-signature');

    if (!signature) {
        return NextResponse.json({ error: 'Signature Stripe manquante.' }, { status: 400 });
    }

    const body = await request.text();

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Erreur de vérification du webhook';
        console.error('[STRIPE_WEBHOOK_ERROR]', message, error);
        return NextResponse.json({ error: message }, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (!session?.metadata?.course_slug || !session.metadata.user_id) {
        return NextResponse.json({ error: 'Webhook incomplet : informations manquantes.' }, { status: 400 });
    }

    if (!Types.ObjectId.isValid(session.metadata.user_id)) {
        return NextResponse.json({ error: 'Identifiant utilisateur invalide.' }, { status: 400 });
    }

    const isPaymentComplete = event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded';

    if (!isPaymentComplete || session.payment_status !== 'paid') {
        return NextResponse.json({ received: true });
    }

    try {
        await connectToDatabase();

        const courseSlug = session.metadata.course_slug;
        const course = COURSES.find((c) => c.slug === courseSlug);

        const purchasePayload = {
            userId: new Types.ObjectId(session.metadata.user_id),
            courseSlug,
            courseTitle: session.metadata.course_title ?? course?.title ?? courseSlug,
            amountTotal: session.amount_total ?? 0,
            currency: session.currency ?? 'eur',
            stripeSessionId: session.id,
            stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : undefined,
        };

        await Purchase.findOneAndUpdate({ userId: purchasePayload.userId, courseSlug: purchasePayload.courseSlug }, purchasePayload, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
        });

        return NextResponse.json({ received: true });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Erreur lors de la sauvegarde du paiement.';
        console.error('[STRIPE_WEBHOOK_SAVE_ERROR]', message, error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
