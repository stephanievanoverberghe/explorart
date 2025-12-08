// src/lib/content/formations.ts
import type { Level, PillarSlug } from '@/components/categories/category-data';

export type FormationStatus = 'coming-soon' | 'open' | 'archived';

export interface FormationLesson {
    slug: string;
    title: string;
    kind?: 'video' | 'ritual' | 'exercise' | 'integration' | 'bonus';
}

export interface FormationModule {
    order: number;
    id: string;
    title: string;
    intent: string;
    summary: string;
    lessons: FormationLesson[];
}

export interface FormationBonus {
    title: string;
    description: string;
    type: 'audio' | 'pdf' | 'atelier' | 'community' | 'playlist' | 'rituel';
}

export interface Formation {
    slug: string;
    title: string;
    tagline: string;
    level: Level;
    pillarSlug: PillarSlug;
    pillarLabel: string;
    coverImage: string;
    status: FormationStatus;

    // Durée et structure globale
    modulesCount: number;
    hasIntro: boolean;
    hasConclusion: boolean;
    approximateHours: number;

    // Vente
    priceEUR: number;
    isPremium: boolean;
    highlightLabel: string;

    // Contenu édito
    shortPitch: string;
    transformationPromise: string;
    idealFor: string[];
    notFor?: string[];

    modules: FormationModule[];
    bonuses: FormationBonus[];
}

// 🧠 2 formations premium de base
export const FORMATIONS: Formation[] = [
    {
        slug: 'apprendre-a-dessiner',
        title: 'Apprendre à dessiner – La Méthode Somato-Graphique Explor’Art',
        tagline: 'En 8 modules, tu passes de « je ne sais pas dessiner » à « je vois, je comprends, je crée ».',

        level: 'beginner',
        pillarSlug: 'dessin-peinture',
        pillarLabel: 'Dessiner & Peindre',
        coverImage: '/images/formations/apprendre-a-dessiner-hero.png',
        status: 'open',

        modulesCount: 8,
        hasIntro: true,
        hasConclusion: true,
        approximateHours: 18,

        priceEUR: 480,
        isPremium: true,
        highlightLabel: 'Formation complète pour apprendre à dessiner',

        shortPitch: 'Une formation complète qui relie corps, regard, lumière et émotion pour t’apprendre à dessiner sans te comparer, sans académisme lourd, sans perfectionnisme.',
        transformationPromise:
            'Tu ne vas pas seulement apprendre des techniques. Tu vas rééduquer ton regard, libérer ton geste et installer une relation beaucoup plus douce avec le dessin et avec toi-même.',

        idealFor: [
            'Tu as essayé d’apprendre à dessiner plusieurs fois… et tu as abandonné à cause de la frustration.',
            'Tu crois encore que le dessin est une affaire de “talent” réservé aux autres.',
            'Tu veux une méthode claire, humaine, qui respecte ton corps, ton rythme et ta sensibilité.',
            'Tu rêves de pouvoir dessiner des objets, des lieux et des visages sans te juger à chaque trait.',
        ],
        notFor: [
            'Tu cherches une formation ultra académique, centrée uniquement sur la copie et les proportions mathématiques.',
            'Tu veux des résultats “magiques” sans pratiquer entre les modules.',
        ],

        modules: [
            {
                order: 0,
                id: 'intro',
                title: 'Introduction – Reprogrammer ta relation au dessin',
                intent: 'Poser le cadre : sortir du mythe du talent, apaiser la peur de mal faire et présenter la méthode somato-graphique.',
                summary: 'On clarifie pourquoi tu bloques depuis des années, ce que cette méthode change, et comment suivre la formation sans t’épuiser ni te juger.',
                lessons: [
                    {
                        slug: 'bienvenue',
                        title: 'Bienvenue dans la Méthode Somato-Graphique',
                        kind: 'video',
                    },
                    {
                        slug: 'pourquoi-tu-bloques',
                        title: 'Pourquoi tu bloques depuis des années',
                        kind: 'integration',
                    },
                    {
                        slug: 'poser-ton-intention',
                        title: 'Poser ton intention de formation',
                        kind: 'exercise',
                    },
                ],
            },
            {
                order: 1,
                id: 'module-1-corps',
                title: 'Module 1 — Le corps dessine avant la main',
                intent: 'Comprendre que le dessin ne sort pas de la main, mais du corps qui respire et se relâche.',
                summary:
                    'Tu découvres la gestuelle somato-graphique : souffle, épaules, bras, main. Tu libères ton geste, tu comprends les 6 gestes fondamentaux et tu cesses de te battre contre ton corps.',
                lessons: [
                    {
                        slug: 'cours-gestuelle',
                        title: 'Cours signature – La gestuelle somato-graphique',
                        kind: 'video',
                    },
                    {
                        slug: 'rituel-reveiller-main',
                        title: 'Rituel premium – Réveiller la main',
                        kind: 'ritual',
                    },
                    {
                        slug: '6-gestes-fondamentaux',
                        title: 'Pratique guidée – Les 6 gestes fondamentaux',
                        kind: 'exercise',
                    },
                    {
                        slug: 'exploration-trait',
                        title: 'Exploration intérieure – Ce que ton trait révèle de toi',
                        kind: 'integration',
                    },
                ],
            },
            {
                order: 2,
                id: 'module-2-camera-humaine',
                title: 'Module 2 — Voir comme une caméra humaine',
                intent: 'Refaire ton œil : focus, plans, masses visuelles, lumière. Apprendre à voir comme un artiste, pas comme une photocopieuse.',
                summary:
                    'On travaille le regard : focus, plans, masses, distances. Tu arrêtes de tout vouloir dessiner en même temps et tu apprends à choisir ce qui compte en premier.',
                lessons: [
                    {
                        slug: 'cours-camera-humaine',
                        title: 'Cours signature – La vision caméra-humaine',
                        kind: 'video',
                    },
                    {
                        slug: 'exercice-focus-plans',
                        title: 'Exercice – Focus & plans simplifiés',
                        kind: 'exercise',
                    },
                    {
                        slug: 'mini-reportage-regard',
                        title: 'Mini-reportage – Regarder ton quotidien autrement',
                        kind: 'integration',
                    },
                ],
            },
            {
                order: 3,
                id: 'module-3-volumes',
                title: 'Module 3 — Volumes vivants & formes-mères',
                intent: 'Comprendre les volumes simples qui se cachent derrière les objets et les corps.',
                summary: 'Tu apprends à voir le monde comme un assemblage de formes-mères simples. Tu construis les volumes sans perdre la vie du sujet.',
                lessons: [
                    {
                        slug: 'cours-formes-meres',
                        title: 'Cours – Les formes-mères du dessin',
                        kind: 'video',
                    },
                    {
                        slug: 'exercice-objets-simples',
                        title: 'Pratique – Objets du quotidien en volumes',
                        kind: 'exercise',
                    },
                    {
                        slug: 'ancrage-voir-volumes',
                        title: 'Ancrage – Voir les volumes avant les détails',
                        kind: 'integration',
                    },
                ],
            },
            {
                order: 4,
                id: 'module-4-lumiere',
                title: 'Module 4 — Lumière vivante & ombres crédibles',
                intent: 'Apprendre à poser des ombres qui font exister les formes sans les durcir.',
                summary:
                    'Tu explores la lumière comme une matière : sources, valeurs, contrastes. Tu poses des ombres crédibles sans transformer ton dessin en exercice académique froid.',
                lessons: [
                    {
                        slug: 'cours-lumiere',
                        title: 'Cours – Comprendre la lumière sans jargon',
                        kind: 'video',
                    },
                    {
                        slug: 'exercice-ombres',
                        title: 'Exercice – Ombres douces, ombres structurantes',
                        kind: 'exercise',
                    },
                    {
                        slug: 'mini-setup-lumiere',
                        title: 'Atelier – Créer une petite scène lumineuse chez toi',
                        kind: 'exercise',
                    },
                ],
            },
            {
                order: 5,
                id: 'module-5-objets',
                title: 'Module 5 — Dessiner les objets du quotidien',
                intent: 'Simplifier les objets qui t’entourent et arrêter d’avoir peur des détails.',
                summary: 'Tu apprends à choisir l’essentiel, à réduire la complexité, à dessiner vite et vrai ce que tu vois autour de toi.',
                lessons: [
                    {
                        slug: 'cours-objets',
                        title: 'Cours – Objets “sauvages” & formes essentielles',
                        kind: 'video',
                    },
                    {
                        slug: 'exercice-kitchen',
                        title: 'Exercice – Croquis dans la cuisine / salon',
                        kind: 'exercise',
                    },
                    {
                        slug: 'exploration-objets-qui-parlent',
                        title: 'Exploration – Quels objets te parlent vraiment ?',
                        kind: 'integration',
                    },
                ],
            },
            {
                order: 6,
                id: 'module-6-lieux',
                title: 'Module 6 — Lieux simples & perspectives intuitives',
                intent: 'Poser l’espace, la profondeur et l’ambiance d’un lieu sans te perdre dans les règles.',
                summary: 'On aborde la perspective intuitive, la profondeur et la composition de scènes simples : une pièce, un coin de café, un banc dans un parc.',
                lessons: [
                    {
                        slug: 'cours-perspective-intuitive',
                        title: 'Cours – Perspective intuitive & lignes de force',
                        kind: 'video',
                    },
                    {
                        slug: 'exercice-lieux',
                        title: 'Exercice – Dessiner un lieu dans ta vraie vie',
                        kind: 'exercise',
                    },
                    {
                        slug: 'integration-espace',
                        title: 'Journal – Ce que tu ressens dans les lieux que tu dessines',
                        kind: 'integration',
                    },
                ],
            },
            {
                order: 7,
                id: 'module-7-portrait',
                title: 'Module 7 — Le portrait vivant',
                intent: 'Dessiner une présence, une émotion, une structure vivante – pas une copie mécanique.',
                summary: 'Tu découvres une approche du portrait centrée sur la structure, les axes et l’énergie émotionnelle, plus que sur la ressemblance millimétrée.',
                lessons: [
                    {
                        slug: 'cours-3-structures-portrait',
                        title: 'Cours signature – Les 3 structures du portrait',
                        kind: 'video',
                    },
                    {
                        slug: 'exercice-portraits-simples',
                        title: 'Exercice – Portraits rapides depuis la vraie vie',
                        kind: 'exercise',
                    },
                    {
                        slug: 'integration-presence',
                        title: 'Exploration – Quand un visage “sonne juste”',
                        kind: 'integration',
                    },
                ],
            },
            {
                order: 8,
                id: 'module-8-style',
                title: 'Module 8 — Vers ton style naturel',
                intent: 'Relier tous les modules pour faire émerger une voix graphique qui t’appartient.',
                summary: 'Tu relis ton carnet, observes ce qui revient, ce qui te touche, ce qui t’ennuie. Tu commences à formuler ton langage visuel.',
                lessons: [
                    {
                        slug: 'cours-style',
                        title: 'Cours – Reconnaître les graines de ton style',
                        kind: 'video',
                    },
                    {
                        slug: 'atelier-synthese',
                        title: 'Atelier – Créer un dessin “synthèse” de ton parcours',
                        kind: 'exercise',
                    },
                    {
                        slug: 'journal-identite',
                        title: 'Journal – Ton identité de personne qui dessine',
                        kind: 'integration',
                    },
                ],
            },
            {
                order: 9,
                id: 'conclusion',
                title: 'Conclusion – Devenir quelqu’un qui dessine',
                intent: 'Ancrer la transformation et clarifier comment continuer à pratiquer après la formation.',
                summary: 'Tu fais le point, tu mesures le chemin parcouru et tu poses tes prochains petits rendez-vous avec le dessin.',
                lessons: [
                    {
                        slug: 'bilan',
                        title: 'Vidéo – Bilan du voyage & mots de clôture',
                        kind: 'video',
                    },
                    {
                        slug: 'plan-30-jours',
                        title: 'Plan d’intégration – 30 jours pour entretenir ton nouveau regard',
                        kind: 'integration',
                    },
                ],
            },
        ],

        bonuses: [
            {
                title: 'La Méditation du Regard',
                description: 'Un audio pour préparer ton corps et ton regard avant chaque module : respiration, présence, ouverture du regard intérieur.',
                type: 'audio',
            },
            {
                title: 'Le Rituel du Dimanche',
                description: 'Une courte pratique hebdomadaire pour garder ton geste et ton regard vivants sur la durée, sans pression ni performance.',
                type: 'rituel',
            },
            {
                title: 'Mini-ateliers Explor’Art',
                description: '4 ateliers transversaux autour de la lumière, des gestes, des couleurs et de la psychologie de la création.',
                type: 'atelier',
            },
            {
                title: 'Le Carnet des Transformations',
                description: 'Un carnet PDF premium pour documenter ton voyage : pages d’introspection, lumière, gestes, couleurs, rituels et prises de conscience.',
                type: 'pdf',
            },
        ],
    },

    {
        slug: 'la-methode-explorart',
        title: 'La Méthode Explor’Art – Regarder, sentir et créer autrement',
        tagline: 'Une grande formation pour transformer ton regard, ton geste et ta relation à la création.',

        level: 'intermediate',
        pillarSlug: 'psychologie-de-l-art',
        pillarLabel: "Psychologie de l'art",
        coverImage: '/images/formations/methode-explorart-hero.png',
        status: 'coming-soon',

        modulesCount: 6,
        hasIntro: true,
        hasConclusion: true,
        approximateHours: 14,

        priceEUR: 590,
        isPremium: true,
        highlightLabel: 'Formation signature Explor’Art',

        shortPitch:
            'Un parcours profond pour relier psychologie de l’art, regard, couleur, lumière et pratique, et faire de ta créativité un espace de soutien plutôt que de pression.',
        transformationPromise:
            'À la fin de la méthode, tu ne te définis plus comme “quelqu’un qui n’ose pas créer”, mais comme une personne qui sait écouter ses élans, ses blocages et ses besoins créatifs – et qui a des outils pour les traverser.',

        idealFor: [
            'Tu crées déjà un peu, mais tu te sens souvent bloquée, confuse, en doute permanent.',
            'Tu veux comprendre ce que l’art remue à l’intérieur et comment en faire un allié.',
            'Tu ne veux plus dissocier technique et émotion : tu veux une pratique qui te soutienne.',
        ],

        modules: [
            // PORTAIL 1
            {
                order: 0,
                id: 'intro',
                title: 'Portail 1 — La Porte du Regard',
                intent: 'Ouvrir un espace calme et sensible, poser la promesse de transformation et installer le pacte Explor’Art.',
                summary:
                    'Tu découvres que tu n’entres pas dans un simple cours mais dans un voyage intérieur : on parle de ton rythme, de ton regard, de ton rapport à la créativité et de la façon la plus douce de suivre la formation.',
                lessons: [
                    {
                        slug: 'bienvenue-explorart',
                        title: 'Bienvenue dans la Méthode Explor’Art',
                        kind: 'video',
                    },
                    {
                        slug: 'pourquoi-creativite-sest-eteinte',
                        title: 'Pourquoi ta créativité s’est éteinte (sans que ce soit ta faute)',
                        kind: 'integration',
                    },
                    {
                        slug: 'philosophie-explorart',
                        title: 'La philosophie Explor’Art et le Pacte de douceur',
                        kind: 'integration',
                    },
                    {
                        slug: 'intention-parcours-explorart',
                        title: 'Clarifier ton intention et ton rythme pour ce voyage',
                        kind: 'exercise',
                    },
                ],
            },

            // MODULE 1 — Le Souffle du Geste
            {
                order: 1,
                id: 'module-1-souffle-du-geste',
                title: 'Module 1 — Le Souffle du Geste',
                intent: 'Reconnecter la main au corps, libérer le trait et comprendre le geste vivant pour dissoudre la rigidité.',
                summary:
                    'Tu redécouvres ton geste à partir du souffle, de l’épaule, du bras et de la main. Tu explores le mouvement, la lenteur, l’énergie du trait et tu commences à sentir ton geste comme une expression, pas comme une performance.',
                lessons: [
                    {
                        slug: 'm1-cours-souffle-du-geste',
                        title: 'Cours signature – Le Souffle du Geste et le mouvement vivant',
                        kind: 'video',
                    },
                    {
                        slug: 'm1-rituel-trait-vivant',
                        title: 'Rituel – Le trait vivant avant chaque séance',
                        kind: 'ritual',
                    },
                    {
                        slug: 'm1-pratique-page-de-geste',
                        title: 'Pratique artistique – Pages de gestes libres et amples',
                        kind: 'exercise',
                    },
                    {
                        slug: 'm1-exploration-trait-et-emotion',
                        title: 'Exploration intérieure – Ce que ton trait dit de ton état intérieur',
                        kind: 'integration',
                    },
                    {
                        slug: 'm1-ancrage-je-dessine-avec-mon-corps',
                        title: 'Ancrage créatif – Je dessine avec mon corps, pas contre lui',
                        kind: 'integration',
                    },
                ],
            },

            // MODULE 2 — L’Œil Profond
            {
                order: 2,
                id: 'module-2-oeil-profond',
                title: 'Module 2 — L’Œil Profond',
                intent: 'Apprendre à voir ce que les autres ne voient pas : lumière, forme, espace et émotion.',
                summary:
                    'Tu découvres les 4 couches du regard : lumière, forme, espace, émotion. Tu apprends à ralentir, à observer vraiment et à laisser ton regard devenir plus profond, plus subtil, plus vivant.',
                lessons: [
                    {
                        slug: 'm2-cours-4-couches-regard',
                        title: 'Cours signature – Les 4 couches du regard Explor’Art',
                        kind: 'video',
                    },
                    {
                        slug: 'm2-rituel-fenetre',
                        title: 'Rituel premium – 2 minutes à la fenêtre',
                        kind: 'ritual',
                    },
                    {
                        slug: 'm2-pratique-marche-du-regard',
                        title: 'Pratique artistique – La marche du regard (lumière, masses, émotions)',
                        kind: 'exercise',
                    },
                    {
                        slug: 'm2-exploration-ce-que-tu-ne-vois-pas',
                        title: 'Exploration intérieure – Ce que ton regard n’a pas encore appris à voir',
                        kind: 'integration',
                    },
                    {
                        slug: 'm2-ancrage-acte-de-voir',
                        title: 'Ancrage créatif – L’acte de voir avant l’acte de juger',
                        kind: 'integration',
                    },
                ],
            },

            // MODULE 3 — La Poésie des Couleurs
            {
                order: 3,
                id: 'module-3-poesie-des-couleurs',
                title: 'Module 3 — La Poésie des Couleurs',
                intent: 'Ressentir la couleur comme une émotion, créer des palettes sensibles et lire les harmonies dans le réel.',
                summary:
                    'Tu explores les couleurs comme un langage émotionnel : palettes intimes, couleurs du quotidien, transformation d’une palette sombre en palette lumineuse. Tu apprends à choisir tes couleurs en conscience.',
                lessons: [
                    {
                        slug: 'm3-cours-poesie-couleurs',
                        title: 'Cours signature – La poésie des couleurs',
                        kind: 'video',
                    },
                    {
                        slug: 'm3-rituel-palette-du-jour',
                        title: 'Rituel – La mini palette du jour (4 couleurs pour ton état intérieur)',
                        kind: 'ritual',
                    },
                    {
                        slug: 'm3-pratique-palettes-sensibles',
                        title: 'Pratique artistique – Palettes sensibles (émotionnelle, réelle, transformation)',
                        kind: 'exercise',
                    },
                    {
                        slug: 'm3-exploration-couleurs-qui-te-parlent',
                        title: 'Exploration intérieure – Ce que les couleurs révèlent de toi',
                        kind: 'integration',
                    },
                    {
                        slug: 'm3-ancrage-couleurs-qui-ressemblent',
                        title: 'Ancrage créatif – Je choisis la couleur qui me ressemble',
                        kind: 'integration',
                    },
                ],
            },

            // MODULE 4 — L’Art de Comprendre une Image
            {
                order: 4,
                id: 'module-4-comprendre-image',
                title: 'Module 4 — L’Art de Comprendre une Image',
                intent: 'Apprendre à lire une image comme on lit une âme : lumière, lignes, masses, histoire invisible et ressenti.',
                summary:
                    'Tu apprends la Lecture Explor’Art en 5 mouvements : lumière, directions, masses, histoire invisible, ressenti. Chaque image devient un terrain de jeu pour ton intelligence visuelle et ta sensibilité.',
                lessons: [
                    {
                        slug: 'm4-cours-lecture-sensible',
                        title: 'Cours signature – La lecture sensible des images',
                        kind: 'video',
                    },
                    {
                        slug: 'm4-rituel-30-secondes-oeuvre',
                        title: 'Rituel – 30 secondes devant une œuvre (lumière, lignes, masses, émotion)',
                        kind: 'ritual',
                    },
                    {
                        slug: 'm4-pratique-analyse-image-vivante',
                        title: 'Pratique artistique – Analyse guidée d’une image vivante',
                        kind: 'exercise',
                    },
                    {
                        slug: 'm4-exploration-ce-que-ton-regard-dit-de-toi',
                        title: 'Exploration intérieure – Ce que ton regard dit de toi',
                        kind: 'integration',
                    },
                    {
                        slug: 'm4-ancrage-je-vois-avec-tous-mes-sens',
                        title: 'Ancrage créatif – Je vois avec mes yeux, mon souffle, ma mémoire et ma sensibilité',
                        kind: 'integration',
                    },
                ],
            },

            // MODULE 5 — Nourrir l’Inspiration
            {
                order: 5,
                id: 'module-5-nourrir-inspiration',
                title: 'Module 5 — Nourrir l’Inspiration',
                intent: 'Rouvrir les portes intérieures, créer un carnet vivant et installer un flux créatif stable.',
                summary:
                    'Tu comprends d’où vient l’inspiration, comment la provoquer et la nourrir. Tu découvres les 7 sources intérieures et tu transformes ton carnet en véritable jardin de matière créative.',
                lessons: [
                    {
                        slug: 'm5-cours-7-sources-interieures',
                        title: 'Cours signature – Les 7 sources intérieures de l’inspiration',
                        kind: 'video',
                    },
                    {
                        slug: 'm5-rituel-carnet-vivant',
                        title: 'Rituel – 10 minutes avec ton carnet vivant chaque jour',
                        kind: 'ritual',
                    },
                    {
                        slug: 'm5-pratique-recoltes-quotidiennes',
                        title: 'Pratique artistique – Récoltes quotidiennes (lumière, gestes, textures, fragments de phrases)',
                        kind: 'exercise',
                    },
                    {
                        slug: 'm5-exploration-qui-nourrit-ton-regard',
                        title: 'Exploration intérieure – Ce qui nourrit vraiment ton regard',
                        kind: 'integration',
                    },
                    {
                        slug: 'm5-ancrage-recolteuse-de-beaute',
                        title: 'Ancrage créatif – Je deviens une récolteuse de beauté',
                        kind: 'integration',
                    },
                ],
            },

            // MODULE 6 — Se Libérer (Psychologie Créative)
            {
                order: 6,
                id: 'module-6-se-liberer',
                title: 'Module 6 — Se Libérer (Psychologie créative)',
                intent: 'Dissoudre les peurs, apaiser les blocages et construire une confiance créative douce et solide.',
                summary:
                    'Tu travailles directement avec tes peurs créatives, ton perfectionnisme, la comparaison et le doute. Tu découvres le Déblocage Doux en 3 étapes et tu transformes tes blocages en mouvement.',
                lessons: [
                    {
                        slug: 'm6-cours-deblocage-doux',
                        title: 'Cours signature – Le Déblocage Doux',
                        kind: 'video',
                    },
                    {
                        slug: 'm6-rituel-accueillir-la-peur',
                        title: 'Rituel – Accueillir la peur avant de créer (sans la laisser décider)',
                        kind: 'ritual',
                    },
                    {
                        slug: 'm6-pratique-dessin-avec-peur-a-cote',
                        title: 'Pratique artistique – Dessiner avec la peur à côté de soi',
                        kind: 'exercise',
                    },
                    {
                        slug: 'm6-exploration-dialogue-avec-perfectionnisme',
                        title: 'Exploration intérieure – Dialoguer avec le perfectionnisme et la comparaison',
                        kind: 'integration',
                    },
                    {
                        slug: 'm6-ancrage-je-suis-capable-de-creer',
                        title: 'Ancrage créatif – Je peux créer même quand je doute',
                        kind: 'integration',
                    },
                ],
            },

            // PORTAIL 2 — Conclusion
            {
                order: 7,
                id: 'conclusion',
                title: 'Portail 2 — La Révélation',
                intent: 'Faire la synthèse, ancrer les transformations et passer de “je n’ose pas créer” à “je suis créatrice / créateur”.',
                summary:
                    'Tu revisites les 6 modules, tu formules ce qui a changé dans ton regard, ton geste et ta vie créative. Tu poses tes rituels d’après-formation et tu reçois la lettre finale de ton futur toi créateur.',
                lessons: [
                    {
                        slug: 'conclusion-bilan-regard-revele',
                        title: 'Bilan – Ton regard révélé et les ponts entre les modules',
                        kind: 'integration',
                    },
                    {
                        slug: 'conclusion-rituel-continuite',
                        title: 'Rituel – Les 3 engagements doux pour continuer après la formation',
                        kind: 'ritual',
                    },
                    {
                        slug: 'conclusion-lettre-du-futur',
                        title: 'Lettre de fin – À toi qui vois maintenant (lettre du futur toi créatif)',
                        kind: 'integration',
                    },
                ],
            },
        ],

        bonuses: [
            {
                title: 'La Méditation du Regard (version Explor’Art)',
                description:
                    'Une version spécifique de la méditation du regard pour accompagner les modules les plus sensibles et t’installer dans un état de disponibilité totale.',
                type: 'audio',
            },
            {
                title: 'Le Rituel du Dimanche',
                description: 'Une pratique hebdomadaire guidée pour entretenir le regard et le geste, stabiliser la transformation et garder la créativité vivante.',
                type: 'rituel',
            },
            {
                title: 'Mini-Ateliers Explor’Art',
                description: '4 mini-ateliers transversaux autour de la lumière, des gestes, des couleurs et de la psychologie, pour approfondir certains aspects de la méthode.',
                type: 'atelier',
            },
            {
                title: 'Le Carnet des Transformations (version Explor’Art)',
                description: 'Un carnet PDF premium pour consigner ton voyage : pages de regard, de gestes, de couleurs, d’inspirations et de révélations psychologiques.',
                type: 'pdf',
            },
        ],
    },
];
