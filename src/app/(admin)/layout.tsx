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
            <main className="container-page space-y-6 py-10">
                <section className="rounded-3xl border border-perl/60 bg-white/90 px-6 py-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="space-y-2">
                            <p className="text-xs uppercase tracking-[0.2em] text-main/40">Espace administratif</p>
                            <h1 className="font-serif-title text-2xl md:text-3xl text-main">Dashboard Explor&apos;Art</h1>
                            <p className="text-sm text-main/60">Une vue claire pour orchestrer les cours, les formations et la communauté créative.</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button className="rounded-full border border-main px-4 py-2 text-sm font-medium text-main transition hover:bg-main hover:text-white">
                                Exporter les rapports
                            </button>
                            <button className="rounded-full bg-main px-4 py-2 text-sm font-medium text-white transition hover:bg-main/90">Créer un nouveau contenu</button>
                        </div>
                    </div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {[
                            { label: 'UX score global', value: '92/100', detail: 'Basé sur 7 parcours actifs' },
                            { label: 'Temps moyen de progression', value: '3h20', detail: 'Sur les cours en autonomie' },
                            { label: 'Satisfaction apprenants', value: '4,8/5', detail: 'Avis collectés ce trimestre' },
                        ].map((item) => (
                            <div key={item.label} className="rounded-2xl border border-perl/60 bg-page px-4 py-4">
                                <p className="text-xs uppercase tracking-wide text-main/50">{item.label}</p>
                                <p className="mt-2 text-lg font-semibold text-main">{item.value}</p>
                                <p className="mt-1 text-xs text-main/60">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
                    <AdminSidebar />
                    <section className="rounded-3xl border border-perl/60 bg-white/90 px-6 py-8 shadow-sm">{children}</section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
