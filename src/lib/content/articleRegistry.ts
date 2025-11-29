// src/lib/content/articleRegistry.ts
import type { Article, ArticleFormat } from '@/types/article';
import { TUTORIALS } from './tutorials';
import { ANALYSES } from './analyse-oeuvres';
import { ARTIST_STORIES } from './histoires-d-artistes';
import { ART_HISTORY_ARTICLES } from './histoire-art';
import { COLOR_GUIDES } from './couleurs-harmonie';
import { INSPIRATION_ARTICLES } from './inspirations';
import { ART_PSYCHOLOGY_ARTICLES } from './psychologie-art';

const ARTICLE_ORDER: ArticleFormat[] = ['tutorial', 'artwork-analysis', 'artist-story', 'art-history', 'color-guide', 'art-psychology', 'inspiration'];

export const ARTICLE_COLLECTIONS: Record<ArticleFormat, Article[]> = {
    tutorial: TUTORIALS,
    'artwork-analysis': ANALYSES,
    'artist-story': ARTIST_STORIES,
    'art-history': ART_HISTORY_ARTICLES,
    'color-guide': COLOR_GUIDES,
    'art-psychology': ART_PSYCHOLOGY_ARTICLES,
    inspiration: INSPIRATION_ARTICLES,
};

function dedupeArticles(articles: Article[]): Article[] {
    const seen = new Set<string>();

    return articles.filter((article) => {
        if (seen.has(article.slug)) return false;
        seen.add(article.slug);
        return true;
    });
}

const orderedArticles = ARTICLE_ORDER.flatMap((format) => ARTICLE_COLLECTIONS[format]);

export const ALL_ARTICLE_DATA: Article[] = dedupeArticles(orderedArticles);

export function findArticleBySlug(slug: string) {
    return ALL_ARTICLE_DATA.find((article) => article.slug === slug);
}

export function getArticlesByFormat(format: ArticleFormat) {
    return ARTICLE_COLLECTIONS[format] ?? [];
}
