import type { CategoryPost, PillarSlug } from '@/components/categories/category-data';
import { TUTORIALS } from './tutorials';
import { ARTICLES } from './articles';
import type { Article, PillarKey } from '@/types/article';

const pillarKeyToSlug: Record<PillarKey, PillarSlug> = {
    'dessin-peinture': 'dessin-peinture',
    'comprendre-une-oeuvre': 'analyse-d-oeuvre',
    'histoires-artistes': 'histoires-d-artistes',
    'histoire-art': 'histoire-de-l-art',
    'couleurs-harmonie': 'couleurs-harmonie',
    inspirations: 'inspirations',
    'psychologie-art': 'psychologie-de-l-art',
};

function mapArticleToCategoryPost(article: Article): CategoryPost {
    return {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        level: article.level,
        format: article.format,
        readingTime: `${article.readingTime ?? 8} min`,
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

    // Autres formats
    ...ARTICLES.map(mapArticleToCategoryPost),
];
