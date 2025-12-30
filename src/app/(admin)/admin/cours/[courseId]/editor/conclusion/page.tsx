'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';
import { saveConclusion } from '@/lib/actions/courseContent';

export default function EditorConclusionPage() {
    const router = useRouter();
    const { courseId } = useParams<{ courseId: string }>();

    const [text, setText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [savedAt, setSavedAt] = useState<string | null>(null);

    async function saveDraft() {
        if (submitting) return;
        setSubmitting(true);
        try {
            await saveConclusion(courseId, { text });
            const now = new Date();
            setSavedAt(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
        } finally {
            setSubmitting(false);
        }
    }

    async function saveAndContinue() {
        await saveDraft();
        router.push(`/admin/cours/${courseId}/editor/review`);
    }

    return (
        <div className="space-y-6">
            <TopBar
                backHref={`/admin/cours/${courseId}/editor/modules`}
                backLabel={
                    <span className="inline-flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Retour (modules)
                    </span>
                }
                right={
                    <div className="flex items-center gap-2">
                        <QuickLinks items={[{ href: `/admin/cours/${courseId}`, label: 'HUB' }]} />
                        <Badge>Éditeur • 3/4</Badge>
                    </div>
                }
            />

            <PageHeader label="Éditeur • 3/4" title="Conclusion" description="Synthèse + prochain pas + mini défi/checklist. C’est ce qui déclenche le “je continue”." />

            <Card>
                <CardHeader
                    title="Contenu de la conclusion"
                    subtitle="Récapitulatif, plan d’action, et invitation à pratiquer."
                    right={
                        <div className="flex items-center gap-2">
                            {savedAt ? (
                                <span className="rounded-full border border-perl/60 bg-white px-3 py-1 text-[11px] font-semibold text-main/70">Sauvegardé • {savedAt}</span>
                            ) : (
                                <span className="rounded-full border border-perl/60 bg-white px-3 py-1 text-[11px] font-semibold text-main/60">Non sauvegardé</span>
                            )}
                            <button
                                type="button"
                                onClick={saveDraft}
                                disabled={submitting}
                                className={cx(
                                    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition',
                                    submitting ? 'border-perl/60 bg-page text-main/40 cursor-not-allowed' : 'border-perl/70 bg-white text-main/80 hover:bg-page cursor-pointer'
                                )}
                            >
                                <Save className="h-4 w-4" />
                                Sauvegarder
                            </button>
                        </div>
                    }
                />

                <CardBody>
                    <div className="space-y-4">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Ex : ce que tu sais maintenant + mini défi + prochaine ressource + phrase d’encouragement..."
                            className={cx(
                                'min-h-[220px] w-full resize-none rounded-2xl border border-perl/70 bg-white px-4 py-3 text-sm text-main outline-none transition',
                                'hover:bg-page/50',
                                'focus:border-main focus:ring-2 focus:ring-main/10'
                            )}
                        />

                        <div className="pt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <Link
                                href={`/admin/cours/${courseId}/editor/modules`}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-5 py-2 text-sm font-semibold text-main/80 hover:bg-page transition cursor-pointer"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Retour (modules)
                            </Link>

                            <button
                                type="button"
                                onClick={saveAndContinue}
                                disabled={submitting}
                                className={cx(
                                    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition active:scale-[0.99]',
                                    submitting
                                        ? 'border border-perl/60 bg-page text-main/40 cursor-not-allowed'
                                        : 'bg-main text-white cursor-pointer hover:bg-main/90 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-main/15'
                                )}
                            >
                                Continuer (review)
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
