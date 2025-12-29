// src/app/api/checkout/route.ts
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { COURSES } from '@/lib/content/courses';
import { FORMATIONS } from '@/lib/content/formations';
import { getAuthUser } from '@/lib/auth/session';
import { connectToDatabase } from '@/lib/db/connect';
import { CoursePurchase } from '@/lib/models/CoursePurchase';
import { FormationPurchase } from '@/lib/models/FormationPurchase';
import { cookies } from 'next/headers';
import { validateCsrf } from '@/lib/security/csrf';

const stripeSecret = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecret
    ? new Stripe(stripeSecret, {
          apiVersion: '2025-11-17.clover',
      })
    : null;

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const isValidCsrf = validateCsrf(cookieStore, request);

    if (!isValidCsrf) {
        return NextResponse.json({ error: 'Jeton CSRF manquant ou invalide.' }, { status: 403 });
    }

    const body = await request.json().catch(() => null);
    const slug = body?.slug as string | undefined;
    const productType = body?.productType === 'formation' ? 'formation' : 'course';

    const authUser = await getAuthUser();

    if (!authUser) {
        return NextResponse.json({ error: `Connecte-toi pour acheter ${productType === 'formation' ? 'une formation' : 'un cours'}.` }, { status: 401 });
    }

    if (!slug) {
        return NextResponse.json({ error: 'Produit manquant' }, { status: 400 });
    }

    const catalogue = productType === 'formation' ? FORMATIONS : COURSES;
    const product = catalogue.find((item) => item.slug === slug);

    if (!product) {
        return NextResponse.json({ error: 'Produit introuvable.' }, { status: 404 });
    }

    if (productType === 'course' && ('isMini' in product ? product.isMini : false)) {
        return NextResponse.json({ error: 'Ce cours ne peut pas être acheté.' }, { status: 400 });
    }

    if (product.priceEUR <= 0) {
        return NextResponse.json({ error: 'Ce produit ne peut pas être acheté.' }, { status: 400 });
    }

    if (!stripe) {
        return NextResponse.json({ error: 'Stripe n’est pas configuré. Ajoute STRIPE_SECRET_KEY.' }, { status: 500 });
    }

    await connectToDatabase();

    if (productType === 'course') {
        const existingPurchase = await CoursePurchase.findOne({ userId: authUser.userId, courseSlug: product.slug });

        if (existingPurchase) {
            return NextResponse.json({ error: 'Tu as déjà débloqué ce cours.' }, { status: 400 });
        }
    } else {
        const existingPurchase = await FormationPurchase.findOne({ userId: authUser.userId, formationSlug: product.slug });

        if (existingPurchase) {
            return NextResponse.json({ error: 'Tu as déjà débloqué cette formation.' }, { status: 400 });
        }
    }

    const origin = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'https://explorart.art';

    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            customer_email: authUser.email,
            success_url: productType === 'formation' ? `${origin}/paiement/success?formation=${product.slug}` : `${origin}/paiement/success?course=${product.slug}`,
            cancel_url: productType === 'formation' ? `${origin}/paiement/cancel?formation=${product.slug}` : `${origin}/paiement/cancel?course=${product.slug}`,
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        unit_amount: Math.round(product.priceEUR * 100),
                        product_data: {
                            name: product.title,
                            description: product.tagline,
                        },
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                user_id: authUser.userId,
                user_email: authUser.email,
                ...(productType === 'formation' ? { formation_slug: product.slug, formation_title: product.title } : { course_slug: product.slug, course_title: product.title }),
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
