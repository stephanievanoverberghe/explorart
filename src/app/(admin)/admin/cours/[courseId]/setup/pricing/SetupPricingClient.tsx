// src/app/(admin)/admin/cours/[courseId]/setup/pricing/page.tsx
'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, CreditCard, BadgeEuro, Sparkles } from 'lucide-react';
import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';
import { savePricing } from '@/lib/actions/courseSetup';
import type { CoursePricingData, PricingModel } from '@/types/courseSetup';

interface SetupPricingClientProps {
    courseId: string;
    initialPricing: CoursePricingData;
}

export default function SetupPricingClient({ courseId, initialPricing }: SetupPricingClientProps) {
    const router = useRouter();

    const [pricingModel, setPricingModel] = useState<PricingModel>(initialPricing.pricingModel);
    const [price, setPrice] = useState(initialPricing.price);
    const [promoPrice, setPromoPrice] = useState(initialPricing.promoPrice);
    const [taxIncluded, setTaxIncluded] = useState(initialPricing.taxIncluded);
    const [submitting, setSubmitting] = useState(false);

    const summary = useMemo(() => {
        if (pricingModel === 'included') return 'Inclus dans l’abonnement';
        if (pricingModel === 'bundle') return 'Pack / collection';
        const promo = promoPrice.trim() ? ` (promo ${promoPrice}€)` : '';
        return `${price}€${promo} • ${taxIncluded ? 'TTC' : 'HT'}`;
    }, [pricingModel, price, promoPrice, taxIncluded]);

    async function handleNext() {
        if (submitting) return;
        setSubmitting(true);
        try {
            await savePricing(courseId, { pricingModel, price, promoPrice, taxIncluded });
            router.push(`/admin/cours/${courseId}/setup/resources`);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="space-y-6">
            <TopBar
                backHref={`/admin/cours/${courseId}/setup/access`}
                backLabel={
                    <span className="inline-flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Retour (accès)
                    </span>
                }
                right={
                    <div className="flex items-center gap-2">
                        <QuickLinks
                            items={[
                                { href: `/admin/cours/${courseId}`, label: 'HUB' },
                                { href: '/admin/cours', label: 'Cours' },
                            ]}
                        />
                        <Badge>Setup • Étape 4</Badge>
                    </div>
                }
            />

            <PageHeader
                label="Étape 4"
                title="Prix & offre"
                description="On positionne la valeur du cours. Étape suivante : préparer les ressources et supports téléchargeables."
            />

            <Card>
                <CardHeader title="Tarification" subtitle="Un prix clair, aligné avec la durée et les ressources." />

                <CardBody>
                    <div className="space-y-6">
                        <div className="grid gap-3 md:grid-cols-3">
                            <button
                                type="button"
                                onClick={() => setPricingModel('one_off')}
                                className={cx(
                                    'rounded-3xl border p-4 text-left transition cursor-pointer active:scale-[0.99]',
                                    pricingModel === 'one_off' ? 'border-main/40 bg-page/60 shadow-sm' : 'border-perl/60 bg-white hover:bg-page/40'
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-perl/60 bg-page/70">
                                        <CreditCard className="h-4 w-4 text-main" />
                                    </span>
                                    <div>
                                        <p className="font-serif-title text-base text-main">Achat unique</p>
                                        <p className="text-xs text-main/60">Parfait pour une masterclass vidéo.</p>
                                    </div>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setPricingModel('included')}
                                className={cx(
                                    'rounded-3xl border p-4 text-left transition cursor-pointer active:scale-[0.99]',
                                    pricingModel === 'included' ? 'border-main/40 bg-page/60 shadow-sm' : 'border-perl/60 bg-white hover:bg-page/40'
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-perl/60 bg-page/70">
                                        <Sparkles className="h-4 w-4 text-main" />
                                    </span>
                                    <div>
                                        <p className="font-serif-title text-base text-main">Inclus abonnement</p>
                                        <p className="text-xs text-main/60">Accès via plan premium.</p>
                                    </div>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setPricingModel('bundle')}
                                className={cx(
                                    'rounded-3xl border p-4 text-left transition cursor-pointer active:scale-[0.99]',
                                    pricingModel === 'bundle' ? 'border-main/40 bg-page/60 shadow-sm' : 'border-perl/60 bg-white hover:bg-page/40'
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-perl/60 bg-page/70">
                                        <BadgeEuro className="h-4 w-4 text-main" />
                                    </span>
                                    <div>
                                        <p className="font-serif-title text-base text-main">Pack de cours</p>
                                        <p className="text-xs text-main/60">Idéal pour des bundles thématiques.</p>
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-3xl border border-perl/60 bg-white p-4 sm:p-5 space-y-3">
                                <p className="text-xs uppercase tracking-[0.18em] text-main/50">Prix</p>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <label className="space-y-2">
                                        <span className="text-xs font-semibold text-main/75">Prix principal (€)</span>
                                        <input
                                            type="number"
                                            min={0}
                                            value={price}
                                            onChange={(e) => setPrice(Number(e.target.value))}
                                            disabled={pricingModel !== 'one_off'}
                                            className={cx(
                                                'h-12 w-full rounded-2xl border px-4 text-sm font-semibold outline-none transition',
                                                pricingModel !== 'one_off'
                                                    ? 'border-perl/50 bg-page text-main/40 cursor-not-allowed'
                                                    : 'border-perl/70 bg-white text-main/80 hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10'
                                            )}
                                        />
                                    </label>

                                    <label className="space-y-2">
                                        <span className="text-xs font-semibold text-main/75">Prix promo (€)</span>
                                        <input
                                            value={promoPrice}
                                            onChange={(e) => setPromoPrice(e.target.value)}
                                            disabled={pricingModel !== 'one_off'}
                                            placeholder="Optionnel"
                                            className={cx(
                                                'h-12 w-full rounded-2xl border px-4 text-sm font-semibold outline-none transition',
                                                pricingModel !== 'one_off'
                                                    ? 'border-perl/50 bg-page text-main/40 cursor-not-allowed'
                                                    : 'border-perl/70 bg-white text-main/80 hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10'
                                            )}
                                        />
                                    </label>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setTaxIncluded(true)}
                                        className={cx(
                                            'rounded-full border px-3 py-2 text-xs font-semibold transition cursor-pointer',
                                            taxIncluded ? 'border-sage/50 bg-sage/10 text-sage' : 'border-perl/70 bg-white text-main/70 hover:bg-page'
                                        )}
                                    >
                                        Prix TTC
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTaxIncluded(false)}
                                        className={cx(
                                            'rounded-full border px-3 py-2 text-xs font-semibold transition cursor-pointer',
                                            !taxIncluded ? 'border-main/40 bg-main/5 text-main' : 'border-perl/70 bg-white text-main/70 hover:bg-page'
                                        )}
                                    >
                                        Prix HT
                                    </button>
                                </div>

                                <p className="text-xs text-main/55">Astuce : les cours vidéo d’art avec ressources se vendent mieux avec un prix simple + bonus.</p>
                            </div>

                            <div className="rounded-3xl border border-perl/60 bg-page/40 p-4 sm:p-5 space-y-3">
                                <p className="text-xs uppercase tracking-[0.18em] text-main/55">Résumé</p>
                                <p className="text-sm text-main">
                                    <span className="font-semibold">{summary}</span>
                                    <span className="text-main/60"> • ajustable plus tard dans les réglages.</span>
                                </p>
                                <p className="text-xs text-main/55">
                                    Étape suivante : <span className="font-semibold text-main">ressources & vidéos</span>.
                                </p>
                            </div>
                        </div>

                        <div className="pt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <Link
                                href={`/admin/cours/${courseId}/setup/access`}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-5 py-2 text-sm font-semibold text-main/80 hover:bg-page transition cursor-pointer"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Retour (accès)
                            </Link>

                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={submitting}
                                className={cx(
                                    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition active:scale-[0.99]',
                                    submitting
                                        ? 'border border-perl/60 bg-page text-main/40 cursor-not-allowed'
                                        : 'bg-main text-white cursor-pointer hover:bg-main/90 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-main/15'
                                )}
                            >
                                Continuer (ressources)
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
