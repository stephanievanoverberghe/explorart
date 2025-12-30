// src/app/(admin)/admin/cours/[courseId]/settings/page.tsx
'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';
import { ChevronLeft, Save, Link2, Search, Image as ImageIcon, SlidersHorizontal } from 'lucide-react';

type ToggleOption = {
    id: string;
    label: string;
    description: string;
};

const options: ToggleOption[] = [
    {
        id: 'visibility',
        label: 'Visibilité publique',
        description: 'Autoriser l’indexation et l’accès public à la page du cours.',
    },
    {
        id: 'comments',
        label: 'Commentaires',
        description: 'Permettre aux apprenants de laisser des commentaires.',
    },
    {
        id: 'certificate',
        label: 'Certificat',
        description: 'Générer un certificat à la fin du parcours.',
    },
    {
        id: 'downloads',
        label: 'Téléchargements autorisés',
        description: 'Autoriser les ressources téléchargeables pour les inscrits.',
    },
];

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

function TextInput({ icon, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode }) {
    return (
        <div className="relative">
            {icon ? <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-main/45">{icon}</div> : null}
            <input
                {...props}
                className={cx(
                    'w-full rounded-2xl border border-perl/70 bg-white py-3 text-sm text-main outline-none transition',
                    icon ? 'pl-10 pr-4' : 'px-4',
                    'hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10'
                )}
            />
        </div>
    );
}

function TextArea({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className={cx(
                'w-full rounded-2xl border border-perl/70 bg-white px-4 py-3 text-sm text-main outline-none transition',
                'hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10'
            )}
        />
    );
}

export default function CourseSettingsPage() {
    const params = useParams<{ courseId: string }>();
    const courseId = params.courseId;

    const [slug, setSlug] = useState('cours-express');
    const [seoTitle, setSeoTitle] = useState('Cours express : harmonies rapides');
    const [seoDescription, setSeoDescription] = useState('Un format court pour maîtriser rapidement les harmonies de couleurs et appliquer les bons réflexes.');
    const [seoKeywords, setSeoKeywords] = useState('harmonies, couleur, cours rapide');
    const [coverUrl, setCoverUrl] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [trailerUrl, setTrailerUrl] = useState('');
    const [toggles, setToggles] = useState<Record<string, boolean>>({
        visibility: true,
        comments: true,
        certificate: false,
        downloads: true,
    });

    const [saving, setSaving] = useState(false);
    const [savedAt, setSavedAt] = useState<string | null>(null);

    const slugHint = useMemo(() => `/cours/${slug || 'slug-du-cours'}`, [slug]);

    async function saveSettings() {
        if (saving) return;
        setSaving(true);
        try {
            const now = new Date();
            setSavedAt(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
        } finally {
            setSaving(false);
        }
    }

    function toggleOption(id: string) {
        setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
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
                        <QuickLinks
                            items={[
                                { href: '/admin/cours', label: 'Cours' },
                                { href: `/admin/cours/${courseId}`, label: 'HUB' },
                            ]}
                        />
                        <Badge>Réglages</Badge>
                    </div>
                }
            />

            <PageHeader label="Réglages" title="Paramètres du cours" description="Slug, SEO, médias et options de diffusion pour contrôler la visibilité du cours." />

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <Card>
                    <CardHeader
                        title="Slug & SEO"
                        subtitle="URL publique • métadonnées • mots-clés"
                        right={
                            <button
                                type="button"
                                onClick={saveSettings}
                                disabled={saving}
                                className={cx(
                                    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition',
                                    saving ? 'border-perl/60 bg-page text-main/40 cursor-not-allowed' : 'border-perl/70 bg-white text-main/80 hover:bg-page cursor-pointer'
                                )}
                            >
                                <Save className="h-4 w-4" />
                                Sauvegarder
                            </button>
                        }
                    />

                    <CardBody>
                        <div className="space-y-6">
                            <Field label="Slug du cours" hint={slugHint}>
                                <TextInput icon={<Link2 className="h-4 w-4" />} value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="cours-express" />
                                <p className="text-xs text-main/55">Utilisé pour l’URL publique et les liens de partage.</p>
                            </Field>

                            <Field label="Titre SEO" hint="55 caractères max.">
                                <TextInput
                                    icon={<Search className="h-4 w-4" />}
                                    value={seoTitle}
                                    onChange={(event) => setSeoTitle(event.target.value)}
                                    placeholder="Cours express : harmonies rapides"
                                />
                            </Field>

                            <Field label="Description SEO" hint="160 caractères max.">
                                <TextArea
                                    rows={4}
                                    value={seoDescription}
                                    onChange={(event) => setSeoDescription(event.target.value)}
                                    placeholder="Décris le cours pour les moteurs de recherche."
                                />
                            </Field>

                            <Field label="Mots-clés SEO" hint="Séparer par des virgules">
                                <TextInput value={seoKeywords} onChange={(event) => setSeoKeywords(event.target.value)} placeholder="couleur, harmonie, atelier" />
                            </Field>
                        </div>
                    </CardBody>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader title="Médias" subtitle="Couverture • vignette • bande-annonce" />
                        <CardBody>
                            <div className="space-y-4">
                                <Field label="Image de couverture">
                                    <TextInput
                                        icon={<ImageIcon className="h-4 w-4" />}
                                        value={coverUrl}
                                        onChange={(event) => setCoverUrl(event.target.value)}
                                        placeholder="https://.../cover.jpg"
                                    />
                                </Field>

                                <Field label="Vignette">
                                    <TextInput
                                        icon={<ImageIcon className="h-4 w-4" />}
                                        value={thumbnailUrl}
                                        onChange={(event) => setThumbnailUrl(event.target.value)}
                                        placeholder="https://.../thumbnail.jpg"
                                    />
                                </Field>

                                <Field label="Bande-annonce">
                                    <TextInput
                                        icon={<Link2 className="h-4 w-4" />}
                                        value={trailerUrl}
                                        onChange={(event) => setTrailerUrl(event.target.value)}
                                        placeholder="https://.../trailer.mp4"
                                    />
                                </Field>
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader title="Options" subtitle="Accessibilité • permissions" />
                        <CardBody>
                            <div className="space-y-4">
                                {options.map((option) => (
                                    <button
                                        key={option.id}
                                        type="button"
                                        onClick={() => toggleOption(option.id)}
                                        className={cx(
                                            'w-full rounded-2xl border px-4 py-3 text-left transition',
                                            toggles[option.id] ? 'border-main/40 bg-page/70' : 'border-perl/70 bg-white',
                                            'hover:bg-page/60'
                                        )}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-main/80">{option.label}</p>
                                                <p className="mt-1 text-xs text-main/55">{option.description}</p>
                                            </div>
                                            <span
                                                className={cx(
                                                    'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold',
                                                    toggles[option.id] ? 'bg-main text-white' : 'bg-perl/60 text-main/60'
                                                )}
                                            >
                                                {toggles[option.id] ? 'Actif' : 'Inactif'}
                                            </span>
                                        </div>
                                    </button>
                                ))}

                                <div className="flex items-center justify-between gap-3 rounded-2xl border border-perl/70 bg-white px-4 py-3">
                                    <div>
                                        <p className="text-sm font-semibold text-main/80">Mode brouillon</p>
                                        <p className="mt-1 text-xs text-main/55">Le cours reste privé tant qu’il n’est pas publié.</p>
                                    </div>
                                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-main/70">
                                        <SlidersHorizontal className="h-4 w-4" />
                                        Brouillon
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 text-xs text-main/50">{savedAt ? `Dernière sauvegarde : ${savedAt}` : 'Aucune sauvegarde récente.'}</div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}
