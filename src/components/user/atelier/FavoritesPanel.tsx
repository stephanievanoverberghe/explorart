'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { PanelHeader } from './PanelHeader';

type Status = 'loading' | 'ready' | 'error' | 'unauthenticated';

interface FavoriteItem {
    title: string;
    href: string;
    tag: string;
    pillarColorClass: string;
}

export function FavoritesPanel() {
    const [status, setStatus] = useState<Status>('loading');
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    useEffect(() => {
        async function fetchFavorites() {
            try {
                const response = await fetch('/api/users/me/favorites');

                if (response.status === 401) {
                    setStatus('unauthenticated');
                    return;
                }

                if (!response.ok) {
                    setStatus('error');
                    return;
                }

                const data = await response.json();
                setFavorites(Array.isArray(data.favorites) ? data.favorites : []);
                setStatus('ready');
            } catch (error) {
                console.error('[FETCH_FAVORITES_ERROR]', error);
                setStatus('error');
            }
        }

        void fetchFavorites();
    }, []);

    const hasFavorites = favorites.length > 0;
    const totalFavorites = favorites.length;

    if (status === 'loading') {
        return (
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="Favoris Explor'Art">
                {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="h-40 rounded-3xl border border-perl/40 bg-ivory/80 animate-pulse" />
                ))}
            </section>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <section className="card border-perl/60 bg-white/96 space-y-3" aria-label="Favoris Explor'Art">
                <h3 className="font-serif-title text-[1.05rem] text-main">Connecte-toi pour retrouver tes favoris</h3>
                <p className="text-sm text-main/75">Tes articles favoris resteront enregistrés ici. Connecte-toi pour voir ta constellation personnelle.</p>
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
            </section>
        );
    }

    if (status === 'error') {
        return <section className="card border-rose/30 bg-rose/5 text-rose-800 text-sm">Une erreur est survenue en récupérant tes favoris.</section>;
    }

    if (!hasFavorites) {
        return (
            <section
                className="relative overflow-hidden
                        rounded-3xl border border-dashed border-perl/60
                        bg-white/95 backdrop-blur-sm
                        px-6 py-8 md:px-8 md:py-10
                        shadow-sm
                        flex flex-col items-center text-center gap-5"
                aria-label="Favoris Explor'Art"
            >
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/60 shadow-[inset_0_0_15px_rgba(0,0,0,0.03)]" />

                <div className="relative flex flex-col items-center gap-5 max-w-xl">
                    <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-rose/12 shadow-xxs ring-1 ring-rose/20">
                        <Star className="h-7 w-7 text-rose/80" />
                    </div>

                    <div className="space-y-2">
                        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Tes repères à venir</p>
                        <h2 className="font-serif-title text-xl md:text-2xl text-main">Pas encore d’étoile épinglée</h2>
                        <p className="mx-auto max-w-xl text-sm md:text-base text-main/70">
                            Dès que tu mettras une étoile sur un article, il apparaîtra ici pour t’attendre sagement. En attendant, flâne dans les 7 piliers et commence ta petite
                            constellation personnelle.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 pt-1">
                        <Link
                            href="/articles"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-main px-4 py-2.5 text-sm font-medium text-ivory shadow-sm transition hover:-translate-y-0.5 hover:bg-main/90"
                        >
                            <span>Explorer les articles</span>
                            <span aria-hidden>↗</span>
                        </Link>
                        <Link
                            href="/categories"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-ivory px-4 py-2.5 text-sm font-medium text-main/80 transition hover:-translate-y-0.5 hover:border-sage/70 hover:bg-sage/5"
                        >
                            <span>Voir les 7 piliers</span>
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="space-y-6 md:space-y-7" aria-label="Favoris Explor'Art">
            <PanelHeader
                kicker="Favoris"
                title="Tes étoiles Explor'Art"
                description="Les articles que tu gardes près de toi, pour rouvrir une idée, une couleur ou un élan créatif en un clic."
                chipsSlot={
                    <>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 shadow-xxs ring-1 ring-perl/40">
                            <Star className="h-3.5 w-3.5 text-rose/80" />
                            <span>
                                {totalFavorites} repère{totalFavorites > 1 ? 's' : ''} en poche
                            </span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/10 px-3 py-1 text-sage shadow-xxs">
                            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                            <span>À revisiter régulièrement</span>
                        </span>
                    </>
                }
                rightSlot={
                    <>
                        <Link
                            href="/articles"
                            className="inline-flex flex-1 md:flex-none items-center justify-center gap-2 rounded-full bg-sage px-4 py-2.5 text-sm font-medium text-ivory shadow-sm transition hover:-translate-y-0.5 hover:bg-sage/80"
                        >
                            <span>Ajouter un nouvel article</span>
                            <span aria-hidden>+</span>
                        </Link>
                        <Link
                            href="/categories"
                            className="inline-flex flex-1 md:flex-none items-center justify-center gap-2 rounded-full border border-perl/70 bg-ivory px-4 py-2.5 text-sm font-medium text-main/80 transition hover:-translate-y-0.5 hover:border-sage/70 hover:bg-sage/5"
                        >
                            <span>Explorer les 7 piliers</span>
                        </Link>
                    </>
                }
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {favorites.map((fav, index) => (
                    <Link
                        key={fav.href}
                        href={fav.href}
                        className="group relative flex h-full flex-col gap-3 rounded-2xl border border-perl/50 bg-white/95 p-4 shadow-xxs transition-all hover:-translate-y-0.5 hover:border-sage/70 hover:shadow-sm"
                    >
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-2xl bg-linear-to-t from-ivory/80 to-transparent opacity-0 transition group-hover:opacity-100" />

                        <div className="relative flex items-center justify-between gap-2">
                            <div className="inline-flex items-center gap-2 rounded-full bg-ivory px-2.5 py-1 text-[0.78rem] text-main/70 shadow-xxs">
                                <span className={`h-1.5 w-1.5 rounded-full ${fav.pillarColorClass}`} />
                                <span className="truncate max-w-40 sm:max-w-48">{fav.tag}</span>
                            </div>

                            <div className="inline-flex items-center gap-1 rounded-full bg-rose/10 px-2.5 py-1 text-[0.72rem] text-rose/80">
                                <Star className="h-3.5 w-3.5" />
                                <span>Favori #{index + 1}</span>
                            </div>
                        </div>

                        <h3 className="relative z-10 font-serif-title text-base md:text-lg text-main transition group-hover:text-main group-hover:underline decoration-1 underline-offset-4">
                            {fav.title}
                        </h3>

                        <p className="relative z-10 text-[0.83rem] leading-relaxed text-main/65">
                            Clique pour rouvrir l’article à tout moment. Plus tard, tu pourras organiser tes favoris par thèmes, saisons ou projets en cours.
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
