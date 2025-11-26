// src/types/tutorial.ts
import type { ArticleLevel, PillarKey } from '@/types/article';

// 🔹 Blocs "simples"
export type TutorialSimpleBlock =
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
          // 🆕 pour le style
          emphasis?: 'default' | 'soft' | 'focus' | 'hero';
      }
    | {
          kind: 'video';
          id: string;
          url: string; // iframe YouTube, Vimeo, etc.
          caption?: string;
          cover?: {
              src: string;
              alt: string;
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
          kind: 'exercises-tabs';
          id: string;
          items: {
              label: string;
              targetId: string;
          }[];
      };

// 🔹 Group d'exercices avec onglets
export type TutorialExercisesGroupBlock = {
    kind: 'exercises-group';
    id: string;
    items: {
        id: string; // ex: 'exercice-1', 'exercice-2', 'exercice-3'
        label: string; // libellé de l’onglet
        blocks: (TutorialSimpleBlock | TutorialTwoColsBlock)[];
    }[];
};

// 🔹 Bloc 2 colonnes = groupe de blocs simples
export type TutorialTwoColsBlock = {
    kind: 'two-cols';
    id: string;
    hero?: {
        src: string;
        alt: string;
        caption?: string;
    };
    layout?: 'balanced' | 'sidebar-right' | 'sidebar-left';
    variant?: 'default' | 'section-card';
    left: TutorialSimpleBlock[];
    right: TutorialSimpleBlock[];
};

// 🆕 Bloc "section-card" : container qui wrap plusieurs blocs
export type TutorialSectionCardBlock = {
    kind: 'section-card';
    id: string;
    blocks: (TutorialSimpleBlock | TutorialTwoColsBlock)[];
};

export type TutorialBlock = TutorialSimpleBlock | TutorialTwoColsBlock | TutorialSectionCardBlock | TutorialExercisesGroupBlock;

// 🔹 Les grandes sections officielles du tutoriel
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
    | 'conclusion';

export interface TutorialSection {
    /** Id logique (côté code) */
    id: TutorialSectionId;
    /** Id HTML pour le scroll / outline */
    anchorId: string;
    /** Label humain affiché dans le plan */
    label: string;
    /** Blocs qui composent cette section */
    blocks: TutorialBlock[];
}

export interface Tutorial {
    slug: string;
    title: string;
    excerpt: string;
    level: ArticleLevel;
    pillar: PillarKey;
    hero?: {
        src: string;
        alt: string;
    };
    sections: TutorialSection[];
}
