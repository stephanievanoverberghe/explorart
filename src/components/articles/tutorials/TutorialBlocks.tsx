// src/components/articles/tutorials/TutorialBlocks.tsx

'use client';

import type { TutorialSection } from '@/types/tutorial';
import { ArticleSections } from '@/components/articles/common/ArticleSections';

type SectionsProps = {
    sections: TutorialSection[];
};

/**
 * Wrapper spécifique tutoriels
 * → réutilise le builder générique ArticleSections
 */
export function TutorialSections({ sections }: SectionsProps) {
    // On délègue tout le rendu des blocs au builder universel
    return <ArticleSections sections={sections} />;
}
