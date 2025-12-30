// src/app/(admin)/admin/cours/[courseId]/setup/publish/page.tsx
'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Eye, EyeOff, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';
import { savePublish } from '@/lib/actions/courseSetup';
import type { CoursePublishData, PublishStatus } from '@/types/courseSetup';

function OptionCard({ active, title, desc, icon, badge, onClick }: { active: boolean; title: string; desc: string; icon: React.ReactNode; badge?: string; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cx(
                'w-full text-left rounded-3xl border p-4 sm:p-5 transition cursor-pointer active:scale-[0.99]',
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

function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
    return <span className={cx('rounded-full border px-3 py-1 text-[11px] font-semibold', className)}>{children}</span>;
}

interface SetupPublishClientProps {
    courseId: string;
    initialPublish: CoursePublishData;
}

export default function SetupPublishClient({ courseId, initialPublish }: SetupPublishClientProps) {
    const router = useRouter();

    const [status, setStatus] = useState<PublishStatus>(initialPublish.status);
    const [listed, setListed] = useState(initialPublish.listed);
    const [submitting, setSubmitting] = useState(false);

    const summary = useMemo(() => {
        const a = status === 'published' ? 'Publié' : 'Brouillon';
        const b = status === 'published' ? (listed ? 'visible' : 'non listé') : 'non visible';
        return `${a} • ${b}`;
    }, [status, listed]);

    async function handleFinish() {
        if (submitting) return;
        setSubmitting(true);
        try {
            await savePublish(courseId, { status, listed });
            router.push(`/admin/cours/${courseId}/editor/intro`);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="space-y-6">
            <TopBar
                backHref={`/admin/cours/${courseId}/setup/resources`}
                backLabel={
                    <span className="inline-flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Retour (ressources)
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
                        <Badge>Setup • Étape 6</Badge>
                    </div>
                }
            />

            <PageHeader
                label="Étape 6"
                title="Publication"
                description={
                    <>
                        On fixe l’état du cours. Ensuite : <span className="font-semibold text-main">éditeur</span> (intro → modules → conclusion → review).
                    </>
                }
            />

            <Card>
                <CardHeader title="État & visibilité" subtitle="Tu peux garder en brouillon et publier plus tard." />

                <CardBody>
                    <div className="space-y-6">
                        <div className="grid gap-3 md:grid-cols-2">
                            <OptionCard
                                active={status === 'draft'}
                                title="Brouillon"
                                desc="Idéal pour construire tranquillement. Non visible côté public."
                                icon={<FileText className="h-5 w-5 text-main" />}
                                badge="Recommandé"
                                onClick={() => setStatus('draft')}
                            />

                            <OptionCard
                                active={status === 'published'}
                                title="Publié"
                                desc="Visible côté public (selon la visibilité). Tu peux republier à tout moment."
                                icon={<CheckCircle2 className="h-5 w-5 text-main" />}
                                onClick={() => setStatus('published')}
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-3xl border border-perl/60 bg-page/40 p-4 sm:p-5 space-y-3">
                                <p className="text-xs uppercase tracking-[0.18em] text-main/55">Visibilité</p>
                                <p className="text-xs text-main/60">“Non listé” = accessible via lien direct, mais pas dans les listes.</p>

                                <div className="space-y-2">
                                    <button
                                        type="button"
                                        onClick={() => setListed(true)}
                                        disabled={status !== 'published'}
                                        className={cx(
                                            'w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition text-left active:scale-[0.99]',
                                            status !== 'published'
                                                ? 'border-perl/50 bg-white text-main/40 cursor-not-allowed'
                                                : listed
                                                ? 'border-sage/50 bg-sage/10 text-sage cursor-pointer'
                                                : 'border-perl/70 bg-white text-main/70 hover:bg-page cursor-pointer'
                                        )}
                                    >
                                        <span className="inline-flex items-center gap-2">
                                            <Eye className="h-4 w-4" />
                                            Visible (listé)
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setListed(false)}
                                        disabled={status !== 'published'}
                                        className={cx(
                                            'w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition text-left active:scale-[0.99]',
                                            status !== 'published'
                                                ? 'border-perl/50 bg-white text-main/40 cursor-not-allowed'
                                                : !listed
                                                ? 'border-main/40 bg-main/5 text-main cursor-pointer'
                                                : 'border-perl/70 bg-white text-main/70 hover:bg-page cursor-pointer'
                                        )}
                                    >
                                        <span className="inline-flex items-center gap-2">
                                            <EyeOff className="h-4 w-4" />
                                            Non listé (lien direct)
                                        </span>
                                    </button>
                                </div>

                                <p className="text-xs text-main/55">
                                    Option dispo seulement si le cours est <span className="font-semibold text-main">Publié</span>.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-perl/60 bg-white p-4 sm:p-5 space-y-3">
                                <p className="text-xs uppercase tracking-[0.18em] text-main/50">Résumé</p>

                                <div className="flex flex-wrap items-center gap-2">
                                    <Pill className="border-perl/60 bg-page/60 text-main/70">{summary}</Pill>
                                    {status === 'draft' ? (
                                        <Pill className="border-perl/60 bg-white text-main/60">Tu peux construire sans pression</Pill>
                                    ) : (
                                        <Pill className="border-sage/40 bg-sage/10 text-sage">Prêt à être vu</Pill>
                                    )}
                                </div>

                                <div className="rounded-2xl border border-perl/60 bg-page/50 p-4">
                                    <p className="text-sm font-semibold text-main flex items-center gap-2">
                                        <Sparkles className="h-4 w-4" />
                                        Après cette étape
                                    </p>
                                    <p className="mt-1 text-sm text-main/65">
                                        Tu bascules dans l’éditeur : <span className="font-semibold text-main">Intro</span> → Modules → Conclusion → Review.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <Link
                                href={`/admin/cours/${courseId}/setup/resources`}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-5 py-2 text-sm font-semibold text-main/80 hover:bg-page transition cursor-pointer"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Retour (ressources)
                            </Link>

                            <button
                                type="button"
                                onClick={handleFinish}
                                disabled={submitting}
                                className={cx(
                                    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition active:scale-[0.99]',
                                    submitting
                                        ? 'border border-perl/60 bg-page text-main/40 cursor-not-allowed'
                                        : 'bg-main text-white cursor-pointer hover:bg-main/90 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-main/15'
                                )}
                            >
                                Passer à l’éditeur (intro)
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
