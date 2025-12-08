// src/app/(user)/tableau-de-bord/cours/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BarChart3, BookOpen, BookOpenCheck, CheckCircle2, Clock, PlayCircle, Sparkles } from 'lucide-react';

import { COURSES } from '@/lib/content/courses';

interface PurchasedCourse {
    slug: string;
    title: string;
    tagline: string;
    pillarLabel: string;
    durationMinutes: number;
    modulesCount: number;
    purchasedAt: string;
}

type Status = 'loading' | 'ready' | 'error' | 'unauthenticated';

export default function TableauDeBordCoursPage() {
    const [courses, setCourses] = useState<PurchasedCourse[]>([]);
    const [status, setStatus] = useState<Status>('loading');

    useEffect(() => {
        async function fetchCourses() {
            try {
                const res = await fetch('/api/users/me/courses');

                if (res.status === 401) {
                    setStatus('unauthenticated');
                    return;
                }

                const data = await res.json();
                setCourses(Array.isArray(data.courses) ? data.courses : []);
                setStatus('ready');
            } catch (error) {
                console.error('[FETCH_COURSES_ERROR]', error);
                setStatus('error');
            }
        }
        void fetchCourses();
    }, []);

    const catalog = useMemo(() => COURSES.filter((course) => !course.isMini), []);
    const miniCourse = useMemo(() => COURSES.find((course) => course.isMini), []);
    const purchasedCourseSlugs = useMemo(() => new Set(courses.map((course) => course.slug)), [courses]);
    const purchasedCount = courses.length;
    const latestCourse = courses[0];

    return (
        <main className="py-8 md:py-12">
            <div className="container-page space-y-10 md:space-y-12">
                {/* HERO --------------------------------------------------------------------- */}
                <header className="relative overflow-hidden rounded-3xl border border-perl/60 bg-ivory/95 px-5 py-7 md:px-8 md:py-9 shadow-sm">
                    {/* halos */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-soft-light
                        bg-[radial-gradient(circle_at_0%_0%,rgba(63,132,114,0.25)_0,transparent_55%),radial-gradient(circle_at_100%_100%,rgba(30,61,114,0.22)_0,transparent_55%)]"
                    />

                    <div className="relative grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.4fr)] lg:items-center">
                        {/* Colonne gauche : édito */}
                        <div className="space-y-4 max-w-xl">
                            <p className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-main/75">
                                <Sparkles className="h-4 w-4" />
                                Atelier de cours Explor’Art
                            </p>
                            <div className="space-y-2">
                                <h1 className="font-serif-title text-2xl md:text-3xl text-main leading-tight">Tes cours, comme un atelier que tu peux rouvrir quand tu veux</h1>
                                <p className="text-sm md:text-base text-main/78">
                                    Retrouve les parcours que tu as déjà débloqués, reprends un module là où tu t’es arrêtée et explore de nouveaux cours pour nourrir ta pratique,
                                    sans pression.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3 pt-1 text-sm">
                                {status === 'ready' && (
                                    <>
                                        <DashboardStat
                                            icon={<BookOpenCheck className="h-4 w-4 text-sage" />}
                                            label={
                                                purchasedCount === 0 ? 'Aucun cours débloqué pour le moment' : `${purchasedCount} cours débloqué${purchasedCount > 1 ? 's' : ''}`
                                            }
                                        />
                                        {purchasedCount > 0 && <DashboardStat icon={<Clock className="h-4 w-4 text-main/80" />} label="Accès à vie, à rouvrir quand tu veux" />}
                                    </>
                                )}
                                {status === 'loading' && <div className="h-8 w-44 rounded-full bg-white/80 border border-perl/50 animate-pulse" />}
                            </div>
                        </div>

                        {/* Colonne droite : carte synthèse + CTA catalogue */}
                        <div className="space-y-3 rounded-2xl border border-perl/55 bg-white/96 px-4 py-4 md:px-5 md:py-5 shadow-xs">
                            <div className="flex items-center justify-between gap-2">
                                <div className="space-y-1">
                                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Vue d’ensemble</p>
                                    <p className="text-sm text-main/80">
                                        {purchasedCount === 0
                                            ? 'Tu pourras suivre tes cours et ton avancée ici dès ton premier achat.'
                                            : 'Tes cours débloqués restent disponibles à tout moment dans cet espace.'}
                                    </p>
                                </div>
                                <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-perl/50 bg-ivory/90 text-main/70">
                                    <BarChart3 className="h-4 w-4" />
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3 text-[0.8rem]">
                                <StatBadge label="Cours débloqués" value={status === 'ready' ? purchasedCount.toString() : '—'} />
                                <StatBadge label="Mini-parcours" value={miniCourse ? '1 offert' : '—'} />
                                <StatBadge
                                    label="Durée totale"
                                    value={status === 'ready' && purchasedCount > 0 ? `${courses.reduce((acc, c) => acc + (c.durationMinutes ?? 0), 0)} min` : '—'}
                                />
                            </div>

                            {latestCourse && status === 'ready' && (
                                <div className="mt-1 rounded-2xl border border-sage/35 bg-sage/5 px-3.5 py-3 flex flex-col gap-2">
                                    <p className="text-[0.7rem] uppercase tracking-[0.16em] text-sage">Dernier cours débloqué</p>
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="space-y-0.5">
                                            <p className="font-serif-title text-[0.95rem] text-main line-clamp-1">{latestCourse.title}</p>
                                            <p className="text-[0.78rem] text-main/70 line-clamp-2">{latestCourse.tagline}</p>
                                        </div>
                                        <Link
                                            href={`/cours/${latestCourse.slug}`}
                                            className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-main px-3.5 py-1.5 text-[0.78rem] font-medium text-ivory shadow-sm hover:bg-main/90"
                                        >
                                            Reprendre ce cours
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-2 pt-1">
                                <Link
                                    href="/cours"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-main px-4 py-2 text-sm font-medium text-ivory shadow-sm hover:bg-main/90"
                                >
                                    Découvrir le catalogue complet
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* MES COURS --------------------------------------------------------------- */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-main/70">
                            <BookOpen className="h-4 w-4" />
                            <span>Reprendre tes cours</span>
                        </div>

                        {status === 'ready' && purchasedCount > 0 && (
                            <span className="text-[0.8rem] text-main/65">Tu peux rouvrir n’importe quel cours, même longtemps après l’achat.</span>
                        )}
                    </div>

                    {/* Loading */}
                    {status === 'loading' && (
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {[...Array(3)].map((_, idx) => (
                                <div key={idx} className="h-52 rounded-3xl border border-perl/40 bg-ivory/80 animate-pulse" />
                            ))}
                        </div>
                    )}

                    {/* Non authentifiée */}
                    {status === 'unauthenticated' && (
                        <div className="card border-perl/60 bg-white/96 space-y-3">
                            <p className="font-serif-title text-[1.05rem] text-main">Retrouver tes cours achetés</p>
                            <p className="text-sm text-main/75">
                                Connecte-toi à ton espace Explor’Art pour voir les cours que tu as déjà débloqués. Tu pourras les rouvrir autant de fois que tu le souhaites.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                                <Link
                                    href="/connexion"
                                    className="inline-flex items-center gap-2 rounded-full bg-main px-4 py-2 text-sm font-medium text-ivory shadow-sm hover:bg-main/90"
                                >
                                    Me connecter
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/inscription"
                                    className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-[0.85rem] font-medium text-main/80 hover:bg-background"
                                >
                                    Créer un compte
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Erreur */}
                    {status === 'error' && (
                        <div className="card border-rose/30 bg-rose/5 text-rose-800 text-sm">Une erreur est survenue en récupérant tes cours. Réessaie dans quelques instants.</div>
                    )}

                    {/* Aucun cours */}
                    {status === 'ready' && purchasedCount === 0 && (
                        <div className="card border-perl/60 bg-white/96 space-y-3">
                            <p className="font-serif-title text-[1.05rem] text-main">Tu n’as encore aucun cours débloqué</p>
                            <p className="text-sm text-main/75">
                                Dès que tu achèteras un cours Explor’Art, il apparaîtra ici automatiquement après validation du paiement Stripe. En attendant, tu peux :
                            </p>
                            <ul className="text-sm text-main/75 list-disc list-inside space-y-1">
                                <li>Parcourir le catalogue et choisir un sujet qui t’appelle</li>
                                <li>Commencer par le mini-parcours offert, si disponible</li>
                            </ul>
                            <div className="flex flex-wrap gap-2 pt-1">
                                <Link
                                    href="/cours"
                                    className="inline-flex items-center gap-2 rounded-full bg-main px-4 py-2 text-sm font-medium text-ivory shadow-sm hover:bg-main/90"
                                >
                                    Voir les cours disponibles
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                {miniCourse && (
                                    <Link
                                        href={`/cours/${miniCourse.slug}`}
                                        className="inline-flex items-center gap-2 rounded-full border border-sage/60 bg-ivory px-4 py-2 text-[0.85rem] font-medium text-sage hover:bg-white"
                                    >
                                        Commencer le mini-parcours offert
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Liste des cours achetés */}
                    {status === 'ready' && purchasedCount > 0 && (
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {courses.map((course) => (
                                <PurchasedCourseCard key={course.slug} course={course} />
                            ))}
                        </div>
                    )}
                </section>

                {/* CATALOGUE -------------------------------------------------------------- */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-main/70">
                            <Sparkles className="h-4 w-4" />
                            <span>Découvrir de nouveaux cours</span>
                        </div>
                        <span className="text-[0.8rem] text-main/65">Des formats compacts pour explorer un sujet précis, en quelques sessions.</span>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {catalog.map((course) => {
                            const isPurchased = purchasedCourseSlugs.has(course.slug);
                            return <CatalogCourseCard key={course.slug} course={course} isPurchased={isPurchased} />;
                        })}
                    </div>
                </section>

                {/* MINI-PARCOURS OFFERT --------------------------------------------------- */}
                {miniCourse && <MiniCourseBanner course={miniCourse} />}
            </div>
        </main>
    );
}

/* -------------------------------------------------------------------------- */
/*  Petits composants                                                         */
/* -------------------------------------------------------------------------- */

function DashboardStat({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-perl/60 px-3 py-1.5 shadow-xs">
            {icon}
            <span className="text-[0.85rem] text-main/80">{label}</span>
        </div>
    );
}

function StatBadge({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-perl/60 bg-ivory/95 px-3 py-2">
            <p className="text-[0.65rem] uppercase tracking-[0.16em] text-main/60">{label}</p>
            <p className="text-sm font-medium text-main mt-1">{value}</p>
        </div>
    );
}

function formatDateFr(dateString: string) {
    try {
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(new Date(dateString));
    } catch {
        return dateString;
    }
}

function PurchasedCourseCard({ course }: { course: PurchasedCourse }) {
    return (
        <article className="group relative overflow-hidden rounded-3xl border border-perl/70 bg-white/96 p-5 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md">
            {/* halo */}
            <div
                className="pointer-events-none absolute inset-0 opacity-50 mix-blend-soft-light
                bg-[radial-gradient(circle_at_100%_0%,rgba(63,132,114,0.16)_0,transparent_45%)]"
            />

            <div className="relative flex h-full flex-col gap-4">
                <div className="flex items-start gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-2xl bg-ivory border border-perl/60 flex items-center justify-center text-main/80">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-[0.7rem] uppercase tracking-[0.16em] text-main/65">{course.pillarLabel}</p>
                        <h2 className="font-serif-title text-[1.02rem] text-main group-hover:text-main/90 line-clamp-2">{course.title}</h2>
                        <p className="text-sm text-main/75 line-clamp-2">{course.tagline}</p>
                    </div>
                </div>

                <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between text-[0.8rem] text-main/70">
                        <span>Acheté le {formatDateFr(course.purchasedAt)}</span>
                        <Link
                            href={`/cours/${course.slug}`}
                            className="inline-flex items-center gap-2 rounded-full border border-perl/60 bg-ivory/85 px-3 py-1.5 text-[0.78rem] font-medium text-main/80 transition hover:border-main/70 hover:bg-ivory"
                        >
                            Ouvrir le cours
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[0.78rem] text-main/70">
                        <span className="inline-flex items-center gap-2 rounded-full bg-ivory border border-perl/60 px-3 py-1">
                            <Clock className="h-3.5 w-3.5" /> {course.durationMinutes} min
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-ivory border border-perl/60 px-3 py-1">{course.modulesCount} modules</span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-ivory border border-sage/70 px-3 py-1 text-sage">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Accès à vie
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}

type CatalogCourse = (typeof COURSES)[number];

function CatalogCourseCard({ course, isPurchased }: { course: CatalogCourse; isPurchased: boolean }) {
    return (
        <article className="group flex flex-col rounded-3xl border border-perl/70 bg-white/96 p-5 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                    <p className="text-[0.7rem] uppercase tracking-[0.16em] text-main/65">{course.pillarLabel}</p>
                    <h3 className="font-serif-title text-[1.02rem] text-main group-hover:text-main/90 line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-main/75 line-clamp-2">{course.tagline}</p>
                </div>
                <div className="rounded-full bg-ivory border border-perl/60 px-3 py-1 text-[0.75rem] font-medium text-main/80 whitespace-nowrap">
                    {course.level === 'beginner' ? 'Débutant' : 'Intermédiaire'}
                </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.78rem] text-main/70">
                <span className="inline-flex items-center gap-2 rounded-full bg-ivory border border-perl/60 px-3 py-1">
                    <Clock className="h-3.5 w-3.5" /> {course.durationMinutes} min
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-ivory border border-perl/60 px-3 py-1">{course.modulesCount} modules</span>
                <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 ${
                        isPurchased ? 'border-sage/70 bg-sage/8 text-sage' : 'bg-ivory border-perl/60 text-main/75'
                    }`}
                >
                    {isPurchased ? 'Déjà débloqué' : `${course.priceEUR.toString().replace('.', ',')} €`}
                </span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
                {isPurchased ? (
                    <Link
                        href={`/cours/${course.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-sage/70 bg-sage/10 px-3 py-2 text-[0.8rem] font-medium text-sage shadow-sm transition hover:-translate-y-0.5 hover:border-sage"
                    >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Ouvrir le cours
                    </Link>
                ) : (
                    <Link
                        href={`/cours/${course.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-main px-3 py-2 text-[0.8rem] font-medium text-ivory shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        Voir le cours
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                )}
                <span className="text-[0.75rem] text-main/65">{isPurchased ? 'Toujours accessible' : 'Inclut intro & conclusion'}</span>
            </div>
        </article>
    );
}

function MiniCourseBanner({ course }: { course: CatalogCourse }) {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-sage/45 bg-linear-to-r from-sage/14 via-ivory to-white px-5 py-6 md:px-7 md:py-7 shadow-xs">
            {/* halos */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-soft-light
                bg-[radial-gradient(circle_at_10%_0%,rgba(63,132,114,0.3)_0,transparent_55%),radial-gradient(circle_at_100%_100%,rgba(180,92,119,0.22)_0,transparent_55%)]"
            />

            <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2 max-w-2xl">
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-sage">Mini-parcours offert</p>
                    <h3 className="font-serif-title text-xl text-main">{course.title}</h3>
                    <p className="text-sm text-main/80 max-w-xl">{course.tagline}</p>

                    <div className="flex flex-wrap gap-2 text-[0.78rem] text-main/70 pt-1">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-perl/60 px-3 py-1">
                            <PlayCircle className="h-3.5 w-3.5" /> 3 modules guidés
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-perl/60 px-3 py-1">
                            <Clock className="h-3.5 w-3.5" /> {course.durationMinutes} min
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-perl/60 px-3 py-1">Accès offert à vie</span>
                    </div>
                </div>

                <Link
                    href={`/cours/${course.slug}`}
                    className="group inline-flex items-center justify-center gap-2 self-start rounded-full border border-sage/70 bg-main px-4 py-2.5 text-sm font-medium text-ivory shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                    Commencer gratuitement
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
                </Link>
            </div>
        </section>
    );
}
