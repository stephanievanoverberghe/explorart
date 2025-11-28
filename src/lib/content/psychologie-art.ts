// src/lib/content/psychologie-art.ts
import type { Article } from '@/types/article';

/* -------------------------------------------------------------------------- */
/* 1) PEUR DE SE LANCER                                                       */
/* -------------------------------------------------------------------------- */

const apprivoiserPeurSeLancer: Article = {
    slug: 'apprivoiser-la-peur-de-se-lancer',
    title: 'Apprivoiser la peur de se lancer',
    excerpt: 'Pourquoi ta main se fige juste avant de commencer… et comment transformer cette peur en point de départ doux plutôt qu’en blocage permanent.',
    level: 'beginner',
    format: 'art-psychology',
    pillar: 'psychologie-de-l-art',
    subcategory: 'pa-blocages-et-peurs',
    readingTime: '8 min',
    coverImage: '/images/articles/exemple-psy-1.png',
    publishedAt: '2025-03-15',
    hero: {
        src: '/images/articles/exemple-psy-1.png',
        alt: 'Main hésitante au-dessus d’une feuille blanche',
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
Tu connais peut-être ce moment étrange :  

- le carnet est ouvert,  
- le crayon est dans ta main,  
- l’idée est là…  

et pourtant, **rien ne vient**.

Ce n’est pas que tu n’as pas envie.  
C’est que quelque chose se resserre à l’intérieur :

- “Et si c’est nul ?”
- “Et si je gâche la page ?”
- “Et si je n’y arrive pas ?”

Cet article n’est pas là pour te dire “n’aie plus peur”.  
Il est là pour t’aider à **comprendre d’où vient cette peur**,  
et surtout comment **créer avec elle**, pas contre elle.
                    `.trim(),
                },
            ],
        },
        {
            id: 'd-ou-vient-la-peur',
            anchorId: 'd-ou-vient-la-peur',
            label: 'D’où vient cette peur ?',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'peur-origines-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'peur-origines',
                            title: 'Ce n’est pas un défaut, c’est un réflexe de protection',
                            markdown: `
Ton cerveau n’essaie pas de te saboter.  
Il essaie de te **protéger**.

De quoi ?
- du jugement des autres,
- de la possibilité de rater,
- du malaise de te sentir “pas à la hauteur”.

Il préfère que tu ne fasses rien plutôt que tu ressentes la honte, la déception ou la comparaison.

La peur de se lancer est donc souvent :
- un **excès de protection**,
- cumulé avec des expériences passées (critiques, moqueries, prof dur…),
- nourri par ce que tu vois sur les réseaux (tout le monde “meilleur” que toi).
                            `.trim(),
                        },
                    ],
                },
            ],
        },
        {
            id: 'signes',
            anchorId: 'signes',
            label: 'Comment elle se manifeste',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'signes-cols',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'signes-concrets',
                            title: 'Signes concrets',
                            markdown: `
Chez beaucoup de personnes créatives, la peur de se lancer ressemble à :

- tout préparer… mais ne jamais commencer,
- changer d’idée au dernier moment,
- chercher “le bon matériel” avant de s’y mettre,
- remettre à demain, puis à plus tard, puis à “un jour”.

En surface, ça ressemble à de la **procrastination**.  
En profondeur, c’est souvent juste **de la peur**.
                            `.trim(),
                        },
                    ],
                    right: [
                        {
                            kind: 'encart',
                            id: 'signes-interieurs',
                            tone: 'soft',
                            size: 'compact',
                            title: 'Signes intérieurs',
                            markdown: `
À l’intérieur, tu peux ressentir :

- un petit nœud dans le ventre,
- un souffle plus court,
- une voix qui répète “ce n’est pas assez bien”.

Si tu te reconnais là-dedans, ça ne veut pas dire que tu n’es pas fait·e pour créer.  
Ça veut dire que **tu tiens beaucoup à ce que tu fais**. Et ça, c’est précieux.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
        {
            id: 'petits-deplacements',
            anchorId: 'petits-deplacements',
            label: 'Déplacer la pression',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'deplacements-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'deplacements-text',
                            title: 'Passer de “réussir un dessin” à “faire un geste”',
                            markdown: `
La peur se nourrit de l’idée que **chaque dessin doit prouver quelque chose**.

Et si tu changeais de contrat intérieur ?

- au lieu de : “Je dois réussir cette page”  
- essayer : “Je veux juste poser **un geste** aujourd’hui.”

Un geste, ce peut être :
- une seule page de lignes,
- une couleur posée sur un coin de feuille,
- un croquis de 2 minutes, même tremblant.

Ta valeur ne se joue pas sur ce dessin.  
Ce dessin n’est pas un examen, c’est **un essai**.
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
                            title: 'Le “trait de permission”',
                            markdown: `
La prochaine fois que tu bloques devant une feuille :

1. Pose ton crayon.
2. Écris en haut de la page :  
   > “Cette page a le droit d’être ratée.”
3. Trace un seul trait, n’importe lequel, même moche, même inutile.
4. Referme le carnet si tu veux.

Tu viens d’envoyer un message clair à ton cerveau :  
**“Je ne cherche pas à être parfait·e. Je cherche à être présent·e.”**

Ce petit rituel, répété, fait fondre peu à peu la peur.
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
                            title: 'Tu n’as pas à être “courageux·se”, juste honnête',
                            markdown: `
Tu n’es pas obligé·e de devenir intrépide.

Tu peux juste reconnaître :

- “Oui, ça me fait peur.”
- “Oui, j’ai envie quand même.”
- “Je vais y aller par petits gestes.”

Chaque fois que tu crées **malgré** la peur, même un tout petit peu,  
tu agrandis ton espace intérieur.

C’est ça, la vraie psychologie de l’art :  
pas des grands concepts, mais des micro-déplacements qui rendent la création possible.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
    ],
};

/* -------------------------------------------------------------------------- */
/* 2) PERFECTIONNISME                                                         */
/* -------------------------------------------------------------------------- */

const perfectionnismeArtisteDoux: Article = {
    slug: 'perfectionnisme-dans-l-art-apprendre-a-l-apaiser',
    title: "Perfectionnisme dans l'art : apprendre à l’apaiser",
    excerpt: 'Quand chaque dessin doit être “le meilleur”, la création devient lourde. Comment transformer ton exigence en alliée au lieu qu’elle t’empêche de faire.',
    level: 'intermediate',
    format: 'art-psychology',
    pillar: 'psychologie-de-l-art',
    subcategory: 'pa-confiance-creative',
    readingTime: '9 min',
    coverImage: '/images/articles/exemple-psy-2.png',
    publishedAt: '2025-03-22',
    hero: {
        src: '/images/articles/exemple-psy-2.png',
        alt: 'Personne qui gomme intensément un dessin sur un carnet',
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
                    id: 'intro-perfectionnisme',
                    markdown: `
Le perfectionnisme est souvent confondu avec le **sérieux** ou la **passion**.

En réalité, il ressemble plutôt à :
- un prof intérieur qui ne sourit jamais,
- un correcteur rouge sur chaque geste,
- un “ce n’est pas assez” qui revient encore et encore.

Cet article ne va pas essayer de “t’enlever” ton exigence.  
Il va t’aider à la **doser**, pour qu’elle devienne un soutien plutôt qu’un frein.
                    `.trim(),
                },
            ],
        },
        {
            id: 'mecanisme',
            anchorId: 'mecanisme',
            label: 'Comment fonctionne le perfectionnisme',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'mecanisme-cols',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'mecanisme-1',
                            title: 'Un écart entre idéal et réalité',
                            markdown: `
Dans ta tête, il y a souvent :

- une **image idéale** de ce que tu voudrais faire,
- le dessin réel qui apparaît sur la feuille.

Le perfectionnisme, c’est ce qui se produit quand tu confonds :

> “Ce dessin n’atteint pas mon idéal”  
> avec  
> “Je suis nul·le / je n’ai aucun talent”.

L’écart est normal.  
La blessure vient de la façon dont tu l’interprètes.
                            `.trim(),
                        },
                    ],
                    right: [
                        {
                            kind: 'encart',
                            id: 'mecanisme-2',
                            tone: 'soft',
                            size: 'compact',
                            title: 'Un idéal qui s’éloigne',
                            markdown: `
Plus tu progresses, plus ton regard devient fin.

Résultat :  
ton idéal grandit **plus vite** que tes compétences.

Cela ne veut pas dire que tu régresses.  
Cela veut dire que tu vois mieux ce qui manque.

Le perfectionnisme, c’est souvent **un regard affûté sans assez de douceur pour l’accompagner**.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
        {
            id: 'effets',
            anchorId: 'effets',
            label: 'Effets sur ta pratique',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'effets-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'effets-text',
                            title: 'Quand l’exigence mange le plaisir',
                            markdown: `
Le perfectionnisme peut :

- t’empêcher de finir tes dessins,
- te faire recommencer sans cesse,
- te faire abandonner un projet au premier “défaut”,
- t’interdire d’essayer quelque chose de nouveau.

La création devient alors :
- un terrain de performance,
- au lieu d’un **lieu de recherche**.

Pourtant, toute progression artistique se fait **dans** l’imperfection, pas en l’évitant.
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
                            title: 'Le dessin “exprès imparfait”',
                            markdown: `
Choisis un sujet **très simple** (une tasse, une chaise, ta main).

Consigne :  
tu vas le dessiner **exprès imparfait**.

- autorise-toi des traits tremblés,
- n’efface pas,
- limite-toi à 5 minutes,
- interdiction de corriger à la fin.

Puis, à la fin, note simplement :

- ce qui te dérange,
- ce que tu trouves attachant ou vivant,
- ce que tu aurais envie d’essayer la prochaine fois.

L’idée n’est pas de “réussir” le dessin,  
mais de constater que **tu peux survivre à l’imperfection**…  
et parfois même y trouver quelque chose de plus vrai.
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
                    id: 'conclusion-perfectionnisme-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'conclusion-perfectionnisme-text',
                            title: 'Ton exigence n’est pas ton ennemie',
                            markdown: `
Le but n’est pas de devenir “cool” avec tout, tout le temps.

Ton exigence :
- t’aide à voir ce qui peut être amélioré,
- te pousse à affiner ton geste,
- te donne envie de progresser.

Ce qui change, c’est la **voix** avec laquelle tu te parles.

Au lieu de :  
> “C’est raté, tu n’es pas à la hauteur.”

Essayer :  
> “Ce n’est pas exactement ce que tu voulais,  
> mais qu’est-ce que tu viens d’apprendre ici ?”

La psychologie de l’art commence là :  
dans la façon dont tu commentes ton propre travail.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
    ],
};

/* -------------------------------------------------------------------------- */
/* 3) CYCLE BLOCAGE / CULPABILITÉ                                             */
/* -------------------------------------------------------------------------- */

const cycleBlocageCulpabilite: Article = {
    slug: 'sortir-du-cycle-blocage-culpabilite',
    title: 'Sortir du cycle blocage / culpabilité',
    excerpt: 'Je n’arrive pas à créer → je culpabilise → j’évite encore plus. Comment desserrer ce cercle et réintroduire de la douceur dans ta pratique.',
    level: 'intermediate',
    format: 'art-psychology',
    pillar: 'psychologie-de-l-art',
    subcategory: 'pa-blocages-et-peurs',
    readingTime: '10 min',
    coverImage: '/images/articles/exemple-psy-1.png',
    publishedAt: '2025-03-30',
    hero: {
        src: '/images/articles/exemple-psy-1.png',
        alt: 'Carnet fermé avec un crayon posé dessus, lumière douce',
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
                    id: 'intro-blocage',
                    markdown: `
Beaucoup de personnes créatives connaissent ce cycle :

1. Tu n’arrives pas à créer.
2. Tu culpabilises de ne pas créer.
3. Plus tu culpabilises, plus tu évites.
4. Plus tu évites, plus tu as peur de t’y remettre.

Ce n’est pas de la fainéantise.  
C’est un mélange de fatigue, de peur et d’attentes trop lourdes.

Cet article te propose une chose simple :  
**desserrer un peu l’étau**, pour que revenir à ton carnet ne soit plus une corvée ou un jugement.
                    `.trim(),
                },
            ],
        },
        {
            id: 'cycle',
            anchorId: 'le-cycle',
            label: 'Comprendre le cycle',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'cycle-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'cycle-text',
                            title: 'Ce qui se passe vraiment quand tu “fuis” ton carnet',
                            markdown: `
Quand tu évites de créer, tu évites rarement le dessin lui-même.  
Tu évites :

- la peur de ne pas y arriver,
- la comparaison avec ce que tu faisais “avant”,
- la déception de voir que tu as “rouillé”.

Ton système nerveux a déjà beaucoup à gérer dans ta vie.  
Il classe parfois la création dans la catégorie **“stress en plus”**.

La culpabilité n’aide pas :  
elle ajoute une couche de “tu devrais”, là où il faudrait surtout **du soutien**.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
        {
            id: 'micro-retour',
            anchorId: 'micro-retour',
            label: 'Revenir en douceur',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'micro-retour-cols',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'micro-retour-texte',
                            title: 'Revenir par la plus petite porte possible',
                            markdown: `
Au lieu de te dire :

> “Je dois reprendre sérieusement, faire une vraie séance, rattraper le temps perdu…”

Essaye de te poser une question différente :

> “Quel est le **plus petit geste** que je peux faire aujourd’hui pour me rapprocher de ma pratique ?”

Exemples :
- ouvrir ton carnet et le refermer,
- regarder un dessin que tu aimes,
- recopier un tout petit détail,
- faire un seul trait, une seule tache de couleur.

Le but n’est pas de “retrouver ton niveau”.  
Le but est de **recréer un lien**.
                            `.trim(),
                        },
                    ],
                    right: [
                        {
                            kind: 'encart',
                            id: 'micro-retour-consigne',
                            tone: 'pedagogic',
                            size: 'compact',
                            title: 'Règle : aucun jugement sur le geste du jour',
                            markdown: `
Consigne :  
le geste d’aujourd’hui est **injugeable**.

Tu n’as pas le droit de le qualifier de :
- nul,
- insuffisant,
- ridicule.

Tu peux juste te dire :
> “Aujourd’hui, c’est ça que j’ai pu faire. Et c’est déjà quelque chose.”
                            `.trim(),
                        },
                    ],
                },
            ],
        },
        {
            id: 'mini-rituel',
            anchorId: 'mini-rituel',
            label: 'Mini-rituel',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'mini-rituel-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'mini-rituel-text',
                            title: 'Le carnet “sans objectif”',
                            markdown: `
Si tu peux, consacre un carnet uniquement à ça :  
les jours où tu **n’as pas d’énergie**, mais où tu veux garder le lien.

Dans ce carnet :
- pas de projet,
- pas de “belles pages”,
- juste des traces : gribouillages, mots, formes, couleurs.

Tu peux décider que personne ne le verra jamais.

C’est ton espace **anti-pression**.  
Un endroit où tu peux continuer à être en relation avec ton art, même quand tu traverses une période compliquée.
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
                    id: 'conclusion-blocage-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'conclusion-blocage-text',
                            title: 'Tu as le droit d’avoir des saisons',
                            markdown: `
Ta créativité n’est pas une machine.

Elle fonctionne par **saisons** :
- des moments pleins,
- des moments creux,
- des moments de semis invisibles.

Sortir du cycle blocage / culpabilité, ce n’est pas “produire tout le temps”.  
C’est accepter que :

- parfois tu crées beaucoup,
- parfois tu as besoin de récupérer,
- parfois tu traverses juste.

Ce qui compte, c’est de garder un petit fil, même très fin, avec ce qui t’importe.  
Un trait par-ci, une couleur par-là.  

C’est souvent ça qui, un jour, rouvre grandes les portes.
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

export const ART_PSYCHOLOGY_ARTICLES: Article[] = [apprivoiserPeurSeLancer, perfectionnismeArtisteDoux, cycleBlocageCulpabilite];

export function getArtPsychologyBySlug(slug: string): Article | undefined {
    return ART_PSYCHOLOGY_ARTICLES.find((article) => article.slug === slug);
}
