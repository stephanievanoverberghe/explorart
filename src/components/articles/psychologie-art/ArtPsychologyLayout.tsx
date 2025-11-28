// src/components/articles/psychologie-art/ArtPsychologyLayout.tsx
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

export function ArtPsychologyLayout({ article }: Props) {
    const [isOutlineOpen, setIsOutlineOpen] = useState(false);

    const outlineItems = useMemo(
        () =>
            (article.sections ?? []).map((section) => ({
                id: section.anchorId,
                label: section.label,
            })),
        [article.sections]
    );

    const totalSections = outlineItems.length;

    const pillarCfg = pillarConfig[article.pillar as PillarSlug];

    const relatedPosts: CategoryPost[] = useMemo(() => {
        const candidates = ALL_ARTICLES.filter((post) => {
            return post.slug !== article.slug && post.format === 'art-psychology' && post.pillarSlug === article.pillar;
        });

        return candidates.slice(0, 3);
    }, [article.slug, article.pillar]);

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
            <ArticleScrollProgress targetId="art-psychologie-article" />
            <article id="art-psychologie-article" className="space-y-8 md:space-y-10">
                <ArticleHero
                    title={article.title}
                    excerpt={article.excerpt}
                    pillar={article.pillar}
                    levelLabel={article.level === 'beginner' ? 'Débutant' : 'Intermédiaire'}
                    formatLabel="Psychologie de l’art"
                    author={{
                        name: "L'alchimiste",
                        role: 'Fondatrice d’Explor’Art',
                        avatarSrc: '/images/auteurs/lalchimiste.jpeg',
                    }}
                    hero={article.hero}
                    meta={['🧠 Comprendre ce qui se passe dedans', '💬 Apprendre à te parler avec douceur']}
                    publishedAt={article.publishedAt}
                    readingTime={article.readingTime}
                    breadcrumb={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Articles', href: '/articles' },
                        { label: 'Psychologie de l’art', href: '/articles/psychologie-de-l-art' },
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

                {totalSections > 0 && <ArticlePlanBanner totalSections={totalSections} onOpen={() => setIsOutlineOpen(true)} />}

                {article.sections && article.sections.length > 0 && <ArticleSections sections={article.sections} />}

                {relatedPosts.length > 0 && (
                    <ArticleRelatedGrid
                        pillar={pillarCfg}
                        posts={relatedPosts}
                        hrefBase="/articles/psychologie-de-l-art"
                        title="Explorer d’autres blocages en douceur"
                        description="D’autres articles pour apprivoiser tes peurs, ton exigence, et ton rapport à la création."
                    />
                )}

                <ArticleComments articleSlug={article.slug} articleTitle={article.title} />
            </article>

            {isOutlineOpen && (
                <div className="fixed inset-0 z-50 m-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOutlineOpen(false)} aria-label="Fermer le plan de l’article" />
            )}

            <ArticleOutlineHandle isOpen={isOutlineOpen} onToggle={() => setIsOutlineOpen((o) => !o)} />

            <ArticleOutlineDrawer isOpen={isOutlineOpen} items={outlineItems} onSelect={handleClickItem} onClose={() => setIsOutlineOpen(false)} />
        </>
    );
}
