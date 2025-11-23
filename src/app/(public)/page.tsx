// src/app/(public)/page.tsx
import Link from 'next/link';

const fakePosts = [
    {
        id: 1,
        title: '3 erreurs que tous les débutants font en dessin',
        excerpt: 'Des gestes simples pour arrêter de te bloquer et retrouver le plaisir de dessiner.',
        level: 'Débutant',
        pillar: 'Dessin & Peinture',
        badgeClass: 'badge-vert',
    },
    {
        id: 2,
        title: 'Comprendre un tableau en 3 étapes',
        excerpt: 'Une méthode claire pour lire une œuvre sans te noyer dans le jargon.',
        level: 'Débutant',
        pillar: 'Comprendre une œuvre',
        badgeClass: 'badge-bleu',
    },
];

const pillars = [
    {
        key: 'dessin-peinture',
        label: 'Dessiner & Peindre',
        badge: 'badge-vert',
        description: 'Techniques douces pour apprivoiser le trait et la couleur.',
    },
    {
        key: 'analyse-d-oeuvre',
        label: 'Comprendre une œuvre',
        badge: 'badge-bleu',
        description: 'Lire une image sans jargon, pas à pas.',
    },
    {
        key: 'histoires-d-artistes',
        label: 'Histoires d’artistes',
        badge: 'badge-terre',
        description: 'Parcours sensibles, coulisses et récits d’atelier.',
    },
    {
        key: 'histoire-de-l-art',
        label: 'Histoire de l’art',
        badge: 'badge-ocre',
        description: 'Remonter le temps sans se perdre dans les dates.',
    },
    {
        key: 'couleurs-harmonie',
        label: 'Couleurs & harmonie',
        badge: 'badge-sage',
        description: 'Comprendre les vibrations et les accords de couleurs.',
    },
    {
        key: 'inspirations',
        label: 'Inspirations',
        badge: 'badge-rose',
        description: 'Idées, ambiances, pistes pour nourrir ton regard.',
    },
    {
        key: 'psychologie-de-l-art',
        label: 'Psychologie de l’art',
        badge: 'badge-prune',
        description: 'Ce que l’art réveille en nous, tout en douceur.',
    },
];

export default function HomePage() {
    return (
        <div>
            {/* HERO */}
            <section className="py-16 md:py-20">
                <div className="container-page">
                    <div className="grid gap-10 md:grid-cols-[1.4fr,1fr] items-stretch">
                        {/* Bloc texte principal */}
                        <div className="relative overflow-hidden rounded-3xl border border-perl/40 bg-ivory/60 p-6 sm:p-8 md:p-10">
                            <div className="absolute inset-y-0 left-0 w-1 bg-sage/70" aria-hidden="true" />
                            <div className="pl-4 sm:pl-6 md:pl-8">
                                <p className="section-label section-label-sage mb-4">Blog d&apos;art lumineux</p>
                                <h1 className="font-serif-title text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
                                    Laisse l’art devenir clair. <br />
                                    <span className="text-sage">Lumineux. Sensible. Vivant.</span>
                                </h1>

                                <p className="text-main/80 text-base md:text-lg mb-6 max-w-xl">
                                    Ici, on apprend à dessiner, comprendre les œuvres et ressentir les couleurs sans jargon, sans pression, avec une pédagogie douce et humaine.
                                </p>

                                <div className="flex flex-wrap gap-3 mb-6">
                                    <Link href="/commencer-ici" className="btn btn-primary">
                                        Commencer ici
                                    </Link>
                                    <Link href="/articles" className="btn btn-ghost">
                                        Voir les articles
                                    </Link>
                                </div>

                                <div className="flex flex-wrap gap-4 text-xs text-main/70">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-vert" />
                                        <span>Pour débutants & amateurs sensibles</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-sage" />
                                        <span>7 piliers pour explorer l’art autrement</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bloc latéral “Pour qui ?” */}
                        <aside className="flex">
                            <div className="card w-full flex flex-col justify-between gap-4 md:gap-6">
                                <div>
                                    <p className="section-label section-label-vert mb-4">Pour qui ?</p>
                                    <ul className="space-y-2 text-sm text-main/80">
                                        <li>• Débutants curieux qui n’osent pas trop se lancer</li>
                                        <li>• Artistes amateurs qui veulent des bases claires</li>
                                        <li>• Amoureux d’art sensibles qui veulent mieux voir</li>
                                    </ul>
                                </div>
                                <p className="text-sm text-main/60 leading-relaxed">
                                    Tu n’as pas besoin d’être &quot;assez cultivé&quot; : on explore l’art ensemble, simplement. Une petite étape à la fois.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* SECTION COMMENCER ICI */}
            <section className="bg-ivory/60 py-16 md:py-20">
                <div className="container-page space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <p className="section-label section-label-vert mb-3">Première étape</p>
                            <h2 className="font-serif-title text-2xl md:text-3xl">Commencer ici, en douceur</h2>
                            <p className="text-main/75 mt-3 max-w-2xl">
                                Un mini-parcours guidé pour reprendre confiance : un tutoriel, une analyse d’œuvre, une introduction aux couleurs. Pas à pas, sans te perdre.
                            </p>
                        </div>

                        <Link href="/commencer-ici" className="btn btn-primary">
                            Voir le parcours complet
                        </Link>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {/* Étape 1 */}
                        <div className="card relative overflow-hidden">
                            <div className="absolute right-4 top-4 h-8 w-8 rounded-full border border-perl/60 flex items-center justify-center text-xs text-main/70">1</div>
                            <p className="badge badge-level mb-3">Tutoriel</p>
                            <h3 className="font-serif-title text-lg mb-2">Ton premier dessin simple et décomplexé</h3>
                            <p className="text-sm text-main/75">Un exercice très accessible pour reprendre un crayon sans pression et retrouver le plaisir de tracer.</p>
                        </div>

                        {/* Étape 2 */}
                        <div className="card relative overflow-hidden">
                            <div className="absolute right-4 top-4 h-8 w-8 rounded-full border border-perl/60 flex items-center justify-center text-xs text-main/70">2</div>
                            <p className="badge badge-level mb-3">Analyse d’œuvre</p>
                            <h3 className="font-serif-title text-lg mb-2">Lire une image en 3 questions</h3>
                            <p className="text-sm text-main/75">Une petite méthode pour regarder un tableau sans te noyer dans les détails ou le vocabulaire compliqué.</p>
                        </div>

                        {/* Étape 3 */}
                        <div className="card relative overflow-hidden">
                            <div className="absolute right-4 top-4 h-8 w-8 rounded-full border border-perl/60 flex items-center justify-center text-xs text-main/70">3</div>
                            <p className="badge badge-level mb-3">Couleurs</p>
                            <h3 className="font-serif-title text-lg mb-2">Pourquoi certaines couleurs apaisent ?</h3>
                            <p className="text-sm text-main/75">Une introduction douce à la psychologie des couleurs, pour comprendre ce que tu ressens devant une palette.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION DERNIERS ARTICLES */}
            <section className="py-16 md:py-20">
                <div className="container-page space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <p className="section-label section-label-terre mb-3">Nouveautés</p>
                            <h2 className="font-serif-title text-2xl md:text-3xl">Derniers articles publiés</h2>
                            <p className="text-main/75 mt-3 max-w-2xl">Un aperçu vivant des contenus : techniques, analyses d’œuvres, couleurs, psychologie de l’art…</p>
                        </div>

                        <Link href="/articles" className="text-sm text-sage hover:text-terre">
                            Voir tous les articles →
                        </Link>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {fakePosts.map((post) => (
                            <article key={post.id} className="card flex flex-col gap-3 hover:shadow-md transition-transform hover:-translate-y-[2px]">
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="badge badge-level">{post.level}</span>
                                    <span className={`badge badge-pillar ${post.badgeClass}`}>{post.pillar}</span>
                                </div>

                                <h3 className="font-serif-title text-xl">{post.title}</h3>

                                <p className="text-sm text-main/75 flex-1">{post.excerpt}</p>

                                <div className="flex items-center justify-between text-xs text-main/60 mt-1">
                                    <span>Lecture courte</span>
                                    <Link href="/articles" className="text-sage hover:text-terre text-sm">
                                        Lire l’article →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION EXPLORER PAR THÈMES */}
            <section className="bg-ivory/60 py-16 md:py-20">
                <div className="container-page space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <p className="section-label section-label-ocre mb-3">Explorer</p>
                            <h2 className="font-serif-title text-2xl md:text-3xl">Explorer par thèmes</h2>
                            <p className="text-main/75 mt-3 max-w-2xl">
                                Tes 7 piliers officiels : techniques, analyses, histoires, couleurs, psychologie de l’art, inspirations… Tu peux entrer par la porte qui te parle le
                                plus.
                            </p>
                        </div>
                    </div>

                    {/* Grille des piliers */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {pillars.map((pillar) => (
                            <Link key={pillar.key} href={`/categories/${pillar.key}`} className="card hover:shadow-md hover:-translate-y-[2px] transition-transform">
                                <div className="flex items-center justify-between gap-3 mb-2">
                                    <h3 className="font-serif-title text-lg">{pillar.label}</h3>
                                    <span className={`badge badge-pillar ${pillar.badge}`}>Pilier</span>
                                </div>
                                <p className="text-sm text-main/75">{pillar.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
