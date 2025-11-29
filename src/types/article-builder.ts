// src/types/article-builder.ts

/**
 * 🌿 Universal Article Builder types
 *
 * Objectif :
 * - décrire la structure générique de TOUS les articles
 *   (tutoriels, analyses, portraits, etc.)
 * - sections → rows → colonnes → blocks[]
 * - blocks discriminés par `kind`
 *
 * ❗ Ce fichier NE dépend d’aucun autre type du projet,
 * il ne contient QUE de la structure de contenu.
 */

/* --------------------
 *  BASES
 * -------------------- */

export interface ArticleBlockBase {
    id: string;
    kind: string;
}

/**
 * Meta commune que tous les contenus peuvent réutiliser
 * (catalogue, cartes, ArticleHero…)
 *
 * Tu pourras l’étendre dans `Article`.
 */
export interface ArticleBuilderMeta {
    /** Date ISO string, ex: "2025-01-10" */
    publishedAt?: string;
    /** Temps de lecture affiché, ex: "8 min" ou "20–30 min" */
    readingTime: string;
}

/* --------------------
 *  BLOCS SIMPLES
 * -------------------- */

/** Texte riche en Markdown (titres H2/H3/H4 gérés côté MarkdownProse) */
export interface ArticleRichTextBlock extends ArticleBlockBase {
    kind: 'rich-text';
    /** Titre optionnel affiché au-dessus du markdown */
    title?: string;
    markdown: string;
}

/** Encart pédagogique / info / question / erreur douce */
export type ArticleCalloutTone = 'soft' | 'pedagogic' | 'error' | 'question';
export type ArticleCalloutSize = 'normal' | 'compact';

export interface ArticleCalloutBlock extends ArticleBlockBase {
    kind: 'encart';
    title?: string;
    markdown: string;
    tone?: ArticleCalloutTone;
    size?: ArticleCalloutSize;
}

/** Bloc exercice (réutilisable pour tutoriels + "exercice du jour") */
export interface ArticleExerciseMediaImage {
    type: 'image';
    src: string;
    alt: string;
}

export interface ArticleExerciseBlock extends ArticleBlockBase {
    kind: 'exercise';
    title: string;
    subtitle?: string;
    goalMarkdown?: string;
    steps: string[];
    variants?: string[];
    errors?: string[];
    media?: ArticleExerciseMediaImage;
}

/** Image pleine largeur / focus / soft / cadre simple */
export type ArticleImageEmphasis = 'hero' | 'focus' | 'soft' | 'frame';

export interface ArticleImageBlock extends ArticleBlockBase {
    kind: 'image';
    src: string;
    alt: string;
    caption?: string;
    /** Si true → on casse les marges de l’article (bandeau) */
    fullWidth?: boolean;
    emphasis?: ArticleImageEmphasis;
}

/** Vidéo YouTube/Vimeo avec cover + bouton play */
export interface ArticleVideoCover {
    src: string;
    alt?: string;
}

export interface ArticleVideoBlock extends ArticleBlockBase {
    kind: 'video';
    /** URL d’embed (YouTube, etc.) */
    url?: string;
    cover?: ArticleVideoCover;
    caption?: string;
}

/** Grille de ressources (PDF, fiches, palettes…) */
export interface ArticleResourcesGridItem {
    href: string;
    label: string;
    description: string;
    badge?: string;
}

export interface ArticleResourcesGridBlock extends ArticleBlockBase {
    kind: 'resources-grid';
    title?: string;
    items: ArticleResourcesGridItem[];
}

/** FAQ = accordéon typé “question / réponse” */
export interface ArticleFaqItem {
    question: string;
    answer: string;
}

export interface ArticleFaqBlock extends ArticleBlockBase {
    kind: 'faq';
    title?: string;
    items: ArticleFaqItem[];
}

/** Divider visuel (ligne, respiration) */
export interface ArticleDividerBlock extends ArticleBlockBase {
    kind: 'divider';
}

/**
 * Dropdown / accordéon plus générique
 * (autre chose qu’une FAQ, ex: "3 points clés")
 */
export interface ArticleDropdownItem {
    id: string;
    label: string;
    markdown: string;
}

export interface ArticleDropdownBlock extends ArticleBlockBase {
    kind: 'dropdown';
    title?: string;
    items: ArticleDropdownItem[];
}

/**
 * Onglets génériques (tabs) :
 * chaque tab contient des blocks.
 */
export interface ArticleTabsItem {
    id: string;
    label: string;
    blocks: ArticleSimpleBlock[];
}

export interface ArticleTabsBlock extends ArticleBlockBase {
    kind: 'tabs';
    title?: string;
    items: ArticleTabsItem[];
}

/**
 * Union de tous les "petits" blocks réutilisables
 * (sans mise en page multi-colonnes).
 */
export type ArticleSimpleBlock =
    | ArticleRichTextBlock
    | ArticleCalloutBlock
    | ArticleExerciseBlock
    | ArticleImageBlock
    | ArticleVideoBlock
    | ArticleResourcesGridBlock
    | ArticleFaqBlock
    | ArticleDividerBlock
    | ArticleDropdownBlock
    | ArticleTabsBlock;

/* --------------------
 *  BLOCS COMPLEXES
 * -------------------- */

/** 2 colonnes souples (balanced / sidebar…) */
export type ArticleTwoColumnsLayout = 'balanced' | 'sidebar-left' | 'sidebar-right';
export type ArticleTwoColumnsVariant = 'default' | 'section-card';

export interface ArticleHeroImage {
    src: string;
    alt: string;
    caption?: string;
}

/**
 * Bloc "two-cols" :
 * - left/right: piles de ArticleSimpleBlock
 * - option hero en bandeau dans la card
 */
export interface ArticleTwoColumnsBlock extends ArticleBlockBase {
    kind: 'two-cols';
    layout?: ArticleTwoColumnsLayout;
    variant?: ArticleTwoColumnsVariant;
    hero?: ArticleHeroImage;
    left: ArticleSimpleBlock[];
    right: ArticleSimpleBlock[];
}

/**
 * Bloc "section-card" : une card qui encapsule plusieurs blocks
 * (techniquement, c’est une mini-section autonome)
 */
export interface ArticleSectionCardBlock extends ArticleBlockBase {
    kind: 'section-card';
    blocks: ArticleBlock[];
}

/**
 * Groupe d’exercices sous forme d’onglets
 * (ce que tu utilises déjà pour "Les exercices guidés").
 */
export interface ArticleExercisesGroupItem {
    id: string;
    label: string;
    blocks: ArticleBlock[];
}

export interface ArticleExercisesGroupBlock extends ArticleBlockBase {
    kind: 'exercises-group';
    items: ArticleExercisesGroupItem[];
}

/**
 * Union de tous les blocs possibles dans un article.
 */
export type ArticleBlock = ArticleSimpleBlock | ArticleTwoColumnsBlock | ArticleSectionCardBlock | ArticleExercisesGroupBlock;

/* --------------------
 *  SECTION / ROW / COLUMN
 * -------------------- */

export interface ArticleColumn<B extends ArticleBlock = ArticleBlock> {
    id: string;
    blocks: B[];
}

export interface ArticleRow<B extends ArticleBlock = ArticleBlock> {
    id: string;
    columns: ArticleColumn<B>[];
    /** Optionnel : alignement vertical des colonnes (pour plus tard) */
    align?: 'top' | 'center' | 'stretch';
}

export type ArticleSectionVariant = 'default' | 'intro' | 'outro' | 'highlight' | 'compact';

export interface ArticleSection<B extends ArticleBlock = ArticleBlock> {
    id: string;
    /** Utilisé pour les ancres (#avant-de-commencer, etc.) */
    anchorId: string;
    /** Label affichable dans le plan / outline */
    label: string;
    /** Nouveau mode : layout via rows/columns */
    rows?: ArticleRow<B>[];
    /** Ancien mode : simple pile de blocks */
    blocks?: B[];
    /** Variante de style (utile pour plus tard côté UI) */
    variant?: ArticleSectionVariant;
}
