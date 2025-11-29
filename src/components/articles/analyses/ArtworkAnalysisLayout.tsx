// src/components/articles/analyses/ArtworkAnalysisLayout.tsx
'use client';

import { useMemo } from 'react';
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
import { useArticleOutline } from '../common/useArticleOutline';

import { ALL_ARTICLES } from '@/lib/content/allArticles';

interface Props {
    article: Article;
}

export function ArtworkAnalysisLayout({ article }: Props) {
    const { outlineItems, totalSections, isOutlineOpen, openOutline, closeOutline, toggleOutline, handleSelect } = useArticleOutline(article.sections);

    // 🎨 Config de pilier
    const pillarCfg = pillarConfig[article.pillar as PillarSlug];

    // 🧩 Suggestions d’analyses liées (même pilier, même format, slug différent)
    const relatedPosts: CategoryPost[] = useMemo(() => {
        const candidates = ALL_ARTICLES.filter((post) => {
            return post.slug !== article.slug && post.format === 'artwork-analysis' && post.pillarSlug === article.pillar;
        });

        return candidates.slice(0, 3);
    }, [article.slug, article.pillar]);

    return (
        <>
            {/* 🟢 Barre de progression globale, collée sous le header */}
            <ArticleScrollProgress targetId="artwork-analysis-article" />
            <article id="artwork-analysis-article" className="space-y-8 md:space-y-10">
                <ArticleHero
                    title={article.title}
                    excerpt={article.excerpt}
                    pillar={article.pillar}
                    levelLabel={article.level === 'beginner' ? 'Débutant' : 'Intermédiaire'}
                    formatLabel="Analyse d’œuvre"
                    hero={article.hero}
                    author={{
                        name: "L'alchimiste",
                        role: 'Fondatrice d’Explor’Art',
                        avatarSrc: '/images/auteurs/lalchimiste.jpeg',
                    }}
                    meta={['⏱️ 8–10 min de lecture douce', '🔎 4 étapes simples pour regarder autrement']}
                    publishedAt={article.publishedAt}
                    readingTime={article.readingTime}
                    breadcrumb={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Articles', href: '/articles' },
                        { label: 'Comprendre une œuvre', href: '/articles/comprendre-une-oeuvre' },
                        { label: article.title },
                    ]}
                    primaryCta={{
                        href: '#analyse-4-etapes',
                        label: 'Commencer la lecture guidée',
                    }}
                    secondaryCta={{
                        href: '#video',
                        label: 'Voir la vidéo',
                    }}
                />

                {/* Bannière “Plan de l’analyse” */}
                {totalSections > 0 && <ArticlePlanBanner totalSections={totalSections} onOpen={openOutline} />}

                {/* 🧱 Builder universel */}
                {article.sections && article.sections.length > 0 && <ArticleSections sections={article.sections} />}

                {/* Articles liés */}
                {relatedPosts.length > 0 && (
                    <ArticleRelatedGrid
                        pillar={pillarCfg}
                        posts={relatedPosts}
                        hrefBase="/articles/comprendre-une-oeuvre"
                        title="Continuer à entraîner ton regard"
                        description="D’autres analyses douces pour apprendre à lire les œuvres sans jargon ni pression."
                    />
                )}

                {/* Commentaires */}
                <ArticleComments articleSlug={article.slug} articleTitle={article.title} />
            </article>

            {/* Overlay plein écran du drawer */}
            {isOutlineOpen && <div className="fixed inset-0 z-50 m-0 bg-black/30 backdrop-blur-sm" onClick={closeOutline} aria-label="Fermer le plan de l’analyse" />}

            <ArticleOutlineHandle isOpen={isOutlineOpen} onToggle={toggleOutline} />

            <ArticleOutlineDrawer isOpen={isOutlineOpen} items={outlineItems} onSelect={handleSelect} onClose={closeOutline} />
        </>
    );
}
