'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight, Eye, EyeOff, Sparkles, X } from 'lucide-react';
import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';
import { CourseWizardFooter } from '@/components/admin/courses/CourseWizardFooter';
import { publishCourse, unpublishCourse, updateCourseListing } from '@/lib/actions/courseAdmin';
import type { CourseStatus } from '@/lib/models/Course';
import type { PublishChecklistItem, PublishChecklistResult } from '@/lib/utils/coursePublishValidation';

function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
    return <span className={cx('rounded-full border px-3 py-1 text-[11px] font-semibold', className)}>{children}</span>;
}

function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: React.ReactNode; onClose: () => void }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="w-full max-w-lg rounded-3xl border border-perl/60 bg-white shadow-xl overflow-hidden">
                    <div className="flex items-center justify-between gap-3 border-b border-perl/50 bg-page/50 px-5 py-4">
                        <div className="min-w-0">
                            <p className="text-xs uppercase tracking-[0.18em] text-main/55">Confirmation</p>
                            <p className="mt-1 font-serif-title text-lg text-main">{title}</p>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex items-center justify-center rounded-2xl border border-perl/60 bg-white p-2 text-main/70 hover:bg-page transition cursor-pointer"
                            aria-label="Fermer"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="p-5">{children}</div>
                </div>
            </div>
        </div>
    );
}

interface EditorPublishClientProps {
    courseId: string;
    checklist: PublishChecklistResult;
    slug: string;
    status: CourseStatus;
    listed: boolean;
}

export default function EditorPublishClient({ courseId, checklist: initialChecklist, slug, status: initialStatus, listed: initialListed }: EditorPublishClientProps) {
    const router = useRouter();

    const [status, setStatus] = useState<CourseStatus>(initialStatus);
    const [listed, setListed] = useState(initialListed);
    const [checklist, setChecklist] = useState(initialChecklist);
    const [submitting, setSubmitting] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [missing, setMissing] = useState<PublishChecklistItem[]>([]);

    const previewHref = status === 'published' ? `/cours/${slug}` : `/admin/cours/${courseId}/editor/review`;

    const summary = useMemo(() => {
        const state = status === 'published' ? 'Publié' : status === 'archived' ? 'Archivé' : 'Brouillon';
        const visibility = status === 'published' ? (listed ? 'visible' : 'non listé') : 'non visible';
        return `${state} • ${visibility}`;
    }, [listed, status]);

    async function saveListing() {
        if (submitting) return;
        setSubmitting(true);
        try {
            await updateCourseListing(courseId, listed);
        } finally {
            setSubmitting(false);
        }
    }

    async function confirmAndPublish() {
        if (submitting) return;
        setSubmitting(true);
        setError(null);
        setMissing([]);

        try {
            await updateCourseListing(courseId, listed);
            const res = await publishCourse(courseId);
            setChecklist(res.checklist);

            if (!res.ok) {
                setError('Publication bloquée : certains éléments manquent encore.');
                setMissing(res.checklist.items.filter((item) => item.status === 'missing'));
                return;
            }

            setStatus('published');
            setConfirmOpen(false);
            router.push(`/admin/cours/${courseId}`);
        } finally {
            setSubmitting(false);
        }
    }

    async function handleUnpublish() {
        if (submitting) return;
        setSubmitting(true);
        try {
            await unpublishCourse(courseId);
            setStatus('draft');
            setListed(false);
            router.push(`/admin/cours/${courseId}`);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="space-y-6">
            <TopBar
                backHref={`/admin/cours/${courseId}/editor/review`}
                backLabel={
                    <span className="inline-flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Retour (review)
                    </span>
                }
                right={
                    <div className="flex items-center gap-2">
                        <QuickLinks
                            items={[
                                { href: `/admin/cours/${courseId}`, label: 'HUB' },
                                { href: '/admin/cours', label: 'Cours' },
                                { href: previewHref, label: 'Prévisualiser' },
                            ]}
                        />
                        <Badge>Publication</Badge>
                    </div>
                }
            />

            <PageHeader label="Étape finale" title="Publication" description="Dernier check : on s’assure que tout est prêt, puis on publie le cours." />

            <Card>
                <CardHeader title="Visibilité & état" subtitle="Gère la visibilité publique et le statut du cours." />
                <CardBody className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-3xl border border-perl/60 bg-page/40 p-4 sm:p-5 space-y-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-main/55">Visibilité</p>
                            <p className="text-xs text-main/60">“Non listé” = accessible via lien direct, mais pas dans les listes.</p>

                            <div className="space-y-2">
                                <button
                                    type="button"
                                    onClick={() => setListed(true)}
                                    className={cx(
                                        'w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition text-left active:scale-[0.99]',
                                        listed ? 'border-sage/50 bg-sage/10 text-sage cursor-pointer' : 'border-perl/70 bg-white text-main/70 hover:bg-page cursor-pointer'
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
                                    className={cx(
                                        'w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition text-left active:scale-[0.99]',
                                        !listed ? 'border-main/40 bg-main/5 text-main cursor-pointer' : 'border-perl/70 bg-white text-main/70 hover:bg-page cursor-pointer'
                                    )}
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <EyeOff className="h-4 w-4" />
                                        Non listé (lien direct)
                                    </span>
                                </button>
                            </div>

                            <p className="text-xs text-main/55">La visibilité sera appliquée lors de la publication.</p>
                        </div>

                        <div className="rounded-3xl border border-perl/60 bg-white p-4 sm:p-5 space-y-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-main/50">Résumé</p>

                            <div className="flex flex-wrap items-center gap-2">
                                <Pill className="border-perl/60 bg-page/60 text-main/70">{summary}</Pill>
                                {status === 'published' ? (
                                    <Pill className="border-sage/40 bg-sage/10 text-sage">En ligne</Pill>
                                ) : (
                                    <Pill className="border-perl/60 bg-white text-main/60">Brouillon</Pill>
                                )}
                            </div>

                            <div className="rounded-2xl border border-perl/60 bg-page/50 p-4">
                                <p className="text-sm font-semibold text-main flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    Publication finale
                                </p>
                                <p className="mt-1 text-sm text-main/65">Une fois publié, le cours devient visible côté public.</p>
                            </div>

                            {status === 'published' ? (
                                <button
                                    type="button"
                                    onClick={handleUnpublish}
                                    disabled={submitting}
                                    className={cx(
                                        'inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition',
                                        submitting ? 'border-perl/60 bg-page text-main/40 cursor-not-allowed' : 'border-rose/40 bg-rose/5 text-rose hover:bg-rose/10'
                                    )}
                                >
                                    Dépublier le cours
                                </button>
                            ) : null}
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Checklist de publication" subtitle="Phase 1 + contenu + commerce." />
                <CardBody>
                    <div className="space-y-3 text-sm text-main/75">
                        {checklist.items.map((item) => (
                            <div key={item.key} className="flex items-start gap-2">
                                <CheckCircle2 className={cx('h-4 w-4 mt-0.5', item.status === 'ok' ? 'text-sage' : 'text-main/30')} />
                                {item.href ? (
                                    <Link className="hover:underline" href={item.href}>
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span>{item.label}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>

            <CourseWizardFooter
                backHref={`/admin/cours/${courseId}/editor/review`}
                hubHref={`/admin/cours/${courseId}`}
                onSave={saveListing}
                onContinue={() => {
                    setError(null);
                    setMissing([]);
                    setConfirmOpen(true);
                }}
                continueLabel={status === 'published' ? 'Cours publié' : 'Publier'}
                disableContinue={!checklist.canPublish || status === 'published'}
                isSaving={submitting}
            />

            <Modal open={confirmOpen} title="Confirmer la publication" onClose={() => (submitting ? null : setConfirmOpen(false))}>
                <div className="space-y-4">
                    <div className="rounded-3xl border border-perl/60 bg-page/40 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-main/55">Ce qui va être enregistré</p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            <Pill className="border-perl/60 bg-white text-main/70">{summary}</Pill>
                            <Pill className="border-perl/60 bg-white text-main/60">Checklist publication</Pill>
                        </div>
                        <p className="mt-2 text-xs text-main/55">On vérifie les points essentiels avant de publier.</p>
                    </div>

                    {error ? (
                        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4">
                            <p className="text-sm font-semibold text-rose-800 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4" />
                                {error}
                            </p>
                            {missing.length ? (
                                <ul className="mt-2 space-y-1 text-sm text-rose-800/90">
                                    {missing.map((m) => (
                                        <li key={m.key}>
                                            •{' '}
                                            {m.href ? (
                                                <Link className="underline font-semibold" href={m.href}>
                                                    {m.label}
                                                </Link>
                                            ) : (
                                                <span className="font-semibold">{m.label}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-perl/60 bg-white p-4">
                            <p className="text-sm font-semibold text-main">Confirmer ?</p>
                            <p className="mt-1 text-sm text-main/65">
                                Clique sur <span className="font-semibold text-main">Publier</span> pour mettre le cours en ligne.
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                        <button
                            type="button"
                            onClick={() => setConfirmOpen(false)}
                            disabled={submitting}
                            className={cx(
                                'inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition',
                                submitting ? 'border-perl/60 bg-page text-main/40 cursor-not-allowed' : 'border-perl/70 bg-white text-main/80 hover:bg-page cursor-pointer'
                            )}
                        >
                            Annuler
                        </button>

                        <button
                            type="button"
                            onClick={confirmAndPublish}
                            disabled={submitting}
                            className={cx(
                                'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition active:scale-[0.99]',
                                submitting ? 'border border-perl/60 bg-page text-main/40 cursor-not-allowed' : 'bg-main text-white cursor-pointer hover:bg-main/90 hover:shadow-sm'
                            )}
                        >
                            Publier le cours
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
