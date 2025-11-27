// src/components/articles/tutorials/TutorialLayout.tsx
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Tutorial } from '@/types/tutorial';
import { ArticleHero } from '@/components/articles/common/ArticleHero';
import { pillarConfig } from '@/components/categories/category-data';
import type { PillarSlug } from '@/components/categories/category-data';
import { ArticleRelatedGrid } from '@/components/articles/common/ArticleRelatedGrid';
import { TutorialPlanBanner } from './TutorialPlanBanner';
import { TutorialOutlineHandle } from './TutorialOutlineHandle';
import { TutorialOutlineDrawer } from './TutorialOutlineDrawer';
import { TutorialSections } from './TutorialBlocks';

import { ALL_ARTICLES } from '@/lib/content/allArticles';
import type { TutorialRelatedPost } from '@/types/tutorial';

interface Props {
    tutorial: Tutorial;
}

export function TutorialLayout({ tutorial }: Props) {
    const [isOutlineOpen, setIsOutlineOpen] = useState(false);

    const outlineItems = useMemo(
        () =>
            tutorial.sections.map((section) => ({
                id: section.anchorId,
                label: section.label,
            })),
        [tutorial.sections]
    );

    const totalSections = outlineItems.length;

    // 🟢 config pilier à partir du tuto (pour l’instant tes tutoriels sont en 'dessin-peinture')
    const pillarCfg = pillarConfig[tutorial.pillar as PillarSlug];

    // 🆕 Suggestions d’articles liés (même pilier, format tutoriel)
    const relatedPosts: TutorialRelatedPost[] = useMemo(() => {
        // pour l’instant, on reste simple : même pilier + même format, slug différent
        const candidates = ALL_ARTICLES.filter((post) => {
            return (
                post.slug !== tutorial.slug && post.format === 'tutorial' && post.pillarSlug === 'dessin-peinture' // tu pourras raffiner plus tard
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
        }));
    }, [tutorial.slug]);

    // 🔒 scroll body quand le drawer est ouvert
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

        window.scrollTo({ top: Math.max(absoluteTop - offset, 0), behavior: 'smooth' });
    }, []);

    const handleClickItem = (id: string) => {
        scrollToSection(id);
        setIsOutlineOpen(false);
    };

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

                <TutorialPlanBanner totalSections={totalSections} onOpen={() => setIsOutlineOpen(true)} />

                <TutorialSections sections={tutorial.sections} />

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
            </article>

            {/* Overlay plein écran */}
            {isOutlineOpen && (
                <div className="fixed inset-0 z-50 m-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOutlineOpen(false)} aria-label="Fermer le plan du tutoriel" />
            )}

            <TutorialOutlineHandle isOpen={isOutlineOpen} onToggle={() => setIsOutlineOpen((o) => !o)} />

            <TutorialOutlineDrawer isOpen={isOutlineOpen} items={outlineItems} onSelect={handleClickItem} onClose={() => setIsOutlineOpen(false)} />
        </>
    );
}
