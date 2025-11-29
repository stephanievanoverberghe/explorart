// src/app/(public)/a-propos/page.tsx
import Link from 'next/link';
import Image from 'next/image';

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
            {/* HERO 2 colonnes avec image */}
            <section className="relative overflow-hidden pt-16 pb-14 md:pt-24 md:pb-16">
                <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-ivory via-ivory/60 to-transparent" />

                <div className="container-page relative grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)] lg:items-center">
                    {/* Colonne texte */}
                    <div className="space-y-8 animate-fade-up">
                        <div className="space-y-5">
                            <p className="section-label section-label-sage">À propos d’Explor’Art</p>
                            <h1 className="font-serif-title text-3xl md:text-4xl leading-tight">Un lieu pour découvrir, apprendre et créer avec sérénité.</h1>
                            <p className="text-main/75 text-base md:text-lg max-w-2xl">
                                Explor’Art est un média indépendant qui rend l’art visuel accessible. Tu y trouveras des contenus guidés, des analyses claires et des pistes
                                pratiques pour nourrir ta sensibilité comme ta technique, sans pression de “réussir”.
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

                        {/* Stats / mini-cards en bas de la colonne texte */}
                        <div className="grid gap-4 sm:grid-cols-3 max-w-3xl">
                            <div className="rounded-2xl bg-white/70 border border-perl/50 p-4 shadow-sm">
                                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-main/60">Piliers</p>
                                <p className="font-serif-title text-2xl text-main">7 univers créatifs</p>
                                <p className="text-sm text-main/70">Pour aborder l’art par les portes qui te parlent le plus.</p>
                            </div>
                            <div className="rounded-2xl bg-white/70 border border-perl/50 p-4 shadow-sm">
                                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-main/60">Parcours</p>
                                <p className="font-serif-title text-2xl text-main">Mini-formation</p>
                                <p className="text-sm text-main/70">Un chemin balisé pour prendre confiance pas à pas.</p>
                            </div>
                            <div className="rounded-2xl bg-white/70 border border-perl/50 p-4 shadow-sm">
                                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-main/60">Ressources</p>
                                <p className="font-serif-title text-2xl text-main">Guides & analyses</p>
                                <p className="text-sm text-main/70">Articles, inspirations et outils pratiques en libre accès.</p>
                            </div>
                        </div>
                    </div>

                    {/* Colonne image hero */}
                    <aside className="relative animate-fade-up" style={{ animationDelay: '0.06s' }}>
                        <div className="relative rounded-3xl border border-perl/60 bg-white/80 shadow-md overflow-hidden">
                            <div className="relative aspect-4/5">
                                <Image
                                    src="/images/about/hero-explorart.png"
                                    alt="Bureau d’atelier avec carnets de dessin, nuancier de couleurs et outils posés sur une table en bois clair."
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-black/10 to-transparent" />
                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 text-[0.7rem] text-ivory/90">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1 uppercase tracking-[0.18em]">
                                        <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                                        Atelier Explor’Art
                                    </span>
                                    <span className="hidden sm:inline-flex rounded-full bg-black/35 px-2.5 py-1">Dessiner · Comprendre · Ressentir</span>
                                </div>
                            </div>
                        </div>
                    </aside>
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

            {/* SECTION ATELIER + image */}
            <section className="py-14 md:py-20">
                <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] lg:items-center">
                    {/* Image d’atelier */}
                    <div className="relative order-2 lg:order-1 animate-fade-up" style={{ animationDelay: '0.04s' }}>
                        <div className="relative rounded-3xl border border-perl/60 bg-white/80 shadow-md overflow-hidden">
                            <div className="relative aspect-16/10">
                                <Image
                                    src="/images/about/studio-corner.png"
                                    alt="Coin d’atelier lumineux avec plantes, livres d’art, carnet ouvert et nuancier de couleurs."
                                    fill
                                    className="object-cover"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-sage/12 via-transparent to-rose/14" />
                            </div>
                        </div>
                    </div>

                    {/* Texte */}
                    <div className="space-y-4 order-1 lg:order-2 animate-fade-up">
                        <p className="section-label section-label-sage">Une atmosphère d’atelier</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Un espace qui respire comme un carnet de bord</h2>
                        <p className="text-main/70 text-sm md:text-base leading-relaxed">
                            Explor’Art a été conçu comme un atelier numérique : un endroit où tu peux feuilleter des ressources, revenir à tes favoris, tester des exercices,
                            observer des œuvres, sans jugement ni performance.
                        </p>
                        <p className="text-main/70 text-sm md:text-base leading-relaxed">
                            Tu peux picorer quelques idées, suivre un parcours guidé ou t’immerger dans un pilier en particulier. L’important, c’est que tu te sentes libre
                            d’explorer à ton rythme.
                        </p>
                    </div>
                </div>
            </section>

            {/* HIGHLIGHTS */}
            <section className="py-14 md:py-20 bg-background">
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

                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] lg:items-start">
                        {/* Timeline verticale */}
                        <div className="relative pl-6 md:pl-10 animate-fade-up">
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

                        {/* Image “ligne du temps” */}
                        <div className="animate-fade-up" style={{ animationDelay: '0.08s' }}>
                            <div className="relative rounded-3xl border border-perl/60 bg-white/80 shadow-md overflow-hidden">
                                <div className="relative aspect-video">
                                    <Image
                                        src="/images/about/journey-strip.png"
                                        alt="Frise visuelle évoquant l’évolution d’un projet artistique : croquis, palettes, écrans et carnets alignés."
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-ocre/16 via-transparent to-sage/18" />
                                </div>
                            </div>
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
                    <div
                        className="
                relative overflow-hidden
                rounded-3xl bg-sage text-ivory
                px-6 py-10 md:px-10 md:py-12
                shadow-md
                flex flex-col gap-8
                animate-fade-up
            "
                    >
                        {/* motif de fond */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light
                bg-[radial-gradient(circle_at_0%_0%,#b45c77_0,transparent_50%),radial-gradient(circle_at_100%_100%,#1e3d72_0,transparent_55%)]"
                        />

                        {/* pastilles légères */}
                        <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-ivory/10" />
                        <div className="pointer-events-none absolute -right-16 bottom-0 h-36 w-36 rounded-full bg-ivory/10" />

                        {/* Contenu texte */}
                        <div className="relative space-y-3 max-w-3xl">
                            <p className="section-label section-label-rose text-ivory/90">Rejoins l’aventure</p>
                            <h2 className="font-serif-title text-2xl md:text-3xl text-ivory">Prêt·e à explorer l’art autrement ?</h2>
                            <p className="text-ivory/90 text-sm md:text-base max-w-2xl">
                                Choisis un parcours guidé, explore un pilier ou trouve les ressources dont tu as besoin. Explor’Art évolue avec toi.
                            </p>
                        </div>

                        {/* Boutons responsives parfaitement alignés */}
                        <div
                            className="
                    relative flex flex-col sm:flex-row
                    justify-start sm:justify-end
                    items-stretch sm:items-center
                    gap-3 w-full
                "
                        >
                            <Link
                                href="/commencer-ici"
                                className="
                        group
                        flex-1 sm:flex-none sm:w-56
                        inline-flex items-center justify-center gap-2
                        rounded-full bg-ivory text-main
                        px-5 py-2.5 text-sm font-medium
                        shadow-sm
                        transition-all duration-200
                        hover:bg-ivory/90 hover:-translate-y-0.5
                    "
                            >
                                <span>Lancer la mini-formation</span>
                                <span className="transition-transform group-hover:translate-x-0.5">↗</span>
                            </Link>

                            <Link
                                href="/recherche"
                                className="
                        group
                        flex-1 sm:flex-none sm:w-56
                        inline-flex items-center justify-center gap-2
                        rounded-full border border-ivory/70
                        bg-transparent
                        px-5 py-2.5 text-sm font-medium text-ivory
                        transition-all duration-200
                        hover:bg-ivory hover:text-main hover:-translate-y-0.5
                    "
                            >
                                <span>Trouver une ressource</span>
                                <span className="transition-transform group-hover:translate-x-0.5">☼</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
