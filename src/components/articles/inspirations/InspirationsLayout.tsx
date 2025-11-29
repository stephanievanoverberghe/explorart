// src/components/articles/inspirations/InspirationsLayout.tsx
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

export function InspirationsLayout({ article }: Props) {
    const { outlineItems, totalSections, isOutlineOpen, openOutline, closeOutline, toggleOutline, handleSelect } = useArticleOutline(article.sections);

    const pillarCfg = pillarConfig[article.pillar as PillarSlug];

    const relatedPosts: CategoryPost[] = useMemo(() => {
        const candidates = ALL_ARTICLES.filter((post) => {
            return post.slug !== article.slug && post.format === 'inspiration' && post.pillarSlug === article.pillar;
        });

        return candidates.slice(0, 3);
    }, [article.slug, article.pillar]);

    return (
        <>
            {/* 🟢 Barre de progression globale, collée sous le header */}
            <ArticleScrollProgress targetId="inspiration-article" />
            <article id="inspiration-article" className="space-y-8 md:space-y-10">
                <ArticleHero
                    title={article.title}
                    excerpt={article.excerpt}
                    pillar={article.pillar}
                    levelLabel={article.level === 'beginner' ? 'Débutant' : 'Intermédiaire'}
                    formatLabel="Inspirations"
                    hero={article.hero}
                    author={{
                        name: "L'alchimiste",
                        role: 'Fondatrice d’Explor’Art',
                        avatarSrc: '/images/auteurs/lalchimiste.jpeg',
                    }}
                    meta={['⏱️ 4–7 min de lecture', '✨ Idées pour nourrir ton regard']}
                    publishedAt={article.publishedAt}
                    readingTime={article.readingTime}
                    breadcrumb={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Articles', href: '/articles' },
                        { label: 'Inspirations', href: '/articles/inspirations' },
                        { label: article.title },
                    ]}
                    primaryCta={{
                        href: '#intro',
                        label: 'Commencer la lecture',
                    }}
                    secondaryCta={{
                        href: '#mini-exercice',
                        label: 'Voir le mini-exercice',
                    }}
                />

                {totalSections > 0 && <ArticlePlanBanner totalSections={totalSections} onOpen={openOutline} />}

                {article.sections && article.sections.length > 0 && <ArticleSections sections={article.sections} />}

                {relatedPosts.length > 0 && (
                    <ArticleRelatedGrid
                        pillar={pillarCfg}
                        posts={relatedPosts}
                        hrefBase="/articles/inspirations"
                        title="Continuer à nourrir ton regard"
                        description="D’autres inspirations douces pour te donner des idées sans pression de résultat."
                    />
                )}

                <ArticleComments articleSlug={article.slug} articleTitle={article.title} />
            </article>

            {isOutlineOpen && <div className="fixed inset-0 z-50 m-0 bg-black/30 backdrop-blur-sm" onClick={closeOutline} aria-label="Fermer le plan de l’article" />}

            <ArticleOutlineHandle isOpen={isOutlineOpen} onToggle={toggleOutline} />

            <ArticleOutlineDrawer isOpen={isOutlineOpen} items={outlineItems} onSelect={handleSelect} onClose={closeOutline} />
        </>
    );
}
