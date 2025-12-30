// src/app/(admin)/admin/cours/[courseId]/setup/intent/page.tsx
'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Target, Users, CheckCircle2, AlertTriangle, BookOpenCheck, Sparkles, Save, Info, X } from 'lucide-react';
import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';
import { updateCourseIntent } from '@/lib/actions/courseSetup';
import type { CourseIntentData, TeachingStyle, Tone } from '@/types/courseSetup';

function Field({ label, hint, required, children, error }: { label: string; hint?: string; required?: boolean; children: React.ReactNode; error?: string | null }) {
    return (
        <div className="space-y-2">
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

function Chip({ active, onClick, icon, label, tone = 'neutral' }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; tone?: 'neutral' | 'good' }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cx(
                'inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition cursor-pointer active:scale-[0.99]',
                active
                    ? tone === 'good'
                        ? 'border-sage/50 bg-sage/10 text-sage shadow-sm'
                        : 'border-main/40 bg-main/5 text-main shadow-sm'
                    : 'border-perl/70 bg-white text-main/70 hover:bg-page'
            )}
        >
            {icon}
            {label}
        </button>
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

interface SetupIntentClientProps {
    courseId: string;
    initialIntent: CourseIntentData;
}

export default function SetupIntentClient({ courseId, initialIntent }: SetupIntentClientProps) {
    const router = useRouter();

    const [promise, setPromise] = useState(initialIntent.promise);
    const [outcomes, setOutcomes] = useState<string[]>(initialIntent.outcomes);
    const [audience, setAudience] = useState(initialIntent.audience);
    const [notFor, setNotFor] = useState(initialIntent.notFor);
    const [prerequisites, setPrerequisites] = useState(initialIntent.prerequisites);
    const [teachingStyle, setTeachingStyle] = useState<TeachingStyle>(initialIntent.teachingStyle);
    const [tone, setTone] = useState<Tone>(initialIntent.tone);
    const [hasConclusion] = useState(true); // chez toi : non optionnel ✅

    const [submitting, setSubmitting] = useState(false);
    const [savedAt, setSavedAt] = useState<string | null>(null);

    const errors = useMemo(() => {
        const e: Record<string, string | null> = {};
        e.promise = promise.trim().length < 12 ? 'Écris une phrase claire (min. ~12 caractères).' : null;

        const filledOutcomes = outcomes.map((o) => o.trim()).filter(Boolean);
        e.outcomes = filledOutcomes.length < 2 ? 'Ajoute au moins 2 acquis concrets (idéalement 3).' : null;

        e.audience = audience.trim().length < 8 ? 'Décris ton public (min. ~8 caractères).' : null;
        return e;
    }, [promise, outcomes, audience]);

    const canContinue = useMemo(() => {
        return !errors.promise && !errors.outcomes && !errors.audience && hasConclusion;
    }, [errors, hasConclusion]);

    function updateOutcome(i: number, value: string) {
        setOutcomes((prev) => prev.map((v, idx) => (idx === i ? value : v)));
    }

    function addOutcome() {
        setOutcomes((prev) => [...prev, '']);
    }

    function removeOutcome(i: number) {
        setOutcomes((prev) => prev.filter((_, idx) => idx !== i));
    }

    async function saveDraft() {
        if (submitting) return;
        setSubmitting(true);
        try {
            await updateCourseIntent(courseId, { promise, outcomes, audience, notFor, prerequisites, teachingStyle, tone });
            const now = new Date();
            const hh = String(now.getHours()).padStart(2, '0');
            const mm = String(now.getMinutes()).padStart(2, '0');
            setSavedAt(`${hh}:${mm}`);
        } finally {
            setSubmitting(false);
        }
    }

    async function saveAndContinue() {
        if (!canContinue || submitting) return;
        await saveDraft();
        router.push(`/admin/cours/${courseId}/setup/structure`);
    }

    return (
        <div className="space-y-6">
            <TopBar
                backHref={`/admin/cours/${courseId}`}
                backLabel={
                    <span className="inline-flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Retour au HUB
                    </span>
                }
                right={
                    <div className="flex items-center gap-2">
                        <QuickLinks items={[{ href: '/admin/cours', label: 'Cours' }]} />
                        <Badge>Setup • Étape 1</Badge>
                    </div>
                }
            />

            <PageHeader
                label="Étape 1"
                title="Intention pédagogique"
                description="On clarifie la promesse, les acquis, et le public. Résultat : un cours cohérent et une page de vente facile à écrire."
            />

            <Card>
                <CardHeader
                    title="Cadrage"
                    subtitle="Ce que l’apprenant comprend avant même d’ouvrir l’intro."
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
                    <div className="space-y-6">
                        <Field label="Promesse du cours" required hint="1 phrase simple" error={errors.promise}>
                            <div className="relative">
                                <Target className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-main/45" />
                                <textarea
                                    value={promise}
                                    onChange={(e) => setPromise(e.target.value)}
                                    placeholder="Ex : À la fin, tu sauras créer 3 harmonies de couleurs simples et les appliquer dans un croquis."
                                    className={cx(
                                        'min-h-[92px] w-full resize-none rounded-2xl border border-perl/70 bg-white pl-10 pr-4 py-3 text-sm text-main outline-none transition',
                                        'hover:bg-page/50',
                                        'focus:border-main focus:ring-2 focus:ring-main/10'
                                    )}
                                />
                            </div>
                            <p className="text-xs text-main/55">Astuce : commence par “À la fin, tu sauras…”. On veut du concret.</p>
                        </Field>

                        <Field label="Acquis (learning outcomes)" required hint="2 minimum • 3 idéal" error={errors.outcomes}>
                            <div className="space-y-2">
                                {outcomes.map((o, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <CheckCircle2 className="mt-3 h-4 w-4 text-main/35 shrink-0" />
                                        <input
                                            value={o}
                                            onChange={(e) => updateOutcome(i, e.target.value)}
                                            placeholder={`Acquis ${i + 1} (ex : Identifier une dominante et choisir une couleur d’accent)`}
                                            className={cx(
                                                'w-full rounded-2xl border border-perl/70 bg-white px-4 py-3 text-sm text-main outline-none transition',
                                                'hover:bg-page/50',
                                                'focus:border-main focus:ring-2 focus:ring-main/10'
                                            )}
                                        />
                                        {outcomes.length > 3 ? (
                                            <button
                                                type="button"
                                                onClick={() => removeOutcome(i)}
                                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-perl/60 bg-white hover:bg-page transition cursor-pointer shrink-0"
                                                aria-label="Supprimer cet acquis"
                                            >
                                                <X className="h-4 w-4 text-main/60" />
                                            </button>
                                        ) : null}
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={addOutcome}
                                className="mt-2 inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page transition cursor-pointer"
                            >
                                <Sparkles className="h-4 w-4" />
                                Ajouter un acquis
                            </button>
                        </Field>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Pour qui ?" required hint="public cible" error={errors.audience}>
                                <div className="relative">
                                    <Users className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-main/45" />
                                    <textarea
                                        value={audience}
                                        onChange={(e) => setAudience(e.target.value)}
                                        placeholder="Ex : Débutants qui veulent comprendre la couleur sans jargon, avec des exercices courts."
                                        className={cx(
                                            'min-h-[110px] w-full resize-none rounded-2xl border border-perl/70 bg-white pl-10 pr-4 py-3 text-sm text-main outline-none transition',
                                            'hover:bg-page/50',
                                            'focus:border-main focus:ring-2 focus:ring-main/10'
                                        )}
                                    />
                                </div>
                            </Field>

                            <Field label="Pas pour qui ?" hint="optionnel (mais puissant)">
                                <textarea
                                    value={notFor}
                                    onChange={(e) => setNotFor(e.target.value)}
                                    placeholder="Ex : Si tu cherches un cours très académique avec théorie longue, ce n’est pas l’objectif ici."
                                    className={cx(
                                        'min-h-[110px] w-full resize-none rounded-2xl border border-perl/70 bg-white px-4 py-3 text-sm text-main outline-none transition',
                                        'hover:bg-page/50',
                                        'focus:border-main focus:ring-2 focus:ring-main/10'
                                    )}
                                />
                                <p className="text-xs text-main/55">Attentes claires = satisfaction plus haute.</p>
                            </Field>
                        </div>

                        <Field label="Pré-requis" hint="optionnel (0 = OK)">
                            <div className="relative">
                                <BookOpenCheck className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-main/45" />
                                <textarea
                                    value={prerequisites}
                                    onChange={(e) => setPrerequisites(e.target.value)}
                                    placeholder="Ex : Aucun. Juste de quoi prendre des notes + 3 couleurs (au choix)."
                                    className={cx(
                                        'min-h-[92px] w-full resize-none rounded-2xl border border-perl/70 bg-white pl-10 pr-4 py-3 text-sm text-main outline-none transition',
                                        'hover:bg-page/50',
                                        'focus:border-main focus:ring-2 focus:ring-main/10'
                                    )}
                                />
                            </div>
                        </Field>

                        <div className="rounded-3xl border border-perl/60 bg-white p-4 sm:p-5 space-y-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-main/50">Style pédagogique</p>
                            <div className="flex flex-wrap gap-2">
                                <Chip
                                    active={teachingStyle === 'guided'}
                                    onClick={() => setTeachingStyle('guided')}
                                    icon={<span className="h-2.5 w-2.5 rounded-full bg-main/30" />}
                                    label="Guidé (pas à pas)"
                                />
                                <Chip
                                    active={teachingStyle === 'practice'}
                                    onClick={() => setTeachingStyle('practice')}
                                    icon={<span className="h-2.5 w-2.5 rounded-full bg-main/30" />}
                                    label="Pratique (exercices)"
                                    tone="good"
                                />
                                <Chip
                                    active={teachingStyle === 'analysis'}
                                    onClick={() => setTeachingStyle('analysis')}
                                    icon={<span className="h-2.5 w-2.5 rounded-full bg-main/30" />}
                                    label="Analyse (lecture d’image)"
                                />
                            </div>
                            <p className="text-sm text-main/70">Ça guidera ta structure et la rédaction des modules.</p>
                        </div>

                        <div className="rounded-3xl border border-perl/60 bg-page/40 p-4">
                            <p className="text-xs uppercase tracking-[0.18em] text-main/55">Ton de narration</p>
                            <p className="mt-1 text-xs text-main/60">Pour garder la même “voix” sur tout le cours.</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <Chip
                                    active={tone === 'soft'}
                                    onClick={() => setTone('soft')}
                                    icon={<span className="h-2.5 w-2.5 rounded-full bg-main/30" />}
                                    label="Doux & rassurant"
                                />
                                <Chip
                                    active={tone === 'direct'}
                                    onClick={() => setTone('direct')}
                                    icon={<span className="h-2.5 w-2.5 rounded-full bg-main/30" />}
                                    label="Direct & clair"
                                />
                                <Chip
                                    active={tone === 'playful'}
                                    onClick={() => setTone('playful')}
                                    icon={<span className="h-2.5 w-2.5 rounded-full bg-main/30" />}
                                    label="Léger & fun"
                                />
                            </div>
                        </div>

                        <MiniTip>Si cette étape est solide, tu gagnes du temps partout : structure, intro, modules, conclusion, et même la page publique.</MiniTip>

                        <div className="pt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <Link
                                href={`/admin/cours/${courseId}`}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-5 py-2 text-sm font-semibold text-main/80 hover:bg-page transition cursor-pointer"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Retour au HUB
                            </Link>

                            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                                <button
                                    type="button"
                                    onClick={saveDraft}
                                    disabled={submitting}
                                    className={cx(
                                        'inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition',
                                        submitting ? 'border-perl/60 bg-page text-main/40 cursor-not-allowed' : 'border-perl/70 bg-white text-main/80 hover:bg-page cursor-pointer'
                                    )}
                                >
                                    <Save className="h-4 w-4" />
                                    Sauvegarder
                                </button>

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
                                    Continuer (structure)
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {!canContinue ? (
                            <div className="rounded-3xl border border-perl/60 bg-white/80 p-4">
                                <p className="text-xs uppercase tracking-[0.18em] text-main/55">Pour continuer</p>
                                <ul className="mt-2 space-y-1 text-sm text-main/70 list-disc pl-5">
                                    {errors.promise ? <li>Écris une promesse claire (une phrase).</li> : null}
                                    {errors.outcomes ? <li>Ajoute au moins 2 acquis concrets (idéalement 3).</li> : null}
                                    {errors.audience ? <li>Décris le public (pour qui ?).</li> : null}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
