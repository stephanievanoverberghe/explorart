'use client';

export function FormationsHero() {
    return (
        <header className="relative overflow-hidden rounded-4xl border border-perl/70 bg-linear-to-r from-[color-mix(in_oklab,var(--color-sage)_78%,#0b1d16_22%)] via-[color-mix(in_oklab,var(--color-vert)_80%,#0d2c21_20%)] to-[color-mix(in_oklab,var(--color-bleu)_78%,#0f2134_22%)] px-6 py-8 text-ivory shadow-lg shadow-main/10 md:px-10 md:py-12">
            <div className="pointer-events-none absolute inset-0 opacity-50 mix-blend-soft-light bg-[radial-gradient(circle_at_14%_20%,rgba(255,255,255,0.32),transparent_48%),radial-gradient(circle_at_86%_78%,rgba(27,52,101,0.35),transparent_48%)]" />
            <div className="pointer-events-none absolute inset-3 rounded-[2.3rem] border border-ivory/15" />

            <div className="relative grid items-start gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
                <div className="space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-ivory/15 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-ivory/90">
                        <span className="h-1.5 w-1.5 rounded-full bg-ivory" />
                        <span>Formations Explor&apos;Art</span>
                    </div>

                    <div className="space-y-3">
                        <h1 className="font-serif-title text-3xl leading-tight sm:text-4xl md:text-5xl">
                            Les grandes formations qui changent
                            <br />
                            <span className="text-ivory/85">ta manière de voir, de sentir et de créer.</span>
                        </h1>
                        <p className="max-w-2xl text-sm text-ivory/90 sm:text-base">
                            Ici, on est au-dessus d’un simple cours. Chaque formation est un voyage complet avec 6 à 10 modules, des sous-modules, une introduction et une
                            conclusion qui t’accompagnent en profondeur, à ton rythme.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[0.82rem] text-ivory/90">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">Corps, regard, lumière & émotion réunis</span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">Format premium · accès long terme</span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">Pédagogie douce, sensible, structurée</span>
                    </div>
                </div>

                <aside className="relative grid gap-3 rounded-3xl border border-ivory/25 bg-black/18 p-5 text-[0.85rem] text-ivory/92 shadow-inner shadow-black/20 backdrop-blur-sm md:p-6">
                    <p className="text-[0.78rem] uppercase tracking-[0.16em] text-ivory/70">Comment lire cette page</p>
                    <p>
                        Les formations sont pensées comme des <strong>grands parcours</strong> : plusieurs modules, des sous-parties, des bonus et une vraie promesse de
                        transformation.
                    </p>
                    <p>
                        Commence par explorer les <strong>titres</strong> et la <strong>promesse</strong>, puis plonge dans le programme détaillé pour sentir si c’est le bon moment
                        pour toi.
                    </p>
                    <p className="text-ivory/80">
                        Si tu débutes complètement, la formation “Apprendre à dessiner – Méthode Somato-Graphique” sera souvent ton meilleur point d’entrée.
                    </p>
                </aside>
            </div>
        </header>
    );
}
