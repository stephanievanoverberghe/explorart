// src/app/(public)/cours/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { ArrowRight, BadgeCheck, CheckCircle2, Clock, CreditCard, Layers, Lock, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';

import { COURSES, type Course } from '@/lib/content/courses';
import { levelLabels, pillarConfig, pillarHeroThemes } from '@/components/categories/category-data';
import { CheckoutButton } from '@/components/courses/ChechoutButton';

interface CoursePageProps {
    // Next 16 : params est un Promise côté serveur
    params: Promise<{ slug: string | string[] }>;
}

// 🔹 Normalisation du slug pour être tolérant
function normalizeSlug(raw: string | string[]) {
    const slug = Array.isArray(raw) ? raw[0] : raw;
    return decodeURIComponent(slug).trim().toLowerCase();
}

function formatDuration(minutes: number) {
    if (minutes < 45) return `${minutes} min`;
    if (minutes <= 70) return `${minutes} min`;
    return `${minutes} min`;
}

function getDurationPhrase(minutes: number) {
    if (minutes < 45) return '≈ 30–45 minutes de contenu guidé';
    if (minutes <= 70) return '≈ 1 heure de contenu guidé';
    return '≈ 1h15 à 1h30 de contenu guidé';
}

export default async function CoursePage({ params }: CoursePageProps) {
    const resolvedParams = await params;
    const normalizedSlug = normalizeSlug(resolvedParams.slug);

    const course = COURSES.find((c) => c.slug.toLowerCase() === normalizedSlug);

    if (!course) {
        notFound();
    }

    const isFree = course.priceEUR === 0 || course.isMini;
    const priceLabel = isFree ? 'Gratuit' : `${course.priceEUR.toString().replace('.', ',')} €`;
    const levelLabel = levelLabels[course.level];

    return (
        <section className="relative bg-ivory pt-4 pb-24 md:pt-24 md:pb-28">
            <div className="container-page space-y-10">
                {/* HERO */}
                <CourseHero course={course} isFree={isFree} priceLabel={priceLabel} levelLabel={levelLabel} />

                <main className="grid gap-8 lg:grid-cols-[minmax(0,1.85fr)_minmax(0,1.15fr)] items-start">
                    {/* Colonne gauche : contenu éditorial / vente */}
                    <div className="space-y-8">
                        {/* 0. Pack complet */}
                        <section className="card space-y-4 border-main/20 bg-white/90 shadow-sm">
                            <div className="flex items-center gap-2 text-main">
                                <Sparkles className="h-5 w-5 text-main" />
                                <div>
                                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/70">Accès immédiat</p>
                                    <h2 className="font-serif-title text-lg md:text-xl">Tout ce qui est inclus quand tu achètes</h2>
                                </div>
                            </div>

                            <div className="grid gap-3 md:grid-cols-2">
                                <IncludedItem
                                    icon={<BadgeCheck className="h-4 w-4 text-main" />}
                                    title="Accès illimité"
                                    description="Toutes les vidéos, les exercices et les ressources téléchargeables disponibles tout de suite après paiement."
                                />
                                <IncludedItem
                                    icon={<Lock className="h-4 w-4 text-main" />}
                                    title="Paiement 100% sécurisé"
                                    description="Transactions traitées par Stripe, avec facture automatique et confirmation instantanée."
                                />
                                <IncludedItem
                                    icon={<MessageCircle className="h-4 w-4 text-main" />}
                                    title="Support rapide"
                                    description="Un contact direct si tu bloques : on te répond avec bienveillance et clarté."
                                />
                                <IncludedItem
                                    icon={<ArrowRight className="h-4 w-4 text-main" />}
                                    title="Plan d’action guidé"
                                    description="Un fil rouge étape par étape pour suivre le cours sans te disperser."
                                />
                            </div>
                        </section>

                        {/* 1. Ce que tu vas apprendre */}
                        <section className="card space-y-4">
                            <div className="space-y-1">
                                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/70">Ce que tu vas apprendre dans ce cours</p>
                                <h2 className="font-serif-title text-lg md:text-xl">Transformer {course.pillarLabel.toLowerCase()} en un vrai temps pour toi</h2>
                            </div>

                            <p className="text-sm md:text-base text-main/75 max-w-2xl">
                                Ce cours n’est pas une playlist de vidéos à consommer puis oublier. C’est un petit parcours structuré qui t’aide à{' '}
                                <strong>poser des bases solides</strong> dans l’univers&nbsp;: <strong>{course.pillarLabel}</strong>, sans te perdre ni te juger.
                            </p>

                            <div className="grid gap-4 md:grid-cols-2">
                                <LearnPoint
                                    title="Une structure claire et rassurante"
                                    items={[
                                        'Introduction guidée pour te mettre dans le bon état d’esprit.',
                                        '3 modules qui avancent progressivement, sans surcharge.',
                                        'Une conclusion pour intégrer ce que tu as vécu et savoir comment continuer.',
                                    ]}
                                />
                                <LearnPoint
                                    title="Des résultats concrets pour ta pratique"
                                    items={[
                                        'Des exercices que tu peux refaire plusieurs fois, sans te lasser.',
                                        'Des repères simples pour ne plus te sentir « perdue » devant la feuille.',
                                        'Une relation un peu plus douce avec ton geste, ton regard ou tes couleurs.',
                                    ]}
                                />
                            </div>
                        </section>

                        {/* 2. À qui ça s’adresse / pour qui c’est fait */}
                        <section className="grid gap-5 md:grid-cols-2">
                            <div className="card bg-ivory/95 border-perl/60 space-y-3">
                                <h3 className="font-serif-title text-lg">Ce cours est pour toi si…</h3>
                                <ul className="text-sm text-main/75 space-y-1.5">
                                    <li>• Tu as envie d’un cours {course.level === 'beginner' ? 'débutant' : 'intermédiaire'} mais assumé, pas « pour enfants ».</li>
                                    <li>• Tu veux un rythme réaliste : environ {getDurationPhrase(course.durationMinutes).toLowerCase()}.</li>
                                    <li>• Tu cherches un cadre clair, sans jargon et sans performance.</li>
                                    <li>• Tu veux que ton temps, ton énergie et ton argent soient respectés.</li>
                                </ul>
                            </div>

                            <div className="card bg-sage/4 border-sage/40 space-y-3">
                                <h3 className="font-serif-title text-lg">Ce cours n’est pas pour toi si…</h3>
                                <ul className="text-sm text-main/75 space-y-1.5">
                                    <li>• Tu cherches une énorme formation de 40h avec tous les sujets en même temps.</li>
                                    <li>• Tu veux des recettes magiques « en 3 jours tu deviendras pro ».</li>
                                    <li>• Tu n’es pas prête à consacrer au moins 1h de vraie disponibilité intérieure.</li>
                                    <li>• Tu veux surtout des techniques spectaculaires, sans réflexion ni douceur.</li>
                                </ul>
                            </div>
                        </section>

                        {/* 3. Programme détaillé */}
                        <section id="programme" className="card space-y-5">
                            <div>
                                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/70">Programme du cours</p>
                                <h3 className="font-serif-title text-lg md:text-xl">Un parcours en 5 temps : intro · 3 modules · conclusion</h3>
                                <p className="text-sm text-main/75 mt-1 max-w-2xl">
                                    Tu peux suivre le cours d’un bloc ou module par module. Chaque étape est pensée pour tenir dans ton vrai quotidien, sans te demander de tout
                                    réorganiser.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <ProgrammeRow
                                    step="Introduction"
                                    badge="Accueil & cadre"
                                    description="On pose l’intention du cours, le matériel minimal et la meilleure façon d’en tirer quelque chose de vraiment utile pour toi."
                                />
                                <ProgrammeRow
                                    step="Module 1"
                                    badge="Premier socle"
                                    description="Un premier exercice guidé pour entrer dans le cœur du sujet, en douceur, avec un objectif clair et atteignable dès maintenant."
                                />
                                <ProgrammeRow
                                    step="Module 2"
                                    badge="Approfondir sans se perdre"
                                    description="On complexifie légèrement : nouveaux exemples, nouvelles pistes, mais toujours avec un fil rouge rassurant."
                                />
                                <ProgrammeRow
                                    step="Module 3"
                                    badge="Intégrer dans ta pratique"
                                    description="On relie ce que tu as vu, ressenti et expérimenté, pour que ce cours laisse une trace durable dans ta pratique artistique."
                                />
                                <ProgrammeRow
                                    step="Conclusion"
                                    badge="Pistes pour la suite"
                                    description="On fait le point, tu poses tes propres mots, et tu repars avec des idées concrètes pour continuer seule, à ton rythme."
                                />
                            </div>
                        </section>

                        {/* 4. Après le cours / articulation avec le reste d’Explor’Art */}
                        <section className="grid gap-5 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
                            <div className="card space-y-3">
                                <h3 className="font-serif-title text-lg">Et après ce cours, qu’est-ce qui change ?</h3>
                                <p className="text-sm text-main/75">
                                    L’objectif n’est pas que tu « finisses » ce cours, mais qu’il ouvre quelque chose pour la suite : un geste plus libre, un regard plus confiant,
                                    une couleur qui devient ton alliée…
                                </p>
                                <ul className="text-sm text-main/75 space-y-1.5 mt-1">
                                    <li>• Tu peux refaire les modules plusieurs fois, avec d’autres sujets ou d’autres images.</li>
                                    <li>• Tu peux t’appuyer sur les articles gratuits du même pilier pour continuer à explorer.</li>
                                    <li>• Tu gardes une trace écrite, visuelle et émotionnelle de ce que tu as traversé.</li>
                                </ul>
                            </div>

                            <div className="card bg-ivory/95 border-perl/60 space-y-3">
                                <h3 className="font-serif-title text-lg">Continuer ton chemin avec Explor’Art</h3>
                                <div className="flex flex-col gap-2 text-sm text-main/80">
                                    <Link
                                        href="/articles"
                                        className="inline-flex items-center justify-between rounded-xl border border-perl/70 bg-ivory px-3 py-2 hover:bg-background transition-colors"
                                    >
                                        <span>Explorer les articles du blog</span>
                                        <span>↗</span>
                                    </Link>
                                    <Link
                                        href="/categories"
                                        className="inline-flex items-center justify-between rounded-xl border border-perl/70 bg-ivory px-3 py-2 hover:bg-background transition-colors"
                                    >
                                        <span>Découvrir les 7 piliers Explor’Art</span>
                                        <span>↗</span>
                                    </Link>
                                </div>
                            </div>
                        </section>

                        {/* 4bis. Tunnel de vente */}
                        <section className="card space-y-5 border-main/20 bg-white/95">
                            <div className="space-y-1">
                                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/70">Un tunnel clair</p>
                                <h3 className="font-serif-title text-lg md:text-xl">Ton achat en 3 étapes sécurisées</h3>
                                <p className="text-sm text-main/75 max-w-2xl">
                                    Pas de détour ni d’upsell agressif : tu cliques, tu paies via Stripe, tu reçois l’accès et la facture dans la foulée.
                                </p>
                            </div>

                            <div className="grid gap-3 md:grid-cols-3">
                                <FunnelStep icon={<Sparkles className="h-5 w-5 text-main" />} title="Étape 1" description="Choisis ton cours et clique sur « Acheter »." />
                                <FunnelStep icon={<CreditCard className="h-5 w-5 text-main" />} title="Étape 2" description="Paiement Stripe sécurisé (CB ou Apple Pay)." />
                                <FunnelStep icon={<BadgeCheck className="h-5 w-5 text-main" />} title="Étape 3" description="Mail de confirmation + accès immédiat au cours." />
                            </div>

                            {!isFree && (
                                <div className="flex flex-col gap-2 rounded-2xl bg-main/5 border border-main/15 p-4 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-main">Prête à démarrer ?</p>
                                        <p className="text-[0.9rem] text-main/70">Un seul clic → un paiement Stripe → ton accès arrive instantanément.</p>
                                    </div>
                                    <CheckoutButton course={course} label="Lancer l’achat sécurisé" />
                                </div>
                            )}
                        </section>

                        {/* 5. Petite FAQ simple (version page de vente) */}
                        <section className="card space-y-4 bg-ivory/97 border-perl/70">
                            <div className="space-y-1">
                                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/70">Questions fréquentes</p>
                                <h3 className="font-serif-title text-lg">Avant de te lancer</h3>
                            </div>

                            <div className="space-y-3 text-sm text-main/78">
                                <div>
                                    <p className="font-medium">Est-ce que je dois suivre le cours d’un bloc&nbsp;?</p>
                                    <p className="text-main/75">
                                        Non. Tu peux le faire sur plusieurs jours ou semaines. L’important, c’est d’avoir des moments où tu es vraiment disponible, même courts.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-medium">Est-ce que j’ai besoin de beaucoup de matériel&nbsp;?</p>
                                    <p className="text-main/75">
                                        Non plus. Tout le contenu est pensé pour rester accessible avec peu de moyens (carnet, quelques couleurs, un crayon…).
                                    </p>
                                </div>
                                <div>
                                    <p className="font-medium">Et si je me sens « trop débutante » ou « pas assez douée »&nbsp;?</p>
                                    <p className="text-main/75">
                                        C’est précisément pour ça que ce cours existe. Il est conçu pour t’accompagner avec douceur, sans t’humilier ni te perdre dans des exigences
                                        impossibles.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Colonne droite : bloc récap prix / durée / CTA sticky */}
                    <aside className="lg:sticky lg:top-24 self-start space-y-4 lg:space-y-5">
                        <section className="card space-y-4 border-sage/50 bg-ivory/98 shadow-md shadow-sage/10">
                            <div className="space-y-1">
                                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-sage">Récap du cours</p>
                                <h2 className="font-serif-title text-lg md:text-xl">{course.title}</h2>
                                <p className="text-sm text-main/75">{course.tagline}</p>
                            </div>

                            <div className="flex items-baseline gap-2 pt-1">
                                <p className={`text-2xl font-semibold ${isFree ? 'text-sage' : 'text-main'}`}>{priceLabel}</p>
                                {!isFree && (
                                    <p className="text-[0.8rem] text-main/60">
                                        Pour un cours complet, rejouable, d&apos;au moins {course.durationMinutes >= 60 ? '1 heure' : '45 minutes'}.
                                    </p>
                                )}
                            </div>

                            <ul className="text-sm text-main/75 space-y-1.5 pt-1">
                                <li className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-sage" />
                                    <span>
                                        Durée : {formatDuration(course.durationMinutes)} ({getDurationPhrase(course.durationMinutes)})
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Layers className="h-4 w-4 text-sage" />
                                    <span>Structure : introduction · {course.modulesCount} modules · conclusion</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-sage" />
                                    <span>
                                        Niveau : {levelLabel} · Univers : {course.pillarLabel}
                                    </span>
                                </li>
                            </ul>

                            {/* CTA principal (brancher plus tard sur le tunnel de paiement) */}
                            {isFree ? (
                                <Link
                                    href="/commencer-ici"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage px-4 py-2.5 text-sm font-medium text-ivory shadow-sm hover:bg-sage/90 transition-colors"
                                >
                                    Accéder au mini-parcours offert
                                    <span>↗</span>
                                </Link>
                            ) : (
                                <CheckoutButton course={course} fullWidth label="Payer en toute sécurité" sublabel="Paiement Stripe 100% sécurisé" size="lg" />
                            )}

                            <div className="rounded-2xl border border-sage/40 bg-sage/5 px-3.5 py-3 flex items-start gap-2.5">
                                <ShieldCheck className="h-4 w-4 mt-0.5 text-sage" />
                                <p className="text-[0.78rem] text-main/75">
                                    Tu peux suivre ce cours à ton rythme, le refaire autant de fois que tu veux, et l’inscrire dans ton propre chemin créatif. Il est pensé pour
                                    respecter ton temps, ton énergie et ta sensibilité.
                                </p>
                            </div>
                        </section>
                    </aside>
                </main>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/*  Composants internes                                                       */
/* -------------------------------------------------------------------------- */

type LearnPointProps = {
    title: string;
    items: string[];
};

type IncludedItemProps = {
    icon: ReactNode;
    title: string;
    description: string;
};

function IncludedItem({ icon, title, description }: IncludedItemProps) {
    return (
        <div className="rounded-2xl border border-perl/60 bg-ivory/98 px-3.5 py-3.5">
            <div className="flex items-center gap-2 text-main">
                {icon}
                <h3 className="font-serif-title text-[0.95rem]">{title}</h3>
            </div>
            <p className="mt-1 text-sm text-main/75">{description}</p>
        </div>
    );
}

function LearnPoint({ title, items }: LearnPointProps) {
    return (
        <div className="rounded-2xl border border-perl/60 bg-ivory/98 px-3.5 py-3.5 space-y-2">
            <h3 className="font-serif-title text-[0.95rem] text-main">{title}</h3>
            <ul className="text-sm text-main/75 space-y-1.5">
                {items.map((item) => (
                    <li key={item} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sage/70" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

type ProgrammeRowProps = {
    step: string;
    badge: string;
    description: string;
};

type FunnelStepProps = {
    icon: ReactNode;
    title: string;
    description: string;
};

function ProgrammeRow({ step, badge, description }: ProgrammeRowProps) {
    return (
        <div className="rounded-2xl border border-perl/60 bg-ivory/98 px-3.5 py-3 flex flex-col gap-1.5 md:flex-row md:items-start md:gap-3">
            <div className="min-w-32 space-y-1">
                <p className="text-[0.75rem] font-medium text-main/80">{step}</p>
                <p className="inline-flex items-center rounded-full bg-sage/6 px-2 py-0.5 text-[0.7rem] uppercase tracking-[0.16em] text-main/65">{badge}</p>
            </div>
            <p className="text-sm text-main/75">{description}</p>
        </div>
    );
}

function FunnelStep({ icon, title, description }: FunnelStepProps) {
    return (
        <div className="rounded-2xl border border-perl/60 bg-ivory/98 px-3.5 py-3 space-y-1.5">
            <div className="flex items-center gap-2 text-main">
                {icon}
                <p className="text-[0.85rem] font-semibold">{title}</p>
            </div>
            <p className="text-sm text-main/75">{description}</p>
        </div>
    );
}

type CourseHeroProps = {
    course: Course;
    isFree: boolean;
    priceLabel: string;
    levelLabel: string;
};

function CourseHero({ course, isFree, priceLabel, levelLabel }: CourseHeroProps) {
    const pillar = pillarConfig[course.pillarSlug];
    const heroTheme = pillarHeroThemes[course.pillarSlug];

    return (
        <header className={['relative overflow-hidden rounded-3xl px-5 py-7 md:px-8 md:py-8 shadow-lg border border-perl/60 text-ivory', heroTheme.bgClass].join(' ')}>
            {/* Halos doux */}
            <div className={['pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light', heroTheme.haloClass].join(' ')} />

            {/* inner border */}
            <div className="pointer-events-none absolute inset-5 rounded-[1.75rem] border border-ivory/15" />

            <div className="relative max-w-6xl mx-auto space-y-6">
                {/* Ligne top : fil d’Ariane + meta courte */}
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    {/* Fil d’Ariane */}
                    <nav className="text-[0.75rem] md:text-sm text-ivory/85" aria-label="Fil d’Ariane">
                        <ol className="flex flex-wrap items-center gap-1.5">
                            <li>
                                <Link href="/" className="hover:text-white">
                                    Accueil
                                </Link>
                            </li>
                            <li>·</li>
                            <li>
                                <Link href="/cours" className="hover:text-white">
                                    Cours
                                </Link>
                            </li>
                            <li>·</li>
                            <li className="inline-flex items-center gap-1 text-ivory">
                                <span className={`h-1.5 w-1.5 rounded-full ${pillar.dotClass}`} />
                                <span className="truncate max-w-48 sm:max-w-xs">{course.title}</span>
                            </li>
                        </ol>
                    </nav>

                    {/* Meta courte */}
                    <div className="flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-ivory/85">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/25 px-3 py-1 backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-ivory" />
                            Cours Explor’Art
                        </span>
                        <span className="mx-1 h-px w-6 bg-ivory/60" />
                        <span>{pillar.title}</span>
                        <span className="mx-1 h-px w-6 bg-ivory/60" />
                        <span>{levelLabel}</span>
                    </div>
                </div>

                {/* Grid principale : pitch + visuel + CTA */}
                <div className="grid gap-7 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.4fr)] items-stretch">
                    {/* Colonne gauche : pitch principal */}
                    <div className="space-y-5 max-w-xl">
                        <div className="space-y-3">
                            <h1 className="font-serif-title text-2xl sm:text-3xl md:text-4xl leading-tight text-ivory">{course.title}</h1>

                            <p className="text-sm md:text-base text-ivory/90 max-w-2xl">{course.tagline}</p>
                        </div>

                        <ul className="text-sm text-ivory/92 space-y-1.5">
                            <li className="flex gap-2">
                                <CheckCircle2 className="h-4 w-4 mt-0.5 text-ivory" />
                                <span>Un parcours complet, mais compact, pour vraiment avancer dans l’univers {course.pillarLabel.toLowerCase()}.</span>
                            </li>
                            <li className="flex gap-2">
                                <CheckCircle2 className="h-4 w-4 mt-0.5 text-ivory" />
                                <span>Un rythme réaliste ({getDurationPhrase(course.durationMinutes).toLowerCase()}), compatible avec une vraie vie.</span>
                            </li>
                            <li className="flex gap-2">
                                <CheckCircle2 className="h-4 w-4 mt-0.5 text-ivory" />
                                <span>Une structure simple : introduction, 3 modules guidés, conclusion pour ancrer.</span>
                            </li>
                        </ul>

                        {/* Info durée / niveau / type */}
                        <div className="flex flex-wrap gap-2 pt-2 text-[0.8rem] text-ivory/90">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1">
                                ⏱ {formatDuration(course.durationMinutes)} ({getDurationPhrase(course.durationMinutes)})
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1">{course.modulesCount} modules · intro · conclusion</span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1">
                                {isFree ? 'Mini-parcours offert' : 'Cours individuel payant'}
                            </span>
                        </div>
                    </div>

                    {/* Colonne droite : carte visuel + mini bloc vente */}
                    <aside className="relative">
                        <div className="relative h-full rounded-3xl border border-ivory/25 bg-black/20 shadow-md backdrop-blur-sm overflow-hidden">
                            <div className="grid h-full grid-rows-[minmax(0,1.2fr)_auto]">
                                {/* Visuel du cours */}
                                <div className="relative border-b border-ivory/20 overflow-hidden">
                                    <div className="relative aspect-4/3 w-full">
                                        <Image src={course.coverImage} alt={course.title} fill className="object-cover scale-[1.03]" />
                                        <div className="pointer-events-none absolute inset-0 bg-black/35 mix-blend-multiply" />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />
                                        <div className="absolute left-4 right-4 bottom-3 flex items-center justify-between text-[0.78rem] text-ivory/90">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1">{pillar.title}</span>
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1">{levelLabel}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Mini bloc vente en bas du hero */}
                                <div className="p-4 sm:p-5 space-y-3">
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-xl font-semibold text-ivory">{priceLabel}</p>
                                        {!isFree && (
                                            <p className="text-[0.8rem] text-ivory/80">
                                                Pour un cours complet, rejouable, d&apos;au moins {course.durationMinutes >= 60 ? '1 heure' : '45 minutes'}.
                                            </p>
                                        )}
                                    </div>

                                    <p className="text-[0.82rem] text-ivory/90">
                                        Pensé comme un vrai accompagnement : pas une simple vidéo, mais un chemin guidé que tu peux refaire plusieurs fois, à ton rythme.
                                    </p>

                                    {isFree ? (
                                        <Link
                                            href="/commencer-ici"
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage px-4 py-2 text-sm font-medium text-ivory shadow-sm hover:bg-sage/90 transition-colors"
                                        >
                                            Accéder gratuitement au parcours
                                            <span>↗</span>
                                        </Link>
                                    ) : (
                                        <CheckoutButton course={course} fullWidth label="Acheter le cours maintenant" sublabel="Paiement Stripe sécurisé, accès immédiat" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </header>
    );
}
