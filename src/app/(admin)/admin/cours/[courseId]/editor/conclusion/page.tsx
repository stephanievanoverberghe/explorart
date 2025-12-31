'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ChevronLeft, Save, Compass, HeartHandshake, Link2 } from 'lucide-react';

import { Badge, Card, CardBody, CardHeader, PageHeader, TopBar, QuickLinks, cx } from '@/components/admin/courses/CourseUI';

/* ------------------------------------------------
   Editor Conclusion — FRONT ONLY (clean)
------------------------------------------------- */

export default function EditorConclusionPage() {
    const { courseId } = useParams<{ courseId: string }>();

    const [savedAt, setSavedAt] = useState<string | null>(null);

    /* -------- HEADER -------- */
    const [badge, setBadge] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    /* -------- VIDEO -------- */
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDesc, setVideoDesc] = useState('');
    const [youtubeId, setYoutubeId] = useState('');

    /* -------- BILAN -------- */
    const [summaryItems, setSummaryItems] = useState<string[]>([]);

    /* -------- PHRASE & RAPPEL -------- */
    const [personalPrompt, setPersonalPrompt] = useState('');
    const [softReminder, setSoftReminder] = useState('');

    /* -------- CONTINUER -------- */
    const [continueItems, setContinueItems] = useState<string[]>([]);
    const [links, setLinks] = useState<{ label: string; href: string }[]>([]);

    /* -------- styles -------- */
    const inputBase =
        'w-full rounded-2xl border border-perl/70 bg-white px-4 py-3 text-sm text-main outline-none transition hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10';

    const textareaBase =
        'w-full resize-none rounded-2xl border border-perl/70 bg-white px-4 py-3 text-sm text-main outline-none transition hover:bg-page/50 focus:border-main focus:ring-2 focus:ring-main/10';

    /* -------- helpers -------- */
    function addLine(list: string[], setter: (v: string[]) => void) {
        setter([...list, '']);
    }

    function updateLine(list: string[], setter: (v: string[]) => void, i: number, v: string) {
        setter(list.map((l, idx) => (idx === i ? v : l)));
    }

    function addLink() {
        setLinks([...links, { label: '', href: '' }]);
    }

    function updateLink(i: number, key: 'label' | 'href', value: string) {
        setLinks(links.map((l, idx) => (idx === i ? { ...l, [key]: value } : l)));
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
                        <QuickLinks items={[{ href: `/admin/cours/${courseId}`, label: 'HUB' }]} />
                        <Badge>Éditeur • Conclusion</Badge>
                    </div>
                }
            />

            <PageHeader label="Éditeur • Clôture" title="Conclusion du cours" description="Un temps pour rassembler, rassurer et ouvrir la suite du chemin." />

            {/* MESSAGE */}
            <Card>
                <CardHeader title="Message de conclusion" subtitle="Badge • titre • texte" />
                <CardBody>
                    <div className="space-y-4">
                        <input placeholder="Badge" value={badge} onChange={(e) => setBadge(e.target.value)} className={inputBase} />
                        <input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} className={inputBase} />
                        <textarea placeholder="Texte de clôture" value={description} onChange={(e) => setDescription(e.target.value)} className={cx(textareaBase, 'min-h-32')} />
                    </div>
                </CardBody>
            </Card>

            {/* VIDÉO */}
            <Card>
                <CardHeader title="Vidéo de clôture" subtitle="Mot de la fin & ouverture" />
                <CardBody>
                    <div className="space-y-4">
                        <input placeholder="Titre de la vidéo" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} className={inputBase} />
                        <textarea placeholder="Texte d’accompagnement" value={videoDesc} onChange={(e) => setVideoDesc(e.target.value)} className={textareaBase} />
                        <input placeholder="YouTube ID" value={youtubeId} onChange={(e) => setYoutubeId(e.target.value)} className={inputBase} />
                    </div>
                </CardBody>
            </Card>

            {/* BILAN */}
            <Card>
                <CardHeader title="Faire le point" subtitle="Ce que l’apprenant rassemble" />
                <CardBody>
                    <div className="space-y-3">
                        {summaryItems.map((line, i) => (
                            <input key={i} value={line} onChange={(e) => updateLine(summaryItems, setSummaryItems, i, e.target.value)} className={inputBase} />
                        ))}
                        <button
                            onClick={() => addLine(summaryItems, setSummaryItems)}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <Compass className="h-4 w-4" />
                            Ajouter un point
                        </button>
                    </div>
                </CardBody>
            </Card>

            {/* PHRASE & RAPPEL */}
            <Card>
                <CardHeader title="Phrase & rappel doux" subtitle="Intériorisation" />
                <CardBody>
                    <div className="space-y-4">
                        <textarea placeholder="Phrase guide" value={personalPrompt} onChange={(e) => setPersonalPrompt(e.target.value)} className={textareaBase} />
                        <textarea placeholder="Rappel doux" value={softReminder} onChange={(e) => setSoftReminder(e.target.value)} className={textareaBase} />
                    </div>
                </CardBody>
            </Card>

            {/* CONTINUER */}
            <Card>
                <CardHeader title="Continuer après le cours" subtitle="Pistes & ressources" />
                <CardBody>
                    <div className="space-y-4">
                        {continueItems.map((line, i) => (
                            <input key={i} value={line} onChange={(e) => updateLine(continueItems, setContinueItems, i, e.target.value)} className={inputBase} />
                        ))}

                        <button
                            onClick={() => addLine(continueItems, setContinueItems)}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <HeartHandshake className="h-4 w-4" />
                            Ajouter une piste
                        </button>

                        {links.map((link, i) => (
                            <div key={i} className="grid gap-2 sm:grid-cols-2">
                                <input placeholder="Label" value={link.label} onChange={(e) => updateLink(i, 'label', e.target.value)} className={inputBase} />
                                <input placeholder="URL" value={link.href} onChange={(e) => updateLink(i, 'href', e.target.value)} className={inputBase} />
                            </div>
                        ))}

                        <button
                            onClick={addLink}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page"
                        >
                            <Link2 className="h-4 w-4" />
                            Ajouter un lien
                        </button>
                    </div>
                </CardBody>
            </Card>

            {/* ACTION */}
            <button
                onClick={fakeSave}
                className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-5 py-2 text-sm font-semibold text-main/80 hover:bg-page"
            >
                <Save className="h-4 w-4" />
                Sauvegarder (mock)
            </button>

            {savedAt && <p className="text-xs text-main/60">Dernière sauvegarde à {savedAt}</p>}
        </div>
    );
}
