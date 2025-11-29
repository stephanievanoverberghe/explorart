import type { ComponentType, SVGProps } from 'react';
import { BookOpen, Sparkles, Star, Download, User } from 'lucide-react';

export type AtelierTabId = 'overview' | 'favorites' | 'journeys' | 'downloads' | 'profile';

export interface AtelierTab {
    id: AtelierTabId;
    label: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const ATELIER_TABS: AtelierTab[] = [
    { id: 'overview', label: 'Vue d’ensemble', icon: Sparkles },
    { id: 'favorites', label: 'Favoris', icon: Star },
    { id: 'journeys', label: 'Parcours', icon: BookOpen },
    { id: 'downloads', label: 'Téléchargements', icon: Download },
    { id: 'profile', label: 'Profil & paramètres', icon: User },
];

export const mockLastReading = {
    title: 'Oser le premier trait : 3 exercices doux pour délier la main',
    href: '/articles/tutoriels/oser-le-premier-trait',
    pillar: 'Dessiner & Peindre',
    timeLeft: '~5 min restantes',
};

export const mockMiniFormation = {
    title: 'Mini-formation “Commencer ici”',
    href: '/commencer-ici',
    progress: 40, // % fictif
    currentStep: 'Module 2 · Apprivoiser la peur du premier trait',
};

export const mockPillarProgress = [
    {
        label: 'Dessiner & Peindre',
        colorClass: 'bg-vert',
        progress: 30,
        href: '/categories/dessin-peinture',
    },
    {
        label: 'Comprendre une œuvre',
        colorClass: 'bg-bleu',
        progress: 10,
        href: '/categories/comprendre-une-oeuvre',
    },
    {
        label: 'Histoires d’artistes',
        colorClass: 'bg-terre',
        progress: 20,
        href: '/categories/histoires-d-artistes',
    },
    {
        label: "Histoire de l'art",
        colorClass: 'bg-ocre',
        progress: 15,
        href: '/categories/histoire-de-l-art',
    },
    {
        label: 'Couleurs & harmonie',
        colorClass: 'bg-sage',
        progress: 5,
        href: '/categories/couleurs-harmonie',
    },
    {
        label: 'Inspirations',
        colorClass: 'bg-rose',
        progress: 25,
        href: '/categories/inspirations',
    },
    {
        label: "Psychologie de l'art",
        colorClass: 'bg-prune',
        progress: 12,
        href: '/categories/psychologie-de-l-art',
    },
];

export const mockFavorites = [
    {
        title: 'Apprivoiser la peur de se lancer',
        href: '/articles/psychologie-de-l-art/apprivoiser-la-peur-de-se-lancer',
        tag: 'Psychologie de l’art',
        pillarColorClass: 'bg-prune',
    },
    {
        title: 'Un rituel du regard du matin (5 minutes pour nourrir tes yeux)',
        href: '/articles/inspirations/rituel-du-regard-du-matin',
        tag: 'Inspirations',
        pillarColorClass: 'bg-rose',
    },
    {
        title: 'Les bases de la couleur sans jargon',
        href: '/articles/couleurs-harmonie/bases-couleur-sans-jargon',
        tag: 'Couleurs & harmonie',
        pillarColorClass: 'bg-sage',
    },
];
