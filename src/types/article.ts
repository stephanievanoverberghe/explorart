// src/types/article.ts

export type ArticleLevel = 'beginner' | 'intermediate';

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
    level: ArticleLevel;
    format: ArticleFormat;
    pillar: PillarKey;
    content: string; // markdown
    readingTime?: number;
    publishedAt?: string;
}
