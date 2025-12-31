'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronLeft, Eye, CheckCircle2, Edit3, Rocket } from 'lucide-react';

import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks } from '@/components/admin/courses/CourseUI';

/* ------------------------------------------------
   Editor Review — Lecture & validation
------------------------------------------------- */

export default function EditorReviewPage() {
    const { courseId } = useParams<{ courseId: string }>();

    return (
        <div className="space-y-6">
            {/* TOP BAR */}
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

            {/* INTRO */}
            <Card>
                <CardHeader title="Introduction" subtitle="Premier contact avec l’apprenant" />
                <CardBody>
                    <div className="space-y-3">
                        <p className="text-sm text-main/75">L’introduction pose le cadre émotionnel du cours : posture, promesse, rythme.</p>

                        <Link
                            href={`/admin/cours/${courseId}/editor/intro`}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-sm font-semibold text-main/80 hover:bg-page transition"
                        >
                            <Edit3 className="h-4 w-4" />
                            Modifier l’introduction
                        </Link>
                    </div>
                </CardBody>
            </Card>

            {/* MODULES */}
            <Card>
                <CardHeader title="Modules" subtitle="Parcours principal du cours" />
                <CardBody>
                    <div className="space-y-4">
                        <p className="text-sm text-main/75">Chaque module doit être autonome, clair et fidèle à l’intention du cours.</p>

                        <Link
                            href={`/admin/cours/${courseId}/editor/modules`}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-sm font-semibold text-main/80 hover:bg-page transition"
                        >
                            <Eye className="h-4 w-4" />
                            Voir les modules
                        </Link>
                    </div>
                </CardBody>
            </Card>

            {/* CONCLUSION */}
            <Card>
                <CardHeader title="Conclusion" subtitle="Clôture & ouverture" />
                <CardBody>
                    <div className="space-y-3">
                        <p className="text-sm text-main/75">La conclusion aide l’apprenant à intégrer ce qu’il a vécu et à continuer seul.</p>

                        <Link
                            href={`/admin/cours/${courseId}/editor/conclusion`}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-sm font-semibold text-main/80 hover:bg-page transition"
                        >
                            <Edit3 className="h-4 w-4" />
                            Modifier la conclusion
                        </Link>
                    </div>
                </CardBody>
            </Card>

            {/* CHECK FINAL */}
            <Card>
                <CardHeader title="Checklist finale" subtitle="Avant publication" />
                <CardBody>
                    <div className="space-y-3 text-sm text-main/75">
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-sage mt-0.5" />
                            <span>L’introduction donne envie et rassure.</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-sage mt-0.5" />
                            <span>Les modules suivent une progression logique.</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-sage mt-0.5" />
                            <span>La conclusion ferme le parcours sans brusquer.</span>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* ACTION */}
            <div className="flex justify-end pt-2">
                <Link
                    href={`/admin/cours/${courseId}/editor/publish`}
                    className="inline-flex items-center gap-2 rounded-full bg-main px-6 py-3 text-sm font-semibold text-white hover:bg-main/90 transition"
                >
                    <Rocket className="h-4 w-4" />
                    Passer à la publication
                </Link>
            </div>
        </div>
    );
}
