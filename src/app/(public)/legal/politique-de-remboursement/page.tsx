// src/app/(public)/legal/politique-de-remboursement/page.tsx

const refundScenarios = [
    {
        title: 'Erreur de commande',
        description: 'Si tu t’es trompé·e de produit (ex : mauvaise formation) et que tu n’as pas encore commencé le contenu, contacte-nous rapidement pour trouver une solution.',
    },
    {
        title: 'Contenu non conforme',
        description: 'Si le contenu livré est manifestement différent de ce qui était annoncé sur la page de présentation, nous étudierons ta demande de remboursement.',
    },
    {
        title: 'Problème technique persistant',
        description:
            'En cas de problème technique empêchant durablement l’accès au contenu (malgré nos tentatives de résolution), un remboursement partiel ou total pourra être envisagé.',
    },
];

export default function PolitiqueDeRemboursementPage() {
    return (
        <main className="bg-ivory text-main">
            <section className="relative overflow-hidden pt-16 pb-14 md:pt-20 md:pb-16">
                <div className="absolute inset-0 bg-linear-to-br from-ivory via-white to-rose/10" />
                <div className="absolute right-10 top-10 h-44 w-44 rounded-full bg-sage/15 blur-3xl" />

                <div className="container-page relative grid gap-8 lg:grid-cols-[1.2fr_minmax(0,1fr)] lg:items-center">
                    <div className="space-y-6 max-w-2xl animate-fade-up">
                        <p className="section-label section-label-rose">Politique de remboursement</p>
                        <h1 className="font-serif-title text-3xl md:text-4xl leading-tight">Ce qu’on peut faire si tu changes d’avis ou si quelque chose coince.</h1>
                        <p className="text-main/75 text-base md:text-lg max-w-2xl">
                            Cette page complète les Conditions Générales de Vente et détaille notre approche concernant les remboursements, annulations et situations particulières.
                        </p>
                    </div>

                    <div className="relative animate-fade-up" style={{ animationDelay: '0.08s' }}>
                        <div className="rounded-3xl border border-perl/60 bg-white/85 shadow-lg backdrop-blur-sm p-6 space-y-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-main/55">Important</p>
                            <p className="text-sm text-main/75">
                                Pour les produits numériques accessibles immédiatement après paiement, le droit de rétractation ne s’applique généralement pas. Cependant, nous
                                restons à l’écoute des situations particulières et cherchons des solutions humaines.
                            </p>
                            <div className="rounded-2xl bg-rose/10 border border-rose/30 px-4 py-3 text-xs text-main/80">
                                Les conditions spécifiques à chaque formation (garantie, délai, modalités) sont rappelées sur la page de vente. Pense à les lire avant de valider.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-b border-perl/40 bg-background py-12 md:py-16">
                <div className="container-page space-y-8">
                    <div className="space-y-3 max-w-2xl">
                        <p className="section-label section-label-sage">1. Produits numériques</p>
                        <p className="text-main/70">
                            En validant ta commande pour une formation ou ressource numérique accessible immédiatement, tu acceptes que le contenu soit délivré sans délai.
                            Conformément à la réglementation, cela peut entraîner la perte du droit de rétractation classique.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {refundScenarios.map((item, index) => (
                            <div
                                key={item.title}
                                className="rounded-3xl border border-perl/40 bg-white/85 p-6 shadow-sm animate-fade-up"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <p className="text-xs uppercase tracking-[0.18em] text-main/60">Cas possible</p>
                                <h3 className="font-serif-title text-xl mt-2">{item.title}</h3>
                                <p className="text-main/70 text-sm leading-relaxed mt-1">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_minmax(0,1fr)] lg:items-start">
                    <div className="space-y-6 animate-fade-up">
                        <p className="section-label section-label-ocre">2. Accompagnements live & ateliers</p>
                        <p className="text-main/70 max-w-3xl">
                            Pour les ateliers en direct ou accompagnements personnalisés, des conditions spécifiques (délai d’annulation, report, remboursement partiel) sont
                            indiquées sur la page de la prestation concernée.
                        </p>
                        <div className="rounded-2xl border border-perl/40 bg-white/75 p-5 text-sm text-main/80 space-y-2">
                            <p className="font-semibold">En général :</p>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>Un délai minimum est demandé pour annuler ou reporter une séance.</li>
                                <li>En cas d’annulation du fait d’Explor’Art, une solution de report ou de remboursement est proposée.</li>
                                <li>Les conditions exactes sont toujours précisées avant l’inscription.</li>
                            </ul>
                        </div>
                    </div>

                    <aside className="relative animate-fade-up" style={{ animationDelay: '0.1s' }}>
                        <div className="rounded-3xl border border-perl/50 bg-linear-to-br from-white via-ivory to-rose/10 p-6 shadow-md space-y-4 text-sm text-main/80">
                            <p className="text-xs uppercase tracking-[0.22em] text-main/55">Comment faire une demande ?</p>
                            <p>
                                Tu peux écrire à{' '}
                                <a className="underline" href="mailto:support@explorart.fr">
                                    support@explorart.fr
                                </a>{' '}
                                en indiquant :
                            </p>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>Ton nom et l’e-mail utilisé pour la commande.</li>
                                <li>Le nom de la formation ou de la ressource concernée.</li>
                                <li>Une brève description de la situation.</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </section>

            <section className="bg-main text-ivory py-14 md:py-16">
                <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2 max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.2em] text-ivory/70">Esprit général</p>
                        <h3 className="font-serif-title text-2xl">Du cadre, mais aussi du bon sens</h3>
                        <p className="text-ivory/80">
                            Cette politique vise à protéger à la fois ton expérience et le temps de travail investi dans chaque formation. Les échanges se font dans un esprit de
                            dialogue, de respect et de recherche de solution.
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
