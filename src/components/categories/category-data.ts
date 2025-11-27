// src/components/categories/category-data.ts

export type Level = 'beginner' | 'intermediate';

export type PillarSlug = 'dessin-peinture' | 'comprendre-une-oeuvre' | 'histoires-d-artistes' | 'histoire-de-l-art' | 'couleurs-harmonie' | 'inspirations' | 'psychologie-de-l-art';

export type PostFormat = 'tutorial' | 'artwork-analysis' | 'artist-story' | 'art-history' | 'color-guide' | 'art-psychology' | 'inspiration';

// Sous-univers cohérents, génériques, structurés
export type SubcategorySlug =
    // Dessin & peinture
    | 'dp-fondamentaux-du-dessin'
    | 'dp-techniques-et-matieres'
    | 'dp-pratique-quotidienne'
    // Comprendre une œuvre
    | 'ao-bases-du-regard'
    | 'ao-composition-structure'
    | 'ao-lumiere-espace'
    // Histoires d’artistes
    | 'ha-portraits-d-artistes'
    | 'ha-ateliers-et-coulisses'
    | 'ha-parcours-creatifs'
    // Histoire de l’art
    | 'hi-grandes-periodes'
    | 'hi-mouvements-et-styles'
    | 'hi-figures-oubliees'
    // Couleurs & harmonie
    | 'ch-bases-de-la-couleur'
    | 'ch-palettes-et-harmonies'
    | 'ch-couleur-et-emotion'
    // Inspirations
    | 'in-rituels-pour-regard'
    | 'in-ambiances-et-lieux'
    | 'in-bibliotheques-d-images'
    // Psychologie de l’art
    | 'pa-blocages-et-peurs'
    | 'pa-rituels-d-apaisement'
    | 'pa-confiance-creative';

export interface CategoryPost {
    slug: string;
    title: string;
    excerpt: string;
    level: Level;
    format: PostFormat;
    readingTime: string;
    coverImage: string;
    pillarSlug: PillarSlug;
    subcategory: SubcategorySlug;
    publishedAt?: string;
}

export interface PillarConfig {
    title: string;
    kicker: string;
    tagline: string;
    intro: string;
    color: string;
    dotClass: string;
    badgeClass: string;
    helperBullets: string[];
    heroImage: string;
    moodKeywords: string[];
    quote: string;
    colorClasses: {
        border: string;
        bg: string;
        hover: string; // toutes les classes hover:... en une seule chaîne
    };
}

export const pillarConfig: Record<PillarSlug, PillarConfig> = {
    'dessin-peinture': {
        title: 'Dessiner & Peindre',
        kicker: 'Explorer · Pratique & geste',
        tagline: 'Apprendre à voir avec la main, pas avec la peur de mal faire.',
        intro: 'Ici, on apprivoise le trait, les formes, les matières. On parle de gestes simples, d’erreurs fréquentes et de petites victoires qui redonnent confiance à la main.',
        color: 'var(--color-vert)',
        dotClass: 'bg-vert',
        badgeClass: 'badge-vert',
        helperBullets: [
            'Tu veux enfin oser poser ton crayon ou ton pinceau sans te juger.',
            'Tu préfères des explications claires, concrètes, sans jargon.',
            'Tu as besoin de mini-exercices réalistes, pas de “chef-d’œuvre” à produire.',
        ],
        heroImage: '/images/categories/dessin-peinture.png',
        moodKeywords: ['Geste', 'Matière', 'Crayons & pinceaux', 'Exploration douce'],
        quote: 'Ici, tu peux rater, recommencer, gribouiller… et appeler ça pratiquer.',
        colorClasses: {
            border: 'border-vert/60',
            bg: 'bg-vert/5',
            hover: 'hover:bg-vert/10 hover:border-vert/80 hover:shadow-md hover:-translate-y-0.5',
        },
    },
    'comprendre-une-oeuvre': {
        title: 'Comprendre une œuvre',
        kicker: 'Explorer · Éducation du regard',
        tagline: 'Apprendre à lire une image pas à pas, sans se sentir bête.',
        intro: 'On regarde des œuvres ensemble, calmement. On parle de lignes, de masses, de lumière, d’intentions. Tu repars avec des clés simples pour comprendre ce que tu vois.',
        color: 'var(--color-bleu)',
        dotClass: 'bg-bleu',
        badgeClass: 'badge-bleu',
        helperBullets: [
            'Tu as souvent l’impression de “ne pas voir” ce que les autres voient.',
            'Tu veux des repères concrets pour analyser un tableau sans jargon.',
            'Tu aimes autant ressentir que comprendre ce que tu regardes.',
        ],
        heroImage: '/images/categories/analyse-oeuvre.png',
        moodKeywords: ['Regard', 'Détails', 'Composition', 'Lumière & ombre'],
        quote: 'On ne cherche pas la “bonne réponse”, mais des chemins pour mieux voir.',
        colorClasses: {
            border: 'border-bleu/60',
            bg: 'bg-bleu/5',
            hover: 'hover:bg-bleu/10 hover:border-bleu/80 hover:shadow-md hover:-translate-y-0.5',
        },
    },
    'histoires-d-artistes': {
        title: 'Histoires d’artistes',
        kicker: 'Explorer · Récits humains',
        tagline: 'Derrière chaque œuvre, une vie entière qui cherche, doute et recommence.',
        intro: 'Ici, on parle d’ateliers, de chemins cabossés, de moments fragiles et de petites lumières. L’art redevient une histoire d’humains, pas seulement de “grands maîtres”.',
        color: 'var(--color-terre)',
        dotClass: 'bg-terre',
        badgeClass: 'badge-terre',
        helperBullets: [
            'Tu aimes les histoires vraies, sensibles, incarnées.',
            'Tu veux voir les artistes autrement qu’en statues sur un piédestal.',
            'Tu as besoin d’exemples qui te rassurent sur ton propre chemin.',
        ],
        heroImage: '/images/categories/histoires-artistes.png',
        moodKeywords: ['Atelier', 'Coulisses', 'Vies cabossées', 'Humanité'],
        quote: 'Les artistes ne naissent pas “génies”, ils se cherchent comme toi.',
        colorClasses: {
            border: 'border-terre/60',
            bg: 'bg-terre/5',
            hover: 'hover:bg-terre/10 hover:border-terre/80 hover:shadow-md hover:-translate-y-0.5',
        },
    },
    'histoire-de-l-art': {
        title: 'Histoire de l’art',
        kicker: 'Explorer · Culture sans intimidation',
        tagline: 'Remonter le temps ensemble, sans dates à apprendre par cœur.',
        intro: 'On traverse des périodes, des styles, des mouvements, comme une grande promenade. Pas de contrôle, pas d’examen : juste des repères clairs pour mieux comprendre d’où viennent les images.',
        color: 'var(--color-ocre)',
        dotClass: 'bg-ocre',
        badgeClass: 'badge-ocre',
        helperBullets: [
            'Tu veux situer une œuvre dans son époque sans t’y perdre.',
            'Tu aimes comprendre les grandes lignes plutôt que tous les détails.',
            'Tu cherches une histoire de l’art claire, vivante et humaine.',
        ],
        heroImage: '/images/categories/histoire-art.png',
        moodKeywords: ['Époques', 'Mouvements', 'Grands récits', 'Lignes du temps'],
        quote: "On fait la paix avec l'histoire de l'art : simple, claire, vivante.",
        colorClasses: {
            border: 'border-ocre/60',
            bg: 'bg-ocre/5',
            hover: 'hover:bg-ocre/10 hover:border-ocre/80 hover:shadow-md hover:-translate-y-0.5',
        },
    },
    'couleurs-harmonie': {
        title: 'Couleurs & harmonie',
        kicker: 'Explorer · Œil sensible',
        tagline: 'Les couleurs comme langage, vibration et respiration visuelle.',
        intro: 'On explore les palettes, les contrastes, les harmonies qui font danser l’œil. Tu apprends à apprivoiser les couleurs pour qu’elles deviennent vraiment ton langage.',
        color: 'var(--color-sage)',
        dotClass: 'bg-sage',
        badgeClass: 'badge-sage',
        helperBullets: [
            'Tu te sens souvent perdu·e devant un nuancier.',
            'Tu veux comprendre pourquoi certaines couleurs apaisent et d’autres bousculent.',
            'Tu as envie de créer des palettes qui te ressemblent.',
        ],
        heroImage: '/images/categories/couleurs-harmonie.png',
        moodKeywords: ['Palettes', 'Vibrations', 'Contrastes', 'Symbolique'],
        quote: 'Ici, les couleurs deviennent une langue que ton œil comprend.',
        colorClasses: {
            border: 'border-sage/60',
            bg: 'bg-sage/5',
            hover: 'hover:bg-sage/10 hover:border-sage/80 hover:shadow-md hover:-translate-y-0.5',
        },
    },
    inspirations: {
        title: 'Inspirations',
        kicker: 'Explorer · Respirations visuelles',
        tagline: 'Un espace pour nourrir ton regard, sans pression de produire.',
        intro: 'Ici, on respire. Moodboards, ambiances, coups de cœur, petites étincelles visuelles. C’est le pilier qui vient nourrir tous les autres, en douceur.',
        color: 'var(--color-rose)',
        dotClass: 'bg-rose',
        badgeClass: 'badge-rose',
        helperBullets: [
            'Tu as besoin d’images qui donnent envie, sans te comparer.',
            'Tu cherches des idées pour relancer ton envie de créer.',
            'Tu aimes observer des atmosphères, des détails, des couleurs.',
        ],
        heroImage: '/images/categories/inspirations.png',
        moodKeywords: ['Moodboards', 'Ambiances', 'Coups de cœur', 'Étincelles'],
        quote: 'Il n’y a rien à “réussir” ici, juste à nourrir ton regard.',
        colorClasses: {
            border: 'border-rose/60',
            bg: 'bg-rose/5',
            hover: 'hover:bg-rose/10 hover:border-rose/80 hover:shadow-md hover:-translate-y-0.5',
        },
    },
    'psychologie-de-l-art': {
        title: 'Psychologie de l’art',
        kicker: 'Explorer · Âme & sens',
        tagline: 'Ce que l’art remue à l’intérieur : émotions, blocages, élans.',
        intro: 'On parle ici de ce que le dessin réveille en toi : confiance, peur, joie, vulnérabilité. L’art comme miroir intérieur, pas comme performance à réussir.',
        color: 'var(--color-prune)',
        dotClass: 'bg-prune',
        badgeClass: 'badge-prune',
        helperBullets: [
            'Tu sens que l’art touche quelque chose de profond chez toi.',
            'Tu veux comprendre pourquoi tu bloques, procrastines, fuis parfois la feuille blanche.',
            'Tu as envie que ta pratique soit un soutien, pas une source de pression.',
        ],
        heroImage: '/images/categories/psychologie-art.png',
        moodKeywords: ['Émotions', 'Blocages', 'Confiance', 'Miroir intérieur'],
        quote: 'On déplie ce que l’art fait à ton mental et à ton cœur, sans jugement.',
        colorClasses: {
            border: 'border-prune/60',
            bg: 'bg-prune/5',
            hover: 'hover:bg-prune/10 hover:border-prune/80 hover:shadow-md hover:-translate-y-0.5',
        },
    },
};

export interface PillarSubcategory {
    slug: SubcategorySlug;
    label: string;
    description: string;
}

export const subcategoriesByPillar: Record<PillarSlug, PillarSubcategory[]> = {
    'dessin-peinture': [
        {
            slug: 'dp-fondamentaux-du-dessin',
            label: 'Fondamentaux du dessin',
            description: 'Bases du trait, du volume et des ombres, posées en douceur et sans pression.',
        },
        {
            slug: 'dp-techniques-et-matieres',
            label: 'Techniques & matières',
            description: 'Explorer différents outils et supports pour sentir ce qui te ressemble vraiment.',
        },
        {
            slug: 'dp-pratique-quotidienne',
            label: 'Pratique quotidienne & carnets',
            description: 'Croquis, carnets, petites routines visuelles pour nourrir ton geste au quotidien.',
        },
    ],
    'comprendre-une-oeuvre': [
        {
            slug: 'ao-bases-du-regard',
            label: 'Bases du regard',
            description: 'Entrer dans une image avec des questions simples, sans jargon et sans intimidation.',
        },
        {
            slug: 'ao-composition-structure',
            label: 'Composition & structure',
            description: 'Lignes de force, masses, organisation de l’image : comment tout tient ensemble.',
        },
        {
            slug: 'ao-lumiere-espace',
            label: 'Lumière & espace',
            description: 'Clairs-obscurs, profondeur, perspectives et ambiances lumineuses.',
        },
    ],
    'histoires-d-artistes': [
        {
            slug: 'ha-portraits-d-artistes',
            label: 'Portraits d’artistes',
            description: 'Des vies racontées par fragments sensibles : doutes, élans, tournants décisifs.',
        },
        {
            slug: 'ha-ateliers-et-coulisses',
            label: 'Ateliers & coulisses',
            description: 'Lieux de travail, rituels, matières et tout ce qui se passe “hors cadre”.',
        },
        {
            slug: 'ha-parcours-creatifs',
            label: 'Parcours créatifs',
            description: 'Chemins de vie, reconversions, trajectoires contemporaines et atypiques.',
        },
    ],
    'histoire-de-l-art': [
        {
            slug: 'hi-grandes-periodes',
            label: 'Grandes périodes',
            description: 'Les grandes ères de l’histoire de l’art, racontées comme un récit accessible.',
        },
        {
            slug: 'hi-mouvements-et-styles',
            label: 'Mouvements & styles',
            description: 'Courants, tendances et façons de faire qui ont marqué les images.',
        },
        {
            slug: 'hi-figures-oubliees',
            label: 'Figures oubliées',
            description: 'Artistes peu visibles dans les manuels, qu’on remet doucement en lumière.',
        },
    ],
    'couleurs-harmonie': [
        {
            slug: 'ch-bases-de-la-couleur',
            label: 'Bases de la couleur',
            description: 'Valeurs, températures, contrastes : les fondations expliquées concrètement.',
        },
        {
            slug: 'ch-palettes-et-harmonies',
            label: 'Palettes & harmonies',
            description: 'Composer des palettes utiles pour tes projets, pas seulement pour la théorie.',
        },
        {
            slug: 'ch-couleur-et-emotion',
            label: 'Couleur & émotion',
            description: 'Comprendre comment les couleurs modifient l’ambiance et le ressenti d’une image.',
        },
    ],
    inspirations: [
        {
            slug: 'in-rituels-pour-regard',
            label: 'Rituels pour nourrir le regard',
            description: 'Petits rendez-vous réguliers avec des images pour garder ton regard vivant.',
        },
        {
            slug: 'in-ambiances-et-lieux',
            label: 'Ambiances & lieux',
            description: 'Scènes du quotidien, lumières, fragments de nature et de ville qui inspirent.',
        },
        {
            slug: 'in-bibliotheques-d-images',
            label: 'Bibliothèques d’images',
            description: 'Moodboards, collections visuelles, archives personnelles pour créer plus tard.',
        },
    ],
    'psychologie-de-l-art': [
        {
            slug: 'pa-blocages-et-peurs',
            label: 'Blocages & peurs',
            description: 'Feuille blanche, regard des autres, perfectionnisme : on met des mots dessus.',
        },
        {
            slug: 'pa-rituels-d-apaisement',
            label: 'Rituels d’apaisement',
            description: 'Micro-rituels dessin + respiration pour apaiser ton système nerveux.',
        },
        {
            slug: 'pa-confiance-creative',
            label: 'Confiance créative',
            description: 'Retisser une relation plus douce avec ta créativité et ta valeur.',
        },
    ],
};

export const subcatLabels: Record<SubcategorySlug, string> = {
    'dp-fondamentaux-du-dessin': 'Fondamentaux du dessin',
    'dp-techniques-et-matieres': 'Techniques & matières',
    'dp-pratique-quotidienne': 'Pratique quotidienne',
    'ao-bases-du-regard': 'Bases du regard',
    'ao-composition-structure': 'Composition & structure',
    'ao-lumiere-espace': 'Lumière & espace',
    'ha-portraits-d-artistes': 'Portraits d’artistes',
    'ha-ateliers-et-coulisses': 'Ateliers & coulisses',
    'ha-parcours-creatifs': 'Parcours créatifs',
    'hi-grandes-periodes': 'Grandes périodes',
    'hi-mouvements-et-styles': 'Mouvements & styles',
    'hi-figures-oubliees': 'Figures oubliées',
    'ch-bases-de-la-couleur': 'Bases de la couleur',
    'ch-palettes-et-harmonies': 'Palettes & harmonies',
    'ch-couleur-et-emotion': 'Couleur & émotion',
    'in-rituels-pour-regard': 'Rituels pour le regard',
    'in-ambiances-et-lieux': 'Ambiances & lieux',
    'in-bibliotheques-d-images': 'Bibliothèques d’images',
    'pa-blocages-et-peurs': 'Blocages & peurs',
    'pa-rituels-d-apaisement': 'Rituels d’apaisement',
    'pa-confiance-creative': 'Confiance créative',
};

export const formatLabels: Record<PostFormat, string> = {
    tutorial: 'Tutoriel',
    'artwork-analysis': 'Analyse d’œuvre',
    'artist-story': 'Portrait / récit',
    'art-history': "Histoire de l'art",
    'color-guide': 'Guide couleur',
    'art-psychology': "Psychologie de l'art",
    inspiration: 'Inspiration',
};

export const levelLabels: Record<Level, string> = {
    beginner: 'Débutant',
    intermediate: 'Intermédiaire',
};

// 🔎 Mock posts — à remplacer par ta vraie data plus tard
export const allPosts: CategoryPost[] = [
    {
        slug: 'oser-le-premier-trait',
        title: 'Oser le premier trait : 3 exercices doux pour délier la main',
        excerpt: 'Un crayon, une feuille, et trois mini-exercices simples pour apprivoiser la peur de “rater”. Ici, on cherche le geste, pas le chef-d’œuvre.',
        level: 'beginner',
        format: 'tutorial',
        readingTime: '8 min',
        coverImage: '/images/articles/exemple-dessin-1.png',
        pillarSlug: 'dessin-peinture',
        subcategory: 'dp-fondamentaux-du-dessin',
    },
    {
        slug: 'dessiner-sans-gomme',
        title: 'Dessiner sans gomme : apprendre à aimer les “erreurs”',
        excerpt: 'Et si tu posais ton trait sans possibilité d’effacer ? Un petit protocole pour transformer tes “ratés” en matière vivante.',
        level: 'intermediate',
        format: 'tutorial',
        readingTime: '10 min',
        coverImage: '/images/articles/exemple-dessin-2.png',
        pillarSlug: 'dessin-peinture',
        subcategory: 'dp-fondamentaux-du-dessin',
    },
    {
        slug: 'lire-un-tableau-en-3-etapes',
        title: 'Lire un tableau en 3 étapes simples',
        excerpt: 'Composition, lumière, direction du regard : trois portes d’entrée pour comprendre n’importe quelle image sans jargon.',
        level: 'beginner',
        format: 'artwork-analysis',
        readingTime: '7 min',
        coverImage: '/images/articles/exemple-analyse-1.png',
        pillarSlug: 'comprendre-une-oeuvre',
        subcategory: 'ao-bases-du-regard',
    },
    {
        slug: 'pourquoi-ce-tableau-te-touche',
        title: 'Pourquoi ce tableau te touche (et un autre non)',
        excerpt: 'Entre lignes, couleurs et mémoire personnelle, une œuvre vient frapper à des endroits très précis de toi. On démêle ça ensemble.',
        level: 'intermediate',
        format: 'art-psychology',
        readingTime: '9 min',
        coverImage: '/images/articles/exemple-analyse-2.png',
        pillarSlug: 'comprendre-une-oeuvre',
        subcategory: 'ao-bases-du-regard',
    },
    {
        slug: 'frida-kahlo-en-5-moments',
        title: 'Frida Kahlo en 5 moments de vie',
        excerpt: 'Plutôt qu’une biographie complète, cinq fragments sensibles pour comprendre comment sa vie et son œuvre s’entremêlent.',
        level: 'beginner',
        format: 'artist-story',
        readingTime: '9 min',
        coverImage: '/images/articles/exemple-artiste-1.png',
        pillarSlug: 'histoires-d-artistes',
        subcategory: 'ha-portraits-d-artistes',
    },
    {
        slug: 'atelier-silencieux',
        title: 'L’atelier silencieux : habiter le temps long',
        excerpt: 'Ce qui se passe vraiment quand un·e artiste reste seul·e face à sa toile pendant des heures.',
        level: 'intermediate',
        format: 'artist-story',
        readingTime: '11 min',
        coverImage: '/images/articles/exemple-artiste-2.png',
        pillarSlug: 'histoires-d-artistes',
        subcategory: 'ha-ateliers-et-coulisses',
    },
    {
        slug: 'renaissance-sans-jargon',
        title: 'La Renaissance sans jargon',
        excerpt: 'Perspective, humanisme, lumière : les bases pour comprendre pourquoi cette période a tout changé dans l’histoire de l’art.',
        level: 'beginner',
        format: 'art-history',
        readingTime: '8 min',
        coverImage: '/images/articles/exemple-histoire-1.png',
        pillarSlug: 'histoire-de-l-art',
        subcategory: 'hi-grandes-periodes',
    },
    {
        slug: 'femmes-artistes-oubliees',
        title: 'Femmes artistes oubliées : 3 noms à découvrir',
        excerpt: 'Trois trajectoires puissantes, souvent effacées des manuels, qui méritent d’entrer dans ton panthéon intérieur.',
        level: 'intermediate',
        format: 'art-history',
        readingTime: '10 min',
        coverImage: '/images/articles/exemple-histoire-2.png',
        pillarSlug: 'histoire-de-l-art',
        subcategory: 'hi-figures-oubliees',
    },
    {
        slug: 'comprendre-le-bleu',
        title: 'Pourquoi le bleu apaise (et pas toujours)',
        excerpt: 'Symbolique, nuances, contrastes : on décortique pourquoi le bleu est perçu comme calme… et quand il ne l’est plus du tout.',
        level: 'beginner',
        format: 'color-guide',
        readingTime: '7 min',
        coverImage: '/images/articles/exemple-couleur-1.png',
        pillarSlug: 'couleurs-harmonie',
        subcategory: 'ch-couleur-et-emotion',
    },
    {
        slug: 'creer-ta-premiere-palette',
        title: 'Créer ta première palette personnelle',
        excerpt: 'Un pas-à-pas pour composer une palette qui te ressemble, à partir d’une émotion, d’un lieu ou d’un souvenir.',
        level: 'intermediate',
        format: 'color-guide',
        readingTime: '9 min',
        coverImage: '/images/articles/exemple-couleur-2.png',
        pillarSlug: 'couleurs-harmonie',
        subcategory: 'ch-palettes-et-harmonies',
    },
    {
        slug: 'moodboard-matinal',
        title: 'Moodboard matinal : 5 minutes pour nourrir ton regard',
        excerpt: 'Un rituel simple pour collecter images, textures et couleurs sans pression, juste pour le plaisir de regarder.',
        level: 'beginner',
        format: 'inspiration',
        readingTime: '5 min',
        coverImage: '/images/articles/exemple-inspi-1.png',
        pillarSlug: 'inspirations',
        subcategory: 'in-rituels-pour-regard',
    },
    {
        slug: 'trouver-lenvie-quand-tout-est-plat',
        title: 'Retrouver l’envie quand tout paraît plat',
        excerpt: 'Quelques pistes visuelles et sensibles pour relancer le mouvement quand tu ne ressens plus grand-chose devant une feuille blanche.',
        level: 'intermediate',
        format: 'inspiration',
        readingTime: '8 min',
        coverImage: '/images/articles/exemple-inspi-2.png',
        pillarSlug: 'inspirations',
        subcategory: 'in-ambiances-et-lieux',
    },
    {
        slug: 'peur-de-la-feuille-blanche',
        title: 'Peur de la feuille blanche : ce qui se joue en toi',
        excerpt: 'Et si ce n’était pas “de la flemme” mais un mélange de vulnérabilité, d’exigence et de besoin de sécurité ? On décortique tout ça ensemble.',
        level: 'beginner',
        format: 'art-psychology',
        readingTime: '9 min',
        coverImage: '/images/articles/exemple-psy-1.png',
        pillarSlug: 'psychologie-de-l-art',
        subcategory: 'pa-blocages-et-peurs',
    },
    {
        slug: 'dessiner-pour-se-calmer',
        title: 'Dessiner pour se calmer : mini-rituel de 10 minutes',
        excerpt: 'Un petit protocole dessin + respiration pour faire de ta pratique un appui, pas un examen permanent.',
        level: 'intermediate',
        format: 'art-psychology',
        readingTime: '10 min',
        coverImage: '/images/articles/exemple-psy-2.png',
        pillarSlug: 'psychologie-de-l-art',
        subcategory: 'pa-rituels-d-apaisement',
    },
];
