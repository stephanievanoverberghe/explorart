// src/app/(public)/paiement/success/page.tsx
import Link from 'next/link';
import { CheckCircle2, ArrowRight, BookOpenCheck } from 'lucide-react';

import { COURSES } from '@/lib/content/courses';
import { getAuthUser } from '@/lib/auth/session';
import { saveCoursePurchase } from '@/lib/purchases/saveCoursePurchase';

interface SuccessPageProps {
    searchParams: Promise<{ course?: string }>;
}

export default async function PaymentSuccessPage({ searchParams }: SuccessPageProps) {
    const resolved = await searchParams;
    const courseSlug = resolved.course;

    const authUser = await getAuthUser();

    if (courseSlug) {
        const saveResult = await saveCoursePurchase({ userId: authUser?.userId, courseSlug });

        if (saveResult.status === 'error') {
            console.error('[PAYMENT_SUCCESS_SAVE_PURCHASE_ERROR]', saveResult.message);
        }
    }

    const course = courseSlug ? COURSES.find((c) => c.slug === courseSlug) : undefined;

    return (
        <section className="relative overflow-hidden bg-ivory pt-8 pb-24 md:pt-20 md:pb-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(123,164,143,0.13),transparent_45%),radial-gradient(circle_at_80%_90%,rgba(30,61,114,0.12),transparent_50%)]" />

            <div className="container-page relative max-w-3xl space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-sage/10 px-3 py-1 text-[0.78rem] text-sage border border-sage/30">
                    <CheckCircle2 className="h-4 w-4" />
                    Paiement confirmé
                </div>

                <header className="space-y-3">
                    <h1 className="font-serif-title text-2xl md:text-3xl text-main">Merci, ton paiement est bien passé ✨</h1>
                    <p className="text-sm md:text-base text-main/75 max-w-xl">
                        Tu viens de débloquer un nouveau cours Explor’Art. Tu vas recevoir un mail de confirmation avec ton reçu et le lien d’accès. Tu peux aussi y accéder tout de
                        suite ci-dessous.
                    </p>
                </header>

                <div className="card space-y-4 border-sage/40 bg-white/95">
                    {course ? (
                        <>
                            <div className="space-y-1">
                                <p className="text-[0.8rem] text-main/70">Cours débloqué</p>
                                <h2 className="font-serif-title text-lg text-main">{course.title}</h2>
                                <p className="text-sm text-main/70">{course.tagline}</p>
                            </div>

                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div className="space-y-1 text-[0.85rem] text-main/70">
                                    <p>Tu peux :</p>
                                    <ul className="list-disc list-inside space-y-0.5">
                                        <li>Commencer le cours dès maintenant</li>
                                        <li>Le retrouver plus tard dans ton espace « Mes cours »</li>
                                    </ul>
                                </div>

                                <div className="flex flex-col gap-2 min-w-[220px]">
                                    <Link
                                        href={`/cours/${course.slug}`}
                                        className="inline-flex items-center justify-center gap-2 rounded-full bg-main px-4 py-2.5 text-sm font-medium text-ivory shadow-sm hover:bg-main/90 transition-colors"
                                    >
                                        Ouvrir le cours maintenant
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>

                                    <Link
                                        href="/tableau-de-bord/cours"
                                        className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-[0.85rem] font-medium text-main/75 hover:bg-background transition-colors"
                                    >
                                        Voir tous mes cours
                                        <BookOpenCheck className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-sm text-main/75">
                                Ton paiement est confirmé, mais nous n’avons pas pu identifier le cours associé dans l’URL. Pas de panique : utilise le lien dans ton mail de
                                confirmation, ou passe par « Mes cours ».
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Link
                                    href="/tableau-de-bord/cours"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-main px-4 py-2.5 text-sm font-medium text-ivory hover:bg-main/90"
                                >
                                    Accéder à mes cours
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/cours"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-[0.85rem] font-medium text-main/75 hover:bg-background"
                                >
                                    Retour aux cours
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
