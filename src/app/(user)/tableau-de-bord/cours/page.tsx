// src/app/(user)/tableau-de-bord/cours/page.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, Clock, PlayCircle, Sparkles } from 'lucide-react';

import { COURSES, type Course } from '@/lib/content/courses';

const enrolledProgress = [
    {
        slug: 'oser-reprendre-le-crayon',
        progress: 72,
        nextStep: 'Module 2 · Gestes libres',
    },
    {
        slug: 'lire-une-image-pas-a-pas',
        progress: 38,
        nextStep: 'Pause active · Observations',
    },
    {
        slug: 'couleurs-et-emotions',
        progress: 12,
        nextStep: 'Introduction · Nuanciers sensibles',
    },
];

export default function TableauDeBordCoursPage() {
    type EnrolledCourse = Course & { progress: number; nextStep: string };

    const enrolledCourses: EnrolledCourse[] = enrolledProgress
        .map((item) => {
            const course = COURSES.find((c) => c.slug === item.slug);
            if (!course) return null;
            return { ...course, ...item };
        })
        .filter((course): course is EnrolledCourse => Boolean(course));

    const catalog = COURSES.filter((course) => !course.isMini);
    const miniCourse = COURSES.find((course) => course.isMini);

    return (
        <main className="space-y-10 md:space-y-12 py-8 md:py-12">
            <header className="relative overflow-hidden rounded-3xl bg-linear-to-br from-ivory to-white border border-perl/60 p-6 md:p-10">
                <div className="absolute inset-0 pointer-events-none" aria-hidden>
                    <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-sage/10 blur-3xl" />
                    <div className="absolute -left-12 bottom-0 h-52 w-52 rounded-full bg-main/5 blur-3xl" />
                </div>

                <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-3 md:max-w-2xl">
                        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-main/70">
                            <Sparkles className="h-4 w-4" />
                            Cours Explor’Art
                        </p>
                        <h1 className="font-serif-title text-2xl md:text-3xl text-main">Ton atelier de cours</h1>
                        <p className="text-sm md:text-base text-main/80">
                            Continue tes parcours en douceur, retrouve les modules qui t’attendent et découvre de nouveaux cours pour nourrir ta pratique.
                        </p>
                        <div className="flex flex-wrap gap-3 text-sm text-main/80">
                            <div className="flex items-center gap-2 rounded-full bg-white/80 border border-perl/60 px-3 py-1.5 shadow-sm">
                                <CheckCircle2 className="h-4 w-4 text-sage" />
                                <span>3 cours débloqués</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-white/80 border border-perl/60 px-3 py-1.5 shadow-sm">
                                <Clock className="h-4 w-4 text-main/70" />
                                <span>~4h pour te remettre en mouvement</span>
                            </div>
                        </div>
                    </div>

                    <Link
                        href="/cours"
                        className="group inline-flex items-center justify-center gap-2 self-start rounded-full border border-main/10 bg-main px-4 py-2 text-sm font-medium text-ivory shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        Découvrir le catalogue
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </header>

            <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-main/70">
                    <BookOpen className="h-4 w-4" />
                    Reprendre là où tu t’es arrêtée
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {enrolledCourses.map((course) => (
                        <article
                            key={course.slug}
                            className="group relative overflow-hidden rounded-3xl border border-perl/70 bg-white/95 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="absolute inset-0 pointer-events-none" aria-hidden>
                                <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-main/5 blur-3xl" />
                            </div>

                            <div className="relative flex items-start gap-3">
                                <div className="h-10 w-10 shrink-0 rounded-2xl bg-ivory border border-perl/60 flex items-center justify-center text-main/80">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[0.75rem] uppercase tracking-[0.16em] text-main/70">{course.pillarLabel}</p>
                                    <h2 className="font-serif-title text-lg text-main group-hover:text-main/90">{course.title}</h2>
                                    <p className="text-sm text-main/75 line-clamp-2">{course.tagline}</p>
                                </div>
                            </div>

                            <div className="mt-4 space-y-3">
                                <div className="flex items-center justify-between text-xs text-main/70">
                                    <span>Progression</span>
                                    <span className="font-medium text-main">{course.progress}%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-perl/30">
                                    <div className="h-full rounded-full bg-main transition-all" style={{ width: `${course.progress}%` }} />
                                </div>

                                <div className="flex items-center justify-between text-sm text-main/75">
                                    <span>{course.nextStep}</span>
                                    <Link
                                        href={`/cours/${course.slug}`}
                                        className="inline-flex items-center gap-2 rounded-full border border-perl/60 px-3 py-1.5 text-xs font-medium text-main transition hover:-translate-y-0.5 hover:border-main/60"
                                    >
                                        Continuer
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-main/70">
                    <Sparkles className="h-4 w-4" />
                    Catalogue Explor’Art
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {catalog.map((course) => (
                        <article
                            key={course.slug}
                            className="group flex flex-col rounded-3xl border border-perl/70 bg-white/95 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1">
                                    <p className="text-[0.75rem] uppercase tracking-[0.16em] text-main/70">{course.pillarLabel}</p>
                                    <h3 className="font-serif-title text-lg text-main group-hover:text-main/90">{course.title}</h3>
                                    <p className="text-sm text-main/75 line-clamp-2">{course.tagline}</p>
                                </div>
                                <div className="rounded-full bg-ivory border border-perl/60 px-3 py-1 text-xs font-medium text-main/80">
                                    {course.level === 'beginner' ? 'Débutant' : 'Intermédiaire'}
                                </div>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-main/70">
                                <span className="inline-flex items-center gap-2 rounded-full bg-ivory border border-perl/60 px-3 py-1">
                                    <Clock className="h-3.5 w-3.5" /> {course.durationMinutes} min
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-ivory border border-perl/60 px-3 py-1">{course.modulesCount} modules</span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-ivory border border-perl/60 px-3 py-1">{course.priceEUR}€</span>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <Link
                                    href={`/cours/${course.slug}`}
                                    className="inline-flex items-center gap-2 rounded-full bg-main px-3 py-2 text-xs font-medium text-ivory shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    Voir le cours
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                                <span className="text-xs text-main/65">Inclut intro & conclusion</span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {miniCourse && (
                <section className="relative overflow-hidden rounded-3xl border border-sage/40 bg-linear-to-r from-sage/15 via-white to-white p-6 md:p-8 shadow-sm">
                    <div className="absolute inset-0 pointer-events-none" aria-hidden>
                        <div className="absolute left-10 top-0 h-28 w-28 rounded-full bg-sage/30 blur-3xl" />
                        <div className="absolute right-4 bottom-0 h-24 w-24 rounded-full bg-main/10 blur-3xl" />
                    </div>

                    <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2 md:max-w-2xl">
                            <p className="text-[0.75rem] uppercase tracking-[0.16em] text-sage">Mini-parcours offert</p>
                            <h3 className="font-serif-title text-xl text-main">{miniCourse.title}</h3>
                            <p className="text-sm text-main/80">{miniCourse.tagline}</p>
                            <div className="flex flex-wrap gap-2 text-xs text-main/70">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-perl/60 px-3 py-1">
                                    <PlayCircle className="h-3.5 w-3.5" /> 3 modules guidés
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-perl/60 px-3 py-1">
                                    <Clock className="h-3.5 w-3.5" /> {miniCourse.durationMinutes} min
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-perl/60 px-3 py-1">Accessible à vie</span>
                            </div>
                        </div>

                        <Link
                            href={`/cours/${miniCourse.slug}`}
                            className="group inline-flex items-center justify-center gap-2 self-start rounded-full border border-sage/60 bg-main px-4 py-2 text-sm font-medium text-ivory shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            Commencer gratuitement
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </section>
            )}
        </main>
    );
}
