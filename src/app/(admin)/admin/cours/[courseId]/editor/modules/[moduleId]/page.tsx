'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft, Pencil, CheckCircle2, Compass, Video, Plus, Trash2, Sparkles } from 'lucide-react';

import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';
import { CourseWizardFooter } from '@/components/admin/courses/CourseWizardFooter';
import { getModule, saveModule } from '@/lib/actions/courseContent';
import { getCourseStructureModules } from '@/lib/actions/courseSetup';
import type { CourseModuleData, CourseModuleVideo, CourseModuleListSection } from '@/types/courseContent';
import type { CourseStructureData } from '@/types/courseSetup';

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <div className="flex items-end justify-between gap-3">
                <label className="text-xs font-semibold text-main/75">
                    {label} {required ? <span className="text-rose">*</span> : null}
                </label>
                {hint ? <span className="text-[11px] text-main/50">{hint}</span> : null}
            </div>
            {children}
        </div>
    );
}

function IconInput({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-main/45">{icon}</div>
            {children}
        </div>
    );
}

const inputBase =
    'w-full rounded-2xl border border-perl/70 bg-white px-4 py-3 text-sm text-main outline-none transition hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10';

const inputWithIcon =
    'w-full rounded-2xl border border-perl/70 bg-white pl-10 pr-4 py-3 text-sm text-main outline-none transition hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10';

const textareaBase =
    'w-full resize-none rounded-2xl border border-perl/70 bg-white px-4 py-3 text-sm text-main outline-none transition hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10';

/** Factories : garantissent les champs requis */
const makeVideo = (partial?: Partial<CourseModuleVideo>): CourseModuleVideo => ({
    title: partial?.title ?? '',
    youtubeId: partial?.youtubeId ?? '',
    description: partial?.description ?? '',
    note: partial?.note ?? '',
    cover: partial?.cover ?? '',
});

const makeListSection = (fallbackTitle: string, partial?: Partial<CourseModuleListSection>): CourseModuleListSection => ({
    title: partial?.title ?? fallbackTitle,
    items: partial?.items ?? [],
});

const emptyModule: CourseModuleData = {
    badgeLabel: '',
    title: '',
    description: '',
    video: makeVideo(),
    material: { title: 'Matériel', items: [], note: '', highlighted: true },
    intention: makeListSection('Intention'),
    exercise: { title: 'Exercice guidé', description: '', steps: [] },
    extraSections: [],
};

function hydrateModule(data: CourseModuleData | null, fallbackTitle: string | null): CourseModuleData {
    const safeTitle = (data?.title ?? '').trim() ? (data!.title as string) : fallbackTitle ?? '';

    return {
        badgeLabel: data?.badgeLabel ?? '',
        title: safeTitle,
        description: data?.description ?? '',
        video: makeVideo(data?.video),
        material: {
            title: data?.material?.title ?? emptyModule.material!.title,
            items: data?.material?.items ?? [],
            note: data?.material?.note ?? '',
            highlighted: data?.material?.highlighted ?? true,
        },
        intention: makeListSection('Intention', data?.intention),
        exercise: {
            title: data?.exercise?.title ?? emptyModule.exercise!.title,
            description: data?.exercise?.description ?? '',
            steps: data?.exercise?.steps ?? [],
        },
        extraSections:
            data?.extraSections?.map((s) => ({
                title: s.title ?? '',
                description: s.description ?? '',
                items: s.items ?? [],
            })) ?? [],
    };
}

export default function EditorModulePage() {
    const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>();

    const [moduleMeta, setModuleMeta] = useState<CourseStructureData['modules'][number] | null>(null);
    const [moduleData, setModuleData] = useState<CourseModuleData>(emptyModule);
    const [savedAt, setSavedAt] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const moduleTitle = useMemo(() => {
        const fromMeta = moduleMeta?.title?.trim();
        const fromContent = moduleData.title?.trim();
        return fromMeta || fromContent || 'Module';
    }, [moduleMeta?.title, moduleData.title]);

    useEffect(() => {
        if (!courseId || !moduleId) return;

        let mounted = true;

        Promise.all([getCourseStructureModules(courseId), getModule(courseId, moduleId)])
            .then(([modules, content]) => {
                if (!mounted) return;
                const meta = modules.find((m) => m.id === moduleId) ?? null;
                setModuleMeta(meta);
                setModuleData(hydrateModule(content, meta?.title ?? null));
            })
            .catch(() => {
                if (!mounted) return;
                setModuleData(hydrateModule(null, null));
            });

        return () => {
            mounted = false;
        };
    }, [courseId, moduleId]);

    function updateModule<K extends keyof CourseModuleData>(key: K, value: CourseModuleData[K]) {
        setModuleData((prev) => ({ ...prev, [key]: value }));
    }

    function updateVideo(patch: Partial<CourseModuleVideo>) {
        setModuleData((prev) => ({
            ...prev,
            video: makeVideo({ ...prev.video, ...patch }),
        }));
    }

    function updateMaterial(patch: Partial<NonNullable<CourseModuleData['material']>>) {
        setModuleData((prev) => ({
            ...prev,
            material: {
                title: prev.material?.title ?? emptyModule.material!.title,
                items: prev.material?.items ?? [],
                note: prev.material?.note ?? '',
                highlighted: prev.material?.highlighted ?? true,
                ...patch,
            },
        }));
    }

    function updateMaterialItem(index: number, value: string) {
        updateMaterial({
            items: (moduleData.material?.items ?? []).map((item, i) => (i === index ? value : item)),
        });
    }

    function addMaterialItem() {
        updateMaterial({
            items: [...(moduleData.material?.items ?? []), ''],
        });
    }

    function removeMaterialItem(index: number) {
        updateMaterial({
            items: (moduleData.material?.items ?? []).filter((_, i) => i !== index),
        });
    }

    function updateIntentionTitle(title: string) {
        setModuleData((prev) => ({
            ...prev,
            intention: makeListSection('Intention', { ...prev.intention, title }),
        }));
    }

    function updateIntentionItem(index: number, value: string) {
        setModuleData((prev) => {
            const current = prev.intention ?? makeListSection('Intention');
            const items = current.items.map((item, i) => (i === index ? value : item));
            return { ...prev, intention: { ...current, items } };
        });
    }

    function addIntentionItem() {
        setModuleData((prev) => {
            const current = prev.intention ?? makeListSection('Intention');
            return { ...prev, intention: { ...current, items: [...current.items, ''] } };
        });
    }

    function removeIntentionItem(index: number) {
        setModuleData((prev) => {
            const current = prev.intention ?? makeListSection('Intention');
            return { ...prev, intention: { ...current, items: current.items.filter((_, i) => i !== index) } };
        });
    }

    function updateExercise(patch: Partial<NonNullable<CourseModuleData['exercise']>>) {
        setModuleData((prev) => ({
            ...prev,
            exercise: {
                title: prev.exercise?.title ?? emptyModule.exercise!.title,
                description: prev.exercise?.description ?? '',
                steps: prev.exercise?.steps ?? [],
                ...patch,
            },
        }));
    }

    function updateExerciseStep(index: number, value: string) {
        updateExercise({
            steps: (moduleData.exercise?.steps ?? []).map((step, i) => (i === index ? value : step)),
        });
    }

    function addExerciseStep() {
        updateExercise({
            steps: [...(moduleData.exercise?.steps ?? []), ''],
        });
    }

    function removeExerciseStep(index: number) {
        updateExercise({
            steps: (moduleData.exercise?.steps ?? []).filter((_, i) => i !== index),
        });
    }

    function addExtraSection() {
        setModuleData((prev) => ({
            ...prev,
            extraSections: [...(prev.extraSections ?? []), { title: '', description: '', items: [] }],
        }));
    }

    function updateExtraSection(index: number, patch: Partial<NonNullable<CourseModuleData['extraSections']>[number]>) {
        setModuleData((prev) => {
            const next = (prev.extraSections ?? []).map((section, i) => {
                if (i !== index) return section;

                return {
                    ...section,
                    ...patch,
                    title: patch.title ?? section.title ?? '',
                    description: patch.description ?? section.description ?? '',
                    items: patch.items ?? section.items ?? [],
                };
            });

            return { ...prev, extraSections: next };
        });
    }

    function addExtraItem(index: number) {
        setModuleData((prev) => {
            const next = (prev.extraSections ?? []).map((section, i) => (i === index ? { ...section, items: [...(section.items ?? []), ''] } : section));
            return { ...prev, extraSections: next };
        });
    }

    function updateExtraItem(sectionIndex: number, itemIndex: number, value: string) {
        setModuleData((prev) => {
            const next = (prev.extraSections ?? []).map((section, i) => {
                if (i !== sectionIndex) return section;
                const items = (section.items ?? []).map((item, idx) => (idx === itemIndex ? value : item));
                return { ...section, items };
            });
            return { ...prev, extraSections: next };
        });
    }

    function removeExtraItem(sectionIndex: number, itemIndex: number) {
        setModuleData((prev) => {
            const next = (prev.extraSections ?? []).map((section, i) => {
                if (i !== sectionIndex) return section;
                return { ...section, items: (section.items ?? []).filter((_, idx) => idx !== itemIndex) };
            });
            return { ...prev, extraSections: next };
        });
    }

    function removeExtraSection(index: number) {
        setModuleData((prev) => ({
            ...prev,
            extraSections: (prev.extraSections ?? []).filter((_, i) => i !== index),
        }));
    }

    async function handleSave() {
        if (!courseId || !moduleId || isSaving) return;
        setIsSaving(true);
        try {
            await saveModule(courseId, moduleId, moduleData);
            const now = new Date();
            setSavedAt(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="space-y-6">
            <TopBar
                backHref={`/admin/cours/${courseId}/editor/modules`}
                backLabel={
                    <span className="inline-flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Retour aux modules
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
                        <Badge>Module</Badge>
                    </div>
                }
            />

            <PageHeader label="Éditeur • Module" title={moduleTitle} description="Un module est une expérience autonome : cadre clair, intention lisible, geste guidé." />

            <Card>
                <CardHeader title="En-tête du module" subtitle="Badge • titre • texte d’introduction" />
                <CardBody className="space-y-4">
                    <Field label="Badge" hint="ex : Étape 1 · Retrouver le geste">
                        <IconInput icon={<Sparkles className="h-4 w-4" />}>
                            <input
                                placeholder="Badge"
                                value={moduleData.badgeLabel ?? ''}
                                onChange={(event) => updateModule('badgeLabel', event.target.value)}
                                className={inputWithIcon}
                            />
                        </IconInput>
                    </Field>

                    <Field label="Titre" required>
                        <IconInput icon={<Pencil className="h-4 w-4" />}>
                            <input
                                placeholder="Titre du module"
                                value={moduleData.title}
                                onChange={(event) => updateModule('title', event.target.value)}
                                className={inputWithIcon}
                            />
                        </IconInput>
                    </Field>

                    <Field label="Texte d’introduction" hint="contexte, posture, intention">
                        <textarea
                            placeholder="Texte d’introduction du module"
                            value={moduleData.description ?? ''}
                            onChange={(event) => updateModule('description', event.target.value)}
                            className={cx(textareaBase, 'min-h-32')}
                        />
                    </Field>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Vidéo du module" subtitle="Démonstration ou guidage" />
                <CardBody className="space-y-4">
                    <Field label="Titre de la vidéo">
                        <IconInput icon={<Video className="h-4 w-4" />}>
                            <input
                                placeholder="Titre de la vidéo"
                                value={moduleData.video?.title ?? ''}
                                onChange={(event) => updateVideo({ title: event.target.value })}
                                className={inputWithIcon}
                            />
                        </IconInput>
                    </Field>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <Field label="YouTube ID">
                            <input
                                placeholder="Identifiant YouTube"
                                value={moduleData.video?.youtubeId ?? ''}
                                onChange={(event) => updateVideo({ youtubeId: event.target.value })}
                                className={inputBase}
                            />
                        </Field>
                        <Field label="Cover (optionnel)">
                            <input
                                placeholder="/images/module-cover.jpg"
                                value={moduleData.video?.cover ?? ''}
                                onChange={(event) => updateVideo({ cover: event.target.value })}
                                className={inputBase}
                            />
                        </Field>
                    </div>

                    <Field label="Texte d’accompagnement">
                        <textarea
                            placeholder="Texte d’accompagnement"
                            value={moduleData.video?.description ?? ''}
                            onChange={(event) => updateVideo({ description: event.target.value })}
                            className={cx(textareaBase, 'min-h-24')}
                        />
                    </Field>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Matériel recommandé" subtitle="Simple, rassurant" />
                <CardBody className="space-y-4">
                    <Field label="Titre de section">
                        <input
                            placeholder="Titre de la section"
                            value={moduleData.material?.title ?? ''}
                            onChange={(event) => updateMaterial({ title: event.target.value })}
                            className={inputBase}
                        />
                    </Field>

                    <div className="space-y-3">
                        {(moduleData.material?.items ?? []).map((item, index) => (
                            <div key={`material-${index}`} className="flex items-center gap-2">
                                <input value={item} onChange={(event) => updateMaterialItem(index, event.target.value)} className={inputBase} />
                                <button
                                    type="button"
                                    onClick={() => removeMaterialItem(index)}
                                    className="inline-flex items-center justify-center rounded-full border border-perl/70 bg-white p-2 text-main/70 hover:bg-page"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addMaterialItem}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <Plus className="h-4 w-4" />
                            Ajouter du matériel
                        </button>

                        <textarea
                            placeholder="Note rassurante (optionnel)"
                            value={moduleData.material?.note ?? ''}
                            onChange={(event) => updateMaterial({ note: event.target.value })}
                            className={cx(textareaBase, 'min-h-11')}
                        />
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Intention pédagogique" subtitle="Ce qui compte vraiment" />
                <CardBody className="space-y-4">
                    <Field label="Titre de section">
                        <input
                            placeholder="Titre de la section"
                            value={moduleData.intention?.title ?? ''}
                            onChange={(event) => updateIntentionTitle(event.target.value)}
                            className={inputBase}
                        />
                    </Field>

                    <div className="space-y-3">
                        {(moduleData.intention?.items ?? []).map((item, index) => (
                            <div key={`intention-${index}`} className="flex items-center gap-2">
                                <input value={item} onChange={(event) => updateIntentionItem(index, event.target.value)} className={inputBase} />
                                <button
                                    type="button"
                                    onClick={() => removeIntentionItem(index)}
                                    className="inline-flex items-center justify-center rounded-full border border-perl/70 bg-white p-2 text-main/70 hover:bg-page"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addIntentionItem}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            Ajouter une intention
                        </button>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Exercice guidé" subtitle="Pas à pas" />
                <CardBody className="space-y-4">
                    <Field label="Titre de section">
                        <input
                            placeholder="Titre de la section"
                            value={moduleData.exercise?.title ?? ''}
                            onChange={(event) => updateExercise({ title: event.target.value })}
                            className={inputBase}
                        />
                    </Field>

                    <Field label="Description" hint="Optionnel">
                        <textarea
                            placeholder="Quelques lignes pour cadrer l’exercice"
                            value={moduleData.exercise?.description ?? ''}
                            onChange={(event) => updateExercise({ description: event.target.value })}
                            className={cx(textareaBase, 'min-h-24')}
                        />
                    </Field>

                    <div className="space-y-3">
                        {(moduleData.exercise?.steps ?? []).map((step, index) => (
                            <div key={`exercise-${index}`} className="flex items-center gap-2">
                                <input value={step} onChange={(event) => updateExerciseStep(index, event.target.value)} className={inputBase} />
                                <button
                                    type="button"
                                    onClick={() => removeExerciseStep(index)}
                                    className="inline-flex items-center justify-center rounded-full border border-perl/70 bg-white p-2 text-main/70 hover:bg-page"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addExerciseStep}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <Compass className="h-4 w-4" />
                            Ajouter une étape
                        </button>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Sections optionnelles" subtitle="Conseils, rappels doux, tips" />
                <CardBody className="space-y-4">
                    {(moduleData.extraSections ?? []).map((section, index) => (
                        <div key={`extra-${index}`} className="rounded-2xl border border-perl/60 bg-page/40 p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <p className="text-xs uppercase tracking-[0.18em] text-main/55">Section {index + 1}</p>
                                <button
                                    type="button"
                                    onClick={() => removeExtraSection(index)}
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-rose hover:text-rose/80"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Supprimer
                                </button>
                            </div>

                            <input
                                placeholder="Titre de la section"
                                value={section.title ?? ''}
                                onChange={(event) => updateExtraSection(index, { title: event.target.value })}
                                className={inputBase}
                            />

                            <textarea
                                placeholder="Description courte (optionnel)"
                                value={section.description ?? ''}
                                onChange={(event) => updateExtraSection(index, { description: event.target.value })}
                                className={cx(textareaBase, 'min-h-20')}
                            />

                            <div className="space-y-2">
                                {(section.items ?? []).map((item, itemIndex) => (
                                    <div key={`extra-item-${itemIndex}`} className="flex items-center gap-2">
                                        <input value={item} onChange={(event) => updateExtraItem(index, itemIndex, event.target.value)} className={inputBase} />
                                        <button
                                            type="button"
                                            onClick={() => removeExtraItem(index, itemIndex)}
                                            className="inline-flex items-center justify-center rounded-full border border-perl/70 bg-white p-2 text-main/70 hover:bg-page"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => addExtraItem(index)}
                                    className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                                >
                                    <Plus className="h-4 w-4" />
                                    Ajouter une ligne
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addExtraSection}
                        className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                    >
                        <Plus className="h-4 w-4" />
                        Ajouter une section
                    </button>
                </CardBody>
            </Card>

            <CourseWizardFooter
                backHref={`/admin/cours/${courseId}/editor/modules`}
                hubHref={`/admin/cours/${courseId}`}
                onSave={handleSave}
                continueHref={`/admin/cours/${courseId}/editor/conclusion`}
                continueLabel="Continuer (conclusion)"
                isSaving={isSaving}
            />

            {savedAt && <p className="text-xs text-main/60">Dernière sauvegarde à {savedAt}</p>}
        </div>
    );
}
