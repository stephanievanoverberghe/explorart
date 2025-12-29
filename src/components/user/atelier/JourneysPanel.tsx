'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, Clock, Layers } from 'lucide-react';
import { PanelHeader } from './PanelHeader';

type Status = 'loading' | 'ready' | 'error' | 'unauthenticated';

interface PurchasedCourse {
    slug: string;
    title: string;
    tagline: string;
    pillarLabel: string;
    durationMinutes: number;
    modulesCount: number;
    purchasedAt: string;
}

interface PurchasedFormation {
    slug: string;
    title: string;
    tagline: string;
    pillarLabel: string;
    approximateHours: number;
    modulesCount: number;
    purchasedAt: string;
}

export function JourneysPanel() {
    const [status, setStatus] = useState<Status>('loading');
    const [courses, setCourses] = useState<PurchasedCourse[]>([]);
    const [formations, setFormations] = useState<PurchasedFormation[]>([]);

    useEffect(() => {
        async function fetchJourneys() {
            try {
                const [coursesRes, formationsRes] = await Promise.all([fetch('/api/users/me/courses'), fetch('/api/users/me/formations')]);

                if (coursesRes.status === 401 || formationsRes.status === 401) {
                    setStatus('unauthenticated');
                    return;
                }

                if (!coursesRes.ok || !formationsRes.ok) {
                    setStatus('error');
                    return;
                }

                const coursesData = await coursesRes.json();
                const formationsData = await formationsRes.json();

                setCourses(Array.isArray(coursesData.courses) ? coursesData.courses : []);
                setFormations(Array.isArray(formationsData.formations) ? formationsData.formations : []);
                setStatus('ready');
            } catch (e) {
                console.error('[FETCH_JOURNEYS_ERROR]', e);
                setStatus('error');
            }
        }

        void fetchJourneys();
    }, []);

    const hasAnyJourney = courses.length > 0 || formations.length > 0;

    return (
        <section className="space-y-7 md:space-y-10" aria-label="Parcours Explor'Art">
            {/* Loading */}
            {status === 'loading' && (
                <div className="grid gap-4 md:grid-cols-2">
                    {[...Array(3)].map((_, idx) => (
                        <div key={idx} className="h-40 rounded-3xl border border-perl/40 bg-ivory/80 animate-pulse" />
                    ))}
                </div>
            )}

            {/* Unauth */}
            {status === 'unauthenticated' && (
                <div className="card border-perl/60 bg-white/96 space-y-3">
                    <h3 className="font-serif-title text-[1.05rem] text-main">Retrouver tes parcours Explor&apos;Art</h3>
                    <p className="text-sm text-main/75">
                        Connecte-toi pour voir les cours et formations que tu as déjà débloqués. Tu pourras les reprendre à ton rythme, sans perdre le fil.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                        <Link href="/connexion" className="inline-flex items-center gap-2 rounded-full bg-main px-4 py-2 text-sm font-medium text-ivory shadow-sm hover:bg-main/90">
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

            {/* Error */}
            {status === 'error' && (
                <div className="card border-rose/30 bg-rose/5 text-rose-800 text-sm">Une erreur est survenue en récupérant tes parcours. Réessaie dans quelques instants.</div>
            )}

            {/* Empty */}
            {status === 'ready' && !hasAnyJourney && (
                <div className="card border-perl/60 bg-white/96 space-y-3">
                    <h3 className="font-serif-title text-[1.05rem] text-main">Tu n&apos;as pas encore de parcours débloqué</h3>
                    <p className="text-sm text-main/75">
                        Dès que tu achèteras un cours ou une formation Explor&apos;Art, tu le retrouveras automatiquement ici. En attendant, tu peux :
                    </p>
                    <ul className="text-sm text-main/75 list-disc list-inside space-y-1">
                        <li>Explorer les cours individuels pour tester un sujet précis</li>
                        <li>Découvrir les futures formations pour t&apos;engager plus en profondeur</li>
                        <li>Commencer par la mini-formation gratuite &quot;Commencer ici&quot;</li>
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-1">
                        <Link href="/cours" className="inline-flex items-center gap-2 rounded-full bg-main px-4 py-2 text-sm font-medium text-ivory shadow-sm hover:bg-main/90">
                            Voir les cours
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/formations"
                            className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-[0.85rem] font-medium text-main/80 hover:bg-background"
                        >
                            Voir les formations
                        </Link>
                        <Link
                            href="/commencer-ici"
                            className="inline-flex items-center gap-2 rounded-full border border-sage/60 bg-ivory px-4 py-2 text-[0.85rem] font-medium text-sage hover:bg-white"
                        >
                            Commencer la mini-formation offerte
                        </Link>
                    </div>
                </div>
            )}

            {/* ✅ Ready + contenu : PanelHeader + colonnes */}
            {status === 'ready' && hasAnyJourney && (
                <>
                    <PanelHeader
                        kicker="Parcours guidés"
                        title="Cours & formations qui t'accompagnent dans le temps"
                        description="Ici, tu retrouves les parcours que tu as vraiment engagés : les cours individuels pour des sujets ciblés, et les formations plus longues pour des transformations profondes. Tu peux les rouvrir quand tu veux, même des mois plus tard."
                        chipsSlot={
                            <>
                                <StatChip label="Cours débloqués" value={courses.length.toString()} />
                                <StatChip label="Formations débloquées" value={formations.length.toString()} />
                            </>
                        }
                    />

                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] items-start">
                        {/* Colonne cours */}
                        <section className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                                <div className="space-y-0.5">
                                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/70">Cours & mini-parcours</p>
                                    <p className="text-sm text-main/75">Des formats compacts pour explorer un sujet précis en quelques sessions.</p>
                                </div>
                                {courses.length > 0 && (
                                    <span className="rounded-full bg-ivory px-3 py-1 text-[0.75rem] text-main/70 border border-perl/60">{courses.length} cours</span>
                                )}
                            </div>

                            {courses.length === 0 ? (
                                <div className="card border-perl/60 bg-ivory/80 text-sm text-main/75">
                                    Aucun cours débloqué pour l&apos;instant. Tu pourras ajouter des parcours plus courts ici.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {courses.map((course) => (
                                        <CourseJourneyCard key={course.slug} course={course} />
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Colonne formations */}
                        <section className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                                <div className="space-y-0.5">
                                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/70">Formations longues</p>
                                    <p className="text-sm text-main/75">Des voyages plus profonds, structurés en plusieurs modules, pour changer ta manière d&apos;apprendre.</p>
                                </div>
                                {formations.length > 0 && (
                                    <span className="rounded-full bg-ivory px-3 py-1 text-[0.75rem] text-main/70 border border-perl/60">
                                        {formations.length} formation{formations.length > 1 ? 's' : ''}
                                    </span>
                                )}
                            </div>

                            {formations.length === 0 ? (
                                <div className="card border-perl/60 bg-ivory/80 text-sm text-main/75">
                                    Tu n&apos;as pas encore de formation débloquée. Tu pourras les retrouver ici une fois achetées.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {formations.map((formation) => (
                                        <FormationJourneyCard key={formation.slug} formation={formation} />
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                </>
            )}
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/*  Petits composants                                                          */
/* -------------------------------------------------------------------------- */

function StatChip({ label, value }: { label: string; value: string }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full bg-ivory/90 border border-perl/60 px-3 py-1.5 shadow-xxs">
            <BookOpenCheck className="h-3.5 w-3.5 text-main/75" />
            <span className="text-[0.78rem] text-main/70">
                {label} : <span className="font-medium text-main">{value}</span>
            </span>
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

function CourseJourneyCard({ course }: { course: PurchasedCourse }) {
    return (
        <article className="relative overflow-hidden rounded-2xl border border-perl/60 bg-white/96 px-4 py-3.5 shadow-xs">
            <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light bg-[radial-gradient(circle_at_100%_0%,rgba(63,132,114,0.18)_0,transparent_55%)]" />
            <div className="relative flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/65">{course.pillarLabel}</p>
                        <h3 className="font-serif-title text-[1rem] text-main line-clamp-2">{course.title}</h3>
                        <p className="text-[0.85rem] text-main/75 line-clamp-2">{course.tagline}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-[0.75rem] text-main/65">
                        <span className="inline-flex items-center gap-1 rounded-full bg-ivory px-2.5 py-1 border border-perl/60">
                            <Clock className="h-3.5 w-3.5" />
                            {course.durationMinutes} min
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-ivory px-2.5 py-1 border border-perl/60">
                            <Layers className="h-3.5 w-3.5" />
                            {course.modulesCount} modules
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[0.8rem] text-main/70">
                    <span>Acheté le {formatDateFr(course.purchasedAt)}</span>
                    <Link
                        href={`/cours/${course.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-main px-3 py-1.5 text-[0.8rem] font-medium text-ivory shadow-sm hover:bg-main/90"
                    >
                        Reprendre ce cours
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            </div>
        </article>
    );
}

function FormationJourneyCard({ formation }: { formation: PurchasedFormation }) {
    return (
        <article className="relative overflow-hidden rounded-2xl border border-perl/60 bg-ivory/96 px-4 py-3.5 shadow-xs">
            <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light bg-[radial-gradient(circle_at_0%_100%,rgba(30,61,114,0.16)_0,transparent_55%)]" />
            <div className="relative flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/65">{formation.pillarLabel}</p>
                        <h3 className="font-serif-title text-[1rem] text-main line-clamp-2">{formation.title}</h3>
                        <p className="text-[0.85rem] text-main/75 line-clamp-2">{formation.tagline}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-[0.75rem] text-main/65">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 border border-perl/60">
                            <Clock className="h-3.5 w-3.5" />≈ {formation.approximateHours} h
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 border border-perl/60">
                            <Layers className="h-3.5 w-3.5" />
                            {formation.modulesCount} modules
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[0.8rem] text-main/70">
                    <span>Achetée le {formatDateFr(formation.purchasedAt)}</span>
                    <Link
                        href={`/formations/${formation.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-main/70 bg-main px-3 py-1.5 text-[0.8rem] font-medium text-ivory shadow-sm hover:bg-main/90"
                    >
                        Ouvrir la formation
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
