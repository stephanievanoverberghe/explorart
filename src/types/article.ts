// src/types/article.ts
import type { PostFormat, SubcategorySlug, Level as CategoryLevel } from '@/components/categories/category-data';

export type ArticleLevel = CategoryLevel;

export type PillarKey = 'dessin-peinture' | 'comprendre-une-oeuvre' | 'histoires-artistes' | 'histoire-art' | 'couleurs-harmonie' | 'inspirations' | 'psychologie-art';

// Tous les formats d’articles
export type ArticleFormat =
    | 'tutorial' // Tutoriel pas à pas
    | 'artwork-analysis' // Analyse d’œuvre
    | 'artist-story' // Histoire d’artiste
    | 'art-history' // Histoire de l’art
    | 'color-guide' // Guide des couleurs
    | 'art-psychology' // Psychologie de l’art
    | 'inspiration' // Inspirations, mood, coups de cœur
    | 'three-things-to-know' // 3 choses à savoir
    | 'exercise'; // Exercice du jour

export interface Article {
    slug: string;
    title: string;
    excerpt: string;

    level: ArticleLevel; // 'beginner' | 'intermediate'
    format: PostFormat; // 'tutorial' | 'artwork-analysis' | etc.

    // 🟢 meta nécessaires pour ALL_ARTICLES
    coverImage: string; // visuel de card
    pillar: PillarKey; // clé “piliers” côté contenu
    subcategory: SubcategorySlug; // sous-univers
    content: string; // markdown
    readingTime: string;
    publishedAt?: string;
}
