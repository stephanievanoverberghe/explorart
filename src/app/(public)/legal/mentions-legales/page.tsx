// src/app/(public)/legal/mentions-legales/page.tsx
import Link from 'next/link';

const identity = {
    name: 'Explor’Art',
    url: 'https://explorart.fr',
    email: 'bonjour@explorart.fr',
};

const editor = [
    {
        label: 'Responsable de publication',
        value: 'Camille Morand, fondatrice d’Explor’Art',
    },
    {
        label: 'Forme juridique',
        value: 'Entreprise individuelle — Création de contenus culturels et pédagogiques',
    },
    {
        label: 'Adresse postale',
        value: '10 rue des Ateliers, 75011 Paris, France',
    },
];

const host = [
    { label: 'Hébergeur', value: 'Vercel Inc.' },
    { label: 'Adresse', value: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis' },
    { label: 'Site web', value: 'https://vercel.com' },
];

const contacts = [
    {
        title: 'Contact presse & partenariats',
        description: 'Pour les collaborations éditoriales, interviews ou partenariats pédagogiques.',
        channel: 'partenariats@explorart.fr',
        icon: '📣',
    },
    {
        title: 'Support technique',
        description: 'Signale un bug, une difficulté d’accès ou une anomalie de sécurité.',
        channel: 'support@explorart.fr',
        icon: '🛠️',
    },
    {
        title: 'Signalement contenu',
        description: 'Pour toute réclamation sur un contenu ou une question de droit d’auteur.',
        channel: 'legal@explorart.fr',
        icon: '⚖️',
    },
];

const legalNavLinks = [
    {
        href: '/legal/politique-de-confidentialite',
        title: 'Politique de confidentialité',
        description: 'Données collectées, base légale, droits RGPD.',
    },
    {
        href: '/legal/politique-de-cookies',
        title: 'Politique de cookies',
        description: 'Bandeau, consentement, mesures d’audience.',
    },
    {
        href: '/legal/conditions-d-utilisation',
        title: 'Conditions d’utilisation',
        description: 'Utilisation raisonnable, sécurité, interactions.',
    },
    {
        href: '/legal/conditions-generales-de-vente',
        title: 'Conditions générales de vente',
        description: 'Achats, formations, produits numériques.',
    },
    {
        href: '/legal/politique-de-remboursement',
        title: 'Politique de remboursement',
        description: 'Annulation, contenu non conforme, cas techniques.',
    },
    {
        href: '/legal/licence-utilisation-ressources',
        title: 'Licence d’utilisation des ressources',
        description: 'Usage personnel des PDF, cours, supports.',
    },
    {
        href: '/legal/politique-newsletter',
        title: 'Newsletter & e-mails',
        description: 'Fréquence, contenu, désinscription.',
    },
    {
        href: '/legal/espace-membre-et-communaute',
        title: 'Espace membre & communauté',
        description: 'Compte, règles de bienveillance, modération.',
    },
];

export default function MentionsLegalesPage() {
    return (
        <main className="bg-ivory text-main">
            <section className="relative overflow-hidden pt-16 pb-14 md:pt-20 md:pb-16">
                <div className="absolute inset-0 bg-linear-to-br from-ivory via-white to-sage/10" />
                <div className="absolute right-0 top-10 h-44 w-44 rounded-full bg-ocre/10 blur-3xl" />

                <div className="container-page relative grid gap-8 lg:grid-cols-[1.2fr_minmax(0,1fr)] lg:items-center">
                    <div className="space-y-6 animate-fade-up">
                        <p className="section-label section-label-ocre">Mentions légales</p>
                        <h1 className="font-serif-title text-3xl md:text-4xl leading-tight">Transparence sur qui édite, héberge et anime Explor’Art.</h1>
                        <p className="text-main/75 text-base md:text-lg max-w-2xl">
                            Tu trouveras ici les informations obligatoires sur l’éditeur, l’hébergeur et les moyens de contact. Nous gardons ces données à jour pour que tu saches
                            toujours à qui t’adresser.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <span className="pill">Identité claire</span>
                            <span className="pill pill-alt">Infos hébergeur</span>
                            <span className="pill">Contacts dédiés</span>
                        </div>
                    </div>

                    <div className="relative animate-fade-up" style={{ animationDelay: '0.08s' }}>
                        <div className="rounded-3xl border border-perl/60 bg-white/85 shadow-lg backdrop-blur-sm p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-2xl bg-main text-ivory flex items-center justify-center text-2xl">✨</div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-main/55">Identité numérique</p>
                                    <p className="font-serif-title text-xl">{identity.name}</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm text-main/80">
                                <p className="flex items-center gap-2">
                                    <span className="text-lg">🌐</span>
                                    <a className="underline" href={identity.url}>
                                        {identity.url}
                                    </a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-lg">✉️</span>
                                    <a className="underline" href={`mailto:${identity.email}`}>
                                        {identity.email}
                                    </a>
                                </p>
                            </div>
                            <div className="rounded-2xl border border-sage/30 bg-sage/10 px-4 py-3 text-sm text-main/80">
                                Explor’Art est un média culturel indépendant. La création de contenus, la modération et la gestion des données sont pilotées en interne.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-b border-perl/40 bg-background py-12 md:py-16">
                <div className="container-page grid gap-10 lg:grid-cols-2">
                    <div className="space-y-4 animate-fade-up">
                        <p className="section-label section-label-sage">Éditeur</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Coordonnées officielles</h2>
                        <p className="text-main/70 max-w-2xl">Ces informations te permettent d’identifier la personne responsable du site et de la publication.</p>

                        <div className="space-y-3">
                            {editor.map((item) => (
                                <div key={item.label} className="rounded-2xl border border-perl/40 bg-white/80 p-4">
                                    <p className="text-xs uppercase tracking-[0.18em] text-main/60">{item.label}</p>
                                    <p className="font-serif-title text-lg mt-1">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 animate-fade-up" style={{ animationDelay: '0.08s' }}>
                        <p className="section-label section-label-terre">Hébergement</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Serveurs et support</h2>
                        <p className="text-main/70 max-w-2xl">L’infrastructure d’hébergement garantit performance, sécurité et disponibilité des contenus.</p>

                        <div className="grid gap-3">
                            {host.map((item) => (
                                <div key={item.label} className="rounded-2xl border border-perl/40 bg-white/70 p-4">
                                    <p className="text-xs uppercase tracking-[0.18em] text-main/60">{item.label}</p>
                                    <p className="font-serif-title text-lg mt-1">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-2xl border border-ocre/30 bg-ocre/10 p-4 text-sm text-main/80">
                            Les serveurs sont situés dans des centres de données sécurisés et conformes aux normes en vigueur. Les sauvegardes sont répliquées pour limiter les
                            interruptions.
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container-page space-y-8">
                    <div className="space-y-3 max-w-2xl">
                        <p className="section-label section-label-ocre">Nous écrire</p>
                        <h2 className="font-serif-title text-2xl md:3xl">Choisis le bon canal</h2>
                        <p className="text-main/70">Pour aller vite, utilise l’adresse dédiée à ta demande. Nous répondons généralement sous 48h ouvrées.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {contacts.map((contact, index) => (
                            <div
                                key={contact.title}
                                className="rounded-3xl border border-perl/40 bg-white/85 p-6 shadow-sm animate-fade-up"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{contact.icon}</span>
                                    <p className="text-xs uppercase tracking-[0.18em] text-main/60">Contact</p>
                                </div>
                                <h3 className="font-serif-title text-xl mt-3">{contact.title}</h3>
                                <p className="text-main/70 text-sm leading-relaxed">{contact.description}</p>
                                <a className="inline-flex items-center gap-2 mt-4 text-main underline" href={`mailto:${contact.channel}`}>
                                    {contact.channel}
                                    <span aria-hidden>↗</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NAVIGATION VERS LES AUTRES PAGES LÉGALES */}
            <section className="border-t border-perl/40 bg-background py-10 md:py-12">
                <div className="container-page space-y-6">
                    <div className="space-y-2 max-w-2xl">
                        <p className="section-label section-label-sage">Autres pages légales Explor’Art</p>
                        <p className="text-main/70 text-sm">
                            Pour en savoir plus sur la façon dont tes données sont gérées, comment les cookies fonctionnent ou comment se déroulent les achats, consulte aussi ces
                            pages :
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
                    <div className="space-y-2 max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.2em] text-ivory/70">Dernière révision</p>
                        <h3 className="font-serif-title text-2xl">Mentions légales mises à jour</h3>
                        <p className="text-ivory/80">
                            Cette page est actualisée dès qu’une information change (hébergeur, contact, forme juridique). N’hésite pas à revenir vérifier régulièrement.
                        </p>
                    </div>
                    <div className="rounded-full bg-white/15 border border-white/25 px-6 py-4 text-sm text-ivory/85 shadow-lg">Année en cours : {new Date().getFullYear()}</div>
                </div>
            </section>
        </main>
    );
}
