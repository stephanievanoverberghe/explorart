'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ChevronLeft, Save, Pencil, CheckCircle2, Compass } from 'lucide-react';

import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks } from '@/components/admin/courses/CourseUI';

/* ------------------------------------------------
   Editor Module — FRONT ONLY (clean & strict)
------------------------------------------------- */

export default function EditorModulePage() {
    const { courseId } = useParams<{ courseId: string; moduleId: string }>();

    const [savedAt, setSavedAt] = useState<string | null>(null);

    /* -------- EN-TÊTE -------- */
    const [badge, setBadge] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    /* -------- VIDÉO -------- */
    const [videoTitle, setVideoTitle] = useState('');
    const [youtubeId, setYoutubeId] = useState('');
    const [videoDesc, setVideoDesc] = useState('');

    /* -------- LISTES -------- */
    const [material, setMaterial] = useState<string[]>([]);
    const [intention, setIntention] = useState<string[]>([]);
    const [exerciseSteps, setExerciseSteps] = useState<string[]>([]);

    /* -------- helpers -------- */
    const inputBase =
        'w-full rounded-2xl border border-perl/70 bg-white px-4 py-3 text-sm text-main outline-none transition hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10';

    function addLine(list: string[], setter: (v: string[]) => void) {
        setter([...list, '']);
    }

    function updateLine(list: string[], setter: (v: string[]) => void, index: number, value: string) {
        setter(list.map((item, i) => (i === index ? value : item)));
    }

    function fakeSave() {
        const now = new Date();
        setSavedAt(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
    }

    /* ------------------------------------------------ */

    return (
        <div className="space-y-6">
            {/* TOP BAR */}
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

            <PageHeader
                label="Éditeur • Module"
                title="Construction du module"
                description="Un module est une expérience autonome : cadre clair, intention lisible, geste guidé."
            />

            {/* EN-TÊTE */}
            <Card>
                <CardHeader title="En-tête du module" subtitle="Badge • titre • texte d’introduction" />
                <CardBody>
                    <div className="space-y-4">
                        <input placeholder="Badge (ex : Étape 1 · Retrouver le geste)" value={badge} onChange={(e) => setBadge(e.target.value)} className={inputBase} />

                        <input placeholder="Titre du module" value={title} onChange={(e) => setTitle(e.target.value)} className={inputBase} />

                        <textarea
                            placeholder="Texte d’introduction du module"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`${inputBase} min-h-32`}
                        />
                    </div>
                </CardBody>
            </Card>

            {/* VIDÉO */}
            <Card>
                <CardHeader title="Vidéo du module" subtitle="Démonstration ou guidage" />
                <CardBody>
                    <div className="space-y-4">
                        <input placeholder="Titre de la vidéo" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} className={inputBase} />

                        <input placeholder="YouTube ID" value={youtubeId} onChange={(e) => setYoutubeId(e.target.value)} className={inputBase} />

                        <textarea placeholder="Texte d’accompagnement" value={videoDesc} onChange={(e) => setVideoDesc(e.target.value)} className={`${inputBase} min-h-24`} />
                    </div>
                </CardBody>
            </Card>

            {/* MATÉRIEL */}
            <Card>
                <CardHeader title="Matériel recommandé" subtitle="Simple, rassurant" />
                <CardBody>
                    <div className="space-y-3">
                        {material.map((line, i) => (
                            <input key={i} value={line} onChange={(e) => updateLine(material, setMaterial, i, e.target.value)} className={inputBase} />
                        ))}

                        <button
                            type="button"
                            onClick={() => addLine(material, setMaterial)}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <Pencil className="h-4 w-4" />
                            Ajouter du matériel
                        </button>
                    </div>
                </CardBody>
            </Card>

            {/* INTENTION */}
            <Card>
                <CardHeader title="Intention pédagogique" subtitle="Ce qui compte vraiment" />
                <CardBody>
                    <div className="space-y-3">
                        {intention.map((line, i) => (
                            <input key={i} value={line} onChange={(e) => updateLine(intention, setIntention, i, e.target.value)} className={inputBase} />
                        ))}

                        <button
                            type="button"
                            onClick={() => addLine(intention, setIntention)}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            Ajouter une intention
                        </button>
                    </div>
                </CardBody>
            </Card>

            {/* EXERCICE */}
            <Card>
                <CardHeader title="Exercice guidé" subtitle="Pas à pas" />
                <CardBody>
                    <div className="space-y-3">
                        {exerciseSteps.map((line, i) => (
                            <input key={i} value={line} onChange={(e) => updateLine(exerciseSteps, setExerciseSteps, i, e.target.value)} className={inputBase} />
                        ))}

                        <button
                            type="button"
                            onClick={() => addLine(exerciseSteps, setExerciseSteps)}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <Compass className="h-4 w-4" />
                            Ajouter une étape
                        </button>
                    </div>
                </CardBody>
            </Card>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                <button
                    type="button"
                    onClick={fakeSave}
                    className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-5 py-2 text-sm font-semibold text-main/80 hover:bg-page"
                >
                    <Save className="h-4 w-4" />
                    Sauvegarder (mock)
                </button>
            </div>

            {savedAt && <p className="text-xs text-main/60">Dernière sauvegarde à {savedAt}</p>}
        </div>
    );
}
