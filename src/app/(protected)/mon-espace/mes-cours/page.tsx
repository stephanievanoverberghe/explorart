// src/app/(protected)/mon-espace/mes-cours/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Loader2 } from 'lucide-react';

import { COURSES, type Course } from '@/lib/content/courses';

type UserMe = {
    id: string;
    email: string;
    // TODO: adapte ce champ à ton vrai modèle user
    purchasedCourseSlugs: string[];
};

export default function MesCoursPage() {
    const [user, setUser] = useState<UserMe | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const run = async () => {
            try {
                const res = await fetch('/api/users/me');
                if (!res.ok) throw new Error('Impossible de récupérer le profil utilisateur.');

                const data = await res.json();

                // TODO: adapte le mapping ici si ton API renvoie autre chose
                const mapped: UserMe = {
                    id: data.id,
                    email: data.email,
                    purchasedCourseSlugs: data.purchasedCourseSlugs ?? [],
                };

                setUser(mapped);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'Erreur inconnue.';
                setError(message);
            } finally {
                setIsLoading(false);
            }
        };

        void run();
    }, []);

    const purchasedCourses: Course[] = user?.purchasedCourseSlugs?.length ? COURSES.filter((c) => user.purchasedCourseSlugs.includes(c.slug)) : [];

    return (
        <section className="relative overflow-hidden bg-ivory pt-8 pb-24 md:pt-16 md:pb-28">
            <div className="container-page space-y-8">
                <header className="space-y-2">
                    <p className="text-[0.75rem] uppercase tracking-[0.18em] text-main/70">Mon espace</p>
                    <h1 className="font-serif-title text-2xl md:text-3xl text-main">Mes cours Explor’Art</h1>
                    <p className="text-sm md:text-base text-main/75">Retrouve ici tous les cours que tu as déjà débloqués. Tu peux les recommencer autant de fois que tu veux.</p>
                </header>

                {isLoading && (
                    <div className="flex items-center gap-2 text-main/70 text-sm">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Chargement de tes cours…
                    </div>
                )}

                {error && <p className="text-sm text-red-600">{error}</p>}

                {!isLoading && !error && purchasedCourses.length === 0 && (
                    <div className="card space-y-3 bg-white/95 border-perl/70">
                        <p className="text-sm text-main/80">Tu n’as pas encore de cours débloqués.</p>
                        <Link href="/cours" className="inline-flex items-center gap-2 rounded-full bg-main px-4 py-2 text-sm font-medium text-ivory hover:bg-main/90">
                            Découvrir les cours Explor’Art
                        </Link>
                    </div>
                )}

                {!isLoading && !error && purchasedCourses.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {purchasedCourses.map((course) => (
                            <Link
                                key={course.slug}
                                href={`/cours/${course.slug}`}
                                className="group rounded-2xl border border-perl/70 bg-white/95 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <h2 className="font-serif-title text-[1rem] text-main group-hover:text-main/90">{course.title}</h2>
                                    <BookOpen className="h-4 w-4 text-main/60" />
                                </div>
                                <p className="mt-1 text-[0.85rem] text-main/70 line-clamp-2">{course.tagline}</p>
                                <p className="mt-2 text-[0.8rem] text-main/60">
                                    {course.modulesCount} modules · {course.durationMinutes} min · {course.pillarLabel}
                                </p>
                                <p className="mt-2 text-[0.8rem] font-medium text-sage">Continuer le cours ↗</p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
