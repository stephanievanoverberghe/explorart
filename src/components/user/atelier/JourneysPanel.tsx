// src/components/user/atelier/JourneysPanel.tsx
import Link from 'next/link';
import { Sparkles, BookOpen } from 'lucide-react';
import { mockMiniFormation } from './atelier-data';

export function JourneysPanel() {
    return (
        <section className="space-y-6 md:space-y-7" aria-label="Parcours & mini-formations Explor'Art">
            {/* Header résumé */}
            <header className="rounded-3xl border border-perl/50 bg-white/95 px-5 py-4 shadow-sm flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1.5">
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Parcours guidés</p>
                    <h2 className="font-serif-title text-xl md:text-2xl text-main">Tes parcours & mini-formations</h2>
                    <p className="text-sm text-main/70 max-w-2xl">
                        Ici, tu retrouveras la mini-formation “Commencer ici” et, bientôt, des parcours thématiques pour avancer par petites étapes bien balisées.
                    </p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-ivory px-3 py-1.5 text-[0.8rem] text-main/70 shadow-xxs">
                    <span className="h-2 w-2 rounded-full bg-sage animate-pulse" />
                    <span>Chemin guidé en cours</span>
                </div>
            </header>

            {/* Grille des parcours */}
            <div className="grid gap-4 md:gap-5 md:grid-cols-2">
                {/* Mini-formation actuelle */}
                <article className="relative overflow-hidden rounded-3xl border border-sage bg-background p-5 md:p-6 shadow-md">
                    <div className="relative flex h-full flex-col gap-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-main/60">
                                <BookOpen className="h-3.5 w-3.5" />
                                <span>Parcours en cours</span>
                            </div>
                            <span className="inline-flex items-center gap-1 rounded-full bg-sage/10 px-2.5 py-0.5 text-[0.7rem] text-sage shadow-xxs">
                                <Sparkles className="h-3 w-3" />
                                <span>Prioritaire en ce moment</span>
                            </span>
                        </div>

                        <div className="space-y-1.5">
                            <Link href={mockMiniFormation.href} className="font-serif-title text-lg md:text-[1.1rem] text-main hover:underline decoration-1 underline-offset-4">
                                {mockMiniFormation.title}
                            </Link>
                            <p className="text-sm text-main/70">{mockMiniFormation.currentStep}</p>
                            <p className="text-[0.85rem] text-main/60">
                                Un petit chemin à suivre étape par étape pour poser des bases solides avant de te perdre avec plaisir dans les 7 piliers.
                            </p>
                        </div>

                        {/* progression */}
                        <div className="mt-1 space-y-2 rounded-2xl bg-ivory/80 p-3">
                            <div className="flex items-center justify-between text-[0.8rem] text-main/70">
                                <span>Progression globale</span>
                                <span className="font-medium text-main">{mockMiniFormation.progress}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-perl/25 overflow-hidden">
                                <div className="h-full rounded-full bg-sage transition-all" style={{ width: `${mockMiniFormation.progress}%` }} />
                            </div>
                            <div className="flex flex-wrap gap-2 text-[0.8rem] text-main/70">
                                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 shadow-xxs">
                                    <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                                    <span>2–3 blocs à la fois</span>
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 shadow-xxs">
                                    <span className="h-1.5 w-1.5 rounded-full bg-main/70" />
                                    <span>Pas de prérequis</span>
                                </span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Link
                                href={mockMiniFormation.href}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage px-4 py-2.5 text-sm font-medium text-ivory shadow-sm transition hover:-translate-y-0.5 hover:bg-sage/80"
                            >
                                <span>Reprendre ce parcours</span>
                                <span aria-hidden>↗</span>
                            </Link>
                        </div>
                    </div>
                </article>

                {/* Parcours à venir */}
                <article className="relative flex h-full flex-col gap-3 rounded-3xl border border-dashed border-perl/70 bg-ivory/90 p-5 md:p-6 shadow-xxs">
                    <div className="space-y-1.5">
                        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/55">À venir</p>
                        <h3 className="font-serif-title text-base md:text-lg text-main">Parcours thématiques en préparation</h3>
                        <p className="text-sm text-main/70">
                            Des parcours construits autour d’un fil rouge : couleurs, psychologie de l’art, histoire de l’art… avec des étapes courtes, des exercices doux et des
                            ressources téléchargeables.
                        </p>
                    </div>

                    <ul className="space-y-1.5 text-[0.86rem] text-main/70">
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sage" />
                            <span>Parcours &quot;Couleurs & harmonie&quot; : comprendre, observer et créer tes propres palettes.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-prune/80" />
                            <span>Parcours &quot;Psychologie de l’art&quot; : apprivoiser le trac, le perfectionnisme, la peur de se lancer.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-ocre/80" />
                            <span>Parcours &quot;Histoire de l’art&quot; : voyager à travers quelques œuvres clés, sans jargon.</span>
                        </li>
                    </ul>

                    <p className="text-[0.8rem] text-main/60 pt-1">
                        Quand ces parcours seront prêts, tu pourras suivre ta progression, débloquer des bonus de fin et revenir facilement à chaque étape.
                    </p>

                    <div className="pt-2">
                        <Link
                            href="/commencer-ici"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-perl/70 bg-white/80 px-4 py-2.5 text-sm font-medium text-main/80 transition hover:-translate-y-0.5 hover:border-sage/70 hover:bg-sage/5"
                        >
                            <span>Découvrir la mini-formation actuelle</span>
                            <span aria-hidden>⋅⋅⋅</span>
                        </Link>
                    </div>
                </article>
            </div>
        </section>
    );
}
