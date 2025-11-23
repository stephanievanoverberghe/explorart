import Link from 'next/link';
import Image from 'next/image';

export default function HomeStartHere() {
    return (
        <section className="relative overflow-hidden bg-background py-16 md:py-20">
            {/* halos d'ambiance très doux */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-24 right-[-15%] h-64 w-64 rounded-full bg-sage/14 blur-[90px]" />
                <div className="absolute -bottom-32 left-[-10%] h-72 w-72 rounded-full bg-rose/14 blur-[110px]" />
            </div>

            <div className="container-page space-y-10">
                {/* Titre + intro + mini timeline */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between animate-fade-up">
                    <div className="space-y-3 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-3">
                            <p className="section-label section-label-vert">Première étape</p>
                            <div className="inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-main/60">
                                <span className="h-1.5 w-1.5 rounded-full bg-vert" />
                                <span className="h-1.5 w-1.5 rounded-full bg-bleu" />
                                <span className="h-1.5 w-1.5 rounded-full bg-rose" />
                                <span>Mini parcours guidé</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h2 className="font-serif-title text-2xl md:text-3xl">Commencer ici, tout en douceur</h2>
                            <p className="text-main/75">
                                Un mini-parcours guidé pour reprendre confiance : un tutoriel simple, une analyse d’œuvre accessible, une première rencontre avec les couleurs.
                            </p>
                        </div>
                    </div>

                    {/* timeline visuelle des 3 étapes */}
                    <div className="w-full md:w-auto">
                        <div className="rounded-3xl border border-perl/60 bg-ivory/80 px-4 py-3 md:px-5 md:py-3.5 shadow-sm">
                            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/70 mb-2">Parcours en 3 petites étapes</p>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 flex items-center justify-between">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="h-2 w-2 rounded-full bg-vert" />
                                        <span className="text-[0.7rem] text-main/60">1</span>
                                    </div>
                                    <span className="h-px flex-1 bg-perl/80 mx-1" />
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="h-2 w-2 rounded-full bg-bleu" />
                                        <span className="text-[0.7rem] text-main/60">2</span>
                                    </div>
                                    <span className="h-px flex-1 bg-perl/80 mx-1" />
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="h-2 w-2 rounded-full bg-rose" />
                                        <span className="text-[0.7rem] text-main/60">3</span>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-2 text-[0.75rem] text-main/70">
                                En moins de <span className="font-medium">30 minutes</span>, une première traversée douce entre dessin, regard et couleur.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3 étapes */}
                <div className="grid gap-8 md:grid-cols-3">
                    {/* ==== CARD 1 ==== */}
                    <Link
                        href="/commencer-ici"
                        className="cursor-pointer relative flex flex-col overflow-hidden rounded-3xl border border-perl/60 bg-ivory/40 shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)] animate-fade-up"
                        style={{ animationDelay: '0.05s' }}
                    >
                        <div className="pointer-events-none absolute right-4 top-4 h-16 w-16 rounded-full bg-terre/15 blur-xl" />

                        <div className="relative h-40 sm:h-44 md:h-48 w-full overflow-hidden rounded-t-3xl">
                            <Image
                                src="/images/home/start-here-tutoriel.png"
                                alt="Croquis simple et carnet de dessin sur une table claire"
                                fill
                                className="object-cover transition-transform duration-900 group-hover:scale-[1.08]"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-terre/40 via-black/10 to-transparent" />

                            <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-ivory backdrop-blur-md shadow-sm">
                                Étape 1
                            </span>
                        </div>

                        <div className="p-5 flex-1 flex flex-col gap-3">
                            <p className="badge badge-level w-fit px-3">Tutoriel</p>
                            <h3 className="font-serif-title text-lg sm:text-xl leading-snug transition-all duration-300 group-hover:text-terre">
                                Ton premier dessin simple et décomplexé
                            </h3>
                            <p className="text-sm text-main/70">Un exercice très accessible pour reprendre un crayon sans pression et retrouver le plaisir de tracer.</p>

                            <div className="mt-auto flex items-center justify-between pt-3 border-t border-perl/40 text-[0.78rem] text-main">
                                <span>~ 10 min</span>
                                <span className="inline-flex items-center gap-1 text-sage group-hover:text-terre transition-colors">Découvrir l’étape ↗</span>
                            </div>
                        </div>
                    </Link>

                    {/* ==== CARD 2 ==== */}
                    <Link
                        href="/commencer-ici"
                        className="cursor-pointer relative flex flex-col overflow-hidden rounded-3xl border border-perl/60 bg-ivory/40 shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)] animate-fade-up"
                        style={{ animationDelay: '0.12s' }}
                    >
                        <div className="pointer-events-none absolute right-4 top-4 h-16 w-16 rounded-full bg-bleu/15 blur-xl" />

                        <div className="relative h-40 sm:h-44 md:h-48 w-full overflow-hidden rounded-t-3xl">
                            <Image
                                src="/images/home/start-here-analyse-oeuvre.png"
                                alt="Reproduction de tableau et notes griffonnées au crayon"
                                fill
                                className="object-cover transition-transform duration-900 group-hover:scale-[1.08]"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-bleu/40 via-black/10 to-transparent" />

                            <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-ivory backdrop-blur-md shadow-sm">
                                Étape 2
                            </span>
                        </div>

                        <div className="p-5 flex-1 flex flex-col gap-3">
                            <p className="badge badge-level w-fit px-3">Analyse d’œuvre</p>
                            <h3 className="font-serif-title text-lg sm:text-xl leading-snug transition-all duration-300 group-hover:text-terre">Lire une image en 3 questions</h3>
                            <p className="text-sm text-main/70">Une méthode claire pour regarder un tableau sans te perdre dans les détails ou le vocabulaire compliqué.</p>

                            <div className="mt-auto flex items-center justify-between pt-3 border-t border-perl/40 text-[0.78rem] text-main">
                                <span>~ 8 min</span>
                                <span className="inline-flex items-center gap-1 text-sage group-hover:text-terre transition-colors">Découvrir l’étape ↗</span>
                            </div>
                        </div>
                    </Link>

                    {/* ==== CARD 3 ==== */}
                    <Link
                        href="/commencer-ici"
                        className="cursor-pointer relative flex flex-col overflow-hidden rounded-3xl border border-perl/60 bg-ivory/40 shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)] animate-fade-up"
                        style={{ animationDelay: '0.19s' }}
                    >
                        <div className="pointer-events-none absolute right-4 top-4 h-16 w-16 rounded-full bg-rose/15 blur-xl" />

                        <div className="relative h-40 sm:h-44 md:h-48 w-full overflow-hidden rounded-t-3xl">
                            <Image
                                src="/images/home/start-here-couleurs.png"
                                alt="Nuancier de couleurs douces et pinceaux"
                                fill
                                className="object-cover transition-transform duration-900 group-hover:scale-[1.08]"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-rose/40 via-black/10 to-transparent" />

                            <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-ivory backdrop-blur-md shadow-sm">
                                Étape 3
                            </span>
                        </div>

                        <div className="p-5 flex-1 flex flex-col gap-3">
                            <p className="badge badge-level w-fit px-3">Couleurs</p>
                            <h3 className="font-serif-title text-lg sm:text-xl leading-snug transition-all duration-300 group-hover:text-terre">
                                Pourquoi certaines couleurs apaisent ?
                            </h3>
                            <p className="text-sm text-main/70">
                                Une introduction douce à la psychologie des couleurs, pour mettre des mots sur ce que tu ressens devant une palette.
                            </p>

                            <div className="mt-auto flex items-center justify-between pt-3 border-t border-perl/40 text-[0.78rem] text-main">
                                <span>~ 7 min</span>
                                <span className="inline-flex items-center gap-1 text-sage group-hover:text-terre transition-colors">Découvrir l’étape ↗</span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* CTA global en bas */}
                <div className="flex justify-center pt-2 animate-fade-up" style={{ animationDelay: '0.28s' }}>
                    <Link
                        href="/commencer-ici"
                        className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-ivory/90 px-4 py-2 text-xs md:text-sm text-main/75 hover:bg-ivory hover:text-main hover:-translate-y-px transition-all"
                    >
                        <span>Suivre le parcours complet dès maintenant</span>
                        <span>↗</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
