// src/lib/content/analyse-oeuvres.ts
import type { Article } from '@/types/article';

const lireUnTableauEn4Etapes: Article = {
    slug: 'lire-un-tableau-en-4-etapes-simples',
    title: 'Lire un tableau en 4 étapes simples',
    excerpt: 'Une méthode douce, sans jargon, pour lire un tableau pas à pas à partir de “Impression, soleil levant” de Monet.',
    level: 'beginner',
    pillar: 'comprendre-une-oeuvre',
    format: 'artwork-analysis',
    coverImage: '/images/articles/comprendre-oeuvre/bases-regard/debutant/lire-tableau-4-etapes/hero.png',
    subcategory: 'ao-bases-du-regard',
    readingTime: '8 min',
    publishedAt: '2025-02-10',
    hero: {
        src: '/images/articles/comprendre-oeuvre/bases-regard/debutant/lire-tableau-4-etapes/hero.png',
        alt: 'Impression, soleil levant de Claude Monet, port du Havre dans la brume',
    },

    sections: [
        /* ------------------------------------------------------------------ */
        /* 1) INTRO                                                           */
        /* ------------------------------------------------------------------ */
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
Certains tableaux semblent, au premier regard, intimidants. On a peur de “mal voir”, de ne pas saisir l’intention, de passer à côté de l’essentiel.

Pourtant, lire un tableau n’a rien d’un exercice savant. C’est une expérience lente, simple, presque méditative : un **geste d’attention**, plus qu’une compétence technique.

Dans cet article, on va s’appuyer sur *Impression, soleil levant* de Monet pour t’offrir une **méthode douce en 4 étapes** :

- voir les grandes formes,
- observer la lumière,
- repérer les couleurs dominantes,
- sentir le rythme et le mouvement.

Pas de jargon, pas de “bonne interprétation” à trouver. Juste ton regard… et ce que tu ressens.
                    `.trim(),
                },
            ],
        },

        /* ------------------------------------------------------------------ */
        /* 2) PRÉSENTATION DE L’ŒUVRE                                        */
        /* ------------------------------------------------------------------ */
        {
            id: 'presentation-oeuvre',
            anchorId: 'presentation-oeuvre',
            label: "Présentation de l'œuvre",
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'presentation-two-cols',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'image',
                            id: 'oeuvre-image',
                            src: '/images/articles/comprendre-oeuvre/bases-regard/debutant/lire-tableau-4-etapes/claude-monet_impression-soleil-levant.jpg',
                            alt: 'Impression, soleil levant de Claude Monet',
                            caption: 'Claude Monet, Impression, soleil levant, 1872. Port du Havre dans la brume, au lever du jour.',
                            emphasis: 'focus',
                        },
                        {
                            kind: 'encart',
                            id: 'oeuvre-meta',
                            tone: 'soft',
                            size: 'compact',
                            title: "Fiche rapide de l'œuvre",
                            markdown: `
- **Titre** : *Impression, soleil levant*  
- **Artiste** : Claude Monet  
- **Date** : 1872  
- **Mouvement** : Impressionnisme  
- **Technique** : Huile sur toile  
- **Dimensions** : 48 × 63 cm  
- **Lieu** : Musée Marmottan Monet, Paris
                            `.trim(),
                        },
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'oeuvre-description',
                            title: 'Une impression plus qu’une description',
                            markdown: `
Ce tableau montre le port du Havre au lever du jour :  

- une brume douce,  
- un soleil orange qui perce la grisaille,  
- quelques silhouettes de bateaux et de barques,  
- des touches rapides qui vibrent comme une respiration.

Rien n’est détaillé, tout est **suggéré**.

C’est ce qui en fait une œuvre idéale pour apprendre à lire un tableau : Monet ne montre pas simplement le port… il montre **l’impression du port**.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* ------------------------------------------------------------------ */
        /* 3) VIDÉO                                                          */
        /* ------------------------------------------------------------------ */
        {
            id: 'video',
            anchorId: 'video',
            label: 'Vidéo',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'video-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'video',
                            id: 'video-impression-soleil-levant',
                            url: 'https://www.youtube.com/embed/eNuOpMOPorU',
                            caption: 'Lecture guidée de Impression, soleil levant en 4 étapes simples.',
                            cover: {
                                src: '/images/articles/comprendre-oeuvre/bases-regard/debutant/lire-tableau-4-etapes/hero.png',
                                alt: 'Capture de la vidéo de lecture du tableau Impression, soleil levant',
                            },
                        },
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'video-intro',
                            title: 'Lire le tableau en vidéo',
                            markdown: `
Dans la vidéo, je t’accompagne pas à pas pour lire *Impression, soleil levant* en suivant les 4 étapes :

1. Voir les grandes formes  
2. Observer la lumière  
3. Identifier les couleurs dominantes  
4. Sentir le rythme et le mouvement

Tu peux la regarder **avant**, **pendant** ou **après** la lecture de l’article. Elle n’est pas là pour donner “la bonne interprétation”, mais pour t’aider à **poser ton regard lentement** sur l’image.
                            `.trim(),
                        },
                        {
                            kind: 'encart',
                            id: 'video-conseil',
                            tone: 'soft',
                            size: 'compact',
                            title: 'Comment utiliser la vidéo',
                            markdown: `
- Première fois : regarde simplement, sans prendre de notes.  
- Deuxième fois : mets sur pause, reviens en arrière, laisse-toi le temps.  
- Ensuite : applique la méthode sur d’autres tableaux.

L’idée n’est pas de tout retenir, mais de **prendre confiance dans ta façon de regarder**.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* ------------------------------------------------------------------ */
        /* 4) CONTEXTE SIMPLE                                                */
        /* ------------------------------------------------------------------ */
        {
            id: 'contexte',
            anchorId: 'contexte',
            label: 'Contexte simple',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'contexte-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'contexte-text',
                            title: 'Monet ne décrit pas le port, il décrit une sensation',
                            markdown: `
Quand Monet peint *Impression, soleil levant* en 1872, il ne cherche pas à représenter fidèlement le port du Havre.

Il ne veut pas montrer chaque bateau, chaque corde, chaque reflet avec précision. Il veut transmettre une **sensation** :

- le brouillard,  
- le froid du matin,  
- le silence du port,  
- le soleil qui perce doucement l’horizon,  
- les silhouettes qui glissent dans la brume.

À l’époque, ce tableau choque : il ne ressemble pas à ce qui se fait alors. Les formes ne sont pas “finies”, la scène n’est pas “décrite”. Elle est **évoquée**.

C’est pour ça que cette œuvre est parfaite pour s’exercer : pas besoin de chercher un sens caché. Il suffit d’observer ce qui se passe sous nos yeux… tranquillement.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* ------------------------------------------------------------------ */
        /* 5) ANALYSE VISUELLE — LES 4 ÉTAPES                               */
        /* ------------------------------------------------------------------ */
        {
            id: 'analyse',
            anchorId: 'analyse-4-etapes',
            label: 'Lire le tableau en 4 étapes',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'analyse-section-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'analyse-intro',
                            title: 'Lire un tableau par couches, doucement',
                            markdown: `
Lire un tableau, ce n’est pas tout voir d’un coup. C’est laisser ton regard se poser **par étapes**, comme si tu soulevais des voiles un à un.

Voici comment *Impression, soleil levant* se laisse lire en 4 temps.
                            `.trim(),
                        },

                        // Étapes 1 + 2 (colonne gauche) / 3 + 4 (colonne droite)
                        {
                            kind: 'two-cols',
                            id: 'analyse-steps-two-cols',
                            layout: 'balanced',
                            left: [
                                {
                                    kind: 'rich-text',
                                    id: 'step-1',
                                    title: 'Étape 1 — La composition : voir les grandes formes',
                                    markdown: `
Avant les détails, cherche les **masses visuelles**.

Dans ce tableau, Monet organise tout en trois grandes zones :

- le ciel, vaste et brumeux,  
- l’eau, qui reflète la lumière,  
- les silhouettes (bateaux, mâts, barques).

Demande-toi : **où ton regard va-t-il en premier ?**

Ici, souvent :

- la tache orange du soleil,  
- puis le reflet vertical dans l’eau,  
- puis les silhouettes sombres des barques.

Cette structure guide déjà ta lecture, même si tu ne l’avais pas formulée.
                                    `.trim(),
                                },
                                {
                                    kind: 'rich-text',
                                    id: 'step-2',
                                    title: 'Étape 2 — La lumière : ce qui éclaire le tableau',
                                    markdown: `
La lumière est le **cœur** de l’œuvre.

Ici, elle vient de deux endroits :

- le soleil orange, comme une petite flamme dans le brouillard,  
- les zones plus claires du ciel, qui adoucissent l’arrière-plan.

Tout est diffus, enveloppé. Rien n’est tranché.

Pose-toi la question : **la lumière révèle-t-elle le sujet, ou est-elle absorbée ?**

Dans ce tableau : elle est absorbée par la brume, ce qui donne ce sentiment de matin silencieux.
                                    `.trim(),
                                },
                            ],
                            right: [
                                {
                                    kind: 'rich-text',
                                    id: 'step-3',
                                    title: 'Étape 3 — Les couleurs : l’émotion dominante',
                                    markdown: `
Monet utilise très peu de couleurs, mais elles sont choisies avec soin :

- des bleus-gris froids pour la brume et l’eau,  
- un orange vif pour le soleil et son reflet,  
- des touches sombres pour les silhouettes.

Ce contraste **chaud / froid** crée l’émotion du tableau :

- les bleus = calme, brouillard, silence,  
- l’orange = chaleur, vie, vibration.

Demande-toi :

- **quelle couleur domine ?**  
- **quelle couleur perturbe cette dominante ?**

Ici, le bleu domine, l’orange perturbe. L’œil va donc naturellement vers le soleil.
                                    `.trim(),
                                },
                                {
                                    kind: 'rich-text',
                                    id: 'step-4',
                                    title: 'Étape 4 — Le rythme : comment le tableau bouge',
                                    markdown: `
Le rythme d’un tableau, c’est la manière dont les formes **circulent** dans l’image.

Dans *Impression, soleil levant* :

- les petits coups de pinceau créent un mouvement horizontal,  
- le reflet vertical du soleil crée une tension douce,  
- les silhouettes des bateaux servent de points d’ancrage.

Tout cela donne une sensation de **respiration lente**.

Demande-toi : ce tableau est-il calme, nerveux, rapide, suspendu ?

Ici : il est **lent, diffus, contemplatif**, comme un matin qui se lève.
                                    `.trim(),
                                },
                            ],
                        },
                    ],
                },
            ],
        },

        /* ------------------------------------------------------------------ */
        /* 6) ZOOM SUR UN DÉTAIL                                             */
        /* ------------------------------------------------------------------ */
        {
            id: 'zoom-detail',
            anchorId: 'zoom-detail',
            label: 'Zoom sur un détail',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'zoom-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'image',
                            id: 'zoom-barque',
                            src: '/images/articles/comprendre-oeuvre/bases-regard/debutant/lire-tableau-4-etapes/zoom.png',
                            alt: 'Détail de la petite barque au premier plan du tableau Impression, soleil levant',
                            caption: 'Au premier plan, une petite barque aux silhouettes sombres : un minuscule détail qui change tout.',
                        },
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'zoom-text',
                            title: 'La petite barque qui porte toute l’émotion',
                            markdown: `
De loin, le tableau semble flou. Mais en t’approchant, un détail attire l’œil : la **petite barque au premier plan**, avec ses deux silhouettes sombres.

Elle apporte :

- l’échelle du tableau,  
- la présence humaine,  
- un point de stabilité dans la brume,  
- le contraste entre le calme du paysage et la vie qui continue.

Les silhouettes ne sont pas dessinées, seulement **suggérées** par quelques touches sombres. Et pourtant, elles suffisent à donner une histoire à la scène.

Sans elles, on aurait un matin atmosphérique. Avec elles, on a des personnes qui travaillent au petit matin, dans le froid, sous un soleil timide.

Ce minuscule détail porte une grande partie de l’émotion du tableau.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* ------------------------------------------------------------------ */
        /* 7) POURQUOI CETTE ŒUVRE TOUCHE AUTANT                             */
        /* ------------------------------------------------------------------ */
        {
            id: 'pourquoi-touche',
            anchorId: 'pourquoi-touche',
            label: 'Pourquoi cette œuvre touche autant',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'pourquoi-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'pourquoi-text',
                            title: 'Une simplicité fragile, plus qu’un “chef-d’œuvre impressionnant”',
                            markdown: `
On pourrait croire que *Impression, soleil levant* touche parce qu’il est “beau”. En réalité, ce qui émeut, c’est sa **simplicité** et sa **fragilité**.

Le tableau parle d’un moment universel : le jour qui se lève, doucement, avant que le monde ne s’éveille.

Il ne raconte pas un drame historique, il n’illustre pas un mythe. Il nous rappelle :

- le calme du matin,  
- le froid suspendu dans l’air,  
- la lumière qui hésite,  
- l’horizon qui apparaît en douceur.

Avec ses touches rapides, ses formes floues, ses couleurs silencieuses, Monet nous laisse respirer **l’impression** plutôt que l’image.

Ce tableau ne demande pas qu’on le comprenne. Il demande qu’on le **ressente**.

C’est pour ça qu’il reste aussi puissant, même plus de 150 ans après.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* ------------------------------------------------------------------ */
        /* 8) MINI-EXERCICE : REGARDER AUTREMENT                             */
        /* ------------------------------------------------------------------ */
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
                            title: 'Un petit exercice pour entraîner ton regard',
                            markdown: `
Pour t’approprier la méthode, voici un exercice à faire en moins de 2 minutes.

Choisis n’importe quel tableau — ou reste sur *Impression, soleil levant* — et réponds à ces questions :
                            `.trim(),
                        },
                        {
                            kind: 'encart',
                            id: 'mini-exercice-questions',
                            tone: 'pedagogic',
                            size: 'compact',
                            title: '4 questions pour lire une œuvre',
                            markdown: `
1. **Où vont mes yeux en premier ?**  
   → Cela révèle la composition et le point d’ancrage.

2. **Quelle émotion me donne la lumière ?**  
   → Claire, dure, diffuse, chaude, froide ? La lumière est le cœur de l’ambiance.

3. **Quelle couleur domine… et laquelle perturbe ?**  
   → La couleur dominante donne l’ambiance, celle qui tranche pointe le “nerf” du tableau.

4. **Quel mouvement je ressens dans mon corps ?**  
   → Lent, nerveux, suspendu, fluide ? Ton corps sait souvent avant ton cerveau.

Tu peux répéter ce mini-rituel sur n’importe quelle œuvre. Il transforme ta manière de regarder, sans connaissances techniques, juste avec ton **sens du vivant**.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* ------------------------------------------------------------------ */
        /* 9) CONCLUSION                                                     */
        /* ------------------------------------------------------------------ */
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
                            title: 'Lire une œuvre, c’est d’abord lui laisser du temps',
                            markdown: `
Lire un tableau, ce n’est pas accumuler des connaissances, ni deviner ce que l’artiste “a voulu dire”.

C’est **prendre le temps de regarder** :

- parcourir les formes,  
- suivre la lumière,  
- ressentir les couleurs,  
- capter le rythme,  
- écouter l’émotion.

Tu n’as pas besoin d’être expert. Tu n’as pas besoin de tout savoir. Tu n’as même pas besoin de trouver une interprétation “juste”.

Avec ces 4 étapes, tu peux déjà lire :

- un tableau impressionniste,  
- une peinture moderne,  
- une œuvre abstraite,  
- même une image contemporaine.

Ton regard est ton premier outil. Plus tu l’utilises avec douceur, plus il s’affine.

L’art n’est pas un langage secret : c’est un **paysage intérieur**. Et maintenant, tu sais comment commencer à l’explorer.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* ------------------------------------------------------------------ */
        /* 10) RESSOURCES À TÉLÉCHARGER                                      */
        /* ------------------------------------------------------------------ */
        {
            id: 'ressources',
            anchorId: 'ressources',
            label: 'Ressources & téléchargements',
            blocks: [
                {
                    kind: 'resources-grid',
                    id: 'ressources-grid',
                    title: 'Ressources à télécharger',
                    items: [
                        {
                            label: 'PDF complet “Lire un tableau en 4 étapes simples”',
                            description: 'La version intégrale de l’analyse, à garder dans ton carnet ou à lire hors écran.',
                            href: '/downloads/articles/lire-un-tableau-en-4-etapes-simples.pdf',
                            badge: 'PDF',
                        },
                        {
                            label: 'Fiche “4 étapes pour lire une œuvre”',
                            description: 'Un mémo très condensé à imprimer pour tes visites de musée ou tes séances de dessin.',
                            href: '/downloads/fiches/fiche-4-etapes-lire-une-oeuvre.pdf',
                            badge: 'À imprimer',
                        },
                    ],
                },
            ],
        },
    ],
};

const lignesDeForce: Article = {
    slug: 'lignes-de-force-comment-une-oeuvre-dirige-notre-regard',
    title: 'Les lignes de force : comment une œuvre dirige notre regard',
    excerpt: 'Les lignes de force sont comme la charpente invisible d’une image : elles guident ton œil sans que tu t’en rendes compte. Avec Vermeer, on apprend à les repérer.',
    level: 'intermediate',
    pillar: 'comprendre-une-oeuvre',
    format: 'artwork-analysis',
    coverImage: '/images/articles/comprendre-oeuvre/composition-structure/intermediaire/lignes-de-force/hero.png',
    subcategory: 'ao-composition-structure',
    readingTime: '10 min',
    publishedAt: '2025-03-10',
    hero: {
        src: '/images/articles/comprendre-oeuvre/composition-structure/intermediaire/lignes-de-force/hero.png',
        alt: 'La Liseuse à la fenêtre de Vermeer, une jeune femme lisant une lettre près d’une fenêtre',
    },

    sections: [
        /* ------------------------------------------------------------------ */
        /* 1) INTRO                                                           */
        /* ------------------------------------------------------------------ */
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
Quand tu regardes une œuvre, tu as l’impression que ton regard se promène librement… En réalité, **rien n’est laissé au hasard**.

Chaque tableau possède une sorte de **charpente invisible** : des lignes, des axes, des directions qui guident ton œil sans que tu t’en rendes compte.

Ces lignes de force, ce sont les **nervures de l’image** : tu ne les vois pas tout de suite, mais elles organisent tout.

Comprendre ces lignes, c’est entrer dans l’atelier de l’artiste :

- comment il construit la scène,
- comment il crée l’équilibre,
- comment il installe le calme ou la tension,
- comment il raconte quelque chose rien qu’avec l’orientation des formes.

Dans cette analyse, tu vas apprendre **à repérer ces lignes de force**, à sentir comment elles orientent ton regard, et pourquoi tu ne regarderas plus jamais un tableau de la même façon après ça.
                    `.trim(),
                },
            ],
        },

        /* ------------------------------------------------------------------ */
        /* 2) PRÉSENTATION DE L’ŒUVRE                                        */
        /* ------------------------------------------------------------------ */
        {
            id: 'presentation-oeuvre',
            anchorId: 'presentation-oeuvre',
            label: "Présentation de l'œuvre",
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'presentation-two-cols',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'image',
                            id: 'oeuvre-image',
                            src: '/images/articles/comprendre-oeuvre/composition-structure/intermediaire/lignes-de-force/oeuvre.jpg',
                            alt: 'La Liseuse à la fenêtre de Johannes Vermeer',
                            caption: '*La Liseuse à la fenêtre*, Johannes Vermeer, vers 1657–1659. Huile sur toile, Gemäldegalerie Alte Meister, Dresde.',
                            emphasis: 'focus',
                        },
                        {
                            kind: 'encart',
                            id: 'oeuvre-meta',
                            tone: 'soft',
                            size: 'compact',
                            title: "Fiche rapide de l'œuvre",
                            markdown: `
- **Titre** : *La Liseuse à la fenêtre*  
- **Artiste** : Johannes Vermeer  
- **Date** : 1657–1659 (env.)  
- **Mouvement** : Baroque néerlandais  
- **Technique** : Huile sur toile  
- **Dimensions** : 83 × 64,5 cm  
- **Lieu** : Gemäldegalerie Alte Meister, Dresde
                            `.trim(),
                        },
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'oeuvre-description',
                            title: 'Une scène simple… mais une structure très calculée',
                            markdown: `
À première vue, la scène est simple :  

- une jeune femme lit une lettre,
- debout près d’une fenêtre,
- baignée par une lumière latérale douce.

Tout semble silencieux, intime, presque figé. Mais si tu restes un peu, tu sens que **tout n’est pas statique** : quelque chose te guide.

- la fenêtre crée un axe,
- la posture de la femme en crée un autre,
- la lumière trace des directions,
- le rideau, légèrement ouvert, agit comme un rideau de théâtre.

C’est une œuvre idéale pour comprendre **comment un peintre dirige ton regard**, sans jamais te dire où regarder.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* ------------------------------------------------------------------ */
        /* 3) VIDÉO (OPTIONNELLE)                                            */
        /* ------------------------------------------------------------------ */
        {
            id: 'video',
            anchorId: 'video',
            label: 'Vidéo',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'video-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'video',
                            id: 'video-lignes-de-force',
                            url: 'https://www.youtube.com/embed/eNuOpMOPorU',
                            caption: 'Dans la vidéo, on trace ensemble les lignes de force de *La Liseuse à la fenêtre*.',
                            cover: {
                                src: '/images/articles/comprendre-oeuvre/composition-structure/intermediaire/lignes-de-force/hero.png',
                                alt: 'Capture de la vidéo d’analyse des lignes de force dans La Liseuse à la fenêtre',
                            },
                        },
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'video-intro',
                            title: 'Ce que tu verras dans la vidéo',
                            markdown: `
La vidéo te montre en direct :

- comment ton regard va d’abord vers le **visage**,
- pourquoi la lumière t’entraîne ensuite vers la **lettre**,
- comment les verticales, horizontales et diagonales structurent la pièce,
- comment le rideau crée un **chemin visuel** vers l’intérieur de la scène.

Ce n’est pas une démonstration technique : c’est un **regard guidé**, simple et fluide, pour t’aider à voir ce qui se cache derrière la tranquillité apparente du tableau.
                            `.trim(),
                        },
                        {
                            kind: 'encart',
                            id: 'video-conseil',
                            tone: 'soft',
                            size: 'compact',
                            title: 'Comment utiliser la vidéo',
                            markdown: `
- 1ᵉʳ visionnage : regarde simplement, sans chercher à analyser.  
- 2ᵉ : mets sur pause, reviens en arrière, suis les trajectoires du regard.  
- Ensuite : applique la même méthode sur d’autres œuvres.

L’objectif n’est pas de tout retenir,  
mais de **prendre confiance dans ta façon de regarder**.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* ------------------------------------------------------------------ */
        /* 4) CONTEXTE SIMPLE                                                 */
        /* ------------------------------------------------------------------ */
        {
            id: 'contexte',
            anchorId: 'contexte',
            label: 'Contexte simple',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'contexte-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'contexte-text',
                            title: 'Une scène du quotidien, une architecture secrète',
                            markdown: `
Vermeer peint *La Liseuse à la fenêtre* dans un intérieur typique des maisons hollandaises du XVIIᵉ siècle : une femme, une lettre, une lumière latérale, un espace calme.

Derrière cette simplicité :

- il expérimente une manière très personnelle de **structurer l’espace**,
- il utilise la lumière, l’architecture, les textiles, les ombres,
- il construit une **architecture invisible** qui guide ton regard.

La fenêtre à gauche n’est pas qu’une source de lumière : c’est un **point d’entrée** visuel.

Le rideau n’est pas seulement décoratif : c’est un **rideau de théâtre** qui t’invite à entrer dans la scène.

Le tableau semble doux et tranquille, mais sa composition est d’une précision chirurgicale.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* ------------------------------------------------------------------ */
        /* 5) ANALYSE : COMMENT L’ŒUVRE DIRIGE LE REGARD                      */
        /* ------------------------------------------------------------------ */
        {
            id: 'analyse',
            anchorId: 'analyse-lignes-de-force',
            label: 'Comment l’œuvre dirige notre regard',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'analyse-section-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'analyse-intro',
                            title: 'Les lignes de force : une architecture invisible',
                            markdown: `
Les lignes de force ne sont jamais dessinées. Elles se cachent dans :

- l’orientation des formes,
- la direction des corps,
- la trajectoire de la lumière,
- la disposition des objets.

Dans *La Liseuse à la fenêtre*, Vermeer construit **une véritable charpente invisible**. Ton regard circule dedans comme sur des rails… sans que tu le saches.
                            `.trim(),
                        },

                        {
                            kind: 'two-cols',
                            id: 'analyse-main-two-cols',
                            layout: 'balanced',
                            left: [
                                {
                                    kind: 'rich-text',
                                    id: 'axe-principal',
                                    title: '1. L’axe principal : de la fenêtre au visage',
                                    markdown: `
C’est la ligne de force dominante du tableau.

- la lumière vient du **haut-gauche**,  
- elle frappe le **visage** de la liseuse,  
- le châssis de la fenêtre crée une **verticale forte**,  
- le rebord de la fenêtre une **horizontale structurante**.

Ton œil :

1. entre par la fenêtre,  
2. glisse sur la lumière,  
3. se pose naturellement sur le **visage**.

La fenêtre n’est donc pas qu’un décor : c’est un **tremplin visuel** vers le personnage.
                                    `.trim(),
                                },
                                {
                                    kind: 'rich-text',
                                    id: 'diagonale-rideau',
                                    title: '2. La diagonale du rideau : un chemin visuel',
                                    markdown: `
Le grand rideau à droite crée une diagonale douce :

- il s’ouvre comme un rideau de théâtre,
- il coupe l’image en biais,
- il oriente ton regard vers l’intérieur de la pièce.

Sans ce rideau, la scène serait très statique. Avec lui, ton regard **entre** littéralement dans le tableau.

C’est une ligne de force presque silencieuse, mais elle change complètement la dynamique de l’image.
                                    `.trim(),
                                },
                            ],
                            right: [
                                {
                                    kind: 'rich-text',
                                    id: 'verticales-horizontales',
                                    title: '3. Verticales & horizontales : la stabilité silencieuse',
                                    markdown: `
Partout, Vermeer installe des lignes **très stables** :

- verticales : montant de la fenêtre, corps de la liseuse, rideau, mur,
- horizontales : rebord de la fenêtre, table, lignes du sol.

Ces axes donnent :

- une impression de calme,
- une sensation d’ordre,
- une **stabilité intérieure**.

Tu ressens le tableau comme posé, suspendu, prêt à accueillir une histoire — mais sans agitation.
                                    `.trim(),
                                },
                                {
                                    kind: 'rich-text',
                                    id: 'trajet-visage-lettre',
                                    title: '4. Du visage à la lettre : la trajectoire intérieure',
                                    markdown: `
Une fois ton regard posé sur le visage, Vermeer t’emmène ailleurs :

- la tête est légèrement inclinée,
- le bras crée une diagonale douce,
- le bord de la lettre prolonge cette direction.

Tout cela forme une nouvelle ligne de force :  

➡️ **du visage vers la lettre**

C’est le **chemin du récit** : c’est là que tu comprends que le cœur de la scène n’est pas la lumière… mais **la lettre qu’elle lit**, seule, dans ce silence.
                                    `.trim(),
                                },
                            ],
                        },
                    ],
                },
            ],
        },

        /* ------------------------------------------------------------------ */
        /* 6) ZOOM SUR UN DÉTAIL                                              */
        /* ------------------------------------------------------------------ */
        {
            id: 'zoom-detail',
            anchorId: 'zoom-detail',
            label: 'Zoom sur un détail',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'zoom-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'image',
                            id: 'zoom-lettre',
                            src: '/images/articles/comprendre-oeuvre/composition-structure/intermediaire/lignes-de-force/zoom.png',
                            alt: 'Zoom sur la lettre tenue par la jeune femme dans La Liseuse à la fenêtre',
                            caption: 'Un minuscule rectangle clair : la lettre concentre une grande partie des lignes de force.',
                        },
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'zoom-text',
                            title: 'La lettre : destination finale du regard',
                            markdown: `
De loin, tout paraît calme et équilibré. Mais si tu t’approches, **un détail concentre tout** : la lettre.

Regarde ce qui converge vers elle :

- la tête légèrement inclinée,
- le bras qui trace une diagonale,
- la lumière qui éclaire juste assez le papier,
- les plis de la manche qui suivent la même direction,
- l’ombre portée qui accompagne le geste.

Ce petit rectangle clair n’est pas un simple détail : c’est **la destination finale** de ton regard.

On ne sait pas ce qu’elle lit. Mais la composition te chuchote : “Regarde ici, c’est là que tout se joue.”
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* ------------------------------------------------------------------ */
        /* 7) POURQUOI CETTE ŒUVRE DIRIGE SI BIEN LE REGARD                   */
        /* ------------------------------------------------------------------ */
        {
            id: 'pourquoi-touche',
            anchorId: 'pourquoi-dirige',
            label: 'Pourquoi ça fonctionne si bien',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'pourquoi-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'pourquoi-text',
                            title: 'Une composition invisible, mais ultra maîtrisée',
                            markdown: `
Ce qui fascine chez Vermeer, ce n’est pas seulement sa lumière, c’est **sa capacité à rendre la composition invisible**.

Dans *La Liseuse à la fenêtre* :

1. **La lumière raconte l’histoire**  
   Elle vient de la gauche, frappe le visage, descend vers la lettre, puis se dissout dans la pièce. Elle te montre ce qui compte.

2. **Les verticales stabilisent la scène**  
   Fenêtre, personnage, rideau… Elles donnent une impression d’ordre et de silence.

3. **La diagonale du rideau crée le mouvement**  
   Sans elle, tout serait figé. Avec elle, tu entres dans l’image comme dans une scène de théâtre.

4. **Le corps du personnage penche vers la lettre**  
   La posture devient une boussole : “Regarde ce que je regarde”.

5. **Le tableau est construit comme un murmure**  
   Pas de grand effet spectaculaire, mais une circulation douce, une chorégraphie de lignes et de lumières qui t’emmène d’un point à l’autre.

Tu ne te sens jamais forcé, mais **doucement conduit**. C’est là que réside le génie de Vermeer.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* ------------------------------------------------------------------ */
        /* 8) MINI-EXERCICE                                                  */
        /* ------------------------------------------------------------------ */
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
                            title: 'Repérer les lignes de force en 30 secondes',
                            markdown: `
Choisis une peinture — ou reste sur *La Liseuse à la fenêtre*. Tu n’as besoin que de ton regard.

Réponds à ces 4 questions :
                            `.trim(),
                        },
                        {
                            kind: 'encart',
                            id: 'mini-exercice-questions',
                            tone: 'pedagogic',
                            size: 'compact',
                            title: '4 questions pour voir la charpente d’une œuvre',
                            markdown: `
1. **Où va mon regard en premier ?**  
   → Souvent, c’est la ligne de force principale (lumière, visage, objet clair…).

2. **Quelles grandes directions se dégagent ?**  
   → Plutôt verticales, horizontales, diagonales, courbes ?

3. **Mon regard circule-t-il ou reste-t-il immobile ?**  
   → S’il circule, essaie de suivre son trajet.

4. **Quel élément retient mon attention à la fin ?**  
   → C’est souvent là que se cache le récit ou l’émotion principale.

En faisant cet exercice régulièrement, tu commences à voir la **structure cachée** de n’importe quelle image.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* ------------------------------------------------------------------ */
        /* 9) CONCLUSION                                                     */
        /* ------------------------------------------------------------------ */
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
                            title: 'Lire une œuvre, c’est apprendre à suivre ses lignes silencieuses',
                            markdown: `
Quand tu commences à voir les lignes de force, quelque chose bascule :

- l’œuvre n’est plus seulement “belle” ou “intéressante”,
- elle devient **lisible**, compréhensible, vivante.

Tu réalises que rien n’est figé au hasard :

- chaque diagonale,
- chaque vertical,
- chaque rayon de lumière,
- chaque posture

est là pour te guider — doucement, sans t’imposer quoi que ce soit.

Vermeer ne te dit pas où regarder. Il t’y conduit.

Lire une œuvre, ce n’est pas “comprendre l’art” au sens scolaire. C’est apprendre à **voir autrement** :

- sentir les directions,
- suivre le mouvement,
- repérer ce qui retient ton regard,
- entrer dans l’image comme dans une pièce où quelqu’un respire encore.

Ce n’est pas un savoir théorique. C’est une sensibilité qui s’ouvre.

Et plus tu observes les lignes de force, plus cette sensibilité devient naturelle, fluide, intuitive.

Un jour, tu ne verras presque plus qu’elles. Et tu ne regarderas plus jamais une œuvre de la même façon.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        /* ------------------------------------------------------------------ */
        /* 10) RESSOURCES À TÉLÉCHARGER (OPTIONNELLES)                       */
        /* ------------------------------------------------------------------ */
        {
            id: 'ressources',
            anchorId: 'ressources',
            label: 'Ressources & téléchargements',
            blocks: [
                {
                    kind: 'resources-grid',
                    id: 'ressources-grid',
                    title: 'Ressources à télécharger',
                    items: [
                        {
                            label: 'PDF complet “Les lignes de force”',
                            description: 'La version intégrale de l’analyse à garder dans ton carnet ou à lire hors écran.',
                            href: '/downloads/articles/lignes-de-force.pdf',
                            badge: 'PDF',
                        },
                        {
                            label: 'Fiche “Repérer les lignes de force”',
                            description: 'Un mémo très condensé pour tes visites de musée ou tes séances d’analyse.',
                            href: '/downloads/fiches/fiche-lignes-de-force.pdf',
                            badge: 'À imprimer',
                        },
                    ],
                },
            ],
        },
    ],
};

const nuitEtoilee: Article = {
    slug: 'nuit-etoilee-comment-van-gogh-cree-le-mouvement',
    title: 'La Nuit étoilée : comment Van Gogh crée le mouvement',
    excerpt: 'Un tableau qui semble bouger sous les yeux. Analyse douce pour comprendre comment Van Gogh crée une sensation de mouvement avec des lignes et des tourbillons.',
    level: 'beginner',
    pillar: 'comprendre-une-oeuvre',
    format: 'artwork-analysis',
    coverImage: '/images/articles/comprendre-oeuvre/composition-structure/intermediaire/lignes-de-force/diagonale.png',
    subcategory: 'ao-lumiere-espace',
    readingTime: '7 min',
    publishedAt: '2025-02-14',

    hero: {
        src: '/images/articles/comprendre-oeuvre/composition-structure/intermediaire/lignes-de-force/diagonale.png',
        alt: 'La Nuit étoilée de Vincent Van Gogh',
    },

    sections: [
        {
            id: 'intro',
            anchorId: 'intro',
            label: 'Introduction',
            blocks: [
                {
                    kind: 'rich-text',
                    id: 'intro-text',
                    markdown: `
*La Nuit étoilée* est un tableau qui bouge.

Les formes ondulent, le ciel tourbillonne, les collines semblent respirer.  
Van Gogh ne représente pas le monde : il représente **ce qu’il ressent**.

Dans cette analyse douce, tu vas découvrir comment il crée cette sensation de mouvement :

- les lignes courbes,  
- les spirales du ciel,  
- les contrastes de matière,  
- la lumière qui circule.

Pas besoin de connaître l’histoire de l’art pour sentir ce tableau.  
Il suffit d’observer… lentement.
                    `.trim(),
                },
            ],
        },

        {
            id: 'oeuvre',
            anchorId: 'oeuvre',
            label: "L'œuvre",
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'oeuvre-cols',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'image',
                            id: 'oeuvre-img',
                            src: '/images/articles/comprendre-oeuvre/composition-structure/intermediaire/lignes-de-force/conclusion.png',
                            alt: 'La Nuit étoilée',
                            caption: 'Vincent Van Gogh, *La Nuit étoilée*, 1889.',
                        },
                        {
                            kind: 'encart',
                            id: 'meta',
                            tone: 'soft',
                            size: 'compact',
                            title: 'Fiche rapide',
                            markdown: `
- **Artiste** : Vincent Van Gogh  
- **Date** : 1889  
- **Technique** : Huile sur toile  
- **Lieu** : MoMA, New York  
                            `.trim(),
                        },
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'desc',
                            title: 'Un ciel plus vivant que réel',
                            markdown: `
Van Gogh ne peint pas un paysage réel :  
il peint un **paysage intérieur**.

- le ciel tourbillonne,  
- les étoiles vibrent,  
- les collines respirent,  
- le cyprès se tord vers le ciel.

Tout est mouvement.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        {
            id: 'analyse',
            anchorId: 'analyse',
            label: 'Analyse',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'analyse-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'intro-mvt',
                            title: 'Les courbes : moteur du mouvement',
                            markdown: `
Van Gogh remplace les lignes droites par des lignes **courbes**,  
qui donnent un sentiment de rotation et de vie.

Regarde les éléments suivants :

- les spirales du ciel,  
- la courbe de la colline,  
- la torsion du cyprès,  
- les halos des étoiles.

Aucune forme n’est figée.
                            `.trim(),
                        },

                        {
                            kind: 'rich-text',
                            id: 'tourbillons',
                            title: 'Les tourbillons : cœur du tableau',
                            markdown: `
Le centre du ciel est une **double spirale** :  
un mouvement presque hypnotique.

On a l’impression que :

- le vent souffle,  
- la lumière circule,  
- le ciel respire.

C’est ce tourbillon qui donne le **rythme général** du tableau.
                            `.trim(),
                        },

                        {
                            kind: 'rich-text',
                            id: 'contrastes',
                            title: 'Contrastes de couleur : énergie visuelle',
                            markdown: `
Van Gogh oppose :

- des bleus profonds,  
- des jaunes très lumineux,  
- des verts qui vibrent.

Plus le contraste est fort, plus le mouvement est perceptible.
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
            blocks: [
                {
                    kind: 'section-card',
                    id: 'conclusion-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'conclu',
                            title: 'Un ciel qui parle',
                            markdown: `
*La Nuit étoilée* n’est pas un paysage :  
c’est une **émotion mise en forme**.

Les lignes courbes, les spirales et les contrastes construisent ce mouvement silencieux.  
C’est ce qui fait de ce tableau un moment suspendu, presque cosmique.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
    ],
};

const jeuneFillePerle: Article = {
    slug: 'jeune-fille-perle-lire-un-portrait',
    title: 'La Jeune Fille à la perle : lire un portrait en 3 points',
    excerpt: 'Un portrait simple, presque silencieux, mais d’une construction millimétrée. On lit le portrait par la lumière, la posture et le contraste.',
    level: 'beginner',
    pillar: 'comprendre-une-oeuvre',
    format: 'artwork-analysis',
    coverImage: '/images/articles/comprendre-oeuvre/composition-structure/intermediaire/lignes-de-force/trajectoire.png',
    subcategory: 'ao-composition-structure',
    readingTime: '6 min',
    publishedAt: '2025-02-20',

    hero: {
        src: '/images/articles/comprendre-oeuvre/composition-structure/intermediaire/lignes-de-force/trajectoire.png',
        alt: 'La Jeune Fille à la perle',
    },

    sections: [
        {
            id: 'intro',
            anchorId: 'intro',
            label: 'Introduction',
            blocks: [
                {
                    kind: 'rich-text',
                    id: 'intro-jfp',
                    markdown: `
*La Jeune Fille à la perle* est l’un des portraits les plus célèbres au monde.

Son secret ?  
Une **simplicité extrême**, construite avec une précision incroyable.

Pour lire ce portrait, tu n’as besoin que de trois points :

1. la **lumière**,  
2. la **posture**,  
3. le **contraste**.

Ces trois éléments suffisent pour comprendre pourquoi ce portrait semble vivant.
                    `.trim(),
                },
            ],
        },

        {
            id: 'portrait',
            anchorId: 'portrait',
            label: "L'œuvre",
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'cols-jfp',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'image',
                            id: 'jfp-img',
                            src: '/images/articles/comprendre-oeuvre/composition-structure/intermediaire/lignes-de-force/mini-exercice.png',
                            alt: 'La Jeune Fille à la perle',
                            caption: 'Johannes Vermeer, *La Jeune Fille à la perle*, vers 1665.',
                        },
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'desc-jfp',
                            title: 'Un portrait sans décor',
                            markdown: `
Pas de fond, pas d’objets, pas de décor.  
Rien que le visage.

Vermeer retire tout pour laisser **la lumière faire l’essentiel**.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        {
            id: 'analyse',
            anchorId: 'analyse',
            label: 'Analyse',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'analyse-jfp',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'lumiere-jfp',
                            title: '1. La lumière : direction et douceur',
                            markdown: `
La lumière vient de la gauche et glisse :

- sur la joue,
- le nez,
- le front,
- la perle.

Elle révèle la forme du visage avec une douceur presque tactile.
                            `.trim(),
                        },

                        {
                            kind: 'rich-text',
                            id: 'posture-jfp',
                            title: '2. La posture : un mouvement à peine esquissé',
                            markdown: `
La jeune fille **se retourne**.

C’est minuscule, mais cela suffit à créer :

- du mouvement,
- du mystère,
- de la présence.

Comme si elle venait d’entendre ton arrivée.
                            `.trim(),
                        },

                        {
                            kind: 'rich-text',
                            id: 'contraste-jfp',
                            title: '3. Le contraste : clair contre sombre',
                            markdown: `
Le fond noir permet à :

- la peau claire,
- la perle brillante,
- le turban lumineux

de ressortir immédiatement.

Ce contraste donne au portrait **son intensité silencieuse**.
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
            blocks: [
                {
                    kind: 'section-card',
                    id: 'conclu-jfp',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'conclu-text',
                            title: 'Un portrait qui respire',
                            markdown: `
La simplicité de *La Jeune Fille à la perle* est un choix radical.

Sans décor, sans détails superflus,  
le visage devient un **paysage de lumière**.

Lire ce portrait, c’est regarder comment la lumière révèle une présence.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
    ],
};

const guernica: Article = {
    slug: 'guernica-composition-en-eclats',
    title: 'Guernica : comprendre une composition en éclats',
    excerpt: 'Comment Picasso construit un chaos lisible : une analyse douce pour comprendre les lignes, les contrastes et la circulation du regard.',
    level: 'intermediate',
    pillar: 'comprendre-une-oeuvre',
    format: 'artwork-analysis',
    coverImage: '/images/articles/comprendre-oeuvre/composition-structure/intermediaire/lignes-de-force/zoom.png',
    subcategory: 'ao-composition-structure',
    readingTime: '10 min',
    publishedAt: '2025-02-25',

    hero: {
        src: '/images/articles/comprendre-oeuvre/composition-structure/intermediaire/lignes-de-force/zoom.png',
        alt: 'Guernica de Picasso',
    },

    sections: [
        {
            id: 'intro',
            anchorId: 'intro',
            label: 'Introduction',
            blocks: [
                {
                    kind: 'rich-text',
                    id: 'intro-g',
                    markdown: `
*Guernica* paraît chaotique au premier regard.  
Et pourtant… tout est organisé.

Dans cette analyse, tu vas découvrir comment Picasso crée :

- un chaos lisible,  
- une violence sans sang,  
- un mouvement en éclats,  
- une structure triangulaire cachée.

Tu vas voir que ce tableau n’est pas “compliqué”.  
Il est **composé**.
                    `.trim(),
                },
            ],
        },

        {
            id: 'analyse',
            anchorId: 'analyse',
            label: 'Analyse',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'analyse-g-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'triangles',
                            title: 'La composition triangulaire : pilier caché',
                            markdown: `
Le tableau repose sur un grand **triangle central**,  
qui donne sa structure au chaos apparent.

Regarde :

- le cheval au centre,  
- les bras en diagonale,  
- les visages qui convergent.

Tout forme un triangle qui stabilise la scène.
                            `.trim(),
                        },

                        {
                            kind: 'rich-text',
                            id: 'noir-blanc',
                            title: 'Le noir et blanc : violence sans couleur',
                            markdown: `
Pas de rouge.  
Pas de sang.

La violence passe par :

- les contrastes,  
- les ombres,  
- les lumières trop fortes,  
- les coupures géométriques.

L’émotion est visuelle, pas illustrative.
                            `.trim(),
                        },

                        {
                            kind: 'rich-text',
                            id: 'mouvements',
                            title: 'Les lignes brisées : un mouvement en éclats',
                            markdown: `
Les diagonales se croisent partout :  
elles donnent l’impression d’une scène disloquée.

C’est cette énergie qui rend *Guernica* si intense.
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
            blocks: [
                {
                    kind: 'section-card',
                    id: 'conclu-g',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'final-g',
                            title: 'Un chaos orchestré',
                            markdown: `
Picasso ne raconte pas la guerre.  
Il raconte la **rupture** : la cassure du monde, de la lumière, des corps.

Ses lignes brisées construisent un chaos parfaitement orchestré.  
Et c’est ça, la vraie force de *Guernica*.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
    ],
};

const grandeVague: Article = {
    slug: 'grande-vague-lire-le-rythme-et-la-puissance',
    title: 'La Grande Vague : lire le rythme et la puissance',
    excerpt: 'Une analyse simple pour comprendre le rythme, la tension et la composition courbe de la célèbre estampe de Hokusai.',
    level: 'beginner',
    pillar: 'comprendre-une-oeuvre',
    format: 'artwork-analysis',
    coverImage: '/images/articles/comprendre-oeuvre/composition-structure/intermediaire/lignes-de-force/conclusion.png',
    subcategory: 'ao-lumiere-espace',
    readingTime: '7 min',
    publishedAt: '2025-03-01',

    hero: {
        src: '/images/articles/comprendre-oeuvre/composition-structure/intermediaire/lignes-de-force/conclusion.png',
        alt: 'La Grande Vague de Kanagawa',
    },

    sections: [
        {
            id: 'intro',
            anchorId: 'intro',
            label: 'Introduction',
            blocks: [
                {
                    kind: 'rich-text',
                    id: 'intro-gv',
                    markdown: `
*La Grande Vague* est un symbole mondial.  
Puissante, courbée, presque vivante.

Pour comprendre cette estampe, il suffit de regarder :

- la **grande courbe**,  
- la **tension** entre la vague et les barques,  
- l’équilibre entre mouvement et calme.

C’est une composition d’une simplicité incroyable… et d’une efficacité parfaite.
                    `.trim(),
                },
            ],
        },

        {
            id: 'analyse',
            anchorId: 'analyse',
            label: 'Analyse',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'analyse-gv',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'courbe',
                            title: 'La grande courbe : mouvement principal',
                            markdown: `
La vague forme une immense **courbe en croissant**,  
un arc qui englobe presque tout le tableau.

Cette courbe crée :

- du mouvement,  
- de la tension,  
- un effet de “retour” vers l’intérieur de l’image.
                            `.trim(),
                        },

                        {
                            kind: 'rich-text',
                            id: 'barques',
                            title: 'Les barques : lignes droites contre courbe',
                            markdown: `
Les barques sont **droites**,  
la vague est **courbe**.

C’est ce contraste qui fait naître la tension visuelle.  
On sent le danger.
                            `.trim(),
                        },

                        {
                            kind: 'rich-text',
                            id: 'montfuji',
                            title: 'Le Mont Fuji : ancre visuelle',
                            markdown: `
Petit, immobile, posé loin derrière.  
Il est le seul élément **stable** du tableau.

Il équilibre la puissance de la vague.
                            `.trim(),
                        },
                    ],
                },
            ],
        },

        {
            id: 'final',
            anchorId: 'conclusion',
            label: 'Conclusion',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'final-gv',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'conclu-gv',
                            title: 'Une énergie parfaitement orchestrée',
                            markdown: `
La force de *La Grande Vague* ne tient pas à la quantité de détails,  
mais à la **justesse du rythme**.

Une grande courbe, quelques droites, un Mont Fuji immobile.  
Et tout l’équilibre est là.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
    ],
};

/* ---------------------------------
 * CATALOGUE PRINCIPAL
 * --------------------------------- */

export const ANALYSES: Article[] = [lireUnTableauEn4Etapes, lignesDeForce, nuitEtoilee, jeuneFillePerle, guernica, grandeVague];

/* ---------------------------------
 * HELPERS
 * --------------------------------- */

export function getAnalysisBySlug(slug: string): Article | undefined {
    return ANALYSES.find((a) => a.slug === slug);
}
