// src/app/(public)/legal/conditions-generales-de-vente/page.tsx
import Link from 'next/link';

const legalNavLinks = [
    {
        href: '/legal/mentions-legales',
        title: 'Mentions légales',
        description: 'Identité de l’éditeur, hébergeur, contacts.',
    },
    {
        href: '/legal/politique-de-confidentialite',
        title: 'Politique de confidentialité',
        description: 'Données collectées, base légale, droits RGPD.',
    },
    {
        href: '/legal/politique-de-cookies',
        title: 'Politique de cookies',
        description: 'Bandeau de consentement et catégories de cookies.',
    },
    {
        href: '/legal/conditions-d-utilisation',
        title: 'Conditions d’utilisation',
        description: 'Règles d’usage du site et de l’espace membre.',
    },
    {
        href: '/legal/politique-de-remboursement',
        title: 'Politique de remboursement',
        description: 'Modalités de remboursement, cas particuliers.',
    },
    {
        href: '/legal/licence-utilisation-ressources',
        title: 'Licence d’utilisation des ressources',
        description: 'Usage autorisé des PDF, cours et programmes.',
    },
    {
        href: '/legal/politique-newsletter',
        title: 'Newsletter & e-mails',
        description: 'Type de contenus envoyés, désinscription.',
    },
    {
        href: '/legal/espace-membre-et-communaute',
        title: 'Espace membre & communauté',
        description: 'Règles, modération et comportements attendus.',
    },
];

const offerTypes = [
    {
        title: 'Contenus gratuits',
        description:
            'Articles de blog, ressources gratuites, extraits de cours et mini-guides accessibles sans paiement. Ils restent soumis à la propriété intellectuelle d’Explor’Art.',
    },
    {
        title: 'Produits numériques',
        description: 'Mini-formations, programmes, ateliers enregistrés, fiches PDF et autres contenus téléchargeables ou accessibles en ligne après paiement.',
    },
    {
        title: 'Accompagnements individuels ou live',
        description:
            'Sessions en direct, ateliers de groupe ou coaching personnalisé, proposés ponctuellement. Ils font l’objet de conditions spécifiques précisées avant l’achat.',
    },
];

const paymentMeans = [
    'Paiement sécurisé par carte bancaire via un prestataire tiers (ex : Stripe).',
    'Débit immédiat au moment de la commande.',
    'Aucun stockage local des données de carte bancaire sur Explor’Art.',
];

const retractionPoints = [
    'Pour les produits numériques (formations, PDF, contenus téléchargeables) pleinement accessibles dès la commande, le droit de rétractation ne s’applique en principe pas (article L221-28 du Code de la consommation).',
    'Avant l’achat, les informations essentielles (contenu, prérequis, prix, modalités d’accès) sont indiquées sur la page de présentation.',
    'Pour certains accompagnements live, un délai de rétractation peut être proposé au cas par cas et clairement mentionné avant paiement.',
];

const clientObligations = [
    'Fournir des informations exactes lors de la création de compte et de la commande.',
    'Ne pas partager ses identifiants ou contenus premium avec des tiers sans autorisation.',
    'Respecter les règles de l’espace membre et des éventuelles communautés associées (bienveillance, absence de harcèlement, de spam, etc.).',
];

export default function ConditionsGeneralesDeVentePage() {
    return (
        <main className="bg-ivory text-main">
            {/* HERO */}
            <section className="relative overflow-hidden pt-16 pb-14 md:pt-20 md:pb-16">
                <div className="absolute inset-0 bg-linear-to-br from-ivory via-white to-terre/10" />
                <div className="absolute left-0 top-16 h-44 w-44 rounded-full bg-sage/15 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-ocre/15 blur-3xl" />

                <div className="container-page relative grid gap-8 lg:grid-cols-[1.1fr_minmax(0,1fr)] lg:items-center">
                    <div className="space-y-6 max-w-2xl animate-fade-up">
                        <p className="section-label section-label-terre">Conditions générales de vente</p>
                        <h1 className="font-serif-title text-3xl md:text-4xl leading-tight">Le cadre pour acheter sereinement sur Explor’Art.</h1>
                        <p className="text-main/75 text-base md:text-lg max-w-2xl">
                            Ces conditions décrivent le fonctionnement des achats de formations, programmes, ressources numériques et accompagnements proposés sur Explor’Art.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <span className="pill">Transparence des prix</span>
                            <span className="pill pill-alt">Produits numériques</span>
                            <span className="pill">Droit de rétractation encadré</span>
                        </div>
                    </div>

                    <div className="relative animate-fade-up" style={{ animationDelay: '0.08s' }}>
                        <div className="rounded-3xl border border-perl/60 bg-white/80 shadow-lg backdrop-blur-sm p-6 space-y-4 max-w-md ml-auto">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">🧾</span>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-main/55">En résumé</p>
                                    <p className="font-serif-title text-xl">Des ressources créatives, un cadre clair.</p>
                                </div>
                            </div>
                            <p className="text-main/70 text-sm leading-relaxed">
                                Avant chaque achat, tu connais le contenu, le prix, les modalités d’accès et, le cas échéant, les conditions de remboursement ou d’absence de
                                rétractation.
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-sm text-main/80">
                                <div className="rounded-2xl bg-sage/10 border border-sage/30 px-3 py-2">Prix affichés TTC</div>
                                <div className="rounded-2xl bg-ocre/10 border border-ocre/30 px-3 py-2">Paiement sécurisé</div>
                                <div className="rounded-2xl bg-terre/10 border border-terre/30 px-3 py-2">Produits numériques</div>
                                <div className="rounded-2xl bg-perl/20 border border-perl/40 px-3 py-2">Support accessible</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TYPES D’OFFRES */}
            <section className="border-t border-b border-perl/40 bg-background py-12 md:py-16">
                <div className="container-page space-y-10">
                    <div className="max-w-2xl space-y-3">
                        <p className="section-label section-label-sage">1. Champ d’application</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Quelles offres sont concernées ?</h2>
                        <p className="text-main/70">
                            Les présentes conditions générales de vente (CGV) s’appliquent à toutes les commandes passées sur Explor’Art pour des produits numériques et, le cas
                            échéant, des accompagnements payants.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {offerTypes.map((offer, index) => (
                            <div
                                key={offer.title}
                                className="rounded-3xl border border-perl/40 bg-white/85 p-6 shadow-sm animate-fade-up"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <p className="text-xs uppercase tracking-[0.18em] text-main/60">Type d&apos;offre</p>
                                <h3 className="font-serif-title text-xl mt-3">{offer.title}</h3>
                                <p className="text-main/70 text-sm leading-relaxed">{offer.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRIX & PAIEMENT */}
            <section className="py-12 md:py-16">
                <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_minmax(0,1fr)] lg:items-start">
                    <div className="space-y-6 animate-fade-up">
                        <p className="section-label section-label-ocre">2. Prix & paiement</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Des tarifs affichés clairement</h2>
                        <p className="text-main/70 max-w-3xl">
                            Les prix sont indiqués en euros, toutes taxes comprises (TTC), sauf mention contraire. Explor’Art se réserve le droit de modifier les tarifs à tout
                            moment, mais la prestation est facturée sur la base du prix en vigueur au moment de la validation de la commande.
                        </p>

                        <div className="rounded-2xl border border-perl/40 bg-white/75 p-5 space-y-3 text-sm text-main/80">
                            <p className="font-semibold">Moyens de paiement</p>
                            <ul className="space-y-1 list-disc list-inside">
                                {paymentMeans.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <aside className="relative animate-fade-up" style={{ animationDelay: '0.1s' }}>
                        <div className="rounded-3xl border border-perl/50 bg-linear-to-br from-white via-ivory to-terre/10 p-6 shadow-md space-y-4 text-sm text-main/80">
                            <p className="text-xs uppercase tracking-[0.22em] text-main/55">Facturation</p>
                            <p>Une facture ou un reçu de paiement peut être envoyé par e-mail ou mis à disposition dans l’espace membre, lorsqu’il existe.</p>
                            <p>En cas de refus de paiement par l’organisme bancaire, la commande est automatiquement annulée et l’accès au contenu n’est pas ouvert.</p>
                        </div>
                    </aside>
                </div>
            </section>

            {/* ACCÈS AUX CONTENUS */}
            <section className="border-t border-b border-perl/40 bg-background py-12 md:py-16">
                <div className="container-page space-y-8">
                    <div className="max-w-2xl space-y-3">
                        <p className="section-label section-label-sage">3. Accès aux contenus</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Quand et comment tu accèdes à ta formation</h2>
                        <p className="text-main/70">
                            Après validation du paiement, l’accès aux contenus numériques est en général ouvert immédiatement ou dans un délai précisé sur la page de présentation
                            (ex : début de session à une date donnée).
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-perl/40 bg-white/80 p-5 text-sm text-main/80 space-y-2">
                            <p className="font-semibold">Compte utilisateur</p>
                            <p>
                                Certains contenus nécessitent la création d’un compte Explor’Art. Tu es responsable de la confidentialité de tes identifiants et de l’usage qui en
                                est fait.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-perl/40 bg-white/80 p-5 text-sm text-main/80 space-y-2">
                            <p className="font-semibold">Évolutions & mises à jour</p>
                            <p>
                                Explor’Art peut mettre à jour les contenus (ajouts, compléments, corrections). Dans la mesure du possible, ces améliorations restent accessibles
                                sans surcoût aux personnes ayant déjà acheté le programme concerné.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* RÉTRACTATION & REMBOURSEMENTS */}
            <section className="py-12 md:py-16">
                <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_minmax(0,1fr)] lg:items-start">
                    <div className="space-y-6 animate-fade-up">
                        <p className="section-label section-label-terre">4. Rétractation & remboursements</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Ce qu’il faut savoir avant de valider ta commande</h2>
                        <p className="text-main/70 max-w-3xl">
                            Les règles de rétractation sont différentes selon qu’il s’agit de contenus numériques immédiatement accessibles ou d’accompagnements live. Explor’Art
                            s’engage à les expliquer clairement avant paiement.
                        </p>

                        <div className="space-y-3 rounded-2xl border border-perl/40 bg-white/75 p-5 text-sm text-main/80">
                            <p className="font-semibold">Produits numériques</p>
                            <ul className="space-y-1 list-disc list-inside">
                                {retractionPoints.map((p) => (
                                    <li key={p}>{p}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-sage/30 bg-sage/10 p-4 text-sm text-main/80">
                            Pour toute demande de remboursement ou de précision, tu peux écrire à{' '}
                            <a className="underline" href="mailto:support@explorart.fr">
                                support@explorart.fr
                            </a>
                            . Les conditions spécifiques à chaque offre (garantie, délai, modalités) sont rappelées sur la page de vente.
                        </div>
                    </div>

                    <aside className="relative animate-fade-up" style={{ animationDelay: '0.1s' }}>
                        <div className="rounded-3xl border border-perl/50 bg-linear-to-br from-white via-ivory to-ocre/10 p-6 shadow-md space-y-4 text-sm text-main/80">
                            <p className="text-xs uppercase tracking-[0.22em] text-main/55">Annulations & cas particuliers</p>
                            <p>
                                En cas d’annulation d’un accompagnement live du fait d’Explor’Art, un report ou un remboursement pourra être proposé. Les modalités exactes sont
                                précisées avant l’inscription.
                            </p>
                            <p>
                                En cas de circonstances exceptionnelles (maladie grave, difficultés techniques prolongées), Explor’Art étudiera les demandes au cas par cas, dans un
                                esprit humain et raisonnable.
                            </p>
                        </div>
                    </aside>
                </div>
            </section>

            {/* PROPRIÉTÉ, OBLIGATIONS, DROIT APPLICABLE */}
            <section className="border-t border-perl/40 bg-background py-12 md:py-16">
                <div className="container-page space-y-8">
                    <div className="space-y-3 max-w-2xl">
                        <p className="section-label section-label-sage">5. Propriété intellectuelle & usage</p>
                        <p className="text-main/70">
                            Sauf mention contraire explicite, les contenus achetés sont destinés à un usage strictement personnel. Toute reproduction, diffusion ou revente non
                            autorisée est interdite.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-2xl border border-perl/40 bg-white/80 p-5 text-sm text-main/80 space-y-2">
                            <p className="font-semibold">Obligations du client</p>
                            <ul className="space-y-1 list-disc list-inside">
                                {clientObligations.map((o) => (
                                    <li key={o}>{o}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-perl/40 bg-white/80 p-5 text-sm text-main/80 space-y-2">
                            <p className="font-semibold">Responsabilité & droit applicable</p>
                            <p>
                                Explor’Art met tout en œuvre pour fournir des contenus de qualité, mais ne garantit pas de résultats artistiques ou professionnels spécifiques. Les
                                CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée en priorité.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="border-t border-perl/40 bg-background py-10 md:py-12">
                <div className="container-page space-y-6">
                    <div className="space-y-2 max-w-2xl">
                        <p className="section-label section-label-sage">Autres pages légales Explor’Art</p>
                        <p className="text-main/70 text-sm">
                            Pour comprendre l’ensemble du cadre (données personnelles, cookies, espace membre, remboursements), tu peux consulter ces autres pages légales.
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

            {/* FOOTER INFO */}
            <section className="bg-main text-ivory py-14 md:py-16">
                <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2 max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.2em] text-ivory/70">Mises à jour</p>
                        <h3 className="font-serif-title text-2xl">Une base claire, amenée à évoluer</h3>
                        <p className="text-ivory/80">
                            Ces conditions générales de vente peuvent être ajustées lorsque de nouvelles offres ou fonctionnalités apparaissent. La version en ligne au moment de ta
                            commande est celle qui s’applique.
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
