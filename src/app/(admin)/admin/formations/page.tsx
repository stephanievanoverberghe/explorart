import Link from 'next/link';

const formationStats = [
    { label: 'Formations actives', value: '7', detail: '3 cohortes en cours' },
    { label: 'Mentors mobilisés', value: '12', detail: 'Disponibles cette semaine' },
    { label: 'Taux de complétion', value: '78%', detail: 'Cohortes sur 90 jours' },
];

const formationRoadmap = [
    {
        title: 'Parcours Direction artistique',
        status: 'En production',
        timeline: 'Lancement prévu : Mai',
        highlight: '6 modules • 3 masterclass',
    },
    {
        title: 'Formation Couleur & identité visuelle',
        status: 'Cohorte ouverte',
        timeline: 'Démarrage : Avril',
        highlight: '4 modules • 2 ateliers live',
    },
    {
        title: 'Programme Culture artistique',
        status: 'En refonte',
        timeline: 'Mise à jour : Juin',
        highlight: 'Ajout de 5 études de cas',
    },
];

const formationActions = [
    {
        title: 'Brief UX de cohorte',
        description: 'Planifiez les temps forts et les points de contact apprenants.',
        cta: 'Créer un brief',
    },
    {
        title: 'Plan de mentorat',
        description: 'Assignez les mentors selon la progression des apprenants.',
        cta: 'Assignation',
    },
    {
        title: 'Rapport hebdo',
        description: 'Partagez les KPI et feedbacks avec l’équipe pédagogique.',
        cta: 'Générer',
    },
];

export default function AdminFormationsPage() {
    return (
        <div className="space-y-10">
            <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                    <span className="section-label section-label-ocre">Formations</span>
                    <h2 className="font-serif-title text-2xl text-main">Parcours complets & cohortes</h2>
                    <p className="text-sm text-main/60">Construisez des formations progressives, synchronisez les équipes et pilotez les cohortes en temps réel.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button className="inline-flex items-center justify-center rounded-full border border-main px-5 py-2 text-sm font-medium text-main transition hover:bg-main hover:text-white">
                        Planifier une cohorte
                    </button>
                    <button className="inline-flex items-center justify-center rounded-full bg-main px-5 py-2 text-sm font-medium text-white transition hover:bg-main/90">
                        Nouvelle formation
                    </button>
                </div>
            </header>

            <section className="grid gap-4 md:grid-cols-3">
                {formationStats.map((stat) => (
                    <div key={stat.label} className="rounded-3xl border border-perl/60 bg-white px-5 py-5 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-main/50">{stat.label}</p>
                        <p className="mt-3 text-2xl font-semibold text-main">{stat.value}</p>
                        <p className="mt-2 text-sm text-main/60">{stat.detail}</p>
                    </div>
                ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <div className="rounded-3xl border border-perl/60 bg-white px-6 py-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h3 className="text-lg font-semibold text-main">Roadmap des formations</h3>
                            <p className="text-sm text-main/60">Les prochaines étapes pour chaque parcours.</p>
                        </div>
                        <Link href="/admin/ressources" className="text-sm font-medium text-main underline decoration-perl/60">
                            Voir la médiathèque
                        </Link>
                    </div>
                    <div className="mt-6 space-y-4">
                        {formationRoadmap.map((item) => (
                            <div key={item.title} className="rounded-2xl border border-perl/60 bg-page px-4 py-4">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div>
                                        <p className="font-medium text-main">{item.title}</p>
                                        <p className="text-xs text-main/50">{item.timeline}</p>
                                    </div>
                                    <span className="rounded-full border border-perl/70 bg-white px-3 py-1 text-xs text-main/60">{item.status}</span>
                                </div>
                                <p className="mt-2 text-xs text-main/60">{item.highlight}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <button className="rounded-full border border-main px-3 py-1 text-xs font-semibold text-main transition hover:bg-main hover:text-white">
                                        Mettre à jour
                                    </button>
                                    <button className="rounded-full border border-perl/70 bg-white px-3 py-1 text-xs font-semibold text-main/70 transition hover:border-main/70">
                                        Analyser la cohorte
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <aside className="space-y-4">
                    <div className="rounded-3xl border border-perl/60 bg-white px-6 py-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-main">Actions UX</h3>
                        <div className="mt-4 space-y-3">
                            {formationActions.map((action) => (
                                <div key={action.title} className="rounded-2xl border border-perl/60 bg-page px-4 py-4">
                                    <p className="text-sm font-medium text-main">{action.title}</p>
                                    <p className="mt-2 text-xs text-main/60">{action.description}</p>
                                    <button className="mt-3 text-xs font-semibold text-main underline decoration-perl/60">{action.cta}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-3xl border border-perl/60 bg-white px-6 py-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-main">Rituels de cohorte</h3>
                        <ul className="mt-4 space-y-3 text-sm text-main/60">
                            <li>• Onboarding live + kit apprenant</li>
                            <li>• Feedbacks hebdomadaires & synthèse</li>
                            <li>• Certification + portfolio final</li>
                        </ul>
                    </div>
                </aside>
            </section>
        </div>
    );
}
