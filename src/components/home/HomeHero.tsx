import Link from 'next/link';
import Image from 'next/image';

export default function HomeHero() {
    return (
        <section className="relative overflow-hidden bg-ivory pt-4 pb-24 md:pt-24 md:pb-28">
            <div className="container-page relative animate-fade-in">
                <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.05fr)] gap-10 lg:gap-14 items-stretch">
                    {/* ======================
                       IMAGE EN PREMIER EN MOBILE
                    ====================== */}
                    <div className="relative order-1 lg:order-2 lg:pl-4 animate-fade-up-delay">
                        {/* cadre décalé derrière pour effet */}
                        <div
                            className="hidden lg:block absolute -top-6 -right-6 w-[92%] h-[94%] rounded-3xl border border-perl bg-background animate-slide-frame"
                            aria-hidden="true"
                        />

                        <div className="relative overflow-hidden rounded-3xl border border-perl/60 bg-ivory shadow-xl group">
                            <div className="relative h-[300px] sm:h-[360px] md:h-[420px] lg:h-[480px]">
                                <Image
                                    src="/images/hero/hero-explor-art.png"
                                    alt="Atelier calme avec carnets de croquis, pinceaux et nuancier de couleurs"
                                    fill
                                    priority
                                    className="object-cover transform-gpu scale-[1.15] transition-transform duration-1200 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.22] animate-parallax"
                                />

                                {/* gradient lisibilité */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />

                                {/* badges */}
                                <div className="absolute top-4 left-3 md:left-4 flex flex-col gap-2 animate-fade-up">
                                    <span className="px-3 py-1.5 rounded-full bg-black/55 text-ivory text-[0.7rem] uppercase tracking-[0.18em] backdrop-blur-sm">
                                        Atelier Explor&apos;Art
                                    </span>

                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose/90 text-ivory text-[0.68rem] uppercase tracking-[0.18em] shadow-sm">
                                        <span className="h-1.5 w-1.5 rounded-full bg-ivory" />
                                        Nouveau — Parcours &quot;Commencer ici&quot;
                                    </span>
                                </div>

                                {/* cartouche piliers */}
                                <div className="absolute right-4 bottom-4 hidden md:flex flex-col gap-2 rounded-2xl bg-black/35 backdrop-blur-md px-3 py-3 text-[0.68rem] text-ivory animate-fade-up-delay">
                                    <span className="uppercase tracking-[0.18em] text-[0.66rem] text-ivory/85">7 piliers</span>
                                    <div className="flex items-center gap-1.5">
                                        <span className="h-2 w-2 rounded-full bg-vert" />
                                        <span className="h-2 w-2 rounded-full bg-bleu" />
                                        <span className="h-2 w-2 rounded-full bg-ocre" />
                                        <span className="h-2 w-2 rounded-full bg-terre" />
                                        <span className="h-2 w-2 rounded-full bg-sage" />
                                        <span className="h-2 w-2 rounded-full bg-rose" />
                                        <span className="h-2 w-2 rounded-full bg-prune" />
                                    </div>
                                    <p className="text-[0.68rem] text-ivory/85">Du premier trait jusqu&apos;aux émotions que l’art réveille en toi.</p>
                                </div>
                            </div>

                            <div className="hidden md:flex items-center justify-between px-5 py-3 border-t border-perl bg-background backdrop-blur-sm">
                                <div className="flex flex-col">
                                    <span className="text-[0.7rem] tracking-[0.18em] uppercase text-main/60">Pour qui ?</span>
                                    <span className="text-xs text-main/75">Débutants, amateurs sensibles, amoureux·ses d’art qui veulent avancer en douceur.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ======================
                       TEXTE À GAUCHE (ou deuxième en mobile)
                    ====================== */}
                    <div className="space-y-7 lg:pr-6 order-2 lg:order-1 animate-fade-up">
                        <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                            <p className="section-label section-label-sage">Blog d&apos;art lumineux</p>
                            <span className="text-[0.72rem] uppercase tracking-[0.18em] text-main/70">Dessin · Œuvres · Couleurs · Émotions</span>
                        </div>

                        <div className="space-y-4 text-center md:text-start">
                            <h1 className="font-serif-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight">
                                Apprends à <span className="inline-block bg-background px-2 pb-2 rounded-lg shadow-sm relative animate-underline-reveal">regarder</span> l’art,
                                <br />
                                <span className="text-sage">pas seulement à l’analyser.</span>
                            </h1>

                            <p className="text-main/75 text-base md:text-lg max-w-xl leading-relaxed">
                                Explor&apos;Art est un espace doux et moderne pour apprendre à <span className="font-medium">dessiner, lire une œuvre, ressentir les couleurs</span>{' '}
                                et reconnecter la création à ce que tu ressens — sans jargon, sans pression, vraiment à ton rythme.
                            </p>
                        </div>

                        <div className="space-y-3 animate-fade-up-delay">
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                <Link href="/commencer-ici" className="btn btn-primary">
                                    Commencer ici
                                </Link>
                                <Link href="/articles" className="btn btn-secondary border border-perl text-main">
                                    Voir les articles
                                </Link>
                            </div>
                            <p className="text-xs text-main/60 max-w-md text-center md:text-start">
                                Un mini-parcours guidé pour te lancer en douceur, puis des articles classés par thèmes pour explorer l’art comme tu veux.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
