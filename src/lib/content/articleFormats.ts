// src/lib/content/articleFormats.ts
import type { ArticleFormat } from '@/types/article';

export interface ArticleFormatConfig {
    key: ArticleFormat;
    pathSegment: string; // pour l’URL après /articles/
    label: string; // label humain
    description: string;
}

export const ARTICLE_FORMATS: ArticleFormatConfig[] = [
    {
        key: 'tutorial',
        pathSegment: 'tutoriels',
        label: 'Tutoriels',
        description: 'Pas à pas doux pour pratiquer le dessin et la peinture.',
    },
    {
        key: 'artwork-analysis',
        pathSegment: 'analyses-d-oeuvres',
        label: "Analyses d'œuvres",
        description: 'Comprendre une œuvre sans jargon, étape par étape.',
    },
    {
        key: 'artist-story',
        pathSegment: 'histoires-d-artistes',
        label: "Histoires d'artistes",
        description: 'Récits sensibles autour de parcours d’artistes.',
    },
    {
        key: 'art-history',
        pathSegment: 'histoire-de-l-art',
        label: "Histoire de l'art",
        description: 'Périodes, mouvements et contextes artistiques.',
    },
    {
        key: 'color-guide',
        pathSegment: 'guides-des-couleurs',
        label: 'Guides des couleurs',
        description: 'Symbolique, palettes et harmonies de couleurs.',
    },
    {
        key: 'art-psychology',
        pathSegment: 'psychologie-de-l-art',
        label: "Psychologie de l'art",
        description: 'Lien entre émotions, perception et création.',
    },
    {
        key: 'inspiration',
        pathSegment: 'inspirations',
        label: 'Inspirations',
        description: 'Idées, images et atmosphères pour nourrir ton regard.',
    },
    {
        key: 'three-things-to-know',
        pathSegment: '3-choses-a-savoir',
        label: '3 choses à savoir',
        description: 'Formats courts pour retenir l’essentiel.',
    },
    {
        key: 'exercise',
        pathSegment: 'exercices',
        label: 'Exercices du jour',
        description: 'Exercices rapides à tester dans ton carnet.',
    },
];

export const ARTICLE_FORMATS_BY_KEY: Record<ArticleFormat, ArticleFormatConfig> = ARTICLE_FORMATS.reduce((acc, f) => {
    acc[f.key] = f;
    return acc;
}, {} as Record<ArticleFormat, ArticleFormatConfig>);

export const ARTICLE_FORMATS_BY_PATH: Record<string, ArticleFormatConfig> = ARTICLE_FORMATS.reduce((acc, f) => {
    acc[f.pathSegment] = f;
    return acc;
}, {} as Record<string, ArticleFormatConfig>);

// helpers pratiques
export function getFormatConfigByKey(key: ArticleFormat) {
    return ARTICLE_FORMATS_BY_KEY[key];
}

export function getFormatConfigByPath(path: string) {
    return ARTICLE_FORMATS_BY_PATH[path];
}
