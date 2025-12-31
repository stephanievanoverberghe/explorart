import { notFound } from 'next/navigation';
import { ChevronLeft, CheckCircle2, Eye, Lock, Rocket, AlertTriangle } from 'lucide-react';

import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';
import { getCourseContent, publishCourseContent } from '@/lib/actions/courseContent';
import { getCourseSetup } from '@/lib/data/courseSetup';
import { buildEditorChecklist } from '@/lib/utils/courseContentValidation';

interface EditorPublishPageProps {
    params: { courseId: string };
}

export default async function EditorPublishPage({ params }: EditorPublishPageProps) {
    const { courseId } = params;
    const setup = await getCourseSetup(courseId);

    if (!setup) {
        notFound();
    }

    const content = await getCourseContent(courseId);
    const checklist = buildEditorChecklist(courseId, setup, content);
    const status = content?.contentStatus ?? 'draft';
    const isPublished = status === 'published';

    async function handlePublish() {
        'use server';
        if (!checklist.canPublish) return;
        await publishCourseContent(courseId);
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
                        <QuickLinks items={[{ href: `/admin/cours/${courseId}`, label: 'HUB' }]} />
                        <Badge>Publication</Badge>
                    </div>
                }
            />

            <PageHeader label="Étape finale" title="Publication du cours" description="Dernière vérification avant de rendre le cours visible." />

            <Card>
                <CardHeader title="Statut du contenu" subtitle="Visibilité actuelle" />
                <CardBody>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                            {isPublished ? (
                                <>
                                    <Eye className="h-4 w-4 text-sage" />
                                    <span className="text-sage font-semibold">Contenu publié</span>
                                </>
                            ) : (
                                <>
                                    <Lock className="h-4 w-4 text-main/60" />
                                    <span className="text-main/70">Contenu en brouillon</span>
                                </>
                            )}
                        </div>

                        <p className="text-xs text-main/60">En brouillon, le contenu n’est visible que par toi.</p>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Checklist de publication" subtitle="Avant de publier" />
                <CardBody>
                    <div className="space-y-3 text-sm text-main/75">
                        {checklist.items.map((item) => (
                            <div key={item.key} className="flex gap-2">
                                <CheckCircle2 className={cx('h-4 w-4 mt-0.5', item.status === 'ok' ? 'text-sage' : 'text-main/30')} />
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Mettre en ligne" subtitle="Action réversible (contenu modifiable)" />
                <CardBody>
                    <div className="space-y-4">
                        <p className="text-sm text-main/70">
                            Une fois publié, le contenu sera visible selon les paramètres du cours.
                            <br />
                            Tu pourras toujours revenir modifier son contenu.
                        </p>

                        {!checklist.canPublish ? (
                            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700 flex gap-2">
                                <AlertTriangle className="h-5 w-5" />
                                <div>
                                    <p className="font-semibold">Publication bloquée</p>
                                    <p>Corrige les points bloquants dans la review avant de publier.</p>
                                </div>
                            </div>
                        ) : null}

                        <form action={handlePublish}>
                            <button
                                type="submit"
                                disabled={!checklist.canPublish || isPublished}
                                className={cx(
                                    'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition',
                                    !checklist.canPublish || isPublished ? 'bg-sage/15 text-sage border border-sage/40 cursor-not-allowed' : 'bg-main text-white hover:bg-main/90'
                                )}
                            >
                                <Rocket className="h-4 w-4" />
                                {isPublished ? 'Cours publié' : 'Publier le contenu'}
                            </button>
                        </form>

                        {isPublished && <p className="text-xs text-sage">✔ Le contenu est maintenant publié.</p>}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
