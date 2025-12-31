'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft, Save, Compass, HeartHandshake, Link2, Trash2, Video, Sparkles, StickyNote } from 'lucide-react';

import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';
import { getConclusion, saveConclusion } from '@/lib/actions/courseContent';
import type { CourseConclusionData } from '@/types/courseContent';

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

const defaultConclusion: CourseConclusionData = {
    badgeLabel: '',
    title: '',
    description: '',
    video: {
        title: '',
        description: '',
        youtubeId: '',
        note: '',
        cover: '',
    },
    quickReview: { title: 'Faire le point', items: [] },
    personalPrompt: { title: 'Phrase intérieure', description: '' },
    softReminder: { title: 'Rappel doux', description: '' },
    continueAfter: { title: 'Continuer après le cours', items: [] },
    links: [],
};

function hydrateConclusion(data: CourseConclusionData | null): CourseConclusionData {
    if (!data) return defaultConclusion;

    return {
        ...defaultConclusion,
        ...data,
        video: { ...defaultConclusion.video, ...data.video },
        quickReview: { ...defaultConclusion.quickReview, ...data.quickReview, items: data.quickReview?.items ?? [] },
        personalPrompt: { ...defaultConclusion.personalPrompt, ...data.personalPrompt },
        softReminder: { ...defaultConclusion.softReminder, ...data.softReminder },
        continueAfter: { ...defaultConclusion.continueAfter, ...data.continueAfter, items: data.continueAfter?.items ?? [] },
        links: data.links ?? [],
    };
}

export default function EditorConclusionPage() {
    const { courseId } = useParams<{ courseId: string }>();

    const [conclusion, setConclusion] = useState<CourseConclusionData>(defaultConclusion);
    const [savedAt, setSavedAt] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!courseId) return;

        let mounted = true;
        getConclusion(courseId)
            .then((data) => {
                if (!mounted) return;
                setConclusion(hydrateConclusion(data));
            })
            .catch(() => {
                if (!mounted) return;
                setConclusion(defaultConclusion);
            });

        return () => {
            mounted = false;
        };
    }, [courseId]);

    function updateConclusion<K extends keyof CourseConclusionData>(key: K, value: CourseConclusionData[K]) {
        setConclusion((prev) => ({ ...prev, [key]: value }));
    }

    function updateList(section: 'quickReview' | 'continueAfter', index: number, value: string) {
        setConclusion((prev) => ({
            ...prev,
            [section]: {
                title: prev[section]?.title ?? '',
                items: (prev[section]?.items ?? []).map((item, i) => (i === index ? value : item)),
            },
        }));
    }

    function addListItem(section: 'quickReview' | 'continueAfter') {
        setConclusion((prev) => ({
            ...prev,
            [section]: {
                title: prev[section]?.title ?? '',
                items: [...(prev[section]?.items ?? []), ''],
            },
        }));
    }

    function removeListItem(section: 'quickReview' | 'continueAfter', index: number) {
        setConclusion((prev) => ({
            ...prev,
            [section]: {
                title: prev[section]?.title ?? '',
                items: (prev[section]?.items ?? []).filter((_, i) => i !== index),
            },
        }));
    }

    function updateLink(index: number, key: 'label' | 'href' | 'description', value: string) {
        setConclusion((prev) => {
            const links = prev.links ?? [];
            const next = links.map((link, i) => (i === index ? { ...link, [key]: value } : link));
            return { ...prev, links: next };
        });
    }

    function addLink() {
        setConclusion((prev) => ({
            ...prev,
            links: [...(prev.links ?? []), { label: '', description: '', href: '' }],
        }));
    }

    function removeLink(index: number) {
        setConclusion((prev) => ({
            ...prev,
            links: (prev.links ?? []).filter((_, i) => i !== index),
        }));
    }

    async function handleSave() {
        if (!courseId || isSaving) return;
        setIsSaving(true);
        try {
            await saveConclusion(courseId, conclusion);
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
                        <QuickLinks items={[{ href: `/admin/cours/${courseId}`, label: 'HUB' }]} />
                        <Badge>Éditeur • Conclusion</Badge>
                    </div>
                }
            />

            <PageHeader label="Éditeur • Clôture" title="Conclusion du cours" description="Un temps pour rassembler, rassurer et ouvrir la suite du chemin." />

            <Card>
                <CardHeader title="Message de conclusion" subtitle="Badge • titre • texte" />
                <CardBody className="space-y-4">
                    <Field label="Badge" hint="ex : Merci d’avoir suivi">
                        <IconInput icon={<Sparkles className="h-4 w-4" />}>
                            <input
                                placeholder="Badge"
                                value={conclusion.badgeLabel ?? ''}
                                onChange={(event) => updateConclusion('badgeLabel', event.target.value)}
                                className={inputWithIcon}
                            />
                        </IconInput>
                    </Field>

                    <Field label="Titre principal" required>
                        <IconInput icon={<HeartHandshake className="h-4 w-4" />}>
                            <input
                                placeholder="Titre de conclusion"
                                value={conclusion.title}
                                onChange={(event) => updateConclusion('title', event.target.value)}
                                className={inputWithIcon}
                            />
                        </IconInput>
                    </Field>

                    <Field label="Texte de clôture" hint="synthèse + ouverture">
                        <textarea
                            placeholder="Texte de clôture"
                            value={conclusion.description ?? ''}
                            onChange={(event) => updateConclusion('description', event.target.value)}
                            className={cx(textareaBase, 'min-h-32')}
                        />
                    </Field>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Vidéo de clôture" subtitle="Mot de la fin & ouverture" />
                <CardBody className="space-y-4">
                    <Field label="Titre de la vidéo">
                        <IconInput icon={<Video className="h-4 w-4" />}>
                            <input
                                placeholder="Titre de la vidéo"
                                value={conclusion.video?.title ?? ''}
                                onChange={(event) => updateConclusion('video', { ...conclusion.video, title: event.target.value })}
                                className={inputWithIcon}
                            />
                        </IconInput>
                    </Field>

                    <Field label="Texte d’accompagnement">
                        <textarea
                            placeholder="Texte d’accompagnement"
                            value={conclusion.video?.description ?? ''}
                            onChange={(event) => updateConclusion('video', { ...conclusion.video, description: event.target.value })}
                            className={textareaBase}
                        />
                    </Field>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <Field label="YouTube ID">
                            <input
                                placeholder="Identifiant YouTube"
                                value={conclusion.video?.youtubeId ?? ''}
                                onChange={(event) => updateConclusion('video', { ...conclusion.video, youtubeId: event.target.value })}
                                className={inputBase}
                            />
                        </Field>
                        <Field label="Cover (optionnel)">
                            <input
                                placeholder="/images/conclusion-cover.jpg"
                                value={conclusion.video?.cover ?? ''}
                                onChange={(event) => updateConclusion('video', { ...conclusion.video, cover: event.target.value })}
                                className={inputBase}
                            />
                        </Field>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Bilan rapide" subtitle="Ce que l’apprenant rassemble" />
                <CardBody className="space-y-4">
                    <Field label="Titre de section">
                        <input
                            placeholder="Titre de la section"
                            value={conclusion.quickReview?.title ?? ''}
                            onChange={(event) =>
                                updateConclusion('quickReview', { ...conclusion.quickReview, title: event.target.value, items: conclusion.quickReview?.items ?? [] })
                            }
                            className={inputBase}
                        />
                    </Field>

                    <div className="space-y-3">
                        {(conclusion.quickReview?.items ?? []).map((item, index) => (
                            <div key={`review-${index}`} className="flex items-center gap-2">
                                <input value={item} onChange={(event) => updateList('quickReview', index, event.target.value)} className={inputBase} />
                                <button
                                    type="button"
                                    onClick={() => removeListItem('quickReview', index)}
                                    className="inline-flex items-center justify-center rounded-full border border-perl/70 bg-white p-2 text-main/70 hover:bg-page"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => addListItem('quickReview')}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <Compass className="h-4 w-4" />
                            Ajouter un point
                        </button>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Phrase personnelle" subtitle="Intériorisation" />
                <CardBody className="space-y-4">
                    <Field label="Titre de section">
                        <input
                            placeholder="Titre de la section"
                            value={conclusion.personalPrompt?.title ?? ''}
                            onChange={(event) => updateConclusion('personalPrompt', { ...conclusion.personalPrompt, title: event.target.value })}
                            className={inputBase}
                        />
                    </Field>
                    <textarea
                        placeholder="Invite l’apprenant à formuler sa propre phrase clé"
                        value={conclusion.personalPrompt?.description ?? ''}
                        onChange={(event) => updateConclusion('personalPrompt', { ...conclusion.personalPrompt, description: event.target.value })}
                        className={cx(textareaBase, 'min-h-24')}
                    />
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Rappel doux" subtitle="Encouragement final" />
                <CardBody className="space-y-4">
                    <Field label="Titre de section">
                        <input
                            placeholder="Titre de la section"
                            value={conclusion.softReminder?.title ?? ''}
                            onChange={(event) => updateConclusion('softReminder', { ...conclusion.softReminder, title: event.target.value })}
                            className={inputBase}
                        />
                    </Field>
                    <textarea
                        placeholder="Petit rappel bienveillant"
                        value={conclusion.softReminder?.description ?? ''}
                        onChange={(event) => updateConclusion('softReminder', { ...conclusion.softReminder, description: event.target.value })}
                        className={cx(textareaBase, 'min-h-24')}
                    />
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Continuer après le cours" subtitle="Pistes & ressources" />
                <CardBody className="space-y-4">
                    <Field label="Titre de section">
                        <input
                            placeholder="Titre de la section"
                            value={conclusion.continueAfter?.title ?? ''}
                            onChange={(event) =>
                                updateConclusion('continueAfter', { ...conclusion.continueAfter, title: event.target.value, items: conclusion.continueAfter?.items ?? [] })
                            }
                            className={inputBase}
                        />
                    </Field>

                    <div className="space-y-3">
                        {(conclusion.continueAfter?.items ?? []).map((item, index) => (
                            <div key={`continue-${index}`} className="flex items-center gap-2">
                                <input value={item} onChange={(event) => updateList('continueAfter', index, event.target.value)} className={inputBase} />
                                <button
                                    type="button"
                                    onClick={() => removeListItem('continueAfter', index)}
                                    className="inline-flex items-center justify-center rounded-full border border-perl/70 bg-white p-2 text-main/70 hover:bg-page"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => addListItem('continueAfter')}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <HeartHandshake className="h-4 w-4" />
                            Ajouter une piste
                        </button>
                    </div>

                    <div className="space-y-3">
                        {(conclusion.links ?? []).map((link, index) => (
                            <div key={`link-${index}`} className="space-y-2 rounded-2xl border border-perl/60 bg-page/40 p-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs uppercase tracking-[0.18em] text-main/55">Lien {index + 1}</p>
                                    <button
                                        type="button"
                                        onClick={() => removeLink(index)}
                                        className="inline-flex items-center gap-1 text-xs font-semibold text-rose hover:text-rose/80"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Supprimer
                                    </button>
                                </div>
                                <div className="grid gap-2 sm:grid-cols-2">
                                    <IconInput icon={<Link2 className="h-4 w-4" />}>
                                        <input
                                            placeholder="Label"
                                            value={link.label}
                                            onChange={(event) => updateLink(index, 'label', event.target.value)}
                                            className={inputWithIcon}
                                        />
                                    </IconInput>
                                    <IconInput icon={<StickyNote className="h-4 w-4" />}>
                                        <input placeholder="URL" value={link.href} onChange={(event) => updateLink(index, 'href', event.target.value)} className={inputWithIcon} />
                                    </IconInput>
                                </div>
                                <textarea
                                    placeholder="Description (optionnel)"
                                    value={link.description ?? ''}
                                    onChange={(event) => updateLink(index, 'description', event.target.value)}
                                    className={textareaBase}
                                />
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addLink}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <Link2 className="h-4 w-4" />
                            Ajouter un lien
                        </button>
                    </div>
                </CardBody>
            </Card>

            <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className={cx(
                    'inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-5 py-2 text-sm font-semibold text-main/80 transition',
                    isSaving ? 'opacity-60 cursor-not-allowed' : 'hover:bg-page'
                )}
            >
                <Save className="h-4 w-4" />
                {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>

            {savedAt && <p className="text-xs text-main/60">Dernière sauvegarde à {savedAt}</p>}
        </div>
    );
}
