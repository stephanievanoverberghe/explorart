import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, CheckCircle2, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';

import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';
import { CourseWizardFooter } from '@/components/admin/courses/CourseWizardFooter';
import { getCourseContent } from '@/lib/actions/courseContent';
import { getCourseSetup } from '@/lib/data/courseSetup';
import { buildEditorChecklist } from '@/lib/utils/courseContentValidation';

interface EditorReviewPageProps {
    params: { courseId: string };
}

const statusStyles = {
    ok: 'border-sage/40 bg-sage/10 text-sage',
    warning: 'border-amber-200 bg-amber-50 text-amber-700',
    error: 'border-rose/30 bg-rose/10 text-rose',
} as const;

const statusIcons = {
    ok: CheckCircle2,
    warning: AlertTriangle,
    error: XCircle,
} as const;

export default async function EditorReviewPage({ params }: EditorReviewPageProps) {
    const { courseId } = params;
    const setup = await getCourseSetup(courseId);

    if (!setup) {
        notFound();
    }

    const content = await getCourseContent(courseId);
    const checklist = buildEditorChecklist(courseId, setup, content);

    return (
        <div className="space-y-6">
            <TopBar
                backHref={`/admin/cours/${courseId}/editor/conclusion`}
                backLabel={
                    <span className="inline-flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Retour (conclusion)
                    </span>
                }
                right={
                    <div className="flex items-center gap-2">
                        <QuickLinks items={[{ href: `/admin/cours/${courseId}`, label: 'HUB' }]} />
                        <Badge>Review</Badge>
                    </div>
                }
            />

            <PageHeader
                label="Étape finale"
                title="Relecture du cours"
                description="Lis ton cours comme un apprenant. Vérifie la cohérence, le rythme et l’intention globale avant publication."
            />

            <Card>
                <CardHeader title="Checklist éditoriale" subtitle="Validation automatique + conseils" />
                <CardBody className="space-y-3">
                    {checklist.items.map((item) => {
                        const Icon = statusIcons[item.status];
                        return (
                            <div key={item.key} className="flex flex-col gap-2 rounded-2xl border border-perl/60 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-start gap-3">
                                    <Icon className={cx('mt-0.5 h-4 w-4', item.status === 'ok' ? 'text-sage' : item.status === 'warning' ? 'text-amber-600' : 'text-rose')} />
                                    <div>
                                        <p className="text-sm font-semibold text-main/80">{item.label}</p>
                                        <p className="text-xs text-main/60">{item.description}</p>
                                    </div>
                                </div>
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page transition"
                                    >
                                        Corriger
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                ) : null}
                            </div>
                        );
                    })}
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Synthèse" subtitle="Vue d’ensemble" />
                <CardBody className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-perl/60 bg-page/40 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-main/55">Modules</p>
                        <p className="mt-2 text-sm text-main/70">{setup.structure.modules.length} modules à parcourir</p>
                    </div>
                    <div className={cx('rounded-2xl border p-4', checklist.canPublish ? statusStyles.ok : statusStyles.warning)}>
                        <p className="text-xs uppercase tracking-[0.18em]">État global</p>
                        <p className="mt-2 text-sm">{checklist.canPublish ? 'Prêt pour publication' : 'Quelques ajustements requis'}</p>
                    </div>
                    <div className={cx('rounded-2xl border p-4', checklist.blockingErrors ? statusStyles.error : statusStyles.ok)}>
                        <p className="text-xs uppercase tracking-[0.18em]">Blocages</p>
                        <p className="mt-2 text-sm">{checklist.blockingErrors > 0 ? `${checklist.blockingErrors} point(s) bloquant(s)` : 'Aucun blocage'}</p>
                    </div>
                </CardBody>
            </Card>

            <CourseWizardFooter
                backHref={`/admin/cours/${courseId}/editor/conclusion`}
                hubHref={`/admin/cours/${courseId}`}
                continueHref={`/admin/cours/${courseId}/setup/publish`}
                continueLabel="Continuer (publication)"
                disableContinue={!checklist.canPublish}
            />
        </div>
    );
}
