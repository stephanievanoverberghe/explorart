// src/components/articles/tutorials/TutorialLayout.tsx
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Tutorial, TutorialRelatedPost } from '@/types/tutorial';
import type { PillarSlug } from '@/components/categories/category-data';

import { pillarConfig } from '@/components/categories/category-data';
import { ArticleHero } from '@/components/articles/common/ArticleHero';
import { ArticleRelatedGrid } from '@/components/articles/common/ArticleRelatedGrid';
import { ArticleSections } from '@/components/articles/common/ArticleSections';
import { ArticleComments } from '@/components/articles/common/ArticleComments';

// Si tu as déjà déplacé ces composants en "common" mais gardé le préfixe Tutorial :
import { ArticlePlanBanner } from '../common/ArticlePlanBanner';
import { ArticleOutlineHandle } from '../common/ArticleOutlineHandle';
import { ArticleOutlineDrawer } from '../common/ArticleOutlineDrawer';

import { ALL_ARTICLES } from '@/lib/content/allArticles';

interface Props {
    tutorial: Tutorial;
}

export function TutorialLayout({ tutorial }: Props) {
    const [isOutlineOpen, setIsOutlineOpen] = useState(false);

    // Items pour le plan / outline
    const outlineItems = useMemo(
        () =>
            tutorial.sections.map((section) => ({
                id: section.anchorId,
                label: section.label,
            })),
        [tutorial.sections]
    );

    const totalSections = outlineItems.length;

    // 🎨 Config de pilier (couleurs, label, etc.)
    const pillarCfg = pillarConfig[tutorial.pillar as PillarSlug];

    // 🧩 Suggestions d’articles liés (même pilier, même format, slug différent)
    const relatedPosts: TutorialRelatedPost[] = useMemo(() => {
        const candidates = ALL_ARTICLES.filter((post) => {
            return (
                post.slug !== tutorial.slug &&
                post.format === 'tutorial' &&
                // selon ton ALL_ARTICLES : adapte si c'est `post.pillar` ou `post.pillarSlug`
                post.pillarSlug === tutorial.pillar
            );
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

    // 🔒 scroll body lock quand le drawer est ouvert
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
            <article className="space-y-8 md:space-y-10">
                <ArticleHero
                    title={tutorial.title}
                    excerpt={tutorial.excerpt}
                    pillar={tutorial.pillar}
                    levelLabel={tutorial.level === 'beginner' ? 'Débutant' : 'Intermédiaire'}
                    formatLabel="Tutoriel guidé"
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

                {/* Bannière “Plan du tutoriel” en haut du contenu */}
                <ArticlePlanBanner totalSections={totalSections} onOpen={() => setIsOutlineOpen(true)} />

                {/* 🧱 Builder universel : on lui passe directement les sections du tuto */}
                {tutorial.sections && tutorial.sections.length > 0 && <ArticleSections sections={tutorial.sections} />}

                {/* 🆕 bloc “Articles liés” */}
                {relatedPosts.length > 0 && (
                    <ArticleRelatedGrid
                        pillar={pillarCfg}
                        posts={relatedPosts}
                        hrefBase="/articles/tutoriels"
                        title="Continuer avec d’autres gestes doux"
                        description="Quelques tutoriels dans le même univers pour prolonger ce que tu viens de travailler."
                    />
                )}

                {/* 🆕 Section commentaires (toujours affichée, même s’il n’y a pas d’articles liés) */}
                <ArticleComments articleSlug={tutorial.slug} articleTitle={tutorial.title} />
            </article>

            {/* Overlay plein écran du drawer */}
            {isOutlineOpen && (
                <div className="fixed inset-0 z-50 m-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOutlineOpen(false)} aria-label="Fermer le plan du tutoriel" />
            )}

            <ArticleOutlineHandle isOpen={isOutlineOpen} onToggle={() => setIsOutlineOpen((o) => !o)} />

            <ArticleOutlineDrawer isOpen={isOutlineOpen} items={outlineItems} onSelect={handleClickItem} onClose={() => setIsOutlineOpen(false)} />
        </>
    );
}
