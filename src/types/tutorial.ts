// src/types/tutorial.ts

import type {
    Article,
    ArticleLevel,
    PillarKey,
    ArticleBlock,
    ArticleSimpleBlock,
    ArticleTwoColsBlock,
    ArticleSectionCardBlock,
    ArticleExercisesGroupBlock,
    ArticleSection,
    ArticleRow,
    ArticleColumn,
} from '@/types/article';
import type { PostFormat, SubcategorySlug, Level } from '@/components/categories/category-data';

// Métadonnées pour les cartes "articles liés"
export type TutorialRelatedPost = {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    level: Level;
    format: PostFormat;
    subcategory: SubcategorySlug;
    readingTime: string;
    publishedAt?: string;
};

// 🔹 Identifiants officiels des sections d’un tutoriel
export type TutorialSectionId =
    | 'intro'
    | 'before-start'
    | 'material-ritual'
    | 'video'
    | 'exercises'
    | 'exercise-1'
    | 'exercise-2'
    | 'exercise-3'
    | 'progress'
    | 'before-after'
    | 'resources'
    | 'faq'
    | 'conclusion'
    // ✅ ids que tu utilises en FR dans tutorials.ts
    | 'avant-de-commencer'
    | 'exercice-principal'
    | 'mini-exercices'
    | 'ressources';

// ---------------------------------------------------------------------------
// Aliases de types : un tutoriel réutilise le builder d’article universel
// ---------------------------------------------------------------------------

export type TutorialSimpleBlock = ArticleSimpleBlock;
export type TutorialTwoColsBlock = ArticleTwoColsBlock;
export type TutorialSectionCardBlock = ArticleSectionCardBlock;
export type TutorialExercisesGroupBlock = ArticleExercisesGroupBlock;
export type TutorialBlock = ArticleBlock;

export type TutorialRow = ArticleRow;
export type TutorialColumn = ArticleColumn;

// Section de tutoriel = section de builder + id fort typé
export interface TutorialSection extends ArticleSection {
    id: TutorialSectionId;
}

/**
 * Tutoriel complet.
 * C’est un Article “format tutorial” avec quelques méta et sections typées.
 */
export interface Tutorial extends Article {
    format: 'tutorial';
    level: ArticleLevel;
    pillar: PillarKey;
    subcategory: SubcategorySlug;

    sections: TutorialSection[];

    relatedPosts?: TutorialRelatedPost[];
}
