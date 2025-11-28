// src/components/articles/couleurs-harmonie/ColorGuideLayout.tsx
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Article } from '@/types/article';
import type { CategoryPost, PillarSlug } from '@/components/categories/category-data';

import { pillarConfig } from '@/components/categories/category-data';
import { ArticleHero } from '@/components/articles/common/ArticleHero';
import { ArticleRelatedGrid } from '@/components/articles/common/ArticleRelatedGrid';
import { ArticleSections } from '@/components/articles/common/ArticleSections';
import { ArticleComments } from '@/components/articles/common/ArticleComments';

import { ArticlePlanBanner } from '@/components/articles/common/ArticlePlanBanner';
import { ArticleOutlineHandle } from '@/components/articles/common/ArticleOutlineHandle';
import { ArticleOutlineDrawer } from '@/components/articles/common/ArticleOutlineDrawer';
import { ArticleScrollProgress } from '../common/ArticleScrollProgress';

import { ALL_ARTICLES } from '@/lib/content/allArticles';

interface Props {
    article: Article;
}

export function ColorGuideLayout({ article }: Props) {
    const [isOutlineOpen, setIsOutlineOpen] = useState(false);

    // Plan
    const outlineItems = useMemo(
        () =>
            (article.sections ?? []).map((section) => ({
                id: section.anchorId,
                label: section.label,
            })),
        [article.sections]
    );

    const totalSections = outlineItems.length;

    // Config pilier
    const pillarCfg = pillarConfig[article.pillar as PillarSlug];

    // Articles liés : mêmes format + pilier
    const relatedPosts: CategoryPost[] = useMemo(() => {
        const candidates = ALL_ARTICLES.filter((post) => {
            return post.slug !== article.slug && post.format === 'color-guide' && post.pillarSlug === article.pillar;
        });

        return candidates.slice(0, 3);
    }, [article.slug, article.pillar]);

    // Body scroll lock
    useEffect(() => {
        if (typeof document === 'undefined') return;

        const previousOverflow = document.body.style.overflow;

        if (isOutlineOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = previousOverflow || '';
        }

        return () => {
            document.body.style.overflow = previousOverflow || '';
        };
    }, [isOutlineOpen]);

    const scrollToSection = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        const offset = 80;

        window.scrollTo({
            top: Math.max(absoluteTop - offset, 0),
            behavior: 'smooth',
        });
    }, []);

    const handleClickItem = useCallback(
        (id: string) => {
            scrollToSection(id);
            setIsOutlineOpen(false);
        },
        [scrollToSection]
    );

    return (
        <>
            {/* 🟢 Barre de progression globale, collée sous le header */}
            <ArticleScrollProgress targetId="color-guide-article" />
            <article id="color-guide-article" className="space-y-8 md:space-y-10">
                <ArticleHero
                    title={article.title}
                    excerpt={article.excerpt}
                    pillar={article.pillar}
                    levelLabel={article.level === 'beginner' ? 'Débutant' : 'Intermédiaire'}
                    formatLabel="Guide couleur"
                    hero={article.hero}
                    author={{
                        name: "L'alchimiste",
                        role: 'Fondatrice d’Explor’Art',
                        avatarSrc: '/images/auteurs/lalchimiste.jpeg',
                    }}
                    meta={['⏱️ 8–10 min de lecture', '🎨 Repères doux pour apprivoiser les couleurs']}
                    publishedAt={article.publishedAt}
                    readingTime={article.readingTime}
                    breadcrumb={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Articles', href: '/articles' },
                        { label: 'Couleurs & harmonie', href: '/articles/couleurs-harmonie' },
                        { label: article.title },
                    ]}
                    primaryCta={{
                        href: '#intro',
                        label: 'Commencer le guide',
                    }}
                    secondaryCta={{
                        href: '#ressources',
                        label: 'Voir les ressources',
                    }}
                />

                {totalSections > 0 && <ArticlePlanBanner totalSections={totalSections} onOpen={() => setIsOutlineOpen(true)} />}

                {article.sections && article.sections.length > 0 && <ArticleSections sections={article.sections} />}

                {relatedPosts.length > 0 && (
                    <ArticleRelatedGrid
                        pillar={pillarCfg}
                        posts={relatedPosts}
                        hrefBase="/articles/couleurs-harmonie"
                        title="Explorer d’autres guides couleur"
                        description="D’autres guides pour jouer avec les palettes, les contrastes et l’harmonie sans prise de tête."
                    />
                )}

                <ArticleComments articleSlug={article.slug} articleTitle={article.title} />
            </article>

            {isOutlineOpen && <div className="fixed inset-0 z-50 m-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOutlineOpen(false)} aria-label="Fermer le plan du guide" />}

            <ArticleOutlineHandle isOpen={isOutlineOpen} onToggle={() => setIsOutlineOpen((o) => !o)} />

            <ArticleOutlineDrawer isOpen={isOutlineOpen} items={outlineItems} onSelect={handleClickItem} onClose={() => setIsOutlineOpen(false)} />
        </>
    );
}
