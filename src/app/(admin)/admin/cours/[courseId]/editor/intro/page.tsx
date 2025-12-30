'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, Sparkles } from 'lucide-react';
import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';
import { saveIntro } from '@/lib/actions/courseContent';

export default function EditorIntroPage() {
    const router = useRouter();
    const { courseId } = useParams<{ courseId: string }>();

    const [text, setText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [savedAt, setSavedAt] = useState<string | null>(null);

    async function saveDraft() {
        if (submitting) return;
        setSubmitting(true);
        try {
            await saveIntro(courseId, { text });
            const now = new Date();
            setSavedAt(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
        } finally {
            setSubmitting(false);
        }
    }

    async function saveAndContinue() {
        await saveDraft();
        router.push(`/admin/cours/${courseId}/editor/modules`);
    }

    return (
        <div className="space-y-6">
            <TopBar
                backHref={`/admin/cours/${courseId}/setup/publish`}
                backLabel={
                    <span className="inline-flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Retour (publication)
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
                        <Badge>Éditeur • 1/4</Badge>
                    </div>
                }
            />

            <PageHeader label="Éditeur • 1/4" title="Intro" description="On accueille, on cadre la méthode, et on annonce le parcours. Objectif : rassurer + donner envie." />

            <Card>
                <CardHeader
                    title="Contenu de l’intro"
                    subtitle="Texte, script, ou structure (bullet points)."
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
                            placeholder="Ex : 1) Pourquoi ce cours, 2) ce qu’on va faire, 3) matériel, 4) comment suivre, 5) mini défi..."
                            className={cx(
                                'min-h-[220px] w-full resize-none rounded-2xl border border-perl/70 bg-white px-4 py-3 text-sm text-main outline-none transition',
                                'hover:bg-page/50',
                                'focus:border-main focus:ring-2 focus:ring-main/10'
                            )}
                        />

                        <div className="rounded-3xl border border-perl/60 bg-page/40 p-4">
                            <p className="text-xs uppercase tracking-[0.18em] text-main/55 inline-flex items-center gap-2">
                                <Sparkles className="h-4 w-4" />
                                Mini checklist
                            </p>
                            <ul className="mt-2 list-disc pl-5 text-sm text-main/70 space-y-1">
                                <li>Promesse rappelée en 1 phrase</li>
                                <li>Matériel / prérequis (simple)</li>
                                <li>Parcours annoncé (modules)</li>
                                <li>“Prochain pas” clair</li>
                            </ul>
                        </div>

                        <div className="pt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <Link
                                href={`/admin/cours/${courseId}/setup/publish`}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-5 py-2 text-sm font-semibold text-main/80 hover:bg-page transition cursor-pointer"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Retour (publication)
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
                                Continuer (modules)
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
