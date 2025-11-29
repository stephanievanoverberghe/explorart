// src/components/articles/tutorials/TutorialLayout.tsx
'use client';

import { useMemo } from 'react';
import type { Tutorial, TutorialRelatedPost } from '@/types/tutorial';
import type { PillarSlug } from '@/components/categories/category-data';

import { pillarConfig } from '@/components/categories/category-data';
import { ArticleHero } from '@/components/articles/common/ArticleHero';
import { ArticleRelatedGrid } from '@/components/articles/common/ArticleRelatedGrid';
import { ArticleSections } from '@/components/articles/common/ArticleSections';
import { ArticleComments } from '@/components/articles/common/ArticleComments';

import { ArticlePlanBanner } from '../common/ArticlePlanBanner';
import { ArticleOutlineHandle } from '../common/ArticleOutlineHandle';
import { ArticleOutlineDrawer } from '../common/ArticleOutlineDrawer';
import { ArticleScrollProgress } from '../common/ArticleScrollProgress';
import { useArticleOutline } from '../common/useArticleOutline';

import { ALL_ARTICLES } from '@/lib/content/allArticles';

interface Props {
    tutorial: Tutorial;
}

export function TutorialLayout({ tutorial }: Props) {
    const { outlineItems, totalSections, isOutlineOpen, openOutline, closeOutline, toggleOutline, handleSelect } = useArticleOutline(tutorial.sections);

    const pillarCfg = pillarConfig[tutorial.pillar as PillarSlug];

    const relatedPosts: TutorialRelatedPost[] = useMemo(() => {
        const candidates = ALL_ARTICLES.filter((post) => {
            return post.slug !== tutorial.slug && post.format === 'tutorial' && post.pillarSlug === tutorial.pillar;
        });

        return candidates.slice(0, 3).map<TutorialRelatedPost>((post) => ({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            coverImage: post.coverImage,
            level: post.level,
            format: post.format,
            subcategory: post.subcategory,
            readingTime: post.readingTime,
            publishedAt: post.publishedAt,
        }));
    }, [tutorial.slug, tutorial.pillar]);

    return (
        <>
            {/* 🟢 Barre de progression globale, collée sous le header */}
            <ArticleScrollProgress targetId="tutorial-article" />

            <article id="tutorial-article" className="space-y-8 md:space-y-10">
                <ArticleHero
                    title={tutorial.title}
                    excerpt={tutorial.excerpt}
                    pillar={tutorial.pillar}
                    levelLabel={tutorial.level === 'beginner' ? 'Débutant' : 'Intermédiaire'}
                    formatLabel="Tutoriel guidé"
                    author={{
                        name: "L'alchimiste",
                        role: 'Fondatrice d’Explor’Art',
                        avatarSrc: '/images/auteurs/lalchimiste.jpeg',
                    }}
                    hero={tutorial.hero}
                    meta={['⏱️ 20–30 min de pratique douce', '✏️ 3 exercices progressifs']}
                    publishedAt={tutorial.publishedAt}
                    readingTime={tutorial.readingTime}
                    breadcrumb={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Articles', href: '/articles' },
                        { label: 'Tutoriels', href: '/articles/tutoriels' },
                        { label: tutorial.title },
                    ]}
                    primaryCta={{
                        href: '#exercice-1',
                        label: 'Commencer les exercices',
                    }}
                    secondaryCta={{
                        href: '#video-tutoriel',
                        label: 'Voir la vidéo',
                    }}
                />

                <ArticlePlanBanner totalSections={totalSections} onOpen={openOutline} />

                {tutorial.sections && tutorial.sections.length > 0 && <ArticleSections sections={tutorial.sections} />}

                {relatedPosts.length > 0 && (
                    <ArticleRelatedGrid
                        pillar={pillarCfg}
                        posts={relatedPosts}
                        hrefBase="/articles/tutoriels"
                        title="Continuer avec d’autres gestes doux"
                        description="Quelques tutoriels dans le même univers pour prolonger ce que tu viens de travailler."
                    />
                )}

                <ArticleComments articleSlug={tutorial.slug} articleTitle={tutorial.title} />
            </article>

            {isOutlineOpen && <div className="fixed inset-0 z-50 m-0 bg-black/30 backdrop-blur-sm" onClick={closeOutline} aria-label="Fermer le plan du tutoriel" />}

            <ArticleOutlineHandle isOpen={isOutlineOpen} onToggle={toggleOutline} />
            <ArticleOutlineDrawer isOpen={isOutlineOpen} items={outlineItems} onSelect={handleSelect} onClose={closeOutline} />
        </>
    );
}
