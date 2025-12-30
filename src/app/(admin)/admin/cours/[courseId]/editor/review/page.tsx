'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';
import { getCourseContent } from '@/lib/actions/courseContent';
import type { CourseContent } from '@/lib/models/Course';

export default function EditorReviewPage() {
    const router = useRouter();
    const { courseId } = useParams<{ courseId: string }>();
    const [submitting, setSubmitting] = useState(false);
    const [content, setContent] = useState<CourseContent | null>(null);
    const [loadingContent, setLoadingContent] = useState(true);

    useEffect(() => {
        let isMounted = true;
        async function loadContent() {
            setLoadingContent(true);
            const result = await getCourseContent(courseId);
            if (isMounted) {
                setContent(result);
                setLoadingContent(false);
            }
        }

        loadContent();
        return () => {
            isMounted = false;
        };
    }, [courseId]);

    async function goPublicPreview() {
        if (submitting) return;
        setSubmitting(true);
        try {
            // TODO: router.push(`/cours/${slug}`) quand tu auras le public
            router.push(`/admin/cours/${courseId}`); // fallback : HUB
        } finally {
            setSubmitting(false);
        }
    }

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
                        <Badge>Éditeur • 4/4</Badge>
                    </div>
                }
            />

            <PageHeader label="Éditeur • 4/4" title="Review" description="Dernier contrôle avant diffusion : cohérence, ton, et lisibilité." />

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <Card>
                    <CardHeader title="Rendu du contenu" subtitle="Lecture directe depuis la base de données." />
                    <CardBody>
                        <div className="space-y-6">
                            {loadingContent ? (
                                <p className="text-sm text-main/60">Chargement du contenu…</p>
                            ) : (
                                <>
                                    <section className="space-y-2">
                                        <p className="text-xs uppercase tracking-[0.18em] text-main/55">Intro</p>
                                        <div className="rounded-3xl border border-perl/60 bg-page/40 p-4 text-sm text-main/70 whitespace-pre-wrap">
                                            {content?.intro?.text?.trim() ? content.intro.text : 'Aucune intro renseignée.'}
                                        </div>
                                    </section>

                                    <section className="space-y-2">
                                        <p className="text-xs uppercase tracking-[0.18em] text-main/55">Modules</p>
                                        <div className="space-y-3">
                                            {(content?.modules ?? []).length === 0 ? (
                                                <div className="rounded-3xl border border-perl/60 bg-page/40 p-4 text-sm text-main/70">Aucun module renseigné.</div>
                                            ) : (
                                                content?.modules?.map((module) => (
                                                    <div key={`${module.order}-${module.title}`} className="rounded-3xl border border-perl/60 bg-page/40 p-4 space-y-2">
                                                        <p className="text-sm font-semibold text-main">
                                                            Module {module.order} • {module.title}
                                                        </p>
                                                        <p className="text-sm text-main/70 whitespace-pre-wrap">{module.content || 'Contenu vide.'}</p>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </section>

                                    <section className="space-y-2">
                                        <p className="text-xs uppercase tracking-[0.18em] text-main/55">Conclusion</p>
                                        <div className="rounded-3xl border border-perl/60 bg-page/40 p-4 text-sm text-main/70 whitespace-pre-wrap">
                                            {content?.conclusion?.text?.trim() ? content.conclusion.text : 'Aucune conclusion renseignée.'}
                                        </div>
                                    </section>
                                </>
                            )}
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader title="Checklist finale" subtitle="Tu peux transformer ça en vrai preview plus tard." />

                    <CardBody>
                        <div className="space-y-4">
                            <div className="rounded-3xl border border-perl/60 bg-page/40 p-4 space-y-2">
                                <p className="text-sm font-semibold text-main inline-flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" />À vérifier
                                </p>
                                <ul className="list-disc pl-5 text-sm text-main/70 space-y-1">
                                    <li>Intro : promesse claire + parcours annoncé</li>
                                    <li>Modules : 1 compétence → 1 exercice</li>
                                    <li>Conclusion : synthèse + prochain pas</li>
                                    <li>Ton cohérent (doux/direct/fun)</li>
                                </ul>
                            </div>

                            <div className="pt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <Link
                                    href={`/admin/cours/${courseId}/editor/conclusion`}
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-5 py-2 text-sm font-semibold text-main/80 hover:bg-page transition cursor-pointer"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Retour (conclusion)
                                </Link>

                                <button
                                    type="button"
                                    onClick={goPublicPreview}
                                    disabled={submitting}
                                    className={cx(
                                        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition active:scale-[0.99]',
                                        submitting
                                            ? 'border border-perl/60 bg-page text-main/40 cursor-not-allowed'
                                            : 'bg-main text-white cursor-pointer hover:bg-main/90 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-main/15'
                                    )}
                                >
                                    <Eye className="h-4 w-4" />
                                    Voir le rendu (temporaire)
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
