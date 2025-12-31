// src/app/(admin)/admin/cours/[courseId]/setup/structure/page.tsx
'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Plus, GripVertical, ArrowUp, ArrowDown, Trash2, Clock, Layers, BookOpen, Flag, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';
import { CourseWizardFooter } from '@/components/admin/courses/CourseWizardFooter';
import { updateCourseStructure } from '@/lib/actions/courseSetup';
import type { CourseModuleData, CourseStructureData } from '@/types/courseSetup';

function uid() {
    return crypto.randomUUID();
}

function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
    return <span className={cx('rounded-full border px-3 py-1 text-[11px] font-semibold', className)}>{children}</span>;
}

function Field({ label, hint, required, children, error }: { label: string; hint?: string; required?: boolean; children: React.ReactNode; error?: string | null }) {
    return (
        <div className="space-y-2 min-w-0">
            <div className="flex items-end justify-between gap-3">
                <label className="text-xs font-semibold text-main/75">
                    {label} {required ? <span className="text-rose">*</span> : null}
                </label>
                {hint ? <span className="text-[11px] text-main/50">{hint}</span> : null}
            </div>
            {children}
            {error ? (
                <p className="text-xs text-rose inline-flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" />
                    {error}
                </p>
            ) : null}
        </div>
    );
}

function MiniTip({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-3xl border border-perl/60 bg-page/40 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-main/55 inline-flex items-center gap-2">
                <Info className="h-4 w-4" />
                Conseil UX
            </p>
            <p className="mt-2 text-sm text-main/70">{children}</p>
        </div>
    );
}

function RowButton({
    onClick,
    disabled,
    icon,
    label,
    tone = 'neutral',
}: {
    onClick: () => void;
    disabled?: boolean;
    icon: React.ReactNode;
    label: string;
    tone?: 'neutral' | 'danger';
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={cx(
                'inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition active:scale-[0.99]',
                disabled
                    ? 'border-perl/60 bg-page text-main/40 cursor-not-allowed'
                    : tone === 'danger'
                    ? 'border-rose/40 bg-rose/5 text-rose hover:bg-rose/10 cursor-pointer'
                    : 'border-perl/70 bg-white text-main/80 hover:bg-page cursor-pointer'
            )}
        >
            {icon}
            {label}
        </button>
    );
}

interface SetupStructureClientProps {
    courseId: string;
    initialStructure: CourseStructureData;
}

export default function SetupStructureClient({ courseId, initialStructure }: SetupStructureClientProps) {
    const router = useRouter();

    const [introMinutes, setIntroMinutes] = useState(initialStructure.introMinutes);
    const [conclusionMinutes, setConclusionMinutes] = useState(initialStructure.conclusionMinutes);

    const [modules, setModules] = useState<CourseModuleData[]>(
        initialStructure.modules.length
            ? initialStructure.modules
            : [
                  { id: uid(), title: 'Module 1 — Bases', goal: 'Poser les repères essentiels.', minutes: 12 },
                  { id: uid(), title: 'Module 2 — Application', goal: 'Mettre en pratique sur un exercice guidé.', minutes: 15 },
                  { id: uid(), title: 'Module 3 — Mini défi', goal: 'Consolider avec un défi court.', minutes: 10 },
              ]
    );

    const [submitting, setSubmitting] = useState(false);
    const [savedAt, setSavedAt] = useState<string | null>(null);

    const errors = useMemo(() => {
        const e: Record<string, string | null> = {};
        e.introMinutes = introMinutes < 2 ? 'Intro trop courte (min. 2 min).' : introMinutes > 25 ? 'Intro trop longue (max. 25 min).' : null;
        e.conclusionMinutes = conclusionMinutes < 2 ? 'Conclusion trop courte (min. 2 min).' : conclusionMinutes > 25 ? 'Conclusion trop longue (max. 25 min).' : null;

        if (modules.length < 1) e.modules = 'Ajoute au moins 1 module.';
        else {
            const badTitle = modules.some((m) => m.title.trim().length < 3);
            const badGoal = modules.some((m) => m.goal.trim().length < 8);
            const badTime = modules.some((m) => !Number.isFinite(m.minutes) || m.minutes < 3 || m.minutes > 90);
            e.modules = badTitle
                ? 'Chaque module doit avoir un titre (min. 3 caractères).'
                : badGoal
                ? 'Chaque module doit avoir un objectif clair (min. ~8 caractères).'
                : badTime
                ? 'Durée module : entre 3 et 90 minutes.'
                : null;
        }
        return e;
    }, [introMinutes, conclusionMinutes, modules]);

    const canContinue = useMemo(() => !errors.introMinutes && !errors.conclusionMinutes && !errors.modules, [errors]);

    const totalMinutes = useMemo(
        () => modules.reduce((acc, m) => acc + (Number.isFinite(m.minutes) ? m.minutes : 0), 0) + introMinutes + conclusionMinutes,
        [modules, introMinutes, conclusionMinutes]
    );
    const totalLabel = useMemo(() => (totalMinutes < 45 ? 'Court' : totalMinutes < 90 ? 'Moyen' : 'Long'), [totalMinutes]);

    function updateModule(id: string, patch: Partial<CourseModuleData>) {
        setModules((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
    }
    function addModule() {
        setModules((prev) => [...prev, { id: uid(), title: `Module ${prev.length + 1} — Nouveau`, goal: 'Décris le but pédagogique en une phrase.', minutes: 12 }]);
    }
    function removeModule(id: string) {
        setModules((prev) => prev.filter((m) => m.id !== id));
    }
    function moveModule(id: string, dir: 'up' | 'down') {
        setModules((prev) => {
            const i = prev.findIndex((m) => m.id === id);
            if (i === -1) return prev;
            const j = dir === 'up' ? i - 1 : i + 1;
            if (j < 0 || j >= prev.length) return prev;
            const next = [...prev];
            [next[i], next[j]] = [next[j], next[i]];
            return next;
        });
    }

    async function saveDraft() {
        if (submitting) return;
        setSubmitting(true);
        try {
            await updateCourseStructure(courseId, { introMinutes, modules, conclusionMinutes });
            const now = new Date();
            setSavedAt(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
        } finally {
            setSubmitting(false);
        }
    }

    async function saveAndContinue() {
        if (!canContinue || submitting) return;
        await saveDraft();
        router.push(`/admin/cours/${courseId}/setup/access`);
    }

    return (
        <div className="space-y-6">
            <TopBar
                backHref={`/admin/cours/${courseId}/setup/intent`}
                backLabel={
                    <span className="inline-flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Retour (intention)
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
                        <Badge>Setup • Étape 2</Badge>
                    </div>
                }
            />

            <PageHeader
                label="Étape 2"
                title="Structure du cours"
                description={
                    <>
                        On transforme l’intention en plan : <span className="font-semibold text-main">Intro → Modules → Conclusion</span>. (Conclusion intégrée ✅)
                    </>
                }
            />

            <Card>
                <CardHeader
                    title="Plan"
                    subtitle={
                        <span className="inline-flex flex-wrap items-center gap-2">
                            <Pill className="border-perl/60 bg-white text-main/70">
                                <span className="inline-flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5" />
                                    {totalMinutes} min • {totalLabel}
                                </span>
                            </Pill>
                            <Pill className="border-perl/60 bg-white text-main/70">
                                <span className="inline-flex items-center gap-1.5">
                                    <Layers className="h-3.5 w-3.5" />
                                    {modules.length} module{modules.length > 1 ? 's' : ''}
                                </span>
                            </Pill>
                            <Pill className="border-sage/40 bg-sage/10 text-sage">
                                <span className="inline-flex items-center gap-1.5">
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    Conclusion incluse
                                </span>
                            </Pill>
                        </span>
                    }
                    right={
                        <div className="flex items-center gap-2">
                            {savedAt ? (
                                <span className="rounded-full border border-perl/60 bg-white px-3 py-1 text-[11px] font-semibold text-main/70">Sauvegardé • {savedAt}</span>
                            ) : (
                                <span className="rounded-full border border-perl/60 bg-white px-3 py-1 text-[11px] font-semibold text-main/60">Non sauvegardé</span>
                            )}
                        </div>
                    }
                />

                <CardBody>
                    {/* ⬇️ ton contenu existant (quasi inchangé) */}
                    <div className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl border border-perl/60 bg-white p-4 sm:p-5 space-y-3">
                                <p className="text-xs uppercase tracking-[0.18em] text-main/50 inline-flex items-center gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    Intro (obligatoire)
                                </p>

                                <Field label="Durée estimée" hint="2–25 min" required error={errors.introMinutes}>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            min={2}
                                            max={25}
                                            value={introMinutes}
                                            onChange={(e) => setIntroMinutes(Number(e.target.value))}
                                            className={cx(
                                                'h-12 w-full rounded-2xl border border-perl/70 bg-white px-4 text-sm font-semibold text-main/80 outline-none transition',
                                                'hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10'
                                            )}
                                        />
                                        <span className="text-sm text-main/60 shrink-0">min</span>
                                    </div>
                                </Field>

                                <p className="text-xs text-main/55">Objectif : cadrer, rassurer, donner la méthode et annoncer le parcours.</p>
                            </div>

                            <div className="rounded-3xl border border-perl/60 bg-white p-4 sm:p-5 space-y-3">
                                <p className="text-xs uppercase tracking-[0.18em] text-main/50 inline-flex items-center gap-2">
                                    <Flag className="h-4 w-4" />
                                    Conclusion (obligatoire)
                                </p>

                                <Field label="Durée estimée" hint="2–25 min" required error={errors.conclusionMinutes}>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            min={2}
                                            max={25}
                                            value={conclusionMinutes}
                                            onChange={(e) => setConclusionMinutes(Number(e.target.value))}
                                            className={cx(
                                                'h-12 w-full rounded-2xl border border-perl/70 bg-white px-4 text-sm font-semibold text-main/80 outline-none transition',
                                                'hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10'
                                            )}
                                        />
                                        <span className="text-sm text-main/60 shrink-0">min</span>
                                    </div>
                                </Field>

                                <p className="text-xs text-main/55">Objectif : synthèse + “prochain pas” + mini défi / checklist.</p>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-perl/60 bg-white p-4 sm:p-5 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.18em] text-main/50">Modules</p>
                                    <p className="mt-1 text-sm text-main/70">Découpe le cours en étapes digestes. 8–20 min par module = très confortable.</p>
                                </div>

                                <button
                                    type="button"
                                    onClick={addModule}
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-sm font-semibold text-main/80 hover:bg-page transition cursor-pointer active:scale-[0.99]"
                                >
                                    <Plus className="h-4 w-4" />
                                    Ajouter un module
                                </button>
                            </div>

                            {errors.modules ? (
                                <div className="rounded-3xl border border-rose/40 bg-rose/5 p-4">
                                    <p className="text-sm font-semibold text-main inline-flex items-center gap-2">
                                        <AlertTriangle className="h-4 w-4 text-rose" />
                                        {errors.modules}
                                    </p>
                                </div>
                            ) : null}

                            <div className="space-y-3">
                                {modules.map((m, idx) => (
                                    <div key={m.id} className="rounded-3xl border border-perl/60 bg-page/30 p-4 sm:p-5">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0 flex items-center gap-2">
                                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-perl/60 bg-white">
                                                        <GripVertical className="h-5 w-5 text-main/45" />
                                                    </span>

                                                    <div className="min-w-0">
                                                        <p className="text-[11px] uppercase tracking-[0.18em] text-main/50">Module {idx + 1}</p>
                                                        <p className="text-sm text-main/70">Titre, objectif, durée</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap items-center justify-end gap-2">
                                                    <RowButton onClick={() => moveModule(m.id, 'up')} disabled={idx === 0} icon={<ArrowUp className="h-4 w-4" />} label="Monter" />
                                                    <RowButton
                                                        onClick={() => moveModule(m.id, 'down')}
                                                        disabled={idx === modules.length - 1}
                                                        icon={<ArrowDown className="h-4 w-4" />}
                                                        label="Descendre"
                                                    />
                                                    <RowButton
                                                        onClick={() => removeModule(m.id)}
                                                        disabled={modules.length <= 1}
                                                        icon={<Trash2 className="h-4 w-4" />}
                                                        label="Supprimer"
                                                        tone="danger"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid gap-3 sm:grid-cols-[1fr_160px]">
                                                <div className="min-w-0">
                                                    <Field label="Titre du module" required hint="court & clair">
                                                        <input
                                                            value={m.title}
                                                            onChange={(e) => updateModule(m.id, { title: e.target.value })}
                                                            className={cx(
                                                                'h-12 w-full rounded-2xl border border-perl/70 bg-white px-4 text-sm font-semibold text-main/80 outline-none transition',
                                                                'hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10'
                                                            )}
                                                            placeholder="Ex : Dominante & couleur d’accent"
                                                        />
                                                    </Field>
                                                </div>

                                                <div>
                                                    <Field label="Durée" required hint="3–90 min">
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="number"
                                                                min={3}
                                                                max={90}
                                                                value={m.minutes}
                                                                onChange={(e) => updateModule(m.id, { minutes: Number(e.target.value) })}
                                                                className={cx(
                                                                    'h-12 w-full rounded-2xl border border-perl/70 bg-white px-4 text-sm font-semibold text-main/80 outline-none transition',
                                                                    'hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10'
                                                                )}
                                                            />
                                                            <span className="text-sm text-main/60 shrink-0">min</span>
                                                        </div>
                                                    </Field>
                                                </div>
                                            </div>

                                            <Field label="Objectif pédagogique" required hint="1 phrase actionnable">
                                                <textarea
                                                    value={m.goal}
                                                    onChange={(e) => updateModule(m.id, { goal: e.target.value })}
                                                    className={cx(
                                                        'min-h-[86px] w-full resize-none rounded-2xl border border-perl/70 bg-white px-4 py-3 text-sm text-main outline-none transition',
                                                        'hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10'
                                                    )}
                                                    placeholder="Ex : Savoir repérer une dominante et choisir une couleur d’accent qui fonctionne."
                                                />
                                            </Field>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <MiniTip>Règle simple : 1 module = 1 compétence. Si tu as 2 idées dans un module, découpe → meilleure progression + meilleure rétention.</MiniTip>

                        {!canContinue ? (
                            <div className="rounded-3xl border border-perl/60 bg-white/80 p-4">
                                <p className="text-xs uppercase tracking-[0.18em] text-main/55">Pour continuer</p>
                                <ul className="mt-2 space-y-1 text-sm text-main/70 list-disc pl-5">
                                    {errors.introMinutes ? <li>Corrige la durée de l’intro (2–25 min).</li> : null}
                                    {errors.modules ? <li>Corrige les modules (titre, objectif, durée).</li> : null}
                                    {errors.conclusionMinutes ? <li>Corrige la durée de la conclusion (2–25 min).</li> : null}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </CardBody>
            </Card>
            <CourseWizardFooter
                backHref={`/admin/cours/${courseId}/setup/intent`}
                hubHref={`/admin/cours/${courseId}`}
                onSave={saveDraft}
                onContinue={saveAndContinue}
                disableContinue={!canContinue}
                isSaving={submitting}
            />
        </div>
    );
}
