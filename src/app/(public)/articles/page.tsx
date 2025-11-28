// src/app/(public)/articles/page.tsx
'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { pillarConfig, formatLabels, levelLabels, subcatLabels } from '@/components/categories/category-data';
import type { PostFormat, Level } from '@/components/categories/category-data';
import { ArticlesOverviewHero } from '@/components/articles/common/ArticlesOverviewHero';

type FormatFilter = 'all' | PostFormat;
type LevelFilter = 'all' | Level;
type SortOrder = 'recent' | 'oldest';

const PAGE_SIZE = 9; // 9 = joli en 3x3

export default function ArticlesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
    const [formatFilter, setFormatFilter] = useState<FormatFilter>('all');
    const [sortOrder, setSortOrder] = useState<SortOrder>('recent');
    const [currentPage, setCurrentPage] = useState(1);
    // 🔗 ancre pour remonter au début des résultats
    const resultsRef = useRef<HTMLDivElement | null>(null);

    const formatOptions: { value: FormatFilter; label: string }[] = [
        { value: 'all', label: 'Tous les formats' },
        ...Object.entries(formatLabels).map(([key, label]) => ({
            value: key as PostFormat,
            label,
        })),
    ];

    const filteredPosts = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();

        const filtered = ALL_ARTICLES.filter((post) => {
            const matchesSearch = !q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);

            const matchesLevel = levelFilter === 'all' || post.level === levelFilter;
            const matchesFormat = formatFilter === 'all' || post.format === formatFilter;

            return matchesSearch && matchesLevel && matchesFormat;
        });

        // Tri par date
        return filtered.sort((a, b) => {
            const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
            const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;

            if (sortOrder === 'recent') {
                return dateB - dateA; // plus récents d'abord
            }
            return dateA - dateB; // plus anciens d'abord
        });
    }, [searchQuery, levelFilter, formatFilter, sortOrder]);

    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * PAGE_SIZE;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + PAGE_SIZE);

    const hasActiveFilters = searchQuery.trim() !== '' || levelFilter !== 'all' || formatFilter !== 'all' || sortOrder !== 'recent';

    const handleResetFilters = () => {
        setSearchQuery('');
        setLevelFilter('all');
        setFormatFilter('all');
        setSortOrder('recent');
        setCurrentPage(1);
    };

    const goToPage = (page: number) => {
        setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    };

    // 🔼 remonter au bloc des résultats à chaque changement de page
    useEffect(() => {
        if (typeof window === 'undefined' || !resultsRef.current) return;

        const rect = resultsRef.current.getBoundingClientRect();
        const offset = 100; // marge pour ne pas coller le header
        const top = rect.top + window.scrollY - offset;

        window.scrollTo({
            top,
            behavior: 'smooth',
        });
    }, [currentPage]);

    return (
        <section className="container-page py-10 space-y-8">
            {/* ✅ Hero global pour les articles */}
            <ArticlesOverviewHero />

            {/* 🧭 Layout 2 colonnes : filtres à gauche, résultats à droite */}
            <section className="grid gap-6 lg:grid-cols-[minmax(0,290px)_minmax(0,1fr)] items-start">
                {/* 🧊 PANNEAU FILTRES (colonne gauche, sticky sur desktop) */}
                <aside className="lg:sticky lg:top-20 space-y-4">
                    <div className="rounded-3xl border border-perl/60 bg-background/95 px-4 py-4 md:px-5 md:py-5 shadow-sm space-y-4">
                        {/* Header filtres : titre + résumé + reset */}
                        <div className="flex flex-col gap-2">
                            <div className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-main/60">
                                <SlidersHorizontal className="h-3.5 w-3.5" />
                                <span>Affiner la bibliothèque</span>
                            </div>
                            <p className="text-xs text-main/65">
                                {filteredPosts.length} article
                                {filteredPosts.length > 1 ? 's' : ''} trouvé
                                {hasActiveFilters ? ' · filtres actifs' : ' · vue globale'}
                            </p>

                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={handleResetFilters}
                                    className="inline-flex w-fit items-center gap-1 rounded-full border border-perl/70 bg-white/80 px-3 py-1 text-[0.7rem] uppercase tracking-[0.16em] text-main/70 hover:bg-ivory/90 hover:border-main/60 transition-colors"
                                >
                                    <X className="h-3 w-3" />
                                    Réinitialiser
                                </button>
                            )}
                        </div>

                        {/* 🔍 Recherche */}
                        <div className="space-y-1 pt-1">
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
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setCurrentPage(1);
                                    }}
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
                            <p className="text-[0.68rem] text-main/55 pt-1">
                                Tu peux taper un thème (<span className="italic">couleur</span>, <span className="italic">blocage</span>…), une période, un artiste, une émotion…
                            </p>
                        </div>

                        {/* 🎨 Format */}
                        <div className="space-y-1 pt-2">
                            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-main/60">Format</p>
                            <div className="flex flex-wrap gap-1.5">
                                {formatOptions.map((opt) => {
                                    const isActive = formatFilter === opt.value;
                                    const baseClasses =
                                        opt.value === 'all' ? 'border-perl/60 bg-white/80 text-main/70 cursor-pointer' : 'cursor-pointer border-main/10 bg-main/3 text-main/75';

                                    const activeClasses = opt.value === 'all' ? 'border-sage bg-sage text-ivory' : 'cursor-pointer border-sage/80 bg-sage/15 text-sage/90';

                                    return (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => {
                                                setFormatFilter(opt.value);
                                                setCurrentPage(1);
                                            }}
                                            className={[
                                                'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.16em] border transition-colors',
                                                isActive ? activeClasses : baseClasses,
                                            ].join(' ')}
                                        >
                                            {opt.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 🎚 Niveau */}
                        <div className="space-y-1 pt-2">
                            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-main/60">Niveau</p>
                            <div className="inline-flex rounded-full border border-perl/60 bg-white/70 p-1 gap-1">
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
                                            onClick={() => {
                                                setLevelFilter(opt.value);
                                                setCurrentPage(1);
                                            }}
                                            className={[
                                                'px-3 py-1 rounded-full text-[0.7rem] md:text-xs font-medium transition-all',
                                                isActive ? 'bg-sage text-ivory shadow-sm' : 'cursor-pointer text-main/65 hover:bg-ivory',
                                            ].join(' ')}
                                        >
                                            {opt.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 🧾 Mini recap actif (optionnel mais agréable) */}
                        <div className="pt-2 border-t border-perl/40 mt-2">
                            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/55 mb-1">Résumé</p>
                            <p className="text-[0.7rem] text-main/65">
                                {levelFilter === 'all' ? 'Tous niveaux' : levelLabels[levelFilter]} ·{' '}
                                {formatFilter === 'all' ? 'Tous les formats' : formatOptions.find((f) => f.value === formatFilter)?.label}
                            </p>
                        </div>
                    </div>
                </aside>

                {/* 📚 RÉSULTATS (colonne droite) */}
                <div ref={resultsRef} className="space-y-4">
                    {/* Header résultats : titre + tri + pagination courte */}
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <p className="text-[0.75rem] uppercase tracking-[0.18em] text-main/60">Résultats</p>
                            <p className="text-xs md:text-[0.85rem] text-main/70">
                                {filteredPosts.length} article
                                {filteredPosts.length > 1 ? 's' : ''} · page {safePage} sur {totalPages}
                            </p>
                        </div>

                        {/* Tri par date + bouton compact */}
                        <div className="flex flex-wrap items-center gap-2 md:justify-end">
                            <span className="text-[0.7rem] uppercase tracking-[0.16em] text-main/60">Trier par</span>
                            <div className="inline-flex rounded-full border border-perl/60 bg-white/80 p-1 gap-1">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSortOrder('recent');
                                        setCurrentPage(1);
                                    }}
                                    className={[
                                        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-[0.7rem] md:text-xs font-medium transition-all',
                                        sortOrder === 'recent' ? 'bg-sage text-ivory shadow-sm border-sage' : 'cursor-pointer text-main/65 hover:bg-sage/10 hover:border-sage/40',
                                    ].join(' ')}
                                >
                                    <ArrowUpDown className="h-3 w-3" />
                                    Plus récents
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSortOrder('oldest');
                                        setCurrentPage(1);
                                    }}
                                    className={[
                                        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-[0.7rem] md:text-xs font-medium transition-all',
                                        sortOrder === 'oldest' ? 'bg-sage text-ivory shadow-sm border-sage' : 'cursor-pointer text-main/65 hover:bg-sage/10 hover:border-sage/40',
                                    ].join(' ')}
                                >
                                    <ArrowUpDown className="h-3 w-3" />
                                    Plus anciens
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* LISTE / GRID */}
                    {filteredPosts.length === 0 ? (
                        <p className="text-sm text-main/60">Aucun article ne correspond à ces critères pour le moment.</p>
                    ) : (
                        <>
                            {/* GRID COMPACTE DES ARTICLES */}
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {paginatedPosts.map((post) => {
                                    const pillar = pillarConfig[post.pillarSlug];
                                    const hrefBase = formatToPath[post.format];

                                    return (
                                        <Link
                                            key={post.slug}
                                            href={`${hrefBase}/${post.slug}`}
                                            className="group relative overflow-hidden rounded-2xl border border-perl/30 bg-white/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                                        >
                                            {/* Bandeau vertical couleur pilier */}
                                            <div className="absolute left-0 top-0 h-full w-1 z-20" style={{ backgroundColor: pillar.color }} />

                                            <div className="flex flex-col h-full">
                                                {/* IMAGE plus compacte */}
                                                <div className="relative w-full aspect-4/3 overflow-hidden">
                                                    <Image
                                                        src={post.coverImage}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                                    />
                                                    <div
                                                        className={`pointer-events-none absolute inset-0 ${pillar.dotClass}/15 opacity-0 blur-[50px] group-hover:opacity-100 transition-opacity duration-500`}
                                                    />
                                                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/20 to-transparent" />

                                                    {/* Badges plus petits */}
                                                    <div className="absolute top-2 left-2 flex flex-wrap gap-1.5 z-30">
                                                        <span className="text-[0.6rem] uppercase tracking-[0.16em] rounded-full px-1.5 py-0.5 bg-ivory/90 text-main shadow-sm">
                                                            {levelLabels[post.level]}
                                                        </span>
                                                        <span className={`text-[0.6rem] uppercase tracking-[0.16em] rounded-full px-1.5 py-0.5 ${pillar.badgeClass}`}>
                                                            {formatLabels[post.format]}
                                                        </span>
                                                        <span className="text-[0.6rem] uppercase tracking-[0.16em] rounded-full px-1.5 py-0.5 bg-black/40 backdrop-blur-sm text-ivory/90">
                                                            {subcatLabels[post.subcategory]}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* CONTENU plus serré */}
                                                <div className="flex flex-1 flex-col gap-1.5 p-3">
                                                    <h3 className="font-serif-title text-[0.95rem] md:text-base text-main group-hover:underline decoration-1 underline-offset-4">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-[0.8rem] text-main/75 leading-relaxed line-clamp-3">{post.excerpt}</p>

                                                    <div className="mt-auto flex items-center justify-between pt-1.5 text-[0.7rem] text-main/60">
                                                        <span>{post.readingTime} · Lecture douce</span>
                                                        <span className="inline-flex items-center gap-1 text-[0.68rem] uppercase tracking-[0.18em] group-hover:text-main">
                                                            Lire <span>↗</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* 🔢 Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-4 flex flex-col items-center gap-3">
                                    <p className="text-[0.75rem] text-main/60">
                                        Page <span className="font-medium text-main/80">{safePage}</span> sur <span className="font-medium text-main/80">{totalPages}</span>
                                    </p>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => goToPage(safePage - 1)}
                                            disabled={safePage === 1}
                                            className={[
                                                'inline-flex items-center rounded-full border px-3 py-1 text-[0.75rem]',
                                                safePage === 1
                                                    ? 'border-perl/40 text-main/40 cursor-not-allowed bg-background'
                                                    : 'cursor-pointer border-perl/70 text-main/70 bg-background hover:bg-ivory/90 hover:border-main/60',
                                            ].join(' ')}
                                        >
                                            ← Précédent
                                        </button>

                                        {/* Boutons numérotés */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {Array.from({ length: totalPages }).map((_, index) => {
                                                const page = index + 1;
                                                const isActive = page === safePage;

                                                return (
                                                    <button
                                                        key={page}
                                                        type="button"
                                                        onClick={() => goToPage(page)}
                                                        className={[
                                                            'h-8 min-w-8 rounded-full border text-[0.75rem] px-2 flex items-center justify-center',
                                                            isActive
                                                                ? 'border-sage bg-sage text-ivory shadow-sm'
                                                                : 'cursor-pointer border-perl/70 bg-background text-main/70 hover:bg-sage/10 hover:border-sage/40',
                                                        ].join(' ')}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => goToPage(safePage + 1)}
                                            disabled={safePage === totalPages}
                                            className={[
                                                'inline-flex items-center rounded-full border px-3 py-1 text-[0.75rem] transition-all',
                                                safePage === totalPages
                                                    ? 'border-perl/40 text-main/40 cursor-not-allowed bg-background'
                                                    : 'cursor-pointer border-perl/70 text-main/70 bg-background hover:bg-sage/10 hover:border-sage/40',
                                            ].join(' ')}
                                        >
                                            Suivant →
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
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
