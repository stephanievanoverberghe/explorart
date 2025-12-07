// src/app/api/checkout/route.ts
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { COURSES } from '@/lib/content/courses';

const stripeSecret = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecret
    ? new Stripe(stripeSecret, {
          apiVersion: '2025-11-17.clover',
      })
    : null;

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    const slug = body?.slug as string | undefined;

    if (!slug) {
        return NextResponse.json({ error: 'Cours manquant' }, { status: 400 });
    }

    const course = COURSES.find((c) => c.slug === slug);

    if (!course || course.priceEUR <= 0 || course.isMini) {
        return NextResponse.json({ error: 'Ce cours ne peut pas être acheté.' }, { status: 400 });
    }

    if (!stripe) {
        return NextResponse.json({ error: 'Stripe n’est pas configuré. Ajoute STRIPE_SECRET_KEY.' }, { status: 500 });
    }

    const origin = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'https://explorart.art';

    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            success_url: `${origin}/paiement/success?course=${course.slug}`,
            cancel_url: `${origin}/paiement/cancel?course=${course.slug}`,
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        unit_amount: Math.round(course.priceEUR * 100),
                        product_data: {
                            name: course.title,
                            description: course.tagline,
                        },
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                course_slug: course.slug,
                course_title: course.title,
            },
        });

        if (!session.url) {
            return NextResponse.json({ error: 'Stripe a renvoyé une erreur. Vérifie tes clés et ton compte.' }, { status: 500 });
        }

        return NextResponse.json({ url: session.url });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Erreur inconnue';
        console.error('[STRIPE_CHECKOUT_ERROR]', message, error);
        return NextResponse.json({ error: 'Impossible de créer la session de paiement.' }, { status: 500 });
    }
}
