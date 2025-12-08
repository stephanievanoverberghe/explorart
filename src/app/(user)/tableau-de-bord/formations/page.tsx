// src/app/(user)/tableau-de-bord/formations/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Clock, Layers, Sparkles } from 'lucide-react';

import { FORMATIONS } from '@/lib/content/formations';

type PurchasedFormation = {
    slug: string;
    title: string;
    tagline: string;
    pillarLabel: string;
    modulesCount: number;
    approximateHours: number;
    purchasedAt: string;
};

export default function TableauDeBordFormationsPage() {
    const [formations, setFormations] = useState<PurchasedFormation[]>([]);
    const [status, setStatus] = useState<'loading' | 'ready' | 'error' | 'unauthenticated'>('loading');

    useEffect(() => {
        async function fetchFormations() {
            try {
                const res = await fetch('/api/users/me/formations');

                if (res.status === 401) {
                    setStatus('unauthenticated');
                    return;
                }

                const data = await res.json();
                setFormations(Array.isArray(data.formations) ? data.formations : []);
                setStatus('ready');
            } catch (error) {
                console.error('[FETCH_FORMATIONS_ERROR]', error);
                setStatus('error');
            }
        }

        void fetchFormations();
    }, []);

    const catalog = useMemo(() => FORMATIONS, []);

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
                            Formations Explor’Art
                        </p>
                        <h1 className="font-serif-title text-2xl md:text-3xl text-main">Ton espace formation</h1>
                        <p className="text-sm md:text-base text-main/80">Retrouve les formations que tu as achetées et prépare ton prochain voyage créatif.</p>
                        {status === 'ready' && (
                            <div className="flex flex-wrap gap-3 text-sm text-main/80">
                                <div className="flex items-center gap-2 rounded-full bg-white/80 border border-perl/60 px-3 py-1.5 shadow-sm">
                                    <CheckCircle2 className="h-4 w-4 text-sage" />
                                    <span>
                                        {formations.length === 0
                                            ? 'Aucune formation débloquée pour le moment'
                                            : `${formations.length} formation${formations.length > 1 ? 's' : ''} débloquée${formations.length > 1 ? 's' : ''}`}
                                    </span>
                                </div>
                                {formations.length > 0 && (
                                    <div className="flex items-center gap-2 rounded-full bg-white/80 border border-perl/60 px-3 py-1.5 shadow-sm">
                                        <Clock className="h-4 w-4 text-main/70" />
                                        <span>Accès dès l’ouverture officielle</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <Link
                        href="/formations"
                        className="group inline-flex items-center justify-center gap-2 self-start rounded-full border border-main/10 bg-main px-4 py-2 text-sm font-medium text-ivory shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        Découvrir les formations
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </header>

            <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-main/70">
                    <BookOpen className="h-4 w-4" />
                    Tes formations réservées
                </div>

                {status === 'loading' && (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {[...Array(3)].map((_, idx) => (
                            <div key={idx} className="h-48 rounded-3xl border border-perl/40 bg-ivory/80 animate-pulse" />
                        ))}
                    </div>
                )}

                {status === 'unauthenticated' && (
                    <div className="card border-perl/60 bg-white/95 text-main/80">
                        <p className="font-medium text-main">Connecte-toi ou crée un compte pour retrouver tes formations.</p>
                        <div className="flex flex-wrap gap-2 pt-3">
                            <Link
                                href="/auth/login"
                                className="inline-flex items-center gap-2 rounded-full bg-main px-4 py-2 text-sm font-medium text-ivory shadow-sm hover:bg-main/90"
                            >
                                Me connecter
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/auth/register"
                                className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-[0.85rem] font-medium text-main/75 hover:bg-background"
                            >
                                Créer un compte
                            </Link>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="card border-red-100 bg-red-50 text-red-700">Une erreur est survenue en récupérant tes formations. Réessaie dans quelques instants.</div>
                )}

                {status === 'ready' && formations.length === 0 && (
                    <div className="card border-perl/60 bg-white/95 text-main/80">
                        <p className="font-medium text-main">Aucune formation achetée pour l’instant.</p>
                        <p className="text-sm text-main/70">Lorsque tu achètes une formation, elle apparaîtra ici automatiquement après validation du paiement Stripe.</p>
                    </div>
                )}

                {status === 'ready' && formations.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {formations.map((formation) => (
                            <article
                                key={formation.slug}
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
                                        <p className="text-[0.75rem] uppercase tracking-[0.16em] text-main/70">{formation.pillarLabel}</p>
                                        <h2 className="font-serif-title text-lg text-main group-hover:text-main/90">{formation.title}</h2>
                                        <p className="text-sm text-main/75 line-clamp-2">{formation.tagline}</p>
                                    </div>
                                </div>

                                <div className="mt-4 space-y-3">
                                    <div className="flex items-center justify-between text-sm text-main/75">
                                        <span>Achetée le {new Date(formation.purchasedAt).toLocaleDateString('fr-FR')}</span>
                                        <Link
                                            href={`/formations/${formation.slug}`}
                                            className="inline-flex items-center gap-2 rounded-full border border-perl/60 px-3 py-1.5 text-xs font-medium text-main transition hover:-translate-y-0.5 hover:border-main/60"
                                        >
                                            Voir la présentation
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </Link>
                                    </div>

                                    <div className="flex flex-wrap gap-2 text-xs text-main/70">
                                        <span className="inline-flex items-center gap-2 rounded-full bg-ivory border border-perl/60 px-3 py-1">
                                            <Clock className="h-3.5 w-3.5" /> ≈ {formation.approximateHours} h guidées
                                        </span>
                                        <span className="inline-flex items-center gap-2 rounded-full bg-ivory border border-perl/60 px-3 py-1">
                                            <Layers className="h-3.5 w-3.5" /> {formation.modulesCount} modules
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-main/70">
                    <Sparkles className="h-4 w-4" />
                    Catalogue Explor’Art
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {catalog.map((formation) => (
                        <article
                            key={formation.slug}
                            className="group flex flex-col rounded-3xl border border-perl/70 bg-white/95 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1">
                                    <p className="text-[0.75rem] uppercase tracking-[0.16em] text-main/70">{formation.pillarLabel}</p>
                                    <h3 className="font-serif-title text-lg text-main group-hover:text-main/90">{formation.title}</h3>
                                    <p className="text-sm text-main/75 line-clamp-2">{formation.tagline}</p>
                                </div>
                                <span className="rounded-full bg-ivory border border-perl/60 px-3 py-1 text-xs text-main/80">≈ {formation.approximateHours} h</span>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2 text-xs text-main/70">
                                <span className="inline-flex items-center gap-2 rounded-full bg-ivory border border-perl/60 px-3 py-1">
                                    <Layers className="h-3.5 w-3.5" /> {formation.modulesCount} modules
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-ivory border border-perl/60 px-3 py-1">
                                    <Clock className="h-3.5 w-3.5" /> Niveau {formation.level}
                                </span>
                            </div>

                            <div className="mt-4 flex items-center justify-between text-sm text-main">
                                <span className="font-medium">{formation.priceEUR.toString().replace('.', ',')} €</span>
                                <Link
                                    href={`/formations/${formation.slug}`}
                                    className="inline-flex items-center gap-2 rounded-full border border-perl/60 px-3 py-1.5 text-xs font-medium text-main transition hover:-translate-y-0.5 hover:border-main/60"
                                >
                                    Voir les détails
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
