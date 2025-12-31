// src/app/(admin)/admin/cours/[courseId]/editor/modules/page.tsx

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Layers, AlertTriangle } from 'lucide-react';

import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks } from '@/components/admin/courses/CourseUI';
import { getCourseSetup } from '@/lib/data/courseSetup';

interface EditorModulesPageProps {
    params: { courseId: string };
}

export default async function EditorModulesPage({ params }: EditorModulesPageProps) {
    const { courseId } = params;

    const setup = await getCourseSetup(courseId);

    if (!setup) {
        notFound();
    }

    const modules = setup.structure.modules ?? [];

    return (
        <div className="space-y-6">
            <TopBar
                backHref={`/admin/cours/${courseId}/editor/intro`}
                backLabel={<span className="inline-flex items-center gap-2">← Revenir à l’intro</span>}
                right={
                    <div className="flex items-center gap-2">
                        <QuickLinks
                            items={[
                                { href: `/admin/cours/${courseId}`, label: 'HUB' },
                                { href: '/admin/cours', label: 'Cours' },
                            ]}
                        />
                        <Badge>Éditeur • Modules</Badge>
                    </div>
                }
            />

            <PageHeader label="Éditeur" title="Modules du cours" description="Chaque module est une étape indépendante. Clique sur un module pour en construire le contenu." />

            {modules.length === 0 ? (
                <Card>
                    <CardHeader title="Aucun module défini" subtitle="Retourne au setup pour ajouter la structure" />
                    <CardBody>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-3 text-sm text-main/65">
                                <AlertTriangle className="mt-0.5 h-5 w-5 text-main/50" />
                                <p>
                                    Tu dois définir au moins un module dans le setup avant de pouvoir écrire le contenu.
                                    <br />
                                    Ajoute des modules pour débloquer l’éditeur.
                                </p>
                            </div>
                            <Link
                                href={`/admin/cours/${courseId}/setup/structure`}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-5 py-2 text-sm font-semibold text-main/80 hover:bg-page transition"
                            >
                                Modifier la structure
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </CardBody>
                </Card>
            ) : (
                <div className="space-y-4">
                    {modules.map((module, index) => (
                        <Card key={module.id}>
                            <CardHeader title={`Module ${index + 1}`} subtitle={module.goal || 'Objectif pédagogique à définir'} />

                            <CardBody>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="space-y-1">
                                        <p className="text-lg font-serif-title text-main">{module.title}</p>

                                        {module.minutes ? <p className="text-xs text-main/55">Durée estimée : {module.minutes} min</p> : null}
                                    </div>

                                    <Link
                                        href={`/admin/cours/${courseId}/editor/modules/${module.id}`}
                                        className="inline-flex items-center gap-2 rounded-full bg-main px-5 py-2 text-sm font-semibold text-white hover:bg-main/90 transition"
                                    >
                                        Éditer le module
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}

            <div className="rounded-3xl border border-perl/60 bg-page/40 p-4 flex gap-3 text-sm text-main/65">
                <Layers className="h-5 w-5 shrink-0 text-main/50" />
                <p>
                    Les modules sont définis dans le setup.
                    <br />
                    Ici, tu construis leur contenu réel : vidéos, exercices, intentions.
                </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <Link
                    href={`/admin/cours/${courseId}/editor/intro`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-5 py-2 text-sm font-semibold text-main/80 hover:bg-page transition"
                >
                    ← Revenir à l’intro
                </Link>

                <Link
                    href={`/admin/cours/${courseId}/editor/conclusion`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-main px-6 py-2.5 text-sm font-semibold text-white hover:bg-main/90 hover:shadow-sm transition"
                >
                    Next : Conclusion
                    <ChevronRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}
