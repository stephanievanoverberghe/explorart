// src/app/(admin)/admin/cours/[courseId]/page.tsx
import { ArrowRight, Eye, ListChecks, Pencil, Settings, ChevronLeft } from 'lucide-react';
import { ActionTile, Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks } from '@/components/admin/courses/CourseUI';

export default function AdminCourseHubPage({ params }: { params: { courseId: string } }) {
    const { courseId } = params;

    return (
        <div className="space-y-6">
            <TopBar
                backHref="/admin/cours"
                backLabel={
                    <span className="inline-flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Retour aux cours
                    </span>
                }
                right={<Badge>HUB cours</Badge>}
            />

            <PageHeader
                label="Aperçu"
                title="Tableau du cours"
                description={
                    <>
                        Ton point d’ancrage : <span className="font-semibold text-main">setup</span> → <span className="font-semibold text-main">éditeur</span> →{' '}
                        <span className="font-semibold text-main">réglages</span>.
                    </>
                }
            />

            <Card>
                <CardHeader
                    title="Raccourcis"
                    subtitle={`CourseId : ${courseId}`}
                    right={
                        <QuickLinks
                            items={[
                                { href: '/admin/cours', label: 'Cours' },
                                { href: `/admin/cours/${courseId}/settings`, label: 'Réglages' },
                            ]}
                        />
                    }
                />

                <CardBody>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <ActionTile
                            href={`/admin/cours/${courseId}/setup/identity`}
                            kicker="Setup"
                            title={
                                <>
                                    Continuer le cheminement <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                </>
                            }
                            desc="Identité → Intention → Structure → Accès → Prix → Ressources → Publication"
                        />

                        <ActionTile
                            href={`/admin/cours/${courseId}/editor/intro`}
                            kicker="Éditeur"
                            title={
                                <>
                                    Commencer par l’intro <Pencil className="h-4 w-4" />
                                </>
                            }
                            desc="Intro → Modules → Conclusion → Review"
                        />

                        <ActionTile
                            href={`/admin/cours/${courseId}/setup/structure`}
                            kicker="Checklist"
                            title={
                                <>
                                    Voir la progression <ListChecks className="h-4 w-4" />
                                </>
                            }
                            desc="Plan du cours : intro + modules + conclusion"
                        />

                        <div className="grid gap-2">
                            <ActionTile
                                href={`/admin/cours/${courseId}/settings`}
                                kicker="Réglages"
                                title={
                                    <>
                                        Configurer <Settings className="h-4 w-4" />
                                    </>
                                }
                                desc="Titre, slug, SEO, médias, options…"
                            />

                            <ActionTile
                                href={`/admin/cours/${courseId}/editor/review`}
                                kicker="Prévisualisation"
                                title={
                                    <>
                                        Ouvrir la review <Eye className="h-4 w-4" />
                                    </>
                                }
                                desc="Aperçu avant publication"
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
