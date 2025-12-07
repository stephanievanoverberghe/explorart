// src/app/api/checkout/route.ts
import { NextResponse } from 'next/server';

import { COURSES } from '@/lib/content/courses';

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

    const stripeSecret = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecret) {
        return NextResponse.json({ error: 'Stripe n’est pas configuré. Ajoute STRIPE_SECRET_KEY.' }, { status: 500 });
    }

    const origin = request.headers.get('origin') ?? 'https://explorart.art';

    try {
        const body = new URLSearchParams({
            mode: 'payment',
            success_url: `${origin}/cours/${course.slug}?paiement=success`,
            cancel_url: `${origin}/cours/${course.slug}?paiement=cancel`,
            'payment_method_types[0]': 'card',
            'line_items[0][price_data][currency]': 'eur',
            'line_items[0][price_data][unit_amount]': Math.round(course.priceEUR * 100).toString(),
            'line_items[0][price_data][product_data][name]': course.title,
            'line_items[0][price_data][product_data][description]': course.tagline,
            'line_items[0][quantity]': '1',
            'metadata[course_slug]': course.slug,
            'metadata[course_title]': course.title,
        });

        const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${stripeSecret}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body,
        });

        const data = await response.json();

        if (!response.ok || !data?.url) {
            return NextResponse.json({ error: 'Stripe a renvoyé une erreur. Vérifie tes clés et ton compte.' }, { status: 500 });
        }

        return NextResponse.json({ url: data.url });
    } catch (error) {
        console.error('[STRIPE_CHECKOUT_ERROR]', error);
        return NextResponse.json({ error: 'Impossible de créer la session de paiement.' }, { status: 500 });
    }
}
