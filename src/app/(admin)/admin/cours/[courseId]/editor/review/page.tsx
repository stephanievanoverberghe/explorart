'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';

export default function EditorReviewPage() {
    const router = useRouter();
    const { courseId } = useParams<{ courseId: string }>();
    const [submitting, setSubmitting] = useState(false);

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
    );
}
