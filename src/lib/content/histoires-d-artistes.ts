// src/lib/content/histoires-artistes.ts
import type { Article } from '@/types/article';

/* -------------------------------------------------------------------------- */
/* 1) FRIDA KAHLO EN 5 MOMENTS                                                */
/* -------------------------------------------------------------------------- */

const fridaKahloEn5Moments: Article = {
    slug: 'frida-kahlo-en-5-moments',
    title: 'Frida Kahlo en 5 moments de vie',
    excerpt: 'Plutôt qu’une biographie complète, cinq fragments sensibles pour comprendre comment sa vie et son œuvre s’entremêlent.',
    level: 'beginner',
    pillar: 'histoires-d-artistes',
    format: 'artist-story',
    coverImage: '/images/articles/exemple-artiste-1.png',
    subcategory: 'ha-portraits-d-artistes',
    readingTime: '9 min',
    publishedAt: '2025-03-10',
    hero: {
        src: '/images/articles/exemple-artiste-1.png',
        alt: 'Portrait de Frida Kahlo devant un fond végétal',
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
Les vies d’artistes sont souvent racontées comme des légendes : dates, grandes œuvres, anecdotes spectaculaires.

Avec Frida Kahlo, on va faire autrement.

Plutôt qu’une biographie complète, on va traverser **5 moments de vie**, comme cinq petites scènes qui éclairent son œuvre :

1. le corps brisé,  
2. l’atelier-lit,  
3. le miroir,  
4. l’amour et la blessure,  
5. la dernière marche.

Tu n’as pas besoin de tout retenir.  
Tu peux juste **te laisser toucher** par ce que ces fragments révèlent de sa manière de créer.
                    `.trim(),
                },
            ],
        },

        /* 1 — LE CORPS BRISÉ */
        {
            id: 'corps-brise',
            anchorId: 'corps-brise',
            label: 'Un corps brisé, pas une fin',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'corps-brise-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'corps-brise-text',
                            title: 'L’accident qui la coupe en deux… et ouvre une autre voie',
                            markdown: `
À 18 ans, Frida subit un grave accident de bus.  
Son corps est brisé : colonne, bassin, jambe, côtes.

Pour beaucoup, ce serait une fin.  
Pour elle, c’est le début d’autre chose.

Clouée au lit, immobilisée pendant des mois, elle ne peut pas sortir…  
Alors le monde va venir **sur la toile** :

- la douleur,  
- la solitude,  
- le corps réparé, mais jamais “comme avant”.

Ce n’est pas un “détail biographique”.  
C’est une **source directe** de sa peinture.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* 2 — L’ATELIER-LIT */
        {
            id: 'atelier-lit',
            anchorId: 'atelier-lit',
            label: 'Peindre depuis le lit',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'atelier-lit-cols',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'image',
                            id: 'atelier-lit-image',
                            src: '/images/articles/exemple-artiste-1.png',
                            alt: 'Reconstitution du lit-atelier de Frida Kahlo, avec miroir au-dessus',
                            caption: 'Un lit transformé en atelier : peindre sans pouvoir se lever.',
                        },
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'atelier-lit-text',
                            title: 'Quand le lit devient chevalet',
                            markdown: `
Pour continuer à peindre malgré les corsets et les plâtres, Frida fait installer **un miroir au-dessus de son lit**.

Elle se regarde, encore et encore.  
Son visage devient son premier modèle.

Peindre, ici, ce n’est pas “faire de l’art”.  
C’est **supporter la douleur**, tenir dans le temps, reconstruire son image.

Ce contexte explique pourquoi il y a autant d’**autoportraits** :  
c’est le sujet le plus accessible quand le monde extérieur est inaccessible.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* 3 — LE MIROIR */
        {
            id: 'miroir',
            anchorId: 'miroir',
            label: 'Le miroir comme outil de connaissance',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'miroir-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'miroir-text',
                            title: 'Se voir pour ne pas disparaître',
                            markdown: `
Dans ses autoportraits, Frida ne se représente pas “jolie”.  
Elle se représente **présente**.

Sourcils joints, moustache légère, regard frontal, sans complaisance.

Le miroir n’est pas un outil de coquetterie.  
C’est un outil de **survie intérieure** :

- se reconnaître,  
- rester entière malgré les fractures,  
- affirmer : *“je suis là, même ainsi”*.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* 4 — AMOUR / BLESSURE */
        {
            id: 'amour-blessure',
            anchorId: 'amour-blessure',
            label: 'Amour, jalousie, fidélités cassées',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'amour-cols',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'amour-text',
                            title: 'Diego, la passion et les fissures',
                            markdown: `
La relation entre Frida Kahlo et Diego Rivera est faite :

- d’admiration,  
- de collaborations,  
- d’infidélités répétées,  
- de ruptures et de retrouvailles.

Frida ne cache pas ces tensions :  
elles entrent dans ses tableaux sous forme :

- de cœurs ouverts,  
- de corps coupés,  
- de doubles figures (Frida en deux).
                            `.trim(),
                        },
                    ],
                    right: [
                        {
                            kind: 'encart',
                            id: 'amour-encart',
                            tone: 'soft',
                            size: 'compact',
                            title: 'L’intime devient motif',
                            markdown: `
Chez Frida, la vie amoureuse n’est jamais un “à côté” de la peinture.

Elle **alimente** directement les images :

- la trahison devient symbole,  
- la jalousie devient découpe,  
- la passion devient couleur vive.

Comprendre sa vie, c’est mieux lire les signes dans ses tableaux.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* 5 — FIN / CONTINUER */
        {
            id: 'derniere-marche',
            anchorId: 'derniere-marche',
            label: 'La dernière marche',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'derniere-marche-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'derniere-marche-text',
                            title: '“Je pars en souriant”',
                            markdown: `
Vers la fin de sa vie, Frida souffre énormément.  
Elle perd une jambe, ses déplacements sont difficiles.

Et pourtant, elle continue à venir aux vernissages,  
parfois **amenée en ambulance**, installée sur un lit en plein milieu de la salle.

Jusqu’au bout, elle fait de sa présence un geste artistique.

Cette phrase qu’on lui attribue souvent résume bien son rapport à la vie :

> “Je pars en souriant.”

Qu’elle soit exacte ou non, elle dit quelque chose de vrai :  
chez Frida, la douleur et la joie **coexistent** dans la même image.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* CONCLUSION */
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
                            title: 'Pourquoi raconter les artistes par fragments',
                            markdown: `
Frida Kahlo n’est pas seulement une icône imprimée sur des tote bags.

C’est une femme qui a :

- transformé un corps brisé en moteur de création,  
- transformé un lit en atelier,  
- transformé ses blessures en images.

En la découvrant par **moments de vie** plutôt que par dates,  
tu peux relier plus facilement : ce qu’elle vit ↔ ce qu’elle peint.

C’est tout l’objectif de ce pilier *Histoires d’artistes* :  
faire des artistes non pas des statues, mais des **êtres humains qui cherchent, comme toi**.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
    ],
};

/* -------------------------------------------------------------------------- */
/* 2) L’ATELIER SILENCIEUX                                                    */
/* -------------------------------------------------------------------------- */

const atelierSilencieux: Article = {
    slug: 'atelier-silencieux-habiter-le-temps-long',
    title: 'L’atelier silencieux : habiter le temps long',
    excerpt: 'Un atelier, ce n’est pas seulement un lieu plein de toiles. C’est un temps particulier, où le monde extérieur ralentit. Récit d’un moment suspendu dans un atelier.',
    level: 'intermediate',
    pillar: 'histoires-d-artistes',
    format: 'artist-story',
    coverImage: '/images/articles/exemple-artiste-1.png',
    subcategory: 'ha-ateliers-et-coulisses',
    readingTime: '10 min',
    publishedAt: '2025-03-18',
    hero: {
        src: '/images/articles/exemple-artiste-1.png',
        alt: 'Atelier d’artiste baigné d’une lumière douce',
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
                    id: 'intro-atelier',
                    markdown: `
On imagine souvent l’atelier comme un lieu bouillonnant, rempli de gestes, de couleurs et de décisions.

En réalité, l’atelier est souvent **silencieux** :

- beaucoup d’attente,  
- des hésitations,  
- des pauses devant la toile,  
- des allers-retours entre ce qu’on voit et ce qu’on ressent.

Ce récit te fait entrer dans un atelier **pendant une seule journée**,  
pour sentir ce qui se joue vraiment quand quelqu’un crée.
                    `.trim(),
                },
            ],
        },

        {
            id: 'matin',
            anchorId: 'matin',
            label: 'Le matin : installer le silence',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'matin-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'matin-text',
                            title: 'Avant le geste, l’installation',
                            markdown: `
Le matin, l’atelier est froid.

On ouvre les volets, on laisse la lumière rentrer, on remet en place les pinceaux qui ont roulé pendant la nuit.

Rien de “spectaculaire”, pourtant :

- c’est là que le regard revient,  
- c’est là qu’on retrouve la toile telle qu’on l’a laissée,  
- c’est là qu’on décide si on continue… ou si on recule un peu.

Ce temps-là ne se voit pas dans les tableaux.  
Mais sans lui, il n’y aurait pas de peinture.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        {
            id: 'milieu-journee',
            anchorId: 'milieu-journee',
            label: 'Milieu de journée : le doute comme compagnon',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'milieu-cols',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'milieu-text',
                            title: 'Le moment où tout peut basculer',
                            markdown: `
C’est souvent en milieu de journée que le doute se fait le plus fort.

La toile est “en cours” :

- trop avancée pour être effacée,  
- pas assez pour être assumée.

Chaque geste peut améliorer… ou ruiner.

Ce n’est pas un moment héroïque.  
C’est un moment fragile, où l’artiste négocie avec :

- sa peur,  
- son exigence,  
- son envie de tout laisser tomber.
                            `.trim(),
                        },
                    ],
                    right: [
                        {
                            kind: 'encart',
                            id: 'milieu-encart',
                            tone: 'soft',
                            size: 'compact',
                            title: 'Ce que tu ne vois jamais dans les expositions',
                            markdown: `
Les expositions montrent les œuvres “terminées”.

Mais entre la première idée et la version accrochée au mur,  
il y a eu :

- des couches recouvertes,  
- des changements de direction,  
- des moments où l’artiste se disait : *“C’est nul, j’arrête.”*

L’atelier silencieux, c’est cet espace où ces phrases-là ont le droit d’exister.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        {
            id: 'soir',
            anchorId: 'soir',
            label: 'Le soir : savoir s’arrêter',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'soir-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'soir-text',
                            title: 'Quitter l’atelier avec la toile inachevée',
                            markdown: `
Le soir, la lumière baisse. Les couleurs ne sont plus fidèles.

Il faut **s’arrêter**, même si rien ne semble “fini”.

C’est souvent là que se joue quelque chose d’important :

- accepter que le travail continue demain,  
- ne pas tout forcer dans une seule journée,  
- laisser la toile vivre sans surveillance pendant la nuit.

Ce temps long, cette acceptation de l’inachevé,  
fait partie de l’histoire de chaque œuvre.
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
                    id: 'conclusion-atelier-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'conclusion-atelier-text',
                            title: 'L’atelier comme paysage intérieur',
                            markdown: `
Ce récit n’avait pas pour but de raconter **un** artiste en particulier,  
mais de te faire goûter ce que beaucoup vivent :

- du silence,  
- des doutes,  
- des élans,  
- des gestes minuscules qui s’additionnent.

La prochaine fois que tu verras une toile en galerie ou en musée,  
tu pourras imaginer derrière elle **toutes ces heures invisibles**.

C’est aussi ça, *Histoires d’artistes* :  
redonner une place au temps, à l’attente, au presque-rien.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
    ],
};

/* -------------------------------------------------------------------------- */
/* 3) UN CHEMIN TARDIF                                                        */
/* -------------------------------------------------------------------------- */

const cheminTardif: Article = {
    slug: 'chemin-tardif-devenir-artiste-apres-40-ans',
    title: 'Devenir artiste après 40 ans : un chemin tardif (et très vivant)',
    excerpt: 'On parle souvent des “prodiges précoces”. Voici un récit inventé mais réaliste d’une personne qui commence à créer tard, avec sa vie déjà pleine.',
    level: 'beginner',
    pillar: 'histoires-d-artistes',
    format: 'artist-story',
    coverImage: '/images/articles/exemple-artiste-2.png',
    subcategory: 'ha-parcours-creatifs',
    readingTime: '8 min',
    publishedAt: '2025-03-22',
    hero: {
        src: '/images/articles/exemple-artiste-2.png',
        alt: 'Carnet, pinceaux et tasse de café sur une table',
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
                    id: 'intro-chemin',
                    markdown: `
On raconte souvent l’histoire des artistes comme s’ils avaient tous commencé enfants,  
avec un “talent évident” et une vocation claire.

Mais beaucoup de parcours sont plus tardifs, plus sinueux.

Cette histoire est **fictive**, mais inspirée de situations très réelles :  
celle d’une personne qui commence à prendre le dessin au sérieux **après 40 ans**,  
avec un travail, des responsabilités, une vie déjà dense.

Ce n’est pas une exception.  
C’est un chemin possible.
                    `.trim(),
                },
            ],
        },

        {
            id: 'declencheur',
            anchorId: 'declencheur',
            label: 'Le déclencheur discret',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'declencheur-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'declencheur-text',
                            title: 'Un carnet acheté “pour voir”',
                            markdown: `
Tout commence par un carnet acheté un peu au hasard,  
dans une papeterie, un jour de fatigue.

Pas un carnet de “grand artiste”.  
Juste un petit carnet à couverture souple, glissé dans un sac.

Pendant des semaines, il reste fermé.  
Puis un soir, en rentrant du travail, une page est gribouillée.

Rien d’extraordinaire.  
Mais ce soir-là, quelque chose **s’ouvre**.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        {
            id: 'temps-trouve',
            anchorId: 'temps-trouve',
            label: 'Trouver du temps dans une vie pleine',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'temps-cols',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'temps-text',
                            title: '15 minutes volées au reste',
                            markdown: `
Pas de “grand projet artistique” annoncé.

Juste 10, 15 minutes le soir :

- pendant que l’eau bout,  
- dans le train,  
- avant d’aller dormir.

Les premières semaines, c’est irrégulier.  
Puis un rythme se crée : un petit moment **juste pour ça**.
                            `.trim(),
                        },
                    ],
                    right: [
                        {
                            kind: 'encart',
                            id: 'temps-encart',
                            tone: 'pedagogic',
                            size: 'compact',
                            title: 'Ce que racontent beaucoup d’artistes tardifs',
                            markdown: `
On n’a pas besoin de “quitter son boulot” pour commencer.

Ce qui change tout, c’est :

- un espace (un coin de table, un carnet),  
- un temps (même minuscule),  
- l’autorisation de ne pas être “doué” tout de suite.

Ce sont ces trois éléments qui, répétés, construisent un chemin créatif.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        {
            id: 'regard',
            anchorId: 'regard',
            label: 'Changer de regard sur soi',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'regard-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'regard-text',
                            title: 'De “je ne suis pas artiste” à “je pratique”',
                            markdown: `
Au début, la phrase intérieure est claire :

> “Je ne suis pas artiste, je fais juste des petits dessins.”

Puis, à force de remplir des pages, une autre phrase apparaît :

> “Je pratique.”

Ce glissement est énorme.

On ne se définit pas encore comme “artiste”,  
mais on reconnaît qu’on a :  

- un geste,  
- une régularité,  
- un besoin réel de créer.

C’est souvent là que le chemin devient **irréversible**.
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
                    id: 'conclusion-chemin-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'conclusion-chemin-text',
                            title: 'Il n’y a pas d’âge “valable” pour commencer',
                            markdown: `
Cette histoire pourrait être celle de beaucoup de personnes.

L’important n’est pas :

- l’âge,  
- le diplôme,  
- la légitimité.

L’important, c’est le **mouvement** :

- un carnet qui se remplit,  
- une main qui revient,  
- un regard qui change.

C’est aussi ça, *Histoires d’artistes* :  
montrer que le mot “artiste” n’appartient pas qu’aux prodiges précoces,  
mais à toutes celles et ceux qui, un jour, décident de **créer quand même**.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
    ],
};

/* -------------------------------------------------------------------------- */
/* EXPORT                                                                    */
/* -------------------------------------------------------------------------- */

export const ARTIST_STORIES: Article[] = [fridaKahloEn5Moments, atelierSilencieux, cheminTardif];

export function getArtistStoryBySlug(slug: string): Article | undefined {
    return ARTIST_STORIES.find((story) => story.slug === slug);
}
