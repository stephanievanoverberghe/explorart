// src/components/home/HomeHero.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function HomeHero() {
    return (
        <section className="relative overflow-hidden py-16 md:py-20 lg:py-24">
            {/* arrière-plan très léger */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-sage/10 blur-[120px]" />
                <div className="absolute -bottom-40 left-[-15%] h-[480px] w-[480px] rounded-full bg-rose/10 blur-[140px]" />
            </div>

            <div className="container-page relative">
                <div className="grid gap-12 lg:gap-16 lg:grid-cols-[1.05fr,1fr] items-center">
                    {/* ======================
                       COLONNE IMAGE / VISUEL
                       (en premier sur mobile)
                    ====================== */}
                    <div className="order-1 lg:order-2">
                        <div className="relative rounded-3xl border border-perl/60 bg-ivory shadow-xl overflow-hidden">
                            {/* IMAGE */}
                            <div className="relative h-[260px] sm:h-80 md:h-[380px] lg:h-[420px]">
                                <Image
                                    src="/images/hero/hero-explor-art.png"
                                    alt="Atelier artistique calme avec carnets de croquis, pinceaux et nuancier de couleurs"
                                    fill
                                    priority
                                    className="object-cover"
                                />
                                {/* léger filtre pour calmer l'image */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/20 to-black/5" />

                                {/* BADGE EN HAUT */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    <span className="inline-flex items-center rounded-full bg-black/55 backdrop-blur-sm px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ivory">
                                        Atelier Explor&apos;Art
                                    </span>
                                    <span className="inline-flex items-center rounded-full bg-rose/90 px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ivory shadow-sm">
                                        Nouveau · Parcours &quot;Commencer ici&quot;
                                    </span>
                                </div>

                                {/* CARTOUCHE EN BAS : PILIERS SUR L'IMAGE */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[88%] rounded-2xl bg-ivory/95 backdrop-blur-md px-4 py-3 shadow-xl border border-perl/60">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="space-y-0.5">
                                            <p className="text-[0.7rem] uppercase tracking-[0.18em] font-semibold text-main/70">Explorer par piliers</p>
                                            <p className="text-[0.78rem] text-main/75">Du trait aux émotions : 7 portes d’entrée pour apprivoiser l’art.</p>
                                        </div>
                                        <div className="flex items-center gap-1.5 pt-1 sm:pt-0">
                                            <span className="h-2.5 w-2.5 rounded-full bg-vert" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-bleu" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-ocre" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-terre" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-sage" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-rose" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-prune" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ======================
                       COLONNE TEXTE / EDITO
                       (en second sur mobile)
                    ====================== */}
                    <div className="order-2 lg:order-1 space-y-7">
                        <div className="flex flex-wrap items-center gap-3">
                            <p className="section-label section-label-sage">Blog d&apos;art lumineux</p>
                            <span className="text-[0.72rem] uppercase tracking-[0.18em] text-main/60">Dessin · Œuvres · Couleurs · Émotions</span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="font-serif-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight">
                                Laisse l’art devenir <span className="inline-block bg-ivory px-2 pb-1 rounded-lg shadow-sm">clair</span>
                                .
                                <br />
                                <span className="text-sage">Sensible. Lumineux. Vivant.</span>
                            </h1>

                            <p className="text-main/75 text-base md:text-lg max-w-xl leading-relaxed">
                                Explor&apos;Art est un espace doux et moderne pour apprendre à <span className="font-medium">dessiner, lire une œuvre, ressentir les couleurs</span>{' '}
                                et reconnecter la création à ce que tu ressens — sans jargon, sans pression, vraiment à ton rythme.
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="space-y-3">
                            <div className="flex flex-wrap gap-3">
                                <Link href="/commencer-ici" className="btn btn-primary">
                                    Commencer ici
                                </Link>
                                <Link href="/articles" className="btn btn-ghost border border-perl/60 bg-ivory/80 hover:bg-ivory text-main">
                                    Voir les articles
                                </Link>
                            </div>
                            <p className="text-xs text-main/60 max-w-md">
                                Un mini-parcours guidé pour te lancer en douceur, puis des articles classés par thèmes pour explorer l’art comme tu veux.
                            </p>
                        </div>

                        {/* micro-stats / marqueurs */}
                        <div className="flex flex-wrap gap-4 pt-2 text-xs text-main/65">
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-vert" />
                                <span>Débutants & amateurs sensibles bienvenus</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-sage" />
                                <span>7 piliers pédagogiques</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-perl/60 bg-ivory/80 backdrop-blur-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-rose" />
                                <span className="uppercase tracking-[0.18em] text-[0.67rem]">pédagogie douce</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
