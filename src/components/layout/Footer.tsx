// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Instagram, Youtube } from 'lucide-react';

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-foreground text-ivory">
            {/* Halos artistiques */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-24 left-[-10%] h-72 w-72 rounded-full bg-rose/20 blur-[120px]" />
                <div className="absolute bottom-[-30%] right-[-15%] h-80 w-80 rounded-full bg-sage/18 blur-[140px]" />
            </div>

            <div className="container-page py-14 space-y-12">
                {/* BRAND / INTRO */}
                <div className="space-y-4 max-w-xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-black/20 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-ivory/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose" />
                        Explor&apos;Art — blog d&apos;art lumineux
                    </div>

                    <p className="font-serif-title text-2xl md:text-3xl">
                        Regarder, ressentir
                        <br />
                        et apprendre l&apos;art autrement.
                    </p>

                    <p className="text-ivory/80 text-sm leading-relaxed">
                        Un espace pour celles et ceux qui se sentent « pas assez doué·es » ou « pas assez cultivé·es », mais qui ont envie de reprendre le crayon, d&apos;oser
                        regarder les œuvres et d&apos;écouter ce que l&apos;art réveille en eux.
                    </p>

                    {/* 7 PILIERS */}
                    <div className="flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-ivory/70 mt-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-vert" />
                        <span className="h-1.5 w-1.5 rounded-full bg-bleu" />
                        <span className="h-1.5 w-1.5 rounded-full bg-ocre" />
                        <span className="h-1.5 w-1.5 rounded-full bg-terre" />
                        <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                        <span className="h-1.5 w-1.5 rounded-full bg-rose" />
                        <span className="h-1.5 w-1.5 rounded-full bg-prune" />
                        <span className="ml-1">Les 7 piliers pour avancer en douceur</span>
                    </div>
                </div>

                {/* GRID LIENS (Découvrir / Ressources / À propos) */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Découvrir */}
                    <div>
                        <p className="text-[0.75rem] uppercase tracking-[0.2em] text-ivory/70 mb-3">Découvrir</p>
                        <ul className="space-y-2 text-ivory/85 text-sm">
                            <li>
                                <Link href="/commencer-ici" className="hover:text-terre transition-colors">
                                    Commencer ici
                                </Link>
                            </li>
                            <li>
                                <Link href="/articles" className="hover:text-terre transition-colors">
                                    Tous les articles
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="hover:text-terre transition-colors">
                                    Thèmes & catégories
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Ressources */}
                    <div>
                        <p className="text-[0.75rem] uppercase tracking-[0.2em] text-ivory/70 mb-3">Ressources</p>
                        <ul className="space-y-2 text-ivory/85 text-sm">
                            <li>
                                <Link href="/ressources/palettes" className="hover:text-terre transition-colors">
                                    Palettes & couleurs
                                </Link>
                            </li>
                            <li>
                                <Link href="/ressources/exercices" className="hover:text-terre transition-colors">
                                    Exercices doux
                                </Link>
                            </li>
                            <li>
                                <Link href="/ressources/guides" className="hover:text-terre transition-colors">
                                    Guides & PDF
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* À propos */}
                    <div>
                        <p className="text-[0.75rem] uppercase tracking-[0.2em] text-ivory/70 mb-3">À propos</p>
                        <ul className="space-y-2 text-ivory/85 text-sm">
                            <li>
                                <Link href="/a-propos" className="hover:text-terre transition-colors">
                                    Le projet Explor&apos;Art
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-terre transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* NEWSLETTER EN PLEINE LARGEUR */}
                <div className="w-full">
                    <div className="mx-auto max-w-3xl rounded-3xl border border-ivory/20 bg-black/25 px-5 py-6 sm:px-7 sm:py-7 flex flex-col gap-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div className="space-y-1">
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-ivory/10 px-2.5 py-1">
                                    <span className="h-1.5 w-1.5 rounded-full bg-rose" />
                                    <span className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory/80">Newsletter</span>
                                </div>
                                <p className="text-sm text-ivory/90 font-medium">Une petite lettre d&apos;art, de couleurs et d&apos;idées à lire tranquillement.</p>
                                <p className="text-[0.75rem] text-ivory/70">Pas de spam — juste quelques mails pour nourrir ton regard, ton carnet et ton envie de créer.</p>
                            </div>
                        </div>

                        <form className="space-y-2">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    placeholder="Ton email"
                                    className="flex-1 px-3 py-2 rounded-md bg-ivory/10 text-ivory text-sm placeholder-ivory/50 focus:outline-none focus:ring-1 focus:ring-rose"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 cursor-pointer rounded-md bg-sage text-ivory text-xs sm:text-sm uppercase tracking-[0.16em] hover:bg-terre transition"
                                >
                                    S&apos;inscrire
                                </button>
                            </div>
                            <p className="text-[0.65rem] text-ivory/60">Tu pourras te désinscrire en un clic, à tout moment.</p>
                        </form>

                        {/* Réseaux sociaux */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                            <span className="text-[0.7rem] uppercase tracking-[0.16em] text-ivory/60">Me suivre en dehors du blog</span>
                            <div className="flex items-center gap-2">
                                <Link
                                    href="#"
                                    aria-label="Instagram"
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-ivory/10 hover:bg-ivory/20 transition-colors"
                                >
                                    <Instagram className="h-4 w-4" aria-hidden="true" />
                                </Link>
                                <Link
                                    href="#"
                                    aria-label="YouTube"
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-ivory/10 hover:bg-ivory/20 transition-colors"
                                >
                                    <Youtube className="h-4 w-4" aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SEPARATOR */}
                <div className="h-px bg-ivory/15" />

                {/* BOTTOM BAR + LÉGAL */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-ivory/60">
                    <div className="space-y-1">
                        <span>© {year} Explor&apos;Art — Tous droits réservés.</span>
                        <span>Créé avec douceur, curiosité et beaucoup de couleurs.</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 md:justify-end">
                        <Link href="/legal/mentions-legales" className="hover:text-ivory transition-colors">
                            Mentions légales
                        </Link>
                        <span className="opacity-40">•</span>
                        <Link href="/legal/politique-de-confidentialite" className="hover:text-ivory transition-colors">
                            Confidentialité
                        </Link>
                        <span className="opacity-40">•</span>
                        <Link href="/legal/cookies" className="hover:text-ivory transition-colors">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
