// src/components/formations/FormationDetail.tsx
import Link from 'next/link';
import Image from 'next/image';

import type { Formation, FormationModule } from '@/lib/content/formations';
import { pillarConfig } from '@/components/categories/category-data';

type FormationDetailProps = {
    formation: Formation;
    levelLabel: string;
    priceLabel: string;
};

export function FormationDetail({ formation, levelLabel, priceLabel }: FormationDetailProps) {
    return (
        <section className="relative bg-linear-to-b from-ivory via-white to-ivory pt-4 pb-24 md:pt-24 md:pb-32">
            <div className="container-page space-y-10 md:space-y-12">
                <FormationHero formation={formation} levelLabel={levelLabel} priceLabel={priceLabel} />

                <main className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1.05fr)]">
                    <div className="space-y-8">
                        <FormationExperience formation={formation} />
                        <FormationAudience formation={formation} />
                        <FormationProgramme formation={formation} />
                        <FormationBonuses formation={formation} />
                        <FormationAfter formation={formation} />
                    </div>

                    <FormationAside formation={formation} priceLabel={priceLabel} levelLabel={levelLabel} />
                </main>
            </div>
        </section>
    );
}

/* ---------- HERO ---------- */

type HeroProps = {
    formation: Formation;
    levelLabel: string;
    priceLabel: string;
};

function FormationHero({ formation, levelLabel, priceLabel }: HeroProps) {
    const pillar = pillarConfig[formation.pillarSlug];

    return (
        <header
            className={[
                'relative overflow-hidden rounded-3xl px-5 py-7 md:px-8 md:py-8 shadow-lg border border-perl/60 text-ivory',
                pillar?.colorClasses?.bg?.replace('bg-', 'bg-linear-to-r from-') ||
                    'bg-linear-to-r from-prune via-prune to-[color-mix(in_oklab,var(--color-prune)_80%,#f9f5ef_20%)]',
            ].join(' ')}
        >
            <div className="pointer-events-none absolute inset-0 opacity-45 mix-blend-soft-light bg-[radial-gradient(circle_at_12%_18%,rgba(240,245,240,0.85),transparent_55%),radial-gradient(circle_at_88%_88%,rgba(60,110,90,0.55),transparent_55%)]" />
            <div className="pointer-events-none absolute inset-5 rounded-[1.75rem] border border-ivory/15" />

            <div className="relative mx-auto flex max-w-6xl flex-col gap-7 lg:flex-row lg:items-stretch lg:gap-8">
                <div className="flex-1 space-y-5">
                    <nav className="text-[0.75rem] md:text-sm text-ivory/85" aria-label="Fil d’Ariane">
                        <ol className="flex flex-wrap items-center gap-1.5">
                            <li>
                                <Link href="/" className="hover:text-white">
                                    Accueil
                                </Link>
                            </li>
                            <li>·</li>
                            <li>
                                <Link href="/formations" className="hover:text-white">
                                    Formations
                                </Link>
                            </li>
                            <li>·</li>
                            <li className="inline-flex items-center gap-1 text-ivory">
                                <span className={`h-1.5 w-1.5 rounded-full ${pillar.dotClass}`} />
                                <span className="truncate max-w-48 sm:max-w-xs">{formation.title}</span>
                            </li>
                        </ol>
                    </nav>

                    <div className="inline-flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-ivory/90">
                        <span className="h-1.5 w-1.5 rounded-full bg-ivory" />
                        <span>Formation premium Explor&apos;Art</span>
                        <span className="mx-1 h-px w-6 bg-ivory/60" />
                        <span>{pillar.title}</span>
                        <span className="mx-1 h-px w-6 bg-ivory/60" />
                        <span>{levelLabel}</span>
                    </div>

                    <div className="space-y-3">
                        <h1 className="font-serif-title text-2xl sm:text-3xl md:text-4xl leading-tight text-ivory">{formation.title}</h1>
                        <p className="max-w-2xl text-sm md:text-base text-ivory/90">{formation.tagline}</p>
                    </div>

                    <ul className="text-sm text-ivory/92 space-y-1.5">
                        <li>• Un grand parcours structuré en {formation.modulesCount} modules, avec sous-modules, intro, conclusion et bonus.</li>
                        <li>• Un format pensé pour une transformation profonde de ta pratique, pas juste un “cours en plus”.</li>
                        <li>• Une pédagogie douce et claire, alignée avec tout l’univers Explor’Art.</li>
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-2 text-[0.8rem] text-ivory/90">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1">⏱ ≈ {formation.approximateHours} h de contenu guidé</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1">{formation.modulesCount} modules · intro · conclusion</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1">Niveau {levelLabel.toLowerCase()}</span>
                    </div>
                </div>

                <aside className="relative w-full max-w-md lg:w-[360px]">
                    <div className="relative h-full overflow-hidden rounded-3xl border border-ivory/25 bg-black/20 shadow-md backdrop-blur-sm">
                        <div className="grid h-full grid-rows-[minmax(0,1.2fr)_auto]">
                            <div className="relative border-b border-ivory/20">
                                <div className="relative aspect-4/3 w-full">
                                    <Image src={formation.coverImage} alt={formation.title} fill className="object-cover scale-[1.03]" />
                                    <div className="pointer-events-none absolute inset-0 bg-black/35 mix-blend-multiply" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />
                                    <div className="absolute left-4 right-4 bottom-3 flex items-center justify-between text-[0.78rem] text-ivory/90">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1">{pillar.title}</span>
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1">{formation.modulesCount} modules</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 p-4 sm:p-5">
                                <div className="flex items-baseline gap-2">
                                    <p className="text-xl font-semibold text-ivory">{priceLabel}</p>
                                    <p className="text-[0.8rem] text-ivory/80">Pour une formation complète, rejouable, structurée en modules.</p>
                                </div>
                                <p className="text-[0.82rem] text-ivory/90">
                                    Les inscriptions ouvriront bientôt. Tu pourras suivre le parcours à ton rythme, en vivant chaque module comme un vrai rendez-vous avec ta
                                    créativité.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ivory px-4 py-2 text-sm font-medium text-main shadow-sm hover:bg-ivory/95"
                                >
                                    Être prévenu·e de l’ouverture
                                    <span>↗</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </header>
    );
}

/* ---------- CONTENU PRINCIPAL ---------- */

function FormationExperience({ formation }: { formation: Formation }) {
    return (
        <section className="card space-y-5 border-main/20 bg-white/95">
            <div className="space-y-1">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/70">Ce que tu vas vivre</p>
                <h2 className="font-serif-title text-lg md:text-xl">Une formation qui change ta manière d’apprendre, pas seulement tes dessins</h2>
            </div>

            <p className="text-sm md:text-base text-main/75 max-w-2xl">{formation.shortPitch}</p>

            <div className="grid gap-4 md:grid-cols-2">
                <BulletBlock
                    title="Une structure profonde mais claire"
                    bullets={[
                        'Une intro pour poser le cadre, tes intentions et tes repères.',
                        `${formation.modulesCount} modules structurés en sous-parties, pour avancer étape par étape.`,
                        'Une conclusion pour intégrer et savoir comment continuer seule après la formation.',
                    ]}
                />
                <BulletBlock
                    title="Un chemin de transformation, pas une simple playlist"
                    bullets={[
                        'Chaque module t’amène à sentir, comprendre, pratiquer et intégrer.',
                        'Tu avances à ton rythme mais avec un fil rouge qui te tient la main.',
                        'La méthode respecte ta sensibilité, ton énergie et ton quotidien réel.',
                    ]}
                />
            </div>
        </section>
    );
}

function FormationAudience({ formation }: { formation: Formation }) {
    return (
        <section className="grid gap-5 md:grid-cols-2">
            <div className="card space-y-3 bg-ivory/95 border-perl/60">
                <h3 className="font-serif-title text-lg">Cette formation est pour toi si…</h3>
                <ul className="space-y-1.5 text-sm text-main/75">
                    {formation.idealFor.map((item) => (
                        <li key={item}>• {item}</li>
                    ))}
                </ul>
            </div>

            <div className="card space-y-3 bg-sage/4 border-sage/40">
                <h3 className="font-serif-title text-lg">Ce n’est probablement pas le bon moment si…</h3>
                <ul className="space-y-1.5 text-sm text-main/75">
                    {(
                        formation.notFor ?? [
                            'Tu veux juste “consommer” un contenu sans t’impliquer un minimum.',
                            'Tu cherches une solution miracle sans pratique ni introspection.',
                        ]
                    ).map((item) => (
                        <li key={item}>• {item}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

function FormationProgramme({ formation }: { formation: Formation }) {
    const intro = formation.modules.find((m) => m.id === 'intro');
    const conclusion = formation.modules.find((m) => m.id === 'conclusion');
    const coreModules = formation.modules.filter((m) => m.id !== 'intro' && m.id !== 'conclusion');

    return (
        <section id="programme" className="card space-y-5">
            <div>
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/70">Programme complet</p>
                <h3 className="font-serif-title text-lg md:text-xl">Un parcours en {formation.modulesCount} modules (+ intro & conclusion) pensé comme un vrai voyage</h3>
                <p className="mt-1 max-w-2xl text-sm text-main/75">
                    Tu peux suivre la formation module par module, en laissant le temps d’intégrer entre chaque, ou par blocs plus intensifs selon ton rythme.
                </p>
            </div>

            <div className="space-y-4">
                {intro && <ProgrammeModuleCard module={intro} label="Introduction" accent="Accueil & cadre" />}
                {coreModules
                    .sort((a, b) => a.order - b.order)
                    .map((m, index) => (
                        <ProgrammeModuleCard key={m.id} module={m} label={`Module ${index + 1}`} accent="Module principal" />
                    ))}
                {conclusion && <ProgrammeModuleCard module={conclusion} label="Conclusion" accent="Intégration & suite" />}
            </div>
        </section>
    );
}

type ProgrammeModuleCardProps = {
    module: FormationModule;
    label: string;
    accent: string;
};

function ProgrammeModuleCard({ module, label, accent }: ProgrammeModuleCardProps) {
    return (
        <article className="rounded-2xl border border-perl/60 bg-ivory/98 px-3.5 py-3.5 space-y-3">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                    <p className="text-[0.75rem] font-medium text-main/80">{label}</p>
                    <h4 className="font-serif-title text-[1rem] text-main">{module.title}</h4>
                </div>
                <span className="inline-flex w-fit items-center justify-center rounded-full bg-sage/6 px-2.5 py-0.5 text-[0.7rem] uppercase tracking-[0.16em] text-main/65">
                    {accent}
                </span>
            </div>

            <p className="text-sm text-main/75">{module.summary}</p>

            {module.lessons?.length > 0 && (
                <div className="rounded-xl border border-perl/50 bg-white px-3 py-2.5">
                    <p className="text-[0.7rem] uppercase tracking-[0.16em] text-main/60 mb-2">Dans ce module</p>
                    <ul className="space-y-1.5 text-[0.85rem] text-main/80">
                        {module.lessons.map((lesson) => (
                            <li key={lesson.slug} className="flex items-start gap-1.5">
                                <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-sage/70" />
                                <span>
                                    <strong className="font-medium">
                                        {lesson.kind === 'video'
                                            ? 'Cours vidéo — '
                                            : lesson.kind === 'exercise'
                                            ? 'Exercice — '
                                            : lesson.kind === 'ritual'
                                            ? 'Rituel — '
                                            : lesson.kind === 'bonus'
                                            ? 'Bonus — '
                                            : ''}
                                    </strong>
                                    {lesson.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </article>
    );
}

function FormationBonuses({ formation }: { formation: Formation }) {
    if (!formation.bonuses?.length) return null;

    return (
        <section className="card space-y-4 border-terre/40 bg-terre/4">
            <div className="space-y-1">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/70">Bonus premium</p>
                <h3 className="font-serif-title text-lg md:text-xl">Ce qui renforce la transformation</h3>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
                {formation.bonuses.map((bonus) => (
                    <article key={bonus.title} className="rounded-2xl border border-perl/60 bg-ivory/98 px-3.5 py-3.5 space-y-1.5">
                        <p className="text-[0.75rem] uppercase tracking-[0.16em] text-main/60">
                            {bonus.type === 'audio'
                                ? 'Audio guidé'
                                : bonus.type === 'pdf'
                                ? 'Carnet / PDF'
                                : bonus.type === 'atelier'
                                ? 'Mini-atelier'
                                : bonus.type === 'playlist'
                                ? 'Playlist'
                                : bonus.type === 'rituel'
                                ? 'Rituel'
                                : 'Bonus'}
                        </p>
                        <h4 className="font-serif-title text-[1rem] text-main">{bonus.title}</h4>
                        <p className="text-sm text-main/75">{bonus.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

function FormationAfter({ formation }: { formation: Formation }) {
    return (
        <section className="grid gap-5 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div className="card space-y-3">
                <h3 className="font-serif-title text-lg">Après cette formation, qu’est-ce qui change vraiment ?</h3>
                <p className="text-sm text-main/75">{formation.transformationPromise}</p>
            </div>

            <div className="card space-y-3 bg-ivory/95 border-perl/60">
                <h3 className="font-serif-title text-lg">Continuer avec Explor’Art</h3>
                <div className="flex flex-col gap-2 text-sm text-main/80">
                    <Link
                        href="/cours"
                        className="inline-flex items-center justify-between rounded-xl border border-perl/70 bg-ivory px-3 py-2 hover:bg-background transition-colors"
                    >
                        <span>Compléter avec des cours plus courts</span>
                        <span>↗</span>
                    </Link>
                    <Link
                        href="/categories"
                        className="inline-flex items-center justify-between rounded-xl border border-perl/70 bg-ivory px-3 py-2 hover:bg-background transition-colors"
                    >
                        <span>Explorer les 7 piliers Explor’Art</span>
                        <span>↗</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

/* ---------- PETITS BLOCS ---------- */

type BulletBlockProps = {
    title: string;
    bullets: string[];
};

function BulletBlock({ title, bullets }: BulletBlockProps) {
    return (
        <div className="rounded-2xl border border-perl/60 bg-ivory/98 px-3.5 py-3.5 space-y-2">
            <h3 className="font-serif-title text-[0.95rem] text-main">{title}</h3>
            <ul className="space-y-1.5 text-sm text-main/75">
                {bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sage/70" />
                        <span>{b}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

type AsideProps = {
    formation: Formation;
    priceLabel: string;
    levelLabel: string;
};

function FormationAside({ formation, priceLabel, levelLabel }: AsideProps) {
    const pillar = pillarConfig[formation.pillarSlug];

    return (
        <aside className="space-y-4 lg:sticky lg:top-24 lg:space-y-5">
            <section className="card space-y-4 border-sage/50 bg-white shadow-lg shadow-sage/10">
                <div className="space-y-1">
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-sage">Récap de la formation</p>
                    <h2 className="font-serif-title text-lg md:text-xl">{formation.title}</h2>
                    <p className="text-sm text-main/75">{formation.tagline}</p>
                </div>

                <div className="flex items-baseline gap-2 pt-1">
                    <p className="text-2xl font-semibold text-main">{priceLabel}</p>
                    <p className="text-[0.8rem] text-main/60">Pour un voyage complet en plusieurs modules rejouables.</p>
                </div>

                <ul className="space-y-1.5 text-sm text-main/75 pt-1">
                    <li>• ≈ {formation.approximateHours} h de contenu guidé</li>
                    <li>• {formation.modulesCount} modules + sous-modules, intro & conclusion</li>
                    <li>
                        • Niveau {levelLabel} · Univers : {pillar.title}
                    </li>
                </ul>

                <div className="rounded-2xl border border-sage/40 bg-sage/5 px-3.5 py-3 text-[0.78rem] text-main/75">
                    Les inscriptions ne sont pas encore ouvertes. Tu peux te préinscrire ou demander des infos via le formulaire de contact.
                </div>

                <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-main px-4 py-2.5 text-sm font-medium text-ivory shadow-sm hover:bg-main/90 transition-colors"
                >
                    Me préinscrire / poser une question
                    <span>↗</span>
                </Link>
            </section>
        </aside>
    );
}
