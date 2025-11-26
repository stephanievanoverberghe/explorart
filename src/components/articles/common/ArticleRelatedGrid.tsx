// src/components/articles/common/ArticleRelatedGrid.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { PillarConfig } from '@/components/categories/category-data';
import { formatLabels, levelLabels, subcatLabels } from '@/components/categories/category-data';
import type { TutorialRelatedPost } from '@/types/tutorial';

type RelatedPost = TutorialRelatedPost;

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
    hrefBase = '/articles/tutoriels',
}: ArticleRelatedGridProps) {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="mt-14 space-y-4">
            {/* HEADER */}
            <div className="space-y-1">
                <h2 className="font-serif-title text-lg md:text-xl">{title}</h2>
                <p className="text-xs md:text-sm text-main/65 max-w-2xl">{description}</p>
            </div>

            {/* GRID DE CARDS — même design que CategoryPostGrid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`${hrefBase}/${post.slug}`}
                        className="group relative overflow-hidden rounded-3xl border border-perl/40 bg-white/80 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                        {/* Bandeau vertical couleur pilier */}
                        <div className="absolute left-0 top-0 h-full w-1.5 z-20" style={{ backgroundColor: pillar.color }} />

                        <div className="flex flex-col h-full">
                            {/* IMAGE */}
                            <div className="relative w-full aspect-4/3 overflow-hidden">
                                <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                                {/* Halo */}
                                <div
                                    className={`pointer-events-none absolute inset-0 ${pillar.dotClass}/15 opacity-0 blur-[60px] group-hover:opacity-100 transition-opacity duration-700`}
                                />
                                {/* Gradient */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/25 to-transparent" />
                                {/* Badges */}
                                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-30">
                                    <span className="badge-level text-[0.65rem] uppercase tracking-[0.16em] rounded-full px-2 py-1">{levelLabels[post.level]}</span>

                                    <span className={`badge-pillar text-[0.65rem] uppercase tracking-[0.16em] rounded-full px-2 py-1 ${pillar.badgeClass}`}>
                                        {formatLabels[post.format]}
                                    </span>

                                    <span className="badge-subcat text-[0.65rem] uppercase tracking-[0.16em] rounded-full px-2 py-1 bg-black/40 backdrop-blur-sm text-ivory/90">
                                        {subcatLabels[post.subcategory]}
                                    </span>
                                </div>
                            </div>

                            {/* CONTENU */}
                            <div className="flex flex-1 flex-col gap-2 p-4">
                                <h3 className="font-serif-title text-base md:text-lg text-main group-hover:underline decoration-1 underline-offset-4">{post.title}</h3>
                                <p className="text-sm text-main/75 leading-relaxed line-clamp-3">{post.excerpt}</p>

                                <div className="mt-auto flex items-center justify-between pt-2 text-xs text-main/60">
                                    <span>{post.readingTime} · Lecture douce</span>
                                    <span className="inline-flex items-center gap-1 text-[0.7rem] uppercase tracking-[0.18em] group-hover:text-main">
                                        Lire l’article <span>↗</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
