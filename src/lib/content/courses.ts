// src/lib/content/courses.ts
import type { Level, PillarSlug } from '@/components/categories/category-data';

export type DurationLabel = 'short' | 'medium' | 'long';

export interface Course {
    slug: string;
    title: string;
    tagline: string;
    level: Level;
    pillarSlug: PillarSlug;
    pillarLabel: string;
    coverImage: string;
    durationMinutes: number;
    durationLabel: DurationLabel;
    modulesCount: number; // ici 3 pour tous les cours
    hasIntro: boolean;
    hasConclusion: boolean;
    priceEUR: number;
    isMini: boolean; // true = gratuit / spécial
}

export const COURSES: Course[] = [
    {
        slug: 'oser-reprendre-le-crayon',
        title: 'Oser reprendre le crayon en douceur',
        tagline: 'Un premier cours pour remettre ta main en mouvement sans te juger.',
        level: 'beginner',
        pillarSlug: 'dessin-peinture',
        pillarLabel: 'Dessiner & Peindre',
        coverImage: '/images/cours/oser-reprendre-le-crayon.png',
        durationMinutes: 60,
        durationLabel: 'medium',
        modulesCount: 3,
        hasIntro: true,
        hasConclusion: true,
        priceEUR: 27,
        isMini: false,
    },
    {
        slug: 'lire-une-image-pas-a-pas',
        title: 'Lire une image sans se sentir bête',
        tagline: 'Un petit parcours pour apprivoiser ton regard et tes premières analyses.',
        level: 'beginner',
        pillarSlug: 'comprendre-une-oeuvre',
        pillarLabel: 'Comprendre une œuvre',
        coverImage: '/images/cours/lire-une-image.png',
        durationMinutes: 50,
        durationLabel: 'medium',
        modulesCount: 3,
        hasIntro: true,
        hasConclusion: true,
        priceEUR: 24,
        isMini: false,
    },
    {
        slug: 'couleurs-et-emotions',
        title: 'Couleurs & émotions pour débuter',
        tagline: 'Créer ton premier nuancier sensible et comprendre ce que les couleurs réveillent en toi.',
        level: 'beginner',
        pillarSlug: 'couleurs-harmonie',
        pillarLabel: 'Couleurs & harmonie',
        coverImage: '/images/cours/couleurs-et-emotions.png',
        durationMinutes: 45,
        durationLabel: 'short',
        modulesCount: 3,
        hasIntro: true,
        hasConclusion: true,
        priceEUR: 21,
        isMini: false,
    },
    {
        slug: 'carnet-inspirations-quotidiennes',
        title: 'Ton carnet d’inspirations quotidiennes',
        tagline: 'Installer un petit rituel visuel pour nourrir ton regard chaque semaine.',
        level: 'intermediate',
        pillarSlug: 'inspirations',
        pillarLabel: 'Inspirations',
        coverImage: '/images/cours/carnet-inspirations.png',
        durationMinutes: 75,
        durationLabel: 'long',
        modulesCount: 3,
        hasIntro: true,
        hasConclusion: true,
        priceEUR: 39,
        isMini: false,
    },
    {
        slug: 'blocages-et-peur-de-la-feuille-blanche',
        title: 'Apaiser la peur de la feuille blanche',
        tagline: 'Un cours psychologique & pratique pour apprivoiser les blocages créatifs.',
        level: 'intermediate',
        pillarSlug: 'psychologie-de-l-art',
        pillarLabel: "Psychologie de l'art",
        coverImage: '/images/cours/peur-feuille-blanche.png',
        durationMinutes: 80,
        durationLabel: 'long',
        modulesCount: 3,
        hasIntro: true,
        hasConclusion: true,
        priceEUR: 44,
        isMini: false,
    },
    {
        slug: 'mini-parcours-commencer-ici',
        title: 'Commencer ici : mini-parcours offert',
        tagline: 'Une mini-formation guidée pour réveiller ton geste, ton regard et tes couleurs.',
        level: 'beginner',
        pillarSlug: 'dessin-peinture',
        pillarLabel: 'Mini-formation',
        coverImage: '/images/cours/commencer-ici-cover.png',
        durationMinutes: 40,
        durationLabel: 'short',
        modulesCount: 3,
        hasIntro: true,
        hasConclusion: true,
        priceEUR: 0,
        isMini: true,
    },
];
