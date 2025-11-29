// src/components/user/atelier/OverviewPanel.tsx
import Link from 'next/link';
import { BookOpen, Clock, Sparkles, Star } from 'lucide-react';
import { mockFavorites, mockLastReading, mockMiniFormation, mockPillarProgress } from './atelier-data';

export function OverviewPanel() {
    return (
        <section className="space-y-6 md:space-y-8" aria-label="Vue d’ensemble de ton atelier">
            {/* Header résumé */}
            <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between rounded-3xl border border-perl/50 bg-white/95 px-5 py-4 shadow-sm">
                <div className="space-y-1.5">
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Tableau de bord</p>
                    <h2 className="font-serif-title text-xl md:text-[1.35rem] text-main">Ton atelier, en un coup d’œil</h2>
                    <p className="text-sm text-main/65 max-w-xl">
                        Reprends rapidement tes lectures, avance sur ta mini-formation et garde sous la main les piliers et favoris qui t’aident le plus en ce moment.
                    </p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-ivory px-3 py-1.5 text-[0.8rem] text-main/70 shadow-xxs">
                    <span className="h-2 w-2 rounded-full bg-sage animate-pulse" />
                    <span>Progression douce activée</span>
                </div>
            </header>

            {/* LIGNE 1 : continuer + mini-formation */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
                <ContinueReadingCard />
                <MiniFormationCard />
            </section>

            {/* LIGNE 2 : progression par piliers + favoris récents */}
            <section className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
                <PillarProgressCard />
                <FavoritesSummaryCard />
            </section>
        </section>
    );
}

/* ———————————————————————
   Continuer la lecture
   ——————————————————————— */

function ContinueReadingCard() {
    return (
        <article className="relative overflow-hidden rounded-3xl border border-perl/60 bg-linear-to-br from-white via-ivory/80 to-white p-5 md:p-6 shadow-md">
            {/* halo léger */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-soft-light bg-[radial-gradient(circle_at_12%_20%,#3c6e5a_0,transparent_40%),radial-gradient(circle_at_88%_86%,#b45c77_0,transparent_46%)]" />

            <div className="relative flex h-full flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-main/60">
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>Continuer là où tu t’es arrêtée</span>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-0.5 text-[0.7rem] text-main/55 shadow-xxs ring-1 ring-white/70">
                        <Sparkles className="h-3 w-3 text-sage" />
                        <span>Suggestion douce</span>
                    </span>
                </div>

                <div className="space-y-2">
                    <p className="text-[0.75rem] uppercase tracking-[0.18em] text-main/60">{mockLastReading.pillar}</p>
                    <Link href={mockLastReading.href} className="font-serif-title text-lg md:text-xl text-main hover:underline decoration-1 underline-offset-4">
                        {mockLastReading.title}
                    </Link>

                    <div className="flex flex-wrap items-center gap-2 text-sm text-main/70 mt-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[0.8rem] text-main/70 shadow-xxs">
                            <Clock className="h-4 w-4 text-main/50" />
                            <span>{mockLastReading.timeLeft}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/8 px-2.5 py-1 text-[0.8rem] text-sage shadow-xxs">
                            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                            <span>Lecture courte</span>
                        </span>
                    </div>
                </div>

                <div className="mt-auto pt-3 space-y-2">
                    <div className="flex flex-wrap gap-2 text-[0.78rem] text-main/70">
                        <span className="rounded-full bg-main/8 px-3 py-1 text-main">Recommandé aujourd’hui</span>
                        <span className="rounded-full bg-white/80 px-3 py-1">Idéal pour une pause café</span>
                    </div>

                    <Link
                        href={mockLastReading.href}
                        className="inline-flex items-center gap-2 rounded-full bg-main px-4 py-2.5 text-sm font-medium text-ivory shadow-sm transition hover:-translate-y-0.5 hover:bg-main/90"
                    >
                        Reprendre la lecture
                        <span aria-hidden>↗</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}

/* ———————————————————————
   Mini-formation Commencer ici
   ——————————————————————— */

function MiniFormationCard() {
    return (
        <article className="relative flex flex-col gap-3 rounded-3xl border border-perl/60 bg-white/95 p-5 md:p-6 shadow-sm">
            <div className="flex items-center justify-between gap-2">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Mini-formation</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-sage/10 px-2.5 py-0.5 text-[0.7rem] text-sage">
                    <Sparkles className="h-3 w-3" />
                    <span>En cours</span>
                </span>
            </div>

            <div className="space-y-2">
                <Link href={mockMiniFormation.href} className="font-serif-title text-lg text-main hover:underline decoration-1 underline-offset-4">
                    {mockMiniFormation.title}
                </Link>
                <p className="text-sm text-main/70">{mockMiniFormation.currentStep}</p>
                <p className="text-[0.85rem] text-main/60">Un petit chemin guidé pour poser des bases solides avant de flâner librement dans les 7 piliers.</p>
            </div>

            <div className="space-y-2 rounded-2xl bg-ivory/75 p-3">
                <div className="flex items-center justify-between text-[0.8rem] text-main/70">
                    <span>Progression globale</span>
                    <span className="font-medium text-main">{mockMiniFormation.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-perl/25 overflow-hidden">
                    <div className="h-full rounded-full bg-sage transition-all" style={{ width: `${mockMiniFormation.progress}%` }} />
                </div>
                <div className="flex flex-wrap gap-2 text-[0.8rem] text-main/70">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 shadow-xxs">2–3 blocs à la fois</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 shadow-xxs">Pas de prérequis</span>
                </div>
            </div>

            <div className="pt-2">
                <Link
                    href={mockMiniFormation.href}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-perl/70 bg-ivory px-4 py-2.5 text-sm font-medium text-main/80 transition hover:-translate-y-0.5 hover:border-sage/70 hover:bg-sage/5"
                >
                    Ouvrir la mini-formation
                    <span aria-hidden>↗</span>
                </Link>
            </div>
        </article>
    );
}

/* ———————————————————————
   Progression par pilier
   ——————————————————————— */

function PillarProgressCard() {
    return (
        <section aria-label="Progression par pilier" className="space-y-4">
            <div className="flex items-center justify-between gap-2">
                <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Tes chemins en cours</p>
                    <h3 className="font-serif-title text-lg md:text-xl text-main">Progression par pilier</h3>
                </div>
                <Link href="/categories" className="text-[0.8rem] text-main underline underline-offset-2 hover:text-sage">
                    Voir les 7 piliers
                </Link>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
                {mockPillarProgress.map((pillar) => (
                    <Link
                        key={pillar.label}
                        href={pillar.href}
                        className="group rounded-2xl border border-perl/50 bg-white/95 p-4 shadow-xxs transition-all hover:-translate-y-0.5 hover:border-sage/70 hover:shadow-sm"
                    >
                        <div className="mb-2 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <span className={`h-2 w-2 rounded-full ${pillar.colorClass}`} />
                                <span className="text-sm font-medium text-main group-hover:text-main">{pillar.label}</span>
                            </div>
                            <span className="text-[0.75rem] text-main/60">{pillar.progress}%</span>
                        </div>

                        <div className="mb-1 h-2 overflow-hidden rounded-full bg-perl/20">
                            <div className={`h-full rounded-full ${pillar.colorClass} transition-all`} style={{ width: `${pillar.progress}%` }} />
                        </div>

                        <div className="mt-1 flex items-center justify-between text-[0.78rem] text-main/65">
                            <p>Clique pour voir les articles de ce pilier.</p>
                            <span className="hidden sm:inline-flex items-center justify-center rounded-full bg-ivory px-2 py-1 text-main/70 opacity-0 transition group-hover:opacity-100">
                                →
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

/* ———————————————————————
   Favoris récents
   ——————————————————————— */

function FavoritesSummaryCard() {
    return (
        <aside className="rounded-3xl border border-perl/60 bg-white/95 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-2">
                <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Favoris</p>
                    <h3 className="font-serif-title text-lg text-main">Tes étoiles récentes</h3>
                </div>
                <div className="inline-flex h-9 items-center gap-2 rounded-full bg-rose/10 px-3 text-[0.82rem] text-rose/80">
                    <Star className="h-4 w-4" />
                    <span>{mockFavorites.length} repères</span>
                </div>
            </div>

            <ul className="space-y-2.5">
                {mockFavorites.map((fav) => (
                    <li key={fav.href}>
                        <Link href={fav.href} className="group -mx-3 flex flex-col gap-0.5 rounded-2xl px-3 py-2 transition hover:bg-ivory/85">
                            <span className="inline-flex items-center gap-1 text-[0.75rem] text-main/60">
                                <span className={`h-1.5 w-1.5 rounded-full ${fav.pillarColorClass}`} />
                                <span>{fav.tag}</span>
                            </span>
                            <span className="text-sm text-main decoration-1 underline-offset-4">{fav.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[0.8rem] text-main/60">
                <p className="max-w-xs">Plus tard, tu pourras épingler n’importe quel article et le retrouver ici.</p>
                <Link
                    href="/tableau-de-bord?tab=favorites"
                    className="inline-flex items-center gap-1 rounded-full bg-ivory px-3 py-1.5 text-main/70 underline underline-offset-2 transition hover:text-main"
                >
                    <span>Voir tout</span>
                    <span aria-hidden>↗</span>
                </Link>
            </div>
        </aside>
    );
}
