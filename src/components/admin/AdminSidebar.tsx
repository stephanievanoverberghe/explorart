'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, BookOpenCheck, GraduationCap, FileText, Layers, Palette, Image as ImageIcon, Users, Settings, Plus, ArrowUpRight } from 'lucide-react';

type NavItem = {
    href: string;
    label: string;
    description?: string;
    icon: LucideIcon;
    group: 'Essentiel' | 'Bibliothèque' | 'Système';
};

const nav: NavItem[] = [
    // Essentiel
    { href: '/admin', label: "Vue d'ensemble", description: 'Priorités + pipeline', icon: LayoutDashboard, group: 'Essentiel' },
    { href: '/admin/cours', label: 'Cours', description: 'Créer & publier', icon: BookOpenCheck, group: 'Essentiel' },
    { href: '/admin/formations', label: 'Formations', description: 'Parcours & modules', icon: GraduationCap, group: 'Essentiel' },
    { href: '/admin/articles', label: 'Blog', description: 'Articles & SEO', icon: FileText, group: 'Essentiel' },

    // Bibliothèque
    { href: '/admin/categories', label: 'Catégories', description: 'Piliers & tri', icon: Layers, group: 'Bibliothèque' },
    { href: '/admin/palettes', label: 'Palettes', description: 'Couleurs & harmonies', icon: Palette, group: 'Bibliothèque' },
    { href: '/admin/ressources', label: 'Ressources', description: 'PDF & médias', icon: ImageIcon, group: 'Bibliothèque' },

    // Système
    { href: '/admin/utilisateurs', label: 'Utilisateurs', description: 'Accès & rôles', icon: Users, group: 'Système' },
    { href: '/admin/reglages', label: 'Réglages', description: 'Préférences', icon: Settings, group: 'Système' },
];

const groups: Array<NavItem['group']> = ['Essentiel', 'Bibliothèque', 'Système'];

function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

function isActivePath(pathname: string, href: string) {
    if (href === '/admin') return pathname === '/admin';
    return pathname === href || pathname.startsWith(`${href}/`);
}

function GroupTitle({ children }: { children: React.ReactNode }) {
    return <p className="text-[0.7rem] uppercase tracking-[0.22em] text-main/45">{children}</p>;
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
    const Icon = item.icon;

    return (
        <Link
            href={item.href}
            className={cx(
                'group relative flex items-start gap-3 rounded-2xl p-2 transition',
                active
                    ? 'bg-linear-to-r from-main to-main/85 text-white shadow-md shadow-main/15 ring-1 ring-main/25'
                    : 'border border-perl/60 bg-page text-main hover:border-main/50 hover:bg-white hover:shadow-sm'
            )}
        >
            <span
                className={cx(
                    'mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl border transition',
                    active ? 'border-white/20 bg-white/10' : 'border-perl/60 bg-white/70 group-hover:border-main/30'
                )}
            >
                <Icon className={cx('h-4.5 w-4.5', active ? 'text-white' : 'text-main')} />
            </span>

            <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                    <p className={cx('text-sm font-semibold', active ? 'text-white' : 'text-main')}>{item.label}</p>

                    <span className={cx('text-[10px] uppercase tracking-[0.22em]', active ? 'text-white/70' : 'text-main/35')}>Accès</span>
                </div>

                {item.description ? <p className={cx('mt-0.5 text-xs', active ? 'text-white/80' : 'text-main/60')}>{item.description}</p> : null}
            </div>
        </Link>
    );
}

function QuickCreateButton({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="inline-flex items-center justify-between rounded-2xl border border-perl/60 bg-page/70 p-2 text-sm font-semibold text-main transition hover:bg-white hover:border-main/50"
        >
            <span className="inline-flex items-center gap-2">
                <Plus className="h-4 w-4" />
                {label}
            </span>
            <ArrowUpRight className="h-4 w-4 text-main/70" />
        </Link>
    );
}

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-full space-y-6 lg:max-w-xs">
            {/* NAV PRINCIPALE */}
            <div className="rounded-xl border border-perl/60 bg-white/95 px-3 py-6 shadow-sm">
                <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-main/40">Navigation</p>
                    <h2 className="font-serif-title text-xl text-main">Espace admin</h2>
                    <p className="text-xs text-main/60">Cours, formations et blog — sans détour.</p>
                </div>

                <div className="mt-6 space-y-5">
                    {groups.map((group) => {
                        const items = nav.filter((x) => x.group === group);
                        return (
                            <section key={group} className="space-y-2">
                                <GroupTitle>{group}</GroupTitle>
                                <nav className="space-y-2">
                                    {items.map((item) => (
                                        <NavLink key={item.href} item={item} active={isActivePath(pathname, item.href)} />
                                    ))}
                                </nav>
                            </section>
                        );
                    })}
                </div>
            </div>

            {/* ACTIONS RAPIDES (utile + branchable) */}
            <div className="rounded-xl border border-perl/60 bg-white/95 px-3 py-6 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-main">Actions rapides</h3>
                        <p className="text-xs text-main/60">Créer vite, publier mieux.</p>
                    </div>

                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-perl/60 bg-page/70">
                        <Plus className="h-4.5 w-4.5 text-main" />
                    </span>
                </div>

                <div className="mt-4 grid gap-2">
                    {/* adapte ces routes si tu as /new */}
                    <QuickCreateButton href="/admin/cours" label="Nouveau cours" />
                    <QuickCreateButton href="/admin/formations" label="Nouvelle formation" />
                    <QuickCreateButton href="/admin/articles" label="Nouvel article" />
                </div>
            </div>
        </aside>
    );
}
