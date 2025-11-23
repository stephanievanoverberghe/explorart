import Link from 'next/link';
import Image from 'next/image';

const fakePosts = [
    {
        id: 1,
        title: '3 erreurs que tous les débutants font en dessin',
        excerpt: 'Des gestes simples pour arrêter de te bloquer et retrouver le plaisir de dessiner.',
        level: 'Débutant',
        pillar: 'Dessin & Peinture',
        badgeClass: 'badge-vert',
        dotClass: 'bg-vert',
        image: '/images/home/post-debutant-dessin.png',
    },
    {
        id: 2,
        title: 'Comprendre un tableau en 3 étapes',
        excerpt: 'Une méthode claire pour lire une œuvre sans te noyer dans le jargon.',
        level: 'Débutant',
        pillar: 'Comprendre une œuvre',
        badgeClass: 'badge-bleu',
        dotClass: 'bg-bleu',
        image: '/images/home/post-comprendre-oeuvre.png',
    },
];

export default function HomeLatestPosts() {
    return (
        <section className="py-16 md:py-20 bg-ivory relative overflow-hidden">
            {/* halos très doux en arrière-plan */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute top-[-20%] left-[-15%] h-80 w-80 rounded-full bg-sage/12 blur-[120px]" />
                <div className="absolute bottom-[-25%] right-[-10%] h-96 w-96 rounded-full bg-rose/12 blur-[150px]" />
            </div>

            <div className="container-page space-y-10">
                {/* HEADER SECTION */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 animate-fade-up">
                    <div className="space-y-3">
                        <p className="section-label section-label-terre">Nouveautés</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Derniers articles publiés</h2>
                        <p className="text-main/75 max-w-2xl">
                            Un aperçu vivant des contenus : techniques, analyses d’œuvres, couleurs, psychologie de l’art… pour nourrir ton regard un peu chaque semaine.
                        </p>
                    </div>

                    <Link href="/articles" className="text-sm text-sage hover:text-terre transition-colors inline-flex items-center gap-1">
                        Voir tous les articles
                        <span>↗</span>
                    </Link>
                </div>

                {/* GRID DES ARTICLES */}
                <div className="grid gap-8 md:grid-cols-2">
                    {fakePosts.map((post, index) => (
                        <Link
                            key={post.id}
                            href="/articles"
                            className="cursor-pointer group relative flex flex-col overflow-hidden rounded-3xl border border-perl/60 bg-background/70 shadow-[0_8px_22px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(15,23,42,0.10)] animate-fade-up"
                            style={{ animationDelay: `${0.05 + index * 0.1}s` }}
                        >
                            {/* IMAGE */}
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-900 group-hover:scale-[1.06]" />

                                {/* gradient global */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />

                                {/* halo de couleur pilier */}
                                <div
                                    className={`pointer-events-none absolute -inset-4 rounded-3xl ${post.dotClass}/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                />

                                {/* petit label en haut à gauche */}
                                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-ivory backdrop-blur-md shadow-sm">
                                    <span className={`h-1.5 w-1.5 rounded-full ${post.dotClass}`} />
                                    Article
                                </span>
                            </div>

                            {/* CONTENU TEXTE */}
                            <div className="p-5 flex-1 flex flex-col gap-3">
                                {/* Badges */}
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="badge badge-level">{post.level}</span>
                                    <span className={`badge badge-pillar ${post.badgeClass} inline-flex items-center gap-1`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${post.dotClass}`} />
                                        {post.pillar}
                                    </span>
                                </div>

                                {/* Titre */}
                                <h3 className="font-serif-title text-xl leading-snug text-main transition-colors duration-200 group-hover:text-terre">{post.title}</h3>

                                {/* Extrait */}
                                <p className="text-sm text-main/75 flex-1">{post.excerpt}</p>

                                {/* FOOTER FIXE EN BAS */}
                                <div className="mt-auto flex items-center justify-between pt-3 border-t border-perl/40 text-[0.8rem] text-main/60">
                                    <span className="inline-flex items-center gap-1">
                                        <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                                        Lecture courte
                                    </span>

                                    <span className="inline-flex items-center gap-1 text-sage group-hover:text-terre transition-colors">
                                        Lire l’article
                                        <span>↗</span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
