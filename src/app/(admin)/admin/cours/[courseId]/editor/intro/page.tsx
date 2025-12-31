'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, Sparkles, Video, CheckCircle2, HeartHandshake, Compass } from 'lucide-react';

import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';

/* ------------------------------------------------
   Editor Intro — Expérience d’accueil
------------------------------------------------- */

export default function EditorIntroPage() {
    const router = useRouter();
    const { courseId } = useParams<{ courseId: string }>();

    const [savedAt, setSavedAt] = useState<string | null>(null);

    /* -------- states -------- */
    const [badge, setBadge] = useState('');
    const [title, setTitle] = useState('');
    const [introText, setIntroText] = useState('');

    const [videoTitle, setVideoTitle] = useState('');
    const [videoDesc, setVideoDesc] = useState('');
    const [youtubeId, setYoutubeId] = useState('');

    const [experience, setExperience] = useState<string[]>([]);
    const [audience, setAudience] = useState<string[]>([]);
    const [guidelines, setGuidelines] = useState<string[]>([]);
    const [materials, setMaterials] = useState<string[]>([]);
    const [materialNote, setMaterialNote] = useState('');

    /* -------- helpers -------- */
    const inputBase =
        'w-full rounded-2xl border border-perl/70 bg-white px-4 py-3 text-sm text-main outline-none transition hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10';

    const textareaBase =
        'w-full resize-none rounded-2xl border border-perl/70 bg-white px-4 py-3 text-sm text-main outline-none transition hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10';

    function fakeSave() {
        const now = new Date();
        setSavedAt(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
    }

    function addLine(list: string[], setter: (v: string[]) => void) {
        setter([...list, '']);
    }

    function updateLine(list: string[], setter: (v: string[]) => void, index: number, value: string) {
        setter(list.map((l, i) => (i === index ? value : l)));
    }

    /* ------------------------------------------------ */

    return (
        <div className="space-y-6">
            {/* TOP BAR */}
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

            {/* ---------------- BLOC 1 — ACCUEIL */}
            <Card>
                <CardHeader title="Message d’accueil" subtitle="Badge + promesse + texte principal" />
                <CardBody>
                    <div className="space-y-4">
                        <input placeholder="Badge (ex : Parcours débutant · Dessin)" value={badge} onChange={(e) => setBadge(e.target.value)} className={inputBase} />

                        <input placeholder="Titre principal de l’introduction" value={title} onChange={(e) => setTitle(e.target.value)} className={inputBase} />

                        <textarea
                            placeholder="Message d’accueil : intention, posture, cadre..."
                            value={introText}
                            onChange={(e) => setIntroText(e.target.value)}
                            className={cx(textareaBase, 'min-h-[140px]')}
                        />

                        <div className="rounded-2xl border border-perl/60 bg-page/40 p-4 text-sm text-main/65 flex gap-3">
                            <Sparkles className="h-5 w-5 text-main/50 shrink-0" />
                            <p>
                                Ici, parle comme à une personne réelle.
                                <br />
                                Pas de marketing, pas de performance :<strong className="text-main"> une invitation.</strong>
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* ---------------- BLOC 2 — VIDÉO */}
            <Card>
                <CardHeader title="Vidéo d’introduction" subtitle="Optionnelle mais très recommandée" />
                <CardBody>
                    <div className="space-y-4">
                        <input placeholder="Titre de la vidéo" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} className={inputBase} />

                        <textarea placeholder="Texte d’accompagnement de la vidéo" value={videoDesc} onChange={(e) => setVideoDesc(e.target.value)} className={textareaBase} />

                        <input placeholder="YouTube ID" value={youtubeId} onChange={(e) => setYoutubeId(e.target.value)} className={inputBase} />

                        <div className="rounded-2xl border border-sage/40 bg-sage/10 p-4 flex gap-3 text-sm text-sage">
                            <Video className="h-5 w-5 shrink-0" />
                            <p>
                                Cette vidéo est ton « mot d’accueil ».
                                <br />
                                Elle peut être simple, sincère, sans montage.
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* ---------------- BLOC 3 — EXPÉRIENCE */}
            <Card>
                <CardHeader title="Ce que l’apprenant va vivre" subtitle="Projection, pas programme" />
                <CardBody>
                    <div className="space-y-3">
                        {experience.map((line, i) => (
                            <input
                                key={i}
                                value={line}
                                onChange={(e) => updateLine(experience, setExperience, i, e.target.value)}
                                placeholder="Ex : Reprendre un crayon sans pression"
                                className={inputBase}
                            />
                        ))}

                        <button
                            type="button"
                            onClick={() => addLine(experience, setExperience)}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            Ajouter une expérience
                        </button>
                    </div>
                </CardBody>
            </Card>

            {/* ---------------- BLOC 4 — À QUI */}
            <Card>
                <CardHeader title="À qui ce cours est destiné" subtitle="Réassurer, inclure" />
                <CardBody>
                    <div className="space-y-3">
                        {audience.map((line, i) => (
                            <input
                                key={i}
                                value={line}
                                onChange={(e) => updateLine(audience, setAudience, i, e.target.value)}
                                placeholder="Ex : Tu débutes et tu doutes"
                                className={inputBase}
                            />
                        ))}

                        <button
                            type="button"
                            onClick={() => addLine(audience, setAudience)}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <HeartHandshake className="h-4 w-4" />
                            Ajouter un profil
                        </button>
                    </div>
                </CardBody>
            </Card>

            {/* ---------------- BLOC 5 — COMMENT SUIVRE */}
            <Card>
                <CardHeader title="Comment suivre ce cours" subtitle="Cadre, rythme, liberté" />
                <CardBody>
                    <div className="space-y-3">
                        {guidelines.map((line, i) => (
                            <input
                                key={i}
                                value={line}
                                onChange={(e) => updateLine(guidelines, setGuidelines, i, e.target.value)}
                                placeholder="Ex : Avance dans l’ordre, sans te presser"
                                className={inputBase}
                            />
                        ))}

                        <button
                            type="button"
                            onClick={() => addLine(guidelines, setGuidelines)}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <Compass className="h-4 w-4" />
                            Ajouter une recommandation
                        </button>
                    </div>
                </CardBody>
            </Card>

            {/* ---------------- BLOC 6 — MATÉRIEL */}
            <Card>
                <CardHeader title="Matériel recommandé" subtitle="Simple, accessible, sans obligation" />
                <CardBody>
                    <div className="space-y-4">
                        {materials.map((line, i) => (
                            <input
                                key={i}
                                value={line}
                                onChange={(e) => updateLine(materials, setMaterials, i, e.target.value)}
                                placeholder="Ex : Un carnet ou quelques feuilles A4"
                                className={inputBase}
                            />
                        ))}

                        <button
                            type="button"
                            onClick={() => addLine(materials, setMaterials)}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            Ajouter un élément
                        </button>

                        <textarea
                            placeholder="Note complémentaire (ex : commence avec ce que tu as, le matériel n’est pas un frein…)"
                            value={materialNote}
                            onChange={(e) => setMaterialNote(e.target.value)}
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

            {/* ---------------- ACTIONS */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                <button
                    type="button"
                    onClick={fakeSave}
                    className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-5 py-2 text-sm font-semibold text-main/80 hover:bg-page"
                >
                    <Save className="h-4 w-4" />
                    Sauvegarder (mock)
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
