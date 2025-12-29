// src/components/user/atelier/AtelierShell.tsx
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Sparkles } from 'lucide-react';
import type { CurrentUser } from '@/types/user';

import { ATELIER_HIGHLIGHTS, ATELIER_TABS, type AtelierTabId } from './atelier-data';
import { OverviewPanel } from './OverviewPanel';
import { FavoritesPanel } from './FavoritesPanel';
import { JourneysPanel } from './JourneysPanel';
import { DownloadsPanel } from './DownloadsPanel';
import { ProfilePanel } from './ProfilePanel';
import { CommentsPanel } from './CommentsPanel';

export function AtelierShell() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [user, setUser] = useState<CurrentUser | null>(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch('/api/users/me');
                const data = await res.json();
                setUser(data.user ?? null);
            } catch {
                setUser(null);
            } finally {
                setLoadingUser(false);
            }
        }

        void fetchUser();
    }, []);

    const tabParam = searchParams.get('tab');
    const fallbackTab: AtelierTabId = 'overview';

    const isValidTab = ATELIER_TABS.some((t) => t.id === tabParam);
    const activeTab: AtelierTabId = (isValidTab ? tabParam : fallbackTab) as AtelierTabId;

    const handleTabClick = (id: AtelierTabId) => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));

        if (id === fallbackTab) {
            params.delete('tab');
        } else {
            params.set('tab', id);
        }

        const query = params.toString();
        const url = query ? `/tableau-de-bord?${query}` : '/tableau-de-bord';

        router.push(url, { scroll: false });
    };

    return (
        <section className="relative pb-10 space-y-7 md:space-y-10">
            {/* Fond doux global */}
            <div className="pointer-events-none absolute inset-x-0 -top-16 -bottom-16 -z-10">
                <div className="h-full bg-linear-to-b from-ivory via-white to-ivory" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(58,108,96,0.08),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(180,92,119,0.08),transparent_36%),radial-gradient(circle_at_40%_80%,rgba(22,58,103,0.06),transparent_40%)]" />
            </div>

            {/* HERO “atelier” */}
            <header className="relative overflow-hidden rounded-3xl bg-linear-to-r from-main via-sage to-sage/80 text-ivory px-8 py-8 shadow-lg">
                {/* motif / halo */}
                <div className="pointer-events-none absolute inset-0 opacity-35 mix-blend-soft-light bg-[radial-gradient(circle_at_12%_18%,#b45c77_0,transparent_50%),radial-gradient(circle_at_88%_88%,#1e3d72_0,transparent_55%)]" />
                <div className="pointer-events-none absolute inset-5 rounded-[1.75rem] border border-ivory/15" />

                <div className="relative space-y-6">
                    {/* Ligne principale : texte / CTA */}
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        {/* Bloc texte + mini stats */}
                        <div className="space-y-4 max-w-2xl">
                            <div className="inline-flex items-center gap-2 rounded-full bg-ivory/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-ivory">
                                <Sparkles className="h-3.5 w-3.5" />
                                <span>Tableau de bord</span>
                            </div>

                            <div className="space-y-2.5">
                                <h1 className="font-serif-title text-2xl md:text-3xl leading-tight text-ivory">
                                    {loadingUser ? "Ton atelier Explor'Art" : user ? `Ton atelier, ${user.name}` : "Ton atelier Explor'Art"}
                                </h1>

                                <p className="text-sm md:text-base text-ivory/90">
                                    Ce tableau rassemble tes parcours, favoris et ressources. Un espace clair pour reprendre sereinement, sans perdre le fil de ta pratique.
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
                                    <Sparkles className="h-3 w-3 text-ivory/90" />
                                    Tes étoiles personnelles
                                </span>
                            </div>
                        </div>

                        {/* CTA group */}
                        <div className="w-full max-w-md lg:max-w-xs flex flex-col sm:flex-row lg:flex-col gap-2 lg:items-stretch lg:justify-center">
                            <Link
                                href="/commencer-ici"
                                className="
                                    group
                                    flex-1
                                    inline-flex items-center justify-center gap-2
                                    rounded-full bg-ivory text-main
                                    px-5 py-2.5 text-sm font-medium
                                    shadow-md shadow-main/20
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
                                    flex-1
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

                    {/* Highlights */}
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {ATELIER_HIGHLIGHTS.map((highlight) => {
                            const Icon = highlight.icon;
                            return (
                                <div key={highlight.label} className="relative overflow-hidden rounded-2xl bg-ivory/10 px-4 py-3 shadow-xxs ring-1 ring-ivory/15 backdrop-blur">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="space-y-1.5">
                                            <p className="text-[0.75rem] uppercase tracking-[0.18em] text-ivory/80">{highlight.label}</p>
                                            <p className="text-lg font-semibold text-ivory">{highlight.value}</p>
                                            <p className="text-[0.85rem] text-ivory/80">{highlight.detail}</p>
                                        </div>
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ivory/15">
                                            <Icon className="h-5 w-5 text-ivory" />
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </header>

            {/* BARRE D’ONGLETS */}
            <nav className="relative rounded-2xl border border-perl/60 bg-white/90 px-2 py-1.5 shadow-sm backdrop-blur">
                <div className="flex items-center gap-1 overflow-x-auto scrollbar-none [-webkit-overflow-scrolling:touch]">
                    {ATELIER_TABS.map((tab) => {
                        const Icon = tab.icon;
                        const active = tab.id === activeTab;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => handleTabClick(tab.id)}
                                className={`
                                    relative inline-flex items-center gap-1.5 rounded-xl
                                    px-3.5 py-2.5 text-[0.82rem] whitespace-nowrap
                                    transition-all duration-150 shrink-0
                                    ${active ? 'bg-sage text-ivory shadow-sm shadow-sage/20' : 'text-main/70 hover:bg-ivory cursor-pointer'}
                                `}
                            >
                                <Icon className="h-3.5 w-3.5" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* PANELS */}
            {activeTab === 'overview' && <OverviewPanel />}
            {activeTab === 'favorites' && <FavoritesPanel />}
            {activeTab === 'journeys' && <JourneysPanel />}
            {activeTab === 'downloads' && <DownloadsPanel />}
            {activeTab === 'comments' && <CommentsPanel />}
            {activeTab === 'profile' && <ProfilePanel user={user} isLoading={loadingUser} />}
        </section>
    );
}
