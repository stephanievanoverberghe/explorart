import type { ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/session';

const adminLinks = [
    { href: '/admin', label: "Vue d'ensemble" },
    { href: '/admin/articles', label: 'Articles' },
    { href: '/admin/categories', label: 'Catégories' },
    { href: '/admin/palettes', label: 'Palettes' },
    { href: '/admin/ressources', label: 'Ressources' },
    { href: '/admin/utilisateurs', label: 'Utilisateurs' },
    { href: '/admin/reglages', label: 'Réglages' },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== 'admin') {
        redirect('/connexion?redirect=/admin');
    }

    return (
        <main className="min-h-screen bg-page text-main">
            <div className="max-w-6xl mx-auto px-6 py-10">
                <header className="mb-8">
                    <h1 className="font-serif-title text-2xl md:text-3xl text-main">Espace Admin</h1>
                    <p className="text-main/60 text-sm md:text-base">Centralisez vos actions et gérez l’ensemble des contenus Explor&apos;Art.</p>
                </header>

                <nav className="mb-8 flex flex-wrap gap-2">
                    {adminLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="rounded-full border border-perl/60 bg-white/80 px-4 py-2 text-sm text-main transition hover:border-main hover:text-main"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <section className="rounded-3xl border border-perl/60 bg-white/80 px-6 py-8 shadow-sm">{children}</section>
            </div>
        </main>
    );
}
