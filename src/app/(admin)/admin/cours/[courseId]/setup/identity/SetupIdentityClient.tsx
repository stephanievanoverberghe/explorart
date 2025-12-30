// src/app/(admin)/admin/cours/[courseId]/setup/identity/page.tsx
'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Sparkles, Tag, GraduationCap, LockOpen, Lock, Pin, ChevronDown, Save } from 'lucide-react';
import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';
import { updateCourseIdentity } from '@/lib/actions/courseSetup';
import type { CourseAccess, CourseIdentityData, CourseLevel, CoursePillar } from '@/types/courseSetup';

function pillarLabel(p: CoursePillar) {
    switch (p) {
        case 'dessin-peinture':
            return 'Dessin & Peinture';
        case 'comprendre-une-oeuvre':
            return 'Comprendre une œuvre';
        case 'histoire-de-l-art':
            return "Histoire de l'art";
        case 'histoires-d-artistes':
            return "Histoires d'artistes";
        case 'couleurs-harmonie':
            return 'Couleurs & harmonie';
        case 'inspirations':
            return 'Inspirations';
        case 'psychologie-de-l-art':
            return "Psychologie de l'art";
    }
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <div className="flex items-end justify-between gap-3">
                <label className="text-xs font-semibold text-main/75">{label}</label>
                {hint ? <span className="text-[11px] text-main/50">{hint}</span> : null}
            </div>
            {children}
        </div>
    );
}

function PrettySelect({ icon, value, onChange, children }: { icon: React.ReactNode; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronDown className="h-4 w-4 text-main/45" />
            </div>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={cx(
                    'h-12 w-full appearance-none rounded-2xl border border-perl/70 bg-white pl-10 pr-10 text-sm font-semibold text-main/80 outline-none transition',
                    'cursor-pointer hover:bg-page/60',
                    'focus:border-main focus:ring-2 focus:ring-main/10',
                    'active:scale-[0.99]'
                )}
            >
                {children}
            </select>
        </div>
    );
}

interface SetupIdentityClientProps {
    courseId: string;
    initialIdentity: CourseIdentityData;
}

export default function SetupIdentityClient({ courseId, initialIdentity }: SetupIdentityClientProps) {
    const router = useRouter();

    const [title, setTitle] = useState(initialIdentity.title);
    const [pillar, setPillar] = useState<CoursePillar>(initialIdentity.pillar);
    const [level, setLevel] = useState<CourseLevel>(initialIdentity.level);
    const [access, setAccess] = useState<CourseAccess>(initialIdentity.access);
    const [pinned, setPinned] = useState(initialIdentity.pinned);

    const [submitting, setSubmitting] = useState(false);
    const [savedAt, setSavedAt] = useState<string | null>(null);

    const canContinue = useMemo(() => title.trim().length >= 3, [title]);

    async function saveDraft() {
        if (submitting) return;
        setSubmitting(true);
        try {
            await updateCourseIdentity(courseId, { title, pillar, level, access, pinned });
            const now = new Date();
            setSavedAt(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
        } finally {
            setSubmitting(false);
        }
    }

    async function saveAndContinue() {
        if (!canContinue || submitting) return;
        await saveDraft();
        router.push(`/admin/cours/${courseId}/setup/intent`);
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
                        <Badge>Setup • Étape 0</Badge>
                    </div>
                }
            />

            <PageHeader
                label="Étape 0"
                title="Identité du cours"
                description={
                    <>
                        On pose le minimum (titre + tags). Ensuite : <span className="font-semibold text-main">intention pédagogique</span>.
                    </>
                }
            />

            <Card>
                <CardHeader
                    title="Identité"
                    subtitle="Titre • pilier • niveau • accès • mise en avant"
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
                        <Field label="Titre du cours *" hint="Min. 3 caractères">
                            <div className="relative">
                                <Sparkles className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-main/45" />
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Ex : Couleurs express : harmonies rapides"
                                    className={cx(
                                        'w-full rounded-2xl border border-perl/70 bg-white pl-10 pr-4 py-3 text-sm text-main outline-none transition',
                                        'hover:bg-page/50',
                                        'focus:border-main focus:ring-2 focus:ring-main/10'
                                    )}
                                />
                            </div>
                            <p className="text-xs text-main/55">Tu pourras le modifier ensuite, mais il sert de base au parcours.</p>
                        </Field>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Pilier *">
                                <PrettySelect value={pillar} onChange={(v) => setPillar(v as CoursePillar)} icon={<Tag className="h-4 w-4 text-main/45" />}>
                                    <option value="dessin-peinture">Dessin & Peinture</option>
                                    <option value="comprendre-une-oeuvre">Comprendre une œuvre</option>
                                    <option value="histoire-de-l-art">Histoire de l’art</option>
                                    <option value="histoires-d-artistes">Histoires d’artistes</option>
                                    <option value="couleurs-harmonie">Couleurs & harmonie</option>
                                    <option value="inspirations">Inspirations</option>
                                    <option value="psychologie-de-l-art">Psychologie de l’art</option>
                                </PrettySelect>
                            </Field>

                            <Field label="Niveau *">
                                <PrettySelect value={level} onChange={(v) => setLevel(v as CourseLevel)} icon={<GraduationCap className="h-4 w-4 text-main/45" />}>
                                    <option value="Débutant">Débutant</option>
                                    <option value="Intermédiaire">Intermédiaire</option>
                                    <option value="Avancé">Avancé</option>
                                    <option value="Tous niveaux">Tous niveaux</option>
                                </PrettySelect>
                            </Field>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl border border-perl/60 bg-page/40 p-4 space-y-3">
                                <p className="text-xs uppercase tracking-[0.18em] text-main/55">Accès</p>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setAccess('free')}
                                        className={cx(
                                            'flex-1 rounded-2xl border px-4 py-3 text-sm font-semibold transition cursor-pointer active:scale-[0.99]',
                                            access === 'free' ? 'border-sage/50 bg-sage/10 text-sage shadow-sm' : 'border-perl/70 bg-white text-main/70 hover:bg-page'
                                        )}
                                    >
                                        <span className="inline-flex items-center justify-center gap-2">
                                            <LockOpen className="h-4 w-4" />
                                            Gratuit
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setAccess('premium')}
                                        className={cx(
                                            'flex-1 rounded-2xl border px-4 py-3 text-sm font-semibold transition cursor-pointer active:scale-[0.99]',
                                            access === 'premium' ? 'border-main/40 bg-main/5 text-main shadow-sm' : 'border-perl/70 bg-white text-main/70 hover:bg-page'
                                        )}
                                    >
                                        <span className="inline-flex items-center justify-center gap-2">
                                            <Lock className="h-4 w-4" />
                                            Premium
                                        </span>
                                    </button>
                                </div>
                                <p className="text-xs text-main/55">On affinera plus tard dans “Accès & prix”.</p>
                            </div>

                            <div className="rounded-3xl border border-perl/60 bg-page/40 p-4 space-y-3">
                                <p className="text-xs uppercase tracking-[0.18em] text-main/55">Mise en avant</p>
                                <button
                                    type="button"
                                    onClick={() => setPinned((v) => !v)}
                                    className={cx(
                                        'w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition cursor-pointer active:scale-[0.99]',
                                        pinned ? 'border-sage/50 bg-sage/10 text-sage shadow-sm' : 'border-perl/70 bg-white text-main/70 hover:bg-page'
                                    )}
                                >
                                    <span className="inline-flex items-center justify-center gap-2">
                                        <Pin className="h-4 w-4" />
                                        {pinned ? 'Épinglé (actif)' : 'Épingler le cours'}
                                    </span>
                                </button>
                                <p className="text-xs text-main/55">Idéal pour “Commencer ici” ou les cours phares.</p>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-perl/60 bg-white p-4 sm:p-5">
                            <p className="text-xs uppercase tracking-[0.18em] text-main/50">Résumé</p>
                            <p className="mt-2 text-sm text-main">
                                <span className="font-semibold">{title.trim() || 'Titre…'}</span>
                                <span className="text-main/60">
                                    {' '}
                                    — {pillarLabel(pillar)} • {level} • {access === 'free' ? 'Gratuit' : 'Premium'}
                                    {pinned ? ' • Épinglé' : ''}
                                </span>
                            </p>
                        </div>

                        <div className="pt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <Link
                                href={`/admin/cours/${courseId}`}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-5 py-2 text-sm font-semibold text-main/80 hover:bg-page transition cursor-pointer"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Retour au HUB
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
                                Continuer (intention)
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
