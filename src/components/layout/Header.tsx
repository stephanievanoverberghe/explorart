'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const mainLinks = [
    { href: '/articles', label: 'Articles' },
    { href: '/categories', label: 'Thèmes' },
    { href: '/commencer-ici', label: 'Commencer ici' },
    { href: '/a-propos', label: 'À propos' },
];

const explorerLinks = [
    { href: '/categories/dessin-peinture', label: 'Dessiner & Peindre' },
    { href: '/categories/analyse-d-oeuvre', label: 'Comprendre une œuvre' },
    { href: '/categories/histoire-de-l-art', label: 'Histoire de l’art' },
    { href: '/categories/couleurs-harmonie', label: 'Couleurs & harmonie' },
    { href: '/categories/psychologie-de-l-art', label: 'Psychologie de l’art' },
    { href: '/categories/inspirations', label: 'Inspirations' },
];

export function Header() {
    const pathname = usePathname();
    const [openMobile, setOpenMobile] = useState(false);

    const isActive = (href: string) => pathname === href;

    return (
        <header className="navbar">
            <div className="container-page flex items-center justify-between h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-vert" />
                    <span className="font-serif-title text-lg tracking-tight">Explor&apos;Art</span>
                </Link>

                {/* Navigation Desktop */}
                <nav className="hidden md:flex items-center gap-6 text-sm">
                    {mainLinks.map((link) => (
                        <Link key={link.href} href={link.href} className={isActive(link.href) ? 'text-terre font-medium' : 'text-main/80 hover:text-main'}>
                            {link.label}
                        </Link>
                    ))}

                    {/* Explorer dropdown */}
                    <div className="relative group">
                        <button className="text-main/80 hover:text-main">Explorer</button>

                        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute right-0 mt-2 w-56 card">
                            <ul className="space-y-1 text-sm">
                                {explorerLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="block px-2 py-1.5 rounded-md hover:bg-ivory">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <Link href="/connexion" className="btn btn-ghost text-sm">
                        Connexion
                    </Link>
                    <Link href="/tableau-de-bord" className="btn btn-primary text-sm">
                        Mon atelier
                    </Link>
                </nav>

                {/* Mobile burger */}
                <button className="md:hidden btn btn-ghost px-2 py-1" onClick={() => setOpenMobile(!openMobile)}>
                    ☰
                </button>
            </div>

            {/* Menu mobile */}
            {openMobile && (
                <div className="md:hidden border-t border-perl/40 bg-page">
                    <div className="container-page py-3 space-y-2">
                        {mainLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={isActive(link.href) ? 'block py-1.5 text-terre font-medium' : 'block py-1.5 text-main/80 hover:text-main'}
                                onClick={() => setOpenMobile(false)}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="mt-2">
                            <p className="text-xs uppercase tracking-wide text-main/50 mb-1">Explorer</p>
                            <div className="grid gap-1">
                                {explorerLinks.map((link) => (
                                    <Link key={link.href} href={link.href} onClick={() => setOpenMobile(false)} className="text-sm text-main/75 hover:text-main">
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="pt-3 flex gap-2">
                            <Link href="/connexion" className="btn btn-ghost flex-1" onClick={() => setOpenMobile(false)}>
                                Connexion
                            </Link>
                            <Link href="/tableau-de-bord" className="btn btn-primary flex-1" onClick={() => setOpenMobile(false)}>
                                Mon atelier
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
