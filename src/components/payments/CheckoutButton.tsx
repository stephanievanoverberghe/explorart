// src/components/payments/CheckoutButton.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

import type { Course } from '@/lib/content/courses';
import type { Formation } from '@/lib/content/formations';
import { CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from '@/lib/security/csrf';

function getCsrfTokenFromCookie() {
    return document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith(`${CSRF_COOKIE_NAME}=`))
        ?.split('=')[1];
}

type ProductType = 'course' | 'formation';

type Purchasable = Pick<Course, 'slug' | 'title'> | Pick<Formation, 'slug' | 'title'>;

interface CheckoutButtonProps {
    product: Purchasable;
    productType?: ProductType;
    label?: string;
    sublabel?: string;
    fullWidth?: boolean;
    variant?: 'primary' | 'ghost';
    size?: 'md' | 'lg';
}

const defaultLabels: Record<ProductType, string> = {
    course: 'Acheter ce cours',
    formation: 'Acheter cette formation',
};

const purchasedLabels: Record<ProductType, string> = {
    course: 'Cours déjà acheté',
    formation: 'Formation déjà achetée',
};

export function CheckoutButton({ product, productType = 'course', label, sublabel, fullWidth = false, variant = 'primary', size = 'md' }: CheckoutButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [purchaseStatus, setPurchaseStatus] = useState<'unknown' | 'purchased' | 'not-purchased' | 'error'>('unknown');
    const pathname = usePathname();

    useEffect(() => {
        let isMounted = true;

        async function fetchPurchases() {
            try {
                const endpoint = productType === 'formation' ? '/api/users/me/formations' : '/api/users/me/courses';
                const response = await fetch(endpoint, { cache: 'no-store' });

                if (response.status === 401) {
                    if (isMounted) {
                        setPurchaseStatus('not-purchased');
                    }
                    return;
                }

                if (!response.ok) {
                    throw new Error('Impossible de vérifier tes achats.');
                }

                const data = await response.json();
                const list = (productType === 'formation' ? data.formations : data.courses) as { slug: string }[];

                if (isMounted) {
                    setPurchaseStatus(list?.some((item) => item.slug === product.slug) ? 'purchased' : 'not-purchased');
                }
            } catch (err) {
                console.error(err);
                if (isMounted) {
                    setPurchaseStatus('error');
                }
            }
        }

        void fetchPurchases();

        return () => {
            isMounted = false;
        };
    }, [product.slug, productType]);

    const handleCheckout = async () => {
        if (purchaseStatus === 'purchased') {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const csrfToken = getCsrfTokenFromCookie();
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(csrfToken ? { [CSRF_HEADER_NAME]: decodeURIComponent(csrfToken) } : {}),
                },
                body: JSON.stringify({ slug: product.slug, productType }),
            });

            const data = await response.json();

            if (response.status === 401) {
                const loginUrl = new URL('/connexion', window.location.origin);
                loginUrl.searchParams.set('redirect', pathname ?? '/');

                setIsLoading(false);
                window.location.href = loginUrl.toString();
                return;
            }

            if (response.status === 400 && typeof data?.error === 'string' && data.error.includes('déjà')) {
                setPurchaseStatus('purchased');
                setIsLoading(false);
                return;
            }

            if (!response.ok || !data?.url) {
                const message = data?.error ?? 'Impossible de démarrer le paiement Stripe pour le moment.';
                setError(message);
                setIsLoading(false);
                return;
            }

            window.location.href = data.url as string;
        } catch (err) {
            console.error(err);
            setError('Une erreur est survenue. Réessaie dans quelques instants.');
            setIsLoading(false);
        }
    };

    const baseClasses = [
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors shadow-sm',
        fullWidth ? 'w-full' : 'w-fit',
        size === 'lg' ? 'px-5 py-3 text-base' : 'px-4 py-2.5 text-sm',
    ];

    if (variant === 'primary') {
        baseClasses.push('bg-main text-ivory hover:bg-main/90');
    } else {
        baseClasses.push('bg-white text-main border border-perl/70 hover:bg-background');
    }

    if (purchaseStatus === 'purchased') {
        baseClasses.push('bg-sage text-ivory hover:bg-sage/95 cursor-default');
    }

    const buttonLabel = useMemo(() => {
        if (purchaseStatus === 'purchased') {
            return purchasedLabels[productType];
        }

        if (isLoading) {
            return 'Redirection en cours…';
        }

        return label ?? defaultLabels[productType];
    }, [isLoading, label, productType, purchaseStatus]);

    return (
        <div className="space-y-2">
            <button type="button" onClick={handleCheckout} className={baseClasses.join(' ')} disabled={isLoading || purchaseStatus === 'purchased'}>
                {purchaseStatus === 'purchased' ? <CheckCircle2 className="h-4 w-4" /> : null}
                {buttonLabel}
                {purchaseStatus !== 'purchased' && <span aria-hidden>↗</span>}
            </button>
            {sublabel && <p className="text-[0.82rem] text-main/70">{sublabel}</p>}
            {error && purchaseStatus !== 'purchased' && (
                <p className="text-[0.8rem] text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
