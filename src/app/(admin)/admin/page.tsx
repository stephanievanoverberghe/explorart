// src/app/(admin)/page.tsx
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Sparkles, Plus, BookOpenCheck, LayoutDashboard, ArrowUpRight, FileText, GraduationCap, Users, TrendingUp, AlertTriangle, CheckCircle2, Palette } from 'lucide-react';

type Accent = 'main' | 'sage' | 'rose';

type Stat = {
    label: string;
    value: string;
    hint: string;
    icon: LucideIcon;
    accent?: Accent;
};

type PrimaryHub = {
    title: string;
    description: string;
    href: string;
    cta: string;
    icon: LucideIcon;
    accent: Accent;
    kpis: Array<{ label: string; value: string }>;
};

type QueueItem = {
    title: string;
    meta: string;
    status: 'à publier' | 'en cours' | 'à revoir';
    href: string;
    icon: LucideIcon;
    priority?: 'urgent' | 'soon' | 'normal';
};

type ActivityItem = {
    title: string;
    description: string;
    time: string;
};

const card = 'rounded-3xl border border-perl/60 bg-white/95 shadow-sm ring-1 ring-transparent transition hover:shadow-md hover:-translate-y-0.5 hover:ring-perl/40';
const soft = 'rounded-2xl border border-perl/60 bg-page/70';

const stats: Stat[] = [
    { label: 'Apprenants actifs', value: '1 284', hint: '+12% sur 30j', icon: Users, accent: 'main' },
    { label: 'Complétion moyenne', value: '82%', hint: '+4 pts ce mois-ci', icon: TrendingUp, accent: 'sage' },
    { label: 'Contenus publiés', value: '46', hint: 'Cours + articles', icon: BookOpenCheck, accent: 'rose' },
];

const hubs: PrimaryHub[] = [
    {
        title: 'Cours',
        description: 'Créer, structurer, publier — et suivre l’impact.',
        href: '/admin/cours',
        cta: 'Gérer les cours',
        icon: BookOpenCheck,
        accent: 'main',
        kpis: [
            { label: 'À publier', value: '3' },
            { label: 'En révision', value: '5' },
        ],
    },
    {
        title: 'Formations',
        description: 'Parcours, modules, cohérence pédagogique.',
        href: '/admin/formations',
        cta: 'Ouvrir les formations',
        icon: GraduationCap,
        accent: 'sage',
        kpis: [
            { label: 'Parcours', value: '7' },
            { label: 'Modules', value: '28' },
        ],
    },
    {
        title: 'Blog',
        description: 'Articles piliers, SEO, publication éditoriale.',
        href: '/admin/articles',
        cta: 'Gérer le blog',
        icon: FileText,
        accent: 'rose',
        kpis: [
            { label: 'Brouillons', value: '6' },
            { label: 'À optimiser', value: '4' },
        ],
    },
];

const queues: { title: string; description: string; items: QueueItem[] }[] = [
    {
        title: 'À publier',
        description: 'Ce qui fait avancer le catalogue (cours, parcours, blog).',
        items: [
            { title: 'Cours : Harmonies de couleur', meta: 'Exos + ressources à finaliser', status: 'en cours', href: '/admin/cours', icon: Palette, priority: 'soon' },
            {
                title: 'Formation : Parcours Découverte',
                meta: 'Module 3 à relire (rythme)',
                status: 'à revoir',
                href: '/admin/formations',
                icon: GraduationCap,
                priority: 'urgent',
            },
            { title: 'Article : Valeurs & contrastes', meta: 'Brouillon prêt • 1 visuel manque', status: 'à publier', href: '/admin/articles', icon: FileText, priority: 'soon' },
        ],
    },
    {
        title: 'Qualité & friction',
        description: 'Les points qui plombent l’expérience (à traiter en premier).',
        items: [
            { title: 'Quiz : Palette & contraste', meta: 'Taux de réussite 61%', status: 'à revoir', href: '/admin/cours', icon: AlertTriangle, priority: 'urgent' },
            { title: 'Module : Culture artistique', meta: '12 retours • 3 critiques', status: 'à revoir', href: '/admin/formations', icon: AlertTriangle, priority: 'urgent' },
            { title: 'Article : Introduction pilier', meta: 'Optimiser H2 + snippet', status: 'en cours', href: '/admin/articles', icon: FileText, priority: 'normal' },
        ],
    },
];

const activity: ActivityItem[] = [
    { title: '23 nouvelles inscriptions', description: 'Parcours Couleurs & storytelling', time: 'Il y a 2h' },
    { title: 'Cours publié', description: '“Lire une image : 3 repères”', time: 'Il y a 1j' },
    { title: 'Brouillon modifié', description: 'Article “Comprendre les valeurs”', time: 'Il y a 2j' },
];

function AccentGlow({ accent }: { accent: Accent }) {
    const cls =
        accent === 'rose'
            ? 'bg-[radial-gradient(circle_at_15%_20%,rgba(180,92,119,0.25)_0,transparent_55%)]'
            : accent === 'sage'
            ? 'bg-[radial-gradient(circle_at_15%_20%,rgba(120,170,150,0.28)_0,transparent_55%)]'
            : 'bg-[radial-gradient(circle_at_15%_20%,rgba(30,61,114,0.22)_0,transparent_55%)]';
    return <div className={`pointer-events-none absolute inset-0 ${cls}`} />;
}

function Pill({ children }: { children: React.ReactNode }) {
    return <span className="rounded-full border border-perl/60 bg-page/70 px-3 py-1 text-[11px] text-main/70">{children}</span>;
}

function PriorityPill({ p }: { p?: QueueItem['priority'] }) {
    if (!p) return null;
    const map: Record<NonNullable<QueueItem['priority']>, { label: string; className: string; icon: LucideIcon }> = {
        urgent: { label: 'Prioritaire', className: 'border-[#b45c77]/25 bg-[#b45c77]/10 text-[#7c3146]', icon: AlertTriangle },
        soon: { label: 'Cette semaine', className: 'border-main/20 bg-main/10 text-main', icon: TrendingUp },
        normal: { label: 'À suivre', className: 'border-perl/60 bg-white/60 text-main/70', icon: CheckCircle2 },
    };
    const cfg = map[p];
    const Icon = cfg.icon;
    return (
        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold ${cfg.className}`}>
            <Icon className="h-3.5 w-3.5" />
            {cfg.label}
        </span>
    );
}

function SectionHeader({ title, description, href, cta }: { title: string; description: string; href?: string; cta?: string }) {
    return (
        <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="space-y-1">
                <h3 className="font-serif-title text-lg text-main">{title}</h3>
                <p className="text-sm text-main/65">{description}</p>
            </div>
            {href ? (
                <Link href={href} className="inline-flex items-center gap-2 text-sm font-medium text-main/80 hover:text-main">
                    <span className="underline underline-offset-4">{cta ?? 'Voir tout'}</span>
                    <ArrowUpRight className="h-4 w-4" />
                </Link>
            ) : null}
        </div>
    );
}

function StatCard({ s }: { s: Stat }) {
    const Icon = s.icon;
    return (
        <div className={`${card} p-5 sm:p-6 relative overflow-hidden`}>
            <AccentGlow accent={s.accent ?? 'main'} />
            <div className="relative flex items-start justify-between gap-4">
                <div className="space-y-2">
                    <p className="text-[0.72rem] uppercase tracking-[0.18em] text-main/50">{s.label}</p>
                    <p className="text-2xl font-semibold text-main">{s.value}</p>
                    <p className="text-sm text-main/60">{s.hint}</p>
                </div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-perl/60 bg-page/70">
                    <Icon className="h-5 w-5 text-main" />
                </span>
            </div>
        </div>
    );
}

function HubCard({ hub }: { hub: PrimaryHub }) {
    const Icon = hub.icon;

    return (
        <Link href={hub.href} className={`${card} p-6 relative overflow-hidden block`}>
            <AccentGlow accent={hub.accent} />
            <div className="relative space-y-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                        <p className="text-[0.72rem] uppercase tracking-[0.18em] text-main/50">Espace</p>
                        <h3 className="font-serif-title text-xl text-main">{hub.title}</h3>
                        <p className="text-sm text-main/65">{hub.description}</p>
                    </div>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-perl/60 bg-page/70">
                        <Icon className="h-6 w-6 text-main" />
                    </span>
                </div>

                <div className="flex flex-wrap gap-2">
                    {hub.kpis.map((k) => (
                        <Pill key={k.label}>
                            <span className="font-semibold text-main">{k.value}</span> <span className="text-main/60">{k.label}</span>
                        </Pill>
                    ))}
                </div>

                <div className="inline-flex items-center gap-2 text-sm font-semibold text-main/80">
                    <span className="underline underline-offset-4">{hub.cta}</span>
                    <ArrowUpRight className="h-4 w-4" />
                </div>
            </div>
        </Link>
    );
}

function QueueList({ block }: { block: { title: string; description: string; items: QueueItem[] } }) {
    return (
        <div className={`${card} p-5 sm:p-6`}>
            <SectionHeader title={block.title} description={block.description} />
            <div className="mt-5 space-y-3">
                {block.items.map((it) => {
                    const Icon = it.icon;
                    return (
                        <Link key={it.title} href={it.href} className={`block ${soft} px-4 py-4 transition hover:bg-white`}>
                            <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-main">{it.title}</p>
                                    <p className="text-xs text-main/60">{it.meta}</p>

                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                        <span className="rounded-full border border-perl/60 bg-white/70 px-3 py-1 text-[11px] text-main/60">{it.status}</span>
                                        <PriorityPill p={it.priority} />
                                    </div>
                                </div>

                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-perl/60 bg-white/70">
                                    <Icon className="h-5 w-5 text-main" />
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default function AdminPage() {
    return (
        <div className="space-y-8 md:space-y-10">
            {/* HERO compact + utile */}
            <header className="relative overflow-hidden rounded-xl bg-linear-to-r from-main via-sage to-sage/80 text-ivory shadow-lg">
                <div className="pointer-events-none absolute inset-0 opacity-35 mix-blend-soft-light bg-[radial-gradient(circle_at_12%_18%,#b45c77_0,transparent_50%),radial-gradient(circle_at_88%_88%,#1e3d72_0,transparent_55%)]" />
                <div className="pointer-events-none absolute inset-5 rounded-[1.75rem] border border-ivory/15" />

                <div className="relative px-6 py-7 sm:px-8 lg:px-10 space-y-5">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-3 max-w-2xl">
                            <div className="inline-flex items-center gap-2 rounded-full bg-ivory/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-ivory">
                                <LayoutDashboard className="h-3.5 w-3.5" />
                                <span>Dashboard admin</span>
                            </div>

                            <h2 className="font-serif-title text-2xl md:text-3xl leading-tight text-ivory">Explor&apos;Art</h2>

                            <p className="text-sm md:text-base text-ivory/90">Cours, formations, blog — une vue claire pour publier vite et améliorer la qualité.</p>

                            <div className="flex flex-wrap gap-2 pt-1">
                                <span className="inline-flex items-center gap-2 rounded-full bg-ivory/10 px-3 py-1 text-[0.75rem] text-ivory/90">
                                    <Sparkles className="h-3 w-3" /> Priorités édito + pédagogie
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-ivory/10 px-3 py-1 text-[0.75rem] text-ivory/90">
                                    <span className="h-1.5 w-1.5 rounded-full bg-ivory/80" /> Catalogue en progression
                                </span>
                            </div>
                        </div>

                        <div className="w-full max-w-md lg:max-w-xs flex flex-col sm:flex-row lg:flex-col gap-2">
                            <Link
                                href="/admin/articles"
                                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ivory text-main px-5 py-2.5 text-sm font-medium shadow-md shadow-main/20 transition hover:bg-ivory/90 hover:-translate-y-0.5"
                            >
                                <Plus className="h-4 w-4" />
                                Créer un article
                                <span className="transition-transform group-hover:translate-x-0.5">↗</span>
                            </Link>

                            <Link
                                href="/admin/cours"
                                className="group inline-flex items-center justify-center gap-2 rounded-full border border-ivory/70 bg-transparent px-5 py-2.5 text-sm font-medium text-ivory transition hover:bg-ivory hover:text-main hover:-translate-y-0.5"
                            >
                                <BookOpenCheck className="h-4 w-4" />
                                Nouveau cours
                                <span className="transition-transform group-hover:translate-x-0.5">☼</span>
                            </Link>
                        </div>
                    </div>

                    {/* mini-stats dans le hero */}
                    <div className="grid gap-3 sm:grid-cols-3">
                        {[
                            { label: 'À publier', value: '3', icon: TrendingUp },
                            { label: 'À revoir', value: '6', icon: AlertTriangle },
                            { label: 'Brouillons blog', value: '6', icon: FileText },
                        ].map((x) => {
                            const Icon = x.icon;
                            return (
                                <div key={x.label} className="rounded-2xl bg-ivory/10 px-4 py-3 ring-1 ring-ivory/15 backdrop-blur">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-ivory/75">{x.label}</p>
                                            <p className="text-lg font-semibold text-ivory">{x.value}</p>
                                        </div>
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ivory/15">
                                            <Icon className="h-5 w-5 text-ivory" />
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </header>

            {/* Stats (juste 3, pour éviter la redondance) */}
            <section className="grid gap-4 md:grid-cols-3">
                {stats.map((s) => (
                    <StatCard key={s.label} s={s} />
                ))}
            </section>

            {/* 3 hubs principaux */}
            <section className="grid gap-4 lg:grid-cols-3">
                {hubs.map((h) => (
                    <HubCard key={h.title} hub={h} />
                ))}
            </section>

            {/* Pipeline + Qualité */}
            <section className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    {queues.map((b) => (
                        <QueueList key={b.title} block={b} />
                    ))}
                </div>

                {/* Activité légère (pas de répétition de cards inutiles) */}
                <aside className={`${card} p-5 sm:p-6 h-fit`}>
                    <SectionHeader title="Activité" description="Ce qui bouge sur le catalogue." href="/admin/utilisateurs" cta="Voir utilisateurs" />
                    <div className="mt-5 space-y-3">
                        {activity.map((a) => (
                            <div key={a.title} className={`${soft} px-4 py-4`}>
                                <div className="flex items-start justify-between gap-3">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-main">{a.title}</p>
                                        <p className="text-xs text-main/60">{a.description}</p>
                                    </div>
                                    <span className="rounded-full border border-perl/60 bg-white/70 px-3 py-1 text-[11px] text-main/55">{a.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* mini raccourcis (pas répétitif) */}
                    <div className="mt-6 grid gap-2">
                        {[
                            { href: '/admin/formations', label: 'Structurer un parcours', icon: GraduationCap },
                            { href: '/admin/articles', label: 'Optimiser le blog', icon: FileText },
                            { href: '/admin/cours', label: 'Publier un cours', icon: BookOpenCheck },
                        ].map((x) => {
                            const Icon = x.icon;
                            return (
                                <Link
                                    key={x.href}
                                    href={x.href}
                                    className="inline-flex items-center justify-between rounded-2xl border border-perl/60 bg-page/70 px-4 py-3 text-sm font-medium text-main transition hover:bg-white hover:border-main/50"
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <Icon className="h-4 w-4" />
                                        {x.label}
                                    </span>
                                    <ArrowUpRight className="h-4 w-4 text-main/70" />
                                </Link>
                            );
                        })}
                    </div>
                </aside>
            </section>
        </div>
    );
}
