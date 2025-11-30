// src/components/home/HomeLatestPosts.tsx
import Link from 'next/link';
import Image from 'next/image';

import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { pillarConfig, type PillarSlug, formatLabels, type CategoryPost, type PostFormat } from '@/components/categories/category-data';

// 🟩 Helper : convertir une date string en timestamp (fallback = 0)
function parseDate(date: string | undefined): number {
    return date ? new Date(date).getTime() : 0;
}

// 🟩 On récupère les 3 derniers articles publiés
function getLatestArticles(list: CategoryPost[], count = 3) {
    return [...list].sort((a, b) => parseDate(b.publishedAt) - parseDate(a.publishedAt)).slice(0, count);
}

// 🧭 Mapping des formats vers les segments de route en français
const formatToPath: Record<PostFormat, string> = {
    tutorial: '/articles/tutoriels',
    'artwork-analysis': '/articles/comprendre-une-oeuvre',
    'artist-story': '/articles/histoires-d-artistes',
    'art-history': '/articles/histoire-de-l-art',
    'color-guide': '/articles/couleurs-harmonie',
    'art-psychology': '/articles/psychologie-de-l-art',
    inspiration: '/articles/inspirations',
};

export default function HomeLatestPosts() {
    const latestPosts = getLatestArticles(ALL_ARTICLES, 3);

    return (
        <section className="py-16 md:py-20 relative overflow-hidden border-y border-perl/40 bg-ivory">
            {/* halos très doux */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute top-[-20%] left-[-15%] h-80 w-80 rounded-full bg-sage/12 blur-[120px]" />
                <div className="absolute bottom-[-25%] right-[-10%] h-96 w-96 rounded-full bg-rose/12 blur-[150px]" />
            </div>

            <div className="container-page space-y-10">
                {/* HEADER */}
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
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {latestPosts.map((post, index) => {
                        const pillar = pillarConfig[post.pillarSlug as PillarSlug];
                        const levelLabel = post.level === 'beginner' ? 'Débutant' : 'Intermédiaire';
                        const formatLabel = formatLabels[post.format];

                        // 👉 Href correct selon le format (aligné sur /articles)
                        const basePath = formatToPath[post.format];
                        const href = `${basePath}/${post.slug}`;

                        return (
                            <Link
                                key={post.slug}
                                href={href}
                                className="cursor-pointer group relative flex flex-col overflow-hidden rounded-3xl border border-perl/60 bg-background/70 shadow-[0_8px_22px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(15,23,42,0.10)] animate-fade-up"
                                style={{ animationDelay: `${0.05 + index * 0.1}s` }}
                            >
                                {/* IMAGE */}
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-900 group-hover:scale-[1.06]" />

                                    <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />

                                    <div
                                        className={`pointer-events-none absolute -inset-4 rounded-3xl ${pillar.dotClass}/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                    />

                                    {/* Badges en haut à gauche */}
                                    <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                                        {/* Badge format (Tutoriel, Analyse d’œuvre, etc.) */}
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-ivory backdrop-blur-md shadow-sm">
                                            <span className={`h-1.5 w-1.5 rounded-full ${pillar.dotClass}`} />
                                            {formatLabel}
                                        </span>

                                        {/* Badge NOUVEAU */}
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-terre/85 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-ivory shadow-sm">
                                            Nouveau
                                        </span>
                                    </div>
                                </div>

                                {/* TEXTE */}
                                <div className="p-5 flex-1 flex flex-col gap-3">
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="badge badge-level">{levelLabel}</span>
                                        <span className={`badge badge-pillar ${pillar.badgeClass} inline-flex items-center gap-1`}>
                                            <span className={`h-1.5 w-1.5 rounded-full ${pillar.dotClass}`} />
                                            {pillar.title}
                                        </span>
                                    </div>

                                    <h3 className="font-serif-title text-xl leading-snug text-main transition-colors duration-200 group-hover:text-terre">{post.title}</h3>

                                    <p className="text-sm text-main/75 flex-1">{post.excerpt}</p>

                                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-perl/40 text-[0.8rem] text-main/60">
                                        <span className="inline-flex items-center gap-1">
                                            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                                            {post.readingTime} · Lecture douce
                                        </span>

                                        <span className="inline-flex items-center gap-1 text-sage group-hover:text-terre transition-colors">
                                            Lire l’article
                                            <span>↗</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
