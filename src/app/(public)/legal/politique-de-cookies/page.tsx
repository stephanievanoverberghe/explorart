// src/app/(public)/legal/politique-de-cookies/page.tsx
import Link from 'next/link';

const cookieTypes = [
    {
        title: 'Fonctionnels',
        description: 'Assurent le bon fonctionnement du site (langue, préférences, session sécurisée). Indispensables et déposés par défaut.',
        badge: 'Essentiels',
    },
    {
        title: 'Mesure d’audience',
        description: 'Permettent de suivre l’usage du site pour améliorer les contenus. Les données sont anonymisées autant que possible.',
        badge: 'Analytics',
    },
    {
        title: 'Expérience & médias',
        description: 'Utilisés pour afficher des vidéos, polices ou intégrations interactives. Activés uniquement si tu l’acceptes.',
        badge: 'Confort',
    },
];

const manageSteps = [
    'À ta première visite, une bannière te présente les catégories de cookies : tu peux accepter ou refuser en un clic.',
    'Tu peux modifier ton choix à tout moment via le lien “Préférences cookies” en bas de page.',
    'Le refus des cookies non essentiels peut limiter certaines fonctionnalités (vidéos embarquées, formulaires avancés).',
];

const durations = [
    'Cookies fonctionnels : durée courte, souvent limitée à la session ou quelques jours.',
    'Cookies analytiques : 12 mois maximum, avec IP raccourcie quand c’est possible.',
    'Cookies tiers (vidéo, police, intégrations) : durée définie par le service concerné, consultable dans la bannière.',
];

const legalNavLinks = [
    {
        href: '/legal/mentions-legales',
        title: 'Mentions légales',
        description: 'Identité de l’éditeur, hébergeur, contacts officiels.',
    },
    {
        href: '/legal/politique-de-confidentialite',
        title: 'Politique de confidentialité',
        description: 'Données collectées, base légale, droits RGPD.',
    },
    {
        href: '/legal/conditions-d-utilisation',
        title: 'Conditions d’utilisation',
        description: 'Règles d’usage du site et de l’espace membre.',
    },
    {
        href: '/legal/conditions-generales-de-vente',
        title: 'Conditions générales de vente',
        description: 'Achats, formations, paiements, accès aux contenus.',
    },
    {
        href: '/legal/politique-de-remboursement',
        title: 'Politique de remboursement',
        description: 'Modalités d’annulation, cas particuliers, demandes.',
    },
    {
        href: '/legal/licence-utilisation-ressources',
        title: 'Licence d’utilisation des ressources',
        description: 'Ce que tu peux faire avec les PDF, cours, supports.',
    },
    {
        href: '/legal/politique-newsletter',
        title: 'Newsletter & e-mails',
        description: 'Type d’e-mails envoyés, désinscription, engagement anti-spam.',
    },
    {
        href: '/legal/espace-membre-et-communaute',
        title: 'Espace membre & communauté',
        description: 'Règles de comportement, modération, sécurité.',
    },
];

export default function PolitiqueCookiesPage() {
    return (
        <main className="bg-ivory text-main">
            <section className="relative overflow-hidden pt-16 pb-14 md:pt-20 md:pb-16">
                <div className="absolute inset-0 bg-linear-to-br from-ivory via-white to-ocre/5" />
                <div className="absolute left-10 top-12 h-44 w-44 rounded-full bg-sage/15 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-terre/15 blur-3xl" />

                <div className="container-page relative grid gap-8 lg:grid-cols-[1.1fr_minmax(0,1fr)] lg:items-center">
                    <div className="space-y-6 max-w-2xl animate-fade-up">
                        <p className="section-label section-label-terre">Politique de cookies</p>
                        <h1 className="font-serif-title text-3xl md:text-4xl leading-tight">Choisis ce que tu partages pour une expérience sur-mesure.</h1>
                        <p className="text-main/75 text-base md:text-lg max-w-2xl">
                            Les cookies servent à rendre le site fluide, comprendre ce qui fonctionne et proposer des formats inspirants. Tu restes libre de dire oui ou non.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <span className="pill">Consentement granulaire</span>
                            <span className="pill pill-alt">Paramétrage rapide</span>
                            <span className="pill">Respect de la vie privée</span>
                        </div>
                    </div>

                    <div className="relative animate-fade-up" style={{ animationDelay: '0.08s' }}>
                        <div className="rounded-3xl border border-perl/60 bg-white/80 shadow-lg backdrop-blur-sm p-6 space-y-4 max-w-md ml-auto">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-main/55">En bref</p>
                                    <p className="font-serif-title text-xl">Aucun cookie marketing invasif.</p>
                                </div>
                                <span className="text-3xl">🍪</span>
                            </div>
                            <p className="text-main/70 text-sm leading-relaxed">
                                Les cookies sont classés par catégorie. Seuls les cookies fonctionnels sont indispensables. Les autres attendent ton feu vert.
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-sm text-main/80">
                                <div className="rounded-2xl bg-sage/10 border border-sage/30 px-3 py-2">Essentiels activés</div>
                                <div className="rounded-2xl bg-ocre/10 border border-ocre/30 px-3 py-2">Analytics sur consentement</div>
                                <div className="rounded-2xl bg-terre/10 border border-terre/30 px-3 py-2">Médias optionnels</div>
                                <div className="rounded-2xl bg-perl/20 border border-perl/40 px-3 py-2">Préférences mémorisées</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-b border-perl/40 bg-background py-12 md:py-16">
                <div className="container-page space-y-10">
                    <div className="max-w-2xl space-y-3">
                        <p className="section-label section-label-sage">Catégories de cookies</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Comprendre leur rôle</h2>
                        <p className="text-main/70">Chaque cookie a une utilité précise. Nous privilégions l’anonymisation et limitons la durée de conservation.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {cookieTypes.map((type, index) => (
                            <div
                                key={type.title}
                                className="rounded-3xl border border-perl/40 bg-white/85 p-6 shadow-sm animate-fade-up"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xs uppercase tracking-[0.18em] text-main/60">{type.badge}</span>
                                    <span className="inline-flex h-2 w-2 rounded-full bg-main" />
                                </div>
                                <h3 className="font-serif-title text-xl mt-3">{type.title}</h3>
                                <p className="text-main/70 text-sm leading-relaxed">{type.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_minmax(0,1fr)] lg:items-start">
                    <div className="space-y-6 animate-fade-up">
                        <p className="section-label section-label-ocre">Gérer mes choix</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Tu peux ajuster à tout moment</h2>
                        <p className="text-main/70 max-w-3xl">
                            Le bandeau de consentement te permet d’autoriser ou refuser les catégories non essentielles. Nous conservons ton choix pour éviter les pop-ups
                            incessantes.
                        </p>

                        <div className="space-y-3">
                            {manageSteps.map((step, index) => (
                                <div key={step} className="rounded-2xl border border-perl/40 bg-white/70 p-4 flex gap-3 items-start">
                                    <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-main text-ivory text-sm font-semibold">{index + 1}</span>
                                    <p className="text-main/75 text-sm leading-relaxed">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="relative animate-fade-up" style={{ animationDelay: '0.1s' }}>
                        <div className="rounded-3xl border border-perl/50 bg-linear-to-br from-white via-ivory to-ocre/10 p-6 shadow-md space-y-4">
                            <p className="text-xs uppercase tracking-[0.22em] text-main/55">Durées & conservation</p>
                            <ul className="space-y-3 text-main/75 text-sm">
                                {durations.map((duration) => (
                                    <li key={duration} className="flex items-start gap-2">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-main" />
                                        <span className="leading-relaxed">{duration}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="rounded-2xl border border-sage/30 bg-sage/10 p-4 text-sm text-main/80">
                                Pour toute question, écris à{' '}
                                <a className="underline" href="mailto:privacy@explorart.fr">
                                    privacy@explorart.fr
                                </a>{' '}
                                ou consulte la bannière pour les détails spécifiques à chaque service tiers.
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
                            Pour aller plus loin, tu peux consulter les autres pages légales : identité de l’éditeur, confidentialité, conditions de vente, espace membre et licence
                            d’utilisation.
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
                        <p className="text-xs uppercase tracking-[0.2em] text-ivory/70">Mises à jour</p>
                        <h3 className="font-serif-title text-2xl">Un bandeau clair et réversible</h3>
                        <p className="text-ivory/80">
                            Si nous ajoutons une nouvelle catégorie de cookies, le bandeau te le signalera. Tu pourras alors accepter ou refuser sans perdre ton historique de
                            préférences.
                        </p>
                    </div>
                    <div className="rounded-full bg-white/15 border border-white/25 px-6 py-4 text-sm text-ivory/85 shadow-lg">Dernière révision : {new Date().getFullYear()}</div>
                </div>
            </section>
        </main>
    );
}
