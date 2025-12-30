// src/app/(admin)/layout.tsx
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/session';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== 'admin') {
        redirect('/connexion?redirect=/admin');
    }

    return (
        <div className="min-h-screen bg-page text-main">
            <Header />

            {/* ✅ Container + marges + rythme vertical */}
            <main className="mx-auto w-full max-w-368 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 md:py-10">
                <div className="space-y-6 md:space-y-8">
                    {/* ✅ Bandeau admin global (simple & cohérent) */}
                    <section className="rounded-3xl border border-perl/60 bg-white/90 shadow-sm">
                        <div className="px-5 py-5 sm:px-7 sm:py-6 lg:px-10">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div className="space-y-1.5">
                                    <p className="text-[0.7rem] uppercase tracking-[0.22em] text-main/50">Espace administratif</p>
                                    <h1 className="font-serif-title text-2xl md:text-3xl text-main">Dashboard Explor&apos;Art</h1>
                                    <p className="text-sm text-main/65">Une vue claire pour orchestrer les cours, les formations et la communauté créative.</p>
                                </div>

                                {/* (option) zone actions globales si tu veux, sinon laisse vide */}
                                <div className="hidden md:block" />
                            </div>
                        </div>
                    </section>

                    {/* ✅ Grille sidebar + contenu (avec marges & padding cohérents) */}
                    <div className="grid gap-6 lg:gap-8 lg:grid-cols-[300px_minmax(0,1fr)] items-start">
                        <aside className="lg:sticky lg:top-24">
                            <div className="rounded-3xl border border-perl/60 bg-white/90 shadow-sm">
                                <div className="p-2 sm:p-5">
                                    <AdminSidebar />
                                </div>
                            </div>
                        </aside>

                        <section className="rounded-3xl border border-perl/60 bg-white/90 shadow-sm">
                            <div className="p-5 sm:p-6 lg:p-5">{children}</div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
