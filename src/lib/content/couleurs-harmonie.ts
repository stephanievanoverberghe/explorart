// src/lib/content/couleurs-harmonie.ts
import type { Article } from '@/types/article';

/* -------------------------------------------------------------------------- */
/* 1) BASES DE LA COULEUR                                                     */
/* -------------------------------------------------------------------------- */

const basesCouleurSansJargon: Article = {
    slug: 'bases-couleur-sans-jargon',
    title: 'Les bases de la couleur sans jargon',
    excerpt: 'Valeurs, températures, contrastes : les repères essentiels pour comprendre la couleur sans roue chromatique compliquée ni théorie indigeste.',
    level: 'beginner',
    format: 'color-guide',
    pillar: 'couleurs-harmonie',
    subcategory: 'ch-bases-de-la-couleur',
    readingTime: '8 min',
    coverImage: '/images/articles/exemple-couleur-1.png',
    publishedAt: '2025-04-10',
    hero: {
        src: '/images/articles/exemple-couleur-1.png',
        alt: 'Nuancier simple avec différentes valeurs de couleur',
    },
    sections: [
        {
            id: 'intro',
            anchorId: 'intro',
            label: 'Introduction',
            variant: 'intro',
            blocks: [
                {
                    kind: 'rich-text',
                    id: 'intro-text',
                    markdown: `
La couleur peut vite sembler intimidante :  
roue chromatique, complémentarités, accords, termes techniques…  

Résultat : beaucoup de gens se sentent “nuls en couleur”.

Ce guide te propose un autre chemin :  
**3 bases simples** pour apprivoiser la couleur sans jargon :

- la **valeur** (clair / foncé),
- la **température** (chaud / froid),
- le **contraste** (fort / doux).

Avec ces trois repères, tu peux déjà :
- comprendre pourquoi une image “sonne faux”,
- calmer une palette trop agressive,
- donner du relief à ton dessin sans tout compliquer.
                    `.trim(),
                },
            ],
        },

        {
            id: 'valeur',
            anchorId: 'valeur',
            label: '1. La valeur : clair / foncé',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'valeur-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'valeur-text',
                            title: 'Avant la couleur, il y a le gris',
                            markdown: `
Si tu passes n’importe quelle image en **noir et blanc**, tu vois tout de suite si elle tient debout ou non.

La **valeur**, c’est simplement :
- à quel point une couleur est claire,
- à quel point elle est foncée.

Deux couleurs peuvent être très différentes en teinte (bleu / rouge)  
et pourtant très proches en valeur (toutes les deux moyennes).

### Pourquoi c’est important ?

Parce que :
- une image sans contraste de valeur sera “plate”,
- une image avec des valeurs bien posées sera lisible, même avec peu de couleurs.

> Astuce : plisser légèrement les yeux devant ton dessin.  
> Ce qui reste visible, ce sont surtout… les valeurs.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        {
            id: 'temperature',
            anchorId: 'temperature',
            label: '2. La température : chaud / froid',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'temperature-cols',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'temperature-text',
                            title: 'Les couleurs ont une “météo”',
                            markdown: `
On parle de couleurs **chaudes** et **froides**.

- Chaudes : rouges, orangés, jaunes → proches du feu, du soleil.  
- Froides : bleus, verts, certains violets → proches de l’eau, de l’ombre.

Cette idée est **relative** : un vert peut être plus chaud qu’un autre, un bleu plus froid qu’un violet, etc.

Ce qui compte, ce n’est pas d’avoir “bon”,  
mais de **sentir** la météo globale de ton image.
                            `.trim(),
                        },
                    ],
                    right: [
                        {
                            kind: 'encart',
                            id: 'temperature-encart',
                            tone: 'pedagogic',
                            size: 'compact',
                            title: 'Question simple à te poser',
                            markdown: `
Regarde ton dessin ou une image de référence et demande-toi :

> “Si cette image était une pièce, j’aurais plutôt chaud ou plutôt froid dedans ?”

La réponse te donne déjà ton ambiance dominante.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        {
            id: 'contraste',
            anchorId: 'contraste',
            label: '3. Le contraste : fort / doux',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'contraste-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'contraste-text',
                            title: 'Ce qui fait vibrer (ou apaise) une image',
                            markdown: `
Le **contraste**, c’est la différence entre deux éléments :

- clair / foncé,
- saturé / désaturé,
- chaud / froid,
- complémentaire / proche.

Plus l’écart est grand, plus ça **claque**.  
Plus l’écart est petit, plus c’est **doux**.

Tu peux t’en servir pour :
- guider le regard,
- créer une zone d’intensité,
- ou au contraire calmer une atmosphère.

Le contraste, ce n’est pas “bien” ou “mal”.  
C’est une **intention**.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        {
            id: 'mini-exercice',
            anchorId: 'mini-exercice',
            label: 'Mini-exercice',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'mini-exercice-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'mini-exercice-text',
                            title: '3 questions pour analyser une palette',
                            markdown: `
Prends une image que tu aimes (illustration, photo, film) et réponds à ces 3 questions :

1. **Les valeurs**  
   - Où est la zone la plus claire ?  
   - Où est la zone la plus sombre ?

2. **La température**  
   - Globalement, ça tire vers le chaud ou vers le froid ?

3. **Le contraste**  
   - Cette image est plutôt douce, ou très contrastée ?

Tu viens déjà de lire la couleur de manière structurée,  
sans aucune formule compliquée.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        {
            id: 'conclusion',
            anchorId: 'conclusion',
            label: 'Conclusion',
            variant: 'outro',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'conclusion-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'conclusion-text',
                            title: 'Tu sais déjà plus de choses que tu ne crois',
                            markdown: `
Tu n’as pas besoin de connaître tous les noms des harmonies de couleur pour commencer à les utiliser.

Avec :
- la **valeur** (clair / foncé),
- la **température** (chaud / froid),
- le **contraste** (fort / doux),

tu peux déjà :
- améliorer un dessin existant,
- rendre une scène plus lisible,
- ajuster une ambiance qui “sonne faux”.

Le reste viendra par petites touches, en regardant, en testant, en ajustant.

Ta sensibilité est ton premier outil.  
La théorie ne vient qu’en soutien, ensuite.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
    ],
};

/* -------------------------------------------------------------------------- */
/* 2) COMPRENDRE LE BLEU                                                      */
/* -------------------------------------------------------------------------- */

const comprendreLeBleu: Article = {
    slug: 'comprendre-le-bleu',
    title: 'Pourquoi le bleu apaise (et pas toujours)',
    excerpt: 'Le bleu est souvent perçu comme calme et profond… mais il peut aussi devenir tranchant, froid ou mélancolique. On décortique ses nuances et ses humeurs.',
    level: 'beginner',
    format: 'color-guide',
    pillar: 'couleurs-harmonie',
    subcategory: 'ch-couleur-et-emotion',
    readingTime: '7 min',
    coverImage: '/images/articles/exemple-couleur-2.png',
    publishedAt: '2025-04-18',
    hero: {
        src: '/images/articles/exemple-couleur-2.png',
        alt: 'Nuances de bleu du très clair au très sombre',
    },
    sections: [
        {
            id: 'intro',
            anchorId: 'intro',
            label: 'Introduction',
            variant: 'intro',
            blocks: [
                {
                    kind: 'rich-text',
                    id: 'intro-text',
                    markdown: `
Le bleu est partout : dans le ciel, l’eau, les vêtements, les interfaces, les logos.  
On dit souvent que c’est une couleur **calme**, **apaisante**, presque neutre.

Mais en réalité, il y a :
- des bleus doux,
- des bleus glacés,
- des bleus électriques,
- des bleus mélancoliques.

Ce guide te propose de regarder le bleu comme une **famille de caractères**, pas comme une seule humeur.
                    `.trim(),
                },
            ],
        },
        {
            id: 'nuances',
            anchorId: 'nuances',
            label: 'Les grandes familles de bleus',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'nuances-cols',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'bleu-doux',
                            title: 'Bleus doux, bleus “coton”',
                            markdown: `
Bleus clairs, légèrement grisés, proches du pastel.

Évocations :
- ciel voilé,
- draps propres,
- calme, distance, respiration.

Utiles pour :
- des ambiances sereines,
- des fonds discrets,
- des espaces “respirants”.
                            `.trim(),
                        },
                        {
                            kind: 'rich-text',
                            id: 'bleu-froid',
                            title: 'Bleus froids, presque glacés',
                            markdown: `
Bleus tirant vers le vert ou vers le gris très froid.

Évocations :
- hôpital, métal, hiver,
- lumière de néon,
- distance émotionnelle.

Utiles pour :
- créer un malaise subtil,
- montrer quelque chose de froid, coupant, impersonnel.
                            `.trim(),
                        },
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'bleu-intense',
                            title: 'Bleus intenses, bleus “nuit”',
                            markdown: `
Bleus profonds, très saturés, parfois presque noirs.

Évocations :
- nuit, profondeur, mystère,
- spiritualité, silence intense.

Utiles pour :
- donner du poids à une scène,
- faire ressortir une couleur chaude (orange, rouge),
- installer une ambiance contemplative ou dramatique.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
        {
            id: 'contrastes',
            anchorId: 'contrastes',
            label: 'Quand le bleu apaise… ou tend la scène',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'contrastes-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'contrastes-text',
                            title: 'Tout dépend de ce que tu lui mets en face',
                            markdown: `
Le bleu ne “signifie” pas toujours la même chose.  
Son effet dépend :

- des valeurs (clair / foncé),
- de sa saturation,
- des autres couleurs présentes.

Quelques exemples :

- Bleu doux + beige = ambiance calme, presque domestique.  
- Bleu nuit + orange vif = tension, intensité, vibration.  
- Bleu froid + blanc chirurgical = impression clinique.

La question à te poser n’est pas :  
> “Que veut dire le bleu ?”  
mais plutôt :  
> “Que fait ce bleu **avec** les autres couleurs ?”
                            `.trim(),
                        },
                    ],
                },
            ],
        },
        {
            id: 'mini-exercice',
            anchorId: 'mini-exercice',
            label: 'Mini-exercice',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'mini-exercice-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'mini-exercice-text',
                            title: 'Changer l’humeur d’un bleu',
                            markdown: `
Prends un même bleu (crayon, gouache, numérique) et teste 3 combinaisons :

1. Bleu + blanc cassé  
2. Bleu + gris froid  
3. Bleu + orange chaud

Regarde :
- laquelle apaise le plus,
- laquelle est la plus tendue,
- laquelle te semble la plus mélancolique.

Tu viens d’expérimenter ce que font **les relations de couleurs**, sans aucune théorie en plus.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
    ],
};

/* -------------------------------------------------------------------------- */
/* 3) CRÉER TA PREMIÈRE PALETTE                                               */
/* -------------------------------------------------------------------------- */

const creerTaPremierePalette: Article = {
    slug: 'creer-ta-premiere-palette',
    title: 'Créer ta première palette personnelle',
    excerpt: 'Un pas-à-pas pour composer une petite palette cohérente à partir d’une émotion, d’un lieu ou d’un souvenir — sans te perdre dans 200 couleurs.',
    level: 'intermediate',
    format: 'color-guide',
    pillar: 'couleurs-harmonie',
    subcategory: 'ch-palettes-et-harmonies',
    readingTime: '9 min',
    coverImage: '/images/articles/exemple-couleur-1.png',
    publishedAt: '2025-04-25',
    hero: {
        src: '/images/articles/exemple-couleur-1.png',
        alt: 'Nuancier de quelques couleurs sélectionnées sur une table',
    },
    sections: [
        {
            id: 'intro',
            anchorId: 'intro',
            label: 'Introduction',
            variant: 'intro',
            blocks: [
                {
                    kind: 'rich-text',
                    id: 'intro-text',
                    markdown: `
On croit souvent qu’une bonne palette, c’est beaucoup de couleurs bien “réparties”.  
En réalité, les palettes les plus fortes sont souvent **très restreintes**.

Ce guide t’accompagne pour créer une palette simple, mais très toi, à partir de :

- une émotion,
- un lieu,
- un souvenir précis.

Objectif :  
obtenir **4 à 6 couleurs** avec lesquelles tu as envie de rester un moment.
                    `.trim(),
                },
            ],
        },
        {
            id: 'point-de-depart',
            anchorId: 'point-de-depart',
            label: '1. Choisir un point de départ',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'point-de-depart-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'point-de-depart-text',
                            title: 'Une palette, c’est une atmosphère avant d’être un nuancier',
                            markdown: `
Au lieu de partir d’une roue chromatique,  
pars d’une phrase ou d’une image intérieure.

Par exemple :
- “un matin d’hiver dans un café chaleureux”  
- “un soir d’été au bord de la mer”  
- “une chambre calme avec des draps propres”

Écris ta phrase, puis demande-toi :
> “Si cette scène était un film, quelles couleurs domineraient l’écran ?”
                            `.trim(),
                        },
                    ],
                },
            ],
        },
        {
            id: 'choisir-couleurs',
            anchorId: 'choisir-couleurs',
            label: '2. Sélectionner 4 à 6 couleurs',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'choisir-couleurs-cols',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'role-couleurs',
                            title: 'Donner un rôle à chaque couleur',
                            markdown: `
Plutôt que de choisir des couleurs au hasard,  
donne un **rôle** à chacune :

- 1 couleur **dominante** (celle qu’on voit le plus),
- 1 couleur **d’accent** (pour les petites touches qui attirent l’œil),
- 1 ou 2 couleurs **neutres** (pour respirer),
- éventuellement 1 couleur **de contraste** (pour les moments forts).

Tu peux partir d’images réelles (photos, films, tableaux) et prélever les couleurs avec un outil pipette.
                            `.trim(),
                        },
                    ],
                    right: [
                        {
                            kind: 'encart',
                            id: 'limiter-encart',
                            tone: 'pedagogic',
                            size: 'compact',
                            title: 'Moins mais mieux',
                            markdown: `
Si tu as du mal à choisir, limite-toi à **4 couleurs** au départ.

C’est largement suffisant pour :
- une illustration,
- une série de petits croquis,
- un carnet thématique.

Tu pourras toujours en ajouter plus tard.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
        {
            id: 'tester',
            anchorId: 'tester',
            label: '3. Tester la palette sur des formes simples',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'tester-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'tester-text',
                            title: 'Avant les dessins finis : les petits blocs de couleur',
                            markdown: `
Avant de te lancer dans une grande illustration,  
teste ta palette sur des formes très simples :

- rectangles,
- cercles,
- bandes,
- petits aplats.

Change :
- la proportion de chaque couleur,
- qui est dominante,
- qui est accent.

Tu verras que **la même palette** peut raconter une histoire très différente selon les quantités.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
        {
            id: 'mini-exercice',
            anchorId: 'mini-exercice',
            label: 'Mini-exercice',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'mini-exercice-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'mini-exercice-text',
                            title: 'Palette “souvenir de lieu”',
                            markdown: `
Choisis un lieu qui t’a marqué (une ville, une chambre, un café, une plage).  
Ferme les yeux 10 secondes et laisse venir les couleurs.

Puis :
1. Note 3 mots d’ambiance (par exemple : “chaud, feutré, un peu sombre”).  
2. Choisis 4 couleurs qui correspondent à ces mots.  
3. Fais une page complète de blocs de couleurs avec cette palette.

Tu viens de créer une palette **profondément personnelle**,  
bien plus intéressante qu’un nuancier théorique.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
        {
            id: 'conclusion',
            anchorId: 'conclusion',
            label: 'Conclusion',
            variant: 'outro',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'conclusion-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'conclusion-text',
                            title: 'Ta palette est un petit territoire',
                            markdown: `
Une palette, ce n’est pas seulement un ensemble de couleurs.

C’est :
- un **terrain de jeu**,
- une ambiance,
- un fragment de ton univers intérieur.

Tu peux en avoir plusieurs :
- une pour les jours calmes,
- une pour les scènes plus intenses,
- une pour un projet particulier.

L’important n’est pas de trouver “la palette parfaite”,  
mais de créer des petits territoires de couleur dans lesquels tu te sens bien.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
    ],
};

/* -------------------------------------------------------------------------- */
/* EXPORT GLOBAL                                                              */
/* -------------------------------------------------------------------------- */

export const COLOR_GUIDES: Article[] = [basesCouleurSansJargon, comprendreLeBleu, creerTaPremierePalette];

export function getColorGuideBySlug(slug: string): Article | undefined {
    return COLOR_GUIDES.find((article) => article.slug === slug);
}
