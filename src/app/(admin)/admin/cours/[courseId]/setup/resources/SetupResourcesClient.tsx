// src/app/(admin)/admin/cours/[courseId]/setup/resources/page.tsx
'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Video, FileDown, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';
import { CourseWizardFooter } from '@/components/admin/courses/CourseWizardFooter';
import { saveResources } from '@/lib/actions/courseSetup';
import type { CourseResourceData, CourseResourcesData } from '@/types/courseSetup';

const uid = () => crypto.randomUUID();

interface SetupResourcesClientProps {
    courseId: string;
    initialResources: CourseResourcesData;
}

export default function SetupResourcesClient({ courseId, initialResources }: SetupResourcesClientProps) {
    const router = useRouter();

    const [videoIntro, setVideoIntro] = useState(initialResources.videoIntro);
    const [videoConclusion, setVideoConclusion] = useState(initialResources.videoConclusion);
    const [videoModules, setVideoModules] = useState(initialResources.videoModules);
    const [resources, setResources] = useState<CourseResourceData[]>(
        initialResources.resources.length
            ? initialResources.resources
            : [
                  { id: uid(), title: 'Fiche mémo harmonies', format: 'PDF' },
                  { id: uid(), title: 'Palette d’exercices', format: 'ASE/PNG' },
              ]
    );
    const [submitting, setSubmitting] = useState(false);

    const summary = useMemo(() => {
        const videos = [videoIntro && 'intro', videoModules && 'modules', videoConclusion && 'conclusion'].filter(Boolean).join(', ') || '—';
        return `${resources.length} ressources • vidéos : ${videos}`;
    }, [resources.length, videoIntro, videoModules, videoConclusion]);

    function updateResource(id: string, patch: Partial<CourseResourceData>) {
        setResources((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    }

    function addResource() {
        setResources((prev) => [...prev, { id: uid(), title: 'Nouvelle ressource', format: 'PDF' }]);
    }

    function removeResource(id: string) {
        setResources((prev) => prev.filter((r) => r.id !== id));
    }

    async function saveDraft() {
        if (submitting) return;
        setSubmitting(true);
        try {
            await saveResources(courseId, { videoIntro, videoModules, videoConclusion, resources });
        } finally {
            setSubmitting(false);
        }
    }

    async function handleNext() {
        if (submitting) return;
        await saveDraft();
        router.push(`/admin/cours/${courseId}/setup/publish`);
    }

    return (
        <div className="space-y-6">
            <TopBar
                backHref={`/admin/cours/${courseId}/setup/pricing`}
                backLabel={
                    <span className="inline-flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Retour (prix)
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
                        <Badge>Setup • Étape 5</Badge>
                    </div>
                }
            />

            <PageHeader
                label="Étape 5"
                title="Vidéos & ressources téléchargeables"
                description="Même structure que “Commencer ici” : intro vidéo, modules vidéo, conclusion + ressources PDF/palettes."
            />

            <Card>
                <CardHeader title="Contenus" subtitle="Checklist rapide pour ne rien oublier." />

                <CardBody>
                    <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-3xl border border-perl/60 bg-white p-4 sm:p-5 space-y-3">
                                <p className="text-xs uppercase tracking-[0.18em] text-main/50">Vidéos</p>

                                <button
                                    type="button"
                                    onClick={() => setVideoIntro((v) => !v)}
                                    className={cx(
                                        'w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition text-left cursor-pointer active:scale-[0.99]',
                                        videoIntro ? 'border-sage/50 bg-sage/10 text-sage' : 'border-perl/70 bg-white text-main/70 hover:bg-page'
                                    )}
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <Video className="h-4 w-4" />
                                        Intro vidéo (cadrage + méthode)
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setVideoModules((v) => !v)}
                                    className={cx(
                                        'w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition text-left cursor-pointer active:scale-[0.99]',
                                        videoModules ? 'border-sage/50 bg-sage/10 text-sage' : 'border-perl/70 bg-white text-main/70 hover:bg-page'
                                    )}
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <Video className="h-4 w-4" />
                                        Modules vidéo (cœur du cours)
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setVideoConclusion((v) => !v)}
                                    className={cx(
                                        'w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition text-left cursor-pointer active:scale-[0.99]',
                                        videoConclusion ? 'border-sage/50 bg-sage/10 text-sage' : 'border-perl/70 bg-white text-main/70 hover:bg-page'
                                    )}
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <Video className="h-4 w-4" />
                                        Conclusion vidéo (synthèse + suite)
                                    </span>
                                </button>
                            </div>

                            <div className="rounded-3xl border border-perl/60 bg-page/40 p-4 sm:p-5 space-y-3">
                                <p className="text-xs uppercase tracking-[0.18em] text-main/55">Résumé</p>
                                <p className="text-sm text-main">
                                    <span className="font-semibold">{summary}</span>
                                    <span className="text-main/60"> • prêt pour la publication.</span>
                                </p>
                                <div className="rounded-2xl border border-perl/60 bg-white p-4">
                                    <p className="text-xs text-main/60">Astuce e-learning</p>
                                    <p className="text-sm text-main/70">Ajoute 1 ressource actionnable par module (checklist, palette, template).</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-perl/60 bg-white p-4 sm:p-5 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.18em] text-main/50 inline-flex items-center gap-2">
                                        <FileDown className="h-4 w-4" />
                                        Ressources téléchargeables
                                    </p>
                                    <p className="mt-1 text-sm text-main/70">PDF, palettes couleur, templates, fiches atelier…</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={addResource}
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-sm font-semibold text-main/80 hover:bg-page transition cursor-pointer"
                                >
                                    <Plus className="h-4 w-4" />
                                    Ajouter une ressource
                                </button>
                            </div>

                            <div className="space-y-3">
                                {resources.map((resource) => (
                                    <div key={resource.id} className="rounded-3xl border border-perl/60 bg-page/30 p-4 sm:p-5 space-y-3">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="text-xs uppercase tracking-[0.18em] text-main/55">Ressource</p>
                                                <p className="text-sm text-main/70">Titre + format</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeResource(resource.id)}
                                                disabled={resources.length <= 1}
                                                className={cx(
                                                    'inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition',
                                                    resources.length <= 1
                                                        ? 'border-perl/60 bg-page text-main/40 cursor-not-allowed'
                                                        : 'border-rose/40 bg-rose/5 text-rose hover:bg-rose/10 cursor-pointer'
                                                )}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Supprimer
                                            </button>
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
                                            <input
                                                value={resource.title}
                                                onChange={(e) => updateResource(resource.id, { title: e.target.value })}
                                                className="h-12 w-full rounded-2xl border border-perl/70 bg-white px-4 text-sm font-semibold text-main/80 outline-none transition hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10"
                                                placeholder="Ex : Checklist de composition"
                                            />
                                            <input
                                                value={resource.format}
                                                onChange={(e) => updateResource(resource.id, { format: e.target.value })}
                                                className="h-12 w-full rounded-2xl border border-perl/70 bg-white px-4 text-sm font-semibold text-main/80 outline-none transition hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10"
                                                placeholder="PDF / PNG / PSD"
                                            />
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-main/60">
                                            <CheckCircle2 className="h-4 w-4 text-sage" />
                                            Disponible au téléchargement après la vidéo.
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <CourseWizardFooter
                backHref={`/admin/cours/${courseId}/setup/pricing`}
                hubHref={`/admin/cours/${courseId}`}
                onSave={saveDraft}
                onContinue={handleNext}
                isSaving={submitting}
            />
        </div>
    );
}
