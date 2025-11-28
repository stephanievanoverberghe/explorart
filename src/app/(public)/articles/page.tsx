// src/app/(public)/articles/page.tsx
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';

import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { pillarConfig, formatLabels, levelLabels, subcatLabels } from '@/components/categories/category-data';
import type { PostFormat, Level } from '@/components/categories/category-data';

type FormatFilter = 'all' | PostFormat;
type LevelFilter = 'all' | Level;

export default function ArticlesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
    const [formatFilter, setFormatFilter] = useState<FormatFilter>('all');

    const formatOptions: { value: FormatFilter; label: string }[] = [
        { value: 'all', label: 'Tous les formats' },
        ...Object.entries(formatLabels).map(([key, label]) => ({
            value: key as PostFormat,
            label,
        })),
    ];

    const filteredPosts = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();

        return ALL_ARTICLES.filter((post) => {
            const matchesSearch = !q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);

            const matchesLevel = levelFilter === 'all' || post.level === levelFilter;
            const matchesFormat = formatFilter === 'all' || post.format === formatFilter;

            return matchesSearch && matchesLevel && matchesFormat;
        });
    }, [searchQuery, levelFilter, formatFilter]);

    return (
        <section className="container-page py-10 space-y-8">
            {/* HEADER */}
            <header className="space-y-3">
                <p className="section-label section-label-sage">Articles</p>
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-serif-title font-semibold">Explorer les articles</h1>
                    <p className="max-w-2xl text-sm md:text-[0.95rem] text-main/75">
                        Tutoriels, analyses, histoires d’artistes, psychologie de l’art… tout ce qui nourrit ton regard et ton geste, en douceur.
                    </p>
                </div>
            </header>

            {/* BARRE DE RECHERCHE + FILTRES */}
            <div className="rounded-3xl border border-perl/60 bg-ivory/70 px-4 py-4 md:px-6 md:py-5 shadow-sm space-y-4">
                {/* Ligne 1 : recherche */}
                <div className="space-y-1">
                    <label htmlFor="articles-search" className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-main/60">
                        Rechercher un article
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-main/40" />
                        <input
                            id="articles-search"
                            type="text"
                            placeholder="Titre, idée, émotion…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-full border border-perl/70 bg-white/80 pl-9 pr-9 py-2.5 text-sm outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-main/40 hover:text-main/80"
                                aria-label="Effacer la recherche"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Ligne 2 : filtres niveau + format */}
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    {/* Niveau */}
                    <div className="space-y-1">
                        <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-main/60">Niveau</p>
                        <div className="inline-flex rounded-full border border-perl/60 bg-white/60 p-1 gap-1">
                            {(
                                [
                                    { value: 'all', label: 'Tous' },
                                    { value: 'beginner', label: levelLabels.beginner },
                                    { value: 'intermediate', label: levelLabels.intermediate },
                                ] as { value: LevelFilter; label: string }[]
                            ).map((opt) => {
                                const isActive = levelFilter === opt.value;
                                return (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setLevelFilter(opt.value)}
                                        className={[
                                            'px-3 py-1 rounded-full text-[0.7rem] md:text-xs font-medium transition-all',
                                            isActive ? 'bg-sage text-ivory shadow-sm' : 'text-main/65 hover:bg-ivory',
                                        ].join(' ')}
                                    >
                                        {opt.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Format */}
                    <div className="space-y-1">
                        <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-main/60">Format</p>
                        <div className="relative inline-block min-w-[210px]">
                            <select
                                value={formatFilter}
                                onChange={(e) => setFormatFilter(e.target.value as FormatFilter)}
                                className="w-full rounded-full border border-perl/60 bg-white/80 px-3 py-2 text-xs md:text-sm pr-8 outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
                            >
                                {formatOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* RÉSULTATS */}
            {filteredPosts.length === 0 ? (
                <p className="text-sm text-main/60">Aucun article ne correspond à ces critères pour le moment.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post) => {
                        const pillar = pillarConfig[post.pillarSlug];
                        const hrefBase = formatToPath[post.format];

                        return (
                            <Link
                                key={post.slug}
                                href={`${hrefBase}/${post.slug}`}
                                className="group relative overflow-hidden rounded-3xl border border-perl/40 bg-white/80 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                            >
                                {/* Bandeau vertical couleur */}
                                <div className="absolute left-0 top-0 h-full w-1.5 z-20" style={{ backgroundColor: pillar.color }} />

                                <div className="flex flex-col h-full">
                                    {/* IMAGE */}
                                    <div className="relative w-full aspect-4/3 overflow-hidden">
                                        <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                                        <div
                                            className={`pointer-events-none absolute inset-0 ${pillar.dotClass}/15 opacity-0 blur-[60px] group-hover:opacity-100 transition-opacity duration-700`}
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/25 to-transparent" />
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
                        );
                    })}
                </div>
            )}
        </section>
    );
}

// Mapping des formats vers les segments de route en français
const formatToPath: Record<PostFormat, string> = {
    tutorial: '/articles/tutoriels',
    'artwork-analysis': '/articles/comprendre-une-oeuvre',
    'artist-story': '/articles/histoires-d-artistes',
    'art-history': '/articles/histoire-de-l-art',
    'color-guide': '/articles/couleurs-harmonie',
    'art-psychology': '/articles/psychologie-de-l-art',
    inspiration: '/articles/inspirations',
};
