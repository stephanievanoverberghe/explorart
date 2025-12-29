import Link from 'next/link';

const RESOURCE_CARDS = [
    {
        title: 'Exercices doux',
        description: 'Des propositions simples pour relâcher la pression et reprendre confiance en ton geste.',
        href: '/ressources/exercices',
        tag: 'Pratique guidée',
    },
    {
        title: 'Guides & PDF',
        description: 'Fiches imprimables, mini-guides et check-lists pour avancer pas à pas.',
        href: '/ressources/guides',
        tag: 'À télécharger',
    },
    {
        title: 'Rituels créatifs',
        description: 'Petits rituels pour créer régulièrement sans te surcharger.',
        href: '/ressources/rituels',
        tag: 'Habitudes positives',
    },
];

const NEXT_STEPS = [
    {
        title: 'Débuter en douceur',
        description: 'Revenir aux bases avec un parcours clair et progressif.',
        href: '/commencer-ici',
    },
    {
        title: 'Explorer les piliers',
        description: 'Choisir un univers pour nourrir ta curiosité artistique.',
        href: '/categories',
    },
    {
        title: 'Lire les derniers articles',
        description: 'Approfondir une idée ou une technique quand tu en as envie.',
        href: '/articles',
    },
];

export default function ResourcesPage() {
    return (
        <section className="relative overflow-hidden bg-ivory pt-4 pb-24 md:pt-24 md:pb-28">
            <div className="container-page space-y-12">
                <header className="space-y-4 max-w-3xl">
                    <p className="section-label section-label-sage">Ressources Explor&apos;Art</p>
                    <h1 className="font-serif-title text-3xl md:text-4xl leading-tight">Des ressources pour créer, regarder et avancer avec confiance</h1>
                    <p className="text-main/75 text-sm md:text-base max-w-2xl">
                        Des supports pensés pour t&apos;accompagner au quotidien : exercices à faire chez toi, mini-guides imprimables et rituels créatifs pour garder le fil.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/commencer-ici" className="btn btn-primary">
                            Commencer ici
                        </Link>
                        <Link href="/articles" className="btn btn-secondary">
                            Voir les articles
                        </Link>
                    </div>
                </header>

                <section className="grid gap-6 md:grid-cols-3">
                    {RESOURCE_CARDS.map((resource) => (
                        <Link key={resource.href} href={resource.href} className="card group bg-background space-y-3">
                            <div className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-main/60">
                                <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                                {resource.tag}
                            </div>
                            <h2 className="font-serif-title text-lg group-hover:text-sage transition-colors">{resource.title}</h2>
                            <p className="text-sm text-main/70">{resource.description}</p>
                            <span className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Découvrir →</span>
                        </Link>
                    ))}
                </section>

                <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] items-start">
                    <div className="card bg-background space-y-4">
                        <div className="space-y-1">
                            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-main/70">Bien utiliser les ressources</p>
                            <h2 className="font-serif-title text-xl md:text-2xl">Un mode d&apos;emploi simple</h2>
                        </div>
                        <ul className="space-y-2 text-sm text-main/75">
                            <li>• Choisis une ressource qui répond à ton besoin du moment (confiance, inspiration, technique).</li>
                            <li>• Prends 15 minutes pour la tester, sans pression de résultat.</li>
                            <li>• Note ce qui t&apos;a aidée : gestes, couleurs, émotions, idées.</li>
                            <li>• Reviens quand tu veux : les ressources sont pensées pour être réutilisées.</li>
                        </ul>
                    </div>

                    <aside className="card bg-foreground text-ivory space-y-4">
                        <div className="space-y-1">
                            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-ivory/70">Besoin d&apos;un repère</p>
                            <h3 className="font-serif-title text-xl">Les piliers Explor&apos;Art</h3>
                            <p className="text-sm text-ivory/80">
                                Chaque ressource est reliée à un pilier pour t&apos;aider à naviguer. Choisis celui qui t&apos;attire aujourd&apos;hui.
                            </p>
                        </div>
                        <Link href="/categories" className="btn btn-secondary">
                            Voir les 7 piliers
                        </Link>
                    </aside>
                </section>

                <section className="space-y-4">
                    <div className="space-y-1">
                        <p className="text-[0.72rem] uppercase tracking-[0.18em] text-main/70">Pour aller plus loin</p>
                        <h2 className="font-serif-title text-xl md:text-2xl">Choisis ton prochain pas</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {NEXT_STEPS.map((step) => (
                            <Link key={step.href} href={step.href} className="card bg-background space-y-2">
                                <h3 className="font-serif-title text-lg">{step.title}</h3>
                                <p className="text-sm text-main/70">{step.description}</p>
                                <span className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Découvrir →</span>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );
}
