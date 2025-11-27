// src/types/article.ts

import type { PostFormat, SubcategorySlug, Level, PillarSlug } from '@/components/categories/category-data';

/* -------------------------------------------------------------------------- */
/*                                   META                                     */
/* -------------------------------------------------------------------------- */

export type ArticleLevel = Level;
export type PillarKey = PillarSlug;
export type ArticleFormat = PostFormat;

/* -------------------------------------------------------------------------- */
/*                                  BLOCKS                                    */
/* -------------------------------------------------------------------------- */

// 🔹 Blocs "simples"
export type ArticleSimpleBlock =
    | {
          kind: 'rich-text';
          id: string;
          title?: string;
          markdown: string;
      }
    | {
          kind: 'encart';
          id: string;
          tone?: 'pedagogic' | 'soft' | 'error' | 'question';
          title?: string;
          markdown: string;
          size?: 'normal' | 'compact';
      }
    | {
          kind: 'exercise';
          id: string;
          title: string;
          subtitle?: string;
          goalMarkdown?: string;
          steps: string[];
          variants?: string[];
          errors?: string[];
          media?: {
              type: 'image';
              src: string;
              alt: string;
          };
      }
    | {
          kind: 'image';
          id: string;
          src: string;
          alt: string;
          caption?: string;
          fullWidth?: boolean;
          emphasis?: 'hero' | 'focus' | 'soft' | 'plain';
      }
    | {
          kind: 'video';
          id: string;
          url?: string;
          caption?: string;
          cover?: {
              src: string;
              alt?: string;
          };
      }
    | {
          kind: 'resources-grid';
          id: string;
          title?: string;
          items: {
              label: string;
              description: string;
              href: string;
              badge?: string;
          }[];
      }
    | {
          kind: 'faq';
          id: string;
          title?: string;
          items: {
              question: string;
              answer: string;
          }[];
      }
    | {
          // ✅ pour tes séparateurs dans tutorials.ts
          kind: 'divider';
          id: string;
      };

// 🔹 Bloc 2 colonnes = groupement de blocs simples
export type ArticleTwoColsBlock = {
    kind: 'two-cols';
    id: string;
    hero?: {
        src: string;
        alt: string;
        caption?: string;
    };
    layout?: 'balanced' | 'sidebar-right' | 'sidebar-left';
    variant?: 'default' | 'section-card';
    left: ArticleSimpleBlock[];
    right: ArticleSimpleBlock[];
};

// 🔹 Bloc "section-card" : container qui wrap plusieurs blocs
export type ArticleSectionCardBlock = {
    kind: 'section-card';
    id: string;
    blocks: (ArticleSimpleBlock | ArticleTwoColsBlock)[];
};

// 🔹 Bloc "groupe d’exercices" avec tabs
export type ArticleExercisesGroupBlock = {
    kind: 'exercises-group';
    id: string;
    title?: string;
    items: {
        id: string;
        label: string;
        blocks: ArticleBlock[];
    }[];
};

export type ArticleBlock = ArticleSimpleBlock | ArticleTwoColsBlock | ArticleSectionCardBlock | ArticleExercisesGroupBlock;

/* -------------------------------------------------------------------------- */
/*                              LAYOUT BUILDER                                */
/* -------------------------------------------------------------------------- */

export interface ArticleRow {
    id: string;
    /** ex : pour plus tard si tu veux jouer sur la verticale */
    align?: 'top' | 'center' | 'stretch';
    /** Chaque ligne peut avoir 1 à 4 colonnes */
    columns: ArticleColumn[];
}

export interface ArticleColumn {
    id: string;
    /** Contenu de la colonne : les blocs (rich-text, encart, image…) */
    blocks: ArticleBlock[];
}

export interface ArticleSection {
    id: string;
    anchorId: string;
    label: string;

    // ✅ utilisé dans tutorials.ts : 'intro' | 'default' | 'outro'
    variant?: 'intro' | 'default' | 'outro';

    /** Mode “pile simple” */
    blocks?: ArticleBlock[];

    /** Mode “layout builder” : rows > columns > blocks */
    rows?: ArticleRow[];
}

/* -------------------------------------------------------------------------- */
/*                               ARTICLE GLOBAL                               */
/* -------------------------------------------------------------------------- */

export interface ArticleMeta {
    slug: string;
    title: string;
    excerpt: string;

    level: ArticleLevel;
    format: ArticleFormat;

    coverImage: string;
    pillar: PillarKey;
    subcategory: SubcategorySlug;
    readingTime: string;
    publishedAt?: string;
}

export interface ArticleHeroData {
    src: string;
    alt: string;
}

export interface Article extends ArticleMeta {
    hero?: ArticleHeroData;

    /**
     * Optionnel : certains anciens articles peuvent rester en markdown brut.
     * Le builder universel utilise plutôt `sections`.
     */
    content?: string;

    sections?: ArticleSection[];
}
