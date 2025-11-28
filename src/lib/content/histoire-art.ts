// src/lib/content/histoire-art.ts
import type { Article } from '@/types/article';

/* -------------------------------------------------------------------------- */
/* 1) RENAISSANCE                                                             */
/* -------------------------------------------------------------------------- */

const renaissanceSansJargon: Article = {
    slug: 'renaissance-sans-jargon',
    title: 'La Renaissance sans jargon',
    excerpt: 'Perspective, humanisme, lumière : les repères essentiels pour comprendre pourquoi la Renaissance a tout changé, sans cours magistral ni dates à apprendre par cœur.',
    level: 'beginner',
    format: 'art-history',
    pillar: 'histoire-de-l-art',
    subcategory: 'hi-grandes-periodes',
    readingTime: '8 min',
    coverImage: '/images/articles/exemple-histoire-1.png',
    publishedAt: '2025-03-10',
    hero: {
        src: '/images/articles/exemple-histoire-1.png',
        alt: 'Détails de fresques de la Renaissance avec architecture en perspective',
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
La Renaissance, on en entend parler partout : dans les musées, les livres d’histoire, les documentaires.  
Mais dès qu’on creuse un peu, on tombe vite sur du jargon : humanisme, perspective linéaire, mécénat, etc.

L’idée ici n’est pas de tout savoir.  
C’est de comprendre **pourquoi** cette période a autant compté pour les images que l’on regarde encore aujourd’hui.

En quelques minutes, tu vas :
- situer la Renaissance dans les grandes lignes,
- comprendre ce qui change dans la façon de représenter le monde,
- repérer quelques repères simples pour reconnaître un tableau de cette période.

Pas d’examen, pas de frise chronologique à mémoriser.  
Juste des **repères clairs, respirables**.
                    `.trim(),
                },
            ],
        },
        {
            id: 'contexte',
            anchorId: 'contexte',
            label: 'Situer la Renaissance',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'contexte-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'contexte-text',
                            title: 'Où et quand, en gros ?',
                            markdown: `
On pourrait écrire des pages entières sur la chronologie, mais tu as surtout besoin d’un **ordre de grandeur**.

On résume :
- **Où ?** Principalement en Italie (Florence, Rome, Venise), puis dans le reste de l’Europe.  
- **Quand ?** En gros du **XVe au XVIe siècle** (les années 1400–1500).  
- **Quoi ?** Un moment où l’on réinvente la façon de représenter le monde, le corps, l’espace et la lumière.

Ce qui compte, ce n’est pas de retenir des dates, mais de sentir que la Renaissance est un **moment de bascule** :
on quitte un monde très symbolique (Moyen Âge) pour un monde où l’on cherche à représenter le réel…  
sans pour autant abandonner le spirituel.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
        {
            id: 'trois-idees',
            anchorId: 'trois-idees',
            label: '3 idées clés à retenir',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'trois-idees-cols',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'idee-1',
                            title: '1. L’humain au centre',
                            markdown: `
Avec la Renaissance, on remet l’**être humain** au cœur de l’image.

Ça ne veut pas dire qu’on ne parle plus de religion — au contraire.  
Mais les personnages deviennent plus :
- incarnés,
- expressifs,
- physiques,
- présents.

Les corps sont observés, étudiés, dessinés d’après modèle.  
On cherche à comprendre la **chair**, pas seulement à symboliser des figures saintes.
                            `.trim(),
                        },
                        {
                            kind: 'rich-text',
                            id: 'idee-2',
                            title: '2. L’espace devient cohérent',
                            markdown: `
C’est le moment où la **perspective** se structure.

On cherche à représenter :
- la profondeur,
- le sol qui s’éloigne,
- les bâtiments qui diminuent avec la distance.

Pour l’œil moderne, cela paraît « normal ».  
Mais à l’époque, c’est une petite révolution :  
on passe d’images symboliques à des images qui ressemblent davantage au **regard** humain.
                            `.trim(),
                        },
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'idee-3',
                            title: '3. La lumière raconte quelque chose',
                            markdown: `
La lumière n’est plus seulement un fond doré ou un à-plat uniforme.

Elle :
- éclaire les volumes,
- modèle les visages,
- situe le moment de la journée,
- crée l’ambiance (doux, dramatique, intime, solennel).

C’est une lumière **dirigée**, souvent douce, qui vient d’un côté et révèle les formes.

À partir de là, tu peux déjà te poser trois questions devant un tableau Renaissance :
1. Comment le corps est-il représenté ?  
2. Comment l’espace est-il construit ?  
3. Que fait la lumière ?
                            `.trim(),
                        },
                    ],
                },
            ],
        },
        {
            id: 'exemple-guide',
            anchorId: 'exemple-guide',
            label: 'Un exemple guidé',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'exemple-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'exemple-text',
                            title: 'Regarder un tableau de la Renaissance en 3 temps',
                            markdown: `
Tu peux t’exercer avec n’importe quel tableau de la Renaissance (Botticelli, Léonard de Vinci, Raphaël, etc.).
L’idée n’est pas de reconnaître l’auteur, mais d’observer **comment** l’image est construite.

### 1. D’abord les grandes masses

- Où sont les personnages ?
- Où se trouve le fond (architecture, paysage…) ?
- Qui occupe le centre de l’image ?  

Tu verras souvent une composition très structurée, presque architecturale.

### 2. Puis les corps

- Les proportions semblent-elles réalistes ?
- Les gestes sont-ils théâtraux, calmes, contenus ?
- Le drapé suit-il les volumes du corps ?

On sent une volonté d’**observer le corps humain**, de le rendre crédible.

### 3. Enfin, la lumière

- D’où vient-elle ?
- Est-elle douce ou très contrastée ?
- Que met-elle en valeur : un visage, une main, un geste, un objet ?

La lumière te raconte souvent **où regarder d’abord**.
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
                            title: 'Reconnaître une œuvre de la Renaissance en 60 secondes',
                            markdown: `
La prochaine fois que tu vois un tableau au musée ou dans un livre, demande-toi :

1. **Le corps est-il au centre de l’image ?**  
   → Si oui, c’est un premier indice.

2. **L’espace semble-t-il organisé en profondeur ?**  
   → Sol en perspective, bâtiments qui s’éloignent, lignes qui convergent.

3. **La lumière modèle-t-elle vraiment les volumes ?**  
   → Ombres douces, relief des visages, plis des vêtements.

Si tu réponds « oui » à ces trois questions, il y a de bonnes chances que tu sois en terrain Renaissance (ou très proche).
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
                            title: 'La Renaissance comme point de repère, pas comme examen',
                            markdown: `
Tu n’as pas besoin de devenir spécialiste de la Renaissance.

Mais en comprenant :
- que l’humain revient au centre,
- que l’espace devient crédible,
- que la lumière sculpte les formes,

tu gagnes une chose précieuse :  
un **repère** pour lire beaucoup d’images, avant et après cette période.

La Renaissance, c’est un peu comme un carrefour :  
à partir d’elle, tu verras autrement le Moyen Âge, le Baroque, le Classicisme… et même certaines images contemporaines.

L’important n’est pas de tout retenir.  
C’est d’avoir envie de revenir voir, de comparer, de t’arrêter un peu plus longtemps devant une œuvre.

C’est exactement là que l’histoire de l’art devient vivante.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
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
                            label: 'PDF “La Renaissance sans jargon”',
                            description: 'La version complète de l’article, à relire tranquillement hors écran.',
                            href: '/downloads/articles/renaissance-sans-jargon.pdf',
                            badge: 'PDF',
                        },
                        {
                            label: 'Fiche mémo “3 repères pour reconnaître la Renaissance”',
                            description: 'Une petite fiche à imprimer pour tes visites de musée.',
                            href: '/downloads/fiches/fiche-renaissance-3-reperes.pdf',
                            badge: 'À imprimer',
                        },
                    ],
                },
            ],
        },
    ],
};

/* -------------------------------------------------------------------------- */
/* 2) BAROQUE SANS PANIQUE                                                    */
/* -------------------------------------------------------------------------- */

const baroqueSansPanique: Article = {
    slug: 'baroque-sans-panique',
    title: 'Le Baroque sans panique',
    excerpt: 'Mouvement, torsion, lumière dramatique : comment reconnaître un tableau baroque en quelques repères simples, sans t’y perdre.',
    level: 'beginner',
    format: 'art-history',
    pillar: 'histoire-de-l-art',
    subcategory: 'hi-mouvements-et-styles',
    readingTime: '9 min',
    coverImage: '/images/articles/exemple-histoire-2.png',
    publishedAt: '2025-03-20',
    hero: {
        src: '/images/articles/exemple-histoire-2.png',
        alt: 'Détail d’un tableau baroque avec drapé et lumière dramatique',
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
Le mot “baroque” fait souvent peur : on pense à quelque chose de chargé, compliqué, dramatique.  
Et c’est un peu vrai… mais c’est aussi ce qui fait sa force.

Le but de cet article : te donner **quelques repères concrets** pour reconnaître un tableau baroque,  
et comprendre ce qui s’y joue, sans vocabulaire technique ni exposé interminable.

On va surtout regarder :
- le mouvement,
- la lumière,
- les émotions.

Tu verras : une fois que tu les as repérés, tu ne peux plus les “dé-détecter”.
                    `.trim(),
                },
            ],
        },
        {
            id: 'repères',
            anchorId: 'reperes',
            label: 'Repères visuels',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'reperes-cols',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'reperes-mouvement',
                            title: '1. Ça bouge dans tous les sens',
                            markdown: `
Le Baroque adore le **mouvement**.

Tu verras souvent :
- des corps en torsion,
- des drapés qui tourbillonnent,
- des diagonales fortes,
- des gestes amplifiés.

On quitte la stabilité calme de la Renaissance pour quelque chose de plus théâtral, plus dramatique, presque cinématographique.
                            `.trim(),
                        },
                        {
                            kind: 'rich-text',
                            id: 'reperes-lumiere',
                            title: '2. Une lumière très contrastée',
                            markdown: `
La lumière baroque, c’est rarement une lumière douce.

Souvent :
- de fortes zones d’ombre,
- des zones très éclairées,
- un faisceau précis qui met en scène un personnage ou un geste.

Ce contraste s’appelle le **clair-obscur**.  
Il sert à guider ton regard et à charger la scène d’intensité.
                            `.trim(),
                        },
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'reperes-emotion',
                            title: '3. Des émotions visibles',
                            markdown: `
Les personnages baroques ne sont pas neutres.

Tu verras :
- des visages bouleversés,
- des mains très expressives,
- des scènes de révélation, d’extase, de drame.

Tout est fait pour que tu **ressentes** quelque chose, pas seulement pour que tu comprennes l’histoire.
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
                            title: '3 questions pour repérer un tableau baroque',
                            markdown: `
Devant une image qui te semble baroque, pose-toi ces questions :

1. **Les corps sont-ils calmes ou en tension ?**  
2. **La lumière est-elle douce… ou très contrastée ?**  
3. **Les émotions sont-elles discrètes ou très visibles ?**

Si tu as trois fois “intense / contrasté / en tension”,  
tu es probablement en plein Baroque.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
    ],
};

/* -------------------------------------------------------------------------- */
/* 3) CARAVAGE : LUMIÈRE & OMBRE                                              */
/* -------------------------------------------------------------------------- */

const caravageLumiereOmbre: Article = {
    slug: 'caravage-lumiere-et-ombre',
    title: 'Caravage : apprendre à regarder la lumière et l’ombre',
    excerpt: 'Un peintre, une obsession : la lumière qui découpe les corps dans la nuit. Un excellent terrain de jeu pour entraîner ton regard au clair-obscur.',
    level: 'intermediate',
    format: 'art-history',
    pillar: 'histoire-de-l-art',
    subcategory: 'hi-mouvements-et-styles',
    readingTime: '10 min',
    coverImage: '/images/articles/exemple-histoire-2.png',
    publishedAt: '2025-03-28',
    hero: {
        src: '/images/articles/exemple-histoire-2.png',
        alt: 'Détail d’un tableau du Caravage avec fort clair-obscur',
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
Regarder un tableau du Caravage, c’est comme être dans une pièce très sombre où une seule fenêtre laisse entrer la lumière.

Tout à coup :
- un visage apparaît,
- une main s’illumine,
- une scène se découpe dans l’obscurité.

Cet article te propose une chose simple : utiliser Caravage pour apprendre à **lire la lumière et l’ombre** dans une image.
                    `.trim(),
                },
            ],
        },
        {
            id: 'principe',
            anchorId: 'principe',
            label: 'Un principe simple',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'principe-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'principe-text',
                            title: 'Une lumière, un geste, une histoire',
                            markdown: `
Chez Caravage, la lumière n’est pas un décor.  
Elle est presque un **personnage**.

Souvent :
- elle vient d’un côté, hors champ,
- elle éclaire violemment un visage ou une main,
- elle laisse le reste du corps dans l’ombre.

Résultat :
- tu sais **où regarder**,
- tu comprends **ce qui est important** dans la scène,
- tu ressens **l’intensité** du moment.

C’est une excellente école pour entraîner ton œil :
> Où la lumière frappe-t-elle en premier ?  
> Que te montre-t-elle ?  
> Que te cache-t-elle ?
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
                            title: 'Tracer la lumière avec le doigt',
                            markdown: `
Devant une reproduction du Caravage (ou sur une image à l’écran),  
pose ton doigt là où la lumière est la plus forte, puis suis son chemin :

- d’abord la zone la plus claire,  
- puis les zones moyennes,  
- enfin, les ombres profondes.

Tu peux même imaginer que tu “peins” la lumière avec ton doigt.  
Cet exercice très simple change déjà la façon dont tu regardes **tous** les tableaux ensuite.
                            `.trim(),
                        },
                    ],
                },
            ],
        },
    ],
};

/* -------------------------------------------------------------------------- */
/* 4) FEMMES ARTISTES OUBLIÉES                                                */
/* -------------------------------------------------------------------------- */

const femmesArtistesOubliees: Article = {
    slug: 'femmes-artistes-oubliees',
    title: 'Femmes artistes oubliées : 3 trajectoires à remettre en lumière',
    excerpt: 'Trois parcours d’artistes longtemps effacées des manuels, pour montrer que l’histoire de l’art est aussi faite de voix qu’on n’a pas assez écoutées.',
    level: 'intermediate',
    format: 'art-history',
    pillar: 'histoire-de-l-art',
    subcategory: 'hi-figures-oubliees',
    readingTime: '9 min',
    coverImage: '/images/articles/exemple-histoire-1.png',
    publishedAt: '2025-04-02',
    hero: {
        src: '/images/articles/exemple-histoire-1.png',
        alt: 'Détail de plusieurs tableaux peints par des femmes artistes',
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
Quand on pense “grands artistes”, on cite souvent les mêmes noms : Michel-Ange, Rembrandt, Picasso…  
Mais où sont les femmes dans cette histoire-là ?

Elles ont pourtant peint, sculpté, gravé, enseigné, innové.  
Le problème, ce n’est pas leur absence de talent : c’est **leur invisibilisation**.

Dans cet article, on ne cherche pas à faire une liste exhaustive.  
On prend juste trois trajectoires, comme trois petites lanternes dans le temps.
                    `.trim(),
                },
            ],
        },
        {
            id: 'portraits',
            anchorId: 'portraits',
            label: 'Trois portraits',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'portraits-cols',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'artiste-1',
                            title: '1. Une peintre de cour effacée des récits',
                            markdown: `
Première figure : une artiste qui travaille pour les puissants de son époque,  
mais dont les œuvres ont longtemps été attribuées… à des hommes de son entourage.

On parle de :
- commandes officielles,
- portraits politiques,
- négociations constantes pour signer ou non ses œuvres.

Ce que ça raconte aujourd’hui :  
**la difficulté d’exister dans un système qui ne te nomme pas.**
                            `.trim(),
                        },
                        {
                            kind: 'rich-text',
                            id: 'artiste-2',
                            title: '2. Une peintre de l’intime',
                            markdown: `
Deuxième figure : une artiste centrée sur le quotidien, les intérieurs, les gestes simples.

Elle peint :
- des scènes domestiques,
- des femmes au travail,
- des moments silencieux.

Ce qu’on découvre :  
l’histoire de l’art ne se joue pas seulement dans les grandes batailles et les scènes héroïques,  
mais aussi dans la **vie ordinaire**, longtemps jugée “mineure”.
                            `.trim(),
                        },
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'artiste-3',
                            title: '3. Une trajectoire brisée, redécouverte tard',
                            markdown: `
Troisième figure : une artiste dont l’œuvre est restée dans un grenier ou dans des collections privées pendant des décennies.

Ce que son histoire raconte :
- des carrières écourtées,
- des œuvres non exposées,
- des archives dispersées.

La redécouverte tardive de ces artistes change notre regard :  
on se rend compte que ce qu’on appelle “canon” est aussi une **construction**.
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
                            title: 'Regarder l’histoire de l’art autrement',
                            markdown: `
Ce n’est pas parce qu’un nom n’apparaît pas dans les manuels qu’il n’a pas compté.

S’intéresser aux **figures oubliées**, ce n’est pas faire de la “correction politique” :  
c’est agrandir le cadre, ajouter des voix, des gestes, des points de vue.

La prochaine fois que tu visites une expo, demande-toi simplement :
- qui est nommé ?
- qui ne l’est pas ?
- quelles images manquent ?

C’est déjà une manière très concrète de pratiquer une **histoire de l’art plus vivante, plus inclusive**.
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

export const ART_HISTORY_ARTICLES: Article[] = [renaissanceSansJargon, baroqueSansPanique, caravageLumiereOmbre, femmesArtistesOubliees];

export function getArtHistoryBySlug(slug: string): Article | undefined {
    return ART_HISTORY_ARTICLES.find((article) => article.slug === slug);
}
