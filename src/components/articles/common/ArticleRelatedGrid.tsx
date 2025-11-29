// src/components/articles/common/ArticleRelatedGrid.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { PillarConfig } from '@/components/categories/category-data';
import { formatLabels, levelLabels, subcatLabels } from '@/components/categories/category-data';
import type { ArticleRelatedPost } from '@/types/article';
import { ARTICLE_FORMATS_BY_KEY } from '@/lib/content/articleFormats';
import { getArticlesListPath } from '@/lib/routing/articlePaths';

type RelatedPost = ArticleRelatedPost;

interface ArticleRelatedGridProps {
    pillar: PillarConfig;
    posts: RelatedPost[];
    title?: string;
    description?: string;
    hrefBase?: string; // ex: '/articles/tutoriels'
}

export function ArticleRelatedGrid({
    pillar,
    posts,
    title = 'Continuer avec…',
    description = 'D’autres articles dans le même esprit, pour prolonger ce que tu viens de travailler.',
    hrefBase,
}: ArticleRelatedGridProps) {
    if (!posts || posts.length === 0) return null;

    // 🟩 Limiter à 3 articles max
    const limited = posts.slice(0, 3);
    const primary = limited[0];
    const sides = limited.slice(1);

    const baseHref = hrefBase ?? getArticlesListPath(primary.pillar);
    const formatLabel = ARTICLE_FORMATS_BY_KEY[primary.format]?.label ?? 'articles';

    return (
        <section className="mt-16 space-y-5 border-t border-perl/40 pt-8">
            {/* HEADER */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                    <p className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-main/55">
                        <span className="inline-flex h-6 items-center rounded-full bg-vert/5 px-2 text-[0.7rem] font-semibold text-vert">Suite douce</span>
                        <span className="hidden md:inline text-main/45">Suggestions dans le même univers</span>
                    </p>
                    <h2 className="font-serif-title text-lg md:text-xl">{title}</h2>
                    <p className="text-xs md:text-sm text-main/65 max-w-2xl">{description}</p>
                </div>

                <Link
                    href={baseHref}
                    className="inline-flex items-center justify-center rounded-full border border-perl/60 bg-background px-3 py-1.5 text-[0.75rem] font-medium text-main/80 shadow-sm hover:border-vert/70 hover:bg-vert/5 hover:text-main transition-colors"
                >
                    Voir tous les {formatLabel.toLowerCase()}
                    <span className="ml-1.5 text-xs">↗</span>
                </Link>
            </div>

            {/* LAYOUT */}
            {limited.length === 1 ? (
                // 1 seul article → grande card centrée
                <div className="mt-4 max-w-3xl mx-auto">
                    <PrimaryCard post={primary} pillar={pillar} hrefBase={baseHref} />
                </div>
            ) : (
                // 2 ou 3 articles → primaire au milieu, un peu plus grande
                <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.25fr)_minmax(0,1.05fr)] items-stretch">
                    {/* Gauche */}
                    {sides[0] ? <SecondaryCard post={sides[0]} pillar={pillar} hrefBase={baseHref} /> : <div className="hidden lg:block" />}

                    {/* Centre : PROCHAINE ÉTAPE (plus grande, effet) */}
                    <div className="relative">
                        {/* Halo discret derrière la card principale */}
                        <div className={`pointer-events-none absolute inset-0 mx-auto max-w-xl ${pillar.dotClass}/20 blur-[70px] opacity-70`} />
                        <PrimaryCard post={primary} pillar={pillar} hrefBase={baseHref} highlight />
                    </div>

                    {/* Droite */}
                    {sides[1] ? <SecondaryCard post={sides[1]} pillar={pillar} hrefBase={baseHref} /> : <div className="hidden lg:block" />}
                </div>
            )}
        </section>
    );
}

/* ---------------- CARDS ---------------- */

interface CardProps {
    post: RelatedPost;
    pillar: PillarConfig;
    hrefBase?: string;
    highlight?: boolean;
}

/**
 * Card centrale "Prochaine étape"
 */
function PrimaryCard({ post, pillar, hrefBase, highlight }: CardProps) {
    const baseHref = hrefBase ?? getArticlesListPath(post.pillar);
    const formatLabel = formatLabels[post.format]?.toLowerCase() ?? 'article';

    return (
        <Link
            href={`${baseHref}/${post.slug}`}
            className={[
                'group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white/90 shadow-sm transition-all duration-500',
                'border-perl/50 hover:shadow-xl hover:-translate-y-1',
                highlight ? 'lg:scale-[1.02] lg:-translate-y-1.5' : '',
            ]
                .filter(Boolean)
                .join(' ')}
        >
            {/* Bandeau vertical couleur pilier */}
            <div className="absolute left-0 top-0 z-20 h-full w-1.5" style={{ backgroundColor: pillar.color }} />

            <div className="flex flex-col h-full">
                {/* IMAGE */}
                <div className="relative w-full aspect-4/3 overflow-hidden">
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                    {/* Halo coloré */}
                    <div className={`pointer-events-none absolute inset-0 ${pillar.dotClass}/20 opacity-0 blur-[60px] group-hover:opacity-100 transition-opacity duration-700`} />
                    {/* Gradient sombre bas */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/30 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-30">
                        {/* Niveau */}
                        <span className="badge-level text-[0.65rem] uppercase tracking-[0.16em] rounded-full px-2 py-1">{levelLabels[post.level]}</span>

                        {/* Format */}
                        <span className={`badge-pillar text-[0.65rem] uppercase tracking-[0.16em] rounded-full px-2 py-1 ${pillar.badgeClass}`}>{formatLabels[post.format]}</span>

                        {/* Sous-univers */}
                        <span className="badge-subcat text-[0.65rem] uppercase tracking-[0.16em] rounded-full px-2 py-1 bg-black/45 backdrop-blur-sm text-ivory/90">
                            {subcatLabels[post.subcategory]}
                        </span>
                    </div>

                    {/* Label "Prochaine étape" */}
                    <div className="absolute bottom-3 right-3 z-30">
                        <span className="inline-flex items-center gap-1 rounded-full bg-ivory/95 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-main shadow-sm">
                            Prochaine étape
                            <span className="text-xs leading-none">↗</span>
                        </span>
                    </div>
                </div>

                {/* CONTENU */}
                <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
                    <h3 className="font-serif-title text-base md:text-lg text-main group-hover:underline decoration-1 underline-offset-4">{post.title}</h3>
                    <p className="text-sm text-main/75 leading-relaxed line-clamp-3">{post.excerpt}</p>

                    <div className="mt-auto flex items-center justify-between pt-2 text-xs text-main/60">
                        <span>{post.readingTime} · Lecture douce</span>
                        <span className="inline-flex items-center gap-1 text-[0.7rem] uppercase tracking-[0.18em] group-hover:text-main">
                            Ouvrir {formatLabel} <span>↗</span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

/**
 * Cards latérales (gauche / droite)
 */
function SecondaryCard({ post, pillar, hrefBase }: CardProps) {
    const baseHref = hrefBase ?? getArticlesListPath(post.pillar);
    const formatLabel = formatLabels[post.format]?.toLowerCase() ?? 'article';

    return (
        <Link
            href={`${baseHref}/${post.slug}`}
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-perl/40 bg-white/80 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
            {/* Bandeau vertical couleur pilier */}
            <div className="absolute left-0 top-0 z-20 h-full w-1.5" style={{ backgroundColor: pillar.color }} />

            <div className="flex flex-col h-full">
                {/* IMAGE */}
                <div className="relative w-full aspect-4/3 overflow-hidden">
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                    <div className={`pointer-events-none absolute inset-0 ${pillar.dotClass}/15 opacity-0 blur-[60px] group-hover:opacity-100 transition-opacity duration-700`} />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/25 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-30">
                        <span className="badge-level text-[0.65rem] uppercase tracking-[0.16em] rounded-full px-2 py-1">{levelLabels[post.level]}</span>

                        <span className={`badge-pillar text-[0.65rem] uppercase tracking-[0.16em] rounded-full px-2 py-1 ${pillar.badgeClass}`}>{formatLabels[post.format]}</span>

                        <span className="badge-subcat text-[0.65rem] uppercase tracking-[0.16em] rounded-full px-2 py-1 bg-black/40 backdrop-blur-sm text-ivory/90">
                            {subcatLabels[post.subcategory]}
                        </span>
                    </div>
                </div>

                {/* CONTENU */}
                <div className="flex flex-1 flex-col gap-2 p-4">
                    <h3 className="font-serif-title text-sm md:text-base text-main group-hover:underline decoration-1 underline-offset-4">{post.title}</h3>
                    <p className="text-xs md:text-sm text-main/75 leading-relaxed line-clamp-3">{post.excerpt}</p>

                    <div className="mt-auto flex items-center justify-between pt-2 text-[0.7rem] text-main/60">
                        <span>{post.readingTime} · Lecture douce</span>
                        <span className="inline-flex items-center gap-1 uppercase tracking-[0.18em] group-hover:text-main">
                            Lire {formatLabel} <span>↗</span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
