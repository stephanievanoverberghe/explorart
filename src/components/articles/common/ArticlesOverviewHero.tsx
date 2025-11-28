// src/components/articles/common/ArticlesOverviewHero.tsx
import Link from 'next/link';
import { pillarConfig, formatLabels } from '@/components/categories/category-data';
import type { PostFormat } from '@/components/categories/category-data';

const formatOrder: PostFormat[] = ['tutorial', 'artwork-analysis', 'artist-story', 'art-history', 'color-guide', 'inspiration', 'art-psychology'];

// Palette douce pour chaque type d’article (on recycle les univers)
const formatColorClasses: Record<PostFormat, { dot: string; bg: string; border: string; text: string }> = {
    tutorial: {
        dot: 'bg-vert',
        bg: 'bg-vert/6',
        border: 'border-vert/40',
        text: 'text-vert/90',
    },
    'artwork-analysis': {
        dot: 'bg-bleu',
        bg: 'bg-bleu/6',
        border: 'border-bleu/40',
        text: 'text-bleu/90',
    },
    'artist-story': {
        dot: 'bg-terre',
        bg: 'bg-terre/6',
        border: 'border-terre/40',
        text: 'text-terre/90',
    },
    'art-history': {
        dot: 'bg-ocre',
        bg: 'bg-ocre/6',
        border: 'border-ocre/40',
        text: 'text-ocre/90',
    },
    'color-guide': {
        dot: 'bg-sage',
        bg: 'bg-sage/6',
        border: 'border-sage/40',
        text: 'text-sage/90',
    },
    inspiration: {
        dot: 'bg-rose',
        bg: 'bg-rose/6',
        border: 'border-rose/40',
        text: 'text-rose/90',
    },
    'art-psychology': {
        dot: 'bg-prune',
        bg: 'bg-prune/6',
        border: 'border-prune/40',
        text: 'text-prune/90',
    },
};

export function ArticlesOverviewHero() {
    const pillars = Object.entries(pillarConfig);

    return (
        <header className="space-y-4">
            <div className="rounded-3xl border border-perl/60 bg-background px-4 py-5 md:px-6 md:py-6 shadow-sm space-y-4">
                {/* Fil d’ariane */}
                <nav className="text-[0.7rem] md:text-xs text-main/60" aria-label="Fil d’Ariane">
                    <ol className="flex flex-wrap items-center gap-1.5">
                        <li>
                            <Link href="/" className="hover:text-main">
                                Accueil
                            </Link>
                        </li>
                        <li>›</li>
                        <li className="text-main/80">Articles</li>
                    </ol>
                </nav>

                {/* Bloc titre + texte */}
                <div className="space-y-3">
                    <p className="section-label section-label-sage">Bibliothèque Explor&apos;Art</p>
                    <div className="space-y-2">
                        <h1 className="font-serif-title text-3xl md:text-4xl leading-tight">Tous les articles, au même endroit</h1>
                        <p className="max-w-xl text-sm md:text-[0.95rem] text-main/75">
                            Tutoriels, analyses, histoires d’artistes, psychologie de l’art, couleurs, inspirations… Ici, tu peux tout traverser librement et suivre ce qui
                            t’attire, sans te perdre dans les menus.
                        </p>
                    </div>
                    <p className="text-xs md:text-sm text-main/70 max-w-xl">
                        Commence par un format qui résonne avec ton besoin du moment, ou entre simplement un mot-clé : une émotion, un outil, un artiste, une période…
                    </p>
                </div>

                {/* Ligne formats (pills) */}
                <div className="space-y-2">
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Types d’articles</p>
                    <div className="flex flex-wrap gap-1.5">
                        {formatOrder.map((format) => {
                            const color = formatColorClasses[format];
                            return (
                                <span
                                    key={format}
                                    className={`
                                        inline-flex items-center gap-1.5 rounded-full
                                        border px-2.5 py-0.5 text-[0.7rem] uppercase tracking-[0.16em]
                                        ${color.bg} ${color.border} ${color.text}
                                    `}
                                >
                                    <span className={`h-1.5 w-1.5 rounded-full ${color.dot}`} aria-hidden="true" />
                                    {formatLabels[format]}
                                </span>
                            );
                        })}
                    </div>
                </div>

                {/* Grille des piliers (équilibrée, en bas de la carte) */}
                <div className="space-y-2 pt-2">
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Explorer par univers</p>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {pillars.map(([slug, pillar]) => (
                            <Link
                                key={slug}
                                href={`/articles/${slug === 'dessin-peinture' ? 'tutoriels' : slug}`}
                                className="group relative flex items-start gap-2 rounded-2xl border border-perl/50 bg-ivory/80 px-3 py-2.5 overflow-hidden transition-colors hover:border-main/60 hover:bg-ivory/95"
                            >
                                {/* halo coloré très doux au hover */}
                                <div
                                    className={`pointer-events-none absolute inset-0 ${pillar.dotClass}/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                                    aria-hidden="true"
                                />
                                <span className={`relative mt-1 h-2 w-2 rounded-full ${pillar.dotClass}`} aria-hidden="true" />
                                <div className="relative space-y-0.5">
                                    <p className="text-sm font-medium text-main underline-offset-4">{pillar.title}</p>
                                    <p className="text-[0.7rem] text-main/65 line-clamp-2">{pillar.tagline}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <p className="text-[0.7rem] text-main/60 pt-1">
                        Tu peux aussi rester ici et filtrer tous les articles confondus avec la recherche et les filtres juste en dessous.
                    </p>
                </div>
            </div>
        </header>
    );
}
