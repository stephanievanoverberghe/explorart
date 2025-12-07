// src/components/courses/CheckoutButton.tsx
'use client';

import { useState } from 'react';

import type { Course } from '@/lib/content/courses';

interface CheckoutButtonProps {
    course: Course;
    label?: string;
    sublabel?: string;
    fullWidth?: boolean;
    variant?: 'primary' | 'ghost';
    size?: 'md' | 'lg';
}

export function CheckoutButton({ course, label = 'Acheter ce cours', fullWidth = false, variant = 'primary', size = 'md' }: CheckoutButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheckout = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug: course.slug }),
            });

            const data = await response.json();

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

    return (
        <div className="space-y-2">
            <button type="button" onClick={handleCheckout} className={baseClasses.join(' ')} disabled={isLoading}>
                {isLoading ? 'Redirection en cours…' : label}
                <span aria-hidden>↗</span>
            </button>
            {error && <p className="text-[0.8rem] text-red-600">{error}</p>}
        </div>
    );
}
