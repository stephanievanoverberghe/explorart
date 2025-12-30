// src/app/(admin)/admin/cours/[courseId]/setup/access/page.tsx
'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, LockOpen, Lock, CreditCard, Info } from 'lucide-react';
import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';

type Access = 'free' | 'premium';

function OptionCard({ active, title, desc, icon, onClick, badge }: { active: boolean; title: string; desc: string; icon: React.ReactNode; onClick: () => void; badge?: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cx(
                'w-full text-left rounded-3xl border p-4 sm:p-5 transition',
                'cursor-pointer active:scale-[0.99]',
                active ? 'border-main/40 bg-page/60 shadow-sm' : 'border-perl/60 bg-white hover:bg-page/40'
            )}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                        <span
                            className={cx('inline-flex h-9 w-9 items-center justify-center rounded-2xl border', active ? 'border-main/30 bg-white' : 'border-perl/60 bg-page/60')}
                        >
                            {icon}
                        </span>
                        <p className="font-serif-title text-lg text-main">{title}</p>
                        {badge ? <span className="rounded-full border border-perl/60 bg-white px-3 py-1 text-[11px] font-semibold text-main/70">{badge}</span> : null}
                    </div>
                    <p className="text-sm text-main/65">{desc}</p>
                </div>

                <span
                    className={cx(
                        'mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border',
                        active ? 'border-main bg-main text-white' : 'border-perl/60 bg-white'
                    )}
                    aria-hidden
                >
                    <span className={cx('h-2 w-2 rounded-full', active ? 'bg-white' : 'bg-transparent')} />
                </span>
            </div>
        </button>
    );
}

export default function SetupAccessPage() {
    const router = useRouter();
    const params = useParams<{ courseId: string }>();
    const courseId = params.courseId;

    const [access, setAccess] = useState<Access>('free');
    const [hasFreePreview, setHasFreePreview] = useState(true);
    const [requiresAccount, setRequiresAccount] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const summary = useMemo(() => {
        const parts = [
            access === 'free' ? 'Accès gratuit' : 'Accès premium',
            access === 'premium' && hasFreePreview ? 'aperçu gratuit activé' : null,
            requiresAccount ? 'compte requis' : null,
        ].filter(Boolean);
        return parts.join(' • ');
    }, [access, hasFreePreview, requiresAccount]);

    async function handleNext() {
        if (submitting) return;
        setSubmitting(true);
        try {
            // TODO: saveAccess(...)
            router.push(`/admin/cours/${courseId}/setup/publish`);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="space-y-6">
            <TopBar
                backHref={`/admin/cours/${courseId}/setup/structure`}
                backLabel={
                    <span className="inline-flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Retour (structure)
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
                        <Badge>Setup • Étape 3</Badge>
                    </div>
                }
            />

            <PageHeader
                label="Étape 3"
                title="Accès & monétisation"
                description={
                    <>
                        On définit qui peut accéder au cours. Ensuite : <span className="font-semibold text-main">publication</span>.
                    </>
                }
            />

            <Card>
                <CardHeader title="Choix d’accès" subtitle="Gratuit ou premium — options simples (tu affineras plus tard)." />

                <CardBody>
                    <div className="space-y-6">
                        <div className="grid gap-3 md:grid-cols-2">
                            <OptionCard
                                active={access === 'free'}
                                title="Gratuit"
                                desc="Accessible à tous. Idéal pour le parcours d’entrée et les cours de découverte."
                                icon={<LockOpen className="h-5 w-5 text-main" />}
                                onClick={() => setAccess('free')}
                                badge="Recommandé pour “Commencer ici”"
                            />
                            <OptionCard
                                active={access === 'premium'}
                                title="Premium"
                                desc="Réservé aux membres / achats. Parfait pour des cours structurés et approfondis."
                                icon={<Lock className="h-5 w-5 text-main" />}
                                onClick={() => setAccess('premium')}
                                badge="Monétisable"
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-3xl border border-perl/60 bg-page/40 p-4 sm:p-5 space-y-3">
                                <p className="text-xs uppercase tracking-[0.18em] text-main/55">Options</p>

                                <div className="space-y-2">
                                    <button
                                        type="button"
                                        onClick={() => setHasFreePreview((v) => !v)}
                                        disabled={access !== 'premium'}
                                        className={cx(
                                            'w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition text-left active:scale-[0.99]',
                                            access !== 'premium'
                                                ? 'border-perl/50 bg-white text-main/40 cursor-not-allowed'
                                                : hasFreePreview
                                                ? 'border-sage/50 bg-sage/10 text-sage cursor-pointer'
                                                : 'border-perl/70 bg-white text-main/70 hover:bg-page cursor-pointer'
                                        )}
                                    >
                                        <span className="inline-flex items-center gap-2">
                                            <CreditCard className="h-4 w-4" />
                                            Aperçu gratuit (intro / 1er module)
                                        </span>
                                        <p className="mt-1 text-xs font-normal text-main/55">Disponible seulement si le cours est premium.</p>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setRequiresAccount((v) => !v)}
                                        className={cx(
                                            'w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition text-left cursor-pointer active:scale-[0.99]',
                                            requiresAccount ? 'border-sage/50 bg-sage/10 text-sage' : 'border-perl/70 bg-white text-main/70 hover:bg-page'
                                        )}
                                    >
                                        <span className="inline-flex items-center gap-2">
                                            <Info className="h-4 w-4" />
                                            Compte requis pour suivre le cours
                                        </span>
                                        <p className="mt-1 text-xs font-normal text-main/55">Utile pour suivre la progression et la communauté.</p>
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-perl/60 bg-white p-4 sm:p-5 space-y-2">
                                <p className="text-xs uppercase tracking-[0.18em] text-main/50">Résumé</p>
                                <p className="text-sm text-main">
                                    <span className="font-semibold">{summary || '—'}</span>
                                    <span className="text-main/60"> • Affinage possible plus tard dans les réglages.</span>
                                </p>
                                <p className="text-xs text-main/55">
                                    Étape suivante : <span className="font-semibold text-main">publication</span>.
                                </p>
                            </div>
                        </div>

                        <div className="pt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <Link
                                href={`/admin/cours/${courseId}/setup/structure`}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-5 py-2 text-sm font-semibold text-main/80 hover:bg-page transition cursor-pointer"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Retour (structure)
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
                                Continuer (publication)
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
