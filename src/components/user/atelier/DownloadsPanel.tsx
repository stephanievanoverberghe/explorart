'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Download, FileText } from 'lucide-react';
import { PanelHeader } from './PanelHeader';

type Status = 'loading' | 'ready' | 'error' | 'unauthenticated';

interface DownloadItem {
    title: string;
    description?: string;
    href: string;
    addedAt?: string;
}

export function DownloadsPanel() {
    const [status, setStatus] = useState<Status>('loading');
    const [downloads, setDownloads] = useState<DownloadItem[]>([]);

    useEffect(() => {
        async function fetchDownloads() {
            try {
                const response = await fetch('/api/users/me/downloads');

                if (response.status === 401) {
                    setStatus('unauthenticated');
                    return;
                }

                if (!response.ok) {
                    setStatus('error');
                    return;
                }

                const data = await response.json();
                setDownloads(Array.isArray(data.downloads) ? data.downloads : []);
                setStatus('ready');
            } catch (error) {
                console.error('[FETCH_DOWNLOADS_ERROR]', error);
                setStatus('error');
            }
        }

        void fetchDownloads();
    }, []);

    if (status === 'loading') {
        return (
            <section className="space-y-4" aria-label="Téléchargements Explor'Art">
                {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="h-32 rounded-3xl border border-perl/40 bg-ivory/80 animate-pulse" />
                ))}
            </section>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <section className="card border-perl/60 bg-white/96 space-y-3" aria-label="Téléchargements Explor'Art">
                <h3 className="font-serif-title text-[1.05rem] text-main">Connecte-toi pour voir tes ressources</h3>
                <p className="text-sm text-main/75">Tes fiches PDF et bonus débloqués restent associés à ton compte. Connecte-toi pour les retrouver ici.</p>
                <div className="flex flex-wrap gap-2 pt-1">
                    <Link href="/connexion" className="inline-flex items-center gap-2 rounded-full bg-main px-4 py-2 text-sm font-medium text-ivory shadow-sm hover:bg-main/90">
                        Me connecter
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                        href="/inscription"
                        className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-[0.85rem] font-medium text-main/80 hover:bg-background"
                    >
                        Créer un compte
                    </Link>
                </div>
            </section>
        );
    }

    if (status === 'error') {
        return <section className="card border-rose/30 bg-rose/5 text-rose-800 text-sm">Une erreur est survenue en récupérant tes téléchargements.</section>;
    }

    const hasDownloads = downloads.length > 0;

    // ✅ Vide : pas de PanelHeader
    if (!hasDownloads) {
        return (
            <section className="space-y-6 md:space-y-7" aria-label="Téléchargements Explor'Art">
                <section
                    className="
                        relative overflow-hidden
                        rounded-3xl border border-dashed border-perl/60
                        bg-white/95 backdrop-blur-sm
                        px-6 py-8 md:px-8 md:py-10
                        shadow-sm
                        flex flex-col items-center text-center gap-5
                    "
                >
                    <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/60 shadow-[inset_0_0_15px_rgba(0,0,0,0.03)]" />

                    <div className="relative flex flex-col items-center gap-5 max-w-xl">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sage/10 shadow-xxs ring-1 ring-sage/20">
                            <Download className="h-7 w-7 text-sage" />
                        </div>

                        <div className="space-y-2">
                            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Ressources</p>
                            <h3 className="font-serif-title text-xl text-main">Aucune fiche débloquée pour le moment</h3>
                            <p className="text-sm md:text-base text-main/70">
                                Dès que tu débloques une fiche PDF ou une ressource pratique, elle apparaîtra ici, toujours à portée de main.
                            </p>
                        </div>

                        <ul className="grid gap-2 w-full text-left md:text-center md:grid-cols-3 text-[0.85rem] text-main/70 mt-2">
                            <li className="flex items-start gap-2 md:justify-center">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sage" />
                                <span>Fiches « exercices doux »</span>
                            </li>
                            <li className="flex items-start gap-2 md:justify-center">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-ocre" />
                                <span>Guides PDF récapitulatifs</span>
                            </li>
                            <li className="flex items-start gap-2 md:justify-center">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-prune" />
                                <span>Bonus de fin de parcours</span>
                            </li>
                        </ul>

                        <div className="flex flex-wrap justify-center gap-3 pt-3 text-sm font-medium">
                            <Link
                                href="/articles"
                                className="inline-flex items-center gap-2 rounded-full bg-sage px-4 py-2.5 text-ivory shadow-sm transition hover:-translate-y-0.5 hover:bg-sage/80"
                            >
                                <span>Découvrir les articles</span>
                                <span aria-hidden>↗</span>
                            </Link>

                            <Link
                                href="/commencer-ici"
                                className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-ivory px-4 py-2.5 text-main/80 transition hover:border-sage/70 hover:bg-sage/5 hover:-translate-y-0.5"
                            >
                                <span>Commencer un parcours</span>
                            </Link>
                        </div>

                        <p className="text-[0.78rem] text-main/60 pt-1">Toutes tes ressources restent enregistrées ici, même si tu changes d’appareil.</p>
                    </div>
                </section>
            </section>
        );
    }

    // ✅ Contenu : PanelHeader + liste
    return (
        <section className="space-y-6 md:space-y-7" aria-label="Téléchargements Explor'Art">
            <PanelHeader
                kicker="Téléchargements"
                title="Tes fiches & ressources à télécharger"
                description="Ici, tu retrouveras tous les PDF, fiches pratiques et bonus débloqués dans les parcours et articles."
            />

            <section className="grid gap-4 md:grid-cols-2" aria-label="Ressources téléchargées">
                {downloads.map((item) => (
                    <article
                        key={`${item.href}-${item.title}`}
                        className="group rounded-3xl border border-perl/60 bg-white/95 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sage/70"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 rounded-full bg-ivory px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-main/60">
                                    <FileText className="h-3.5 w-3.5 text-main/60" />
                                    <span>Ressource</span>
                                </div>
                                <h3 className="font-serif-title text-lg text-main">{item.title}</h3>
                                {item.description && <p className="text-sm text-main/70">{item.description}</p>}
                            </div>
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sage/10 text-sage">
                                <Download className="h-5 w-5" />
                            </span>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[0.82rem] text-main/65">
                            <span>{item.addedAt ? `Ajouté le ${new Date(item.addedAt).toLocaleDateString('fr-FR')}` : 'Disponible maintenant'}</span>
                            <Link
                                href={item.href}
                                className="inline-flex items-center gap-2 rounded-full bg-main px-3 py-1.5 text-[0.8rem] font-medium text-ivory shadow-sm hover:bg-main/90"
                            >
                                Télécharger
                                <span aria-hidden>↗</span>
                            </Link>
                        </div>
                    </article>
                ))}
            </section>
        </section>
    );
}
