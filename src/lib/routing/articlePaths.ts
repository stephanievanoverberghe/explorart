// src/lib/routing/articlePaths.ts
import type { CategoryPost, PillarSlug } from '@/components/categories/category-data';

// Map entre le pillarSlug et le segment de route "liste"
export const pillarSlugToArticlesPath: Record<PillarSlug, string> = {
    'dessin-peinture': 'tutoriels',
    'comprendre-une-oeuvre': 'comprendre-une-oeuvre',
    'histoires-d-artistes': 'histoires-d-artistes',
    'histoire-de-l-art': 'histoire-de-l-art',
    'couleurs-harmonie': 'couleurs-harmonie',
    inspirations: 'inspirations',
    'psychologie-de-l-art': 'psychologie-de-l-art',
};

// URL de la page liste d’un pilier
export function getArticlesListPath(pillarSlug: PillarSlug): string {
    return `/articles/${pillarSlugToArticlesPath[pillarSlug]}`;
}

// URL de la page détail d’un article
export function getArticleHref(post: CategoryPost): string {
    const base = pillarSlugToArticlesPath[post.pillarSlug];
    return `/articles/${base}/${post.slug}`;
}
