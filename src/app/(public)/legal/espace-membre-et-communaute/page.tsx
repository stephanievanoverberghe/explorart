// src/app/(public)/legal/espace-membre-et-communaute/page.tsx

const memberRules = [
    'Choisir un pseudonyme et une photo de profil qui ne portent pas atteinte à autrui.',
    'Ne pas partager tes identifiants ou accès à ton tableau de bord avec d’autres personnes.',
    'Respecter les autres membres dans les commentaires et échanges éventuels.',
];

const moderationRules = [
    'Suppression de contenus insultants, discriminants, haineux ou harcelants.',
    'Suppression de liens vers des sites douteux, du spam ou de la publicité non sollicitée.',
    'Blocage ou suspension d’un compte en cas d’abus répétés ou de non-respect des règles.',
];

export default function EspaceMembreEtCommunautePage() {
    return (
        <main className="bg-ivory text-main">
            <section className="relative overflow-hidden pt-16 pb-14 md:pt-20 md:pb-16">
                <div className="absolute inset-0 bg-linear-to-br from-ivory via-white to-sage/10" />
                <div className="absolute right-10 top-8 h-44 w-44 rounded-full bg-terre/15 blur-3xl" />

                <div className="container-page relative grid gap-8 lg:grid-cols-[1.1fr_minmax(0,1fr)] lg:items-center">
                    <div className="space-y-6 max-w-2xl animate-fade-up">
                        <p className="section-label section-label-sage">Espace membre & communauté</p>
                        <h1 className="font-serif-title text-3xl md:text-4xl leading-tight">Les règles pour que ton atelier numérique reste doux et sécurisé.</h1>
                        <p className="text-main/75 text-base md:text-lg max-w-2xl">
                            Cette page te présente le cadre d’utilisation du tableau de bord, des favoris, des commentaires et des échanges entre membres, lorsqu’ils existent.
                        </p>
                    </div>

                    <div className="relative animate-fade-up" style={{ animationDelay: '0.08s' }}>
                        <div className="rounded-3xl border border-perl/60 bg-white/85 shadow-lg backdrop-blur-sm p-6 space-y-4 max-w-md ml-auto">
                            <p className="text-xs uppercase tracking-[0.2em] text-main/55">Intention</p>
                            <p className="text-sm text-main/75">
                                Explor’Art se veut un espace de pratique bienveillant. Les règles visent à protéger les utilisateurs, les contenus et la qualité des échanges.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-b border-perl/40 bg-background py-12 md:py-16">
                <div className="container-page grid gap-10 lg:grid-cols-2">
                    <div className="space-y-4">
                        <p className="section-label section-label-sage">1. Création et gestion de compte</p>
                        <p className="text-main/70">
                            La création d’un compte peut être nécessaire pour accéder au tableau de bord, suivre ta progression ou consulter certains contenus.
                        </p>
                        <div className="rounded-2xl border border-perl/40 bg-white/80 p-5 text-sm text-main/80">
                            <ul className="space-y-1.5 list-disc list-inside">
                                {memberRules.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="section-label section-label-ocre">2. Sécurité & confidentialité</p>
                        <p className="text-main/70">
                            Explor’Art met en place des mesures techniques pour sécuriser les comptes, mais tu restes acteur·rice de ta propre sécurité (mot de passe, appareil
                            utilisé…).
                        </p>
                        <div className="rounded-2xl border border-perl/40 bg-white/80 p-5 text-sm text-main/80">
                            <ul className="space-y-1.5 list-disc list-inside">
                                <li>Utilise un mot de passe solide et unique.</li>
                                <li>Déconnecte-toi sur les appareils partagés ou publics.</li>
                                <li>Préviens-nous si tu suspectes un accès non autorisé.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_minmax(0,1fr)] lg:items-start">
                    <div className="space-y-6">
                        <p className="section-label section-label-terre">3. Commentaires & contributions</p>
                        <p className="text-main/70 max-w-3xl">
                            Si des zones de commentaires ou d’expression t sont proposées (sous les articles ou dans l’espace membre), tu t’engages à rester respectueux·se et
                            constructif·ve.
                        </p>
                        <div className="rounded-2xl border border-perl/40 bg-white/80 p-5 text-sm text-main/80 space-y-2">
                            <p className="font-semibold">Modération</p>
                            <ul className="space-y-1.5 list-disc list-inside">
                                {moderationRules.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <aside className="relative animate-fade-up" style={{ animationDelay: '0.1s' }}>
                        <div className="rounded-3xl border border-perl/50 bg-linear-to-br from-white via-ivory to-sage/10 p-6 shadow-md space-y-4 text-sm text-main/80">
                            <p className="text-xs uppercase tracking-[0.22em] text-main/55">Signaler un comportement</p>
                            <p>
                                Tu peux signaler un commentaire ou une attitude problématique en écrivant à{' '}
                                <a className="underline" href="mailto:legal@explorart.fr">
                                    legal@explorart.fr
                                </a>{' '}
                                (screenshot bienvenu). Nous examinerons la situation dans les meilleurs délais.
                            </p>
                        </div>
                    </aside>
                </div>
            </section>

            <section className="bg-main text-ivory py-14 md:py-16">
                <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2 max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.2em] text-ivory/70">Un atelier partagé</p>
                        <h3 className="font-serif-title text-2xl">Créer, oui. Blesser, non.</h3>
                        <p className="text-ivory/80">
                            L’espace membre est construit pour soutenir ta pratique, pas pour générer du conflit. Ces règles peuvent évoluer, mais l’esprit restera le même :
                            douceur, curiosité, respect.
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
