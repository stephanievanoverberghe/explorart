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

interface Props {
    tutorial: Tutorial;
}

export function TutorialLayout({ tutorial }: Props) {
    const [isOutlineOpen, setIsOutlineOpen] = useState(false);

    // ✅ Outline basé sur la structure officielle
    const outlineItems = useMemo(
        () =>
            tutorial.sections.map((section) => ({
                id: section.anchorId,
                label: section.label,
            })),
        [tutorial.sections]
    );

    const totalSections = outlineItems.length;
    // 🟢 config pilier à partir du tuto
    const pillarCfg = pillarConfig[tutorial.pillar as PillarSlug];

    // 🔒 Bloquer le scroll derrière quand le drawer est ouvert (comme avant)
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
        const offset = 80; // ajuste selon ta navbar
        const target = Math.max(absoluteTop - offset, 0);

        window.scrollTo({ top: target, behavior: 'smooth' });
    }, []);

    const handleClickItem = (id: string) => {
        scrollToSection(id);
        setIsOutlineOpen(false);
    };

    return (
        <>
            {/* 🔹 Hero : on ne le touche pas */}
            <article className="space-y-8 md:space-y-10">
                <ArticleHero
                    title={tutorial.title}
                    excerpt={tutorial.excerpt}
                    pillar={tutorial.pillar}
                    levelLabel={tutorial.level === 'beginner' ? 'Débutant' : 'Intermédiaire'}
                    formatLabel="Tutoriel guidé"
                    hero={tutorial.hero}
                    meta={['⏱️ 20–30 min de pratique douce', '✏️ 3 exercices progressifs']}
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
                        href: '#video',
                        label: 'Voir la vidéo',
                    }}
                />

                {/* Banner plan : pareil qu’avant */}
                <TutorialPlanBanner totalSections={totalSections} onOpen={() => setIsOutlineOpen(true)} />

                {/* ✅ Contenu structuré par grandes sections */}
                <TutorialSections sections={tutorial.sections} />

                {/* 🆕 Articles liés sous le tutoriel */}
                {tutorial.relatedPosts && tutorial.relatedPosts.length > 0 && (
                    <ArticleRelatedGrid pillar={pillarCfg} posts={tutorial.relatedPosts} hrefBase="/articles/tutoriels" />
                )}
            </article>

            {/* Overlay plein écran */}
            {isOutlineOpen && (
                <div className="fixed inset-0 z-50 m-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOutlineOpen(false)} aria-label="Fermer le plan du tutoriel" />
            )}

            <TutorialOutlineHandle isOpen={isOutlineOpen} onToggle={() => setIsOutlineOpen((o) => !o)} />

            {/* 🔹 Sidebar / drawer : même composant, mais items fondés sur les sections */}
            <TutorialOutlineDrawer isOpen={isOutlineOpen} items={outlineItems} onSelect={handleClickItem} onClose={() => setIsOutlineOpen(false)} />
        </>
    );
}
