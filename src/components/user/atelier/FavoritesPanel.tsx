// src/components/user/atelier/FavoritesPanel.tsx
import Link from 'next/link';
import { Star } from 'lucide-react';
import { mockFavorites } from './atelier-data';

export function FavoritesPanel() {
    const hasFavorites = mockFavorites.length > 0;
    const totalFavorites = mockFavorites.length;

    if (!hasFavorites) {
        return (
            <section
                className="relative overflow-hidden rounded-3xl border border-perl/60 bg-linear-to-br from-white via-ivory/88 to-white p-7 md:p-9 text-center shadow-md"
                aria-label="Favoris Explor'Art"
            >
                {/* halo */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.16] bg-[radial-gradient(circle_at_18%_22%,#b45c77_0,transparent_46%),radial-gradient(circle_at_82%_82%,#3a6c60_0,transparent_46%)]" />
                <div className="pointer-events-none absolute inset-4 rounded-[1.75rem] border border-perl/30" />

                <div className="relative space-y-5">
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
        <section className="space-y-5 md:space-y-7" aria-label="Favoris Explor'Art">
            {/* Bandeau résumé */}
            <header className="rounded-3xl border border-perl/50 bg-white/95 px-5 py-4 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    {/* Bloc texte + badges */}
                    <div className="space-y-2 max-w-2xl">
                        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Favoris</p>
                        <h2 className="font-serif-title text-xl md:text-2xl text-main">Tes étoiles Explor&apos;Art</h2>
                        <p className="text-sm text-main/70">Les articles que tu gardes près de toi, pour rouvrir une idée, une couleur ou un élan créatif en un clic.</p>

                        <div className="flex flex-wrap gap-2 pt-1 text-[0.82rem] text-main/70">
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
                        </div>
                    </div>

                    {/* CTA – full width sur mobile, au bout à droite dès md */}
                    <div className="mt-1 flex w-full flex-wrap gap-2 text-sm font-medium md:mt-0 md:w-auto md:justify-end">
                        <Link
                            href="/articles"
                            className="inline-flex flex-1 md:flex-none items-center justify-center gap-2 rounded-full bg-sage px-4 py-2.5 text-ivory shadow-sm transition hover:-translate-y-0.5 hover:bg-sage/80"
                        >
                            <span>Ajouter un nouvel article</span>
                            <span aria-hidden>+</span>
                        </Link>
                        <Link
                            href="/categories"
                            className="inline-flex flex-1 md:flex-none items-center justify-center gap-2 rounded-full border border-perl/70 bg-ivory px-4 py-2.5 text-main/80 transition hover:-translate-y-0.5 hover:border-sage/70 hover:bg-sage/5"
                        >
                            <span>Explorer les 7 piliers</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Grille des favoris */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {mockFavorites.map((fav, index) => (
                    <Link
                        key={fav.href}
                        href={fav.href}
                        className="group relative flex h-full flex-col gap-3 rounded-2xl border border-perl/50 bg-white/95 p-4 shadow-xxs transition-all hover:-translate-y-0.5 hover:border-sage/70 hover:shadow-sm"
                    >
                        {/* voile bas au hover */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-2xl bg-linear-to-t from-ivory/80 to-transparent opacity-0 transition group-hover:opacity-100" />

                        {/* Ligne tags */}
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

                        {/* Titre */}
                        <h3 className="relative z-10 font-serif-title text-base md:text-lg text-main transition group-hover:text-main group-hover:underline decoration-1 underline-offset-4">
                            {fav.title}
                        </h3>

                        {/* Texte helper */}
                        <p className="relative z-10 text-[0.83rem] leading-relaxed text-main/65">
                            Clique pour rouvrir l’article à tout moment. Plus tard, tu pourras organiser tes favoris par thèmes, saisons ou projets en cours.
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
