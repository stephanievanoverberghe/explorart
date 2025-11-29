import Link from 'next/link';

const values = [
    {
        title: 'Accessibilité joyeuse',
        description: "Une pédagogie chaleureuse, des mots simples, des exemples concrets pour que chacun et chacune puisse explorer l'art sans intimidation.",
        accent: 'section-label-sage',
        icon: '🌿',
    },
    {
        title: 'Exigence créative',
        description: 'Des contenus documentés, reliés aux courants artistiques, aux techniques et aux inspirations contemporaines pour nourrir ta pratique.',
        accent: 'section-label-ocre',
        icon: '🎨',
    },
    {
        title: 'Transmission généreuse',
        description: 'Guides, mini-formations, pistes de réflexion et ressources partagées pour progresser en confiance et avec curiosité.',
        accent: 'section-label-terre',
        icon: '🤝',
    },
];

const highlights = [
    {
        title: 'Explorations guidées',
        description: 'Un parcours “Commencer ici” pour poser des bases solides, puis 7 piliers thématiques pour aller plus loin selon tes envies.',
    },
    {
        title: 'Formats variés',
        description: 'Articles, mini-guides, analyses d’œuvres, inspirations pratiques… Chaque format te donne des clés prêtes à l’emploi.',
    },
    {
        title: 'Expérience apaisante',
        description: 'Un design doux, des animations légères et une navigation pensée pour flâner, apprendre et revenir facilement à tes favoris.',
    },
];

const timeline = [
    {
        title: 'Les premières esquisses',
        description: 'Explor’Art est né d’une envie : démystifier l’art visuel et offrir un espace pour expérimenter sans pression.',
    },
    {
        title: 'Structurer les piliers',
        description: 'Les 7 univers (dessin, analyse, histoires, couleurs, inspirations, psychologie, histoire de l’art) deviennent l’ossature du site.',
    },
    {
        title: 'Partager chaque semaine',
        description: 'De nouveaux articles et ressources viennent enrichir la bibliothèque, avec un soin particulier porté à la clarté et à la pratique.',
    },
    {
        title: 'Construire la suite',
        description: 'Des visites guidées, des ateliers thématiques et des outils interactifs sont en préparation pour aller encore plus loin ensemble.',
    },
];

const faqs = [
    {
        question: 'À qui s’adresse Explor’Art ?',
        answer: 'Aux curieux, débutants ou passionnés, qui veulent mieux comprendre l’art, progresser en dessin/peinture ou simplement nourrir leur regard.',
    },
    {
        question: 'Comment sont créés les contenus ?',
        answer: 'Chaque ressource est construite à partir de recherches, de références croisées et d’expérimentations pratiques pour rester fiable et vivante.',
    },
    {
        question: 'Puis-je suivre un chemin balisé ?',
        answer: 'Oui ! La mini-formation “Commencer ici” te guide pas à pas avant d’explorer librement les piliers et les thèmes qui t’inspirent.',
    },
];

export default function AboutPage() {
    return (
        <main className="bg-ivory">
            {/* HERO */}
            <section className="relative overflow-hidden pt-16 pb-14 md:pt-24 md:pb-16">
                <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-ivory via-ivory/60 to-transparent" />

                <div className="container-page relative space-y-10">
                    <div className="max-w-3xl space-y-5 animate-fade-up">
                        <p className="section-label section-label-sage">À propos d’Explor’Art</p>
                        <h1 className="font-serif-title text-3xl md:text-4xl leading-tight">Un lieu pour découvrir, apprendre et créer avec sérénité.</h1>
                        <p className="text-main/75 text-base md:text-lg max-w-2xl">
                            Explor’Art est un média indépendant qui rend l’art visuel accessible. Tu y trouveras des contenus guidés, des analyses claires et des pistes pratiques
                            pour nourrir ta sensibilité comme ta technique.
                        </p>
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <Link href="/commencer-ici" className="btn btn-primary">
                                Commencer ici
                            </Link>
                            <Link href="/categories" className="btn btn-secondary">
                                Explorer les 7 piliers
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3 max-w-3xl animate-fade-up" style={{ animationDelay: '0.05s' }}>
                        <div className="rounded-2xl bg-white/70 border border-perl/50 p-4 shadow-sm">
                            <p className="text-sm uppercase tracking-[0.16em] text-main/60">Piliers</p>
                            <p className="font-serif-title text-2xl text-main">7 univers créatifs</p>
                            <p className="text-sm text-main/70">Pour aborder l’art par les portes qui te parlent le plus.</p>
                        </div>
                        <div className="rounded-2xl bg-white/70 border border-perl/50 p-4 shadow-sm">
                            <p className="text-sm uppercase tracking-[0.16em] text-main/60">Parcours</p>
                            <p className="font-serif-title text-2xl text-main">Mini-formation</p>
                            <p className="text-sm text-main/70">Un chemin balisé pour prendre confiance pas à pas.</p>
                        </div>
                        <div className="rounded-2xl bg-white/70 border border-perl/50 p-4 shadow-sm">
                            <p className="text-sm uppercase tracking-[0.16em] text-main/60">Ressources</p>
                            <p className="font-serif-title text-2xl text-main">Guides & analyses</p>
                            <p className="text-sm text-main/70">Articles, inspirations et outils pratiques en libre accès.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* VALEURS */}
            <section className="bg-background py-14 md:py-20 border-t border-b border-perl/40">
                <div className="container-page space-y-10">
                    <div className="max-w-2xl space-y-3 animate-fade-up">
                        <p className="section-label section-label-ocre">Ce qui guide Explor’Art</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Des valeurs qui mêlent curiosité et transmission</h2>
                        <p className="text-main/70">
                            Chaque article et chaque parcours sont pensés pour être accueillants, utiles et inspirants, afin de te laisser la place d’expérimenter.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {values.map((value, index) => (
                            <div
                                key={value.title}
                                className="relative rounded-3xl bg-white/80 border border-perl/50 p-6 shadow-sm animate-fade-up"
                                style={{ animationDelay: `${0.05 * index}s` }}
                            >
                                <span className="text-2xl">{value.icon}</span>
                                <p className={`section-label ${value.accent} mt-3 mb-4 inline-block`}>Valeur</p>
                                <h3 className="font-serif-title text-xl mb-2">{value.title}</h3>
                                <p className="text-main/70 text-sm leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HIGHLIGHTS */}
            <section className="py-14 md:py-20">
                <div className="container-page space-y-10">
                    <div className="max-w-2xl space-y-3 animate-fade-up">
                        <p className="section-label section-label-sage">Ce que tu trouveras ici</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Une expérience conçue pour apprendre en douceur</h2>
                        <p className="text-main/70">
                            Explor’Art combine la clarté pédagogique, la variété des formats et une navigation apaisante pour que tu puisses avancer à ton rythme.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {highlights.map((item, index) => (
                            <div key={item.title} className="card h-full bg-white/90 animate-fade-up" style={{ animationDelay: `${0.05 * index}s` }}>
                                <h3 className="font-serif-title text-lg mb-2">{item.title}</h3>
                                <p className="text-main/70 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TIMELINE */}
            <section className="bg-background py-14 md:py-20 border-t border-b border-perl/40">
                <div className="container-page space-y-10">
                    <div className="max-w-2xl space-y-3 animate-fade-up">
                        <p className="section-label section-label-terre">L’histoire en bref</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Comment le projet se construit</h2>
                        <p className="text-main/70">Explor’Art évolue par petites touches. Voici les étapes clés qui structurent son ADN et ce qui arrive bientôt.</p>
                    </div>

                    <div className="relative pl-6 md:pl-10">
                        <div className="absolute left-2 md:left-3 top-0 bottom-0 w-0.5 bg-perl/60" aria-hidden />
                        <div className="space-y-8">
                            {timeline.map((step, index) => (
                                <div
                                    key={step.title}
                                    className="relative rounded-2xl bg-white/80 border border-perl/40 p-5 shadow-sm animate-fade-up"
                                    style={{ animationDelay: `${0.05 * index}s` }}
                                >
                                    <span className="absolute -left-3 md:-left-4 top-5 h-3 w-3 rounded-full bg-terre ring-4 ring-white/90" aria-hidden />
                                    <h3 className="font-serif-title text-lg mb-2">{step.title}</h3>
                                    <p className="text-main/70 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-14 md:py-20">
                <div className="container-page space-y-10">
                    <div className="max-w-2xl space-y-3 animate-fade-up">
                        <p className="section-label section-label-rose">Questions fréquentes</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Clarifions l’essentiel</h2>
                        <p className="text-main/70">Quelques réponses rapides pour te situer. Besoin de plus ? Tu peux m’écrire, je serai ravie d’échanger.</p>
                    </div>

                    <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                        {faqs.map((item, index) => (
                            <div
                                key={item.question}
                                className="rounded-2xl bg-white/90 border border-perl/50 p-5 shadow-sm animate-fade-up"
                                style={{ animationDelay: `${0.04 * index}s` }}
                            >
                                <h3 className="font-serif-title text-lg mb-2">{item.question}</h3>
                                <p className="text-main/70 text-sm leading-relaxed">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA FINALE */}
            <section className="bg-background py-14 md:py-20 border-t border-perl/40">
                <div className="container-page">
                    <div className="rounded-3xl bg-main text-ivory px-6 py-10 md:px-10 md:py-12 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-6 animate-fade-up">
                        <div className="space-y-3">
                            <p className="section-label section-label-rose text-ivory">Rejoins l’aventure</p>
                            <h2 className="font-serif-title text-2xl md:text-3xl text-ivory">Prêt·e à explorer l’art autrement ?</h2>
                            <p className="text-ivory/90 max-w-2xl text-sm md:text-base">
                                Choisis un parcours guidé, plonge dans un pilier ou écris-moi pour partager tes besoins. Explor’Art se construit avec ta curiosité.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/commencer-ici" className="btn btn-secondary bg-ivory text-main">
                                Lancer la mini-formation
                            </Link>
                            <Link href="/recherche" className="btn btn-ghost border border-ivory/60 text-ivory hover:text-main hover:border-transparent hover:bg-ivory">
                                Trouver une ressource
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
