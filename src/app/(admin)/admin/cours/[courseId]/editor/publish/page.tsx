'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ChevronLeft, CheckCircle2, Eye, Lock, Rocket } from 'lucide-react';

import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';

/* ------------------------------------------------
   Editor Publish — Validation finale
------------------------------------------------- */

export default function EditorPublishPage() {
    const { courseId } = useParams<{ courseId: string }>();

    const [status, setStatus] = useState<'draft' | 'published'>('draft');

    return (
        <div className="space-y-6">
            {/* TOP BAR */}
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

            {/* ÉTAT */}
            <Card>
                <CardHeader title="Statut du cours" subtitle="Visibilité actuelle" />
                <CardBody>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                            {status === 'draft' ? (
                                <>
                                    <Lock className="h-4 w-4 text-main/60" />
                                    <span className="text-main/70">Cours en brouillon</span>
                                </>
                            ) : (
                                <>
                                    <Eye className="h-4 w-4 text-sage" />
                                    <span className="text-sage font-semibold">Cours publié</span>
                                </>
                            )}
                        </div>

                        <p className="text-xs text-main/60">En brouillon, le cours n’est visible que par toi.</p>
                    </div>
                </CardBody>
            </Card>

            {/* CHECKLIST */}
            <Card>
                <CardHeader title="Checklist de publication" subtitle="Avant de publier" />
                <CardBody>
                    <div className="space-y-3 text-sm text-main/75">
                        <div className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-sage mt-0.5" />
                            <span>Introduction complète et cohérente</span>
                        </div>
                        <div className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-sage mt-0.5" />
                            <span>Modules construits et autonomes</span>
                        </div>
                        <div className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-sage mt-0.5" />
                            <span>Conclusion présente et ouverte</span>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* ACTION */}
            <Card>
                <CardHeader title="Mettre en ligne" subtitle="Action irréversible (mais modifiable ensuite)" />
                <CardBody>
                    <div className="space-y-4">
                        <p className="text-sm text-main/70">
                            Une fois publié, le cours sera visible selon ses paramètres (gratuit / premium).
                            <br />
                            Tu pourras toujours revenir modifier son contenu.
                        </p>

                        <button
                            type="button"
                            onClick={() => setStatus('published')}
                            className={cx(
                                'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition',
                                status === 'published' ? 'bg-sage/15 text-sage border border-sage/40' : 'bg-main text-white hover:bg-main/90'
                            )}
                        >
                            <Rocket className="h-4 w-4" />
                            Publier le cours
                        </button>

                        {status === 'published' && <p className="text-xs text-sage">✔ Le cours est maintenant publié.</p>}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
