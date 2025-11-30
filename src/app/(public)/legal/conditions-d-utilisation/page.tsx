// src/app/(public)/legal/conditions-d-utilisation/page.tsx
import Link from 'next/link';

const commitments = [
    {
        title: 'Utilisation raisonnable',
        description: 'Les ressources sont là pour inspirer et apprendre. Merci de ne pas automatiser le scraping, ni de réutiliser massivement les contenus sans autorisation.',
        icon: '🤝',
        tone: 'section-label-sage',
    },
    {
        title: 'Compte et accès',
        description:
            "Si tu crées un compte, protège tes identifiants et choisis un mot de passe solide. Les accès peuvent être suspendus en cas d'abus ou de comportement malveillant.",
        icon: '🔐',
        tone: 'section-label-ocre',
    },
    {
        title: 'Respect de la communauté',
        description: 'Commentaires, messages ou feedbacks doivent rester bienveillants. Aucune tolérance pour le harcèlement, le spam ou les propos discriminants.',
        icon: '💬',
        tone: 'section-label-terre',
    },
];

const limits = [
    {
        title: 'Propriété intellectuelle',
        description:
            "Les textes, illustrations, maquettes et ressources d'Explor’Art sont protégés. Tu peux partager un extrait avec attribution, mais pas les republier intégralement sans accord écrit.",
    },
    {
        title: 'Pas de conseil juridique ou financier',
        description: 'Les contenus sont pédagogiques et créatifs. Ils ne constituent jamais un conseil professionnel au sens juridique, fiscal ou financier.',
    },
    {
        title: 'Disponibilité du service',
        description: "Le site peut évoluer ou être interrompu pour maintenance. Nous faisons au mieux pour prévenir en avance, mais l'accès n'est pas garanti en continu.",
    },
];

const usageRules = [
    {
        title: 'Sécurité et données',
        items: [
            "Ne tente pas d'accéder aux comptes d'autres personnes ou aux parties privées du site.",
            'Signale rapidement toute faille ou activité suspecte : la sécurité est un effort collectif.',
            'Les formulaires collectent uniquement les informations nécessaires (contact, newsletter, achats).',
        ],
    },
    {
        title: 'Interactions et contenus',
        items: [
            'Reste respectueux dans les commentaires, e-mails ou messages privés.',
            'Pas de spam ni de promotion non sollicitée.',
            "Aucune diffusion de contenus illégaux ou portant atteinte à la dignité d'autrui.",
        ],
    },
    {
        title: 'Ressources payantes ou premium',
        items: [
            'Certains contenus peuvent être payants : ils sont réservés à un usage personnel.',
            'Le partage de liens privés, supports ou fichiers premium est interdit sans accord.',
            "En cas de non-respect, l'accès peut être suspendu ou résilié.",
        ],
    },
];

const legalNavLinks = [
    {
        href: '/legal/mentions-legales',
        title: 'Mentions légales',
        description: 'Identité, éditeur, hébergeur, contacts.',
    },
    {
        href: '/legal/politique-de-confidentialite',
        title: 'Politique de confidentialité',
        description: 'Traitement des données personnelles.',
    },
    {
        href: '/legal/politique-de-cookies',
        title: 'Politique de cookies',
        description: 'Bandeau, consentement, cookies fonctionnels.',
    },
    {
        href: '/legal/conditions-generales-de-vente',
        title: 'Conditions générales de vente',
        description: 'Achats, formations, paiements, livraisons.',
    },
    {
        href: '/legal/politique-de-remboursement',
        title: 'Politique de remboursement',
        description: 'Annulations, cas particuliers, demandes.',
    },
    {
        href: '/legal/licence-utilisation-ressources',
        title: 'Licence d’utilisation des ressources',
        description: 'Limites d’usage des supports et PDF.',
    },
    {
        href: '/legal/politique-newsletter',
        title: 'Newsletter & e-mails',
        description: 'Contenu des e-mails, désinscription.',
    },
    {
        href: '/legal/espace-membre-et-communaute',
        title: 'Espace membre & communauté',
        description: 'Règles du tableau de bord et des échanges.',
    },
];

export default function ConditionsUtilisationPage() {
    return (
        <main className="bg-ivory text-main">
            <section className="relative overflow-hidden pt-16 pb-14 md:pt-20 md:pb-16">
                <div className="absolute inset-x-10 top-10 h-40 rounded-full bg-sage/15 blur-3xl" />
                <div className="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-ocre/10 blur-3xl" />

                <div className="container-page relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-6 max-w-2xl animate-fade-up">
                        <p className="section-label section-label-sage">Conditions d’utilisation</p>
                        <h1 className="font-serif-title text-3xl md:text-4xl leading-tight">Les règles pour profiter d’Explor’Art en confiance.</h1>
                        <p className="text-main/75 text-base md:text-lg max-w-2xl">
                            Ces conditions encadrent l’accès aux contenus, aux parcours et aux fonctionnalités interactives du site. Elles sont rédigées pour être claires, humaines
                            et faciles à consulter.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <span className="pill">Mis à jour régulièrement</span>
                            <span className="pill pill-alt">Approche transparente</span>
                            <span className="pill">Version courte & détaillée</span>
                        </div>
                    </div>

                    <div className="relative animate-fade-up" style={{ animationDelay: '0.08s' }}>
                        <div className="rounded-3xl border border-perl/60 bg-white/80 shadow-lg backdrop-blur-sm p-6 space-y-4 max-w-sm">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">🪄</span>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.22em] text-main/55">En un coup d’œil</p>
                                    <p className="font-serif-title text-xl">Sûreté + créativité</p>
                                </div>
                            </div>
                            <p className="text-main/70">
                                Tu peux explorer librement les ressources tant que tu respectes la propriété intellectuelle, la sécurité des données et les autres utilisateurs.
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-sm text-main/80">
                                <div className="rounded-2xl bg-sage/10 border border-sage/30 px-3 py-2">🤝 Respect mutuel</div>
                                <div className="rounded-2xl bg-ocre/10 border border-ocre/30 px-3 py-2">🔒 Données protégées</div>
                                <div className="rounded-2xl bg-terre/10 border border-terre/30 px-3 py-2">🚀 Accès fluide</div>
                                <div className="rounded-2xl bg-perl/20 border border-perl/40 px-3 py-2">📩 Support réactif</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-b border-perl/40 bg-background py-12 md:py-16">
                <div className="container-page space-y-10">
                    <div className="max-w-2xl space-y-3">
                        <p className="section-label section-label-ocre">Ce que tu acceptes</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Un cadre simple pour naviguer sereinement</h2>
                        <p className="text-main/70">
                            Chaque engagement ci-dessous résume la logique générale. Les détails peuvent évoluer, mais l’esprit reste de protéger la créativité de tous.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {commitments.map((commitment, index) => (
                            <div
                                key={commitment.title}
                                className="rounded-3xl border border-perl/40 bg-white/80 p-6 shadow-sm animate-fade-up"
                                style={{ animationDelay: `${index * 0.04}s` }}
                            >
                                <div className="flex items-center gap-2 text-sm text-main/70">
                                    <span className={`section-label ${commitment.tone}`}>{commitment.icon}</span>
                                    <span className="uppercase tracking-[0.18em] text-[0.72rem] text-main/60">Engagement</span>
                                </div>
                                <h3 className="font-serif-title text-xl mt-3">{commitment.title}</h3>
                                <p className="text-main/70 mt-2 text-sm leading-relaxed">{commitment.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_minmax(0,1fr)] lg:items-start">
                    <div className="space-y-6 animate-fade-up">
                        <p className="section-label section-label-terre">Bonnes pratiques</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Ce qu’on attend de chaque utilisateur</h2>
                        <p className="text-main/70 max-w-3xl">
                            Explor’Art repose sur la confiance. Ces règles t’aident à savoir comment agir avec les autres membres, les contenus et les outils mis à disposition.
                        </p>

                        <div className="space-y-6">
                            {usageRules.map((rule) => (
                                <div key={rule.title} className="rounded-2xl border border-perl/40 bg-white/70 p-5 shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-main" />
                                        <h3 className="font-serif-title text-lg">{rule.title}</h3>
                                    </div>
                                    <ul className="mt-3 space-y-2 text-main/75 text-sm list-disc list-inside">
                                        {rule.items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="relative animate-fade-up" style={{ animationDelay: '0.1s' }}>
                        <div className="rounded-3xl border border-perl/50 bg-linear-to-br from-white via-ivory to-sage/10 p-6 shadow-md space-y-4">
                            <p className="text-xs uppercase tracking-[0.22em] text-main/55">Limites importantes</p>
                            {limits.map((limit) => (
                                <div key={limit.title} className="space-y-1 rounded-2xl border border-perl/30 bg-white/60 p-4">
                                    <h4 className="font-serif-title text-base">{limit.title}</h4>
                                    <p className="text-main/70 text-sm leading-relaxed">{limit.description}</p>
                                </div>
                            ))}
                            <div className="rounded-2xl border border-sage/30 bg-sage/10 p-4 text-sm text-main/80">
                                📬 Une question ? Écris à{' '}
                                <a className="underline" href="mailto:bonjour@explorart.fr">
                                    bonjour@explorart.fr
                                </a>{' '}
                                : nous répondrons rapidement.
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* NAVIGATION VERS LES AUTRES PAGES LÉGALES */}
            <section className="border-t border-perl/40 bg-background py-10 md:py-12">
                <div className="container-page space-y-6">
                    <div className="space-y-2 max-w-2xl">
                        <p className="section-label section-label-sage">Autres pages légales Explor’Art</p>
                        <p className="text-main/70 text-sm">
                            Pour comprendre le cadre global (données personnelles, cookies, achats, remboursements, espace membre), tu peux parcourir les autres pages légales.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {legalNavLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group rounded-2xl border border-perl/40 bg-white/80 px-4 py-3 text-sm shadow-xs hover:border-sage/50 hover:bg-sage/5 transition"
                            >
                                <p className="font-serif-title text-base mb-1 group-hover:text-main">{item.title}</p>
                                <p className="text-main/70 text-xs leading-relaxed">{item.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-main text-ivory py-14 md:py-16">
                <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.2em] text-ivory/70">Mises à jour</p>
                        <h3 className="font-serif-title text-2xl">Version dynamique, esprit constant</h3>
                        <p className="text-ivory/80 max-w-2xl">
                            Ces conditions peuvent évoluer pour intégrer de nouvelles fonctionnalités ou répondre à la loi. La version en ligne fait foi ; nous ajoutons une note de
                            mise à jour en cas de changement majeur.
                        </p>
                    </div>
                    <div className="rounded-full bg-white/15 border border-white/25 px-6 py-4 text-sm text-ivory/85 shadow-lg">Dernière révision : {new Date().getFullYear()}</div>
                </div>
            </section>
        </main>
    );
}
