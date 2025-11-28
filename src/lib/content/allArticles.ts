// src/lib/content/allArticles.ts
import type { CategoryPost, PillarSlug } from '@/components/categories/category-data';
import { TUTORIALS } from './tutorials';
import { ARTICLES } from './articles';
import { ANALYSES } from './analyse-oeuvres';
import { ARTIST_STORIES } from './histoires-d-artistes';
import { ART_HISTORY_ARTICLES } from './histoire-art';
import { COLOR_GUIDES } from './couleurs-harmonie';
import { INSPIRATION_ARTICLES } from './inspirations';
import { ART_PSYCHOLOGY_ARTICLES } from './psychologie-art'; // 🆕
import type { Article, PillarKey } from '@/types/article';

const pillarKeyToSlug: Record<PillarKey, PillarSlug> = {
    'dessin-peinture': 'dessin-peinture',
    'comprendre-une-oeuvre': 'comprendre-une-oeuvre',
    'histoires-d-artistes': 'histoires-d-artistes',
    'histoire-de-l-art': 'histoire-de-l-art',
    'couleurs-harmonie': 'couleurs-harmonie',
    inspirations: 'inspirations',
    'psychologie-de-l-art': 'psychologie-de-l-art',
};

function mapArticleToCategoryPost(article: Article): CategoryPost {
    return {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        level: article.level,
        format: article.format,
        readingTime: article.readingTime,
        coverImage: article.coverImage,
        pillarSlug: pillarKeyToSlug[article.pillar],
        subcategory: article.subcategory,
        publishedAt: article.publishedAt,
    };
}

export const ALL_ARTICLES: CategoryPost[] = [
    // Tutoriels
    ...TUTORIALS.map((tuto) => ({
        slug: tuto.slug,
        title: tuto.title,
        excerpt: tuto.excerpt,
        level: tuto.level,
        format: tuto.format,
        readingTime: tuto.readingTime,
        coverImage: tuto.coverImage,
        pillarSlug: pillarKeyToSlug[tuto.pillar],
        subcategory: tuto.subcategory,
        publishedAt: tuto.publishedAt,
    })),

    // Articles “généraux”
    ...ARTICLES.map(mapArticleToCategoryPost),

    // Analyses d’œuvres
    ...ANALYSES.map(mapArticleToCategoryPost),

    // Histoires d’artistes
    ...ARTIST_STORIES.map(mapArticleToCategoryPost),

    // Histoire de l’art
    ...ART_HISTORY_ARTICLES.map(mapArticleToCategoryPost),

    // Guides couleur
    ...COLOR_GUIDES.map(mapArticleToCategoryPost),

    // Inspirations
    ...INSPIRATION_ARTICLES.map(mapArticleToCategoryPost),

    // 🆕 Psychologie de l’art
    ...ART_PSYCHOLOGY_ARTICLES.map(mapArticleToCategoryPost),
];
