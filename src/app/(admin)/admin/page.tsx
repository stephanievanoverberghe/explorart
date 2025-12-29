import Link from 'next/link';

const kpiStats = [
    {
        label: 'Apprenants actifs',
        value: '1 284',
        trend: '+12% sur 30 jours',
    },
    {
        label: 'Taux de complétion',
        value: '82%',
        trend: '+4 pts ce mois-ci',
    },
    {
        label: 'Cours publiés',
        value: '46',
        trend: '3 lancements prévus',
    },
    {
        label: 'Satisfaction',
        value: '4,7/5',
        trend: 'Basé sur 392 avis',
    },
];

const quickActions = [
    {
        title: 'Créer un nouveau module',
        description: 'Lancez un parcours complet avec quiz et ressources.',
        href: '/admin/formations',
        cta: 'Démarrer',
    },
    {
        title: 'Inviter une cohorte',
        description: 'Ajoutez de nouveaux apprenants et assignez un mentor.',
        href: '/admin/utilisateurs',
        cta: 'Inviter',
    },
    {
        title: 'Mettre en ligne un cours',
        description: 'Publiez un cours court avec exercices et ressources.',
        href: '/admin/cours',
        cta: 'Publier',
    },
    {
        title: 'Mettre à jour la médiathèque',
        description: 'Ajoutez des ressources visuelles et des supports PDF.',
        href: '/admin/ressources',
        cta: 'Mettre à jour',
    },
];

const learningPulse = [
    {
        title: 'Design thinking - Niveau 1',
        cohort: 'Cohorte Printemps',
        progress: 68,
        activity: '120 apprenants • 32% en avance',
    },
    {
        title: 'Couleurs & storytelling visuel',
        cohort: 'Cohorte Pro',
        progress: 82,
        activity: '86 apprenants • 14% en rattrapage',
    },
    {
        title: 'Culture artistique express',
        cohort: 'Cohorte Découverte',
        progress: 54,
        activity: '210 apprenants • 18% en pause',
    },
];

const upcomingSessions = [
    {
        title: 'Masterclass : Direction artistique',
        date: 'Mar. 23 Avril • 10:00',
        host: 'Animé par C. Delacroix',
    },
    {
        title: 'Workshop : IA & création',
        date: 'Jeu. 25 Avril • 15:00',
        host: 'Animé par L. Nguyen',
    },
    {
        title: 'Feedback live cohorte Pro',
        date: 'Ven. 26 Avril • 09:30',
        host: 'Animé par M. Dubois',
    },
];

const activityFeed = [
    {
        title: '23 nouvelles inscriptions',
        description: 'Module Couleurs & storytelling',
        time: 'Il y a 2h',
    },
    {
        title: 'Quiz final validé',
        description: 'Cohorte Printemps • 96% de réussite',
        time: 'Il y a 5h',
    },
    {
        title: 'Contenu à réviser',
        description: 'Module Culture artistique express',
        time: 'Hier',
    },
];

const adminSections = [
    {
        title: 'Cours',
        description: 'Piloter les cours unitaires, formats courts et exercices.',
        href: '/admin/cours',
        cta: 'Gérer les cours',
    },
    {
        title: 'Formations',
        description: 'Structurer les parcours complets et les cohortes associées.',
        href: '/admin/formations',
        cta: 'Gérer les formations',
    },
    {
        title: 'Articles',
        description: 'Créer, modifier et publier les contenus éditoriaux.',
        href: '/admin/articles',
        cta: 'Gérer les articles',
    },
    {
        title: 'Catégories',
        description: 'Organiser les thématiques et les collections.',
        href: '/admin/categories',
        cta: 'Gérer les catégories',
    },
    {
        title: 'Palettes',
        description: 'Structurer les palettes de couleurs utilisées.',
        href: '/admin/palettes',
        cta: 'Gérer les palettes',
    },
    {
        title: 'Ressources',
        description: 'Mettre à jour les ressources et références.',
        href: '/admin/ressources',
        cta: 'Gérer les ressources',
    },
    {
        title: 'Utilisateurs',
        description: 'Suivre les comptes et les permissions.',
        href: '/admin/utilisateurs',
        cta: 'Gérer les utilisateurs',
    },
    {
        title: 'Réglages',
        description: 'Ajuster les paramètres globaux de la plateforme.',
        href: '/admin/reglages',
        cta: 'Ouvrir les réglages',
    },
];

export default function AdminPage() {
    return (
        <div className="space-y-10">
            <section className="rounded-3xl border border-perl/60 bg-page px-6 py-6">
                <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-2">
                        <span className="section-label section-label-terre">Pilotage UX</span>
                        <h2 className="font-serif-title text-2xl text-main">Dashboard e-learning</h2>
                        <p className="text-sm text-main/60">Pilotez l&apos;activité, suivez la progression des cohortes et optimisez vos contenus de formation.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/admin/cours"
                            className="inline-flex items-center justify-center rounded-full bg-main px-5 py-2 text-sm font-medium text-white transition hover:bg-main/90"
                        >
                            Nouveau cours
                        </Link>
                        <Link
                            href="/admin/formations"
                            className="inline-flex items-center justify-center rounded-full border border-main px-5 py-2 text-sm font-medium text-main transition hover:bg-main hover:text-white"
                        >
                            Nouvelle formation
                        </Link>
                        <Link
                            href="/admin/utilisateurs"
                            className="inline-flex items-center justify-center rounded-full border border-perl/70 bg-white px-5 py-2 text-sm font-medium text-main transition hover:border-main/70"
                        >
                            Inviter des apprenants
                        </Link>
                    </div>
                </header>
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {[
                        { label: 'Nouveaux parcours', value: '6', detail: 'En préparation pour Q2' },
                        { label: 'Taux de complétion moyen', value: '82%', detail: 'Sur les 30 derniers jours' },
                        { label: 'Feedbacks UX collectés', value: '214', detail: 'À analyser cette semaine' },
                    ].map((item) => (
                        <div key={item.label} className="rounded-2xl border border-perl/60 bg-white px-4 py-4">
                            <p className="text-xs uppercase tracking-wide text-main/50">{item.label}</p>
                            <p className="mt-2 text-lg font-semibold text-main">{item.value}</p>
                            <p className="mt-1 text-xs text-main/60">{item.detail}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {kpiStats.map((stat) => (
                    <div key={stat.label} className="rounded-3xl border border-perl/60 bg-white px-5 py-5 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-main/50">{stat.label}</p>
                        <p className="mt-3 text-2xl font-semibold text-main">{stat.value}</p>
                        <p className="mt-2 text-sm text-main/60">{stat.trend}</p>
                    </div>
                ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <div className="rounded-3xl border border-perl/60 bg-white px-6 py-6 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h3 className="text-lg font-semibold text-main">Suivi des parcours</h3>
                                <p className="text-sm text-main/60">Analysez la progression et les points de friction.</p>
                            </div>
                            <Link href="/admin/articles" className="text-sm font-medium text-main underline decoration-perl/60">
                                Voir tout
                            </Link>
                        </div>
                        <div className="mt-6 space-y-5">
                            {learningPulse.map((course) => (
                                <div key={course.title} className="space-y-2">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div>
                                            <p className="font-medium text-main">{course.title}</p>
                                            <p className="text-xs text-main/50">{course.cohort}</p>
                                        </div>
                                        <span className="text-sm font-semibold text-main">{course.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-perl/40">
                                        <div className="h-2 rounded-full bg-main" style={{ width: `${course.progress}%` }} />
                                    </div>
                                    <p className="text-xs text-main/60">{course.activity}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-perl/60 bg-white px-6 py-6 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h3 className="text-lg font-semibold text-main">Contenu à optimiser</h3>
                                <p className="text-sm text-main/60">Priorisez les modules qui demandent un ajustement.</p>
                            </div>
                            <Link href="/admin/categories" className="text-sm font-medium text-main underline decoration-perl/60">
                                Voir la roadmap
                            </Link>
                        </div>
                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {[
                                {
                                    title: 'Module 04 - Culture artistique',
                                    detail: '12 retours • 3 suggestions critiques',
                                    status: 'Mise à jour urgente',
                                },
                                {
                                    title: 'Quiz final - Palette & contraste',
                                    detail: 'Taux de réussite 61%',
                                    status: 'Révision recommandée',
                                },
                                {
                                    title: 'Séquence vidéo - Histoire de l’art',
                                    detail: 'Durée moyenne trop longue',
                                    status: 'Couper en 2 parties',
                                },
                                {
                                    title: 'Atelier live - Feedback',
                                    detail: 'Planifier un créneau supplémentaire',
                                    status: 'Capacité atteinte',
                                },
                            ].map((item) => (
                                <div key={item.title} className="rounded-2xl border border-perl/60 bg-page px-4 py-4">
                                    <p className="text-sm font-medium text-main">{item.title}</p>
                                    <p className="mt-2 text-xs text-main/60">{item.detail}</p>
                                    <p className="mt-3 text-xs font-semibold text-main">{item.status}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <aside className="space-y-6">
                    <div className="rounded-3xl border border-perl/60 bg-white px-6 py-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-main">Actions rapides</h3>
                        <div className="mt-4 space-y-4">
                            {quickActions.map((action) => (
                                <div key={action.title} className="rounded-2xl border border-perl/60 bg-page px-4 py-4">
                                    <p className="text-sm font-medium text-main">{action.title}</p>
                                    <p className="mt-2 text-xs text-main/60">{action.description}</p>
                                    <Link href={action.href} className="mt-3 inline-flex text-xs font-semibold text-main underline decoration-perl/60">
                                        {action.cta}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-perl/60 bg-white px-6 py-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-main">Prochaines sessions</h3>
                        <div className="mt-4 space-y-4">
                            {upcomingSessions.map((session) => (
                                <div key={session.title} className="flex flex-col gap-1 rounded-2xl border border-perl/60 bg-page px-4 py-4">
                                    <p className="text-sm font-medium text-main">{session.title}</p>
                                    <p className="text-xs text-main/60">{session.date}</p>
                                    <p className="text-xs text-main/50">{session.host}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-perl/60 bg-white px-6 py-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-main">Activité récente</h3>
                        <div className="mt-4 space-y-4">
                            {activityFeed.map((activity) => (
                                <div key={activity.title} className="rounded-2xl border border-perl/60 bg-page px-4 py-4">
                                    <p className="text-sm font-medium text-main">{activity.title}</p>
                                    <p className="mt-1 text-xs text-main/60">{activity.description}</p>
                                    <p className="mt-2 text-[11px] text-main/40">{activity.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </section>

            <section className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h3 className="text-lg font-semibold text-main">Tous les espaces d’administration</h3>
                        <p className="text-sm text-main/60">Accédez rapidement aux modules clés pour animer votre plateforme e-learning.</p>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    {adminSections.map((section) => (
                        <div key={section.href} className="rounded-3xl border border-perl/60 bg-white px-5 py-6 shadow-sm">
                            <h4 className="text-lg font-semibold text-main">{section.title}</h4>
                            <p className="mt-2 text-sm text-main/60">{section.description}</p>
                            <Link
                                href={section.href}
                                className="mt-4 inline-flex items-center gap-2 rounded-full border border-main px-4 py-2 text-sm font-medium text-main transition hover:bg-main hover:text-white"
                            >
                                {section.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
