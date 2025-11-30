// src/app/(public)/legal/politique-de-confidentialite/page.tsx
import Link from 'next/link';

const dataUse = [
    {
        title: 'Newsletter & communication',
        description:
            'E-mail uniquement si tu as donné ton accord (inscription newsletter, téléchargement de ressources, achat). Désinscription possible en un clic depuis chaque message.',
        icon: '📮',
    },
    {
        title: 'Statistiques de navigation',
        description:
            'Mesure d’audience pour comprendre ce qui t’intéresse : pages consultées, temps de lecture, origine du trafic. Les données sont agrégées et anonymisées autant que possible.',
        icon: '📈',
    },
    {
        title: 'Formulaires & support',
        description:
            'Lorsque tu contactes l’équipe, seules les informations nécessaires à ta demande sont conservées (nom, e-mail, message). Elles servent à te répondre et améliorer les contenus.',
        icon: '💌',
    },
];

const userRights = [
    {
        title: 'Accès et rectification',
        description: 'Tu peux demander à voir les données te concernant et corriger celles qui sont inexactes.',
    },
    {
        title: 'Retrait du consentement',
        description: 'Tu peux te désabonner des communications ou supprimer ton compte à tout moment.',
    },
    {
        title: 'Portabilité et effacement',
        description: 'Sur demande, nous pouvons exporter tes données ou les supprimer (sauf obligations légales).',
    },
];

const protections = [
    'Accès restreint aux outils d’admin et de support.',
    'Sauvegardes régulières avec chiffrement côté serveur.',
    'Audit ponctuel des extensions et intégrations tierces.',
    'Limitation stricte du nombre de personnes ayant accès aux données personnelles.',
];

const legalNavLinks = [
    {
        href: '/legal/mentions-legales',
        title: 'Mentions légales',
        description: 'Qui édite Explor’Art, qui héberge, comment nous joindre.',
    },
    {
        href: '/legal/politique-de-cookies',
        title: 'Politique de cookies',
        description: 'Bandeau, consentement et catégories de cookies utilisés.',
    },
    {
        href: '/legal/conditions-d-utilisation',
        title: 'Conditions d’utilisation',
        description: 'Règles d’usage du site, sécurité, comportement attendu.',
    },
    {
        href: '/legal/conditions-generales-de-vente',
        title: 'Conditions générales de vente',
        description: 'Achats, produits numériques, droit de rétractation.',
    },
    {
        href: '/legal/politique-de-remboursement',
        title: 'Politique de remboursement',
        description: 'Cas de remboursement, annulations, demandes.',
    },
    {
        href: '/legal/licence-utilisation-ressources',
        title: 'Licence d’utilisation des ressources',
        description: 'Usage autorisé des PDF, cours et contenus premium.',
    },
    {
        href: '/legal/politique-newsletter',
        title: 'Newsletter & e-mails',
        description: 'Type d’e-mails, fréquence, désinscription.',
    },
    {
        href: '/legal/espace-membre-et-communaute',
        title: 'Espace membre & communauté',
        description: 'Compte, commentaires, modération et signalement.',
    },
];

export default function PolitiqueConfidentialitePage() {
    return (
        <main className="bg-ivory text-main">
            <section className="relative overflow-hidden pt-16 pb-14 md:pt-20 md:pb-16">
                <div className="absolute inset-0 bg-linear-to-br from-ivory via-white to-terre/5" />
                <div className="absolute -left-10 top-6 h-44 w-44 rounded-full bg-sage/15 blur-3xl" />
                <div className="absolute right-4 bottom-0 h-40 w-40 rounded-full bg-ocre/15 blur-3xl" />

                <div className="container-page relative grid gap-8 lg:grid-cols-[1.1fr_minmax(0,1fr)] lg:items-center">
                    <div className="space-y-6 max-w-2xl animate-fade-up">
                        <p className="section-label section-label-sage">Politique de confidentialité</p>
                        <h1 className="font-serif-title text-3xl md:text-4xl leading-tight">Tes données sont traitées avec douceur, transparence et mesure.</h1>
                        <p className="text-main/75 text-base md:text-lg max-w-2xl">
                            Cette page explique quelles informations sont collectées, pourquoi, et comment tu peux exercer tes droits. Le ton est volontairement clair et sans
                            jargon.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <span className="pill">Consentement explicite</span>
                            <span className="pill pill-alt">Transparence totale</span>
                            <span className="pill">Sécurité renforcée</span>
                        </div>
                    </div>

                    <div className="relative animate-fade-up" style={{ animationDelay: '0.08s' }}>
                        <div className="rounded-3xl border border-perl/60 bg-white/80 shadow-lg backdrop-blur-sm p-6 space-y-4 max-w-md ml-auto">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-main/55">Essentiel</p>
                                    <p className="font-serif-title text-xl">Nous ne vendons pas tes données.</p>
                                </div>
                                <span className="text-3xl">🧊</span>
                            </div>
                            <p className="text-main/70 text-sm leading-relaxed">
                                Chaque collecte est motivée par l’amélioration des contenus ou la personnalisation de ton expérience. Tu es libre de retirer ton consentement à tout
                                moment.
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-sm text-main/80">
                                <div className="rounded-2xl bg-sage/10 border border-sage/30 px-3 py-2">Double opt-in newsletter</div>
                                <div className="rounded-2xl bg-ocre/10 border border-ocre/30 px-3 py-2">Accès chiffré (HTTPS)</div>
                                <div className="rounded-2xl bg-terre/10 border border-terre/30 px-3 py-2">Stockage limité</div>
                                <div className="rounded-2xl bg-perl/20 border border-perl/40 px-3 py-2">Suppression sur demande</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-b border-perl/40 bg-background py-12 md:py-16">
                <div className="container-page space-y-10">
                    <div className="max-w-2xl space-y-3">
                        <p className="section-label section-label-ocre">Pourquoi ces données ?</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Des usages précis, limités et utiles</h2>
                        <p className="text-main/70">
                            Nous collectons uniquement ce qui est nécessaire pour informer, sécuriser et améliorer ton expérience. Pas de profilage publicitaire invasif.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {dataUse.map((item, index) => (
                            <div
                                key={item.title}
                                className="rounded-3xl border border-perl/40 bg-white/85 p-6 shadow-sm animate-fade-up"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{item.icon}</span>
                                    <p className="text-xs uppercase tracking-[0.18em] text-main/60">Usage</p>
                                </div>
                                <h3 className="font-serif-title text-xl mt-3">{item.title}</h3>
                                <p className="text-main/70 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_minmax(0,1fr)] lg:items-start">
                    <div className="space-y-6 animate-fade-up">
                        <p className="section-label section-label-sage">Tes droits</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Tu gardes le contrôle</h2>
                        <p className="text-main/70 max-w-3xl">
                            Conformément au RGPD, tu peux exercer tes droits à tout moment. Nous répondons dans les meilleurs délais et t’expliquons chaque étape de traitement.
                        </p>

                        <div className="grid gap-4 sm:grid-cols-3">
                            {userRights.map((right) => (
                                <div key={right.title} className="rounded-2xl border border-perl/40 bg-white/70 p-4 shadow-sm">
                                    <p className="text-xs uppercase tracking-[0.18em] text-main/60">Droit</p>
                                    <h3 className="font-serif-title text-lg mt-1">{right.title}</h3>
                                    <p className="text-main/70 text-sm leading-relaxed mt-1">{right.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-2xl border border-sage/30 bg-sage/10 p-4 text-sm text-main/80">
                            Pour exercer un droit, écris à{' '}
                            <a className="underline" href="mailto:privacy@explorart.fr">
                                privacy@explorart.fr
                            </a>{' '}
                            en précisant ta demande et l’adresse e-mail concernée.
                        </div>
                    </div>

                    <aside className="relative animate-fade-up" style={{ animationDelay: '0.1s' }}>
                        <div className="rounded-3xl border border-perl/50 bg-linear-to-br from-white via-ivory to-sage/10 p-6 shadow-md space-y-4">
                            <p className="text-xs uppercase tracking-[0.22em] text-main/55">Protection</p>
                            <ul className="space-y-3 text-main/75 text-sm">
                                {protections.map((protection) => (
                                    <li key={protection} className="flex items-start gap-2">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-main" />
                                        <span className="leading-relaxed">{protection}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="rounded-2xl border border-ocre/30 bg-ocre/10 p-4 text-sm text-main/80">
                                Les outils tiers utilisés (analytics, envoi d’e-mails, paiement) sont choisis pour leur conformité RGPD et leur transparence.
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
                            Pour une vision complète, tu peux consulter les autres pages : mentions légales, cookies, conditions d’utilisation, vente, licence et espace membre.
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
                        <p className="text-xs uppercase tracking-[0.2em] text-ivory/70">Durées de conservation</p>
                        <h3 className="font-serif-title text-2xl">Nous ne gardons pas plus que nécessaire</h3>
                        <p className="text-ivory/80">
                            Les données liées à la newsletter sont supprimées dès la désinscription. Les logs techniques sont conservés quelques mois pour la sécurité. Les factures
                            sont conservées selon les obligations légales.
                        </p>
                    </div>
                    <div className="rounded-full bg-white/15 border border-white/25 px-6 py-4 text-sm text-ivory/85 shadow-lg">
                        Dernière mise à jour : {new Date().getFullYear()}
                    </div>
                </div>
            </section>
        </main>
    );
}
