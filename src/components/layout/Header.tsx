// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

// Liens principaux
const mainLinks = [
    { href: '/commencer-ici', label: 'Commencer ici' },
    { href: '/a-propos', label: 'À propos' },
];

// Catégories / 7 piliers
const explorerCategories = [
    {
        href: '/categories/dessin-peinture',
        label: 'Dessiner & Peindre',
        description: 'Techniques douces pour apprivoiser le trait, les formes et la matière.',
        tagline: 'Pratique & geste',
        image: '/images/categories/dessin-peinture.png',
        dotClass: 'bg-vert',
    },
    {
        href: '/categories/analyse-d-oeuvre',
        label: 'Comprendre une œuvre',
        description: 'Apprendre à lire une image sans jargon, avec des questions simples.',
        tagline: 'Regarder autrement',
        image: '/images/categories/analyse-oeuvre.png',
        dotClass: 'bg-bleu',
    },
    {
        href: '/categories/histoires-d-artistes',
        label: 'Histoires d’artistes',
        description: 'Récits d’atelier, parcours sensibles, coulisses et cheminements créatifs.',
        tagline: 'Récits & coulisses',
        image: '/images/categories/histoires-artistes.png',
        dotClass: 'bg-terre',
    },
    {
        href: '/categories/histoire-de-l-art',
        label: 'Histoire de l’art',
        description: 'Remonter le temps à travers quelques œuvres clés, sans liste de dates.',
        tagline: 'Repères essentiels',
        image: '/images/categories/histoire-art.png',
        dotClass: 'bg-ocre',
    },
    {
        href: '/categories/couleurs-harmonie',
        label: 'Couleurs & harmonie',
        description: 'Comprendre comment vibrent les couleurs ensemble, en douceur.',
        tagline: 'Palettes & ambiance',
        image: '/images/categories/couleurs-harmonie.png',
        dotClass: 'bg-sage',
    },
    {
        href: '/categories/psychologie-de-l-art',
        label: 'Psychologie de l’art',
        description: 'Ce que l’art réveille en nous : émotions, blocages, élans intérieurs.',
        tagline: 'Ressentis & émotions',
        image: '/images/categories/psychologie-art.png',
        dotClass: 'bg-prune',
    },
    {
        href: '/categories/inspirations',
        label: 'Inspirations',
        description: 'Idées, ambiances et pistes pour nourrir ton regard au quotidien.',
        tagline: 'Idées à piocher',
        image: '/images/categories/inspirations.png',
        dotClass: 'bg-rose',
    },
];

export function Header() {
    const pathname = usePathname();
    const [openMobile, setOpenMobile] = useState(false);
    const [openExplorer, setOpenExplorer] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const explorerButtonRef = useRef<HTMLButtonElement | null>(null);

    const isActive = (href: string) => pathname === href;

    // Explorer est considéré "actif" sur toutes les pages de contenu
    const explorerActive = openExplorer || pathname.startsWith('/categories') || pathname.startsWith('/articles');

    // Scroll : change juste le style du header (ne ferme plus le menu)
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 8);
        };
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Click-outside global pour fermer le menu Explorer (desktop)
    useEffect(() => {
        if (!openExplorer) return;

        const handleClick = (event: MouseEvent) => {
            const target = event.target as Node | null;
            if (!target) return;

            if (dropdownRef.current?.contains(target)) return;
            if (explorerButtonRef.current?.contains(target)) return;

            setOpenExplorer(false);
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [openExplorer]);

    // Explorer actif en mobile / tablette
    const explorerMobileActive = pathname.startsWith('/categories') || pathname.startsWith('/articles');

    return (
        <header className={`navbar sticky top-0 z-40 border-b border-perl/40 backdrop-blur-md transition-all duration-200 ${scrolled ? 'bg-page/95 shadow-sm' : 'bg-page/80'}`}>
            <div className="container-page flex items-center justify-between gap-3 h-16 md:h-20">
                {/* LOGO */}
                <Link
                    href="/"
                    className="flex items-center gap-2 md:gap-2.5 transition-transform duration-200 hover:-translate-y-px"
                    onClick={() => {
                        setOpenMobile(false);
                        setOpenExplorer(false);
                    }}
                >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-vert/90 text-[0.75rem] font-semibold text-ivory shadow-sm">EA</span>
                    <div className="flex flex-col leading-tight">
                        <span className="font-serif-title text-base md:text-lg tracking-tight">Explor&apos;Art</span>
                        <span className="hidden text-[0.7rem] uppercase tracking-[0.18em] text-main/50 sm:block">Dessiner · Comprendre · Ressentir</span>
                    </div>
                </Link>

                {/* NAV DESKTOP – à partir de lg */}
                <nav className="hidden lg:flex items-center gap-2 xl:gap-4 text-sm">
                    {/* Commencer ici */}
                    {(() => {
                        const link = mainLinks[0];
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpenExplorer(false)}
                                className={`group relative rounded-full px-3.5 py-1.5 border text-sm transition-all duration-200 ease-out hover:-translate-y-px ${
                                    active ? 'bg-ivory text-terre border-perl/80 font-medium' : 'bg-transparent text-main/75 border-transparent hover:bg-ivory/80 hover:text-main'
                                }`}
                            >
                                <span>{link.label}</span>
                                <span
                                    className={`pointer-events-none absolute left-3 right-3 -bottom-1 h-0.5 origin-center rounded-full bg-terre/80 transition-transform duration-200 ${
                                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                    }`}
                                />
                            </Link>
                        );
                    })()}

                    {/* BOUTON EXPLORER – même UI que les autres liens, placé entre les deux */}
                    <button
                        type="button"
                        ref={explorerButtonRef}
                        onClick={() => setOpenExplorer((prev) => !prev)}
                        aria-expanded={openExplorer}
                        className={`group relative inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 border text-sm transition-all duration-200 ease-out hover:-translate-y-px ${
                            explorerActive ? 'bg-ivory text-terre border-perl/80 font-medium' : 'bg-transparent text-main/75 border-transparent hover:bg-ivory/80 hover:text-main'
                        }`}
                    >
                        <span>Explorer</span>
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${openExplorer ? 'rotate-180' : ''}`} />
                        <span
                            className={`pointer-events-none absolute left-3 right-3 -bottom-1 h-0.5 origin-center rounded-full bg-terre/80 transition-transform duration-200 ${
                                explorerActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                            }`}
                        />
                    </button>

                    {/* À propos */}
                    {(() => {
                        const link = mainLinks[1];
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpenExplorer(false)}
                                className={`group relative rounded-full px-3.5 py-1.5 border text-sm transition-all duration-200 ease-out hover:-translate-y-px ${
                                    active ? 'bg-ivory text-terre border-perl/80 font-medium' : 'bg-transparent text-main/75 border-transparent hover:bg-ivory/80 hover:text-main'
                                }`}
                            >
                                <span>{link.label}</span>
                                <span
                                    className={`pointer-events-none absolute left-3 right-3 -bottom-1 h-0.5 origin-center rounded-full bg-terre/80 transition-transform duration-200 ${
                                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                    }`}
                                />
                            </Link>
                        );
                    })()}

                    {/* CTA connexion / atelier */}
                    <div className="flex items-center gap-2.5 pl-2">
                        <Link
                            href="/connexion"
                            className="rounded-full border border-perl/70 bg-white/60 px-3 py-1.5 text-xs md:text-sm text-main/80 hover:bg-white hover:text-main transition-all duration-200 hover:-translate-y-px"
                        >
                            Connexion
                        </Link>
                        <Link
                            href="/tableau-de-bord"
                            className="rounded-full bg-terre text-ivory px-3.5 py-1.5 text-xs md:text-sm font-medium shadow-sm hover:bg-terre/90 transition-all duration-200 hover:-translate-y-px"
                        >
                            Mon atelier
                        </Link>
                    </div>
                </nav>

                {/* BURGER MOBILE / TABLET – visible jusqu’à lg */}
                <button
                    className="lg:hidden inline-flex items-center justify-center rounded-full border border-perl/60 bg-ivory/85 px-3 py-1.5 text-main/80 shadow-sm transition-transform duration-150 active:scale-95"
                    onClick={() => setOpenMobile((prev) => !prev)}
                    aria-label={openMobile ? 'Fermer le menu' : 'Ouvrir le menu'}
                >
                    <span className="text-xs mr-1.5 uppercase tracking-[0.16em]">{openMobile ? 'Fermer' : 'Menu'}</span>
                    <span className="text-sm">{openMobile ? '✕' : '☰'}</span>
                </button>
            </div>

            {/* SOUS-MENU EXPLORER – desktop uniquement */}
            {openExplorer && (
                <div className="hidden lg:block">
                    <div className="fixed inset-x-0 top-20 flex justify-center pointer-events-none z-30">
                        <div ref={dropdownRef} className="pointer-events-auto w-full max-w-5xl px-4 animate-subtle-fade-up">
                            <div className="rounded-3xl bg-ivory/95 border border-perl/70 shadow-xl backdrop-blur-md px-5 py-4 lg:px-7 lg:py-5">
                                {/* Header du menu */}
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div className="space-y-1.5 max-w-xl">
                                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-main/50">Explorer le blog</p>
                                        <h2 className="font-serif-title text-lg md:text-xl text-main">7 piliers pour apprivoiser l’art, à ton rythme.</h2>
                                        <p className="text-xs md:text-sm text-main/70">
                                            Un chemin doux pour alterner pratique, compréhension des images, récits d’artistes, couleurs, psychologie de l’art et inspirations du
                                            quotidien.
                                        </p>
                                    </div>

                                    <div className="hidden md:flex flex-col items-end gap-2 text-[0.7rem] text-main/60">
                                        <div className="inline-flex items-center gap-1.5">
                                            <span className="h-2 w-2 rounded-full bg-vert" />
                                            <span className="h-2 w-2 rounded-full bg-bleu" />
                                            <span className="h-2 w-2 rounded-full bg-ocre" />
                                            <span className="h-2 w-2 rounded-full bg-terre" />
                                            <span className="h-2 w-2 rounded-full bg-sage" />
                                            <span className="h-2 w-2 rounded-full bg-rose" />
                                            <span className="h-2 w-2 rounded-full bg-prune" />
                                        </div>
                                        <Link
                                            href="/articles"
                                            onClick={() => setOpenExplorer(false)}
                                            className="inline-flex items-center gap-1.5 rounded-full border border-perl/70 bg-white/60 px-3 py-1 hover:bg-white hover:border-sage/70 hover:text-main transition-all"
                                        >
                                            <span>Tous les articles</span>
                                            <span>↗</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Contenu : liste des thèmes (2 colonnes) + aside éditorial */}
                                <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr),minmax(0,1.1fr)] items-start">
                                    {/* Colonne gauche : sous-menu en 2 colonnes */}
                                    <nav className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                                        {explorerCategories.map((cat) => (
                                            <Link
                                                key={cat.href}
                                                href={cat.href}
                                                onClick={() => setOpenExplorer(false)}
                                                className="group flex items-start gap-2 rounded-lg px-2.5 py-1.5 hover:bg-white/80 transition-colors"
                                            >
                                                <span className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${cat.dotClass}`} />
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-sm text-main group-hover:text-main font-medium">{cat.label}</span>
                                                    <span className="text-[0.75rem] text-main/65 line-clamp-1">{cat.description}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </nav>

                                    {/* Colonne droite : aside éditorial / raccourcis */}
                                    <aside className="rounded-2xl border border-perl/60 bg-white/80 px-3.5 py-3.5 space-y-3">
                                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-main/55">Par où commencer ?</p>
                                        <div className="space-y-1.5 text-sm">
                                            <Link
                                                href="/commencer-ici"
                                                onClick={() => setOpenExplorer(false)}
                                                className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-ivory/70 transition-colors"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-main">Commencer ici</span>
                                                    <span className="text-[0.78rem] text-main/65">Un petit chemin guidé pour entrer dans Explor&apos;Art.</span>
                                                </div>
                                                <span className="text-lg text-main/60">↗</span>
                                            </Link>

                                            <Link
                                                href="/categories/inspirations"
                                                onClick={() => setOpenExplorer(false)}
                                                className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-ivory/70 transition-colors"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-main">Picorer des idées</span>
                                                    <span className="text-[0.78rem] text-main/65">Une sélection d’inspirations si tu veux juste flâner.</span>
                                                </div>
                                                <span className="text-lg text-main/60">☆</span>
                                            </Link>

                                            <Link
                                                href="/categories/psychologie-de-l-art"
                                                onClick={() => setOpenExplorer(false)}
                                                className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-ivory/70 transition-colors"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-main">Quand ça bloque</span>
                                                    <span className="text-[0.78rem] text-main/65">Articles pour apprivoiser les peurs, le trac, les blocages.</span>
                                                </div>
                                                <span className="text-lg text-main/60">♡</span>
                                            </Link>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MENU MOBILE / TABLET ( < lg ) */}
            {openMobile && (
                <div className="lg:hidden border-t border-perl/40 bg-page/98 backdrop-blur-sm">
                    <div className="container-page py-4 space-y-4 animate-mobile-sheet">
                        {/* Bloc principal : navigation structurée */}
                        <div className="rounded-3xl bg-ivory/90 border border-perl/50 shadow-sm px-4 py-3 space-y-3">
                            <div className="flex items-center justify-between">
                                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/55">Navigation</p>
                                <span className="text-[0.7rem] text-main/45">Explor&apos;Art</span>
                            </div>

                            {/* Liens principaux + Explorer (mobile) */}
                            <nav className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <Link
                                    href="/commencer-ici"
                                    onClick={() => setOpenMobile(false)}
                                    className={`rounded-2xl px-3 py-2 text-sm text-center transition-all duration-200 border ${
                                        isActive('/commencer-ici')
                                            ? 'bg-terre text-ivory border-terre shadow-sm'
                                            : 'bg-white/80 text-main/85 border-perl/60 hover:bg-white hover:-translate-y-px'
                                    }`}
                                >
                                    Commencer ici
                                </Link>

                                <Link
                                    href="/articles"
                                    onClick={() => setOpenMobile(false)}
                                    className={`rounded-2xl px-3 py-2 text-sm text-center transition-all duration-200 border inline-flex items-center justify-center gap-1 ${
                                        explorerMobileActive
                                            ? 'bg-ivory text-terre border-perl/80 font-medium'
                                            : 'bg-white/70 text-main/80 border-perl/50 hover:bg-white hover:-translate-y-px'
                                    }`}
                                >
                                    <span>Explorer</span>
                                </Link>

                                <Link
                                    href="/a-propos"
                                    onClick={() => setOpenMobile(false)}
                                    className={`rounded-2xl px-3 py-2 text-sm text-center transition-all duration-200 border ${
                                        isActive('/a-propos')
                                            ? 'bg-ivory text-terre border-perl/80 font-medium'
                                            : 'bg-white/80 text-main/80 border-perl/60 hover:bg-white hover:-translate-y-px'
                                    }`}
                                >
                                    À propos
                                </Link>
                            </nav>
                        </div>

                        {/* Explorer par thèmes – version “tags” tendance */}
                        <div className="space-y-2">
                            <p className="text-xs uppercase tracking-[0.18em] text-main/50">Explorer par thèmes</p>
                            <div className="rounded-3xl bg-ivory/90 border border-perl/50 px-3.5 py-3 space-y-2">
                                <p className="text-[0.78rem] text-main/70">Choisis un pilier pour trouver les articles qui t’appellent le plus en ce moment.</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {explorerCategories.map((cat) => (
                                        <Link
                                            key={cat.href}
                                            href={cat.href}
                                            onClick={() => setOpenMobile(false)}
                                            className="inline-flex items-center gap-1.5 rounded-full border border-perl/60 bg-white/80 px-2.5 py-1 text-[0.78rem] text-main/80 hover:bg-white hover:border-sage/70 hover:-translate-y-px transition-all duration-150"
                                        >
                                            <span className={`h-1.5 w-1.5 rounded-full ${cat.dotClass}`} />
                                            <span className="truncate max-w-36">{cat.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CTA bloc bas */}
                        <div className="pt-1 flex flex-col sm:flex-row gap-2">
                            <Link
                                href="/connexion"
                                onClick={() => setOpenMobile(false)}
                                className="flex-1 rounded-2xl border border-perl/70 bg-white/90 px-3 py-2 text-sm text-center text-main/80 hover:bg-white hover:text-main hover:-translate-y-px transition-all duration-150"
                            >
                                Connexion
                            </Link>
                            <Link
                                href="/tableau-de-bord"
                                onClick={() => setOpenMobile(false)}
                                className="flex-1 rounded-2xl bg-terre text-ivory px-3 py-2 text-sm text-center font-medium shadow-sm hover:bg-terre/90 hover:-translate-y-px transition-all duration-150"
                            >
                                Mon atelier
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
