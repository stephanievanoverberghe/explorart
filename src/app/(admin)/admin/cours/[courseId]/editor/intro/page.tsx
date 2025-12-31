'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Save, Sparkles, Video, CheckCircle2, HeartHandshake, Compass, Download, Link2, Trash2, Plus, StickyNote } from 'lucide-react';

import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';
import { getIntro, saveIntro } from '@/lib/actions/courseContent';
import type { CourseIntroData, CourseIntroVideo, CourseIntroSectionList, CourseIntroDownload } from '@/types/courseContent';

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

/** Factories (évite title?: string) */
const makeVideo = (partial?: Partial<CourseIntroVideo>): CourseIntroVideo => ({
    title: partial?.title ?? '',
    description: partial?.description ?? '',
    note: partial?.note ?? '',
    youtubeId: partial?.youtubeId ?? '',
    cover: partial?.cover ?? '',
});

const makeSection = (fallbackTitle: string, partial?: Partial<CourseIntroSectionList>): CourseIntroSectionList => ({
    title: partial?.title ?? fallbackTitle,
    items: partial?.items ?? [],
});

const defaultIntro: CourseIntroData = {
    badgeLabel: '',
    title: '',
    description: '',
    video: makeVideo(),
    whatYouWillExperience: makeSection('Ce que tu vas vivre'),
    whoItsFor: makeSection('Ce cours est pour toi si…'),
    downloads: [],
    howToFollow: makeSection('Comment suivre ce cours'),
    material: { title: 'Matériel recommandé', items: [], note: '', highlighted: true },
    notes: '',
};

function hydrateIntro(data: CourseIntroData | null): CourseIntroData {
    if (!data) return defaultIntro;

    return {
        badgeLabel: data.badgeLabel ?? '',
        title: data.title ?? '',
        description: data.description ?? '',
        video: makeVideo(data.video),
        whatYouWillExperience: makeSection('Ce que tu vas vivre', data.whatYouWillExperience),
        whoItsFor: makeSection('Ce cours est pour toi si…', data.whoItsFor),
        howToFollow: makeSection('Comment suivre ce cours', data.howToFollow),
        downloads: data.downloads ?? [],
        material: {
            title: data.material?.title ?? defaultIntro.material!.title,
            items: data.material?.items ?? [],
            note: data.material?.note ?? '',
            highlighted: data.material?.highlighted ?? true,
        },
        notes: data.notes ?? '',
    };
}

export default function EditorIntroPage() {
    const router = useRouter();
    const { courseId } = useParams<{ courseId: string }>();

    const [intro, setIntro] = useState<CourseIntroData>(defaultIntro);
    const [savedAt, setSavedAt] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const sectionTitles = useMemo(
        () => ({
            experience: intro.whatYouWillExperience?.title ?? '',
            audience: intro.whoItsFor?.title ?? '',
            howToFollow: intro.howToFollow?.title ?? '',
        }),
        [intro.howToFollow?.title, intro.whatYouWillExperience?.title, intro.whoItsFor?.title]
    );

    useEffect(() => {
        if (!courseId) return;

        let mounted = true;
        getIntro(courseId)
            .then((data) => {
                if (!mounted) return;
                setIntro(hydrateIntro(data));
            })
            .catch(() => {
                if (!mounted) return;
                setIntro(defaultIntro);
            });

        return () => {
            mounted = false;
        };
    }, [courseId]);

    function updateIntro<K extends keyof CourseIntroData>(key: K, value: CourseIntroData[K]) {
        setIntro((prev) => ({ ...prev, [key]: value }));
    }

    function updateVideo(patch: Partial<CourseIntroVideo>) {
        setIntro((prev) => ({
            ...prev,
            video: makeVideo({ ...prev.video, ...patch }),
        }));
    }

    function updateSectionTitle(section: 'whatYouWillExperience' | 'whoItsFor' | 'howToFollow', title: string) {
        setIntro((prev) => ({
            ...prev,
            [section]: makeSection(
                section === 'whatYouWillExperience' ? 'Ce que tu vas vivre' : section === 'whoItsFor' ? 'Ce cours est pour toi si…' : 'Comment suivre ce cours',
                { ...prev[section], title }
            ),
        }));
    }

    function updateList(section: 'whatYouWillExperience' | 'whoItsFor' | 'howToFollow', index: number, value: string) {
        setIntro((prev) => {
            const current =
                prev[section] ??
                makeSection(section === 'whatYouWillExperience' ? 'Ce que tu vas vivre' : section === 'whoItsFor' ? 'Ce cours est pour toi si…' : 'Comment suivre ce cours');

            const items = current.items.map((item, i) => (i === index ? value : item));
            return { ...prev, [section]: { ...current, items } };
        });
    }

    function addListItem(section: 'whatYouWillExperience' | 'whoItsFor' | 'howToFollow') {
        setIntro((prev) => {
            const current =
                prev[section] ??
                makeSection(section === 'whatYouWillExperience' ? 'Ce que tu vas vivre' : section === 'whoItsFor' ? 'Ce cours est pour toi si…' : 'Comment suivre ce cours');

            return { ...prev, [section]: { ...current, items: [...current.items, ''] } };
        });
    }

    function removeListItem(section: 'whatYouWillExperience' | 'whoItsFor' | 'howToFollow', index: number) {
        setIntro((prev) => {
            const current =
                prev[section] ??
                makeSection(section === 'whatYouWillExperience' ? 'Ce que tu vas vivre' : section === 'whoItsFor' ? 'Ce cours est pour toi si…' : 'Comment suivre ce cours');

            return { ...prev, [section]: { ...current, items: current.items.filter((_, i) => i !== index) } };
        });
    }

    function updateMaterialItem(index: number, value: string) {
        setIntro((prev) => ({
            ...prev,
            material: {
                title: prev.material?.title ?? defaultIntro.material!.title,
                note: prev.material?.note ?? '',
                highlighted: prev.material?.highlighted ?? true,
                items: (prev.material?.items ?? []).map((item, i) => (i === index ? value : item)),
            },
        }));
    }

    function addMaterialItem() {
        setIntro((prev) => ({
            ...prev,
            material: {
                title: prev.material?.title ?? defaultIntro.material!.title,
                note: prev.material?.note ?? '',
                highlighted: prev.material?.highlighted ?? true,
                items: [...(prev.material?.items ?? []), ''],
            },
        }));
    }

    function removeMaterialItem(index: number) {
        setIntro((prev) => ({
            ...prev,
            material: {
                title: prev.material?.title ?? defaultIntro.material!.title,
                note: prev.material?.note ?? '',
                highlighted: prev.material?.highlighted ?? true,
                items: (prev.material?.items ?? []).filter((_, i) => i !== index),
            },
        }));
    }

    function updateDownload(index: number, key: keyof CourseIntroDownload, value: string) {
        setIntro((prev) => {
            const downloads = prev.downloads ?? [];
            const next = downloads.map((download, i) => (i === index ? { ...download, [key]: value } : download));
            return { ...prev, downloads: next };
        });
    }

    function addDownload() {
        setIntro((prev) => ({
            ...prev,
            downloads: [...(prev.downloads ?? []), { label: '', description: '', href: '' }],
        }));
    }

    function removeDownload(index: number) {
        setIntro((prev) => ({
            ...prev,
            downloads: (prev.downloads ?? []).filter((_, i) => i !== index),
        }));
    }

    async function handleSave() {
        if (!courseId || isSaving) return;
        setIsSaving(true);
        try {
            await saveIntro(courseId, intro);
            const now = new Date();
            setSavedAt(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="space-y-6">
            <TopBar
                backHref={`/admin/cours/${courseId}`}
                backLabel={
                    <span className="inline-flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Retour (hub)
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
                        <Badge>Éditeur • Intro</Badge>
                    </div>
                }
            />

            <PageHeader
                label="Éditeur • Accueil"
                title="Introduction du cours"
                description="Cette page est le premier contact émotionnel avec l’apprenant. Elle doit rassurer, guider et donner envie."
            />

            <Card>
                <CardHeader title="Message d’accueil" subtitle="Badge + promesse + texte principal" />
                <CardBody className="space-y-4">
                    <Field label="Badge" hint="ex : Parcours débutant · Dessin">
                        <IconInput icon={<Sparkles className="h-4 w-4" />}>
                            <input
                                placeholder="Badge introductif"
                                value={intro.badgeLabel ?? ''}
                                onChange={(event) => updateIntro('badgeLabel', event.target.value)}
                                className={inputWithIcon}
                            />
                        </IconInput>
                    </Field>

                    <Field label="Titre principal" required hint="Phrase courte et claire">
                        <IconInput icon={<CheckCircle2 className="h-4 w-4" />}>
                            <input
                                placeholder="Titre principal de l’introduction"
                                value={intro.title}
                                onChange={(event) => updateIntro('title', event.target.value)}
                                className={inputWithIcon}
                            />
                        </IconInput>
                    </Field>

                    <Field label="Texte d’accueil" hint="intention, posture, cadre">
                        <textarea
                            placeholder="Message d’accueil : intention, posture, cadre..."
                            value={intro.description ?? ''}
                            onChange={(event) => updateIntro('description', event.target.value)}
                            className={cx(textareaBase, 'min-h-32')}
                        />
                    </Field>

                    <div className="rounded-2xl border border-perl/60 bg-page/40 p-4 text-sm text-main/65 flex gap-3">
                        <Sparkles className="h-5 w-5 text-main/50 shrink-0" />
                        <p>
                            Ici, parle comme à une personne réelle.
                            <br />
                            Pas de marketing, pas de performance :<strong className="text-main"> une invitation.</strong>
                        </p>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Vidéo d’introduction" subtitle="Optionnelle mais très recommandée" />
                <CardBody className="space-y-4">
                    <Field label="Titre de la vidéo" hint="ce que l’apprenant va ressentir">
                        <IconInput icon={<Video className="h-4 w-4" />}>
                            <input
                                placeholder="Titre de la vidéo"
                                value={intro.video?.title ?? ''}
                                onChange={(event) => updateVideo({ title: event.target.value })}
                                className={inputWithIcon}
                            />
                        </IconInput>
                    </Field>

                    <Field label="Texte d’accompagnement">
                        <textarea
                            placeholder="Texte d’accompagnement de la vidéo"
                            value={intro.video?.description ?? ''}
                            onChange={(event) => updateVideo({ description: event.target.value })}
                            className={textareaBase}
                        />
                    </Field>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <Field label="YouTube ID">
                            <input
                                placeholder="Identifiant YouTube"
                                value={intro.video?.youtubeId ?? ''}
                                onChange={(event) => updateVideo({ youtubeId: event.target.value })}
                                className={inputBase}
                            />
                        </Field>
                        <Field label="Cover (optionnel)" hint="URL ou chemin interne">
                            <input
                                placeholder="/images/intro-cover.jpg"
                                value={intro.video?.cover ?? ''}
                                onChange={(event) => updateVideo({ cover: event.target.value })}
                                className={inputBase}
                            />
                        </Field>
                    </div>

                    <div className="rounded-2xl border border-sage/40 bg-sage/10 p-4 flex gap-3 text-sm text-sage">
                        <Video className="h-5 w-5 shrink-0" />
                        <p>
                            Cette vidéo est ton « mot d’accueil ».
                            <br />
                            Elle peut être simple, sincère, sans montage.
                        </p>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Ce que l’apprenant va vivre" subtitle="Projection, pas programme" />
                <CardBody className="space-y-4">
                    <Field label="Titre de section" hint="ex : Ce que tu vas vivre">
                        <input
                            placeholder="Titre de la section"
                            value={sectionTitles.experience}
                            onChange={(event) => updateSectionTitle('whatYouWillExperience', event.target.value)}
                            className={inputBase}
                        />
                    </Field>

                    <div className="space-y-3">
                        {(intro.whatYouWillExperience?.items ?? []).map((item, index) => (
                            <div key={`experience-${index}`} className="flex items-center gap-2">
                                <input
                                    value={item}
                                    onChange={(event) => updateList('whatYouWillExperience', index, event.target.value)}
                                    placeholder="Ex : Reprendre un crayon sans pression"
                                    className={inputBase}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeListItem('whatYouWillExperience', index)}
                                    className="inline-flex items-center justify-center rounded-full border border-perl/70 bg-white p-2 text-main/70 hover:bg-page"
                                    aria-label="Supprimer la ligne"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => addListItem('whatYouWillExperience')}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            Ajouter une expérience
                        </button>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="À qui ce cours est destiné" subtitle="Réassurer, inclure" />
                <CardBody className="space-y-4">
                    <Field label="Titre de section" hint="ex : Ce cours est pour toi si…">
                        <input
                            placeholder="Titre de la section"
                            value={sectionTitles.audience}
                            onChange={(event) => updateSectionTitle('whoItsFor', event.target.value)}
                            className={inputBase}
                        />
                    </Field>

                    <div className="space-y-3">
                        {(intro.whoItsFor?.items ?? []).map((item, index) => (
                            <div key={`audience-${index}`} className="flex items-center gap-2">
                                <input
                                    value={item}
                                    onChange={(event) => updateList('whoItsFor', index, event.target.value)}
                                    placeholder="Ex : Tu débutes et tu doutes"
                                    className={inputBase}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeListItem('whoItsFor', index)}
                                    className="inline-flex items-center justify-center rounded-full border border-perl/70 bg-white p-2 text-main/70 hover:bg-page"
                                    aria-label="Supprimer la ligne"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => addListItem('whoItsFor')}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <HeartHandshake className="h-4 w-4" />
                            Ajouter un profil
                        </button>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Téléchargements" subtitle="Fiches, ressources ou supports" />
                <CardBody className="space-y-4">
                    {(intro.downloads ?? []).map((download, index) => (
                        <div key={`download-${index}`} className="space-y-2 rounded-2xl border border-perl/60 bg-page/40 p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-xs uppercase tracking-[0.18em] text-main/55">Ressource {index + 1}</p>
                                <button
                                    type="button"
                                    onClick={() => removeDownload(index)}
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-rose hover:text-rose/80"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Supprimer
                                </button>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-2">
                                <IconInput icon={<Download className="h-4 w-4" />}>
                                    <input
                                        placeholder="Nom du fichier"
                                        value={download.label}
                                        onChange={(event) => updateDownload(index, 'label', event.target.value)}
                                        className={inputWithIcon}
                                    />
                                </IconInput>
                                <IconInput icon={<Link2 className="h-4 w-4" />}>
                                    <input
                                        placeholder="Lien de téléchargement"
                                        value={download.href}
                                        onChange={(event) => updateDownload(index, 'href', event.target.value)}
                                        className={inputWithIcon}
                                    />
                                </IconInput>
                            </div>
                            <textarea
                                placeholder="Petite description"
                                value={download.description}
                                onChange={(event) => updateDownload(index, 'description', event.target.value)}
                                className={textareaBase}
                            />
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addDownload}
                        className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                    >
                        <Download className="h-4 w-4" />
                        Ajouter un téléchargement
                    </button>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Comment suivre ce cours" subtitle="Cadre, rythme, liberté" />
                <CardBody className="space-y-4">
                    <Field label="Titre de section">
                        <input
                            placeholder="Titre de la section"
                            value={sectionTitles.howToFollow}
                            onChange={(event) => updateSectionTitle('howToFollow', event.target.value)}
                            className={inputBase}
                        />
                    </Field>
                    <div className="space-y-3">
                        {(intro.howToFollow?.items ?? []).map((item, index) => (
                            <div key={`how-${index}`} className="flex items-center gap-2">
                                <input value={item} onChange={(event) => updateList('howToFollow', index, event.target.value)} className={inputBase} />
                                <button
                                    type="button"
                                    onClick={() => removeListItem('howToFollow', index)}
                                    className="inline-flex items-center justify-center rounded-full border border-perl/70 bg-white p-2 text-main/70 hover:bg-page"
                                    aria-label="Supprimer la ligne"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => addListItem('howToFollow')}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <Compass className="h-4 w-4" />
                            Ajouter une recommandation
                        </button>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Matériel recommandé" subtitle="Simple, accessible, sans obligation" />
                <CardBody className="space-y-4">
                    <Field label="Titre de section">
                        <input
                            placeholder="Titre de la section"
                            value={intro.material?.title ?? ''}
                            onChange={(event) =>
                                updateIntro('material', {
                                    title: event.target.value,
                                    items: intro.material?.items ?? [],
                                    note: intro.material?.note ?? '',
                                    highlighted: intro.material?.highlighted ?? true,
                                })
                            }
                            className={inputBase}
                        />
                    </Field>

                    <div className="space-y-3">
                        {(intro.material?.items ?? []).map((item, index) => (
                            <div key={`material-${index}`} className="flex items-center gap-2">
                                <input value={item} onChange={(event) => updateMaterialItem(index, event.target.value)} className={inputBase} />
                                <button
                                    type="button"
                                    onClick={() => removeMaterialItem(index)}
                                    className="inline-flex items-center justify-center rounded-full border border-perl/70 bg-white p-2 text-main/70 hover:bg-page"
                                    aria-label="Supprimer la ligne"
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
                            Ajouter un élément
                        </button>

                        <textarea
                            placeholder="Note complémentaire (ex : commence avec ce que tu as, le matériel n’est pas un frein…)"
                            value={intro.material?.note ?? ''}
                            onChange={(event) =>
                                updateIntro('material', {
                                    title: intro.material?.title ?? defaultIntro.material!.title,
                                    items: intro.material?.items ?? [],
                                    note: event.target.value,
                                    highlighted: intro.material?.highlighted ?? true,
                                })
                            }
                            className={cx(textareaBase, 'min-h-11')}
                        />

                        <div className="rounded-2xl border border-sage/40 bg-sage/10 p-4 text-sm text-sage flex gap-3">
                            <Sparkles className="h-5 w-5 shrink-0" />
                            <p>
                                Le matériel n’est jamais un prérequis.
                                <br />
                                <strong>Le plus important, c’est ton regard et ton temps.</strong>
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Notes & indications" subtitle="Infos complémentaires" />
                <CardBody className="space-y-4">
                    <Field label="Notes pour l’apprenant" hint="optionnel">
                        <IconInput icon={<StickyNote className="h-4 w-4" />}>
                            <textarea
                                placeholder="Notes libres (conditions, posture, encouragements… )"
                                value={intro.notes ?? ''}
                                onChange={(event) => updateIntro('notes', event.target.value)}
                                className={cx(textareaBase, 'min-h-24 pl-10 pr-4')}
                            />
                        </IconInput>
                    </Field>
                </CardBody>
            </Card>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
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

                <button
                    type="button"
                    onClick={() => router.push(`/admin/cours/${courseId}/editor/modules`)}
                    className="inline-flex items-center gap-2 rounded-full bg-main px-5 py-2 text-sm font-semibold text-white hover:bg-main/90"
                >
                    Continuer (modules)
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>

            {savedAt && <p className="text-xs text-main/60">Dernière sauvegarde à {savedAt}</p>}
        </div>
    );
}
