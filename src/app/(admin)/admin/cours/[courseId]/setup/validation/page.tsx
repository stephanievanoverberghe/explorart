import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertTriangle, CheckCircle2, ChevronLeft, ArrowRight } from 'lucide-react';

import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';
import { CourseWizardFooter } from '@/components/admin/courses/CourseWizardFooter';
import { getCourseAdmin } from '@/lib/actions/courseAdmin';
import { buildSetupChecklist } from '@/lib/utils/courseSetupValidation';

interface SetupValidationPageProps {
    params: { courseId: string };
}

export default async function SetupValidationPage({ params }: SetupValidationPageProps) {
    const { courseId } = params;
    const adminCourse = await getCourseAdmin(courseId);

    if (!adminCourse) {
        notFound();
    }

    const checklist = buildSetupChecklist(courseId, adminCourse.setup, adminCourse.commerce);
    const missingItems = checklist.items.filter((item) => item.status === 'missing');

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

            <PageHeader label="Étape 6" title="Validation du setup" description="On vérifie que tout le cadrage est prêt avant d’entrer dans l’éditeur." />

            <Card>
                <CardHeader title="Résumé de la phase 1" subtitle="Identité, intention, structure et commerce." />
                <CardBody className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-perl/60 bg-page/40 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-main/55">Identité</p>
                        <p className="mt-2 text-sm text-main/70">{adminCourse.setup.identity.title || 'Titre à compléter'}</p>
                        <p className="text-xs text-main/50">{adminCourse.setup.identity.slug || 'slug manquant'}</p>
                    </div>
                    <div className="rounded-2xl border border-perl/60 bg-white p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-main/55">Structure</p>
                        <p className="mt-2 text-sm text-main/70">{adminCourse.setup.structure.modules.length} module(s)</p>
                        <p className="text-xs text-main/50">
                            {adminCourse.setup.structure.introMinutes} min intro • {adminCourse.setup.structure.conclusionMinutes} min conclusion
                        </p>
                    </div>
                    <div className="rounded-2xl border border-perl/60 bg-page/40 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-main/55">Commerce</p>
                        <p className="mt-2 text-sm text-main/70">{adminCourse.commerce.pricing.isFree ? 'Gratuit' : `${adminCourse.commerce.pricing.basePrice} €`}</p>
                        <p className="text-xs text-main/50">Accès : {adminCourse.setup.access.access === 'premium' ? 'Premium' : 'Libre'}</p>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Checklist phase 1" subtitle="Tout doit être OK pour passer à l’édition." />
                <CardBody className="space-y-3 text-sm text-main/75">
                    {checklist.items.map((item) => (
                        <div key={item.key} className="flex items-center justify-between gap-3 rounded-2xl border border-perl/60 bg-white p-3">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className={cx('h-4 w-4', item.status === 'ok' ? 'text-sage' : 'text-main/30')} />
                                <span>{item.label}</span>
                            </div>
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className={cx(
                                        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition',
                                        item.status === 'ok' ? 'border-perl/60 bg-white text-main/60' : 'border-perl/70 bg-page text-main/80 hover:bg-page/70'
                                    )}
                                >
                                    Modifier
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            ) : null}
                        </div>
                    ))}
                </CardBody>
            </Card>

            {!checklist.canEnterEditor ? (
                <Card>
                    <CardHeader title="À compléter" subtitle="Corrige les éléments manquants pour débloquer l’édition." />
                    <CardBody className="space-y-2 text-sm text-main/75">
                        {missingItems.map((item) => (
                            <div key={item.key} className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-amber-600" />
                                {item.href ? (
                                    <Link href={item.href} className="underline">
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span>{item.label}</span>
                                )}
                            </div>
                        ))}
                    </CardBody>
                </Card>
            ) : null}

            <CourseWizardFooter
                backHref={`/admin/cours/${courseId}/setup/resources`}
                hubHref={`/admin/cours/${courseId}`}
                continueHref={`/admin/cours/${courseId}/editor/intro`}
                continueLabel="Passer à l’édition"
                disableContinue={!checklist.canEnterEditor}
            />
        </div>
    );
}
