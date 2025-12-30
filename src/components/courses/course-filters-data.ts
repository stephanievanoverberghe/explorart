// src/components/courses/course-filters-data.ts
import type { PillarSlug } from '@/components/categories/category-data';
import type { DurationLabel } from '@/lib/data/courses';

export const levelOptions: { value: 'all' | 'beginner' | 'intermediate'; label: string }[] = [
    { value: 'all', label: 'Tous les niveaux' },
    { value: 'beginner', label: 'Débutant' },
    { value: 'intermediate', label: 'Intermédiaire' },
];

export const durationOptions: { value: 'all' | DurationLabel; label: string }[] = [
    { value: 'all', label: 'Toutes les durées' },
    { value: 'short', label: '≈ 30 min' },
    { value: 'medium', label: '≈ 45–60 min' },
    { value: 'long', label: '≈ 60–90 min' },
];

export const pillarFilters: { value: 'all' | PillarSlug; label: string; dotClass?: string }[] = [
    { value: 'all', label: 'Tous les univers' },
    { value: 'dessin-peinture', label: 'Dessiner & Peindre', dotClass: 'bg-vert' },
    { value: 'comprendre-une-oeuvre', label: 'Comprendre une œuvre', dotClass: 'bg-bleu' },
    { value: 'histoires-d-artistes', label: 'Histoires d’artistes', dotClass: 'bg-terre' },
    { value: 'histoire-de-l-art', label: "Histoire de l'art", dotClass: 'bg-ocre' },
    { value: 'couleurs-harmonie', label: 'Couleurs & harmonie', dotClass: 'bg-sage' },
    { value: 'inspirations', label: 'Inspirations', dotClass: 'bg-rose' },
    { value: 'psychologie-de-l-art', label: "Psychologie de l'art", dotClass: 'bg-prune' },
];
