// src/lib/content/tutorials.ts

import type { Tutorial, TutorialSection, TutorialBlock, TutorialRelatedPost } from '@/types/tutorial';

const oserLePremierTrait: Tutorial = {
    slug: 'oser-le-premier-trait',
    title: 'Oser le premier trait : 3 exercices doux pour délier la main',
    excerpt: 'Trois exercices très simples pour réveiller la main, la délier, et sentir le geste devenir plus libre.',
    level: 'beginner',
    pillar: 'dessin-peinture',
    format: 'tutorial',
    readingTime: '8 min',
    coverImage: '/images/articles/dessiner-peindre/oser-premier-trait/hero.png',
    subcategory: 'dp-fondamentaux-du-dessin',
    publishedAt: '2025-01-20',
    hero: {
        src: '/images/articles/dessiner-peindre/oser-premier-trait/hero.png',
        alt: 'Main qui trace un premier trait sur une feuille blanche',
    },
    sections: [
        // 1) INTRO
        {
            id: 'intro',
            anchorId: 'intro',
            label: 'Introduction',
            blocks: [
                {
                    kind: 'rich-text',
                    id: 'intro',
                    markdown: `
Il y a, dans chaque début, un minuscule frisson.
Celui qui fait hésiter la main juste au-dessus du papier, comme si tracer une ligne était un acte décisif.
Mais rassure-toi : *le premier trait n’est pas un examen — c’est une respiration.*

Ce tutoriel t’invite à aborder le dessin comme on entre dans l’eau : lentement, doucement, avec curiosité.
Pas besoin d’être “doué”. Pas besoin de faire “beau”.
Seulement toi, un crayon, et trois exercices très simples pour réveiller la main, la délier, et sentir le geste devenir plus libre.

À la fin, tu découvriras :
- comment assouplir ta main sans forcer,
- comment relâcher la pression (au sens propre et figuré),
- et comment tracer un trait qui te ressemble.

Et si tu aimes apprendre en regardant, une vidéo accompagnera ces exercices pour t’aider à suivre les gestes pas à pas.
                    `.trim(),
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 2) AVANT DE COMMENCER
        {
            id: 'before-start',
            anchorId: 'avant-de-commencer',
            label: 'Avant de commencer',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'avant-de-commencer-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'image',
                            id: 'avant-de-commencer-hero',
                            src: '/images/articles/dessiner-peindre/oser-premier-trait/avant-commencer.png',
                            alt: 'Zoom sur un crayon posé au bord d’une feuille blanche',
                            caption: 'Le premier trait n’est pas un test : c’est un échauffement.',
                            emphasis: 'focus',
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'etat-esprit-avant',
                            tone: 'error',
                            size: 'compact',
                            title: 'Ce que tu n’as pas besoin de savoir',
                            markdown: `
Pour commencer ces exercices, tu n’as **PAS** besoin de :

- connaître les proportions, comprendre la perspective, maîtriser les ombres.
- savoir “bien dessiner”, tracer droit et faire beau

Tu as seulement besoin de : **un crayon, une feuille, et de la douceur pour toi-même.**
Cette décharge mentale est essentielle : c’est elle qui libère véritablement le geste.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'avant-de-commencer-texte',
                            title: 'Avant de commencer : apprivoiser la peur du premier trait',
                            markdown: `
### Pourquoi on bloque ? (psychologie simple, décomplexante)

Si ta main tremble ou se crispe au moment de tracer le premier trait, ce n’est pas un défaut : c’est un réflexe naturel.
Le cerveau n’aime pas l’inconnu et l’espace blanc lui paraît… intimidant.
Il te souffle : *“Ne te trompe pas.”*
C’est normal, c’est humain, et ça n’a rien à voir avec ton talent.

En réalité, ton blocage n’est qu’un signe que tu veux “bien faire”.
C’est une preuve de soin, pas une preuve d’incapacité.

### Le trait n’est pas un test : c’est un échauffement

On pense souvent que le premier trait doit être réussi. Mais aucun artiste, même avancé, ne commence par “réussir”.
Le premier trait, c’est l’équivalent d’un étirement avant de courir. Il sert à :
- réveiller ton poignet
- ajuster la pression
- tester la glisse du crayon
- entrer doucement dans le geste

Il n’a aucune obligation esthétique. Il n’a qu’un rôle : t’amener au **deuxième trait**, celui où tu commences vraiment.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 3) MATÉRIEL + MINI-RITUEL
        {
            id: 'material-ritual',
            anchorId: 'materiel',
            label: 'Matériel & mini-rituel',
            blocks: [
                // 🟢 CARTE 1 — MATÉRIEL
                {
                    kind: 'two-cols',
                    id: 'materiel-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'materiel',
                            title: 'Matériel minimal (et suffisant)',
                            markdown: `
Tu n’as pas besoin d’un atelier d’artiste, de matériel coûteux ou d’un carnet en cuir qui sent la bibliothèque ancienne.

Pour délier la main, trois choses suffisent — vraiment.

### Le crayon idéal

N’importe quel crayon fera l’affaire, mais si tu as le choix, privilégie un crayon **HB** ou **2B**. Ils glissent facilement, ne demandent pas de force, et pardonnent les hésitations.

Un conseil doux : choisis un crayon que tu *aimes* tenir. Parfois, le confort du geste commence par le confort de l’objet.

### Le papier : grain, douceur, confort

Une simple feuille d’imprimante fonctionne très bien. Pas besoin de feuille professionnelle. Mais si tu veux un petit plus : un papier légèrement grainé permet au crayon d’accrocher et rend la main plus consciente de ses mouvements.

Le plus important : **un support sur lequel tu n’as pas peur de te tromper.**

### La posture simple

Pas de truc compliqué :
- épaules basses, dos naturel et pas rigide, poignet posé mais libre
- feuille légèrement inclinée

Ton corps doit comprendre que tu t’apprêtes à faire quelque chose de doux, pas un concours.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'image',
                            id: 'materiel-photo',
                            src: '/images/articles/dessiner-peindre/oser-premier-trait/materiel.png',
                            alt: 'Crayon simple et carnet posé sur une table en bois',
                            caption: 'Un crayon, une feuille : largement suffisant pour commencer.',
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'si-tu-nas-rien-sous-la-main',
                            tone: 'soft',
                            size: 'compact',
                            title: 'Si tu n’as rien sous la main',
                            markdown: `
Tu peux pratiquer **immédiatement**, même sans matériel “parfait”. Tout fonctionne :

- un stylo
- un vieux cahier
- un bloc-notes du bureau
- un carnet de courses
- une feuille déjà gribouillée au verso

L’important, c’est *le geste*, pas le support.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,

                // 🟣 CARTE 2 — MINI-RITUEL
                {
                    kind: 'two-cols',
                    id: 'mini-rituel-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'mini-rituel',
                            title: 'Mini-rituel : délier la main en 30 secondes',
                            markdown: `
Avant de tracer le moindre trait, offre-toi un bref moment. Juste trente secondes. C’est tout ce qu’il faut pour éviter que ta main se crispe et pour installer un geste plus fluide, plus vivant.

### Le souffle

Inspire doucement. Expire lentement. Laisse ton corps comprendre que tu n’es pas en train de “performer”, mais d’explorer. Un souffle ralenti suffit à calmer le tremblement du premier trait.

### Le poids de la main

Pose ta main sur le papier, sans crayon. Laisse-la glisser un peu, libre, légère. Observe le poids naturel de tes doigts : c’est lui qui dessinera, pas ta force.

C’est souvent cet instant simple qui débloque tout.

### La pression du crayon

Prends ton crayon et, avant de tracer, teste trois pressions :
- très légère
- douce
- un peu plus appuyée

Ressens ce qui est le plus confortable aujourd’hui. Tu n’as pas besoin d’être constant·e : tu as juste besoin d’être **présent·e**.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'encart',
                            id: 'check-express',
                            tone: 'question',
                            title: 'Check express avant de tracer',
                            markdown: `
Juste avant de poser ton premier trait, pose-toi ces trois micro-questions :

- Mes épaules sont-elles relâchées ?
- Mon souffle est-il calme ?
- Mon poignet peut-il bouger sans tension ?

Si la réponse est “oui” à au moins deux d’entre elles, tu es prêt·e.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'image',
                            id: 'rituel-image',
                            src: '/images/articles/dessiner-peindre/oser-premier-trait/mini-rituel.png',
                            alt: 'Main posée sur une feuille, prête à tracer',
                            caption: 'Un petit rituel avant de dessiner peut tout changer.',
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 4) VIDÉO
        {
            id: 'video',
            anchorId: 'video-tutoriel',
            label: 'Vidéo du tutoriel',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'video-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'video',
                            id: 'video-tutoriel',
                            url: 'https://www.youtube.com/embed/eNuOpMOPorU',
                            caption: 'Suis le tutoriel en vidéo, geste par geste.',
                            cover: {
                                src: '/images/articles/dessiner-peindre/oser-premier-trait/hero.png',
                                alt: 'Main qui trace un premier trait sur une feuille blanche',
                            },
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'video-title',
                            title: 'La vidéo du tutoriel',
                            markdown: `
Tu verras :
- comment j’échauffe ma main avant chaque exercice,
- comment je place mes doigts pour éviter la crispation,
- comment les lignes libres se dessinent sans chercher la perfection,
- comment les cercles imparfaits deviennent un petit rythme apaisant,
- comment le trait lent ouvre un espace calme, presque méditatif.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'video-conseil',
                            tone: 'soft',
                            size: 'compact',
                            title: 'Conseil pour regarder la vidéo',
                            markdown: `
Regarde-la une première fois sans dessiner, juste pour sentir le rythme. Puis prends ton crayon, et refais chaque geste avec moi.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 5) EXERCICES (onglets)
        {
            id: 'exercises',
            anchorId: 'exercices',
            label: 'Les exercices',
            blocks: [
                {
                    kind: 'exercises-group',
                    id: 'exercises-group',
                    items: [
                        {
                            id: 'exercice-1',
                            label: 'Exercice 1 — Lignes libres',
                            blocks: [
                                {
                                    kind: 'two-cols',
                                    id: 'exercice-1-section',
                                    hero: {
                                        src: '/images/articles/dessiner-peindre/oser-premier-trait/exercice-1.png',
                                        alt: 'Page remplie de lignes libres dans toutes les directions',
                                        caption: 'Les lignes libres : un terrain de jeu sans jugement.',
                                    },
                                    layout: 'balanced',
                                    variant: 'section-card',
                                    left: [
                                        {
                                            kind: 'rich-text',
                                            id: 'exercice-1-texte',
                                            title: 'Exercice 1 : Les lignes libres',
                                            markdown: `
### Objectif de l’exercice

Cet exercice est le plus simple… et pourtant, c’est l’un des plus puissants.

Il sert à casser la rigidité, à ouvrir la main, à réveiller le poignet.
Tu vas tracer des lignes sans but, sans règle, sans jugement.

### Étapes

1. Pose ta main sur la feuille.
2. Trace une ligne horizontale, sans réfléchir.
3. Trace-en une deuxième, un peu plus rapide.
4. Puis une troisième, plus lente.
5. Continue : longues, courtes, légères, appuyées…
6. Alterne : horizontales, verticales, diagonales.
7. Laisse ta main varier naturellement.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                    right: [
                                        {
                                            kind: 'encart',
                                            id: 'exercice-1-variantes',
                                            tone: 'pedagogic',
                                            size: 'compact',
                                            title: 'Variantes à explorer',
                                            markdown: `
- **Très lentes** → pour sentir chaque millimètre.
- **Très rapides** → pour casser le contrôle.
- **Très longues** → pour mobiliser tout le bras.
- **Très courtes** → pour réveiller la précision douce.
- **En zigzag** → pour assouplir le poignet.
- **En “pluie”** → lignes verticales irrégulières, très libératrices.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                        {
                                            kind: 'encart',
                                            id: 'exercice-1-erreurs',
                                            tone: 'error',
                                            size: 'compact',
                                            title: 'Erreurs courantes (à éviter)',
                                            markdown: `
- Appuyer trop fort → fatigue + crispation.
- Vouloir tracer droit → rigidité immédiate.
- Chercher un “résultat propre” → bloque le geste.
- Dessiner trop petit → empêche le mouvement de respirer.

Une main libre ne cherche pas la précision : elle cherche la **présence**.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                } satisfies TutorialBlock,
                            ],
                        },
                        {
                            id: 'exercice-2',
                            label: 'Exercice 2 — Cercles imparfaits',
                            blocks: [
                                {
                                    kind: 'two-cols',
                                    id: 'exercice-2-section',
                                    hero: {
                                        src: '/images/articles/dessiner-peindre/oser-premier-trait/exercice-2.png',
                                        alt: 'Carnet de croquis rempli de cercles imparfaits tracés au crayon',
                                        caption: 'Les cercles imparfaits réveillent le poignet sans chercher la perfection.',
                                    },
                                    layout: 'balanced',
                                    variant: 'section-card',
                                    left: [
                                        {
                                            kind: 'rich-text',
                                            id: 'exercice-2-texte',
                                            title: 'Exercice 2 : Les cercles imparfaits',
                                            markdown: `
### Objectif de l’exercice

Les cercles imparfaits permettent d'assouplir le poignet rapidement, d'ancrer un geste fluide et continu, de sortir du contrôle trop mental, de retrouver une sensation de geste “naturel”, presque automatique.

Tu vas sentir que le trait suit ton mouvement, pas l’inverse.

### Étapes

1. Pose ton crayon sur la feuille, sans pression excessive et commence un cercle lent, très lent, presque silencieux. Ne cherche pas la symétrie : laisse le cercle se déformer.
2. Continue la boucle sans lever le crayon. Fais 3 à 5 tours.
3. Recommence, mais un peu plus vite.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                    right: [
                                        {
                                            kind: 'encart',
                                            id: 'exercice-2-variantes',
                                            tone: 'pedagogic',
                                            size: 'compact',
                                            title: 'Variantes à explorer',
                                            markdown: `
- **Cercles très lents** → pour sentir chaque variation.
- **Cercles très rapides** → pour casser le contrôle mental.
- **Grands cercles** → pour engager tout le bras.
- **Petits cercles** → pour affiner la précision douce.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                        {
                                            kind: 'encart',
                                            id: 'mini-challenge-cercles',
                                            tone: 'soft',
                                            size: 'compact',
                                            title: 'Mini-challenge : 10 cercles d’un seul geste',
                                            markdown: `
Essaie de faire **10 cercles** sans lever le crayon.

Pas 10 cercles parfaits — 10 cercles en un seul mouvement continu.
Tu vas être surpris·e de voir à quel point ton poignet trouve son propre chemin.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                } satisfies TutorialBlock,
                            ],
                        },
                        {
                            id: 'exercice-3',
                            label: 'Exercice 3 — Trait lent',
                            blocks: [
                                {
                                    kind: 'two-cols',
                                    id: 'exercice-3-section',
                                    hero: {
                                        src: '/images/articles/dessiner-peindre/oser-premier-trait/exercice-3.png',
                                        alt: 'Main qui trace un long trait au crayon, très lentement',
                                        caption: 'Le trait lent : un geste presque méditatif, au rythme de ta respiration.',
                                    },
                                    layout: 'balanced',
                                    variant: 'section-card',
                                    left: [
                                        {
                                            kind: 'rich-text',
                                            id: 'exercice-3-texte',
                                            title: 'Exercice 3 : Le trait lent (maîtriser l’intention)',
                                            markdown: `
### Objectif de l’exercice

Le trait lent t’apprend à écouter ton geste, percevoir les micro-tensions, maîtriser la pression sur le papier et tracer en conscience plutôt qu’en automatisme.

C’est un exercice qui calme le mental et recentre la main.

### Étapes

1. Pose ton crayon sur le papier, juste une seconde. Inspire doucement. En expirant, trace une ligne **très lente**, comme si tu versais du miel. Va d’un point A à un point B en laissant ton bras guider le geste.
2. Observe la sensation sous tes doigts : le crayon qui glisse, accroche, hésite…
3. Recommence, mais encore plus lentement.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                    right: [
                                        {
                                            kind: 'encart',
                                            id: 'exercice-3-variante-respiration',
                                            tone: 'pedagogic',
                                            size: 'compact',
                                            title: 'Variante : respiration + trait',
                                            markdown: `
Associe consciemment chaque trait à ta respiration :

- Inspire pour préparer le geste.
- Expire pendant que tu traces la ligne.
- Recommence en allongeant légèrement l’expiration.

Petit à petit, ton trait va adopter le rythme de ton souffle.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                        {
                                            kind: 'encart',
                                            id: 'astuce-douceur',
                                            tone: 'soft',
                                            size: 'compact',
                                            title: 'Astuce douceur',
                                            markdown: `
Ferme légèrement les yeux pendant 2 secondes avant de tracer.

Cette micro-pause réinitialise ton geste et t’empêche de forcer.
Et si tu veux aller encore plus loin : écoute le son du crayon.
Il raconte tout — la vitesse, la pression, l’intention.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                } satisfies TutorialBlock,
                            ],
                        },
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 8) PROGRESSION
        {
            id: 'progress',
            anchorId: 'progression-main-libre',
            label: 'Suivre sa progression',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'progression-section-card',
                    variant: 'section-card',
                    layout: 'balanced',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'progression-intro',
                            title: 'Comment savoir si ta main devient plus libre ?',
                            markdown: `
La progression en dessin ne se voit pas toujours au premier coup d’œil. Souvent, elle se sent avant de se voir. Et c’est exactement ce qu’on cherche ici : un geste plus vivant, une main plus libre, une relation plus douce avec le trait.

Voici les signes qui montrent que ta main commence à se délier — même si tes dessins ne te paraissent pas encore “meilleurs”.

### Signes visibles

Tu remarqueras peut-être que :

- tes traits deviennent plus **longs**
- tu lèves moins souvent le crayon
- tes lignes sont **plus amples** et souples
- ton poignet change de direction plus facilement
- les cercles improvisés sont moins “cassés”, plus fluides

Ces petits changements, discrets ou non, sont déjà de vrais indicateurs de progression.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'signes-interieurs',
                            markdown: `
### Signes intérieurs

La progression est aussi (et surtout) intérieure :

- doigts moins crispés
- souffle plus calme
- moins de jugement immédiat
- sensation de “me laisser porter par le geste”
- plaisir plus spontané à dessiner

Quand dessiner devient agréable plutôt qu’exigeant, tu as déjà gagné en liberté de geste.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'test-20-secondes',
                            tone: 'pedagogic',
                            size: 'compact',
                            title: 'Test express : 20 secondes pour mesurer ta progression',
                            markdown: `
Fais ceci :
1. Trace une ligne comme tu l’aurais fait avant de lire ce tutoriel.
2. Ensuite, fais un trait lent, calme, avec respiration.
3. Compare les deux.

La différence est parfois subtile… parfois énorme. Dans tous les cas, elle est réelle.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 9) AVANT / APRÈS
        {
            id: 'before-after',
            anchorId: 'avant-apres',
            label: 'Avant / Après',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'avant-apres-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'avant-apres-intro',
                            title: 'Avant / Après : ce qui change vraiment',
                            markdown: `
On croit souvent qu’un “avant/après” doit être spectaculaire : un trait tremblant qui devient parfait, une main maladroite qui devient experte. Mais dans l’apprentissage du dessin — surtout dans la libération du geste — les transformations sont plus fines, plus intérieures, plus sensibles.

Et pourtant… elles comptent davantage que tout.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'two-cols',
                            id: 'avant-apres-comparatif',
                            layout: 'balanced',
                            left: [
                                {
                                    kind: 'rich-text',
                                    id: 'avant-texte',
                                    markdown: `

### Avant : ce que font la plupart des débutants

Avant d’exercer la main, la plupart des gens :
- appuient trop fort
- tracent trop vite
- cherchent à “bien faire” dès le premier trait
- veulent être droits, propres, maîtrisés
- ont le souffle court sans s’en rendre compte
- se jugent dès les premières lignes

Cette tension, presque invisible, se glisse partout : dans la main, le poignet, les épaules… et dans la tête.
                            `.trim(),
                                } satisfies TutorialBlock,
                            ],
                            right: [
                                {
                                    kind: 'rich-text',
                                    id: 'apres-texte',
                                    markdown: `
### Après : ce que tu es en train de mettre en place

Avec ces exercices, ton geste change — peut-être pas ton dessin tout de suite, mais ton **rapport** au dessin :

- ta main devient plus souple
- ton trait plus vivant
- ta pression plus douce
- ton poignet plus mobile
- ta respiration plus calme
- ton regard plus indulgent envers toi-même

Le dessin ne devient pas “meilleur”. Il devient **possible**.

Et c’est cela, la vraie progression.

                            `.trim(),
                                } satisfies TutorialBlock,
                            ],
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'difference-subtile',
                            tone: 'soft',
                            title: 'Pourquoi la différence est parfois subtile… et pourquoi elle est importante',
                            markdown: `
Tu vas peut-être regarder ta feuille et te dire : “Je ne vois pas une énorme différence.”

C’est normal. Le travail que tu fais ici est un travail **interne** :
- tu reprogrammes ta relation au trait,
- tu enseignes à ta main à ne plus avoir peur,
- tu apprends au geste à se libérer sans que tu le forces,
- tu construis une base solide pour tout ton futur dessin.

Le résultat n’est pas immédiat. Il est durable.

Les meilleurs artistes ne dessinent pas mieux parce qu’ils ont “du talent”. Ils dessinent mieux parce qu’ils ont appris à faire confiance à leur geste.

Et aujourd’hui, tu viens de commencer cette transformation.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 10) RESSOURCES
        {
            id: 'resources',
            anchorId: 'ressources',
            label: 'Ressources & téléchargements',
            blocks: [
                {
                    kind: 'resources-grid',
                    id: 'ressources',
                    title: 'Ressources à télécharger',
                    items: [
                        {
                            label: 'Le support de présentation vidéo',
                            description: 'Revois les gestes à ton rythme, autant de fois que tu veux.',
                            href: '/downloads/supports/oser-le-premier-trait.pdf',
                            badge: 'PDF',
                        },
                        {
                            label: 'PDF “Oser le premier trait”',
                            description: 'Garde le tutoriel sous la main, même loin de l’écran.',
                            href: '/downloads/articles/oser-le-premier-trait.pdf',
                            badge: 'PDF',
                        },
                        {
                            label: 'Fiche “Exercice du jour”',
                            description: 'Une petite fiche imprimable pour t’accompagner dans ton carnet.',
                            href: '/downloads/fiches/exercice-premier-trait.pdf',
                            badge: 'À imprimer',
                        },
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 11) FAQ
        {
            id: 'faq',
            anchorId: 'faq',
            label: 'FAQ rapide',
            blocks: [
                {
                    kind: 'faq',
                    id: 'faq-block',
                    title: 'FAQ rapide (3 questions essentielles)',
                    items: [
                        {
                            question: 'À quelle fréquence pratiquer ces exercices ?',
                            answer: `
Le mieux : **un peu tous les jours**, même 3 minutes. Mais si tu manques de temps, une seule séance par semaine suffit déjà à assouplir la main. Ce n’est pas la durée qui compte, c’est la **régularité douce**.
                    `.trim(),
                        },
                        {
                            question: 'Et si mes traits tremblent encore ?',
                            answer: `
Alors tu progresses. Un trait qui tremble, c’est une main qui *apprend*, pas une main qui échoue. Avec le temps, le tremblement devient rythme, puis fluidité. Ne le combats pas : accompagne-le.
                    `.trim(),
                        },
                        {
                            question: 'Combien de temps avant de sentir une différence ?',
                            answer: `
Très vite. Certaines personnes ressentent une amélioration **dès la première séance** : respiration plus calme, geste plus libre, moins de tension. Mais pour une vraie fluidité, compte **7 à 14 jours** de pratique légère.

L’évolution se fait par petites touches — comme une danse qui devient naturelle.
                    `.trim(),
                        },
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 12) CONCLUSION
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
                            id: 'conclusion-main',
                            title: 'Conclusion douce & motivation',
                            markdown: `
Tu viens de faire quelque chose d’important, même si cela te semble simple : tu as donné un peu de temps à ta main, un peu de souffle à ton geste, un peu de douceur à ton regard.

Ces trois exercices ne sont pas de “petits” exercices. Ce sont des portes. Des portes vers un dessin plus libre, plus fluide, plus vivant — un dessin qui te ressemble.

Souviens-toi : tu n’as pas besoin d’être “doué”. Tu n’as pas besoin d’être parfait. Tu as juste besoin d’être là, présent(e), crayon en main, avec l’envie d’essayer.

Chaque trait que tu poses est une conversation avec toi-même. Et aujourd’hui, tu as commencé à l’écouter.

Prends ton temps, recommence demain, refais juste un cercle ou un trait lent si tu n’as que deux minutes. Ce geste-là, même minuscule, nourrit déjà ton art.

Tu es en train de construire quelque chose : un geste qui respire, un regard qui s’ouvre, et une main qui apprend à danser.

**Continue. Doucement, mais continue. Ton trait n’attend que toi.**
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'conclusion-next-step',
                            tone: 'pedagogic',
                            size: 'compact',
                            title: 'Et maintenant, concrètement ?',
                            markdown: `
Pour ancrer ce que tu viens de faire, tu peux :

- refaire **un seul exercice** demain (même 3 minutes)
- glisser une feuille dédiée “lignes libres / cercles / traits lents” dans ton carnet
- noter en deux phrases ce que tu as ressenti dans ta main aujourd’hui

Ce n’est pas la quantité qui compte, mais la **continuité douce**. Un geste répété avec bienveillance vaut plus qu’une séance parfaite, faite une seule fois.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,
    ],
};

const dessinerSansGomme: Tutorial = {
    slug: 'dessiner-sans-gomme',
    title: 'Dessiner sans gomme : apprendre à aimer les erreurs',
    excerpt:
        'Et si tu rangeais la gomme pour un moment ? Ce tutoriel te propose un petit protocole doux pour poser ton trait sans effacer, transformer tes “ratés” en matière vivante, et apprivoiser enfin l’imperfection dans ton dessin.',
    level: 'intermediate',
    pillar: 'dessin-peinture',
    format: 'tutorial',
    readingTime: '8 min',
    coverImage: '/images/articles/dessiner-peindre/dessiner-sans-gomme/hero.png',
    subcategory: 'dp-fondamentaux-du-dessin',
    publishedAt: '2025-02-20',
    hero: {
        src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/hero.png',
        alt: 'Main qui dessine au crayon sans gomme sur un carnet, avec plusieurs traits visibles et assumés.',
    },
    sections: [
        // 1) INTRO
        {
            id: 'intro',
            anchorId: 'intro',
            label: 'Introduction',
            blocks: [
                {
                    kind: 'rich-text',
                    id: 'intro',
                    markdown: `
On imagine souvent que dessiner, c’est tracer *la bonne ligne*, celle qui tombe juste, nette, parfaite… du premier coup. Mais le vrai dessin — celui qui respire, celui qui cherche, celui qui vit — ne commence jamais ainsi.

Il commence par une **approche**, une exploration, une poignée de lignes légères qui se superposent comme des murmures. Une forme qui n’est pas encore sûre d’elle, mais qui tente, qui devine, qui respire.

Dessiner sans gomme, ce n’est pas dessiner “juste”. C’est dessiner **vivant**.

C’est accepter que ton trait n’ait pas à décider trop tôt. Qu’il puisse tourner un peu, trembler, chercher son chemin. C’est lui offrir l’espace de se tromper… et de trouver, en se trompant, quelque chose de plus vrai.

Ici, tu ne vas rien effacer. Tu vas laisser les lignes se parler entre elles, se répondre, se superposer. Et tu vas voir qu’un dessin peut être beau *précisément* parce qu’il porte ses hésitations.

Ce tutoriel n’est pas une méthode pour “réussir”. C’est un chemin pour **te réconcilier avec le geste**, pour t’apprendre à observer, à oser, à accepter les accidents — et à en faire la richesse de ton dessin.

Ici, l’erreur n’est jamais un problème. Elle est le début de ton trait.
                    `.trim(),
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 2) AVANT DE COMMENCER
        {
            id: 'before-start',
            anchorId: 'avant-de-commencer',
            label: 'Avant de commencer',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'avant-de-commencer-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'image',
                            id: 'avant-de-commencer-hero',
                            src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/avant-commencer.png',
                            alt: 'Zoom sur un crayon posé au bord d’une feuille blanche',
                            caption: 'Le premier trait n’est pas un test : c’est un échauffement.',
                            emphasis: 'focus',
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'etat-esprit-avant',
                            tone: 'error',
                            size: 'compact',
                            title: 'Ce que tu n’as pas besoin de savoir',
                            markdown: `
Pour commencer ce tutoriel, tu n’as absolument pas besoin de :
- savoir tracer droit
- connaître les contours exacts
- faire joli
- éviter les erreurs
- être sûr de toi
- décider rapidement
- produire un dessin montrable

Tu n’as besoin que d’une chose : **laisser ton trait chercher avant de décider.**
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'avant-de-commencer-texte',
                            title: 'Avant de commencer : pourquoi on veut “corriger” trop vite',
                            markdown: `
### La peur de figer trop tôt

Si tu gommes, c’est souvent pour éviter ceci :
- “Je ne veux pas que la forme soit ça.”
- “J’ai peur de me tromper.”
- “Si je laisse cette ligne, on croira que je l’ai voulue.”

Alors tu effaces, tu recommences, tu corriges. Mais ce réflexe te coupe de ton vrai geste — celui qui cherche, celui qui observe.

Gommer, c’est souvent essayer d’être sûr alors que ton œil est encore en train de comprendre.

### Un trait définitif trop tôt… ferme toutes les possibilités

Un trait net dit : **“C’est ici, exactement.”**

Mais ton œil n’a pas encore exploré :
- est-ce un peu plus long ? plus haut ? plus incliné ? plus large ? plus organique ?

La ligne nette enferme. La ligne légère ouvre.

Le contour ferme la forme. Le trait exploratoire lui laisse le temps d’apparaître.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 3) MATÉRIEL + MINI-RITUEL
        {
            id: 'material-ritual',
            anchorId: 'materiel',
            label: 'Matériel & mini-rituel',
            blocks: [
                // 🟢 CARTE 1 — MATÉRIEL
                {
                    kind: 'two-cols',
                    id: 'materiel-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'materiel',
                            title: 'Matériel minimal (et suffisant)',
                            markdown: `
Tu n’as pas besoin d’un atelier d’artiste, de matériel coûteux ou d’un carnet en cuir qui sent la bibliothèque ancienne.

Pour délier la main, trois choses suffisent — vraiment.

### Le crayon idéal

N’importe quel crayon fera l’affaire, mais si tu as le choix, privilégie un crayon **HB** ou **2B**. Ils glissent facilement, ne demandent pas de force, et pardonnent les hésitations.

Un conseil doux : choisis un crayon que tu *aimes* tenir. Parfois, le confort du geste commence par le confort de l’objet.

### Le papier : grain, douceur, confort

Une simple feuille d’imprimante fonctionne très bien. Pas besoin de feuille professionnelle. Mais si tu veux un petit plus : un papier légèrement grainé permet au crayon d’accrocher et rend la main plus consciente de ses mouvements.

Le plus important : **un support sur lequel tu n’as pas peur de te tromper.**

### La posture simple

Pas de truc compliqué :
- épaules basses, dos naturel et pas rigide, poignet posé mais libre
- feuille légèrement inclinée

Ton corps doit comprendre que tu t’apprêtes à faire quelque chose de doux, pas un concours.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'image',
                            id: 'materiel-photo',
                            src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/materiel.png',
                            alt: 'Crayon simple et carnet posé sur une table en bois',
                            caption: 'Un crayon, une feuille : largement suffisant pour commencer.',
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'si-tu-nas-rien-sous-la-main',
                            tone: 'soft',
                            size: 'compact',
                            title: 'Si tu n’as rien sous la main',
                            markdown: `
Tu peux pratiquer **immédiatement**, même sans matériel “parfait”. Tout fonctionne :

- un stylo
- un vieux cahier
- un bloc-notes du bureau
- un carnet de courses
- une feuille déjà gribouillée au verso

L’important, c’est *le geste*, pas le support.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,

                // 🟣 CARTE 2 — MINI-RITUEL
                {
                    kind: 'two-cols',
                    id: 'mini-rituel-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'mini-rituel',
                            title: 'Mini-rituel : délier la main en 30 secondes',
                            markdown: `
Avant de tracer le moindre trait, offre-toi un bref moment. Juste trente secondes. C’est tout ce qu’il faut pour éviter que ta main se crispe et pour installer un geste plus fluide, plus vivant.

### Le souffle

Inspire doucement. Expire lentement. Laisse ton corps comprendre que tu n’es pas en train de “performer”, mais d’explorer. Un souffle ralenti suffit à calmer le tremblement du premier trait.

### Le poids de la main

Pose ta main sur le papier, sans crayon. Laisse-la glisser un peu, libre, légère. Observe le poids naturel de tes doigts : c’est lui qui dessinera, pas ta force.

C’est souvent cet instant simple qui débloque tout.

### La pression du crayon

Prends ton crayon et, avant de tracer, teste trois pressions :
- très légère
- douce
- un peu plus appuyée

Ressens ce qui est le plus confortable aujourd’hui. Tu n’as pas besoin d’être constant·e : tu as juste besoin d’être **présent·e**.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'encart',
                            id: 'check-express',
                            tone: 'question',
                            title: 'Check express avant de tracer',
                            markdown: `
Juste avant de poser ton premier trait, pose-toi ces trois micro-questions :

- Mes épaules sont-elles relâchées ?
- Mon souffle est-il calme ?
- Mon poignet peut-il bouger sans tension ?

Si la réponse est “oui” à au moins deux d’entre elles, tu es prêt·e.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'image',
                            id: 'rituel-image',
                            src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/mini-rituel.png',
                            alt: 'Main posée sur une feuille, prête à tracer',
                            caption: 'Un petit rituel avant de dessiner peut tout changer.',
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 4) VIDÉO
        {
            id: 'video',
            anchorId: 'video-tutoriel',
            label: 'Vidéo du tutoriel',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'video-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'video',
                            id: 'video-tutoriel',
                            url: 'https://www.youtube.com/embed/eNuOpMOPorU',
                            caption: 'Suis le tutoriel en vidéo, geste par geste.',
                            cover: {
                                src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/hero.png',
                                alt: 'Main qui trace un premier trait sur une feuille blanche',
                            },
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'video-title',
                            title: 'La vidéo du tutoriel',
                            markdown: `
Tu verras :
- comment j’échauffe ma main avant chaque exercice,
- comment je place mes doigts pour éviter la crispation,
- comment les lignes libres se dessinent sans chercher la perfection,
- comment les cercles imparfaits deviennent un petit rythme apaisant,
- comment le trait lent ouvre un espace calme, presque méditatif.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'video-conseil',
                            tone: 'soft',
                            size: 'compact',
                            title: 'Conseil pour regarder la vidéo',
                            markdown: `
Regarde-la une première fois sans dessiner, juste pour sentir le rythme. Puis prends ton crayon, et refais chaque geste avec moi.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 5) EXERCICES (onglets)
        {
            id: 'exercises',
            anchorId: 'exercices',
            label: 'Les exercices',
            blocks: [
                {
                    kind: 'exercises-group',
                    id: 'exercises-group',
                    items: [
                        {
                            id: 'exercice-1',
                            label: 'Exercice 1 — Lignes libres',
                            blocks: [
                                {
                                    kind: 'two-cols',
                                    id: 'exercice-1-section',
                                    hero: {
                                        src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/exercice-1.png',
                                        alt: 'Page remplie de lignes libres dans toutes les directions',
                                        caption: 'Les lignes libres : un terrain de jeu sans jugement.',
                                    },
                                    layout: 'balanced',
                                    variant: 'section-card',
                                    left: [
                                        {
                                            kind: 'rich-text',
                                            id: 'exercice-1-texte',
                                            title: 'Exercice 1 : Les lignes libres',
                                            markdown: `
### Objectif de l’exercice

Cet exercice est le plus simple… et pourtant, c’est l’un des plus puissants.

Il sert à casser la rigidité, à ouvrir la main, à réveiller le poignet.
Tu vas tracer des lignes sans but, sans règle, sans jugement.

### Étapes

1. Pose ta main sur la feuille.
2. Trace une ligne horizontale, sans réfléchir.
3. Trace-en une deuxième, un peu plus rapide.
4. Puis une troisième, plus lente.
5. Continue : longues, courtes, légères, appuyées…
6. Alterne : horizontales, verticales, diagonales.
7. Laisse ta main varier naturellement.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                    right: [
                                        {
                                            kind: 'encart',
                                            id: 'exercice-1-variantes',
                                            tone: 'pedagogic',
                                            size: 'compact',
                                            title: 'Variantes à explorer',
                                            markdown: `
- **Très lentes** → pour sentir chaque millimètre.
- **Très rapides** → pour casser le contrôle.
- **Très longues** → pour mobiliser tout le bras.
- **Très courtes** → pour réveiller la précision douce.
- **En zigzag** → pour assouplir le poignet.
- **En “pluie”** → lignes verticales irrégulières, très libératrices.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                        {
                                            kind: 'encart',
                                            id: 'exercice-1-erreurs',
                                            tone: 'error',
                                            size: 'compact',
                                            title: 'Erreurs courantes (à éviter)',
                                            markdown: `
- Appuyer trop fort → fatigue + crispation.
- Vouloir tracer droit → rigidité immédiate.
- Chercher un “résultat propre” → bloque le geste.
- Dessiner trop petit → empêche le mouvement de respirer.

Une main libre ne cherche pas la précision : elle cherche la **présence**.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                } satisfies TutorialBlock,
                            ],
                        },
                        {
                            id: 'exercice-2',
                            label: 'Exercice 2 — Cercles imparfaits',
                            blocks: [
                                {
                                    kind: 'two-cols',
                                    id: 'exercice-2-section',
                                    hero: {
                                        src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/exercice-2.png',
                                        alt: 'Carnet de croquis rempli de cercles imparfaits tracés au crayon',
                                        caption: 'Les cercles imparfaits réveillent le poignet sans chercher la perfection.',
                                    },
                                    layout: 'balanced',
                                    variant: 'section-card',
                                    left: [
                                        {
                                            kind: 'rich-text',
                                            id: 'exercice-2-texte',
                                            title: 'Exercice 2 : Les cercles imparfaits',
                                            markdown: `
### Objectif de l’exercice

Les cercles imparfaits permettent d'assouplir le poignet rapidement, d'ancrer un geste fluide et continu, de sortir du contrôle trop mental, de retrouver une sensation de geste “naturel”, presque automatique.

Tu vas sentir que le trait suit ton mouvement, pas l’inverse.

### Étapes

1. Pose ton crayon sur la feuille, sans pression excessive et commence un cercle lent, très lent, presque silencieux. Ne cherche pas la symétrie : laisse le cercle se déformer.
2. Continue la boucle sans lever le crayon. Fais 3 à 5 tours.
3. Recommence, mais un peu plus vite.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                    right: [
                                        {
                                            kind: 'encart',
                                            id: 'exercice-2-variantes',
                                            tone: 'pedagogic',
                                            size: 'compact',
                                            title: 'Variantes à explorer',
                                            markdown: `
- **Cercles très lents** → pour sentir chaque variation.
- **Cercles très rapides** → pour casser le contrôle mental.
- **Grands cercles** → pour engager tout le bras.
- **Petits cercles** → pour affiner la précision douce.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                        {
                                            kind: 'encart',
                                            id: 'mini-challenge-cercles',
                                            tone: 'soft',
                                            size: 'compact',
                                            title: 'Mini-challenge : 10 cercles d’un seul geste',
                                            markdown: `
Essaie de faire **10 cercles** sans lever le crayon.

Pas 10 cercles parfaits — 10 cercles en un seul mouvement continu.
Tu vas être surpris·e de voir à quel point ton poignet trouve son propre chemin.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                } satisfies TutorialBlock,
                            ],
                        },
                        {
                            id: 'exercice-3',
                            label: 'Exercice 3 — Trait lent',
                            blocks: [
                                {
                                    kind: 'two-cols',
                                    id: 'exercice-3-section',
                                    hero: {
                                        src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/exercice-3.png',
                                        alt: 'Main qui trace un long trait au crayon, très lentement',
                                        caption: 'Le trait lent : un geste presque méditatif, au rythme de ta respiration.',
                                    },
                                    layout: 'balanced',
                                    variant: 'section-card',
                                    left: [
                                        {
                                            kind: 'rich-text',
                                            id: 'exercice-3-texte',
                                            title: 'Exercice 3 : Le trait lent (maîtriser l’intention)',
                                            markdown: `
### Objectif de l’exercice

Le trait lent t’apprend à écouter ton geste, percevoir les micro-tensions, maîtriser la pression sur le papier et tracer en conscience plutôt qu’en automatisme.

C’est un exercice qui calme le mental et recentre la main.

### Étapes

1. Pose ton crayon sur le papier, juste une seconde. Inspire doucement. En expirant, trace une ligne **très lente**, comme si tu versais du miel. Va d’un point A à un point B en laissant ton bras guider le geste.
2. Observe la sensation sous tes doigts : le crayon qui glisse, accroche, hésite…
3. Recommence, mais encore plus lentement.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                    right: [
                                        {
                                            kind: 'encart',
                                            id: 'exercice-3-variante-respiration',
                                            tone: 'pedagogic',
                                            size: 'compact',
                                            title: 'Variante : respiration + trait',
                                            markdown: `
Associe consciemment chaque trait à ta respiration :

- Inspire pour préparer le geste.
- Expire pendant que tu traces la ligne.
- Recommence en allongeant légèrement l’expiration.

Petit à petit, ton trait va adopter le rythme de ton souffle.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                        {
                                            kind: 'encart',
                                            id: 'astuce-douceur',
                                            tone: 'soft',
                                            size: 'compact',
                                            title: 'Astuce douceur',
                                            markdown: `
Ferme légèrement les yeux pendant 2 secondes avant de tracer.

Cette micro-pause réinitialise ton geste et t’empêche de forcer.
Et si tu veux aller encore plus loin : écoute le son du crayon.
Il raconte tout — la vitesse, la pression, l’intention.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                } satisfies TutorialBlock,
                            ],
                        },
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 8) PROGRESSION
        {
            id: 'progress',
            anchorId: 'progression-main-libre',
            label: 'Suivre sa progression',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'progression-section-card',
                    variant: 'section-card',
                    layout: 'balanced',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'progression-intro',
                            title: 'Comment savoir si ta main devient plus libre ?',
                            markdown: `
La progression en dessin ne se voit pas toujours au premier coup d’œil. Souvent, elle se sent avant de se voir. Et c’est exactement ce qu’on cherche ici : un geste plus vivant, une main plus libre, une relation plus douce avec le trait.

Voici les signes qui montrent que ta main commence à se délier — même si tes dessins ne te paraissent pas encore “meilleurs”.

### Signes visibles

Tu remarqueras peut-être que :

- tes traits deviennent plus **longs**
- tu lèves moins souvent le crayon
- tes lignes sont **plus amples** et souples
- ton poignet change de direction plus facilement
- les cercles improvisés sont moins “cassés”, plus fluides

Ces petits changements, discrets ou non, sont déjà de vrais indicateurs de progression.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'signes-interieurs',
                            markdown: `
### Signes intérieurs

La progression est aussi (et surtout) intérieure :

- doigts moins crispés
- souffle plus calme
- moins de jugement immédiat
- sensation de “me laisser porter par le geste”
- plaisir plus spontané à dessiner

Quand dessiner devient agréable plutôt qu’exigeant, tu as déjà gagné en liberté de geste.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'test-20-secondes',
                            tone: 'pedagogic',
                            size: 'compact',
                            title: 'Test express : 20 secondes pour mesurer ta progression',
                            markdown: `
Fais ceci :
1. Trace une ligne comme tu l’aurais fait avant de lire ce tutoriel.
2. Ensuite, fais un trait lent, calme, avec respiration.
3. Compare les deux.

La différence est parfois subtile… parfois énorme. Dans tous les cas, elle est réelle.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 9) AVANT / APRÈS
        {
            id: 'before-after',
            anchorId: 'avant-apres',
            label: 'Avant / Après',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'avant-apres-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'avant-apres-intro',
                            title: 'Avant / Après : ce qui change vraiment',
                            markdown: `
On croit souvent qu’un “avant/après” doit être spectaculaire : un trait tremblant qui devient parfait, une main maladroite qui devient experte. Mais dans l’apprentissage du dessin — surtout dans la libération du geste — les transformations sont plus fines, plus intérieures, plus sensibles.

Et pourtant… elles comptent davantage que tout.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'two-cols',
                            id: 'avant-apres-comparatif',
                            layout: 'balanced',
                            left: [
                                {
                                    kind: 'rich-text',
                                    id: 'avant-texte',
                                    markdown: `

### Avant : ce que font la plupart des débutants

Avant d’exercer la main, la plupart des gens :
- appuient trop fort
- tracent trop vite
- cherchent à “bien faire” dès le premier trait
- veulent être droits, propres, maîtrisés
- ont le souffle court sans s’en rendre compte
- se jugent dès les premières lignes

Cette tension, presque invisible, se glisse partout : dans la main, le poignet, les épaules… et dans la tête.
                            `.trim(),
                                } satisfies TutorialBlock,
                            ],
                            right: [
                                {
                                    kind: 'rich-text',
                                    id: 'apres-texte',
                                    markdown: `
### Après : ce que tu es en train de mettre en place

Avec ces exercices, ton geste change — peut-être pas ton dessin tout de suite, mais ton **rapport** au dessin :

- ta main devient plus souple
- ton trait plus vivant
- ta pression plus douce
- ton poignet plus mobile
- ta respiration plus calme
- ton regard plus indulgent envers toi-même

Le dessin ne devient pas “meilleur”. Il devient **possible**.

Et c’est cela, la vraie progression.

                            `.trim(),
                                } satisfies TutorialBlock,
                            ],
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'difference-subtile',
                            tone: 'soft',
                            title: 'Pourquoi la différence est parfois subtile… et pourquoi elle est importante',
                            markdown: `
Tu vas peut-être regarder ta feuille et te dire : “Je ne vois pas une énorme différence.”

C’est normal. Le travail que tu fais ici est un travail **interne** :
- tu reprogrammes ta relation au trait,
- tu enseignes à ta main à ne plus avoir peur,
- tu apprends au geste à se libérer sans que tu le forces,
- tu construis une base solide pour tout ton futur dessin.

Le résultat n’est pas immédiat. Il est durable.

Les meilleurs artistes ne dessinent pas mieux parce qu’ils ont “du talent”. Ils dessinent mieux parce qu’ils ont appris à faire confiance à leur geste.

Et aujourd’hui, tu viens de commencer cette transformation.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 10) RESSOURCES
        {
            id: 'resources',
            anchorId: 'ressources',
            label: 'Ressources & téléchargements',
            blocks: [
                {
                    kind: 'resources-grid',
                    id: 'ressources',
                    title: 'Ressources à télécharger',
                    items: [
                        {
                            label: 'Le support de présentation vidéo',
                            description: 'Revois les gestes à ton rythme, autant de fois que tu veux.',
                            href: '/downloads/supports/dessiner-sans-gomme.pdf',
                            badge: 'PDF',
                        },
                        {
                            label: 'PDF “Dessiner sans gomme”',
                            description: 'Garde le tutoriel sous la main, même loin de l’écran.',
                            href: '/downloads/articles/dessiner-sans-gomme.pdf',
                            badge: 'PDF',
                        },
                        {
                            label: 'Fiche “Exercice du jour”',
                            description: 'Une petite fiche imprimable pour t’accompagner dans ton carnet.',
                            href: '/downloads/fiches/exercice-dessiner-sans-gomme.pdf',
                            badge: 'À imprimer',
                        },
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 11) FAQ
        {
            id: 'faq',
            anchorId: 'faq',
            label: 'FAQ rapide',
            blocks: [
                {
                    kind: 'faq',
                    id: 'faq-block',
                    title: 'FAQ rapide (3 questions essentielles)',
                    items: [
                        {
                            question: 'À quelle fréquence pratiquer ces exercices ?',
                            answer: `
Le mieux : **un peu tous les jours**, même 3 minutes. Mais si tu manques de temps, une seule séance par semaine suffit déjà à assouplir la main. Ce n’est pas la durée qui compte, c’est la **régularité douce**.
                    `.trim(),
                        },
                        {
                            question: 'Et si mes traits tremblent encore ?',
                            answer: `
Alors tu progresses. Un trait qui tremble, c’est une main qui *apprend*, pas une main qui échoue. Avec le temps, le tremblement devient rythme, puis fluidité. Ne le combats pas : accompagne-le.
                    `.trim(),
                        },
                        {
                            question: 'Combien de temps avant de sentir une différence ?',
                            answer: `
Très vite. Certaines personnes ressentent une amélioration **dès la première séance** : respiration plus calme, geste plus libre, moins de tension. Mais pour une vraie fluidité, compte **7 à 14 jours** de pratique légère.

L’évolution se fait par petites touches — comme une danse qui devient naturelle.
                    `.trim(),
                        },
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 12) CONCLUSION
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
                            id: 'conclusion-main',
                            title: 'Conclusion douce & motivation',
                            markdown: `
Tu viens de faire quelque chose d’important, même si cela te semble simple : tu as donné un peu de temps à ta main, un peu de souffle à ton geste, un peu de douceur à ton regard.

Ces exercices ne sont pas de “petits” exercices. Ce sont des portes. Des portes vers un dessin plus libre, plus fluide, plus vivant — un dessin qui te ressemble.

Souviens-toi : tu n’as pas besoin d’être “doué”. Tu n’as pas besoin d’être parfait. Tu as juste besoin d’être là, présent(e), crayon en main, avec l’envie d’essayer.

Chaque trait que tu poses est une conversation avec toi-même. Et aujourd’hui, tu as commencé à l’écouter.

Prends ton temps, recommence demain, refais juste un cercle ou un trait lent si tu n’as que deux minutes. Ce geste-là, même minuscule, nourrit déjà ton art.

Tu es en train de construire quelque chose : un geste qui respire, un regard qui s’ouvre, et une main qui apprend à danser.

**Continue. Doucement, mais continue. Ton trait n’attend que toi.**
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'conclusion-next-step',
                            tone: 'pedagogic',
                            size: 'compact',
                            title: 'Et maintenant, concrètement ?',
                            markdown: `
Pour ancrer ce que tu viens de faire, tu peux :

- refaire **un seul exercice** demain (même 3 minutes)
- glisser une feuille dédiée “lignes libres / cercles / traits lents” dans ton carnet
- noter en deux phrases ce que tu as ressenti dans ta main aujourd’hui

Ce n’est pas la quantité qui compte, mais la **continuité douce**. Un geste répété avec bienveillance vaut plus qu’une séance parfaite, faite une seule fois.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,
    ],
};

const ombresDoucesCrayon: Tutorial = {
    slug: 'ombres-douces-au-crayon',
    title: 'Ombres douces : apprendre à faire respirer ton dessin',
    excerpt: 'Un mini-tutoriel pour comprendre comment poser des ombres légères sans salir ton dessin. Trois gestes simples pour donner du volume sans forcer.',
    level: 'beginner',
    pillar: 'dessin-peinture',
    format: 'tutorial',
    readingTime: '6 min',
    coverImage: '/images/articles/exemple-dessin-1.png',
    subcategory: 'dp-fondamentaux-du-dessin',
    publishedAt: '2025-03-20',
    hero: {
        src: '/images/articles/exemple-dessin-1.png',
        alt: 'Croquis simple au crayon avec ombres légères, posé sur une feuille texturée.',
    },
    sections: [
        // 1) INTRO
        {
            id: 'intro',
            anchorId: 'intro',
            label: 'Introduction',
            blocks: [
                {
                    kind: 'rich-text',
                    id: 'intro',
                    markdown: `
On imagine souvent que dessiner, c’est tracer *la bonne ligne*, celle qui tombe juste, nette, parfaite… du premier coup. Mais le vrai dessin — celui qui respire, celui qui cherche, celui qui vit — ne commence jamais ainsi.

Il commence par une **approche**, une exploration, une poignée de lignes légères qui se superposent comme des murmures. Une forme qui n’est pas encore sûre d’elle, mais qui tente, qui devine, qui respire.

Dessiner sans gomme, ce n’est pas dessiner “juste”. C’est dessiner **vivant**.

C’est accepter que ton trait n’ait pas à décider trop tôt. Qu’il puisse tourner un peu, trembler, chercher son chemin. C’est lui offrir l’espace de se tromper… et de trouver, en se trompant, quelque chose de plus vrai.

Ici, tu ne vas rien effacer. Tu vas laisser les lignes se parler entre elles, se répondre, se superposer. Et tu vas voir qu’un dessin peut être beau *précisément* parce qu’il porte ses hésitations.

Ce tutoriel n’est pas une méthode pour “réussir”. C’est un chemin pour **te réconcilier avec le geste**, pour t’apprendre à observer, à oser, à accepter les accidents — et à en faire la richesse de ton dessin.

Ici, l’erreur n’est jamais un problème. Elle est le début de ton trait.
                    `.trim(),
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 2) AVANT DE COMMENCER
        {
            id: 'before-start',
            anchorId: 'avant-de-commencer',
            label: 'Avant de commencer',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'avant-de-commencer-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'image',
                            id: 'avant-de-commencer-hero',
                            src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/avant-commencer.png',
                            alt: 'Zoom sur un crayon posé au bord d’une feuille blanche',
                            caption: 'Le premier trait n’est pas un test : c’est un échauffement.',
                            emphasis: 'focus',
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'etat-esprit-avant',
                            tone: 'error',
                            size: 'compact',
                            title: 'Ce que tu n’as pas besoin de savoir',
                            markdown: `
Pour commencer ce tutoriel, tu n’as absolument pas besoin de :
- savoir tracer droit
- connaître les contours exacts
- faire joli
- éviter les erreurs
- être sûr de toi
- décider rapidement
- produire un dessin montrable

Tu n’as besoin que d’une chose : **laisser ton trait chercher avant de décider.**
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'avant-de-commencer-texte',
                            title: 'Avant de commencer : pourquoi on veut “corriger” trop vite',
                            markdown: `
### La peur de figer trop tôt

Si tu gommes, c’est souvent pour éviter ceci :
- “Je ne veux pas que la forme soit ça.”
- “J’ai peur de me tromper.”
- “Si je laisse cette ligne, on croira que je l’ai voulue.”

Alors tu effaces, tu recommences, tu corriges. Mais ce réflexe te coupe de ton vrai geste — celui qui cherche, celui qui observe.

Gommer, c’est souvent essayer d’être sûr alors que ton œil est encore en train de comprendre.

### Un trait définitif trop tôt… ferme toutes les possibilités

Un trait net dit : **“C’est ici, exactement.”**

Mais ton œil n’a pas encore exploré :
- est-ce un peu plus long ? plus haut ? plus incliné ? plus large ? plus organique ?

La ligne nette enferme. La ligne légère ouvre.

Le contour ferme la forme. Le trait exploratoire lui laisse le temps d’apparaître.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 3) MATÉRIEL + MINI-RITUEL
        {
            id: 'material-ritual',
            anchorId: 'materiel',
            label: 'Matériel & mini-rituel',
            blocks: [
                // 🟢 CARTE 1 — MATÉRIEL
                {
                    kind: 'two-cols',
                    id: 'materiel-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'materiel',
                            title: 'Matériel minimal (et suffisant)',
                            markdown: `
Tu n’as pas besoin d’un atelier d’artiste, de matériel coûteux ou d’un carnet en cuir qui sent la bibliothèque ancienne.

Pour délier la main, trois choses suffisent — vraiment.

### Le crayon idéal

N’importe quel crayon fera l’affaire, mais si tu as le choix, privilégie un crayon **HB** ou **2B**. Ils glissent facilement, ne demandent pas de force, et pardonnent les hésitations.

Un conseil doux : choisis un crayon que tu *aimes* tenir. Parfois, le confort du geste commence par le confort de l’objet.

### Le papier : grain, douceur, confort

Une simple feuille d’imprimante fonctionne très bien. Pas besoin de feuille professionnelle. Mais si tu veux un petit plus : un papier légèrement grainé permet au crayon d’accrocher et rend la main plus consciente de ses mouvements.

Le plus important : **un support sur lequel tu n’as pas peur de te tromper.**

### La posture simple

Pas de truc compliqué :
- épaules basses, dos naturel et pas rigide, poignet posé mais libre
- feuille légèrement inclinée

Ton corps doit comprendre que tu t’apprêtes à faire quelque chose de doux, pas un concours.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'image',
                            id: 'materiel-photo',
                            src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/materiel.png',
                            alt: 'Crayon simple et carnet posé sur une table en bois',
                            caption: 'Un crayon, une feuille : largement suffisant pour commencer.',
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'si-tu-nas-rien-sous-la-main',
                            tone: 'soft',
                            size: 'compact',
                            title: 'Si tu n’as rien sous la main',
                            markdown: `
Tu peux pratiquer **immédiatement**, même sans matériel “parfait”. Tout fonctionne :

- un stylo
- un vieux cahier
- un bloc-notes du bureau
- un carnet de courses
- une feuille déjà gribouillée au verso

L’important, c’est *le geste*, pas le support.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,

                // 🟣 CARTE 2 — MINI-RITUEL
                {
                    kind: 'two-cols',
                    id: 'mini-rituel-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'mini-rituel',
                            title: 'Mini-rituel : délier la main en 30 secondes',
                            markdown: `
Avant de tracer le moindre trait, offre-toi un bref moment. Juste trente secondes. C’est tout ce qu’il faut pour éviter que ta main se crispe et pour installer un geste plus fluide, plus vivant.

### Le souffle

Inspire doucement. Expire lentement. Laisse ton corps comprendre que tu n’es pas en train de “performer”, mais d’explorer. Un souffle ralenti suffit à calmer le tremblement du premier trait.

### Le poids de la main

Pose ta main sur le papier, sans crayon. Laisse-la glisser un peu, libre, légère. Observe le poids naturel de tes doigts : c’est lui qui dessinera, pas ta force.

C’est souvent cet instant simple qui débloque tout.

### La pression du crayon

Prends ton crayon et, avant de tracer, teste trois pressions :
- très légère
- douce
- un peu plus appuyée

Ressens ce qui est le plus confortable aujourd’hui. Tu n’as pas besoin d’être constant·e : tu as juste besoin d’être **présent·e**.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'encart',
                            id: 'check-express',
                            tone: 'question',
                            title: 'Check express avant de tracer',
                            markdown: `
Juste avant de poser ton premier trait, pose-toi ces trois micro-questions :

- Mes épaules sont-elles relâchées ?
- Mon souffle est-il calme ?
- Mon poignet peut-il bouger sans tension ?

Si la réponse est “oui” à au moins deux d’entre elles, tu es prêt·e.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'image',
                            id: 'rituel-image',
                            src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/mini-rituel.png',
                            alt: 'Main posée sur une feuille, prête à tracer',
                            caption: 'Un petit rituel avant de dessiner peut tout changer.',
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 4) VIDÉO
        {
            id: 'video',
            anchorId: 'video-tutoriel',
            label: 'Vidéo du tutoriel',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'video-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'video',
                            id: 'video-tutoriel',
                            url: 'https://www.youtube.com/embed/eNuOpMOPorU',
                            caption: 'Suis le tutoriel en vidéo, geste par geste.',
                            cover: {
                                src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/hero.png',
                                alt: 'Main qui trace un premier trait sur une feuille blanche',
                            },
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'video-title',
                            title: 'La vidéo du tutoriel',
                            markdown: `
Tu verras :
- comment j’échauffe ma main avant chaque exercice,
- comment je place mes doigts pour éviter la crispation,
- comment les lignes libres se dessinent sans chercher la perfection,
- comment les cercles imparfaits deviennent un petit rythme apaisant,
- comment le trait lent ouvre un espace calme, presque méditatif.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'video-conseil',
                            tone: 'soft',
                            size: 'compact',
                            title: 'Conseil pour regarder la vidéo',
                            markdown: `
Regarde-la une première fois sans dessiner, juste pour sentir le rythme. Puis prends ton crayon, et refais chaque geste avec moi.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 5) EXERCICES (onglets)
        {
            id: 'exercises',
            anchorId: 'exercices',
            label: 'Les exercices',
            blocks: [
                {
                    kind: 'exercises-group',
                    id: 'exercises-group',
                    items: [
                        {
                            id: 'exercice-1',
                            label: 'Exercice 1 — Lignes libres',
                            blocks: [
                                {
                                    kind: 'two-cols',
                                    id: 'exercice-1-section',
                                    hero: {
                                        src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/exercice-1.png',
                                        alt: 'Page remplie de lignes libres dans toutes les directions',
                                        caption: 'Les lignes libres : un terrain de jeu sans jugement.',
                                    },
                                    layout: 'balanced',
                                    variant: 'section-card',
                                    left: [
                                        {
                                            kind: 'rich-text',
                                            id: 'exercice-1-texte',
                                            title: 'Exercice 1 : Les lignes libres',
                                            markdown: `
### Objectif de l’exercice

Cet exercice est le plus simple… et pourtant, c’est l’un des plus puissants.

Il sert à casser la rigidité, à ouvrir la main, à réveiller le poignet.
Tu vas tracer des lignes sans but, sans règle, sans jugement.

### Étapes

1. Pose ta main sur la feuille.
2. Trace une ligne horizontale, sans réfléchir.
3. Trace-en une deuxième, un peu plus rapide.
4. Puis une troisième, plus lente.
5. Continue : longues, courtes, légères, appuyées…
6. Alterne : horizontales, verticales, diagonales.
7. Laisse ta main varier naturellement.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                    right: [
                                        {
                                            kind: 'encart',
                                            id: 'exercice-1-variantes',
                                            tone: 'pedagogic',
                                            size: 'compact',
                                            title: 'Variantes à explorer',
                                            markdown: `
- **Très lentes** → pour sentir chaque millimètre.
- **Très rapides** → pour casser le contrôle.
- **Très longues** → pour mobiliser tout le bras.
- **Très courtes** → pour réveiller la précision douce.
- **En zigzag** → pour assouplir le poignet.
- **En “pluie”** → lignes verticales irrégulières, très libératrices.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                        {
                                            kind: 'encart',
                                            id: 'exercice-1-erreurs',
                                            tone: 'error',
                                            size: 'compact',
                                            title: 'Erreurs courantes (à éviter)',
                                            markdown: `
- Appuyer trop fort → fatigue + crispation.
- Vouloir tracer droit → rigidité immédiate.
- Chercher un “résultat propre” → bloque le geste.
- Dessiner trop petit → empêche le mouvement de respirer.

Une main libre ne cherche pas la précision : elle cherche la **présence**.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                } satisfies TutorialBlock,
                            ],
                        },
                        {
                            id: 'exercice-2',
                            label: 'Exercice 2 — Cercles imparfaits',
                            blocks: [
                                {
                                    kind: 'two-cols',
                                    id: 'exercice-2-section',
                                    hero: {
                                        src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/exercice-2.png',
                                        alt: 'Carnet de croquis rempli de cercles imparfaits tracés au crayon',
                                        caption: 'Les cercles imparfaits réveillent le poignet sans chercher la perfection.',
                                    },
                                    layout: 'balanced',
                                    variant: 'section-card',
                                    left: [
                                        {
                                            kind: 'rich-text',
                                            id: 'exercice-2-texte',
                                            title: 'Exercice 2 : Les cercles imparfaits',
                                            markdown: `
### Objectif de l’exercice

Les cercles imparfaits permettent d'assouplir le poignet rapidement, d'ancrer un geste fluide et continu, de sortir du contrôle trop mental, de retrouver une sensation de geste “naturel”, presque automatique.

Tu vas sentir que le trait suit ton mouvement, pas l’inverse.

### Étapes

1. Pose ton crayon sur la feuille, sans pression excessive et commence un cercle lent, très lent, presque silencieux. Ne cherche pas la symétrie : laisse le cercle se déformer.
2. Continue la boucle sans lever le crayon. Fais 3 à 5 tours.
3. Recommence, mais un peu plus vite.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                    right: [
                                        {
                                            kind: 'encart',
                                            id: 'exercice-2-variantes',
                                            tone: 'pedagogic',
                                            size: 'compact',
                                            title: 'Variantes à explorer',
                                            markdown: `
- **Cercles très lents** → pour sentir chaque variation.
- **Cercles très rapides** → pour casser le contrôle mental.
- **Grands cercles** → pour engager tout le bras.
- **Petits cercles** → pour affiner la précision douce.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                        {
                                            kind: 'encart',
                                            id: 'mini-challenge-cercles',
                                            tone: 'soft',
                                            size: 'compact',
                                            title: 'Mini-challenge : 10 cercles d’un seul geste',
                                            markdown: `
Essaie de faire **10 cercles** sans lever le crayon.

Pas 10 cercles parfaits — 10 cercles en un seul mouvement continu.
Tu vas être surpris·e de voir à quel point ton poignet trouve son propre chemin.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                } satisfies TutorialBlock,
                            ],
                        },
                        {
                            id: 'exercice-3',
                            label: 'Exercice 3 — Trait lent',
                            blocks: [
                                {
                                    kind: 'two-cols',
                                    id: 'exercice-3-section',
                                    hero: {
                                        src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/exercice-3.png',
                                        alt: 'Main qui trace un long trait au crayon, très lentement',
                                        caption: 'Le trait lent : un geste presque méditatif, au rythme de ta respiration.',
                                    },
                                    layout: 'balanced',
                                    variant: 'section-card',
                                    left: [
                                        {
                                            kind: 'rich-text',
                                            id: 'exercice-3-texte',
                                            title: 'Exercice 3 : Le trait lent (maîtriser l’intention)',
                                            markdown: `
### Objectif de l’exercice

Le trait lent t’apprend à écouter ton geste, percevoir les micro-tensions, maîtriser la pression sur le papier et tracer en conscience plutôt qu’en automatisme.

C’est un exercice qui calme le mental et recentre la main.

### Étapes

1. Pose ton crayon sur le papier, juste une seconde. Inspire doucement. En expirant, trace une ligne **très lente**, comme si tu versais du miel. Va d’un point A à un point B en laissant ton bras guider le geste.
2. Observe la sensation sous tes doigts : le crayon qui glisse, accroche, hésite…
3. Recommence, mais encore plus lentement.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                    right: [
                                        {
                                            kind: 'encart',
                                            id: 'exercice-3-variante-respiration',
                                            tone: 'pedagogic',
                                            size: 'compact',
                                            title: 'Variante : respiration + trait',
                                            markdown: `
Associe consciemment chaque trait à ta respiration :

- Inspire pour préparer le geste.
- Expire pendant que tu traces la ligne.
- Recommence en allongeant légèrement l’expiration.

Petit à petit, ton trait va adopter le rythme de ton souffle.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                        {
                                            kind: 'encart',
                                            id: 'astuce-douceur',
                                            tone: 'soft',
                                            size: 'compact',
                                            title: 'Astuce douceur',
                                            markdown: `
Ferme légèrement les yeux pendant 2 secondes avant de tracer.

Cette micro-pause réinitialise ton geste et t’empêche de forcer.
Et si tu veux aller encore plus loin : écoute le son du crayon.
Il raconte tout — la vitesse, la pression, l’intention.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                } satisfies TutorialBlock,
                            ],
                        },
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 8) PROGRESSION
        {
            id: 'progress',
            anchorId: 'progression-main-libre',
            label: 'Suivre sa progression',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'progression-section-card',
                    variant: 'section-card',
                    layout: 'balanced',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'progression-intro',
                            title: 'Comment savoir si ta main devient plus libre ?',
                            markdown: `
La progression en dessin ne se voit pas toujours au premier coup d’œil. Souvent, elle se sent avant de se voir. Et c’est exactement ce qu’on cherche ici : un geste plus vivant, une main plus libre, une relation plus douce avec le trait.

Voici les signes qui montrent que ta main commence à se délier — même si tes dessins ne te paraissent pas encore “meilleurs”.

### Signes visibles

Tu remarqueras peut-être que :

- tes traits deviennent plus **longs**
- tu lèves moins souvent le crayon
- tes lignes sont **plus amples** et souples
- ton poignet change de direction plus facilement
- les cercles improvisés sont moins “cassés”, plus fluides

Ces petits changements, discrets ou non, sont déjà de vrais indicateurs de progression.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'signes-interieurs',
                            markdown: `
### Signes intérieurs

La progression est aussi (et surtout) intérieure :

- doigts moins crispés
- souffle plus calme
- moins de jugement immédiat
- sensation de “me laisser porter par le geste”
- plaisir plus spontané à dessiner

Quand dessiner devient agréable plutôt qu’exigeant, tu as déjà gagné en liberté de geste.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'test-20-secondes',
                            tone: 'pedagogic',
                            size: 'compact',
                            title: 'Test express : 20 secondes pour mesurer ta progression',
                            markdown: `
Fais ceci :
1. Trace une ligne comme tu l’aurais fait avant de lire ce tutoriel.
2. Ensuite, fais un trait lent, calme, avec respiration.
3. Compare les deux.

La différence est parfois subtile… parfois énorme. Dans tous les cas, elle est réelle.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 9) AVANT / APRÈS
        {
            id: 'before-after',
            anchorId: 'avant-apres',
            label: 'Avant / Après',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'avant-apres-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'avant-apres-intro',
                            title: 'Avant / Après : ce qui change vraiment',
                            markdown: `
On croit souvent qu’un “avant/après” doit être spectaculaire : un trait tremblant qui devient parfait, une main maladroite qui devient experte. Mais dans l’apprentissage du dessin — surtout dans la libération du geste — les transformations sont plus fines, plus intérieures, plus sensibles.

Et pourtant… elles comptent davantage que tout.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'two-cols',
                            id: 'avant-apres-comparatif',
                            layout: 'balanced',
                            left: [
                                {
                                    kind: 'rich-text',
                                    id: 'avant-texte',
                                    markdown: `

### Avant : ce que font la plupart des débutants

Avant d’exercer la main, la plupart des gens :
- appuient trop fort
- tracent trop vite
- cherchent à “bien faire” dès le premier trait
- veulent être droits, propres, maîtrisés
- ont le souffle court sans s’en rendre compte
- se jugent dès les premières lignes

Cette tension, presque invisible, se glisse partout : dans la main, le poignet, les épaules… et dans la tête.
                            `.trim(),
                                } satisfies TutorialBlock,
                            ],
                            right: [
                                {
                                    kind: 'rich-text',
                                    id: 'apres-texte',
                                    markdown: `
### Après : ce que tu es en train de mettre en place

Avec ces exercices, ton geste change — peut-être pas ton dessin tout de suite, mais ton **rapport** au dessin :

- ta main devient plus souple
- ton trait plus vivant
- ta pression plus douce
- ton poignet plus mobile
- ta respiration plus calme
- ton regard plus indulgent envers toi-même

Le dessin ne devient pas “meilleur”. Il devient **possible**.

Et c’est cela, la vraie progression.

                            `.trim(),
                                } satisfies TutorialBlock,
                            ],
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'difference-subtile',
                            tone: 'soft',
                            title: 'Pourquoi la différence est parfois subtile… et pourquoi elle est importante',
                            markdown: `
Tu vas peut-être regarder ta feuille et te dire : “Je ne vois pas une énorme différence.”

C’est normal. Le travail que tu fais ici est un travail **interne** :
- tu reprogrammes ta relation au trait,
- tu enseignes à ta main à ne plus avoir peur,
- tu apprends au geste à se libérer sans que tu le forces,
- tu construis une base solide pour tout ton futur dessin.

Le résultat n’est pas immédiat. Il est durable.

Les meilleurs artistes ne dessinent pas mieux parce qu’ils ont “du talent”. Ils dessinent mieux parce qu’ils ont appris à faire confiance à leur geste.

Et aujourd’hui, tu viens de commencer cette transformation.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 10) RESSOURCES
        {
            id: 'resources',
            anchorId: 'ressources',
            label: 'Ressources & téléchargements',
            blocks: [
                {
                    kind: 'resources-grid',
                    id: 'ressources',
                    title: 'Ressources à télécharger',
                    items: [
                        {
                            label: 'Le support de présentation vidéo',
                            description: 'Revois les gestes à ton rythme, autant de fois que tu veux.',
                            href: '/downloads/supports/oser-le-premier-trait.pdf',
                            badge: 'PDF',
                        },
                        {
                            label: 'PDF “Oser le premier trait”',
                            description: 'Garde le tutoriel sous la main, même loin de l’écran.',
                            href: '/downloads/articles/oser-le-premier-trait.pdf',
                            badge: 'PDF',
                        },
                        {
                            label: 'Fiche “Exercice du jour”',
                            description: 'Une petite fiche imprimable pour t’accompagner dans ton carnet.',
                            href: '/downloads/fiches/exercice-premier-trait.pdf',
                            badge: 'À imprimer',
                        },
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 11) FAQ
        {
            id: 'faq',
            anchorId: 'faq',
            label: 'FAQ rapide',
            blocks: [
                {
                    kind: 'faq',
                    id: 'faq-block',
                    title: 'FAQ rapide (3 questions essentielles)',
                    items: [
                        {
                            question: 'À quelle fréquence pratiquer ces exercices ?',
                            answer: `
Le mieux : **un peu tous les jours**, même 3 minutes. Mais si tu manques de temps, une seule séance par semaine suffit déjà à assouplir la main. Ce n’est pas la durée qui compte, c’est la **régularité douce**.
                    `.trim(),
                        },
                        {
                            question: 'Et si mes traits tremblent encore ?',
                            answer: `
Alors tu progresses. Un trait qui tremble, c’est une main qui *apprend*, pas une main qui échoue. Avec le temps, le tremblement devient rythme, puis fluidité. Ne le combats pas : accompagne-le.
                    `.trim(),
                        },
                        {
                            question: 'Combien de temps avant de sentir une différence ?',
                            answer: `
Très vite. Certaines personnes ressentent une amélioration **dès la première séance** : respiration plus calme, geste plus libre, moins de tension. Mais pour une vraie fluidité, compte **7 à 14 jours** de pratique légère.

L’évolution se fait par petites touches — comme une danse qui devient naturelle.
                    `.trim(),
                        },
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 12) CONCLUSION
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
                            id: 'conclusion-main',
                            title: 'Conclusion douce & motivation',
                            markdown: `
Tu viens de faire quelque chose d’important, même si cela te semble simple : tu as donné un peu de temps à ta main, un peu de souffle à ton geste, un peu de douceur à ton regard.

Ces trois exercices ne sont pas de “petits” exercices. Ce sont des portes. Des portes vers un dessin plus libre, plus fluide, plus vivant — un dessin qui te ressemble.

Souviens-toi : tu n’as pas besoin d’être “doué”. Tu n’as pas besoin d’être parfait. Tu as juste besoin d’être là, présent(e), crayon en main, avec l’envie d’essayer.

Chaque trait que tu poses est une conversation avec toi-même. Et aujourd’hui, tu as commencé à l’écouter.

Prends ton temps, recommence demain, refais juste un cercle ou un trait lent si tu n’as que deux minutes. Ce geste-là, même minuscule, nourrit déjà ton art.

Tu es en train de construire quelque chose : un geste qui respire, un regard qui s’ouvre, et une main qui apprend à danser.

**Continue. Doucement, mais continue. Ton trait n’attend que toi.**
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'conclusion-next-step',
                            tone: 'pedagogic',
                            size: 'compact',
                            title: 'Et maintenant, concrètement ?',
                            markdown: `
Pour ancrer ce que tu viens de faire, tu peux :

- refaire **un seul exercice** demain (même 3 minutes)
- glisser une feuille dédiée “lignes libres / cercles / traits lents” dans ton carnet
- noter en deux phrases ce que tu as ressenti dans ta main aujourd’hui

Ce n’est pas la quantité qui compte, mais la **continuité douce**. Un geste répété avec bienveillance vaut plus qu’une séance parfaite, faite une seule fois.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,
    ],
};

const carnetDuMatin: Tutorial = {
    slug: 'carnet-du-matin',
    title: 'Carnet du matin : 5 minutes pour délier la main',
    excerpt: 'Une petite routine créative pour réveiller le geste au réveil. Pas d’objectif, pas de performance : juste un moment pour laisser ta main respirer.',
    level: 'beginner',
    pillar: 'dessin-peinture',
    format: 'tutorial',
    readingTime: '5 min',
    coverImage: '/images/articles/exemple-dessin-2.png',
    subcategory: 'dp-pratique-quotidienne',
    publishedAt: '2025-03-20',
    hero: {
        src: '/images/articles/exemple-dessin-2.png',
        alt: 'Croquis simple au crayon avec ombres légères, posé sur une feuille texturée.',
    },
    sections: [
        // 1) INTRO
        {
            id: 'intro',
            anchorId: 'intro',
            label: 'Introduction',
            blocks: [
                {
                    kind: 'rich-text',
                    id: 'intro',
                    markdown: `
On imagine souvent que dessiner, c’est tracer *la bonne ligne*, celle qui tombe juste, nette, parfaite… du premier coup. Mais le vrai dessin — celui qui respire, celui qui cherche, celui qui vit — ne commence jamais ainsi.

Il commence par une **approche**, une exploration, une poignée de lignes légères qui se superposent comme des murmures. Une forme qui n’est pas encore sûre d’elle, mais qui tente, qui devine, qui respire.

Dessiner sans gomme, ce n’est pas dessiner “juste”. C’est dessiner **vivant**.

C’est accepter que ton trait n’ait pas à décider trop tôt. Qu’il puisse tourner un peu, trembler, chercher son chemin. C’est lui offrir l’espace de se tromper… et de trouver, en se trompant, quelque chose de plus vrai.

Ici, tu ne vas rien effacer. Tu vas laisser les lignes se parler entre elles, se répondre, se superposer. Et tu vas voir qu’un dessin peut être beau *précisément* parce qu’il porte ses hésitations.

Ce tutoriel n’est pas une méthode pour “réussir”. C’est un chemin pour **te réconcilier avec le geste**, pour t’apprendre à observer, à oser, à accepter les accidents — et à en faire la richesse de ton dessin.

Ici, l’erreur n’est jamais un problème. Elle est le début de ton trait.
                    `.trim(),
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 2) AVANT DE COMMENCER
        {
            id: 'before-start',
            anchorId: 'avant-de-commencer',
            label: 'Avant de commencer',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'avant-de-commencer-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'image',
                            id: 'avant-de-commencer-hero',
                            src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/avant-commencer.png',
                            alt: 'Zoom sur un crayon posé au bord d’une feuille blanche',
                            caption: 'Le premier trait n’est pas un test : c’est un échauffement.',
                            emphasis: 'focus',
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'etat-esprit-avant',
                            tone: 'error',
                            size: 'compact',
                            title: 'Ce que tu n’as pas besoin de savoir',
                            markdown: `
Pour commencer ce tutoriel, tu n’as absolument pas besoin de :
- savoir tracer droit
- connaître les contours exacts
- faire joli
- éviter les erreurs
- être sûr de toi
- décider rapidement
- produire un dessin montrable

Tu n’as besoin que d’une chose : **laisser ton trait chercher avant de décider.**
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'avant-de-commencer-texte',
                            title: 'Avant de commencer : pourquoi on veut “corriger” trop vite',
                            markdown: `
### La peur de figer trop tôt

Si tu gommes, c’est souvent pour éviter ceci :
- “Je ne veux pas que la forme soit ça.”
- “J’ai peur de me tromper.”
- “Si je laisse cette ligne, on croira que je l’ai voulue.”

Alors tu effaces, tu recommences, tu corriges. Mais ce réflexe te coupe de ton vrai geste — celui qui cherche, celui qui observe.

Gommer, c’est souvent essayer d’être sûr alors que ton œil est encore en train de comprendre.

### Un trait définitif trop tôt… ferme toutes les possibilités

Un trait net dit : **“C’est ici, exactement.”**

Mais ton œil n’a pas encore exploré :
- est-ce un peu plus long ? plus haut ? plus incliné ? plus large ? plus organique ?

La ligne nette enferme. La ligne légère ouvre.

Le contour ferme la forme. Le trait exploratoire lui laisse le temps d’apparaître.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 3) MATÉRIEL + MINI-RITUEL
        {
            id: 'material-ritual',
            anchorId: 'materiel',
            label: 'Matériel & mini-rituel',
            blocks: [
                // 🟢 CARTE 1 — MATÉRIEL
                {
                    kind: 'two-cols',
                    id: 'materiel-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'materiel',
                            title: 'Matériel minimal (et suffisant)',
                            markdown: `
Tu n’as pas besoin d’un atelier d’artiste, de matériel coûteux ou d’un carnet en cuir qui sent la bibliothèque ancienne.

Pour délier la main, trois choses suffisent — vraiment.

### Le crayon idéal

N’importe quel crayon fera l’affaire, mais si tu as le choix, privilégie un crayon **HB** ou **2B**. Ils glissent facilement, ne demandent pas de force, et pardonnent les hésitations.

Un conseil doux : choisis un crayon que tu *aimes* tenir. Parfois, le confort du geste commence par le confort de l’objet.

### Le papier : grain, douceur, confort

Une simple feuille d’imprimante fonctionne très bien. Pas besoin de feuille professionnelle. Mais si tu veux un petit plus : un papier légèrement grainé permet au crayon d’accrocher et rend la main plus consciente de ses mouvements.

Le plus important : **un support sur lequel tu n’as pas peur de te tromper.**

### La posture simple

Pas de truc compliqué :
- épaules basses, dos naturel et pas rigide, poignet posé mais libre
- feuille légèrement inclinée

Ton corps doit comprendre que tu t’apprêtes à faire quelque chose de doux, pas un concours.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'image',
                            id: 'materiel-photo',
                            src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/materiel.png',
                            alt: 'Crayon simple et carnet posé sur une table en bois',
                            caption: 'Un crayon, une feuille : largement suffisant pour commencer.',
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'si-tu-nas-rien-sous-la-main',
                            tone: 'soft',
                            size: 'compact',
                            title: 'Si tu n’as rien sous la main',
                            markdown: `
Tu peux pratiquer **immédiatement**, même sans matériel “parfait”. Tout fonctionne :

- un stylo
- un vieux cahier
- un bloc-notes du bureau
- un carnet de courses
- une feuille déjà gribouillée au verso

L’important, c’est *le geste*, pas le support.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,

                // 🟣 CARTE 2 — MINI-RITUEL
                {
                    kind: 'two-cols',
                    id: 'mini-rituel-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'mini-rituel',
                            title: 'Mini-rituel : délier la main en 30 secondes',
                            markdown: `
Avant de tracer le moindre trait, offre-toi un bref moment. Juste trente secondes. C’est tout ce qu’il faut pour éviter que ta main se crispe et pour installer un geste plus fluide, plus vivant.

### Le souffle

Inspire doucement. Expire lentement. Laisse ton corps comprendre que tu n’es pas en train de “performer”, mais d’explorer. Un souffle ralenti suffit à calmer le tremblement du premier trait.

### Le poids de la main

Pose ta main sur le papier, sans crayon. Laisse-la glisser un peu, libre, légère. Observe le poids naturel de tes doigts : c’est lui qui dessinera, pas ta force.

C’est souvent cet instant simple qui débloque tout.

### La pression du crayon

Prends ton crayon et, avant de tracer, teste trois pressions :
- très légère
- douce
- un peu plus appuyée

Ressens ce qui est le plus confortable aujourd’hui. Tu n’as pas besoin d’être constant·e : tu as juste besoin d’être **présent·e**.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'encart',
                            id: 'check-express',
                            tone: 'question',
                            title: 'Check express avant de tracer',
                            markdown: `
Juste avant de poser ton premier trait, pose-toi ces trois micro-questions :

- Mes épaules sont-elles relâchées ?
- Mon souffle est-il calme ?
- Mon poignet peut-il bouger sans tension ?

Si la réponse est “oui” à au moins deux d’entre elles, tu es prêt·e.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'image',
                            id: 'rituel-image',
                            src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/mini-rituel.png',
                            alt: 'Main posée sur une feuille, prête à tracer',
                            caption: 'Un petit rituel avant de dessiner peut tout changer.',
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 4) VIDÉO
        {
            id: 'video',
            anchorId: 'video-tutoriel',
            label: 'Vidéo du tutoriel',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'video-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'video',
                            id: 'video-tutoriel',
                            url: 'https://www.youtube.com/embed/eNuOpMOPorU',
                            caption: 'Suis le tutoriel en vidéo, geste par geste.',
                            cover: {
                                src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/hero.png',
                                alt: 'Main qui trace un premier trait sur une feuille blanche',
                            },
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'video-title',
                            title: 'La vidéo du tutoriel',
                            markdown: `
Tu verras :
- comment j’échauffe ma main avant chaque exercice,
- comment je place mes doigts pour éviter la crispation,
- comment les lignes libres se dessinent sans chercher la perfection,
- comment les cercles imparfaits deviennent un petit rythme apaisant,
- comment le trait lent ouvre un espace calme, presque méditatif.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'video-conseil',
                            tone: 'soft',
                            size: 'compact',
                            title: 'Conseil pour regarder la vidéo',
                            markdown: `
Regarde-la une première fois sans dessiner, juste pour sentir le rythme. Puis prends ton crayon, et refais chaque geste avec moi.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 5) EXERCICES (onglets)
        {
            id: 'exercises',
            anchorId: 'exercices',
            label: 'Les exercices',
            blocks: [
                {
                    kind: 'exercises-group',
                    id: 'exercises-group',
                    items: [
                        {
                            id: 'exercice-1',
                            label: 'Exercice 1 — Lignes libres',
                            blocks: [
                                {
                                    kind: 'two-cols',
                                    id: 'exercice-1-section',
                                    hero: {
                                        src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/exercice-1.png',
                                        alt: 'Page remplie de lignes libres dans toutes les directions',
                                        caption: 'Les lignes libres : un terrain de jeu sans jugement.',
                                    },
                                    layout: 'balanced',
                                    variant: 'section-card',
                                    left: [
                                        {
                                            kind: 'rich-text',
                                            id: 'exercice-1-texte',
                                            title: 'Exercice 1 : Les lignes libres',
                                            markdown: `
### Objectif de l’exercice

Cet exercice est le plus simple… et pourtant, c’est l’un des plus puissants.

Il sert à casser la rigidité, à ouvrir la main, à réveiller le poignet.
Tu vas tracer des lignes sans but, sans règle, sans jugement.

### Étapes

1. Pose ta main sur la feuille.
2. Trace une ligne horizontale, sans réfléchir.
3. Trace-en une deuxième, un peu plus rapide.
4. Puis une troisième, plus lente.
5. Continue : longues, courtes, légères, appuyées…
6. Alterne : horizontales, verticales, diagonales.
7. Laisse ta main varier naturellement.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                    right: [
                                        {
                                            kind: 'encart',
                                            id: 'exercice-1-variantes',
                                            tone: 'pedagogic',
                                            size: 'compact',
                                            title: 'Variantes à explorer',
                                            markdown: `
- **Très lentes** → pour sentir chaque millimètre.
- **Très rapides** → pour casser le contrôle.
- **Très longues** → pour mobiliser tout le bras.
- **Très courtes** → pour réveiller la précision douce.
- **En zigzag** → pour assouplir le poignet.
- **En “pluie”** → lignes verticales irrégulières, très libératrices.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                        {
                                            kind: 'encart',
                                            id: 'exercice-1-erreurs',
                                            tone: 'error',
                                            size: 'compact',
                                            title: 'Erreurs courantes (à éviter)',
                                            markdown: `
- Appuyer trop fort → fatigue + crispation.
- Vouloir tracer droit → rigidité immédiate.
- Chercher un “résultat propre” → bloque le geste.
- Dessiner trop petit → empêche le mouvement de respirer.

Une main libre ne cherche pas la précision : elle cherche la **présence**.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                } satisfies TutorialBlock,
                            ],
                        },
                        {
                            id: 'exercice-2',
                            label: 'Exercice 2 — Cercles imparfaits',
                            blocks: [
                                {
                                    kind: 'two-cols',
                                    id: 'exercice-2-section',
                                    hero: {
                                        src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/exercice-2.png',
                                        alt: 'Carnet de croquis rempli de cercles imparfaits tracés au crayon',
                                        caption: 'Les cercles imparfaits réveillent le poignet sans chercher la perfection.',
                                    },
                                    layout: 'balanced',
                                    variant: 'section-card',
                                    left: [
                                        {
                                            kind: 'rich-text',
                                            id: 'exercice-2-texte',
                                            title: 'Exercice 2 : Les cercles imparfaits',
                                            markdown: `
### Objectif de l’exercice

Les cercles imparfaits permettent d'assouplir le poignet rapidement, d'ancrer un geste fluide et continu, de sortir du contrôle trop mental, de retrouver une sensation de geste “naturel”, presque automatique.

Tu vas sentir que le trait suit ton mouvement, pas l’inverse.

### Étapes

1. Pose ton crayon sur la feuille, sans pression excessive et commence un cercle lent, très lent, presque silencieux. Ne cherche pas la symétrie : laisse le cercle se déformer.
2. Continue la boucle sans lever le crayon. Fais 3 à 5 tours.
3. Recommence, mais un peu plus vite.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                    right: [
                                        {
                                            kind: 'encart',
                                            id: 'exercice-2-variantes',
                                            tone: 'pedagogic',
                                            size: 'compact',
                                            title: 'Variantes à explorer',
                                            markdown: `
- **Cercles très lents** → pour sentir chaque variation.
- **Cercles très rapides** → pour casser le contrôle mental.
- **Grands cercles** → pour engager tout le bras.
- **Petits cercles** → pour affiner la précision douce.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                        {
                                            kind: 'encart',
                                            id: 'mini-challenge-cercles',
                                            tone: 'soft',
                                            size: 'compact',
                                            title: 'Mini-challenge : 10 cercles d’un seul geste',
                                            markdown: `
Essaie de faire **10 cercles** sans lever le crayon.

Pas 10 cercles parfaits — 10 cercles en un seul mouvement continu.
Tu vas être surpris·e de voir à quel point ton poignet trouve son propre chemin.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                } satisfies TutorialBlock,
                            ],
                        },
                        {
                            id: 'exercice-3',
                            label: 'Exercice 3 — Trait lent',
                            blocks: [
                                {
                                    kind: 'two-cols',
                                    id: 'exercice-3-section',
                                    hero: {
                                        src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/exercice-3.png',
                                        alt: 'Main qui trace un long trait au crayon, très lentement',
                                        caption: 'Le trait lent : un geste presque méditatif, au rythme de ta respiration.',
                                    },
                                    layout: 'balanced',
                                    variant: 'section-card',
                                    left: [
                                        {
                                            kind: 'rich-text',
                                            id: 'exercice-3-texte',
                                            title: 'Exercice 3 : Le trait lent (maîtriser l’intention)',
                                            markdown: `
### Objectif de l’exercice

Le trait lent t’apprend à écouter ton geste, percevoir les micro-tensions, maîtriser la pression sur le papier et tracer en conscience plutôt qu’en automatisme.

C’est un exercice qui calme le mental et recentre la main.

### Étapes

1. Pose ton crayon sur le papier, juste une seconde. Inspire doucement. En expirant, trace une ligne **très lente**, comme si tu versais du miel. Va d’un point A à un point B en laissant ton bras guider le geste.
2. Observe la sensation sous tes doigts : le crayon qui glisse, accroche, hésite…
3. Recommence, mais encore plus lentement.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                    right: [
                                        {
                                            kind: 'encart',
                                            id: 'exercice-3-variante-respiration',
                                            tone: 'pedagogic',
                                            size: 'compact',
                                            title: 'Variante : respiration + trait',
                                            markdown: `
Associe consciemment chaque trait à ta respiration :

- Inspire pour préparer le geste.
- Expire pendant que tu traces la ligne.
- Recommence en allongeant légèrement l’expiration.

Petit à petit, ton trait va adopter le rythme de ton souffle.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                        {
                                            kind: 'encart',
                                            id: 'astuce-douceur',
                                            tone: 'soft',
                                            size: 'compact',
                                            title: 'Astuce douceur',
                                            markdown: `
Ferme légèrement les yeux pendant 2 secondes avant de tracer.

Cette micro-pause réinitialise ton geste et t’empêche de forcer.
Et si tu veux aller encore plus loin : écoute le son du crayon.
Il raconte tout — la vitesse, la pression, l’intention.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                } satisfies TutorialBlock,
                            ],
                        },
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 8) PROGRESSION
        {
            id: 'progress',
            anchorId: 'progression-main-libre',
            label: 'Suivre sa progression',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'progression-section-card',
                    variant: 'section-card',
                    layout: 'balanced',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'progression-intro',
                            title: 'Comment savoir si ta main devient plus libre ?',
                            markdown: `
La progression en dessin ne se voit pas toujours au premier coup d’œil. Souvent, elle se sent avant de se voir. Et c’est exactement ce qu’on cherche ici : un geste plus vivant, une main plus libre, une relation plus douce avec le trait.

Voici les signes qui montrent que ta main commence à se délier — même si tes dessins ne te paraissent pas encore “meilleurs”.

### Signes visibles

Tu remarqueras peut-être que :

- tes traits deviennent plus **longs**
- tu lèves moins souvent le crayon
- tes lignes sont **plus amples** et souples
- ton poignet change de direction plus facilement
- les cercles improvisés sont moins “cassés”, plus fluides

Ces petits changements, discrets ou non, sont déjà de vrais indicateurs de progression.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'signes-interieurs',
                            markdown: `
### Signes intérieurs

La progression est aussi (et surtout) intérieure :

- doigts moins crispés
- souffle plus calme
- moins de jugement immédiat
- sensation de “me laisser porter par le geste”
- plaisir plus spontané à dessiner

Quand dessiner devient agréable plutôt qu’exigeant, tu as déjà gagné en liberté de geste.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'test-20-secondes',
                            tone: 'pedagogic',
                            size: 'compact',
                            title: 'Test express : 20 secondes pour mesurer ta progression',
                            markdown: `
Fais ceci :
1. Trace une ligne comme tu l’aurais fait avant de lire ce tutoriel.
2. Ensuite, fais un trait lent, calme, avec respiration.
3. Compare les deux.

La différence est parfois subtile… parfois énorme. Dans tous les cas, elle est réelle.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 9) AVANT / APRÈS
        {
            id: 'before-after',
            anchorId: 'avant-apres',
            label: 'Avant / Après',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'avant-apres-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'avant-apres-intro',
                            title: 'Avant / Après : ce qui change vraiment',
                            markdown: `
On croit souvent qu’un “avant/après” doit être spectaculaire : un trait tremblant qui devient parfait, une main maladroite qui devient experte. Mais dans l’apprentissage du dessin — surtout dans la libération du geste — les transformations sont plus fines, plus intérieures, plus sensibles.

Et pourtant… elles comptent davantage que tout.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'two-cols',
                            id: 'avant-apres-comparatif',
                            layout: 'balanced',
                            left: [
                                {
                                    kind: 'rich-text',
                                    id: 'avant-texte',
                                    markdown: `

### Avant : ce que font la plupart des débutants

Avant d’exercer la main, la plupart des gens :
- appuient trop fort
- tracent trop vite
- cherchent à “bien faire” dès le premier trait
- veulent être droits, propres, maîtrisés
- ont le souffle court sans s’en rendre compte
- se jugent dès les premières lignes

Cette tension, presque invisible, se glisse partout : dans la main, le poignet, les épaules… et dans la tête.
                            `.trim(),
                                } satisfies TutorialBlock,
                            ],
                            right: [
                                {
                                    kind: 'rich-text',
                                    id: 'apres-texte',
                                    markdown: `
### Après : ce que tu es en train de mettre en place

Avec ces exercices, ton geste change — peut-être pas ton dessin tout de suite, mais ton **rapport** au dessin :

- ta main devient plus souple
- ton trait plus vivant
- ta pression plus douce
- ton poignet plus mobile
- ta respiration plus calme
- ton regard plus indulgent envers toi-même

Le dessin ne devient pas “meilleur”. Il devient **possible**.

Et c’est cela, la vraie progression.

                            `.trim(),
                                } satisfies TutorialBlock,
                            ],
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'difference-subtile',
                            tone: 'soft',
                            title: 'Pourquoi la différence est parfois subtile… et pourquoi elle est importante',
                            markdown: `
Tu vas peut-être regarder ta feuille et te dire : “Je ne vois pas une énorme différence.”

C’est normal. Le travail que tu fais ici est un travail **interne** :
- tu reprogrammes ta relation au trait,
- tu enseignes à ta main à ne plus avoir peur,
- tu apprends au geste à se libérer sans que tu le forces,
- tu construis une base solide pour tout ton futur dessin.

Le résultat n’est pas immédiat. Il est durable.

Les meilleurs artistes ne dessinent pas mieux parce qu’ils ont “du talent”. Ils dessinent mieux parce qu’ils ont appris à faire confiance à leur geste.

Et aujourd’hui, tu viens de commencer cette transformation.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 10) RESSOURCES
        {
            id: 'resources',
            anchorId: 'ressources',
            label: 'Ressources & téléchargements',
            blocks: [
                {
                    kind: 'resources-grid',
                    id: 'ressources',
                    title: 'Ressources à télécharger',
                    items: [
                        {
                            label: 'Le support de présentation vidéo',
                            description: 'Revois les gestes à ton rythme, autant de fois que tu veux.',
                            href: '/downloads/supports/oser-le-premier-trait.pdf',
                            badge: 'PDF',
                        },
                        {
                            label: 'PDF “Oser le premier trait”',
                            description: 'Garde le tutoriel sous la main, même loin de l’écran.',
                            href: '/downloads/articles/oser-le-premier-trait.pdf',
                            badge: 'PDF',
                        },
                        {
                            label: 'Fiche “Exercice du jour”',
                            description: 'Une petite fiche imprimable pour t’accompagner dans ton carnet.',
                            href: '/downloads/fiches/exercice-premier-trait.pdf',
                            badge: 'À imprimer',
                        },
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 11) FAQ
        {
            id: 'faq',
            anchorId: 'faq',
            label: 'FAQ rapide',
            blocks: [
                {
                    kind: 'faq',
                    id: 'faq-block',
                    title: 'FAQ rapide (3 questions essentielles)',
                    items: [
                        {
                            question: 'À quelle fréquence pratiquer ces exercices ?',
                            answer: `
Le mieux : **un peu tous les jours**, même 3 minutes. Mais si tu manques de temps, une seule séance par semaine suffit déjà à assouplir la main. Ce n’est pas la durée qui compte, c’est la **régularité douce**.
                    `.trim(),
                        },
                        {
                            question: 'Et si mes traits tremblent encore ?',
                            answer: `
Alors tu progresses. Un trait qui tremble, c’est une main qui *apprend*, pas une main qui échoue. Avec le temps, le tremblement devient rythme, puis fluidité. Ne le combats pas : accompagne-le.
                    `.trim(),
                        },
                        {
                            question: 'Combien de temps avant de sentir une différence ?',
                            answer: `
Très vite. Certaines personnes ressentent une amélioration **dès la première séance** : respiration plus calme, geste plus libre, moins de tension. Mais pour une vraie fluidité, compte **7 à 14 jours** de pratique légère.

L’évolution se fait par petites touches — comme une danse qui devient naturelle.
                    `.trim(),
                        },
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 12) CONCLUSION
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
                            id: 'conclusion-main',
                            title: 'Conclusion douce & motivation',
                            markdown: `
Tu viens de faire quelque chose d’important, même si cela te semble simple : tu as donné un peu de temps à ta main, un peu de souffle à ton geste, un peu de douceur à ton regard.

Ces trois exercices ne sont pas de “petits” exercices. Ce sont des portes. Des portes vers un dessin plus libre, plus fluide, plus vivant — un dessin qui te ressemble.

Souviens-toi : tu n’as pas besoin d’être “doué”. Tu n’as pas besoin d’être parfait. Tu as juste besoin d’être là, présent(e), crayon en main, avec l’envie d’essayer.

Chaque trait que tu poses est une conversation avec toi-même. Et aujourd’hui, tu as commencé à l’écouter.

Prends ton temps, recommence demain, refais juste un cercle ou un trait lent si tu n’as que deux minutes. Ce geste-là, même minuscule, nourrit déjà ton art.

Tu es en train de construire quelque chose : un geste qui respire, un regard qui s’ouvre, et une main qui apprend à danser.

**Continue. Doucement, mais continue. Ton trait n’attend que toi.**
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'conclusion-next-step',
                            tone: 'pedagogic',
                            size: 'compact',
                            title: 'Et maintenant, concrètement ?',
                            markdown: `
Pour ancrer ce que tu viens de faire, tu peux :

- refaire **un seul exercice** demain (même 3 minutes)
- glisser une feuille dédiée “lignes libres / cercles / traits lents” dans ton carnet
- noter en deux phrases ce que tu as ressenti dans ta main aujourd’hui

Ce n’est pas la quantité qui compte, mais la **continuité douce**. Un geste répété avec bienveillance vaut plus qu’une séance parfaite, faite une seule fois.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,
    ],
};

const traitGestuelRapide: Tutorial = {
    slug: 'trait-gestuel-rapide',
    title: 'Le trait gestuel : dessiner sans réfléchir',
    excerpt: 'Un exercice libérateur pour éviter de surcontrôler ton dessin. Le geste avant la forme : une petite routine pour casser la raideur du trait.',
    level: 'intermediate',
    pillar: 'dessin-peinture',
    format: 'tutorial',
    readingTime: '9 min',
    coverImage: '/images/articles/dessiner-peindre/oser-premier-trait/exercice-2.png',
    subcategory: 'dp-fondamentaux-du-dessin',
    publishedAt: '2025-06-20',
    hero: {
        src: '/images/articles/dessiner-peindre/oser-premier-trait/exercice-2.png',
        alt: 'Feuille de croquis avec grands traits gestuels rapides et dynamiques',
    },
    sections: [
        // 1) INTRO
        {
            id: 'intro',
            anchorId: 'intro',
            label: 'Introduction',
            blocks: [
                {
                    kind: 'rich-text',
                    id: 'intro',
                    markdown: `
On imagine souvent que dessiner, c’est tracer *la bonne ligne*, celle qui tombe juste, nette, parfaite… du premier coup. Mais le vrai dessin — celui qui respire, celui qui cherche, celui qui vit — ne commence jamais ainsi.

Il commence par une **approche**, une exploration, une poignée de lignes légères qui se superposent comme des murmures. Une forme qui n’est pas encore sûre d’elle, mais qui tente, qui devine, qui respire.

Dessiner sans gomme, ce n’est pas dessiner “juste”. C’est dessiner **vivant**.

C’est accepter que ton trait n’ait pas à décider trop tôt. Qu’il puisse tourner un peu, trembler, chercher son chemin. C’est lui offrir l’espace de se tromper… et de trouver, en se trompant, quelque chose de plus vrai.

Ici, tu ne vas rien effacer. Tu vas laisser les lignes se parler entre elles, se répondre, se superposer. Et tu vas voir qu’un dessin peut être beau *précisément* parce qu’il porte ses hésitations.

Ce tutoriel n’est pas une méthode pour “réussir”. C’est un chemin pour **te réconcilier avec le geste**, pour t’apprendre à observer, à oser, à accepter les accidents — et à en faire la richesse de ton dessin.

Ici, l’erreur n’est jamais un problème. Elle est le début de ton trait.
                    `.trim(),
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 2) AVANT DE COMMENCER
        {
            id: 'before-start',
            anchorId: 'avant-de-commencer',
            label: 'Avant de commencer',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'avant-de-commencer-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'image',
                            id: 'avant-de-commencer-hero',
                            src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/avant-commencer.png',
                            alt: 'Zoom sur un crayon posé au bord d’une feuille blanche',
                            caption: 'Le premier trait n’est pas un test : c’est un échauffement.',
                            emphasis: 'focus',
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'etat-esprit-avant',
                            tone: 'error',
                            size: 'compact',
                            title: 'Ce que tu n’as pas besoin de savoir',
                            markdown: `
Pour commencer ce tutoriel, tu n’as absolument pas besoin de :
- savoir tracer droit
- connaître les contours exacts
- faire joli
- éviter les erreurs
- être sûr de toi
- décider rapidement
- produire un dessin montrable

Tu n’as besoin que d’une chose : **laisser ton trait chercher avant de décider.**
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'avant-de-commencer-texte',
                            title: 'Avant de commencer : pourquoi on veut “corriger” trop vite',
                            markdown: `
### La peur de figer trop tôt

Si tu gommes, c’est souvent pour éviter ceci :
- “Je ne veux pas que la forme soit ça.”
- “J’ai peur de me tromper.”
- “Si je laisse cette ligne, on croira que je l’ai voulue.”

Alors tu effaces, tu recommences, tu corriges. Mais ce réflexe te coupe de ton vrai geste — celui qui cherche, celui qui observe.

Gommer, c’est souvent essayer d’être sûr alors que ton œil est encore en train de comprendre.

### Un trait définitif trop tôt… ferme toutes les possibilités

Un trait net dit : **“C’est ici, exactement.”**

Mais ton œil n’a pas encore exploré :
- est-ce un peu plus long ? plus haut ? plus incliné ? plus large ? plus organique ?

La ligne nette enferme. La ligne légère ouvre.

Le contour ferme la forme. Le trait exploratoire lui laisse le temps d’apparaître.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 3) MATÉRIEL + MINI-RITUEL
        {
            id: 'material-ritual',
            anchorId: 'materiel',
            label: 'Matériel & mini-rituel',
            blocks: [
                // 🟢 CARTE 1 — MATÉRIEL
                {
                    kind: 'two-cols',
                    id: 'materiel-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'materiel',
                            title: 'Matériel minimal (et suffisant)',
                            markdown: `
Tu n’as pas besoin d’un atelier d’artiste, de matériel coûteux ou d’un carnet en cuir qui sent la bibliothèque ancienne.

Pour délier la main, trois choses suffisent — vraiment.

### Le crayon idéal

N’importe quel crayon fera l’affaire, mais si tu as le choix, privilégie un crayon **HB** ou **2B**. Ils glissent facilement, ne demandent pas de force, et pardonnent les hésitations.

Un conseil doux : choisis un crayon que tu *aimes* tenir. Parfois, le confort du geste commence par le confort de l’objet.

### Le papier : grain, douceur, confort

Une simple feuille d’imprimante fonctionne très bien. Pas besoin de feuille professionnelle. Mais si tu veux un petit plus : un papier légèrement grainé permet au crayon d’accrocher et rend la main plus consciente de ses mouvements.

Le plus important : **un support sur lequel tu n’as pas peur de te tromper.**

### La posture simple

Pas de truc compliqué :
- épaules basses, dos naturel et pas rigide, poignet posé mais libre
- feuille légèrement inclinée

Ton corps doit comprendre que tu t’apprêtes à faire quelque chose de doux, pas un concours.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'image',
                            id: 'materiel-photo',
                            src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/materiel.png',
                            alt: 'Crayon simple et carnet posé sur une table en bois',
                            caption: 'Un crayon, une feuille : largement suffisant pour commencer.',
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'si-tu-nas-rien-sous-la-main',
                            tone: 'soft',
                            size: 'compact',
                            title: 'Si tu n’as rien sous la main',
                            markdown: `
Tu peux pratiquer **immédiatement**, même sans matériel “parfait”. Tout fonctionne :

- un stylo
- un vieux cahier
- un bloc-notes du bureau
- un carnet de courses
- une feuille déjà gribouillée au verso

L’important, c’est *le geste*, pas le support.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,

                // 🟣 CARTE 2 — MINI-RITUEL
                {
                    kind: 'two-cols',
                    id: 'mini-rituel-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'mini-rituel',
                            title: 'Mini-rituel : délier la main en 30 secondes',
                            markdown: `
Avant de tracer le moindre trait, offre-toi un bref moment. Juste trente secondes. C’est tout ce qu’il faut pour éviter que ta main se crispe et pour installer un geste plus fluide, plus vivant.

### Le souffle

Inspire doucement. Expire lentement. Laisse ton corps comprendre que tu n’es pas en train de “performer”, mais d’explorer. Un souffle ralenti suffit à calmer le tremblement du premier trait.

### Le poids de la main

Pose ta main sur le papier, sans crayon. Laisse-la glisser un peu, libre, légère. Observe le poids naturel de tes doigts : c’est lui qui dessinera, pas ta force.

C’est souvent cet instant simple qui débloque tout.

### La pression du crayon

Prends ton crayon et, avant de tracer, teste trois pressions :
- très légère
- douce
- un peu plus appuyée

Ressens ce qui est le plus confortable aujourd’hui. Tu n’as pas besoin d’être constant·e : tu as juste besoin d’être **présent·e**.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'encart',
                            id: 'check-express',
                            tone: 'question',
                            title: 'Check express avant de tracer',
                            markdown: `
Juste avant de poser ton premier trait, pose-toi ces trois micro-questions :

- Mes épaules sont-elles relâchées ?
- Mon souffle est-il calme ?
- Mon poignet peut-il bouger sans tension ?

Si la réponse est “oui” à au moins deux d’entre elles, tu es prêt·e.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'image',
                            id: 'rituel-image',
                            src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/mini-rituel.png',
                            alt: 'Main posée sur une feuille, prête à tracer',
                            caption: 'Un petit rituel avant de dessiner peut tout changer.',
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 4) VIDÉO
        {
            id: 'video',
            anchorId: 'video-tutoriel',
            label: 'Vidéo du tutoriel',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'video-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'video',
                            id: 'video-tutoriel',
                            url: 'https://www.youtube.com/embed/eNuOpMOPorU',
                            caption: 'Suis le tutoriel en vidéo, geste par geste.',
                            cover: {
                                src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/hero.png',
                                alt: 'Main qui trace un premier trait sur une feuille blanche',
                            },
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'video-title',
                            title: 'La vidéo du tutoriel',
                            markdown: `
Tu verras :
- comment j’échauffe ma main avant chaque exercice,
- comment je place mes doigts pour éviter la crispation,
- comment les lignes libres se dessinent sans chercher la perfection,
- comment les cercles imparfaits deviennent un petit rythme apaisant,
- comment le trait lent ouvre un espace calme, presque méditatif.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'video-conseil',
                            tone: 'soft',
                            size: 'compact',
                            title: 'Conseil pour regarder la vidéo',
                            markdown: `
Regarde-la une première fois sans dessiner, juste pour sentir le rythme. Puis prends ton crayon, et refais chaque geste avec moi.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 5) EXERCICES (onglets)
        {
            id: 'exercises',
            anchorId: 'exercices',
            label: 'Les exercices',
            blocks: [
                {
                    kind: 'exercises-group',
                    id: 'exercises-group',
                    items: [
                        {
                            id: 'exercice-1',
                            label: 'Exercice 1 — Lignes libres',
                            blocks: [
                                {
                                    kind: 'two-cols',
                                    id: 'exercice-1-section',
                                    hero: {
                                        src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/exercice-1.png',
                                        alt: 'Page remplie de lignes libres dans toutes les directions',
                                        caption: 'Les lignes libres : un terrain de jeu sans jugement.',
                                    },
                                    layout: 'balanced',
                                    variant: 'section-card',
                                    left: [
                                        {
                                            kind: 'rich-text',
                                            id: 'exercice-1-texte',
                                            title: 'Exercice 1 : Les lignes libres',
                                            markdown: `
### Objectif de l’exercice

Cet exercice est le plus simple… et pourtant, c’est l’un des plus puissants.

Il sert à casser la rigidité, à ouvrir la main, à réveiller le poignet.
Tu vas tracer des lignes sans but, sans règle, sans jugement.

### Étapes

1. Pose ta main sur la feuille.
2. Trace une ligne horizontale, sans réfléchir.
3. Trace-en une deuxième, un peu plus rapide.
4. Puis une troisième, plus lente.
5. Continue : longues, courtes, légères, appuyées…
6. Alterne : horizontales, verticales, diagonales.
7. Laisse ta main varier naturellement.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                    right: [
                                        {
                                            kind: 'encart',
                                            id: 'exercice-1-variantes',
                                            tone: 'pedagogic',
                                            size: 'compact',
                                            title: 'Variantes à explorer',
                                            markdown: `
- **Très lentes** → pour sentir chaque millimètre.
- **Très rapides** → pour casser le contrôle.
- **Très longues** → pour mobiliser tout le bras.
- **Très courtes** → pour réveiller la précision douce.
- **En zigzag** → pour assouplir le poignet.
- **En “pluie”** → lignes verticales irrégulières, très libératrices.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                        {
                                            kind: 'encart',
                                            id: 'exercice-1-erreurs',
                                            tone: 'error',
                                            size: 'compact',
                                            title: 'Erreurs courantes (à éviter)',
                                            markdown: `
- Appuyer trop fort → fatigue + crispation.
- Vouloir tracer droit → rigidité immédiate.
- Chercher un “résultat propre” → bloque le geste.
- Dessiner trop petit → empêche le mouvement de respirer.

Une main libre ne cherche pas la précision : elle cherche la **présence**.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                } satisfies TutorialBlock,
                            ],
                        },
                        {
                            id: 'exercice-2',
                            label: 'Exercice 2 — Cercles imparfaits',
                            blocks: [
                                {
                                    kind: 'two-cols',
                                    id: 'exercice-2-section',
                                    hero: {
                                        src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/exercice-2.png',
                                        alt: 'Carnet de croquis rempli de cercles imparfaits tracés au crayon',
                                        caption: 'Les cercles imparfaits réveillent le poignet sans chercher la perfection.',
                                    },
                                    layout: 'balanced',
                                    variant: 'section-card',
                                    left: [
                                        {
                                            kind: 'rich-text',
                                            id: 'exercice-2-texte',
                                            title: 'Exercice 2 : Les cercles imparfaits',
                                            markdown: `
### Objectif de l’exercice

Les cercles imparfaits permettent d'assouplir le poignet rapidement, d'ancrer un geste fluide et continu, de sortir du contrôle trop mental, de retrouver une sensation de geste “naturel”, presque automatique.

Tu vas sentir que le trait suit ton mouvement, pas l’inverse.

### Étapes

1. Pose ton crayon sur la feuille, sans pression excessive et commence un cercle lent, très lent, presque silencieux. Ne cherche pas la symétrie : laisse le cercle se déformer.
2. Continue la boucle sans lever le crayon. Fais 3 à 5 tours.
3. Recommence, mais un peu plus vite.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                    right: [
                                        {
                                            kind: 'encart',
                                            id: 'exercice-2-variantes',
                                            tone: 'pedagogic',
                                            size: 'compact',
                                            title: 'Variantes à explorer',
                                            markdown: `
- **Cercles très lents** → pour sentir chaque variation.
- **Cercles très rapides** → pour casser le contrôle mental.
- **Grands cercles** → pour engager tout le bras.
- **Petits cercles** → pour affiner la précision douce.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                        {
                                            kind: 'encart',
                                            id: 'mini-challenge-cercles',
                                            tone: 'soft',
                                            size: 'compact',
                                            title: 'Mini-challenge : 10 cercles d’un seul geste',
                                            markdown: `
Essaie de faire **10 cercles** sans lever le crayon.

Pas 10 cercles parfaits — 10 cercles en un seul mouvement continu.
Tu vas être surpris·e de voir à quel point ton poignet trouve son propre chemin.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                } satisfies TutorialBlock,
                            ],
                        },
                        {
                            id: 'exercice-3',
                            label: 'Exercice 3 — Trait lent',
                            blocks: [
                                {
                                    kind: 'two-cols',
                                    id: 'exercice-3-section',
                                    hero: {
                                        src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/exercice-3.png',
                                        alt: 'Main qui trace un long trait au crayon, très lentement',
                                        caption: 'Le trait lent : un geste presque méditatif, au rythme de ta respiration.',
                                    },
                                    layout: 'balanced',
                                    variant: 'section-card',
                                    left: [
                                        {
                                            kind: 'rich-text',
                                            id: 'exercice-3-texte',
                                            title: 'Exercice 3 : Le trait lent (maîtriser l’intention)',
                                            markdown: `
### Objectif de l’exercice

Le trait lent t’apprend à écouter ton geste, percevoir les micro-tensions, maîtriser la pression sur le papier et tracer en conscience plutôt qu’en automatisme.

C’est un exercice qui calme le mental et recentre la main.

### Étapes

1. Pose ton crayon sur le papier, juste une seconde. Inspire doucement. En expirant, trace une ligne **très lente**, comme si tu versais du miel. Va d’un point A à un point B en laissant ton bras guider le geste.
2. Observe la sensation sous tes doigts : le crayon qui glisse, accroche, hésite…
3. Recommence, mais encore plus lentement.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                    right: [
                                        {
                                            kind: 'encart',
                                            id: 'exercice-3-variante-respiration',
                                            tone: 'pedagogic',
                                            size: 'compact',
                                            title: 'Variante : respiration + trait',
                                            markdown: `
Associe consciemment chaque trait à ta respiration :

- Inspire pour préparer le geste.
- Expire pendant que tu traces la ligne.
- Recommence en allongeant légèrement l’expiration.

Petit à petit, ton trait va adopter le rythme de ton souffle.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                        {
                                            kind: 'encart',
                                            id: 'astuce-douceur',
                                            tone: 'soft',
                                            size: 'compact',
                                            title: 'Astuce douceur',
                                            markdown: `
Ferme légèrement les yeux pendant 2 secondes avant de tracer.

Cette micro-pause réinitialise ton geste et t’empêche de forcer.
Et si tu veux aller encore plus loin : écoute le son du crayon.
Il raconte tout — la vitesse, la pression, l’intention.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                } satisfies TutorialBlock,
                            ],
                        },
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 8) PROGRESSION
        {
            id: 'progress',
            anchorId: 'progression-main-libre',
            label: 'Suivre sa progression',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'progression-section-card',
                    variant: 'section-card',
                    layout: 'balanced',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'progression-intro',
                            title: 'Comment savoir si ta main devient plus libre ?',
                            markdown: `
La progression en dessin ne se voit pas toujours au premier coup d’œil. Souvent, elle se sent avant de se voir. Et c’est exactement ce qu’on cherche ici : un geste plus vivant, une main plus libre, une relation plus douce avec le trait.

Voici les signes qui montrent que ta main commence à se délier — même si tes dessins ne te paraissent pas encore “meilleurs”.

### Signes visibles

Tu remarqueras peut-être que :

- tes traits deviennent plus **longs**
- tu lèves moins souvent le crayon
- tes lignes sont **plus amples** et souples
- ton poignet change de direction plus facilement
- les cercles improvisés sont moins “cassés”, plus fluides

Ces petits changements, discrets ou non, sont déjà de vrais indicateurs de progression.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'signes-interieurs',
                            markdown: `
### Signes intérieurs

La progression est aussi (et surtout) intérieure :

- doigts moins crispés
- souffle plus calme
- moins de jugement immédiat
- sensation de “me laisser porter par le geste”
- plaisir plus spontané à dessiner

Quand dessiner devient agréable plutôt qu’exigeant, tu as déjà gagné en liberté de geste.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'test-20-secondes',
                            tone: 'pedagogic',
                            size: 'compact',
                            title: 'Test express : 20 secondes pour mesurer ta progression',
                            markdown: `
Fais ceci :
1. Trace une ligne comme tu l’aurais fait avant de lire ce tutoriel.
2. Ensuite, fais un trait lent, calme, avec respiration.
3. Compare les deux.

La différence est parfois subtile… parfois énorme. Dans tous les cas, elle est réelle.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 9) AVANT / APRÈS
        {
            id: 'before-after',
            anchorId: 'avant-apres',
            label: 'Avant / Après',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'avant-apres-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'avant-apres-intro',
                            title: 'Avant / Après : ce qui change vraiment',
                            markdown: `
On croit souvent qu’un “avant/après” doit être spectaculaire : un trait tremblant qui devient parfait, une main maladroite qui devient experte. Mais dans l’apprentissage du dessin — surtout dans la libération du geste — les transformations sont plus fines, plus intérieures, plus sensibles.

Et pourtant… elles comptent davantage que tout.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'two-cols',
                            id: 'avant-apres-comparatif',
                            layout: 'balanced',
                            left: [
                                {
                                    kind: 'rich-text',
                                    id: 'avant-texte',
                                    markdown: `

### Avant : ce que font la plupart des débutants

Avant d’exercer la main, la plupart des gens :
- appuient trop fort
- tracent trop vite
- cherchent à “bien faire” dès le premier trait
- veulent être droits, propres, maîtrisés
- ont le souffle court sans s’en rendre compte
- se jugent dès les premières lignes

Cette tension, presque invisible, se glisse partout : dans la main, le poignet, les épaules… et dans la tête.
                            `.trim(),
                                } satisfies TutorialBlock,
                            ],
                            right: [
                                {
                                    kind: 'rich-text',
                                    id: 'apres-texte',
                                    markdown: `
### Après : ce que tu es en train de mettre en place

Avec ces exercices, ton geste change — peut-être pas ton dessin tout de suite, mais ton **rapport** au dessin :

- ta main devient plus souple
- ton trait plus vivant
- ta pression plus douce
- ton poignet plus mobile
- ta respiration plus calme
- ton regard plus indulgent envers toi-même

Le dessin ne devient pas “meilleur”. Il devient **possible**.

Et c’est cela, la vraie progression.

                            `.trim(),
                                } satisfies TutorialBlock,
                            ],
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'difference-subtile',
                            tone: 'soft',
                            title: 'Pourquoi la différence est parfois subtile… et pourquoi elle est importante',
                            markdown: `
Tu vas peut-être regarder ta feuille et te dire : “Je ne vois pas une énorme différence.”

C’est normal. Le travail que tu fais ici est un travail **interne** :
- tu reprogrammes ta relation au trait,
- tu enseignes à ta main à ne plus avoir peur,
- tu apprends au geste à se libérer sans que tu le forces,
- tu construis une base solide pour tout ton futur dessin.

Le résultat n’est pas immédiat. Il est durable.

Les meilleurs artistes ne dessinent pas mieux parce qu’ils ont “du talent”. Ils dessinent mieux parce qu’ils ont appris à faire confiance à leur geste.

Et aujourd’hui, tu viens de commencer cette transformation.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 10) RESSOURCES
        {
            id: 'resources',
            anchorId: 'ressources',
            label: 'Ressources & téléchargements',
            blocks: [
                {
                    kind: 'resources-grid',
                    id: 'ressources',
                    title: 'Ressources à télécharger',
                    items: [
                        {
                            label: 'Le support de présentation vidéo',
                            description: 'Revois les gestes à ton rythme, autant de fois que tu veux.',
                            href: '/downloads/supports/oser-le-premier-trait.pdf',
                            badge: 'PDF',
                        },
                        {
                            label: 'PDF “Oser le premier trait”',
                            description: 'Garde le tutoriel sous la main, même loin de l’écran.',
                            href: '/downloads/articles/oser-le-premier-trait.pdf',
                            badge: 'PDF',
                        },
                        {
                            label: 'Fiche “Exercice du jour”',
                            description: 'Une petite fiche imprimable pour t’accompagner dans ton carnet.',
                            href: '/downloads/fiches/exercice-premier-trait.pdf',
                            badge: 'À imprimer',
                        },
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 11) FAQ
        {
            id: 'faq',
            anchorId: 'faq',
            label: 'FAQ rapide',
            blocks: [
                {
                    kind: 'faq',
                    id: 'faq-block',
                    title: 'FAQ rapide (3 questions essentielles)',
                    items: [
                        {
                            question: 'À quelle fréquence pratiquer ces exercices ?',
                            answer: `
Le mieux : **un peu tous les jours**, même 3 minutes. Mais si tu manques de temps, une seule séance par semaine suffit déjà à assouplir la main. Ce n’est pas la durée qui compte, c’est la **régularité douce**.
                    `.trim(),
                        },
                        {
                            question: 'Et si mes traits tremblent encore ?',
                            answer: `
Alors tu progresses. Un trait qui tremble, c’est une main qui *apprend*, pas une main qui échoue. Avec le temps, le tremblement devient rythme, puis fluidité. Ne le combats pas : accompagne-le.
                    `.trim(),
                        },
                        {
                            question: 'Combien de temps avant de sentir une différence ?',
                            answer: `
Très vite. Certaines personnes ressentent une amélioration **dès la première séance** : respiration plus calme, geste plus libre, moins de tension. Mais pour une vraie fluidité, compte **7 à 14 jours** de pratique légère.

L’évolution se fait par petites touches — comme une danse qui devient naturelle.
                    `.trim(),
                        },
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 12) CONCLUSION
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
                            id: 'conclusion-main',
                            title: 'Conclusion douce & motivation',
                            markdown: `
Tu viens de faire quelque chose d’important, même si cela te semble simple : tu as donné un peu de temps à ta main, un peu de souffle à ton geste, un peu de douceur à ton regard.

Ces trois exercices ne sont pas de “petits” exercices. Ce sont des portes. Des portes vers un dessin plus libre, plus fluide, plus vivant — un dessin qui te ressemble.

Souviens-toi : tu n’as pas besoin d’être “doué”. Tu n’as pas besoin d’être parfait. Tu as juste besoin d’être là, présent(e), crayon en main, avec l’envie d’essayer.

Chaque trait que tu poses est une conversation avec toi-même. Et aujourd’hui, tu as commencé à l’écouter.

Prends ton temps, recommence demain, refais juste un cercle ou un trait lent si tu n’as que deux minutes. Ce geste-là, même minuscule, nourrit déjà ton art.

Tu es en train de construire quelque chose : un geste qui respire, un regard qui s’ouvre, et une main qui apprend à danser.

**Continue. Doucement, mais continue. Ton trait n’attend que toi.**
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'conclusion-next-step',
                            tone: 'pedagogic',
                            size: 'compact',
                            title: 'Et maintenant, concrètement ?',
                            markdown: `
Pour ancrer ce que tu viens de faire, tu peux :

- refaire **un seul exercice** demain (même 3 minutes)
- glisser une feuille dédiée “lignes libres / cercles / traits lents” dans ton carnet
- noter en deux phrases ce que tu as ressenti dans ta main aujourd’hui

Ce n’est pas la quantité qui compte, mais la **continuité douce**. Un geste répété avec bienveillance vaut plus qu’une séance parfaite, faite une seule fois.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,
    ],
};

const remplirUnePage: Tutorial = {
    slug: 'remplir-une-page',
    title: 'Remplir une page entière : un exercice pour débloquer le mental',
    excerpt: 'Quand on bloque devant un dessin, remplir une page sans réfléchir peut tout changer. L’objectif n’est pas le “beau”, mais le mouvement.',
    level: 'beginner',
    pillar: 'dessin-peinture',
    format: 'tutorial',
    readingTime: '10 min',
    coverImage: '/images/articles/dessiner-peindre/oser-premier-trait/exercice-3.png',
    subcategory: 'dp-pratique-quotidienne',
    publishedAt: '2025-07-20',
    hero: {
        src: '/images/articles/dessiner-peindre/oser-premier-trait/exercice-3.png',
        alt: 'Page de carnet entièrement remplie de traits, formes et explorations libres.',
    },
    sections: [
        // 1) INTRO
        {
            id: 'intro',
            anchorId: 'intro',
            label: 'Introduction',
            blocks: [
                {
                    kind: 'rich-text',
                    id: 'intro',
                    markdown: `
On imagine souvent que dessiner, c’est tracer *la bonne ligne*, celle qui tombe juste, nette, parfaite… du premier coup. Mais le vrai dessin — celui qui respire, celui qui cherche, celui qui vit — ne commence jamais ainsi.

Il commence par une **approche**, une exploration, une poignée de lignes légères qui se superposent comme des murmures. Une forme qui n’est pas encore sûre d’elle, mais qui tente, qui devine, qui respire.

Dessiner sans gomme, ce n’est pas dessiner “juste”. C’est dessiner **vivant**.

C’est accepter que ton trait n’ait pas à décider trop tôt. Qu’il puisse tourner un peu, trembler, chercher son chemin. C’est lui offrir l’espace de se tromper… et de trouver, en se trompant, quelque chose de plus vrai.

Ici, tu ne vas rien effacer. Tu vas laisser les lignes se parler entre elles, se répondre, se superposer. Et tu vas voir qu’un dessin peut être beau *précisément* parce qu’il porte ses hésitations.

Ce tutoriel n’est pas une méthode pour “réussir”. C’est un chemin pour **te réconcilier avec le geste**, pour t’apprendre à observer, à oser, à accepter les accidents — et à en faire la richesse de ton dessin.

Ici, l’erreur n’est jamais un problème. Elle est le début de ton trait.
                    `.trim(),
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 2) AVANT DE COMMENCER
        {
            id: 'before-start',
            anchorId: 'avant-de-commencer',
            label: 'Avant de commencer',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'avant-de-commencer-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'image',
                            id: 'avant-de-commencer-hero',
                            src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/avant-commencer.png',
                            alt: 'Zoom sur un crayon posé au bord d’une feuille blanche',
                            caption: 'Le premier trait n’est pas un test : c’est un échauffement.',
                            emphasis: 'focus',
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'etat-esprit-avant',
                            tone: 'error',
                            size: 'compact',
                            title: 'Ce que tu n’as pas besoin de savoir',
                            markdown: `
Pour commencer ce tutoriel, tu n’as absolument pas besoin de :
- savoir tracer droit
- connaître les contours exacts
- faire joli
- éviter les erreurs
- être sûr de toi
- décider rapidement
- produire un dessin montrable

Tu n’as besoin que d’une chose : **laisser ton trait chercher avant de décider.**
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'avant-de-commencer-texte',
                            title: 'Avant de commencer : pourquoi on veut “corriger” trop vite',
                            markdown: `
### La peur de figer trop tôt

Si tu gommes, c’est souvent pour éviter ceci :
- “Je ne veux pas que la forme soit ça.”
- “J’ai peur de me tromper.”
- “Si je laisse cette ligne, on croira que je l’ai voulue.”

Alors tu effaces, tu recommences, tu corriges. Mais ce réflexe te coupe de ton vrai geste — celui qui cherche, celui qui observe.

Gommer, c’est souvent essayer d’être sûr alors que ton œil est encore en train de comprendre.

### Un trait définitif trop tôt… ferme toutes les possibilités

Un trait net dit : **“C’est ici, exactement.”**

Mais ton œil n’a pas encore exploré :
- est-ce un peu plus long ? plus haut ? plus incliné ? plus large ? plus organique ?

La ligne nette enferme. La ligne légère ouvre.

Le contour ferme la forme. Le trait exploratoire lui laisse le temps d’apparaître.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 3) MATÉRIEL + MINI-RITUEL
        {
            id: 'material-ritual',
            anchorId: 'materiel',
            label: 'Matériel & mini-rituel',
            blocks: [
                // 🟢 CARTE 1 — MATÉRIEL
                {
                    kind: 'two-cols',
                    id: 'materiel-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'materiel',
                            title: 'Matériel minimal (et suffisant)',
                            markdown: `
Tu n’as pas besoin d’un atelier d’artiste, de matériel coûteux ou d’un carnet en cuir qui sent la bibliothèque ancienne.

Pour délier la main, trois choses suffisent — vraiment.

### Le crayon idéal

N’importe quel crayon fera l’affaire, mais si tu as le choix, privilégie un crayon **HB** ou **2B**. Ils glissent facilement, ne demandent pas de force, et pardonnent les hésitations.

Un conseil doux : choisis un crayon que tu *aimes* tenir. Parfois, le confort du geste commence par le confort de l’objet.

### Le papier : grain, douceur, confort

Une simple feuille d’imprimante fonctionne très bien. Pas besoin de feuille professionnelle. Mais si tu veux un petit plus : un papier légèrement grainé permet au crayon d’accrocher et rend la main plus consciente de ses mouvements.

Le plus important : **un support sur lequel tu n’as pas peur de te tromper.**

### La posture simple

Pas de truc compliqué :
- épaules basses, dos naturel et pas rigide, poignet posé mais libre
- feuille légèrement inclinée

Ton corps doit comprendre que tu t’apprêtes à faire quelque chose de doux, pas un concours.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'image',
                            id: 'materiel-photo',
                            src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/materiel.png',
                            alt: 'Crayon simple et carnet posé sur une table en bois',
                            caption: 'Un crayon, une feuille : largement suffisant pour commencer.',
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'si-tu-nas-rien-sous-la-main',
                            tone: 'soft',
                            size: 'compact',
                            title: 'Si tu n’as rien sous la main',
                            markdown: `
Tu peux pratiquer **immédiatement**, même sans matériel “parfait”. Tout fonctionne :

- un stylo
- un vieux cahier
- un bloc-notes du bureau
- un carnet de courses
- une feuille déjà gribouillée au verso

L’important, c’est *le geste*, pas le support.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,

                // 🟣 CARTE 2 — MINI-RITUEL
                {
                    kind: 'two-cols',
                    id: 'mini-rituel-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'mini-rituel',
                            title: 'Mini-rituel : délier la main en 30 secondes',
                            markdown: `
Avant de tracer le moindre trait, offre-toi un bref moment. Juste trente secondes. C’est tout ce qu’il faut pour éviter que ta main se crispe et pour installer un geste plus fluide, plus vivant.

### Le souffle

Inspire doucement. Expire lentement. Laisse ton corps comprendre que tu n’es pas en train de “performer”, mais d’explorer. Un souffle ralenti suffit à calmer le tremblement du premier trait.

### Le poids de la main

Pose ta main sur le papier, sans crayon. Laisse-la glisser un peu, libre, légère. Observe le poids naturel de tes doigts : c’est lui qui dessinera, pas ta force.

C’est souvent cet instant simple qui débloque tout.

### La pression du crayon

Prends ton crayon et, avant de tracer, teste trois pressions :
- très légère
- douce
- un peu plus appuyée

Ressens ce qui est le plus confortable aujourd’hui. Tu n’as pas besoin d’être constant·e : tu as juste besoin d’être **présent·e**.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'encart',
                            id: 'check-express',
                            tone: 'question',
                            title: 'Check express avant de tracer',
                            markdown: `
Juste avant de poser ton premier trait, pose-toi ces trois micro-questions :

- Mes épaules sont-elles relâchées ?
- Mon souffle est-il calme ?
- Mon poignet peut-il bouger sans tension ?

Si la réponse est “oui” à au moins deux d’entre elles, tu es prêt·e.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'image',
                            id: 'rituel-image',
                            src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/mini-rituel.png',
                            alt: 'Main posée sur une feuille, prête à tracer',
                            caption: 'Un petit rituel avant de dessiner peut tout changer.',
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 4) VIDÉO
        {
            id: 'video',
            anchorId: 'video-tutoriel',
            label: 'Vidéo du tutoriel',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'video-section',
                    layout: 'balanced',
                    variant: 'section-card',
                    left: [
                        {
                            kind: 'video',
                            id: 'video-tutoriel',
                            url: 'https://www.youtube.com/embed/eNuOpMOPorU',
                            caption: 'Suis le tutoriel en vidéo, geste par geste.',
                            cover: {
                                src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/hero.png',
                                alt: 'Main qui trace un premier trait sur une feuille blanche',
                            },
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'video-title',
                            title: 'La vidéo du tutoriel',
                            markdown: `
Tu verras :
- comment j’échauffe ma main avant chaque exercice,
- comment je place mes doigts pour éviter la crispation,
- comment les lignes libres se dessinent sans chercher la perfection,
- comment les cercles imparfaits deviennent un petit rythme apaisant,
- comment le trait lent ouvre un espace calme, presque méditatif.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'video-conseil',
                            tone: 'soft',
                            size: 'compact',
                            title: 'Conseil pour regarder la vidéo',
                            markdown: `
Regarde-la une première fois sans dessiner, juste pour sentir le rythme. Puis prends ton crayon, et refais chaque geste avec moi.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 5) EXERCICES (onglets)
        {
            id: 'exercises',
            anchorId: 'exercices',
            label: 'Les exercices',
            blocks: [
                {
                    kind: 'exercises-group',
                    id: 'exercises-group',
                    items: [
                        {
                            id: 'exercice-1',
                            label: 'Exercice 1 — Lignes libres',
                            blocks: [
                                {
                                    kind: 'two-cols',
                                    id: 'exercice-1-section',
                                    hero: {
                                        src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/exercice-1.png',
                                        alt: 'Page remplie de lignes libres dans toutes les directions',
                                        caption: 'Les lignes libres : un terrain de jeu sans jugement.',
                                    },
                                    layout: 'balanced',
                                    variant: 'section-card',
                                    left: [
                                        {
                                            kind: 'rich-text',
                                            id: 'exercice-1-texte',
                                            title: 'Exercice 1 : Les lignes libres',
                                            markdown: `
### Objectif de l’exercice

Cet exercice est le plus simple… et pourtant, c’est l’un des plus puissants.

Il sert à casser la rigidité, à ouvrir la main, à réveiller le poignet.
Tu vas tracer des lignes sans but, sans règle, sans jugement.

### Étapes

1. Pose ta main sur la feuille.
2. Trace une ligne horizontale, sans réfléchir.
3. Trace-en une deuxième, un peu plus rapide.
4. Puis une troisième, plus lente.
5. Continue : longues, courtes, légères, appuyées…
6. Alterne : horizontales, verticales, diagonales.
7. Laisse ta main varier naturellement.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                    right: [
                                        {
                                            kind: 'encart',
                                            id: 'exercice-1-variantes',
                                            tone: 'pedagogic',
                                            size: 'compact',
                                            title: 'Variantes à explorer',
                                            markdown: `
- **Très lentes** → pour sentir chaque millimètre.
- **Très rapides** → pour casser le contrôle.
- **Très longues** → pour mobiliser tout le bras.
- **Très courtes** → pour réveiller la précision douce.
- **En zigzag** → pour assouplir le poignet.
- **En “pluie”** → lignes verticales irrégulières, très libératrices.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                        {
                                            kind: 'encart',
                                            id: 'exercice-1-erreurs',
                                            tone: 'error',
                                            size: 'compact',
                                            title: 'Erreurs courantes (à éviter)',
                                            markdown: `
- Appuyer trop fort → fatigue + crispation.
- Vouloir tracer droit → rigidité immédiate.
- Chercher un “résultat propre” → bloque le geste.
- Dessiner trop petit → empêche le mouvement de respirer.

Une main libre ne cherche pas la précision : elle cherche la **présence**.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                } satisfies TutorialBlock,
                            ],
                        },
                        {
                            id: 'exercice-2',
                            label: 'Exercice 2 — Cercles imparfaits',
                            blocks: [
                                {
                                    kind: 'two-cols',
                                    id: 'exercice-2-section',
                                    hero: {
                                        src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/exercice-2.png',
                                        alt: 'Carnet de croquis rempli de cercles imparfaits tracés au crayon',
                                        caption: 'Les cercles imparfaits réveillent le poignet sans chercher la perfection.',
                                    },
                                    layout: 'balanced',
                                    variant: 'section-card',
                                    left: [
                                        {
                                            kind: 'rich-text',
                                            id: 'exercice-2-texte',
                                            title: 'Exercice 2 : Les cercles imparfaits',
                                            markdown: `
### Objectif de l’exercice

Les cercles imparfaits permettent d'assouplir le poignet rapidement, d'ancrer un geste fluide et continu, de sortir du contrôle trop mental, de retrouver une sensation de geste “naturel”, presque automatique.

Tu vas sentir que le trait suit ton mouvement, pas l’inverse.

### Étapes

1. Pose ton crayon sur la feuille, sans pression excessive et commence un cercle lent, très lent, presque silencieux. Ne cherche pas la symétrie : laisse le cercle se déformer.
2. Continue la boucle sans lever le crayon. Fais 3 à 5 tours.
3. Recommence, mais un peu plus vite.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                    right: [
                                        {
                                            kind: 'encart',
                                            id: 'exercice-2-variantes',
                                            tone: 'pedagogic',
                                            size: 'compact',
                                            title: 'Variantes à explorer',
                                            markdown: `
- **Cercles très lents** → pour sentir chaque variation.
- **Cercles très rapides** → pour casser le contrôle mental.
- **Grands cercles** → pour engager tout le bras.
- **Petits cercles** → pour affiner la précision douce.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                        {
                                            kind: 'encart',
                                            id: 'mini-challenge-cercles',
                                            tone: 'soft',
                                            size: 'compact',
                                            title: 'Mini-challenge : 10 cercles d’un seul geste',
                                            markdown: `
Essaie de faire **10 cercles** sans lever le crayon.

Pas 10 cercles parfaits — 10 cercles en un seul mouvement continu.
Tu vas être surpris·e de voir à quel point ton poignet trouve son propre chemin.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                } satisfies TutorialBlock,
                            ],
                        },
                        {
                            id: 'exercice-3',
                            label: 'Exercice 3 — Trait lent',
                            blocks: [
                                {
                                    kind: 'two-cols',
                                    id: 'exercice-3-section',
                                    hero: {
                                        src: '/images/articles/dessiner-peindre/dessiner-sans-gomme/exercice-3.png',
                                        alt: 'Main qui trace un long trait au crayon, très lentement',
                                        caption: 'Le trait lent : un geste presque méditatif, au rythme de ta respiration.',
                                    },
                                    layout: 'balanced',
                                    variant: 'section-card',
                                    left: [
                                        {
                                            kind: 'rich-text',
                                            id: 'exercice-3-texte',
                                            title: 'Exercice 3 : Le trait lent (maîtriser l’intention)',
                                            markdown: `
### Objectif de l’exercice

Le trait lent t’apprend à écouter ton geste, percevoir les micro-tensions, maîtriser la pression sur le papier et tracer en conscience plutôt qu’en automatisme.

C’est un exercice qui calme le mental et recentre la main.

### Étapes

1. Pose ton crayon sur le papier, juste une seconde. Inspire doucement. En expirant, trace une ligne **très lente**, comme si tu versais du miel. Va d’un point A à un point B en laissant ton bras guider le geste.
2. Observe la sensation sous tes doigts : le crayon qui glisse, accroche, hésite…
3. Recommence, mais encore plus lentement.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                    right: [
                                        {
                                            kind: 'encart',
                                            id: 'exercice-3-variante-respiration',
                                            tone: 'pedagogic',
                                            size: 'compact',
                                            title: 'Variante : respiration + trait',
                                            markdown: `
Associe consciemment chaque trait à ta respiration :

- Inspire pour préparer le geste.
- Expire pendant que tu traces la ligne.
- Recommence en allongeant légèrement l’expiration.

Petit à petit, ton trait va adopter le rythme de ton souffle.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                        {
                                            kind: 'encart',
                                            id: 'astuce-douceur',
                                            tone: 'soft',
                                            size: 'compact',
                                            title: 'Astuce douceur',
                                            markdown: `
Ferme légèrement les yeux pendant 2 secondes avant de tracer.

Cette micro-pause réinitialise ton geste et t’empêche de forcer.
Et si tu veux aller encore plus loin : écoute le son du crayon.
Il raconte tout — la vitesse, la pression, l’intention.
                    `.trim(),
                                        } satisfies TutorialBlock,
                                    ],
                                } satisfies TutorialBlock,
                            ],
                        },
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 8) PROGRESSION
        {
            id: 'progress',
            anchorId: 'progression-main-libre',
            label: 'Suivre sa progression',
            blocks: [
                {
                    kind: 'two-cols',
                    id: 'progression-section-card',
                    variant: 'section-card',
                    layout: 'balanced',
                    left: [
                        {
                            kind: 'rich-text',
                            id: 'progression-intro',
                            title: 'Comment savoir si ta main devient plus libre ?',
                            markdown: `
La progression en dessin ne se voit pas toujours au premier coup d’œil. Souvent, elle se sent avant de se voir. Et c’est exactement ce qu’on cherche ici : un geste plus vivant, une main plus libre, une relation plus douce avec le trait.

Voici les signes qui montrent que ta main commence à se délier — même si tes dessins ne te paraissent pas encore “meilleurs”.

### Signes visibles

Tu remarqueras peut-être que :

- tes traits deviennent plus **longs**
- tu lèves moins souvent le crayon
- tes lignes sont **plus amples** et souples
- ton poignet change de direction plus facilement
- les cercles improvisés sont moins “cassés”, plus fluides

Ces petits changements, discrets ou non, sont déjà de vrais indicateurs de progression.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                    right: [
                        {
                            kind: 'rich-text',
                            id: 'signes-interieurs',
                            markdown: `
### Signes intérieurs

La progression est aussi (et surtout) intérieure :

- doigts moins crispés
- souffle plus calme
- moins de jugement immédiat
- sensation de “me laisser porter par le geste”
- plaisir plus spontané à dessiner

Quand dessiner devient agréable plutôt qu’exigeant, tu as déjà gagné en liberté de geste.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'test-20-secondes',
                            tone: 'pedagogic',
                            size: 'compact',
                            title: 'Test express : 20 secondes pour mesurer ta progression',
                            markdown: `
Fais ceci :
1. Trace une ligne comme tu l’aurais fait avant de lire ce tutoriel.
2. Ensuite, fais un trait lent, calme, avec respiration.
3. Compare les deux.

La différence est parfois subtile… parfois énorme. Dans tous les cas, elle est réelle.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 9) AVANT / APRÈS
        {
            id: 'before-after',
            anchorId: 'avant-apres',
            label: 'Avant / Après',
            blocks: [
                {
                    kind: 'section-card',
                    id: 'avant-apres-card',
                    blocks: [
                        {
                            kind: 'rich-text',
                            id: 'avant-apres-intro',
                            title: 'Avant / Après : ce qui change vraiment',
                            markdown: `
On croit souvent qu’un “avant/après” doit être spectaculaire : un trait tremblant qui devient parfait, une main maladroite qui devient experte. Mais dans l’apprentissage du dessin — surtout dans la libération du geste — les transformations sont plus fines, plus intérieures, plus sensibles.

Et pourtant… elles comptent davantage que tout.
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'two-cols',
                            id: 'avant-apres-comparatif',
                            layout: 'balanced',
                            left: [
                                {
                                    kind: 'rich-text',
                                    id: 'avant-texte',
                                    markdown: `

### Avant : ce que font la plupart des débutants

Avant d’exercer la main, la plupart des gens :
- appuient trop fort
- tracent trop vite
- cherchent à “bien faire” dès le premier trait
- veulent être droits, propres, maîtrisés
- ont le souffle court sans s’en rendre compte
- se jugent dès les premières lignes

Cette tension, presque invisible, se glisse partout : dans la main, le poignet, les épaules… et dans la tête.
                            `.trim(),
                                } satisfies TutorialBlock,
                            ],
                            right: [
                                {
                                    kind: 'rich-text',
                                    id: 'apres-texte',
                                    markdown: `
### Après : ce que tu es en train de mettre en place

Avec ces exercices, ton geste change — peut-être pas ton dessin tout de suite, mais ton **rapport** au dessin :

- ta main devient plus souple
- ton trait plus vivant
- ta pression plus douce
- ton poignet plus mobile
- ta respiration plus calme
- ton regard plus indulgent envers toi-même

Le dessin ne devient pas “meilleur”. Il devient **possible**.

Et c’est cela, la vraie progression.

                            `.trim(),
                                } satisfies TutorialBlock,
                            ],
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'difference-subtile',
                            tone: 'soft',
                            title: 'Pourquoi la différence est parfois subtile… et pourquoi elle est importante',
                            markdown: `
Tu vas peut-être regarder ta feuille et te dire : “Je ne vois pas une énorme différence.”

C’est normal. Le travail que tu fais ici est un travail **interne** :
- tu reprogrammes ta relation au trait,
- tu enseignes à ta main à ne plus avoir peur,
- tu apprends au geste à se libérer sans que tu le forces,
- tu construis une base solide pour tout ton futur dessin.

Le résultat n’est pas immédiat. Il est durable.

Les meilleurs artistes ne dessinent pas mieux parce qu’ils ont “du talent”. Ils dessinent mieux parce qu’ils ont appris à faire confiance à leur geste.

Et aujourd’hui, tu viens de commencer cette transformation.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 10) RESSOURCES
        {
            id: 'resources',
            anchorId: 'ressources',
            label: 'Ressources & téléchargements',
            blocks: [
                {
                    kind: 'resources-grid',
                    id: 'ressources',
                    title: 'Ressources à télécharger',
                    items: [
                        {
                            label: 'Le support de présentation vidéo',
                            description: 'Revois les gestes à ton rythme, autant de fois que tu veux.',
                            href: '/downloads/supports/oser-le-premier-trait.pdf',
                            badge: 'PDF',
                        },
                        {
                            label: 'PDF “Oser le premier trait”',
                            description: 'Garde le tutoriel sous la main, même loin de l’écran.',
                            href: '/downloads/articles/oser-le-premier-trait.pdf',
                            badge: 'PDF',
                        },
                        {
                            label: 'Fiche “Exercice du jour”',
                            description: 'Une petite fiche imprimable pour t’accompagner dans ton carnet.',
                            href: '/downloads/fiches/exercice-premier-trait.pdf',
                            badge: 'À imprimer',
                        },
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 11) FAQ
        {
            id: 'faq',
            anchorId: 'faq',
            label: 'FAQ rapide',
            blocks: [
                {
                    kind: 'faq',
                    id: 'faq-block',
                    title: 'FAQ rapide (3 questions essentielles)',
                    items: [
                        {
                            question: 'À quelle fréquence pratiquer ces exercices ?',
                            answer: `
Le mieux : **un peu tous les jours**, même 3 minutes. Mais si tu manques de temps, une seule séance par semaine suffit déjà à assouplir la main. Ce n’est pas la durée qui compte, c’est la **régularité douce**.
                    `.trim(),
                        },
                        {
                            question: 'Et si mes traits tremblent encore ?',
                            answer: `
Alors tu progresses. Un trait qui tremble, c’est une main qui *apprend*, pas une main qui échoue. Avec le temps, le tremblement devient rythme, puis fluidité. Ne le combats pas : accompagne-le.
                    `.trim(),
                        },
                        {
                            question: 'Combien de temps avant de sentir une différence ?',
                            answer: `
Très vite. Certaines personnes ressentent une amélioration **dès la première séance** : respiration plus calme, geste plus libre, moins de tension. Mais pour une vraie fluidité, compte **7 à 14 jours** de pratique légère.

L’évolution se fait par petites touches — comme une danse qui devient naturelle.
                    `.trim(),
                        },
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,

        // 12) CONCLUSION
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
                            id: 'conclusion-main',
                            title: 'Conclusion douce & motivation',
                            markdown: `
Tu viens de faire quelque chose d’important, même si cela te semble simple : tu as donné un peu de temps à ta main, un peu de souffle à ton geste, un peu de douceur à ton regard.

Ces trois exercices ne sont pas de “petits” exercices. Ce sont des portes. Des portes vers un dessin plus libre, plus fluide, plus vivant — un dessin qui te ressemble.

Souviens-toi : tu n’as pas besoin d’être “doué”. Tu n’as pas besoin d’être parfait. Tu as juste besoin d’être là, présent(e), crayon en main, avec l’envie d’essayer.

Chaque trait que tu poses est une conversation avec toi-même. Et aujourd’hui, tu as commencé à l’écouter.

Prends ton temps, recommence demain, refais juste un cercle ou un trait lent si tu n’as que deux minutes. Ce geste-là, même minuscule, nourrit déjà ton art.

Tu es en train de construire quelque chose : un geste qui respire, un regard qui s’ouvre, et une main qui apprend à danser.

**Continue. Doucement, mais continue. Ton trait n’attend que toi.**
                    `.trim(),
                        } satisfies TutorialBlock,
                        {
                            kind: 'encart',
                            id: 'conclusion-next-step',
                            tone: 'pedagogic',
                            size: 'compact',
                            title: 'Et maintenant, concrètement ?',
                            markdown: `
Pour ancrer ce que tu viens de faire, tu peux :

- refaire **un seul exercice** demain (même 3 minutes)
- glisser une feuille dédiée “lignes libres / cercles / traits lents” dans ton carnet
- noter en deux phrases ce que tu as ressenti dans ta main aujourd’hui

Ce n’est pas la quantité qui compte, mais la **continuité douce**. Un geste répété avec bienveillance vaut plus qu’une séance parfaite, faite une seule fois.
                    `.trim(),
                        } satisfies TutorialBlock,
                    ],
                } satisfies TutorialBlock,
            ],
        } satisfies TutorialSection,
    ],
};

/* ---------------------------------
 * CATALOGUE PRINCIPAL
 * --------------------------------- */

const tutorials: Tutorial[] = [oserLePremierTrait, dessinerSansGomme, ombresDoucesCrayon, carnetDuMatin, traitGestuelRapide, remplirUnePage];

export const TUTORIALS = tutorials;

/* ---------------------------------
 * HELPERS
 * --------------------------------- */

export function getAllTutorials(): Tutorial[] {
    return [...tutorials];
}

export function getTutorialBySlug(slug: string): Tutorial | undefined {
    return tutorials.find((t) => t.slug === slug);
}

export function toTutorialRelatedPost(tutorial: Tutorial): TutorialRelatedPost {
    return {
        slug: tutorial.slug,
        title: tutorial.title,
        excerpt: tutorial.excerpt,
        coverImage: tutorial.coverImage,
        level: tutorial.level,
        format: tutorial.format,
        subcategory: tutorial.subcategory,
        readingTime: tutorial.readingTime,
        publishedAt: tutorial.publishedAt,
    };
}

export function getRelatedTutorials(current: Tutorial, limit = 3): TutorialRelatedPost[] {
    return tutorials
        .filter((t) => t.slug !== current.slug && t.pillar === current.pillar && t.level === current.level)
        .slice(0, limit)
        .map(toTutorialRelatedPost);
}
