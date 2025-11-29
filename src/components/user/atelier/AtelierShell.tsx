'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, Star } from 'lucide-react';

import { ATELIER_TABS, type AtelierTabId } from './atelier-data';
import { OverviewPanel } from './OverviewPanel';
import { FavoritesPanel } from './FavoritesPanel';
import { JourneysPanel } from './JourneysPanel';
import { DownloadsPanel } from './DownloadsPanel';
import { ProfilePanel } from './ProfilePanel';

export function AtelierShell() {
    const [activeTab, setActiveTab] = useState<AtelierTabId>('overview');

    return (
        <section className="space-y-6 md:space-y-8 pb-6">
            {/* HERO “atelier” */}
            <header className="relative overflow-hidden rounded-3xl bg-sage text-ivory px-4 py-6 md:px-8 md:py-8 shadow-md animate-fade-up">
                {/* motif / halo */}
                <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light bg-[radial-gradient(circle_at_0%_0%,#b45c77_0,transparent_50%),radial-gradient(circle_at_100%_100%,#1e3d72_0,transparent_55%)]" />
                <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-ivory/10" />
                <div className="pointer-events-none absolute -right-16 bottom-0 h-36 w-36 rounded-full bg-ivory/10" />

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    {/* Bloc texte + mini stats */}
                    <div className="space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-ivory">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Ton espace personnel</span>
                        </div>

                        <div className="space-y-2">
                            <h1 className="font-serif-title text-2xl md:text-3xl leading-tight text-ivory">Bienvenue dans ton atelier Explor&apos;Art</h1>
                            <p className="text-sm md:text-base text-ivory/90">
                                Tu retrouves ici ce que tu as commencé, tes chemins préférés et des raccourcis pour continuer à ton rythme — sans pression, juste par petites
                                touches.
                            </p>
                        </div>

                        {/* mini stats atelier */}
                        <div className="flex flex-wrap gap-2 pt-1">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/10 px-3 py-1 text-[0.75rem] text-ivory/90">
                                <span className="h-1.5 w-1.5 rounded-full bg-ivory/80" />1 mini-formation en cours
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/10 px-3 py-1 text-[0.75rem] text-ivory/90">
                                <span className="h-1.5 w-1.5 rounded-full bg-ivory/80" />7 piliers à explorer
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/10 px-3 py-1 text-[0.75rem] text-ivory/90">
                                <Star className="h-3 w-3 text-ivory/90" />
                                Tes étoiles personnelles
                            </span>
                        </div>
                    </div>

                    {/* CTA group – même design que CTA À propos */}
                    <div className="relative flex flex-col sm:flex-row justify-start md:justify-end items-stretch md:items-center gap-3 w-full lg:w-auto">
                        <Link
                            href="/commencer-ici"
                            className="
                                group
                                flex-1 sm:flex-none sm:w-56
                                inline-flex items-center justify-center gap-2
                                rounded-full bg-ivory text-main
                                px-5 py-2.5 text-sm font-medium
                                shadow-sm
                                transition-all duration-200
                                hover:bg-ivory/90 hover:-translate-y-0.5
                            "
                        >
                            <Sparkles className="h-4 w-4" />
                            <span className="whitespace-nowrap">Reprendre la mini-formation</span>
                            <span className="transition-transform group-hover:translate-x-0.5">↗</span>
                        </Link>

                        <Link
                            href="/articles"
                            className="
                                group
                                flex-1 sm:flex-none sm:w-56
                                inline-flex items-center justify-center gap-2
                                rounded-full border border-ivory/70
                                bg-transparent
                                px-5 py-2.5 text-sm font-medium text-ivory
                                transition-all duration-200
                                hover:bg-ivory hover:text-main hover:-translate-y-0.5
                            "
                        >
                            <BookOpen className="h-4 w-4" />
                            <span className="whitespace-nowrap">Flâner dans les articles</span>
                            <span className="transition-transform group-hover:translate-x-0.5">☼</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* BARRE D’ONGLETS */}
            <nav className="rounded-full border border-perl/50 bg-ivory/90 px-1.5 py-1 flex items-center gap-1 overflow-x-auto">
                {ATELIER_TABS.map((tab) => {
                    const Icon = tab.icon;
                    const active = tab.id === activeTab;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.8rem] whitespace-nowrap
                                transition-all duration-150
                                ${active ? 'bg-sage text-ivory shadow-sm' : 'bg-transparent text-main/70 hover:bg-white'}
                            `}
                        >
                            <Icon className="h-3.5 w-3.5" />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* PANELS */}
            {activeTab === 'overview' && <OverviewPanel />}
            {activeTab === 'favorites' && <FavoritesPanel />}
            {activeTab === 'journeys' && <JourneysPanel />}
            {activeTab === 'downloads' && <DownloadsPanel />}
            {activeTab === 'profile' && <ProfilePanel />}
        </section>
    );
}
