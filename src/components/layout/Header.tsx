// src/components/layout/Header.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';

interface HeaderUser {
    name: string;
    avatarUrl?: string;
    role: 'user' | 'admin';
}

// 🧭 Pages publiques principales (hors Explorer / Apprendre)
const mainPages = [
    { href: '/', label: 'Accueil' },
    { href: '/commencer-ici', label: 'Commencer ici', accent: true },
];

// 📌 Pages info
const infoPages = [
    { href: '/a-propos', label: 'À propos' },
    { href: '/contact', label: 'Contact' },
];

// 📚 7 piliers = pages d’articles (chemins CONSERVÉS)
const articlePillars = [
    {
        href: '/categories/dessin-peinture',
        label: 'Dessiner & Peindre',
        description: 'Techniques douces pour apprivoiser le trait, les formes et la matière.',
        tagline: 'Pratique & geste',
        image: '/images/categories/dessin-peinture.png',
        dotClass: 'bg-vert',
    },
    {
        href: '/categories/comprendre-une-oeuvre',
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

// 🎓 Apprendre : différence Cours / Formations
const learnLinks = [
    {
        href: '/cours',
        label: 'Cours',
        description: 'Cours unitaires, exercices et petits formats à picorer.',
        badge: 'Progressif',
    },
    {
        href: '/formations',
        label: 'Formations',
        description: 'Parcours complets en plusieurs modules, avec un fil conducteur.',
        badge: 'Programme',
    },
];

// 👤 Pages compte / espace perso
const accountLinksPublic = [
    { href: '/connexion', label: 'Connexion' },
    { href: '/inscription', label: 'Créer un compte' },
];

// 🔒 Espace membre : tout sous /tableau-de-bord
const accountLinksPrivate = [
    { href: '/tableau-de-bord', label: 'Mon atelier' },
    { href: '/tableau-de-bord/formations', label: 'Mes formations' },
    { href: '/tableau-de-bord/cours', label: 'Mes cours' },
];

const adminLinks = [{ href: '/admin', label: 'Dashboard admin', icon: LayoutDashboard }];

export function Header() {
    const pathname = usePathname();
    const router = useRouter();

    const [openMobile, setOpenMobile] = useState(false);
    const [openExplorer, setOpenExplorer] = useState(false);
    const [openLearn, setOpenLearn] = useState(false);
    const [openAccountMenu, setOpenAccountMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
    const [user, setUser] = useState<HeaderUser | null>(null);

    const explorerRef = useRef<HTMLDivElement | null>(null);
    const explorerButtonRef = useRef<HTMLButtonElement | null>(null);
    const learnRef = useRef<HTMLDivElement | null>(null);
    const learnButtonRef = useRef<HTMLButtonElement | null>(null);
    const accountRef = useRef<HTMLDivElement | null>(null);
    const accountButtonRef = useRef<HTMLButtonElement | null>(null);

    const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

    const explorerActive = pathname.startsWith('/articles') || pathname.startsWith('/categories');

    const learnActive = pathname.startsWith('/cours') || pathname.startsWith('/formations');

    const isBrowser = typeof document !== 'undefined';
    const isAuthenticated = authStatus === 'authenticated';
    const isAdmin = user?.role === 'admin';

    const getInitials = (name: string) => {
        const parts = name.trim().split(' ').filter(Boolean);
        if (!parts.length) return 'EA';
        if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
        return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase();
    };

    const goToLogout = () => {
        setOpenAccountMenu(false);
        setOpenMobile(false);
        router.push('/deconnexion');
    };

    const avatarInitials = user?.name ? getInitials(user.name) : 'EA';
    const avatarUrl = user?.avatarUrl?.trim();

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 8);
        };
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Désactive le scroll de la page quand le menu mobile est ouvert
    useEffect(() => {
        if (openMobile) {
            const previous = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = previous;
            };
        }

        return undefined;
    }, [openMobile]);

    // Click-outside
    useEffect(() => {
        if (!openExplorer && !openLearn && !openAccountMenu) return;

        const handleClick = (event: MouseEvent) => {
            const target = event.target as Node | null;
            if (!target) return;

            if (explorerRef.current?.contains(target) || explorerButtonRef.current?.contains(target)) return;

            if (learnRef.current?.contains(target) || learnButtonRef.current?.contains(target)) return;

            if (accountRef.current?.contains(target) || accountButtonRef.current?.contains(target)) return;

            setOpenExplorer(false);
            setOpenLearn(false);
            setOpenAccountMenu(false);
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [openExplorer, openLearn, openAccountMenu]);

    // Vérifie l'état d'authentification dès le chargement
    useEffect(() => {
        let isMounted = true;

        const fetchAuthStatus = async () => {
            try {
                const response = await fetch('/api/users/me', { credentials: 'include' });
                if (!isMounted) return;

                if (response.ok) {
                    const data = await response.json();
                    const fetchedUser = data.user as Partial<HeaderUser> & { name: string };
                    setUser({
                        name: fetchedUser.name,
                        avatarUrl: fetchedUser.avatarUrl,
                        role: (fetchedUser.role as HeaderUser['role']) ?? 'user',
                    });
                    setAuthStatus('authenticated');
                } else {
                    setUser(null);
                    setAuthStatus('unauthenticated');
                }
            } catch {
                if (isMounted) {
                    setUser(null);
                    setAuthStatus('unauthenticated');
                }
            }
        };

        void fetchAuthStatus();

        return () => {
            isMounted = false;
        };
    }, []);

    const desktopNavLinkBase = 'group relative rounded-full px-3.5 py-1.5 text-sm transition-all duration-200 ease-out hover:-translate-y-px';

    return (
        <header
            className={`
        sticky top-0 z-50
        backdrop-blur-xl
        transition-all duration-200
        border-b
        bg-foreground/96 text-ivory
        overflow-visible
        ${scrolled ? 'border-foreground/50 shadow-sm' : 'border-foreground/30'}
      `}
        >
            {/* halos comme le footer mais plus légers */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-70">
                <div className="absolute -top-16 left-[-10%] h-40 w-40 rounded-full bg-bleu/25 blur-[90px]" />
                <div className="absolute bottom-[-30%] right-[-10%] h-44 w-44 rounded-full bg-rose/18 blur-[90px]" />
            </div>

            <div className="container-page flex items-center gap-3 h-16 md:h-20">
                {/* LOGO */}
                <Link
                    href="/"
                    className="flex items-center gap-2 md:gap-2.5 transition-transform duration-200 hover:-translate-y-px"
                    onClick={() => {
                        setOpenMobile(false);
                        setOpenExplorer(false);
                        setOpenLearn(false);
                        setOpenAccountMenu(false);
                    }}
                >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-linear-to-br from-terre via-rose to-sage text-[0.75rem] font-semibold text-ivory shadow-md">
                        EA
                    </span>
                    <div className="flex flex-col leading-tight">
                        <span className="font-serif-title text-base md:text-lg tracking-tight text-ivory">Explor&apos;Art</span>
                        <span className="hidden text-[0.7rem] uppercase tracking-[0.18em] text-ivory/70 sm:block">Dessiner · Comprendre · Ressentir</span>
                    </div>
                </Link>

                {/* NAV DESKTOP (centre) */}
                <nav className="hidden lg:flex flex-1 items-center justify-center gap-2 xl:gap-4 text-sm">
                    {/* Explorer */}
                    <div className="relative" ref={explorerRef}>
                        <button
                            type="button"
                            ref={explorerButtonRef}
                            onClick={() => {
                                setOpenExplorer((prev) => !prev);
                                setOpenLearn(false);
                                setOpenAccountMenu(false);
                            }}
                            aria-expanded={openExplorer}
                            className={`${desktopNavLinkBase} border inline-flex items-center gap-1.5 ${
                                explorerActive
                                    ? 'cursor-pointer bg-ivory text-main border-sage/70 font-medium shadow-sm'
                                    : 'cursor-pointer bg-ivory/5 text-ivory/85 border-ivory/10 hover:bg-ivory/10'
                            }`}
                        >
                            <span>Explorer</span>
                            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${openExplorer ? 'rotate-180' : ''}`} />
                        </button>

                        {openExplorer && (
                            <div className="absolute left-1/2 top-full z-50 mt-3 w-[860px] max-w-[90vw] -translate-x-1/2 rounded-3xl border border-perl/40 bg-ivory/98 text-main shadow-[0_18px_45px_rgba(15,23,42,0.16)] backdrop-blur-xl px-6 py-5 lg:px-8 lg:py-6">
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div className="space-y-1.5 max-w-xl">
                                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-main/50">Explorer le blog</p>
                                        <h2 className="font-serif-title text-lg md:text-xl text-main">7 piliers pour apprivoiser l’art, à ton rythme.</h2>
                                        <p className="text-xs md:text-sm text-main/70">
                                            Pratique, compréhension des images, récits d’artistes, couleurs, psychologie de l’art et inspirations du quotidien.
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
                                            className="inline-flex items-center gap-1.5 rounded-full border border-perl/70 bg-white/80 px-3 py-1 text-[0.75rem] hover:bg-white hover:border-sage/70 hover:text-main transition-all"
                                        >
                                            <span>Tous les articles</span>
                                            <span>↗</span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)] items-start">
                                    <nav className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5">
                                        {articlePillars.map((cat) => (
                                            <Link
                                                key={cat.href}
                                                href={cat.href}
                                                onClick={() => setOpenExplorer(false)}
                                                className="group flex items-start gap-2 rounded-xl px-2.5 py-1.5 hover:bg-background transition-colors"
                                            >
                                                <span className={`mt-1 h-2 w-2 rounded-full shrink-0 ${cat.dotClass}`} />
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-sm text-main group-hover:text-main font-medium">{cat.label}</span>
                                                    <span className="text-[0.7rem] text-main/60 line-clamp-1">{cat.description}</span>
                                                    <span className="text-[0.68rem] uppercase tracking-[0.16em] text-main/45">{cat.tagline}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </nav>

                                    <aside className="rounded-2xl border border-perl/60 bg-background/95 px-3.5 py-3.5 space-y-3 shadow-xs">
                                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-main/55">Par où commencer ?</p>
                                        <div className="space-y-1.5 text-sm">
                                            <Link
                                                href="/commencer-ici"
                                                onClick={() => setOpenExplorer(false)}
                                                className="flex items-center justify-between rounded-xl px-2 py-1.5 hover:bg-sage/10 transition-colors"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-main">Commencer ici</span>
                                                    <span className="text-[0.78rem] text-main/65">Un petit chemin guidé pour entrer dans Explor&apos;Art.</span>
                                                </div>
                                                <span className="text-lg text-main/60">↗</span>
                                            </Link>

                                            <Link
                                                href="/articles/inspirations"
                                                onClick={() => setOpenExplorer(false)}
                                                className="flex items-center justify-between rounded-xl px-2 py-1.5 hover:bg-rose/10 transition-colors"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-main">Picorer des idées</span>
                                                    <span className="text-[0.78rem] text-main/65">Une sélection d’inspirations si tu veux juste flâner.</span>
                                                </div>
                                                <span className="text-lg text-main/60">☆</span>
                                            </Link>

                                            <Link
                                                href="/articles/psychologie-de-l-art"
                                                onClick={() => setOpenExplorer(false)}
                                                className="flex items-center justify-between rounded-xl px-2 py-1.5 hover:bg-prune/10 transition-colors"
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
                        )}
                    </div>

                    {/* Apprendre */}
                    <div className="relative" ref={learnRef}>
                        <button
                            type="button"
                            ref={learnButtonRef}
                            onClick={() => {
                                setOpenLearn((prev) => !prev);
                                setOpenExplorer(false);
                                setOpenAccountMenu(false);
                            }}
                            aria-expanded={openLearn}
                            className={`${desktopNavLinkBase} border inline-flex items-center gap-1.5 ${
                                learnActive
                                    ? 'bg-ivory text-main border-vert/70 font-medium shadow-sm'
                                    : 'cursor-pointer bg-ivory/5 text-ivory/85 border-ivory/10 hover:bg-ivory/10'
                            }`}
                        >
                            <span>Apprendre</span>
                            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${openLearn ? 'rotate-180' : ''}`} />
                        </button>

                        {openLearn && (
                            <div className="absolute left-1/2 top-full z-50 mt-3 w-[420px] max-w-[90vw] -translate-x-1/2 rounded-3xl border border-perl/40 bg-ivory/98 text-main shadow-[0_18px_45px_rgba(15,23,42,0.16)] backdrop-blur-xl px-5 py-4">
                                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-main/55 mb-2">Apprendre avec Explor&apos;Art</p>
                                <div className="space-y-2.5 text-sm">
                                    {learnLinks.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setOpenLearn(false)}
                                            className="flex items-start justify-between gap-2 rounded-2xl px-2.5 py-1.75 hover:bg-background transition-colors"
                                        >
                                            <div className="flex flex-col">
                                                <span className="font-medium text-main">{item.label}</span>
                                                <span className="text-[0.78rem] text-main/65">{item.description}</span>
                                            </div>
                                            {item.badge && (
                                                <span className="mt-0.5 text-[0.65rem] px-2 py-0.5 rounded-full bg-vert/10 text-vert uppercase tracking-[0.16em]">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-3 pt-2 border-t border-perl/35 flex items-center justify-between">
                                    <span className="text-[0.7rem] text-main/55">Tu hésites ? Commence par la mini-formation.</span>
                                    <Link
                                        href="/commencer-ici"
                                        onClick={() => setOpenLearn(false)}
                                        className="text-[0.7rem] font-medium text-bleu hover:underline underline-offset-2"
                                    >
                                        Commencer ici ↗
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Commencer ici (CTA) */}
                    {mainPages
                        .filter((link) => link.href === '/commencer-ici')
                        .map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${desktopNavLinkBase} border bg-linear-to-r from-sage via-vert to-bleu text-ivory border-transparent shadow-md hover:brightness-105`}
                            >
                                Commencer ici
                            </Link>
                        ))}
                </nav>

                {/* Droite : A propos / Contact (XL+) + Espace perso */}
                <div className="hidden lg:flex items-center gap-3 xl:gap-4">
                    <nav className="hidden xl:flex items-center gap-3 text-xs md:text-sm text-ivory/80">
                        {infoPages.map((link) => (
                            <Link key={link.href} href={link.href} className={`relative hover:text-ivory transition-colors ${isActive(link.href) ? 'text-ivory' : ''}`}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="relative" ref={accountRef}>
                        <button
                            type="button"
                            ref={accountButtonRef}
                            onClick={() => {
                                setOpenAccountMenu((prev) => !prev);
                                setOpenExplorer(false);
                                setOpenLearn(false);
                            }}
                            aria-expanded={openAccountMenu}
                            className="inline-flex items-center cursor-pointer gap-2 rounded-full border border-ivory/20 bg-black/10 px-3.5 py-1.5 text-xs md:text-sm text-ivory/85 shadow-xxs hover:bg-black/15 hover:text-ivory transition-all"
                        >
                            {isAuthenticated ? (
                                <>
                                    <span className="sr-only">Ouvrir ton espace perso</span>
                                    <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-ivory/20 bg-ivory/15 text-[0.85rem] font-semibold uppercase text-ivory">
                                        {avatarUrl ? (
                                            <Image src={avatarUrl} alt={`Profil de ${user?.name ?? 'l’utilisateur'}`} fill sizes="36px" className="object-cover" />
                                        ) : (
                                            <span>{avatarInitials}</span>
                                        )}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <User className="h-4 w-4" />
                                    <span>Espace perso</span>
                                </>
                            )}
                            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${openAccountMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {openAccountMenu && (
                            <div className="absolute right-0 mt-2 w-72 rounded-3xl border border-perl/60 bg-ivory/98 text-main shadow-xl backdrop-blur-md py-3 text-sm z-50">
                                <div className="px-3 pb-2">
                                    {isAuthenticated && (
                                        <div className="mb-2">
                                            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-main/60">Connecté·e</p>
                                            <p className="text-sm font-medium text-main/95 line-clamp-1">{user?.name ?? 'Profil'}</p>
                                        </div>
                                    )}
                                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/55 mb-1.5">{isAuthenticated ? 'Ton espace' : 'Se connecter'}</p>
                                </div>

                                {!isAuthenticated ? (
                                    <div className="px-2.5 space-y-1.5">
                                        {accountLinksPublic.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={() => setOpenAccountMenu(false)}
                                                className="flex items-center justify-between gap-2 rounded-2xl px-2.5 py-1.5 hover:bg-sage/8 text-main/80"
                                            >
                                                <span>{link.label}</span>
                                                {link.href === '/inscription' && (
                                                    <span className="text-[0.68rem] px-2 py-0.5 rounded-full bg-vert/10 text-vert uppercase tracking-[0.16em]">gratuit</span>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        <div className="px-2.5 space-y-1.5">
                                            {accountLinksPrivate.map((link) => (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    onClick={() => setOpenAccountMenu(false)}
                                                    className="flex items-center gap-2 rounded-2xl px-2.5 py-1.5 hover:bg-sage/8 text-main/80"
                                                >
                                                    <span>{link.label}</span>
                                                </Link>
                                            ))}
                                        </div>

                                        {isAdmin && (
                                            <>
                                                <div className="my-2 mx-3 border-t border-perl/40" />
                                                <div className="px-3 pb-1">
                                                    <p className="text-[0.68rem] uppercase tracking-[0.18em] text-main/55 mb-1">Admin</p>
                                                </div>
                                                <div className="px-2.5 space-y-1">
                                                    {adminLinks.map((link) => {
                                                        const Icon = link.icon;
                                                        return (
                                                            <Link
                                                                key={link.href}
                                                                href={link.href}
                                                                onClick={() => setOpenAccountMenu(false)}
                                                                className="flex items-center gap-2 rounded-2xl px-2.5 py-1.5 hover:bg-terre/8 text-main/85"
                                                            >
                                                                <Icon className="h-4 w-4" />
                                                                <span>{link.label}</span>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </>
                                        )}

                                        <div className="my-2 mx-3 border-t border-perl/40" />
                                        <button
                                            type="button"
                                            className="mx-2.5 mt-1 flex w-[calc(100%-1.25rem)] cursor-pointer items-center gap-2 rounded-2xl px-2.5 py-1.5 text-main/70 hover:bg-rose/5 hover:text-rose-700 transition-colors"
                                            onClick={goToLogout}
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Se déconnecter</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* BURGER MOBILE / TABLET */}
                <button
                    className="lg:hidden ml-auto inline-flex items-center justify-center rounded-full border border-ivory/30 bg-black/10 px-3 py-1.5 text-ivory/85 shadow-sm transition-transform duration-150 active:scale-95"
                    onClick={() => {
                        setOpenMobile((prev) => !prev);
                        setOpenExplorer(false);
                        setOpenLearn(false);
                        setOpenAccountMenu(false);
                    }}
                    aria-label={openMobile ? 'Fermer le menu' : 'Ouvrir le menu'}
                >
                    <span className="text-xs mr-1.5 uppercase tracking-[0.16em]">{openMobile ? 'Fermer' : 'Menu'}</span>
                    <span className="text-sm">{openMobile ? '✕' : '☰'}</span>
                </button>
            </div>

            {/* MENU MOBILE */}
            {isBrowser &&
                openMobile &&
                createPortal(
                    <div className="lg:hidden fixed inset-x-0 top-16 md:top-20 bottom-0 z-40 overflow-y-auto border-t border-ivory/20 bg-foreground/98 backdrop-blur-md text-ivory shadow-[0_-8px_25px_rgba(0,0,0,0.22)]">
                        <div className="container-page py-4 pb-8 space-y-4">
                            {/* Explorer */}
                            <div className="rounded-3xl bg-black/15 border border-ivory/25 shadow-sm px-4 py-3 space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory/70">Explorer</p>
                                    <Link href="/articles" onClick={() => setOpenMobile(false)} className="text-[0.7rem] underline-offset-2 hover:underline text-ivory/80">
                                        Tous les articles ↗
                                    </Link>
                                </div>
                                <p className="text-[0.78rem] text-ivory/80">Choisis un pilier pour trouver les articles qui t’appellent le plus en ce moment.</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {articlePillars.map((cat) => (
                                        <Link
                                            key={cat.href}
                                            href={cat.href}
                                            onClick={() => setOpenMobile(false)}
                                            className="inline-flex items-center gap-1.5 rounded-full border border-ivory/25 bg-black/20 px-2.5 py-1 text-[0.78rem] text-ivory/85 hover:bg-black/30 hover:-translate-y-px transition-all duration-150"
                                        >
                                            <span className={`h-1.5 w-1.5 rounded-full ${cat.dotClass}`} />
                                            <span className="truncate max-w-40">{cat.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Apprendre */}
                            <div className="rounded-3xl bg-black/15 border border-ivory/25 shadow-sm px-4 py-3 space-y-3">
                                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory/70">Apprendre</p>
                                <div className="flex flex-col gap-2 text-sm">
                                    {learnLinks.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setOpenMobile(false)}
                                            className="flex items-start justify-between gap-2 rounded-2xl px-2.5 py-1.75 bg-black/10 hover:bg-black/20 transition-colors"
                                        >
                                            <div className="flex flex-col">
                                                <span className="font-medium text-ivory">{item.label}</span>
                                                <span className="text-[0.78rem] text-ivory/80">{item.description}</span>
                                            </div>
                                            {item.badge && (
                                                <span className="mt-0.5 text-[0.65rem] px-2 py-0.5 rounded-full bg-ivory/10 text-ivory uppercase tracking-[0.16em]">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation principale (Accueil / Commencer ici / Info) */}
                            <div className="rounded-3xl bg-black/15 border border-ivory/25 shadow-sm px-4 py-3 space-y-3">
                                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory/70">Navigation</p>
                                <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {mainPages.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setOpenMobile(false)}
                                            className={`rounded-2xl px-3 py-2 text-sm text-center transition-all duration-200 border inline-flex items-center justify-center gap-1 ${
                                                isActive(link.href)
                                                    ? 'bg-ivory text-main border-transparent font-medium shadow-xs'
                                                    : link.accent
                                                    ? 'bg-linear-to-r from-sage via-vert to-bleu text-ivory border-transparent hover:brightness-105 hover:-translate-y-px'
                                                    : 'bg-black/20 text-ivory/85 border-ivory/25 hover:bg-black/30 hover:-translate-y-px'
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="flex flex-wrap gap-3 pt-2 text-xs text-ivory/75">
                                    {infoPages.map((link) => (
                                        <Link key={link.href} href={link.href} onClick={() => setOpenMobile(false)} className="hover:text-ivory underline-offset-2 hover:underline">
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Espace perso */}
                            <div className="rounded-3xl bg-black/15 border border-ivory/25 shadow-sm px-4 py-3 space-y-3">
                                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory/70">Espace perso</p>

                                {!isAuthenticated ? (
                                    <div className="flex flex-col gap-2">
                                        {accountLinksPublic.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={() => setOpenMobile(false)}
                                                className="rounded-2xl border border-ivory/25 bg-black/20 px-3 py-2 text-sm text-center text-ivory/85 hover:bg-black/30 hover:text-ivory hover:-translate-y-px transition-all duration-150"
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex flex-col gap-1.5">
                                            {accountLinksPrivate.map((link) => (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    onClick={() => setOpenMobile(false)}
                                                    className="flex items-center gap-2 rounded-2xl px-2.5 py-1.5 text-sm hover:bg-black/20 text-ivory/85"
                                                >
                                                    <span>{link.label}</span>
                                                </Link>
                                            ))}
                                        </div>

                                        {isAdmin && (
                                            <>
                                                <div className="my-2 border-t border-ivory/25" />
                                                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-ivory/70">Admin</p>
                                                <div className="flex flex-col gap-1.5">
                                                    {adminLinks.map((link) => {
                                                        const Icon = link.icon;
                                                        return (
                                                            <Link
                                                                key={link.href}
                                                                href={link.href}
                                                                onClick={() => setOpenMobile(false)}
                                                                className="flex items-center gap-2 rounded-2xl px-2.5 py-1.5 text-sm hover:bg-black/20 text-ivory/90"
                                                            >
                                                                <Icon className="h-4 w-4" />
                                                                <span>{link.label}</span>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </>
                                        )}

                                        <div className="mt-2">
                                            <button
                                                type="button"
                                                className="flex w-full items-center justify-center gap-2 rounded-2xl px-3 py-2 text-sm text-ivory/75 hover:bg-rose/15 hover:text-ivory transition-colors"
                                                onClick={goToLogout}
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <span>Se déconnecter</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </header>
    );
}
