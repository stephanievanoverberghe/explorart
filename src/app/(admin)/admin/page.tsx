// src/app/(admin)/page.tsx
import Link from 'next/link';
import { Sparkles, Plus, Users, BookOpenCheck, HeartHandshake } from 'lucide-react';

const card = 'rounded-3xl border border-perl/60 bg-white/95 shadow-sm';
const cardInner = 'rounded-2xl border border-perl/60 bg-page/70 px-4 py-4';

const kpiStats = [
    { label: 'Apprenants actifs', value: '1 284', trend: '+12% sur 30 jours' },
    { label: 'Taux de complétion', value: '82%', trend: '+4 pts ce mois-ci' },
    { label: 'Cours publiés', value: '46', trend: '3 lancements prévus' },
    { label: 'Satisfaction', value: '4,7/5', trend: 'Basé sur 392 avis' },
];

const quickActions = [
    { title: 'Créer un nouveau module', description: 'Lancez un parcours complet avec quiz et ressources.', href: '/admin/formations', cta: 'Démarrer' },
    { title: 'Inviter une cohorte', description: 'Ajoutez de nouveaux apprenants et assignez un mentor.', href: '/admin/utilisateurs', cta: 'Inviter' },
    { title: 'Mettre en ligne un cours', description: 'Publiez un cours court avec exercices et ressources.', href: '/admin/cours', cta: 'Publier' },
    { title: 'Mettre à jour la médiathèque', description: 'Ajoutez des ressources visuelles et des supports PDF.', href: '/admin/ressources', cta: 'Mettre à jour' },
];

const learningPulse = [
    { title: 'Design thinking - Niveau 1', cohort: 'Cohorte Printemps', progress: 68, activity: '120 apprenants • 32% en avance' },
    { title: 'Couleurs & storytelling visuel', cohort: 'Cohorte Pro', progress: 82, activity: '86 apprenants • 14% en rattrapage' },
    { title: 'Culture artistique express', cohort: 'Cohorte Découverte', progress: 54, activity: '210 apprenants • 18% en pause' },
];

const upcomingSessions = [
    { title: 'Masterclass : Direction artistique', date: 'Mar. 23 Avril • 10:00', host: 'Animé par C. Delacroix' },
    { title: 'Workshop : IA & création', date: 'Jeu. 25 Avril • 15:00', host: 'Animé par L. Nguyen' },
    { title: 'Feedback live cohorte Pro', date: 'Ven. 26 Avril • 09:30', host: 'Animé par M. Dubois' },
];

const activityFeed = [
    { title: '23 nouvelles inscriptions', description: 'Module Couleurs & storytelling', time: 'Il y a 2h' },
    { title: 'Quiz final validé', description: 'Cohorte Printemps • 96% de réussite', time: 'Il y a 5h' },
    { title: 'Contenu à réviser', description: 'Module Culture artistique express', time: 'Hier' },
];

export default function AdminPage() {
    return (
        <div className="space-y-8 md:space-y-10">
            {/* HERO admin - version “atelier-like” */}
            <header className="relative overflow-hidden rounded-3xl bg-linear-to-r from-main via-sage to-sage/80 text-ivory shadow-lg">
                {/* halo / motif */}
                <div className="pointer-events-none absolute inset-0 opacity-35 mix-blend-soft-light bg-[radial-gradient(circle_at_12%_18%,#b45c77_0,transparent_50%),radial-gradient(circle_at_88%_88%,#1e3d72_0,transparent_55%)]" />
                <div className="pointer-events-none absolute inset-5 rounded-[1.75rem] border border-ivory/15" />

                <div className="relative px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9 space-y-6">
                    {/* Ligne principale */}
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        {/* Texte */}
                        <div className="space-y-4 max-w-2xl">
                            <div className="inline-flex items-center gap-2 rounded-full bg-ivory/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-ivory">
                                <Sparkles className="h-3.5 w-3.5" />
                                <span>Administration</span>
                            </div>

                            <div className="space-y-2.5">
                                <h2 className="font-serif-title text-2xl md:text-3xl leading-tight text-ivory">Dashboard Explor&apos;Art</h2>
                                <p className="text-sm md:text-base text-ivory/90">
                                    Pilote l’activité, la progression des parcours et la publication des contenus — avec une vue claire, sans friction.
                                </p>
                            </div>

                            {/* chips infos */}
                            <div className="flex flex-wrap gap-2 pt-1">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/10 px-3 py-1 text-[0.75rem] text-ivory/90">
                                    <span className="h-1.5 w-1.5 rounded-full bg-ivory/80" />8 modules à surveiller
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/10 px-3 py-1 text-[0.75rem] text-ivory/90">
                                    <span className="h-1.5 w-1.5 rounded-full bg-ivory/80" />3 actions prioritaires
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/10 px-3 py-1 text-[0.75rem] text-ivory/90">
                                    <Sparkles className="h-3 w-3 text-ivory/90" />
                                    Cohérence UX activée
                                </span>
                            </div>
                        </div>

                        {/* CTA group */}
                        <div className="w-full max-w-md lg:max-w-xs flex flex-col sm:flex-row lg:flex-col gap-2 lg:items-stretch lg:justify-center">
                            <Link
                                href="/admin/articles"
                                className="
                        group flex-1
                        inline-flex items-center justify-center gap-2
                        rounded-full bg-ivory text-main
                        px-5 py-2.5 text-sm font-medium
                        shadow-md shadow-main/20
                        transition-all duration-200
                        hover:bg-ivory/90 hover:-translate-y-0.5
                    "
                            >
                                <Plus className="h-4 w-4" />
                                <span className="whitespace-nowrap">Créer un article</span>
                                <span className="transition-transform group-hover:translate-x-0.5">↗</span>
                            </Link>

                            <Link
                                href="/admin/formations"
                                className="
                        group flex-1
                        inline-flex items-center justify-center gap-2
                        rounded-full border border-ivory/70
                        bg-transparent
                        px-5 py-2.5 text-sm font-medium text-ivory
                        transition-all duration-200
                        hover:bg-ivory hover:text-main hover:-translate-y-0.5
                    "
                            >
                                <BookOpenCheck className="h-4 w-4" />
                                <span className="whitespace-nowrap">Ouvrir les formations</span>
                                <span className="transition-transform group-hover:translate-x-0.5">☼</span>
                            </Link>
                        </div>
                    </div>

                    {/* Highlights admin */}
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: 'Apprenants actifs', value: '1 284', detail: '+12% / 30j', icon: Users },
                            { label: 'Complétion moyenne', value: '82%', detail: '+4 pts', icon: BookOpenCheck },
                            { label: 'Satisfaction', value: '4,7/5', detail: '392 avis', icon: HeartHandshake },
                            { label: 'Alertes contenu', value: '6', detail: 'à optimiser', icon: Sparkles },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.label} className="relative overflow-hidden rounded-2xl bg-ivory/10 px-4 py-3 shadow-xxs ring-1 ring-ivory/15 backdrop-blur">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="space-y-1.5">
                                            <p className="text-[0.75rem] uppercase tracking-[0.18em] text-ivory/80">{item.label}</p>
                                            <p className="text-lg font-semibold text-ivory">{item.value}</p>
                                            <p className="text-[0.85rem] text-ivory/80">{item.detail}</p>
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

            {/* KPIs */}
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {kpiStats.map((stat) => (
                    <div key={stat.label} className={`${card} p-5 sm:p-6`}>
                        <p className="text-[0.72rem] uppercase tracking-[0.18em] text-main/50">{stat.label}</p>
                        <p className="mt-3 text-2xl font-semibold text-main">{stat.value}</p>
                        <p className="mt-2 text-sm text-main/60">{stat.trend}</p>
                    </div>
                ))}
            </section>

            {/* Main grid */}
            <section className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    {/* Suivi des parcours */}
                    <div className={`${card} p-5 sm:p-6`}>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="space-y-1">
                                <h3 className="font-serif-title text-lg text-main">Suivi des parcours</h3>
                                <p className="text-sm text-main/65">Analysez la progression et les points de friction.</p>
                            </div>
                            <Link href="/admin/articles" className="text-sm font-medium text-main/80 underline underline-offset-2 hover:text-main">
                                Voir tout
                            </Link>
                        </div>

                        <div className="mt-6 space-y-5">
                            {learningPulse.map((course) => (
                                <div key={course.title} className="space-y-2">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div>
                                            <p className="text-sm font-medium text-main">{course.title}</p>
                                            <p className="text-xs text-main/50">{course.cohort}</p>
                                        </div>
                                        <span className="text-sm font-semibold text-main">{course.progress}%</span>
                                    </div>

                                    <div className="h-2 w-full rounded-full bg-perl/30 overflow-hidden">
                                        <div className="h-2 rounded-full bg-main" style={{ width: `${course.progress}%` }} />
                                    </div>

                                    <p className="text-xs text-main/60">{course.activity}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contenu à optimiser */}
                    <div className={`${card} p-5 sm:p-6`}>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="space-y-1">
                                <h3 className="font-serif-title text-lg text-main">Contenu à optimiser</h3>
                                <p className="text-sm text-main/65">Priorisez les modules qui demandent un ajustement.</p>
                            </div>
                            <Link href="/admin/categories" className="text-sm font-medium text-main/80 underline underline-offset-2 hover:text-main">
                                Voir la roadmap
                            </Link>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {[
                                { title: 'Module 04 - Culture artistique', detail: '12 retours • 3 suggestions critiques', status: 'Mise à jour urgente' },
                                { title: 'Quiz final - Palette & contraste', detail: 'Taux de réussite 61%', status: 'Révision recommandée' },
                                { title: 'Séquence vidéo - Histoire de l’art', detail: 'Durée moyenne trop longue', status: 'Couper en 2 parties' },
                                { title: 'Atelier live - Feedback', detail: 'Planifier un créneau supplémentaire', status: 'Capacité atteinte' },
                            ].map((item) => (
                                <div key={item.title} className={cardInner}>
                                    <p className="text-sm font-medium text-main">{item.title}</p>
                                    <p className="mt-2 text-xs text-main/60">{item.detail}</p>
                                    <p className="mt-3 text-xs font-semibold text-main/80">{item.status}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Aside */}
                <aside className="space-y-6">
                    {/* Actions rapides */}
                    <div className={`${card} p-5 sm:p-6`}>
                        <h3 className="font-serif-title text-lg text-main">Actions rapides</h3>
                        <div className="mt-4 space-y-3">
                            {quickActions.map((action) => (
                                <div key={action.title} className={cardInner}>
                                    <p className="text-sm font-medium text-main">{action.title}</p>
                                    <p className="mt-2 text-xs text-main/60">{action.description}</p>
                                    <Link href={action.href} className="mt-3 inline-flex text-xs font-semibold text-main/80 underline underline-offset-2 hover:text-main">
                                        {action.cta}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Prochaines sessions */}
                    <div className={`${card} p-5 sm:p-6`}>
                        <h3 className="font-serif-title text-lg text-main">Prochaines sessions</h3>
                        <div className="mt-4 space-y-3">
                            {upcomingSessions.map((session) => (
                                <div key={session.title} className={cardInner}>
                                    <p className="text-sm font-medium text-main">{session.title}</p>
                                    <p className="mt-1 text-xs text-main/60">{session.date}</p>
                                    <p className="mt-1 text-xs text-main/50">{session.host}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activité récente */}
                    <div className={`${card} p-5 sm:p-6`}>
                        <h3 className="font-serif-title text-lg text-main">Activité récente</h3>
                        <div className="mt-4 space-y-3">
                            {activityFeed.map((activity) => (
                                <div key={activity.title} className={cardInner}>
                                    <p className="text-sm font-medium text-main">{activity.title}</p>
                                    <p className="mt-1 text-xs text-main/60">{activity.description}</p>
                                    <p className="mt-2 text-[11px] text-main/45">{activity.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </section>
        </div>
    );
}
