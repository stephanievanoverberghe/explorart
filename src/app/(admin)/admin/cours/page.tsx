import Link from 'next/link';

const courseMetrics = [
    { label: 'Cours actifs', value: '18', detail: '12 en ligne • 6 en préparation' },
    { label: 'Temps moyen', value: '45 min', detail: 'Parcours courts et ciblés' },
    { label: 'Notation moyenne', value: '4,6/5', detail: 'Basée sur 680 avis' },
];

const courseList = [
    {
        title: 'Couleurs express : harmonies rapides',
        level: 'Débutant',
        duration: '30 min',
        status: 'Publié',
        students: '260 apprenants',
    },
    {
        title: 'Croquis urbain sans pression',
        level: 'Intermédiaire',
        duration: '55 min',
        status: 'Brouillon',
        students: 'Planifié',
    },
    {
        title: 'Regards sur une œuvre',
        level: 'Tous niveaux',
        duration: '40 min',
        status: 'Publié',
        students: '180 apprenants',
    },
];

const contentGuidelines = [
    {
        title: 'Structure recommandée',
        description: 'Intro courte, 2 séquences pratiques, synthèse + exercice final.',
    },
    {
        title: 'Assets visuels',
        description: 'Utiliser 3 à 5 images clés, format carré pour la liste.',
    },
    {
        title: 'Évaluation',
        description: 'Prévoir un quiz rapide et un mini-défi créatif.',
    },
];

export default function AdminCoursPage() {
    return (
        <div className="space-y-10">
            <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                    <span className="section-label section-label-sage">Cours unitaires</span>
                    <h2 className="font-serif-title text-2xl text-main">Catalogue des cours</h2>
                    <p className="text-sm text-main/60">Gérez les cours courts, les formats d&apos;exercices et le rythme pédagogique pour chaque cohorte.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button className="inline-flex items-center justify-center rounded-full border border-main px-5 py-2 text-sm font-medium text-main transition hover:bg-main hover:text-white">
                        Importer un plan
                    </button>
                    <button className="inline-flex items-center justify-center rounded-full bg-main px-5 py-2 text-sm font-medium text-white transition hover:bg-main/90">
                        Créer un cours
                    </button>
                </div>
            </header>

            <section className="grid gap-4 md:grid-cols-3">
                {courseMetrics.map((metric) => (
                    <div key={metric.label} className="rounded-3xl border border-perl/60 bg-white px-5 py-5 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-main/50">{metric.label}</p>
                        <p className="mt-3 text-2xl font-semibold text-main">{metric.value}</p>
                        <p className="mt-2 text-sm text-main/60">{metric.detail}</p>
                    </div>
                ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <div className="rounded-3xl border border-perl/60 bg-white px-6 py-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h3 className="text-lg font-semibold text-main">Cours prioritaires</h3>
                            <p className="text-sm text-main/60">Suivi des cours à publier ou améliorer.</p>
                        </div>
                        <Link href="/admin/articles" className="text-sm font-medium text-main underline decoration-perl/60">
                            Voir tous les cours
                        </Link>
                    </div>
                    <div className="mt-6 space-y-4">
                        {courseList.map((course) => (
                            <div key={course.title} className="rounded-2xl border border-perl/60 bg-page px-4 py-4">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div>
                                        <p className="font-medium text-main">{course.title}</p>
                                        <p className="text-xs text-main/50">
                                            {course.level} • {course.duration}
                                        </p>
                                    </div>
                                    <span className="rounded-full border border-perl/70 bg-white px-3 py-1 text-xs text-main/60">{course.status}</span>
                                </div>
                                <p className="mt-2 text-xs text-main/60">{course.students}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <button className="rounded-full border border-main px-3 py-1 text-xs font-semibold text-main transition hover:bg-main hover:text-white">
                                        Éditer
                                    </button>
                                    <button className="rounded-full border border-perl/70 bg-white px-3 py-1 text-xs font-semibold text-main/70 transition hover:border-main/70">
                                        Voir le feedback
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <aside className="space-y-4">
                    <div className="rounded-3xl border border-perl/60 bg-white px-6 py-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-main">Check-list UX</h3>
                        <ul className="mt-4 space-y-3 text-sm text-main/60">
                            <li>✔️ Objectif clair en introduction</li>
                            <li>✔️ Exercices guidés par étapes</li>
                            <li>✔️ Feedback personnalisé</li>
                            <li>✔️ Visuels cohérents avec la charte</li>
                        </ul>
                    </div>
                    <div className="rounded-3xl border border-perl/60 bg-white px-6 py-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-main">Guides de production</h3>
                        <div className="mt-4 space-y-3">
                            {contentGuidelines.map((guide) => (
                                <div key={guide.title} className="rounded-2xl border border-perl/60 bg-page px-4 py-4">
                                    <p className="text-sm font-medium text-main">{guide.title}</p>
                                    <p className="mt-2 text-xs text-main/60">{guide.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </section>
        </div>
    );
}
