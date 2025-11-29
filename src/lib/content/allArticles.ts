// src/lib/content/allArticles.ts
import type { CategoryPost, PillarSlug } from '@/components/categories/category-data';
import { ALL_ARTICLE_DATA } from './articleRegistry';
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
        pillar: pillarKeyToSlug[article.pillar],
        pillarSlug: pillarKeyToSlug[article.pillar],
        subcategory: article.subcategory,
        publishedAt: article.publishedAt,
    };
}

export const ALL_ARTICLES: CategoryPost[] = ALL_ARTICLE_DATA.map(mapArticleToCategoryPost);
