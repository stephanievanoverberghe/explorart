'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Save, Plus, Trash2 } from 'lucide-react';
import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';

type EditorModule = { id: string; title: string; content: string };
const uid = () => crypto.randomUUID();

export default function EditorModulesPage() {
    const router = useRouter();
    const { courseId } = useParams<{ courseId: string }>();

    const [modules, setModules] = useState<EditorModule[]>([
        { id: uid(), title: 'Module 1', content: '' },
        { id: uid(), title: 'Module 2', content: '' },
    ]);

    const [submitting, setSubmitting] = useState(false);
    const [savedAt, setSavedAt] = useState<string | null>(null);

    const canContinue = useMemo(() => modules.every((m) => m.title.trim().length >= 3), [modules]);

    async function saveDraft() {
        if (submitting) return;
        setSubmitting(true);
        try {
            // TODO: saveModules(courseId, modules)
            const now = new Date();
            setSavedAt(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
        } finally {
            setSubmitting(false);
        }
    }

    async function saveAndContinue() {
        if (!canContinue) return;
        await saveDraft();
        router.push(`/admin/cours/${courseId}/editor/conclusion`);
    }

    function update(id: string, patch: Partial<EditorModule>) {
        setModules((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
    }

    function add() {
        setModules((prev) => [...prev, { id: uid(), title: `Module ${prev.length + 1}`, content: '' }]);
    }

    function remove(id: string) {
        setModules((prev) => prev.filter((m) => m.id !== id));
    }

    return (
        <div className="space-y-6">
            <TopBar
                backHref={`/admin/cours/${courseId}/editor/intro`}
                backLabel={
                    <span className="inline-flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Retour (intro)
                    </span>
                }
                right={
                    <div className="flex items-center gap-2">
                        <QuickLinks items={[{ href: `/admin/cours/${courseId}`, label: 'HUB' }]} />
                        <Badge>Éditeur • 2/4</Badge>
                    </div>
                }
            />

            <PageHeader label="Éditeur • 2/4" title="Modules" description="Ici tu écris le cœur du cours. Un module = une compétence + un exercice." />

            <Card>
                <CardHeader
                    title="Contenu des modules"
                    subtitle="Tu peux rester simple : plan, script, ou checklist."
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
                        <button
                            type="button"
                            onClick={add}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-sm font-semibold text-main/80 hover:bg-page transition cursor-pointer active:scale-[0.99]"
                        >
                            <Plus className="h-4 w-4" />
                            Ajouter un module
                        </button>

                        <div className="space-y-3">
                            {modules.map((m, idx) => (
                                <div key={m.id} className="rounded-3xl border border-perl/60 bg-page/30 p-4 sm:p-5 space-y-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-xs uppercase tracking-[0.18em] text-main/55">Module {idx + 1}</p>
                                        <button
                                            type="button"
                                            onClick={() => remove(m.id)}
                                            disabled={modules.length <= 1}
                                            className={cx(
                                                'inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition',
                                                modules.length <= 1
                                                    ? 'border-perl/60 bg-page text-main/40 cursor-not-allowed'
                                                    : 'border-rose/40 bg-rose/5 text-rose hover:bg-rose/10 cursor-pointer'
                                            )}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Supprimer
                                        </button>
                                    </div>

                                    <input
                                        value={m.title}
                                        onChange={(e) => update(m.id, { title: e.target.value })}
                                        className={cx(
                                            'h-12 w-full rounded-2xl border border-perl/70 bg-white px-4 text-sm font-semibold text-main/80 outline-none transition',
                                            'hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10'
                                        )}
                                        placeholder="Titre du module (min. 3 caractères)"
                                    />

                                    <textarea
                                        value={m.content}
                                        onChange={(e) => update(m.id, { content: e.target.value })}
                                        className={cx(
                                            'min-h-40 w-full resize-none rounded-2xl border border-perl/70 bg-white px-4 py-3 text-sm text-main outline-none transition',
                                            'hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10'
                                        )}
                                        placeholder="Contenu / script / plan / exercices..."
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="pt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <Link
                                href={`/admin/cours/${courseId}/editor/intro`}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-5 py-2 text-sm font-semibold text-main/80 hover:bg-page transition cursor-pointer"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Retour (intro)
                            </Link>

                            <button
                                type="button"
                                onClick={saveAndContinue}
                                disabled={!canContinue || submitting}
                                className={cx(
                                    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition active:scale-[0.99]',
                                    !canContinue || submitting
                                        ? 'border border-perl/60 bg-page text-main/40 cursor-not-allowed'
                                        : 'bg-main text-white cursor-pointer hover:bg-main/90 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-main/15'
                                )}
                            >
                                Continuer (conclusion)
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
