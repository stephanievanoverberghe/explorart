// src/lib/content/articles.ts
import type { Article } from '@/types/article';

export const ARTICLES: Article[] = [];

export function getArticleBySlug(slug: string) {
    return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByFormat(format: Article['format']) {
    return ARTICLES.filter((a) => a.format === format);
}
