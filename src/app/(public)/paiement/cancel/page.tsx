// src/app/(public)/paiement/cancel/page.tsx
import Link from 'next/link';
import { AlertTriangle, ArrowLeft, ArrowRight } from 'lucide-react';

import { COURSES } from '@/lib/content/courses';

interface CancelPageProps {
    searchParams: Promise<{ course?: string }>;
}

export default async function PaymentCancelPage({ searchParams }: CancelPageProps) {
    const resolved = await searchParams;
    const courseSlug = resolved.course;

    const course = courseSlug ? COURSES.find((c) => c.slug === courseSlug) : undefined;

    return (
        <section className="relative overflow-hidden bg-ivory pt-8 pb-24 md:pt-20 md:pb-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(192,122,44,0.12),transparent_45%),radial-gradient(circle_at_80%_90%,rgba(180,92,119,0.1),transparent_50%)]" />

            <div className="container-page relative max-w-3xl space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[0.78rem] text-amber-700 border border-amber-200">
                    <AlertTriangle className="h-4 w-4" />
                    Paiement interrompu
                </div>

                <header className="space-y-3">
                    <h1 className="font-serif-title text-2xl md:text-3xl text-main">Le paiement n’a pas été finalisé</h1>
                    <p className="text-sm md:text-base text-main/75 max-w-xl">
                        Aucune somme n’a été débitée. Tu peux réessayer plus tard, choisir un autre cours ou revenir simplement au blog.
                    </p>
                </header>

                <div className="card space-y-4 bg-white/95 border-perl/70">
                    {course ? (
                        <>
                            <p className="text-sm text-main/75">
                                Le paiement pour le cours <span className="font-medium">{course.title}</span> a été interrompu.
                            </p>

                            <div className="flex flex-col gap-2 min-w-[220px] md:flex-row md:items-center md:gap-3">
                                <Link
                                    href={`/cours/${course.slug}`}
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-main px-4 py-2.5 text-sm font-medium text-ivory shadow-sm hover:bg-main/90 transition-colors"
                                >
                                    Revenir sur la page du cours
                                    <ArrowRight className="h-4 w-4" />
                                </Link>

                                <Link
                                    href="/cours"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-[0.85rem] font-medium text-main/75 hover:bg-background transition-colors"
                                >
                                    Voir tous les cours
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-sm text-main/75">
                                Nous n’avons pas réussi à identifier le cours associé. Si tu as un doute, vérifie dans ton historique Stripe / bancaire ou écris-nous.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Link
                                    href="/cours"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-main px-4 py-2.5 text-sm font-medium text-ivory hover:bg-main/90"
                                >
                                    Retour aux cours
                                </Link>
                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-[0.85rem] font-medium text-main/75 hover:bg-background"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Retour à l’accueil
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
