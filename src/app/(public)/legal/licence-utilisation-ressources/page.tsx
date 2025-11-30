// src/app/(public)/legal/licence-utilisation-ressources/page.tsx

const allowed = [
    'Utilisation des ressources pour ta pratique personnelle (dessin, peinture, réflexion créative).',
    'Impression des PDF pour ton usage individuel.',
    'Prise de notes, annotations, surlignages sur les supports téléchargés.',
];

const forbidden = [
    'Revendre les ressources, même modifiées, sur une plateforme tierce ou en direct.',
    'Partager massivement les PDF, accès privés ou contenus complets avec des personnes qui n’ont pas acheté la ressource.',
    'Publier intégralement une formation, un module ou un PDF sur Internet (blog, YouTube, réseaux sociaux…).',
];

export default function LicenceRessourcesPage() {
    return (
        <main className="bg-ivory text-main">
            <section className="relative overflow-hidden pt-16 pb-14 md:pt-20 md:pb-16">
                <div className="absolute inset-0 bg-linear-to-br from-ivory via-white to-sage/10" />
                <div className="absolute left-10 top-10 h-44 w-44 rounded-full bg-ocre/10 blur-3xl" />

                <div className="container-page relative grid gap-8 lg:grid-cols-[1.1fr_minmax(0,1fr)] lg:items-center">
                    <div className="space-y-6 max-w-2xl animate-fade-up">
                        <p className="section-label section-label-sage">Licence d’utilisation des ressources</p>
                        <h1 className="font-serif-title text-3xl md:text-4xl leading-tight">Ce que tu peux faire (ou pas) avec les PDF, cours et supports Explor’Art.</h1>
                        <p className="text-main/75 text-base md:text-lg max-w-2xl">
                            L’idée : t’offrir un cadre simple pour profiter pleinement des contenus, tout en respectant le travail créatif derrière chaque ressource.
                        </p>
                    </div>

                    <div className="relative animate-fade-up" style={{ animationDelay: '0.08s' }}>
                        <div className="rounded-3xl border border-perl/60 bg-white/85 shadow-lg backdrop-blur-sm p-6 space-y-4 max-w-md ml-auto">
                            <p className="text-xs uppercase tracking-[0.2em] text-main/55">En résumé</p>
                            <p className="text-sm text-main/75">
                                Les ressources sont destinées à un usage personnel. Tu peux t’en servir pour ta pratique artistique, mais pas pour les revendre ou les diffuser
                                massivement.
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-sm text-main/80">
                                <div className="rounded-2xl bg-sage/10 border border-sage/30 px-3 py-2">Usage personnel</div>
                                <div className="rounded-2xl bg-ocre/10 border border-ocre/30 px-3 py-2">Partage limité</div>
                                <div className="rounded-2xl bg-terre/10 border border-terre/30 px-3 py-2">Pas de revente</div>
                                <div className="rounded-2xl bg-perl/20 border border-perl/40 px-3 py-2">Respect de l’auteur</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-b border-perl/40 bg-background py-12 md:py-16">
                <div className="container-page grid gap-10 lg:grid-cols-2">
                    <div className="space-y-4">
                        <p className="section-label section-label-sage">1. Utilisation autorisée</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Ce que tu peux faire librement</h2>
                        <p className="text-main/70">
                            Quand tu achètes une ressource ou accèdes à un support premium, tu obtiens un droit d’usage personnel, non exclusif, non transférable.
                        </p>

                        <div className="rounded-2xl border border-perl/40 bg-white/80 p-5 text-sm text-main/80">
                            <ul className="space-y-1.5 list-disc list-inside">
                                {allowed.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="section-label section-label-ocre">2. Utilisation interdite sans accord</p>
                        <h2 className="font-serif-title text-2xl md:text-3xl">Ce qui nécessite une autorisation écrite</h2>
                        <p className="text-main/70">Pour protéger le travail réalisé, certaines utilisations sont interdites ou soumises à autorisation explicite d’Explor’Art.</p>

                        <div className="rounded-2xl border border-perl/40 bg-white/80 p-5 text-sm text-main/80">
                            <ul className="space-y-1.5 list-disc list-inside">
                                {forbidden.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container-page space-y-8">
                    <div className="space-y-3 max-w-2xl">
                        <p className="section-label section-label-terre">3. Partage raisonnable</p>
                        <p className="text-main/70">
                            Tu peux évidemment parler d’Explor’Art autour de toi, partager un lien vers une page, une capture d’écran partielle ou un court extrait, à condition de
                            citer la source et de ne pas dévoiler l’intégralité du contenu payant.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-sage/30 bg-sage/10 p-5 text-sm text-main/80">
                        Une question sur un usage spécifique (atelier, classe, école, collectif créatif) ? Écris à{' '}
                        <a className="underline" href="mailto:legal@explorart.fr">
                            legal@explorart.fr
                        </a>{' '}
                        pour qu’on trouve ensemble un cadre adapté.
                    </div>
                </div>
            </section>

            <section className="bg-main text-ivory py-14 md:py-16">
                <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2 max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.2em] text-ivory/70">Esprit de la licence</p>
                        <h3 className="font-serif-title text-2xl">Protéger le travail, encourager le partage juste</h3>
                        <p className="text-ivory/80">
                            L’objectif n’est pas de te limiter, mais de préserver le cadre pour continuer à proposer des contenus exigeants, accessibles et créatifs.
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
