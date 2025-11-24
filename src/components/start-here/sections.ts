// src/components/start-here/sections.ts
export type SectionId = 'intro' | 'etape-1' | 'etape-2' | 'etape-3' | 'conclusion';

export type Section = {
    id: SectionId;
    label: string;
    title: string;
    type: string;
    duration: string;
    colorDotClass: string;
};

export const sections: Section[] = [
    {
        id: 'intro',
        label: 'Introduction',
        title: 'Avant de commencer : poser les bases en douceur',
        type: 'Introduction',
        duration: '3–5 min',
        colorDotClass: 'bg-sage',
    },
    {
        id: 'etape-1',
        label: 'Étape 1',
        title: 'Ton premier dessin simple et décomplexé',
        type: 'Tutoriel',
        duration: '~ 10 min',
        colorDotClass: 'bg-vert',
    },
    {
        id: 'etape-2',
        label: 'Étape 2',
        title: 'Lire une image en 3 questions',
        type: 'Analyse d’œuvre',
        duration: '~ 8 min',
        colorDotClass: 'bg-bleu',
    },
    {
        id: 'etape-3',
        label: 'Étape 3',
        title: 'Pourquoi certaines couleurs apaisent ?',
        type: 'Couleurs & émotions',
        duration: '~ 7 min',
        colorDotClass: 'bg-rose',
    },
    {
        id: 'conclusion',
        label: 'Conclusion',
        title: 'Et maintenant, comment continuer ton chemin avec l’art',
        type: 'Conclusion',
        duration: '4–6 min',
        colorDotClass: 'bg-terre',
    },
];
