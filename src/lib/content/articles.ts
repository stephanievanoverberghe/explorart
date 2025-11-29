// src/lib/content/articles.ts
import type { Article, ArticleFormat } from '@/types/article';
import { ALL_ARTICLE_DATA, findArticleBySlug, getArticlesByFormat as getArticlesByFormatFromRegistry } from './articleRegistry';

export const ARTICLES: Article[] = ALL_ARTICLE_DATA;

export function getArticleBySlug(slug: string) {
    return findArticleBySlug(slug);
}

export function getArticlesByFormat(format: ArticleFormat) {
    return getArticlesByFormatFromRegistry(format);
}
