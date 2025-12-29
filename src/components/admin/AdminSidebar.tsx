'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mainLinks = [
    { href: '/admin', label: "Vue d'ensemble" },
    { href: '/admin/cours', label: 'Cours' },
    { href: '/admin/formations', label: 'Formations' },
    { href: '/admin/articles', label: 'Articles' },
    { href: '/admin/categories', label: 'Catégories' },
    { href: '/admin/palettes', label: 'Palettes' },
    { href: '/admin/ressources', label: 'Ressources' },
    { href: '/admin/utilisateurs', label: 'Utilisateurs' },
    { href: '/admin/reglages', label: 'Réglages' },
];

const adminShortcuts = [
    { label: 'Créer un cours', value: 'cours' },
    { label: 'Créer une formation', value: 'formation' },
    { label: 'Publier un article', value: 'article' },
    { label: 'Ajouter une ressource', value: 'ressource' },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-full space-y-6 lg:max-w-xs">
            <div className="rounded-[28px] border border-perl/60 bg-white/95 p-6 shadow-sm">
                <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-main/40">Navigation</p>
                    <h2 className="font-serif-title text-xl text-main">Espaces admin</h2>
                    <p className="text-xs text-main/60">Passez d&apos;un espace à l&apos;autre sans perdre le fil.</p>
                </div>
                <nav className="mt-6 space-y-2">
                    {mainLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${
                                    isActive ? 'bg-main text-white shadow-sm' : 'border border-perl/60 bg-page text-main hover:border-main/60 hover:bg-white'
                                }`}
                            >
                                <span>{link.label}</span>
                                <span className={`text-[10px] uppercase tracking-[0.2em] ${isActive ? 'text-white/70' : 'text-main/40'}`}>Accès</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="rounded-[28px] border border-perl/60 bg-white/95 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-main">Flux rapide</h3>
                <p className="mt-1 text-xs text-main/60">Centralisez vos actions clés pour éviter les détours.</p>
                <form className="mt-4 space-y-4">
                    <label className="space-y-2 text-xs font-medium text-main/70">
                        Recherche express
                        <input
                            type="search"
                            placeholder="Cours, formations, apprenants..."
                            className="w-full rounded-2xl border border-perl/70 bg-page px-4 py-2 text-sm text-main outline-none transition focus:border-main"
                        />
                    </label>
                    <label className="space-y-2 text-xs font-medium text-main/70">
                        Créer un contenu
                        <select className="w-full rounded-2xl border border-perl/70 bg-page px-4 py-2 text-sm text-main outline-none transition focus:border-main">
                            {adminShortcuts.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="button" className="w-full rounded-2xl bg-main px-4 py-2 text-sm font-semibold text-white transition hover:bg-main/90">
                        Lancer l&apos;action
                    </button>
                </form>
            </div>

            <div className="rounded-[28px] border border-perl/60 bg-white/95 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-main">Qualité & support</h3>
                <p className="mt-2 text-xs text-main/60">Suivez les indicateurs de satisfaction et les besoins de la communauté.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-perl/70 bg-page px-3 py-1 text-[11px] text-main/60">UX monitoring</span>
                    <span className="rounded-full border border-perl/70 bg-page px-3 py-1 text-[11px] text-main/60">Qualité pédagogique</span>
                    <span className="rounded-full border border-perl/70 bg-page px-3 py-1 text-[11px] text-main/60">Support 24h</span>
                </div>
            </div>
        </aside>
    );
}
