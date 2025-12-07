// src/app/api/stripe/webhook/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

import { COURSES } from '@/lib/content/courses';

// ⚠️ STRIPE_WEBHOOK_SECRET à définir dans .env.local + Vercel
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    // Ton type Stripe attend explicitement "2025-11-17.clover"
    apiVersion: '2025-11-17.clover',
});

export async function POST(req: Request) {
    const body = await req.text();

    // headers() est typé comme Promise<ReadonlyHeaders> chez toi → on await
    const headerList = await headers();
    const sig = headerList.get('stripe-signature');

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
        console.error('STRIPE_WEBHOOK_SECRET manquant');
        return NextResponse.json({ error: 'Webhook non configuré' }, { status: 500 });
    }

    let event: Stripe.Event;

    try {
        if (!sig) {
            throw new Error('Signature Stripe absente');
        }

        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Erreur inconnue';
        console.error('[STRIPE_WEBHOOK_ERROR]', message, err);
        return NextResponse.json({ error: `Erreur webhook : ${message}` }, { status: 400 });
    }

    // On se concentre sur checkout.session.completed
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        const courseSlug = session.metadata?.course_slug;
        const course = courseSlug ? COURSES.find((c) => c.slug === courseSlug) : undefined;

        // TODO: récupérer l'user ID/email via session.customer_details / metadata
        const customerEmail = session.customer_details?.email ?? session.customer_email ?? null;

        if (!course || !customerEmail) {
            console.warn('[WEBHOOK] Cours ou email manquant, impossible d’enregistrer l’achat.', {
                courseSlug,
                customerEmail,
            });
        } else {
            // TODO: brancher ta vraie persistance Mongo ici
            // await saveCoursePurchase({ email: customerEmail, courseSlug: course.slug, stripeSessionId: session.id });

            console.log('[WEBHOOK] Achat enregistré (à brancher en DB) :', {
                email: customerEmail,
                courseSlug: course.slug,
                stripeSessionId: session.id,
            });
        }
    }

    return NextResponse.json({ received: true }, { status: 200 });
}
