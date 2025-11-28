// src/lib/content/inspirations.ts
import type { Article } from '@/types/article';

/* -------------------------------------------------------------------------- */
/* 1) RITUEL DU REGARD DU MATIN                                               */
/* -------------------------------------------------------------------------- */

const rituelRegardMatin: Article = {
    slug: 'rituel-du-regard-du-matin',
    title: 'Un rituel du regard du matin (5 minutes pour nourrir tes yeux)',
    excerpt: 'Un rituel tout doux, sans pression, pour commencer la journée en nourrissant ton regard plutôt que ton feed.',
    level: 'beginner',
    format: 'inspiration',
    pillar: 'inspirations',
    subcategory: 'in-rituels-pour-regard',
    readingTime: '5 min',
    coverImage: '/images/articles/exemple-inspi-1.png',
    publishedAt: '2025-03-05',
    hero: {
        src: '/images/articles/exemple-inspi-1.png',
        alt: 'Tasse de café près d’un carnet ouvert avec quelques croquis et notes lumineuses',
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
Tu te réveilles, tu regardes ton téléphone… et ton regard se remplit déjà d’images choisies par d’autres.

Ce rituel propose l’inverse :
un **temps court, doux et volontaire** où tu choisis **toi-même** ce que tu offres à tes yeux.

Pas besoin de “bien faire”, pas besoin de dessiner.
Juste **regarder autrement**, 5 minutes, avant que la journée ne t’embarque.
                    `.trim(),
                },
            ],
        },
        {
            id: 'rituel',
            anchorId: 'rituel',
            label: 'Le rituel en 4 gestes',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'rituel-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'geste-1',
                            title: '1. Choisir un coin fixe',
                            markdown: `
Choisis un **endroit simple** : ta fenêtre, ta table, un coin de ta cuisine.

Pendant quelques jours, **ne change pas de lieu**.
L’idée : créer un rendez-vous stable où ton regard sait qu’il peut revenir.
                            `.trim(),
                        },
                        {
                            kind: 'rich-text',
                            id: 'geste-2',
                            title: '2. Observer sans commenter',
                            markdown: `
Pendant 2 minutes, regarde en silence :

- les couleurs,
- les petites variations de lumière,
- les objets, leurs positions,
- ce qui a changé depuis la veille.

Pas besoin d’interpréter ni de juger.
C’est juste un **scan visuel calme**.
                            `.trim(),
                        },
                        {
                            kind: 'rich-text',
                            id: 'geste-3',
                            title: '3. Noter trois détails',
                            markdown: `
Dans un carnet (ou sur ton téléphone), note **3 détails** :

- un reflet,
- une ombre,
- une texture,
- un morceau de couleur.

Une ligne par détail, sans phrase parfaite.
Ce carnet devient ta **petite archive de regard**.
                            `.trim(),
                        },
                        {
                            kind: 'rich-text',
                            id: 'geste-4',
                            title: '4. Fermer, respirer, passer à la journée',
                            markdown: `
Quand c’est terminé, referme le carnet.

Tu peux même te dire mentalement :
> “Aujourd’hui, je garde les yeux ouverts.”

C’est tout.
Le rituel fonctionne parce qu’il est **court, répétable, non culpabilisant**.
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
                            title: 'Essayer pendant 3 jours',
                            markdown: `
Pendant **3 matins de suite**, teste ce rituel :

1. Même lieu.  
2. Même durée (5 minutes maximum).  
3. 3 détails à noter à chaque fois.

Au bout des 3 jours, relis ce que tu as écrit.
Tu verras déjà que ton regard :
- repère plus de nuances,
- remarque plus vite les changements,
- se pose plus facilement.

Tu n’as rien “produit”.
Mais tu as nourri le **muscle de l’attention visuelle**.
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
                            title: 'Un rituel qui ne demande rien en retour',
                            markdown: `
Ce rituel n’est pas là pour te rendre “plus productif·ve” ni pour créer des œuvres.

Il sert juste à **redonner une place à ton regard** dans ta journée.
Un regard choisi, pas sur-stimulé.

Tu peux ensuite :
- dessiner à partir de ces détails,
- ou simplement les laisser vivre dans ta mémoire.

Dans les deux cas, tu cultives quelque chose de précieux :
une **disponibilité à ce qui t’entoure**.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
    ],
};

/* -------------------------------------------------------------------------- */
/* 2) FLÂNER EN VILLE COMME UN CARNET OUVERT                                  */
/* -------------------------------------------------------------------------- */

const flanerVilleCarnetOuvert: Article = {
    slug: 'flaner-en-ville-comme-un-carnet-ouvert',
    title: 'Flâner en ville comme si ton regard était un carnet ouvert',
    excerpt: 'Transformer une balade en petite collecte de matières visuelles : lumières, gestes, typographies, textures… sans obligation de dessiner.',
    level: 'beginner',
    format: 'inspiration',
    pillar: 'inspirations',
    subcategory: 'in-ambiances-et-lieux',
    readingTime: '6 min',
    coverImage: '/images/articles/exemple-inspi-2.png',
    publishedAt: '2025-03-12',
    hero: {
        src: '/images/articles/exemple-inspi-2.png',
        alt: 'Rue de ville en fin de journée, avec lumières chaudes et silhouettes floues',
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
Il y a des jours où tu n’as pas l’énergie pour dessiner…  
mais tu peux quand même nourrir ton univers visuel.

La ville (ou ton village, ou ton quartier) est un **immense carnet en mouvement** :
lumières, vitrines, typographies, silhouettes, reflets.

L’idée ici : transformer une simple marche en **ballade d’observation**, sans pression de “ramener quelque chose de génial”.
                    `.trim(),
                },
            ],
        },
        {
            id: 'regard',
            anchorId: 'regard',
            label: 'Que regarder ?',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'regard-cols',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'bloc-lumiere',
                            title: '1. Lumières & contrastes',
                            markdown: `
Observe :

- les halos des réverbères,
- les reflets dans les vitrines,
- les zones très éclairées / très sombres,
- les couleurs des néons, enseignes, panneaux.

Tu peux mentalement te dire :
> “Là, c’est une palette de nuit bleu/orange.”
                            `.trim(),
                        },
                        {
                            kind: 'rich-text',
                            id: 'bloc-typographie',
                            title: '2. Typographies & signes',
                            markdown: `
Regarde les lettres :

- vieilles enseignes peintes,
- néons,
- affiches collées,
- menus, plaques de rue.

Note mentalement celles qui te plaisent, même sans les dessiner.
                            `.trim(),
                        },
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'bloc-gestes',
                            title: '3. Gestes & silhouettes',
                            markdown: `
Observe :

- la manière dont les gens se tiennent,
- comment ils portent leurs sacs,
- les rythmes de marche (lents, pressés, hésitants),
- les groupes, les solitaires.

Tu n’as pas besoin d’analyser.
Juste **laisser ces gestes entrer dans ta réserve intérieure**.
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
                            title: 'Une balade – trois photos',
                            markdown: `
Lors de ta prochaine balade, donne-toi une contrainte simple :

> **3 photos maximum. Pas une de plus.**

Choisis :
- une **lumière**,
- une **typographie**,
- une **silhouette / scène**.

Le soir, regarde ces 3 images comme un **mini-triptyque d’ambiance**.
Demande-toi :
- Quelle couleur domine ?
- Quel geste revient ?
- Quelle atmosphère ça raconte ?
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
                            title: 'Flâner sans se sentir inutile',
                            markdown: `
Flâner n’est pas perdre du temps.
C’est **remplir ton réservoir d’images**.

Tu n’as pas besoin de tout archiver, de tout photographier.
Une partie reste simplement en toi, et ressortira plus tard dans :

- une palette,
- une scène de dessin,
- une lumière dans un portrait.

La ville devient alors moins un décor, plus un **terrain de jeu visuel**.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
    ],
};

/* -------------------------------------------------------------------------- */
/* 3) CONSTRUIRE TA BIBLIOTHÈQUE D’IMAGES                                     */
/* -------------------------------------------------------------------------- */

const construireBibliothequeImages: Article = {
    slug: 'construire-ta-bibliotheque-d-images',
    title: 'Construire ta bibliothèque d’images (sans te noyer)',
    excerpt: 'Comment rassembler des images qui te nourrissent vraiment, sans finir avec un dossier ingérable sur ton ordi.',
    level: 'intermediate',
    format: 'inspiration',
    pillar: 'inspirations',
    subcategory: 'in-bibliotheques-d-images',
    readingTime: '7 min',
    coverImage: '/images/articles/exemple-inspi-1.png',
    publishedAt: '2025-03-22',
    hero: {
        src: '/images/articles/exemple-inspi-1.png',
        alt: 'Table avec photos imprimées, carnet et quelques nuanciers de couleur',
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
On collecte toutes et tous :
des captures d’écran, des images Pinterest, des photos de voyages, des détails de films…

Mais sans méthode, on se retrouve vite avec un **tas de fichiers qu’on n’ouvre jamais**.

L’idée ici : construire une **bibliothèque d’images légère**,
qui sert vraiment ta pratique plutôt que d’encombrer ton disque dur.
                    `.trim(),
                },
            ],
        },
        {
            id: 'tri',
            anchorId: 'tri',
            label: 'Trier sans se perdre',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'tri-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'tri-1',
                            title: '1. Garder seulement ce qui fait quelque chose dans ton corps',
                            markdown: `
Ouvre ton dossier d’images.  
Ne te demande pas : “Est-ce que c’est utile ?”  
Demande-toi : **“Est-ce que ça me fait encore quelque chose ?”**

Si la réponse est non → archive ou supprime.  
Si la réponse est oui → garde, et mets-la dans un dossier plus précis.
                            `.trim(),
                        },
                        {
                            kind: 'rich-text',
                            id: 'tri-2',
                            title: '2. Classer par atmosphères, pas par thèmes',
                            markdown:
                                `
Au lieu de classer par “paysages / portraits / objets”,  
essaie des dossiers comme :

- ` +
                                '`Lumières douces`' +
                                `,
- ` +
                                '`Nuits contrastées`' +
                                `,
- ` +
                                '`Intérieurs calmes`' +
                                `,
- ` +
                                '`Villes bruyantes`' +
                                `.

Tu crées ainsi une bibliothèque par **ambiance émotionnelle**,  
plus proche de ce que tu veux ressentir dans tes propres images.
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
                            title: 'Faire une “étagère d’humeur”',
                            markdown: `
Choisis **12 images** maximum qui te parlent vraiment en ce moment.

- Imprime-les (ou mets-les dans un tableau numérique unique),
- rassemble-les sur une seule page,
- donne un titre à cette “étagère” (par ex. *Brume chaude*, *Soirées d’été*, *Silences intérieurs*).

Pendant quelques jours, **reviens voir uniquement cette étagère**.
C’est ta bibliothèque active du moment.
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
                            title: 'Une bibliothèque vivante, pas parfaite',
                            markdown: `
Ta bibliothèque d’images n’a pas besoin d’être exhaustive.
Elle a besoin d’être **vivante**.

Tu peux :
- ajouter,
- retirer,
- créer des “étagères” temporaires,
- en laisser certaines disparaître.

L’important, c’est que ces images soient en lien avec **ce que tu traverses maintenant**.
Ce sont des compagnes de route, pas un musée figé.
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

export const INSPIRATION_ARTICLES: Article[] = [rituelRegardMatin, flanerVilleCarnetOuvert, construireBibliothequeImages];

export function getInspirationBySlug(slug: string): Article | undefined {
    return INSPIRATION_ARTICLES.find((article) => article.slug === slug);
}
