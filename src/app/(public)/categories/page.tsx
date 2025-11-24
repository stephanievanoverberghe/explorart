import Link from 'next/link';
import Image from 'next/image';

const categories = [
    {
        slug: 'dessin-peinture',
        label: 'Dessiner & Peindre',
        desc: 'Techniques douces pour apprivoiser le trait, les formes et la matière.',
        color: 'var(--color-vert)',
        dot: 'bg-vert',
        image: '/images/categories/dessin-peinture.png',
    },
    {
        slug: 'analyse-d-oeuvre',
        label: 'Comprendre une œuvre',
        desc: 'Lire une image avec douceur : lignes, masses, lumières, intentions.',
        color: 'var(--color-bleu)',
        dot: 'bg-bleu',
        image: '/images/categories/analyse-oeuvre.png',
    },
    {
        slug: 'histoires-d-artistes',
        label: 'Histoires d’artistes',
        desc: 'Récits d’atelier, parcours sensibles, doutes et élans humains.',
        color: 'var(--color-terre)',
        dot: 'bg-terre',
        image: '/images/categories/histoires-artistes.png',
    },
    {
        slug: 'histoire-de-l-art',
        label: 'Histoire de l’art',
        desc: 'Explorer les mouvements, styles et évolutions du regard humain.',
        color: 'var(--color-ocre)',
        dot: 'bg-ocre',
        image: '/images/categories/histoire-art.png',
    },
    {
        slug: 'couleurs-harmonie',
        label: 'Couleurs & harmonie',
        desc: 'Comprendre comment vibrent les couleurs ensemble, en douceur.',
        color: 'var(--color-sage)',
        dot: 'bg-sage',
        image: '/images/categories/couleurs-harmonie.png',
    },
    {
        slug: 'inspirations',
        label: 'Inspirations',
        desc: 'Idées, ambiances et pistes pour nourrir ton regard au quotidien.',
        color: 'var(--color-rose)',
        dot: 'bg-rose',
        image: '/images/categories/inspirations.png',
    },
    {
        slug: 'psychologie-de-l-art',
        label: 'Psychologie de l’art',
        desc: 'Ce que l’art réveille en nous : émotions, blocages, élans intérieurs.',
        color: 'var(--color-prune)',
        dot: 'bg-prune',
        image: '/images/categories/psychologie-art.png',
    },
];

export default function CategoriesPage() {
    return (
        <section className="relative overflow-hidden bg-ivory pt-4 pb-24 md:pt-24 md:pb-28">
            {/* Halos décoratifs */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-32 right-[-10%] h-72 w-72 rounded-full bg-sage/14 blur-[110px]" />
                <div className="absolute bottom-[-25%] left-[-10%] h-80 w-80 rounded-full bg-rose/14 blur-[120px]" />
            </div>

            <div className="container-page space-y-14 animate-fade-up">
                {/* INTRO */}
                <header className="space-y-4 max-w-3xl">
                    <p className="section-label section-label-sage">Explor’Art · Tes 7 univers créatifs</p>

                    <h1 className="font-serif-title text-3xl md:text-4xl leading-tight">Choisis l’univers qui t’appelle aujourd’hui</h1>

                    <p className="text-main/75 text-sm md:text-base max-w-2xl">
                        Chaque pilier est une porte d’entrée douce pour explorer ton regard, ton geste, ta relation aux images. Laisse-toi guider par la couleur, l’émotion ou la
                        curiosité.
                    </p>
                </header>

                {/* GRID CATEGORIES */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((cat, i) => (
                        <Link
                            key={cat.slug}
                            href={`/categories/${cat.slug}`}
                            className="group relative rounded-3xl overflow-hidden border border-perl/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                            style={{ animationDelay: `${0.05 + i * 0.05}s` }}
                        >
                            {/* Bandeau vertical couleur */}
                            <div className="absolute left-0 top-0 h-full w-1.5 z-20" style={{ backgroundColor: cat.color }} />

                            {/* IMAGE */}
                            <div className="relative w-full aspect-4/3 overflow-hidden">
                                <Image src={cat.image} alt={cat.label} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />

                                {/* Halo dynamique */}
                                <div
                                    className={`pointer-events-none absolute inset-0 ${cat.dot}/20 opacity-0 blur-[60px] 
                  group-hover:opacity-100 transition-opacity duration-700`}
                                />

                                {/* Gradient sombre */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/25 to-transparent" />

                                {/* Badge Pilier */}
                                <span
                                    className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full
                    bg-black/40 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-ivory backdrop-blur-sm z-30"
                                >
                                    <span className={`h-1.5 w-1.5 rounded-full ${cat.dot}`} />
                                    Pilier
                                </span>

                                {/* TEXT */}
                                <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
                                    <h3 className="font-serif-title text-lg sm:text-xl text-ivory transition-all duration-500 group-hover:translate-y-0">{cat.label}</h3>

                                    <p className="text-[0.8rem] text-ivory/90 mt-1 max-w-xs opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                        {cat.desc}
                                    </p>

                                    <span
                                        className="mt-2 inline-flex items-center gap-1 text-[0.7rem] uppercase tracking-[0.18em]
                    text-ivory/85 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                                    >
                                        Découvrir
                                        <span>↗</span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CONSEILS UX */}
                <section className="card space-y-3 max-w-3xl bg-background">
                    <h3 className="font-serif-title text-lg">Comment choisir ton point de départ ?</h3>
                    <ul className="text-sm text-main/75 space-y-1.5">
                        <li>• Laisse-toi attirer par la couleur qui t’appelle.</li>
                        <li>• Choisis selon ton humeur : calme, énergie, curiosité…</li>
                        <li>• Explore un univers opposé à tes habitudes pour te surprendre.</li>
                    </ul>
                </section>
            </div>
        </section>
    );
}
