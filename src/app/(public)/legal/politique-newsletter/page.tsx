// src/app/(public)/legal/politique-newsletter/page.tsx

const newsletterContent = [
    'Des inspirations autour du dessin, de la peinture et de la psychologie de la création.',
    'Des conseils pratiques, méthodologies, exercices et ressources gratuites.',
    'Des informations sur les nouvelles formations, ateliers, mises à jour du site.',
];

const unsubscribePoints = [
    'Un lien de désinscription figure en bas de chaque e-mail.',
    'La désinscription est immédiate ou quasi-immédiate (selon le temps de traitement technique).',
    'Tu peux aussi nous écrire pour demander une suppression manuelle de ton adresse.',
];

export default function PolitiqueNewsletterPage() {
    return (
        <main className="bg-ivory text-main">
            <section className="relative overflow-hidden pt-16 pb-14 md:pt-20 md:pb-16">
                <div className="absolute inset-0 bg-linear-to-br from-ivory via-white to-rose/10" />
                <div className="absolute -right-10 top-8 h-44 w-44 rounded-full bg-sage/15 blur-3xl" />

                <div className="container-page relative grid gap-8 lg:grid-cols-[1.1fr_minmax(0,1fr)] lg:items-center">
                    <div className="space-y-6 max-w-2xl animate-fade-up">
                        <p className="section-label section-label-rose">Politique newsletter & e-mails</p>
                        <h1 className="font-serif-title text-3xl md:text-4xl leading-tight">Ce que tu reçois (et ne recevras jamais) dans ta boîte mail.</h1>
                        <p className="text-main/75 text-base md:text-lg max-w-2xl">
                            Cette page décrit comment ton e-mail est utilisé pour t’envoyer des nouvelles d’Explor’Art : type de contenu, fréquence, désinscription.
                        </p>
                    </div>

                    <div className="relative animate-fade-up" style={{ animationDelay: '0.08s' }}>
                        <div className="rounded-3xl border border-perl/60 bg-white/85 shadow-lg backdrop-blur-sm p-6 space-y-4 max-w-md ml-auto">
                            <p className="text-xs uppercase tracking-[0.2em] text-main/55">En résumé</p>
                            <p className="text-sm text-main/75">
                                Pas de spam, pas de revente de ton e-mail. Seulement des contenus liés à Explor’Art, à tes commandes, ou à ce que tu as explicitement accepté de
                                recevoir.
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-sm text-main/80">
                                <div className="rounded-2xl bg-sage/10 border border-sage/30 px-3 py-2">Double opt-in possible</div>
                                <div className="rounded-2xl bg-ocre/10 border border-ocre/30 px-3 py-2">Désinscription en 1 clic</div>
                                <div className="rounded-2xl bg-terre/10 border border-terre/30 px-3 py-2">Pas de spam</div>
                                <div className="rounded-2xl bg-perl/20 border border-perl/40 px-3 py-2">Pas de revente</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-b border-perl/40 bg-background py-12 md:py-16">
                <div className="container-page grid gap-10 lg:grid-cols-2">
                    <div className="space-y-4">
                        <p className="section-label section-label-sage">1. Quand recevras-tu des e-mails ?</p>
                        <p className="text-main/70">
                            Tu peux recevoir des e-mails de notre part dans trois grands cas : inscription à la newsletter, création de compte / commande, téléchargement d’une
                            ressource gratuite.
                        </p>
                        <div className="rounded-2xl border border-perl/40 bg-white/80 p-5 text-sm text-main/80 space-y-1.5">
                            <ul className="space-y-1 list-disc list-inside">
                                <li>Newsletter Explor’Art (si tu t’inscris volontairement).</li>
                                <li>Confirmation de commande, facture, informations pratiques liées à un achat.</li>
                                <li>E-mails de suivi après téléchargement d’une ressource gratuite (guide, PDF), si tu as accepté de les recevoir.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="section-label section-label-ocre">2. Contenu des newsletters</p>
                        <p className="text-main/70">
                            Les newsletters comprennent un mélange d’inspiration, de pédagogie et d’actualités. Elles restent en lien avec l’univers d’Explor’Art.
                        </p>
                        <div className="rounded-2xl border border-perl/40 bg-white/80 p-5 text-sm text-main/80">
                            <ul className="space-y-1.5 list-disc list-inside">
                                {newsletterContent.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_minmax(0,1fr)] lg:items-start">
                    <div className="space-y-6">
                        <p className="section-label section-label-terre">3. Désinscription & gestion des préférences</p>
                        <p className="text-main/70 max-w-3xl">
                            Tu peux arrêter les e-mails non essentiels (newsletter, inspirations, infos marketing) à tout moment, sans justification.
                        </p>

                        <div className="rounded-2xl border border-perl/40 bg-white/80 p-5 text-sm text-main/80">
                            <ul className="space-y-1.5 list-disc list-inside">
                                {unsubscribePoints.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <aside className="relative animate-fade-up" style={{ animationDelay: '0.1s' }}>
                        <div className="rounded-3xl border border-perl/50 bg-linear-to-br from-white via-ivory to-sage/10 p-6 shadow-md space-y-4 text-sm text-main/80">
                            <p className="text-xs uppercase tracking-[0.22em] text-main/55">Besoin d’aide ?</p>
                            <p>
                                Si tu rencontres un souci avec un lien de désinscription, écris à{' '}
                                <a className="underline" href="mailto:privacy@explorart.fr">
                                    privacy@explorart.fr
                                </a>{' '}
                                avec l’adresse e-mail à retirer. Nous ferons le nécessaire dans les meilleurs délais.
                            </p>
                        </div>
                    </aside>
                </div>
            </section>

            <section className="bg-main text-ivory py-14 md:py-16">
                <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2 max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.2em] text-ivory/70">Lien avec le RGPD</p>
                        <h3 className="font-serif-title text-2xl">Des e-mails cohérents avec la politique de confidentialité</h3>
                        <p className="text-ivory/80">
                            Cette page complète la politique de confidentialité, qui détaille la base légale, les durées de conservation et tes droits d’accès, de rectification et
                            de suppression.
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
